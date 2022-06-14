import { all, takeLatest, select, put } from 'redux-saga/effects';
import * as dateFns from 'date-fns';

// Api
import api from '../../../api';

// Actions
import {
    didRechargeServicesSuccesAction,
    didRechargeServicesFailAction,
    didRechargeServicesValuesFailAction,
    didRechargeServicesValuesSuccessAction,
    didRequestRechargeServiceFailAction,
    didRequestRechargeServiceSuccessAction,
    didRechargeServicesHistoryFailAction,
    didRechargeServicesHistorySuccessAction
} from './actions';
import { requestBalanceAction } from '../../ducks/balance/actions';
import { getStatementDataAction } from '../../ducks/statement/actions';
import { storeReceiptAction } from '../../ducks/receipt/actions';
import { setAlertMessageAction } from '../alert/actions';
import { getCashbackBalanceAction } from '../cashback/actions';

// Types
import {
    GET_RECHARGES_SERVICES,
    GET_RECHARGES_SERVICES_VALUES,
    REQUEST_RECHARGE_SERVICE,
    GET_RECHARGE_SERVICES_HISTORY,
    IRechargeService,
    IRechargeServiceValues
} from './types';
import { IApplicationState } from '../../types';
import {
    GetRechargeServicesAction,
    GetRechargeServicesValuesAction,
    RequestRechargeServiceAction,
    GetRechargeServicesHistoryAction
} from './actions';

// Utils
import { transformToCurrencyPayload } from '../../../utils/helpers';
import callWrapperService from '../../../utils/callWrapperService';

const requestRechargeServicesList = (stateCode: any) => {
    return api.get(`/topups/list?stateCode=${71}`);
};

const requestRechargeServicesValuesList = (payload: any) => {
    return api.post('/topups/list/values', payload);
};

const requestRechargeServiceFunc = (payload: any) => {
    return api.post('/topups/charge', payload);
};

const requestRechargeServicesHistory = () => {
    return api.get('topups/history');
};

// Get list of recharge services providers
function* getRechargeServices(action: GetRechargeServicesAction) {
    const phoneNumber: string = yield select(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );

    const stateCode = phoneNumber.substr(0, 2);
    // console.log('payload Final', payload)

    const resp = yield callWrapperService(
        requestRechargeServicesList,
        stateCode
    );

    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didRechargeServicesSuccesAction(resp.data.reverse()));
    } else {
        yield put(didRechargeServicesFailAction());
    }
}

// Request a list of values products of a provider id
function* requestRechargeServiceValues(
    action: GetRechargeServicesValuesAction
) {
    const phoneNumber: string = yield select(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );
    const stateCode = phoneNumber.substr(0, 2);

    const payload = {
        stateCode,
        providerId: action.providerId,
        name: action.name
    };

    const resp = yield callWrapperService(
        requestRechargeServicesValuesList,
        payload
    );

    if (resp?.data) {
        yield put(didRechargeServicesValuesSuccessAction(resp.data));
    } else {
        yield put(didRechargeServicesValuesFailAction());
    }
}

// Request the payment of recharge service
function* requestRechargeService(action: RequestRechargeServiceAction) {
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
        transactionPassword: action.password,
        externalTerminal: documentNumber,
        amount: amount,
        documentNumber: documentNumber,
        providerId: action.providerId,
        phoneNumber: phoneNumberFormatted,
        phoneStateCode: stateCode,
        phoneCountryCode: 55,
        product: product,
        productLabel: rechargeServiceSelected.productName
    };

    if (action.providerId === 2127) {
        payload = {
            ...payload,
            signerCode: signerCode
        };
    }

    console.log(payload);

    const resp = yield callWrapperService(requestRechargeServiceFunc, payload);

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

function* getRechargeServicesHistory(action: GetRechargeServicesHistoryAction) {
    const resp = yield callWrapperService(requestRechargeServicesHistory);

    if (resp?.data) {
        yield put(didRechargeServicesHistorySuccessAction(resp.data));
    } else {
        yield put(didRechargeServicesHistoryFailAction());
    }
}

export default all([
    takeLatest(GET_RECHARGES_SERVICES, getRechargeServices),
    takeLatest(GET_RECHARGES_SERVICES_VALUES, requestRechargeServiceValues),
    takeLatest(REQUEST_RECHARGE_SERVICE, requestRechargeService),
    takeLatest(GET_RECHARGE_SERVICES_HISTORY, getRechargeServicesHistory)
]);
