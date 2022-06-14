import { all, takeLatest, put, select } from 'redux-saga/effects';
import { getUniqueId } from 'react-native-device-info';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    SEND_PHONE_SMS,
    SEND_PHONE_SMS_PASSWORD,
    VALIDATE_SMS_CODE
} from './types';

// Actions
import {
    didSendSMSSucceedAction,
    didSendSMSPasswordSucceedAction,
    showSMSModalAction,
    didSendSMSFailAction,
    didSendSMSPasswordFailAction,
    closeSMSModalAction,
    didValidateSMSSucceedAction,
    didValidateSMSFailAction,
    SendSMSAction,
    SendSMSPasswordAction,
    ValidateSMSCodeAction
} from './actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestSendSMS = (payload: any) => {
    // TODO remove mock
    // return new Promise((resolve, reject) => {
    //     resolve({ data: { waitingTimeMs: 1232, isValid: false } });
    // });
    return api.post('/sms/send', payload);
};

const requestSendSMSPerfil = (payload: any) => {
    return api.post('/sms/resend', payload);
};

const requestSendSMSChangePassword = () => {
    return api.get('/sms/accesspassword');
};

const requestSendSMSChangePasswordTransaction = () => {
    return api.get('/sms/transactionpassword');
};

const requestValidateSMS = (payload: any) => {
    // TODO remove mock
    // return new Promise((resolve, reject) => {
    //     resolve(true);
    // });
    return api.post('/sms/validate', payload);
};

const requestValidateSMSPerfil = (payload: any) => {
    return api.post('/sms/revalidate/code', payload);
};

// function* sendSMS(action: SendSMSAction) {
//     const phone = yield select(
//         (state: IApplicationState) => state.signUp.payload.phone
//     );
//     const accountId = yield select(
//         (state: IApplicationState) => state.signUp.payload.accountId
//     );
//     const phoneNumber = phone.replace(/\D/g, '');
//     const deviceId = getUniqueId();

//     let payload: any = {
//         phoneNumber,
//         deviceId
//     };

//     if (action.perfil) {
//         payload = {
//             ...payload,
//             phoneNumber: action.phone!.replace(/\D/g, '')
//         };
//     }

//     try {
//         const resp = yield call(
//             action.perfil
//                 ? () => requestSendSMSPerfil(payload)
//                 : () => requestSendSMS(payload)
//         );

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message || 'Falha ao enviar SMS...');
//         }

//         if (resp.data.isValid) {
//             yield put(didSendSMSFailAction());
//             if (!action.perfil) {
//                 action.navigation.push('SignUp', {
//                     screen: accountId ? 'Password' : 'Email'
//                 });
//                 return;
//             }
//         }

//         yield all([
//             put(showSMSModalAction()),
//             put(didSendSMSSucceedAction(resp.data.waitingTimeMs, phoneNumber))
//         ]);
//     } catch (err) {
//         yield put(didSendSMSFailAction());
//         Alert.alert('Envio SMS', err.message);
//     }
// }

// function* validateSMS(action: ValidateSMSCodeAction) {
//     const phone = yield select(
//         (state: IApplicationState) => state.signUp.payload.phone
//     );
//     const oldPhoneNumber = yield select(
//         (state: IApplicationState) =>
//             state.user.data.account.mobilePhone.phoneNumber
//     );
//     const accountId = yield select(
//         (state: IApplicationState) => state.signUp.payload.accountId
//     );

//     const phoneNumber = phone.replace(/\D/g, '');
//     const code = action.code.replace(/\D/g, '');

//     let payload: any = {
//         phoneNumber,
//         code
//     };

//     if (action.perfil) {
//         payload = {
//             ...payload,
//             phoneNumber: action.phone!.replace(/\D/g, '')
//         };
//     }

//     try {
//         const resp = yield call(
//             action.perfil
//                 ? () => requestValidateSMSPerfil(payload)
//                 : () => requestValidateSMS(payload)
//         );

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message || 'Falha ao validar SMS...');
//         }

//         yield all([
//             put(didValidateSMSSucceedAction()),
//             put(closeSMSModalAction())
//         ]);

//         setTimeout(() => {
//             if (action.perfil) {
//                 action.navigation.push('Perfil', {
//                     screen: 'ValidateAccess',
//                     params: {
//                         phone: action.phone,
//                         code,
//                         oldPhoneNumber
//                     }
//                 });
//             } else {
//                 action.navigation.push('SignUp', {
//                     screen: accountId ? 'Password' : 'Email'
//                 });
//             }
//         }, 900);
//     } catch (err) {
//         yield all([
//             put(didValidateSMSFailAction())
//             // put(closeSMSModalAction()),
//         ]);
//         Alert.alert('Validação SMS', err.message);
//     }
// }

function* sendSMS(action: SendSMSAction) {
    const phone: string = yield select(
        (state: IApplicationState) => state.signUp.payload.phone
    );
    const accountId: string = yield select(
        (state: IApplicationState) => state.signUp.payload.accountId
    );

    const phoneNumber = phone.replace(/\D/g, '');
    const deviceId = getUniqueId();

    let payload: any = {
        phoneNumber,
        deviceId
    };

    if (action.perfil) {
        payload = {
            ...payload,
            phoneNumber: action.phone?.replace(/\D/g, '')
        };
    }

    const resp = yield callWrapperService(
        action.perfil
            ? () => requestSendSMSPerfil(payload)
            : () => requestSendSMS(payload)
    );

    // console.log('sendSms', JSON.stringify(resp, null, 2));

    if (resp) {
        if (resp.data.isValid) {
            yield put(didSendSMSFailAction());
            if (!action.perfil) {
                action.navigation.push(action.routeContext || 'SignUp', {
                    screen: accountId ? 'Password' : 'Email'
                });
                return;
            }
        }

        yield all([
            put(showSMSModalAction()),
            put(didSendSMSSucceedAction(resp.data.waitingTimeMs, phoneNumber))
        ]);
    } else {
        yield put(didSendSMSFailAction());
    }
}

function* sendSMSChangePassword(action: SendSMSPasswordAction) {
    const phoneNumber: any = action.phone?.replace(/\D/g, '');
    // const deviceId = getUniqueId();

    // const payload: any = {
    //     phoneNumber,
    //     deviceId
    // };

    const resp = yield callWrapperService(() =>
        action.isPasswordTransaction
            ? requestSendSMSChangePasswordTransaction()
            : requestSendSMSChangePassword()
    );

    if (resp) {
        // if (resp.data.isValid) {
        //     yield put(didSendSMSFailAction());
        // }

        yield all([
            put(showSMSModalAction()),
            put(
                didSendSMSPasswordSucceedAction(
                    resp.data.waitingTimeMs,
                    phoneNumber
                )
            )
        ]);
    } else {
        yield put(didSendSMSPasswordFailAction());
    }
}

function* validateSMS(action: ValidateSMSCodeAction) {
    const phone: string = yield select(
        (state: IApplicationState) => state.signUp.payload.phone
    );
    const oldPhoneNumber: string = yield select(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );
    const accountId: string = yield select(
        (state: IApplicationState) => state.signUp.payload.accountId
    );

    const phoneNumber = phone.replace(/\D/g, '');
    const code = action.code.replace(/\D/g, '');

    let payload: any = {
        phoneNumber,
        code
    };

    if (action.perfil) {
        payload = {
            ...payload,
            phoneNumber: action.phone?.replace(/\D/g, '')
        };
    }

    const resp = yield callWrapperService(
        action.perfil
            ? () => requestValidateSMSPerfil(payload)
            : () => requestValidateSMS(payload)
    );

    // console.log('validateSms', JSON.stringify(resp, null, 2));

    if (resp) {
        yield all([
            put(didValidateSMSSucceedAction()),
            put(closeSMSModalAction())
        ]);

        setTimeout(() => {
            if (action.perfil) {
                action.navigation.push('Perfil', {
                    screen: 'ValidateAccess',
                    params: {
                        phone: action.phone,
                        code,
                        oldPhoneNumber
                    }
                });
            } else {
                action.navigation.push(action.routeContext || 'SignUp', {
                    screen: accountId ? 'Password' : 'Email'
                });
            }
        }, 900);
    } else {
        yield all([put(didValidateSMSFailAction())]);
    }
}

export default all([
    takeLatest(SEND_PHONE_SMS, sendSMS),
    takeLatest(SEND_PHONE_SMS_PASSWORD, sendSMSChangePassword),
    takeLatest(VALIDATE_SMS_CODE, validateSMS)
]);
