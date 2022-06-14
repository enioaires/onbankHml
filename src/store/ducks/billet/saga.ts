import { all, put, select, takeLatest } from 'redux-saga/effects';
import numeral from 'numeral';

// Store
import { IApplicationState } from '../../types';
import { GetBilletDetailsAction, stopBilletDetailsAction } from './actions';
import { GET_BILLET_DETAILS } from './types';
import { changePaymentPayloadAction } from '../payment/actions';

// Api
import api from '../../../api';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestGetBilletDetails = (billetNumber: string) => {
    return api.get(`billet/${billetNumber}/show`);
};

function* getBilletDetails(action: GetBilletDetailsAction) {
    const resp: any = yield callWrapperService(
        requestGetBilletDetails,
        action.billetNumber
    );

    // console.log(JSON.stringify(resp, null, 2))
    yield put(stopBilletDetailsAction());

    if (resp?.data) {
        yield put(changePaymentPayloadAction(resp.data));
        if (
            numeral(resp.data.paymentDetails.minimumAmount).value() !==
            numeral(resp.data.paymentDetails.maximumAmount).value()
        ) {
            action.navigation.push('Amount');
        } else {
            action.navigation.push('Payment', { isDemoVerify: true });
        }
    }
}

export default all([takeLatest(GET_BILLET_DETAILS, getBilletDetails)]);
