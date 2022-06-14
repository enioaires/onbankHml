import { all, takeLatest, put } from 'redux-saga/effects';
import { isValidCPF, isValidCNPJ } from '@brazilian-utils/brazilian-utils';

// Api
import api from '../../../api';

// Types
import {
    REQUEST_FORGOT_PASSWORD,
    CHANGE_FORGOT_PASSWORD_PAYLOAD,
    IForgotPasswordResponse,
    IForgotPasswordPayload
} from './types';
import { IResponse } from '../../types';

// Actions
import {
    didForgotPasswordFailAction,
    didForgotPasswordSucceedAction,
    clearForgotPasswordPayloadAction,
    RequestForgotPasswordAction,
    ChangeForgotPasswordPayloadAction,
    changeForgotPasswordPayloadValidationsAction
} from './actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestForgotPassword = (payload: IForgotPasswordPayload) => {
    return api.post('/forgot/mail', payload);
};

function* validateForgotPasswordPayload(
    action: ChangeForgotPasswordPayloadAction
) {
    const { key, value } = action;
    let message = '';

    if (key === 'documentNumber') {
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

    yield put(changeForgotPasswordPayloadValidationsAction(key, message));
}

// function* forgotPassword(action: RequestForgotPasswordAction) {
//     try {
//         const resp: IResponse<IForgotPasswordResponse> = yield call(
//             requestForgotPassword,
//             action.payload
//         );

//         // console.log('forgot password', JSON.stringify(resp, null, 2));

//         if (!resp) {
//             throw new Error(NO_CONEXION_MESSAGE);
//         }

//         if (resp.data) {
//             if (!resp.data.isEmail && resp.data.clue) {
//                 yield all([
//                     put(
//                         changeForgotPasswordPayloadValidationsAction(
//                             'email',
//                             '* O e-mail informado não confere com o cadastrado'
//                         )
//                     ),
//                     put(didForgotPasswordSucceedAction(resp.data.clue))
//                 ]);
//             } else {
//                 action.setShowAlert(true);
//                 yield put(didForgotPasswordSucceedAction(''));
//                 yield put(clearForgotPasswordPayloadAction());
//             }
//             return;
//         }

//         if (resp.message) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message);
//         }
//     } catch (err) {
//         yield put(didForgotPasswordFailAction());
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

function* forgotPassword(action: RequestForgotPasswordAction) {
    const resp:
        | IResponse<IForgotPasswordResponse>
        | undefined = yield callWrapperService(
        requestForgotPassword,
        action.payload
    );

    // console.log('forgotPassword response', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        if (!resp.data.isEmail && resp.data.clue) {
            yield all([
                put(
                    changeForgotPasswordPayloadValidationsAction(
                        'email',
                        '* O e-mail informado não confere com o cadastrado'
                    )
                ),
                put(didForgotPasswordSucceedAction(resp.data.clue))
            ]);
        } else {
            action.setShowAlert(true);
            yield put(didForgotPasswordSucceedAction(''));
            yield put(clearForgotPasswordPayloadAction());
        }
    } else {
        yield put(didForgotPasswordFailAction());
    }
}

export default all([
    takeLatest(REQUEST_FORGOT_PASSWORD, forgotPassword),
    takeLatest(CHANGE_FORGOT_PASSWORD_PAYLOAD, validateForgotPasswordPayload)
]);
