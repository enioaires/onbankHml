import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    IReceivePayload,
    REQUEST_PIXQRCODEDATA,
    REQUEST_RECEIVE
} from './types';

// Actions
import {
    didReceiveFailAction,
    didReceiveSucceedAction,
    RequestReceiveAction,
    didPixQrCodeDataSucessAction,
    didPixQrCodeDataFailureAction
} from './actions';

// Utils
import { transformToCurrencyPayload } from '../../../utils/helpers';
import callWrapperService from '../../../utils/callWrapperService';

const requestReceive = (payload: any) => {
    return api.post('pix/bankly/generate/dynamic', payload);
};

const requestPixQrCode = (payload: any) => {
    return api.get(`/pix/history`, payload);
};

// function* receive(action: RequestReceiveAction) {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const receivePayload = yield select(
//         (state: IApplicationState) => state.receive.payload
//     );
//     const deviceId = yield select(
//         (state: IApplicationState) => state.auth.deviceUUID
//     );

//     const payload = {
//         amount: transformToCurrencyPayload(receivePayload.amount),
//         description: receivePayload.description,
//         accountId,
//         deviceId
//     };

//     try {
//         const resp = yield call(() => requestReceive(payload));

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 403) {
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

//         yield put(didReceiveSucceedAction(resp));
//         action.navigation.push('Receive', { screen: 'QRCode' });
//     } catch (err) {
//         yield put(didReceiveFailAction());
//         const message = err.message.match(
//             /Esse tipo de conta não permite essa operação./g
//         )
//             ? 'A conta demonstrativa só permite realizar apenas 1 (um) depósito por qrcode no valor de até R$ 100,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!'
//             : err.message || 'Algo inesperado aconteceu...Tente novamente';
//         yield put(
//             setAlertMessageAction({
//                 type: 'error',
//                 title: 'Oops',
//                 message,
//                 action: err.message.match(
//                     /Esse tipo de conta não permite essa operação/g
//                 )
//                     ? {
//                           mainLabel: 'Completar conta',
//                           onPress: () => {
//                               action.navigation.push('Perfil');
//                           },
//                           secondLabel: 'Agora não'
//                       }
//                     : undefined
//             })
//         );
//     }
// }

function* requestPixQrCodeData() {
    const resp = yield callWrapperService(requestPixQrCode);
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didPixQrCodeDataSucessAction(resp?.data));
    } else {
        yield put(didPixQrCodeDataFailureAction());
    }
}

function* receive(action: RequestReceiveAction) {
    const receivePayload: IReceivePayload = yield select(
        (state: IApplicationState) => state.receive.payload
    );
    const deviceId: string = yield select(
        (state: IApplicationState) => state.auth.deviceUUID
    );

    const payload = {
        amount: transformToCurrencyPayload(receivePayload.amount)
    };

    const resp = yield callWrapperService(requestReceive, payload);

    // console.log('receive', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(didReceiveSucceedAction(resp?.data.links));
        action.navigation.push('Receive', { screen: 'PixQRCode' });
    } else {
        yield put(didReceiveFailAction());
    }
}

export default all([
    takeLatest(REQUEST_RECEIVE, receive),
    takeLatest(REQUEST_PIXQRCODEDATA, requestPixQrCodeData)
]);
