import { all, takeLatest, select, put } from 'redux-saga/effects';
import {
    isValidCPF,
    isValidCNPJ,
    isValidPhone
} from '@brazilian-utils/brazilian-utils';
import * as dateFns from 'date-fns';

import { getUniqueId } from 'react-native-device-info';
// Api
import api from '../../../api';

// Types
import {
    CHANGE_SIGNUP_PAYLOAD,
    REQUEST_SIGNUP,
    ISignUpPayload,
    DEMO_VALIDATE_ACCOUNT,
    COMPLETE_DEMO_SIGNUP,
    ICompleteDemoSignupPayload,
    SIGNUP_BY_LEITURISTA
} from './types';
import { IApplicationState } from '../../types';

// Actions
import {
    validateSignUpInputsAction,
    didSignUpFailAction,
    didSignUpSucceedAction,
    ChangeSignUpPayloadAction,
    DemoValidateAction,
    RequestSignUpAction,
    demoValidateSuccessAction,
    demoValidateFailureAction,
    completeDemoSignupFailureAction,
    completeDemoSignupSuccessAction,
    CompleteDemoSignupAction
} from './actions';
import { setAlertMessageAction } from '../alert/actions';

// Utils
import { validateEmailInput } from '../../../utils/helpers';
import { saveUserAuthAction } from '../auth/actions';
import { onGetUserData } from '../userData/actions';
import { IUserData } from '../userData/types';
import callWrapperService from '../../../utils/callWrapperService';

const requestSignUp = (payload: any) => {
    if (payload.tokenSdk) {
        return api.post('/v3/register', payload);
    }
    return api.post('v2/register/demo', payload);
};

export const requestSignUpByLeiturista = (payload: any) => {
    return api.post('/register-auth/create', payload);
};

const requestSignUpPj = (payload: any) => {
    return api.post('/register/pj', payload);
};

const requestSignUpPjPf = (payload: any) => {
    return api.post('/register/pj/signup/pf', payload);
};

const requestDemoValidation = (payload: any) => {
    return api.post('/demo/report/validation', payload);
};

const requestCompleteDemoSignup = (payload: ICompleteDemoSignupPayload) => {
    return api.post('/send/demo/report', payload);
};

// function* completeDemoSignup(action: CompleteDemoSignupAction) {
//     const client: IUserData = yield select(
//         (state: IApplicationState) => state.user.data
//     );

//     try {
//         const resp = yield call(requestCompleteDemoSignup, {
//             accountId: client.account.accountId,
//             city: client.billingAddress.cidade,
//             complement: client.billingAddress.complemento,
//             country: client.billingAddress.pais,
//             documentNumber: client.client.taxIdentifier.taxId,
//             email: client.client.email,
//             hwid: action.hwid,
//             neighborhood: client.billingAddress.bairro,
//             number: client.billingAddress.numero,
//             phoneNumber: client.account.mobilePhone.phoneNumber,
//             postalCode: client.billingAddress.cep,
//             promoCode: '',
//             state: client.billingAddress.estado,
//             street: client.billingAddress.logradouro,
//             tokenSdk: action.tokenSdk,
//             typedBirthDate: client.additionalDetailsPerson?.birthDate,
//             typedDocumentNumber: client.client.taxIdentifier.taxId,
//             typedMotherName: client.additionalDetailsPerson?.mother,
//             typedUsername: client.client.name
//         });

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 403 || resp.statusCode === 401) {
//                 yield new Promise((resolve) => {
//                     Alert.alert('Atenção', 'Entre em sua conta novamente', [
//                         { text: 'OK', onPress: resolve }
//                     ]);
//                 });
//                 yield put(removeTokenAction());
//                 return;
//             }
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message);
//         }

//         yield put(completeDemoSignupSuccessAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Cadastro',
//                 message: 'Seu cadastro foi concluído e está em análise.',
//                 type: 'info'
//             })
//         );
//     } catch (err) {
//         yield put(completeDemoSignupFailureAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops',
//                 message:
//                     err.message || 'Algo inesperado ocorreu...Tente novamente.',
//                 type: 'error'
//             })
//         );
//     }
// }

// function* demoAccountValidation(action: DemoValidateAction) {
//     try {
//         const resp = yield call(requestDemoValidation, {
//             documentNumber: action.documentNumber
//         });
//         // console.log(JSON.stringify(resp, null, 2));
//         // console.log(JSON.stringify(action.documentNumber, null, 2));

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 403 || resp.statusCode === 401) {
//                 yield new Promise((resolve) => {
//                     Alert.alert('Atenção', 'Entre em sua conta novamente', [
//                         { text: 'OK', onPress: resolve }
//                     ]);
//                 });
//                 yield put(removeTokenAction());
//                 return;
//             }
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message);
//         }

//         yield put(demoValidateSuccessAction());
//         action.initiateSdkIdwall();
//     } catch (err) {
//         yield put(demoValidateFailureAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops',
//                 message:
//                     err.message || 'Algo inesperado ocorreu...Tente novamente.',
//                 type: 'error'
//             })
//         );
//     }
// }

// function* validateSignUpInputs(action: ChangeSignUpPayloadAction) {
//     const signUpPayload = yield select(
//         (state: IApplicationState) => state.signUp.payload
//     );
//     const { value } = action.payload;
//     let message = '';

//     switch (action.payload.key) {
//         case 'documentNumber':
//         case 'representativeTaxId':
//         case 'existingCpf':
//             if (action.payload.value.replace(/\D/g, '').length === 11) {
//                 if (!isValidCPF(action.payload.value)) {
//                     message = '* Informe um CPF válido.';
//                 }
//             }
//             if (action.payload.value.replace(/\D/g, '').length === 14) {
//                 if (!isValidCNPJ(action.payload.value)) {
//                     message = '* Informe um CNPJ válido.';
//                 }
//             }
//             break;
//         case 'fullName':
//         case 'companyName':
//         case 'representativeName':
//         case 'motherName':
//             // const [ first, second, ...rest] = action.payload.value.split(" ");
//             // if(!second) {
//             //     if(action.payload.key === "companyName") {
//             //         message = "* Preencha o nome completo da empresa."
//             //     } else {
//             //         message = "* Preencha o nome completo."
//             //     }
//             // }
//             break;
//         case 'email':
//         case 'emailConfirmation':
//             if (
//                 signUpPayload.email.trim().length <=
//                 signUpPayload.emailConfirmation.trim().length
//             ) {
//                 if (!validateEmailInput(signUpPayload.email.trim())) {
//                     message = '* Informe um e-mail válido.';
//                 } else if (
//                     signUpPayload.emailConfirmation.trim() !==
//                     signUpPayload.email.trim()
//                 ) {
//                     message = '* Os e-mails informados não são iguais.';
//                 }
//             }
//             break;
//         case 'phone':
//             if (
//                 action.payload.value.replace(/\D/g, '').length === 11 &&
//                 !isValidPhone(action.payload.value)
//             ) {
//                 message = '* Informe um telefone válido.';
//             }
//             break;
//         case 'password':
//             // if(action.payload.value.length < 6) {
//             //     message = "* Senha deve ter 6 caractéres no mínimo!"
//             // }
//             break;
//         case 'passwordConfirmation':
//             if (
//                 action.payload.value.length === 6 &&
//                 action.payload.value !== signUpPayload.password
//             ) {
//                 message = '* As senhas informadas não são iguais.';
//             }
//             break;
//         case 'birthDate':
//         case 'establishmentDate':
//             if (value.length > 9) {
//                 const [day, month, year] = action.payload.value.split('/');

//                 const dayNumber = parseInt(day);
//                 const monthNumber = parseInt(month);
//                 const yearNumber = parseInt(year);

//                 const currentDate = new Date();
//                 const currentYear = currentDate.getFullYear();
//                 const currentMonth = currentDate.getMonth();
//                 const currentDay = currentDate.getDate();

//                 if (year?.length === 4) {
//                     if (
//                         yearNumber > currentYear ||
//                         !dateFns.isExists(
//                             yearNumber,
//                             monthNumber - 1,
//                             dayNumber
//                         ) ||
//                         (action.payload.key === 'birthDate' &&
//                             currentYear - yearNumber > 120)
//                     ) {
//                         message = '* Informe uma data válida.';
//                     } else if (yearNumber === currentYear) {
//                         if (monthNumber > currentMonth + 1) {
//                             message = '* Informe uma data válida.';
//                         } else if (
//                             monthNumber === currentMonth + 1 &&
//                             dayNumber > currentDay
//                         ) {
//                             message = '* Informe uma data válida.';
//                         } else {
//                             message = '* Menor de 18 anos.';
//                         }
//                     } else if (
//                         action.payload.key === 'birthDate' &&
//                         yearNumber > currentYear - 18
//                     ) {
//                         message = '* Menor de 18 anos.';
//                     } else if (
//                         action.payload.key === 'birthDate' &&
//                         yearNumber === currentYear - 18
//                     ) {
//                         if (monthNumber > currentMonth + 1) {
//                             message = '* Menor de 18 anos.';
//                         } else if (
//                             action.payload.key === 'birthDate' &&
//                             monthNumber === currentMonth + 1
//                         ) {
//                             if (
//                                 action.payload.key === 'birthDate' &&
//                                 dayNumber > currentDay
//                             ) {
//                                 message = '* Menor de 18 anos.';
//                             }
//                         }
//                     }
//                 }
//             }
//             break;
//         default:
//             break;
//     }

//     if (action.payload.key === 'emailConfirmation') {
//         yield put(validateSignUpInputsAction({ key: 'email', value: message }));
//     } else {
//         yield put(
//             validateSignUpInputsAction({
//                 key: action.payload.key,
//                 value: message
//             })
//         );
//     }
// }

// function* signUp(action: RequestSignUpAction) {
//     const documentNumberValue = yield select(
//         (state: IApplicationState) => state.signUp.payload.documentNumber
//     );

//     const isPj = documentNumberValue.replace(/\D/g, '').length > 11;

//     const signUpPayload: ISignUpPayload = yield select(
//         (state: IApplicationState) => state.signUp.payload
//     );

//     let payload: any;
//     const [day, month, year] = signUpPayload.birthDate.split('/');

//     if (isPj) {
//         const [day2, month2, year2] = signUpPayload.establishmentDate.split(
//             '/'
//         );

//         payload = {
//             typedDocumentNumber: signUpPayload.documentNumber.replace(
//                 /\D/g,
//                 ''
//             ),
//             companyName: signUpPayload.companyName,
//             businessLine: signUpPayload.businessLine,
//             establishmentDate: `${year2}-${month2}-${day2}`,
//             establishmentForm: signUpPayload.establishmentForm,
//             password: signUpPayload.password,
//             billingAddressStreet: signUpPayload.street,
//             billingAddressNumber: signUpPayload.number,
//             billingAddressComplement: signUpPayload.complement,
//             billingAddressNeighborhood: signUpPayload.neighborhood,
//             billingAddressCity: signUpPayload.city,
//             billingAddressState: signUpPayload.state.toUpperCase(),
//             billingAddressPostalCode: signUpPayload.postalCode.replace(
//                 /\D/g,
//                 ''
//             ),
//             representativePhoneNumber: signUpPayload.phone.replace(/\D/g, '')
//         };

//         if (signUpPayload.accountId) {
//             payload = {
//                 ...payload,
//                 accountId: signUpPayload.accountId
//             };
//         } else {
//             payload = {
//                 ...payload,
//                 representativeName: signUpPayload.representativeName,
//                 representativeDocumentNumber: signUpPayload.representativeTaxId.replace(
//                     /\D/g,
//                     ''
//                 ),
//                 representativeBirthDate: `${year}-${month}-${day}`,
//                 representativeEmail: signUpPayload.email.trim(),
//                 representativeMotherName: signUpPayload.motherName
//             };
//         }
//     } else {
//         payload = {
//             typedDocumentNumber: signUpPayload.documentNumber.replace(
//                 /\D/g,
//                 ''
//             ),
//             typedBirthDate: `${year}-${month}-${day}`,
//             typedFullName: signUpPayload.fullName,
//             email: signUpPayload.email.trim(),
//             phone: signUpPayload.phone.replace(/\D/g, ''),
//             password: signUpPayload.password,
//             typedMotherName: signUpPayload.motherName,
//             billingAddressStreet: signUpPayload.street,
//             billingAddressNumber: signUpPayload.number,
//             billingAddressComplement: signUpPayload.complement,
//             billingAddressNeighborhood: signUpPayload.neighborhood,
//             billingAddressCity: signUpPayload.city,
//             billingAddressState: signUpPayload.state.toUpperCase(),
//             billingAddressPostalCode: signUpPayload.postalCode.replace(
//                 /\D/g,
//                 ''
//             ),
//             promoCode: signUpPayload.promocode,
//             tokenSdk: signUpPayload.tokenSdk
//         };
//     }

//     try {
//         const resp = yield call(
//             isPj
//                 ? signUpPayload.accountId
//                     ? () => requestSignUpPjPf({ ...payload, hwid: action.hwid })
//                     : () => requestSignUpPj({ ...payload, hwid: action.hwid })
//                 : () => requestSignUp({ ...payload, hwid: action.hwid })
//         );

//         // console.log(
//         //     JSON.stringify(resp, null, 2),
//         //     JSON.stringify(payload, null, 2)
//         // );

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             const [first, ...rest] = resp.message;
//             let { message } = resp;
//             if (first === 'TaxId') {
//                 message = 'CPF ou CNPJ já cadastrado!';
//             }
//             if (first === 'Email') {
//                 message = 'Email já cadastrado!';
//             }
//             throw new Error(message);
//         }

//         // const { token } = resp.data;
//         // const { accountHolderId, accountId } = resp.data.user;

//         yield all([put(didSignUpSucceedAction(resp.data))]);

//         if (resp.data?.token) {
//             const { token } = resp.data;
//             const { accountHolderId, accountId } = resp.data.user;
//             yield put(
//                 saveUserAuthAction({
//                     token,
//                     accountHolderId,
//                     accountId,
//                     revalidated: true
//                 })
//             );
//             yield put(onGetUserData());
//         } else {
//             action.navigation.reset({
//                 index: 0,
//                 routes: [
//                     // { name: 'OnBoarding' },
//                     { name: 'Login' },
//                     { name: 'SignUp', params: { screen: 'Confirmation' } }
//                 ]
//             });
//         }
//     } catch (err) {
//         yield put(didSignUpFailAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops',
//                 message:
//                     err.message || 'Algo inesperado ocorreu...Tente novamente.',
//                 type: 'error'
//             })
//         );
//     }
// }

function* completeDemoSignup(action: CompleteDemoSignupAction) {
    const client: IUserData = yield select(
        (state: IApplicationState) => state.user.data
    );

    const resp = yield callWrapperService(requestCompleteDemoSignup, {
        accountId: client.account.accountId,
        city: client.billingAddress.cidade,
        complement: client.billingAddress.complemento,
        country: client.billingAddress.pais,
        documentNumber: client.client.taxIdentifier.taxId,
        email: client.client.email,
        hwid: action.hwid,
        neighborhood: client.billingAddress.bairro,
        number: client.billingAddress.numero,
        phoneNumber: client.account.mobilePhone.phoneNumber,
        postalCode: client.billingAddress.cep,
        promoCode: '',
        state: client.billingAddress.estado,
        street: client.billingAddress.logradouro,
        tokenSdk: action.tokenSdk,
        typedBirthDate: client.additionalDetailsPerson?.birthDate,
        typedDocumentNumber: client.client.taxIdentifier.taxId,
        typedMotherName: client.additionalDetailsPerson?.mother,
        typedUsername: client.client.name
    });

    if (resp) {
        yield put(completeDemoSignupSuccessAction());
        yield put(
            setAlertMessageAction({
                title: 'Cadastro',
                message: 'Seu cadastro foi concluído e está em análise.',
                type: 'info'
            })
        );
    } else {
        yield put(completeDemoSignupFailureAction());
    }
}

function* demoAccountValidation(action: DemoValidateAction) {
    const resp = yield callWrapperService(requestDemoValidation, {
        documentNumber: action.documentNumber
    });

    // console.log(JSON.stringify(resp, null, 2));
    // console.log(JSON.stringify(action.documentNumber, null, 2));

    if (resp) {
        yield put(demoValidateSuccessAction());
        action.initiateSdkIdwall();
    } else {
        yield put(demoValidateFailureAction());
    }
}

function* validateSignUpInputs(action: ChangeSignUpPayloadAction) {
    const signUpPayload: ISignUpPayload = yield select(
        (state: IApplicationState) => state.signUp.payload
    );
    const { value } = action.payload;
    let message = '';

    switch (action.payload.key) {
        case 'documentNumber':
        case 'representativeTaxId':
        case 'existingCpf':
            if (action.payload.value.replace(/\D/g, '').length === 11) {
                if (!isValidCPF(action.payload.value)) {
                    message = '* Informe um CPF válido.';
                }
            }
            if (action.payload.value.replace(/\D/g, '').length === 14) {
                if (!isValidCNPJ(action.payload.value)) {
                    message = '* Informe um CNPJ válido.';
                }
            }
            break;
        case 'fullName':
        case 'companyName':
        case 'representativeName':
        case 'motherName':
            // const [ first, second, ...rest] = action.payload.value.split(" ");
            // if(!second) {
            //     if(action.payload.key === "companyName") {
            //         message = "* Preencha o nome completo da empresa."
            //     } else {
            //         message = "* Preencha o nome completo."
            //     }
            // }
            break;
        case 'email':
        case 'emailConfirmation':
            if (
                signUpPayload.email.trim().length <=
                signUpPayload.emailConfirmation.trim().length
            ) {
                if (!validateEmailInput(signUpPayload.email.trim())) {
                    message = '* Informe um e-mail válido.';
                } else if (
                    signUpPayload.emailConfirmation.trim() !==
                    signUpPayload.email.trim()
                ) {
                    message = '* Os e-mails informados não são iguais.';
                }
            }
            break;
        case 'phone':
            if (
                action.payload.value.replace(/\D/g, '').length === 11 &&
                !isValidPhone(action.payload.value)
            ) {
                message = '* Informe um telefone válido.';
            }
            break;
        case 'password':
            // if(action.payload.value.length < 6) {
            //     message = "* Senha deve ter 6 caractéres no mínimo!"
            // }
            break;
        case 'passwordConfirmation':
            if (
                action.payload.value.length === 6 &&
                action.payload.value !== signUpPayload.password
            ) {
                message = '* As senhas informadas não são iguais.';
            }
            break;
        case 'birthDate':
        case 'establishmentDate':
            if (value.length > 9) {
                const [day, month, year] = action.payload.value.split('/');

                const dayNumber = parseInt(day);
                const monthNumber = parseInt(month);
                const yearNumber = parseInt(year);

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth();
                const currentDay = currentDate.getDate();

                if (year?.length === 4) {
                    if (
                        yearNumber > currentYear ||
                        !dateFns.isExists(
                            yearNumber,
                            monthNumber - 1,
                            dayNumber
                        ) ||
                        (action.payload.key === 'birthDate' &&
                            currentYear - yearNumber > 120)
                    ) {
                        message = '* Informe uma data válida.';
                    } else if (yearNumber === currentYear) {
                        if (monthNumber > currentMonth + 1) {
                            message = '* Informe uma data válida.';
                        } else if (
                            monthNumber === currentMonth + 1 &&
                            dayNumber > currentDay
                        ) {
                            message = '* Informe uma data válida.';
                        } else {
                            message = '* Menor de 18 anos.';
                        }
                    } else if (
                        action.payload.key === 'birthDate' &&
                        yearNumber > currentYear - 18
                    ) {
                        message = '* Menor de 18 anos.';
                    } else if (
                        action.payload.key === 'birthDate' &&
                        yearNumber === currentYear - 18
                    ) {
                        if (monthNumber > currentMonth + 1) {
                            message = '* Menor de 18 anos.';
                        } else if (
                            action.payload.key === 'birthDate' &&
                            monthNumber === currentMonth + 1
                        ) {
                            if (
                                action.payload.key === 'birthDate' &&
                                dayNumber > currentDay
                            ) {
                                message = '* Menor de 18 anos.';
                            }
                        }
                    }
                }
            }
            break;
        default:
            break;
    }

    if (action.payload.key === 'emailConfirmation') {
        yield put(validateSignUpInputsAction({ key: 'email', value: message }));
    } else {
        yield put(
            validateSignUpInputsAction({
                key: action.payload.key,
                value: message
            })
        );
    }
}

function* signUp(action: RequestSignUpAction) {
    const documentNumberValue: string = yield select(
        (state: IApplicationState) => state.signUp.payload.documentNumber
    );

    const isPj = documentNumberValue.replace(/\D/g, '').length > 11;

    const signUpPayload: ISignUpPayload = yield select(
        (state: IApplicationState) => state.signUp.payload
    );

    let payload: any;
    const [day, month, year] = signUpPayload.birthDate.split('/');

    if (isPj) {
        const [day2, month2, year2] =
            signUpPayload.establishmentDate.split('/');

        payload = {
            typedDocumentNumber: signUpPayload.documentNumber.replace(
                /\D/g,
                ''
            ),
            companyName: signUpPayload.companyName,
            businessLine: signUpPayload.businessLine,
            establishmentDate: `${year2}-${month2}-${day2}`,
            establishmentForm: signUpPayload.establishmentForm,
            password: signUpPayload.password,
            billingAddressStreet: signUpPayload.street,
            billingAddressNumber: signUpPayload.number,
            billingAddressComplement: signUpPayload.complement,
            billingAddressNeighborhood: signUpPayload.neighborhood,
            billingAddressCity: signUpPayload.city,
            billingAddressState: signUpPayload.state.toUpperCase(),
            billingAddressPostalCode: signUpPayload.postalCode.replace(
                /\D/g,
                ''
            ),
            representativePhoneNumber: signUpPayload.phone.replace(/\D/g, '')
        };

        if (signUpPayload.accountId) {
            payload = {
                ...payload,
                accountId: signUpPayload.accountId
            };
        } else {
            payload = {
                ...payload,
                representativeName: signUpPayload.representativeName,
                representativeDocumentNumber:
                    signUpPayload.representativeTaxId.replace(/\D/g, ''),
                representativeBirthDate: `${year}-${month}-${day}`,
                representativeEmail: signUpPayload.email.trim(),
                representativeMotherName: signUpPayload.motherName
            };
        }
    } else {
        payload = {
            typedDocumentNumber: signUpPayload.documentNumber.replace(
                /\D/g,
                ''
            ),
            sex: signUpPayload.sex,
            typedBirthDate: `${year}-${month}-${day}`,
            typedFullName: signUpPayload.fullName,
            email: signUpPayload.email.trim(),
            phone: signUpPayload.phone.replace(/\D/g, ''),
            password: signUpPayload.password,
            typedMotherName: signUpPayload.motherName,
            billingAddressStreet: signUpPayload.street,
            billingAddressNumber: signUpPayload.number,
            billingAddressComplement: signUpPayload.complement,
            billingAddressNeighborhood: signUpPayload.neighborhood,
            billingAddressCity: signUpPayload.city,
            billingAddressState: signUpPayload.state.toUpperCase(),
            billingAddressPostalCode: signUpPayload.postalCode.replace(
                /\D/g,
                ''
            ),
            promoCode: signUpPayload.promocode,
            tokenSdk: signUpPayload.tokenSdk,
            capacityFinancial: signUpPayload.capacityFinancial
        };
    }

    const resp = yield callWrapperService(
        isPj
            ? signUpPayload.accountId
                ? () => requestSignUpPjPf({ ...payload, hwid: action.hwid })
                : () => requestSignUpPj({ ...payload, hwid: action.hwid })
            : () => requestSignUp({ ...payload, hwid: action.hwid })
    );

    // console.log(
    //     JSON.stringify(resp, null, 2),
    //     JSON.stringify(payload, null, 2)
    // );

    if (resp) {
        // const { token } = resp.data;
        // const { accountHolderId, accountId } = resp.data.user;

        yield all([put(didSignUpSucceedAction(resp.data))]);

        yield put(
            setAlertMessageAction({
                title: 'Cadastro',
                message: 'Conta expressa cadastrada com sucesso!',
                type: 'info',
                action: {
                    onPress: () => {
                        action.navigation.reset({
                            index: 1,
                            routes: [{ name: 'Login' }]
                        });
                    },
                    mainLabel: 'Ok'
                }
            })
        );
    } else {
        yield put(didSignUpFailAction());
    }
}

function* signUpByLeiturista(action) {
    const signUpPayload: ISignUpPayload = yield select(
        (state: IApplicationState) => state.signUp.payload
    );
    const requestPayload = {
        fullName: signUpPayload.fullName,
        email: signUpPayload.email,
        phone: signUpPayload.phone,
        documentNumber: signUpPayload.documentNumber,
        birthDate: signUpPayload.birthDate,
        motherName: signUpPayload.motherName,
        billingAddressPostalCode: signUpPayload.postalCode,
        billingAddressStreet: signUpPayload.street,
        billingAddressNumber: signUpPayload.number,
        billingAddressComplement: signUpPayload.complement,
        billingAddressNeighborhood: signUpPayload.neighborhood,
        billingAddressCity: signUpPayload.city,
        billingAddressState: signUpPayload.state
    };
    console.log(requestPayload);
    // @ts-ignore
    const response = yield callWrapperService(requestSignUpByLeiturista, {
        ...requestPayload
    });
    if (response) {
        action.navigation.navigate('Home', {
            showAlertCreateAccout: true
        });
    }
    console.log(response);
}

export default all([
    takeLatest(CHANGE_SIGNUP_PAYLOAD, validateSignUpInputs),
    takeLatest(REQUEST_SIGNUP, signUp),
    takeLatest(DEMO_VALIDATE_ACCOUNT, demoAccountValidation),
    takeLatest(COMPLETE_DEMO_SIGNUP, completeDemoSignup),
    takeLatest(SIGNUP_BY_LEITURISTA, signUpByLeiturista)
]);
