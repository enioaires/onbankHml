import { all, put, takeLatest } from '@redux-saga/core/effects';

import api from '../../../api';
import { GetQRCodeDataAction, getQRCodeDataDoneAction } from './actions';
import { GET_QRCODE_DATA } from './types';
import { changeQRCodePaymentPayloadAction } from '../payment/actions';

import callWrapperService from '../../../utils/callWrapperService';

const requestGetQRCodeData = (url: string) => {
    return api.get(`/qrcode/receive/${url}`);
};

function* getQRCodeData(action: GetQRCodeDataAction) {
    const resp: any = yield callWrapperService(
        requestGetQRCodeData,
        action.url
    );

    yield put(getQRCodeDataDoneAction());

    if (resp?.data) {
        yield put(changeQRCodePaymentPayloadAction(resp.data));
        action.navigation.push('Payments', { screen: 'QRCodeConfirmation' });
    }
}

export default all([takeLatest(GET_QRCODE_DATA, getQRCodeData)]);
