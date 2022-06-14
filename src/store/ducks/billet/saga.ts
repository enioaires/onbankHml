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

const requestGetBilletDetails = (accountId: string, billetNumber: string) => {
    return api.get(`/account/${accountId}/billet/${billetNumber}`);
};

function* getBilletDetails(action: GetBilletDetailsAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );
    const resp: any = yield callWrapperService(
        requestGetBilletDetails,
        accountId,
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
