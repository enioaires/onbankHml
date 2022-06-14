import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';
import { isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';

// Api
import api from '../../../api';

// Types
import {
    ILoginPayload,
    SUBMIT_LOGIN,
    ILoginResponse,
    CHANGE_LOGIN_PAYLOAD
} from './types';
import { IResponse } from '../../types';

// Actions
import {
    didLoginFailAction,
    didLoginSucceedAction,
    clearLoginStateAction,
    SubmitLoginAction,
    ChangeLoginPayloadAction,
    changeLoginPayloadValidationsAction
} from './actions';
import {
    saveUserAuthAction,
    saveKeychainCredentialsAction
} from '../auth/actions';
import { onGetUserData } from '../userData/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const login = (payload: ILoginPayload) => {
    return api.post('/login', payload);
};

const storeTouchFaceIdCredentials = (
    documentNumber: string,
    password: string
) => {
    return Keychain.setGenericPassword(documentNumber, password, {
        service: 'br.com.onbank.mobile-keychain'
    });
};

function* validateLoginPayload(action: ChangeLoginPayloadAction) {
    const { key, value } = action;
    let message = '';

    if (key === 'username') {
        if (
            value.trim().replace(/\D/g, '').length === 11 &&
            !isValidCPF(value.trim())
        )
            message = '* CPF inválido';
        if (
            value.trim().replace(/\D/g, '').length === 14 &&
            !isValidCNPJ(value.trim())
        )
            message = '* CNPJ inválido';
    }

    yield put(changeLoginPayloadValidationsAction(key, message));
}

// function* submitLogin(action: SubmitLoginAction) {
//     try {
//         const resp: IResponse<ILoginResponse> = yield call(
//             login,
//             action.payload
//         );

//         // console.log('login', JSON.stringify(resp, null, 2));
//         // console.log('payload', JSON.stringify(action.payload, null, 2));

//         if (!resp) {
//             throw new Error(NO_CONEXION_MESSAGE);
//         }

//         if (resp.data) {
//             const { token } = resp.data;
//             const { accountId, accountHolderId } = resp.data.user;

//             yield put(
//                 saveUserAuthAction({
//                     token,
//                     accountHolderId,
//                     accountId,
//                     revalidated: true
//                 })
//             );

//             if (action.touchFaceIdStore) {
//                 yield call(() =>
//                     storeTouchFaceIdCredentials(
//                         action.payload.username,
//                         action.payload.password
//                     )
//                 );
//                 yield put(
//                     saveKeychainCredentialsAction({
//                         password: action.payload.password,
//                         username: action.payload.username,
//                         service: 'br.com.onbank.mobile',
//                         storage: 'keychain'
//                     })
//                 );
//             }

//             yield put(onGetUserData());
//             yield put(didLoginSucceedAction());
//             yield put(clearLoginStateAction());
//             return;
//         }

//         if (resp.message) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             if (resp.message.match(/Cadastro em Analise/g)) {
//                 yield put(didLoginSucceedAction());
//                 action.navigation.push('SignUp', {
//                     screen: 'Confirmation'
//                 });
//                 return;
//             }
//             throw new Error(
//                 resp.message.match(/Conta bloqueada ou nao encontrada/g)
//                     ? 'Conta bloqueada ou não encontrada'
//                     : resp.message
//             );
//         }
//     } catch (err) {
//         yield put(didLoginFailAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops',
//                 message:
//                     err.message ||
//                     `Algo inesperado aconteceu...
//             Tente novamente.
//             `,
//                 type: 'error'
//             })
//         );
//     }
// }

function* submitLogin(action: SubmitLoginAction) {
    const resp: IResponse<ILoginResponse> | undefined =
        yield callWrapperService(login, action.payload);

    // console.log('login response', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        // accountId will be removed soon for all requests into app but yet is necessary for some requests
        const { token } = resp.data;
        const { accountId, accountHolderId } = resp.data.user;

        yield put(
            saveUserAuthAction({
                token,
                accountHolderId,
                accountId,
                revalidated: true
            })
        );

        if (action.touchFaceIdStore) {
            yield call(() =>
                storeTouchFaceIdCredentials(
                    action.payload.username,
                    action.payload.password
                )
            );
            yield put(
                saveKeychainCredentialsAction({
                    password: action.payload.password,
                    username: action.payload.username,
                    service: 'br.com.onbank.mobile-keychain',
                    storage: 'keychain'
                })
            );
        }
        yield put(onGetUserData());
        yield put(didLoginSucceedAction());
        yield put(clearLoginStateAction());
    } else {
        yield put(didLoginFailAction());
    }
}

export default all([
    takeLatest(SUBMIT_LOGIN, submitLogin),
    takeLatest(CHANGE_LOGIN_PAYLOAD, validateLoginPayload)
]);
