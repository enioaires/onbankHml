import { all, takeLatest, put, select } from 'redux-saga/effects';
import * as dateFns from 'date-fns';

// API
import api from '../../../api';

// Actions
import {
    getCashbackSuccessAction,
    getCashbackFailAction,
    getCashbackBalanceSuccessAction,
    getCashbackBalanceFailAction,
    RequestCashbackChargeAction,
    getCashbackBalanceAction
} from './actions';
import {
    didRequestRechargeServiceFailAction,
    didRequestRechargeServiceSuccessAction
} from '../rechargeServices/actions';
import { requestBalanceAction } from '../../ducks/balance/actions';
import { getStatementDataAction } from '../../ducks/statement/actions';
import { storeReceiptAction } from '../../ducks/receipt/actions';
import { setAlertMessageAction } from '../alert/actions';

// Types
import {
    GET_CASHBACK,
    GET_CASHBACK_BALANCE,
    REQUEST_CASHBACK_CHARGE
} from './types';
import { IRechargeServiceValues } from '../rechargeServices/types';
import { IApplicationState } from '../../types';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const getUserCashbackBalance = () => {
    return api.get('/cashback/balance');
};

const getUserCashbackStatements = () => {
    return api.get(`/cashback/statements`);
};

const requestUserCashbackCharge = (payload: any) => {
    return api.post(`topups/charge/cashback`, payload);
};

function* getCashbackBalance() {
    const resp: any = yield callWrapperService(getUserCashbackBalance);
    // console.log(resp, JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(getCashbackBalanceSuccessAction(resp.data));
    } else {
        yield put(getCashbackBalanceFailAction());
    }
}

function* getCashback() {
    const resp: any = yield callWrapperService(getUserCashbackStatements);
    // console.log(resp, JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(getCashbackSuccessAction(resp.data));
    } else {
        yield put(getCashbackFailAction());
    }
}

function* requestCashbackCharge(action: RequestCashbackChargeAction) {
    const amount: string = yield select(
        (state: IApplicationState) => state.rechargeServices.payload.amount
    );
    const signerCode: string = yield select(
        (state: IApplicationState) => state.rechargeServices.payload.signerCode
    );
    const documentNumber: string = yield select(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );
    const phoneNumber: string = yield select(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );
    const product: string = yield select(
        (state: IApplicationState) => state.rechargeServices.payload.product
    );
    const rechargeServiceSelected: IRechargeServiceValues = yield select(
        (state: IApplicationState) =>
            state.rechargeServices.rechargeServiceSelected
    );
    const stateCode = phoneNumber.substr(0, 2);
    const phoneNumberFormatted = phoneNumber.substr(2);

    let payload: any = {
        password: action.password,
        externalTerminal: documentNumber,
        amount,
        documentNumber,
        providerId: action.providerId,
        phoneNumber: phoneNumberFormatted,
        phoneStateCode: stateCode,
        phoneCountryCode: 55,
        product,
        productLabel: rechargeServiceSelected.productName
    };

    if (action.providerId === 2127) {
        payload = {
            ...payload,
            signerCode
        };
    }

    // console.log(payload)

    const resp = yield callWrapperService(requestUserCashbackCharge, payload);

    if (resp?.data && !resp.data.message) {
        yield all([
            put(requestBalanceAction()),
            put(getStatementDataAction()),
            put(getCashbackBalanceAction())
        ]);
        yield put(didRequestRechargeServiceSuccessAction(resp.data));

        yield put(
            storeReceiptAction({
                type: 'rechargeServices',
                transactionCode: resp.data.transactionId,
                date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
                value: amount,
                rechargeServices: {
                    product: resp.data.product,
                    transactionId: resp.data.transactionId,
                    amount: resp.data.amount,
                    pin: resp.data.pin || '',
                    signerCode: resp.data.signerCode || ''
                }
            })
        );

        setTimeout(() => {
            action.navigation.reset({
                index: 0,
                routes: [
                    { name: 'General' },
                    { name: 'RechargeServices', params: { screen: 'Latest' } }
                ]
            });
        }, 400);
    } else {
        if (resp?.data.message) {
            yield put(
                setAlertMessageAction({
                    title: 'Opss..',
                    message: resp.data.message,
                    type: 'error'
                })
            );
        }
        yield put(didRequestRechargeServiceFailAction());
    }
}

export default all([
    takeLatest(GET_CASHBACK_BALANCE, getCashbackBalance),
    takeLatest(GET_CASHBACK, getCashback),
    takeLatest(REQUEST_CASHBACK_CHARGE, requestCashbackCharge)
]);
