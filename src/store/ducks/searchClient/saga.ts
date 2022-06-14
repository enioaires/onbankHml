import { all, takeLatest, put, call } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { REQUEST_SEARCH_CLIENT } from './types';

// Actions
import {
    didSearchClientFailAction,
    didSearchClientSucceedAction,
    RequestSearchClientAction
} from './actions';
import {
    changeSignUpPayloadAction,
    validateSignUpInputsAction
} from '../signUp/actions';
import { changeForgotPasswordPayloadValidationsAction } from '../forgotPassword/actions';

const requestSearchClient = (documentNumber: string) => {
    const unmasked = documentNumber.replace(/\D/g, '');
    return api.get(`/verify/client/${unmasked}`);
};

const requestSearchPreSignup = (documentNumber: string) => {
    const unmasked = documentNumber.replace(/\D/g, '');
    return api.post('/presignup/verify', {
        documentNumber: unmasked
    });
};

function* searchClient(action: RequestSearchClientAction) {
    try {
        const resp = yield call(() =>
            requestSearchClient(action.documentNumber)
        );

        // console.log('search client', JSON.stringify(resp, null, 2));

        let isClient = false;
        if (resp.error || resp.statusCode === 500) {
            if (resp.statusCode === 500) {
                throw new Error(
                    'Ocorreu um problema. Tente novamente mais tarde.'
                );
            }
            if (
                resp.message ===
                'Conflito de dados encontrado, entre com contato com nosso suporte!'
            ) {
                isClient = true;
            } else {
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }
        }

        if (resp.data?.isClient) {
            isClient = true;
        }

        yield put(didSearchClientSucceedAction(isClient));

        if (action.feature === 'signUp' || action.feature === 'createAccount') {
            if (isClient) {
                yield put(
                    validateSignUpInputsAction({
                        key: 'documentNumber',
                        value:
                            action.documentNumber.replace(/\D/g, '').length > 11
                                ? '* CNPJ já cadastrado.'
                                : '* CPF já cadastrado.'
                    })
                );
            } else {
                const preSignupResp = yield call(() =>
                    requestSearchPreSignup(action.documentNumber)
                );

                // console.log(preSignupResp);

                if (!preSignupResp.error) {
                    const { email, fullName, phoneNumber } = preSignupResp.data
                        ? preSignupResp.data
                        : preSignupResp;
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'phone',
                            value: phoneNumber
                        })
                    );
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'fullName',
                            value: fullName
                        })
                    );
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'email',
                            value: email
                        })
                    );
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'emailConfirmation',
                            value: email
                        })
                    );
                } else {
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'phone',
                            value: ''
                        })
                    );
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'fullName',
                            value: ''
                        })
                    );
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'email',
                            value: ''
                        })
                    );
                    yield put(
                        changeSignUpPayloadAction({
                            key: 'emailConfirmation',
                            value: ''
                        })
                    );
                }
                action.navigation.push(
                    action.feature === 'createAccount'
                        ? 'CreateAccount'
                        : 'SignUp',
                    {
                        screen:
                            action.documentNumber.replace(/\D/g, '').length > 11
                                ? 'Company'
                                : 'Sex'
                    }
                );
            }
        }

        if (action.feature === 'representativePJ') {
            if (isClient) {
                yield put(
                    validateSignUpInputsAction({
                        key: 'representativeTaxId',
                        value: '* Representante possui conta Onbank.'
                    })
                );
            }
        }

        if (action.feature === 'existingCpf') {
            if (!isClient) {
                yield put(
                    validateSignUpInputsAction({
                        key: 'existingCpf',
                        value: '* CPF não possui conta Onbank.'
                    })
                );
            }
        }

        if (action.feature === 'forgotPassword') {
            if (!isClient) {
                yield put(
                    changeForgotPasswordPayloadValidationsAction(
                        'documentNumber',
                        action.documentNumber.replace(/\D/g, '').length > 11
                            ? '* CNPJ não cadastrado'
                            : '* CPF não cadastrado'
                    )
                );
            }
        }
    } catch (err) {
        yield put(didSearchClientFailAction());
    }
}

export default all([takeLatest(REQUEST_SEARCH_CLIENT, searchClient)]);
