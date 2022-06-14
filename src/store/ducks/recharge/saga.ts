import { put, all, takeLatest, select } from 'redux-saga/effects';
import * as dateFns from 'date-fns';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    IRechargePayload,
    GET_OPERATORS,
    GET_VALUES,
    REQUEST_RECHARGE,
    REQUEST_CONTACTS_RECHARGE,
    REQUEST_LATEST_RECHARGE,
    GET_RECHARGE_CONTACTS_DETAIL
} from './types';

// Actions
import {
    didRequestRechargeFailAction,
    didRequestRechargeOperatorsSucceedAction,
    didRequestRechargeValuesSucceedAction,
    didRequestRechargeSucceedAction,
    didLatestRechargeSucceedAction,
    didContactsRechargeSucceedAction,
    requestLatestRechargeAction,
    requestContactsRechargeAction,
    RequestRechargeAction,
    RequestRechargeValuesAction,
    RequestRechargeOperatorsAction,
    GetRechargeContactsDetailAction,
    getRechargeContactsDetailDoneAction
} from './actions';
import { requestBalanceAction } from '../balance/actions';
import { getStatementDataAction } from '../statement/actions';
import { storeReceiptAction } from '../receipt/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestLatestRecharge = (accountId: string) => {
    return api.get(`/phone-recharge/recharge/statements/${accountId}`);
};

const requestContactsRecharge = (accountId: string) => {
    return api.get(`/phone-recharge/recharge/contacts/${accountId}`);
};

const requestOperators = (phoneNumber: string) => {
    const areaCode = phoneNumber.replace(/\D/g, '').substring(0, 2);
    return api.post('/phone-recharge/carriers', {
        countryCode: 'BRA',
        areaCode
    });
};

const requestValues = (phoneNumber: string, operatorId: string) => {
    const areaCode = phoneNumber.replace(/\D/g, '').substring(0, 2);
    return api.post('/phone-recharge/carriers/value', {
        country: 'BRA',
        countryCode: 'BRA',
        areaCode,
        carrierId: operatorId
    });
};

const requestRecharge = (payload: IRechargePayload, accountId: string) => {
    return api.post('v2/phone-recharge/recharge', {
        ...payload,
        accountId
    });
};

const requestGetRechargeContactsDetail = (accountId: string, name: string) => {
    return api.get(`/phone-recharge/recharge/contacts/${accountId}/${name}`);
};

function* latestRecharge() {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const resp = yield callWrapperService(requestLatestRecharge, accountId);

    if (resp?.data) {
        yield put(didLatestRechargeSucceedAction(resp.data.reverse()));
    } else {
        yield put(didRequestRechargeFailAction());
    }
}

function* contactsRecharge() {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const resp = yield callWrapperService(requestContactsRecharge, accountId);

    // console.log('recharge contacts', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(
            didContactsRechargeSucceedAction(
                resp.data.sort((a: any, b: any) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
            )
        );
    } else {
        yield put(didRequestRechargeFailAction());
    }
}

function* rechargeOperators(action: RequestRechargeOperatorsAction) {
    const phoneNumber: string = yield select(
        (state: IApplicationState) =>
            state.recharge.payload.mobilePhone.phoneNumber
    );

    const resp = yield callWrapperService(requestOperators, phoneNumber);

    if (resp?.data) {
        yield put(didRequestRechargeOperatorsSucceedAction(resp.data));

        action.navigation.push('Recharge', { screen: 'Operators' });
    } else {
        yield put(didRequestRechargeFailAction());
    }
}

function* rechargeValues(action: RequestRechargeValuesAction) {
    const phoneNumber: string = yield select(
        (state: IApplicationState) =>
            state.recharge.payload.mobilePhone.phoneNumber
    );

    const operatorId: string = yield select(
        (state: IApplicationState) => state.recharge.payload.carrier.carrierId
    );

    const resp = yield callWrapperService(
        requestValues,
        phoneNumber,
        operatorId
    );

    if (resp?.data) {
        yield put(didRequestRechargeValuesSucceedAction(resp.data));

        action.navigation.push('Recharge', { screen: 'Values' });
    } else {
        yield put(didRequestRechargeFailAction());
    }
}

function* recharge(action: RequestRechargeAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const rechargePayload: IRechargePayload = yield select(
        (state: IApplicationState) => state.recharge.payload
    );

    const payload: any = {
        transactionPassword: action.password,
        mobilePhone: rechargePayload.mobilePhone,
        totalAmount: rechargePayload.totalAmount,
        carrierId: rechargePayload.carrier.carrierId,
        name: rechargePayload.name,
        addContact: rechargePayload.addContact
    };

    const resp = yield callWrapperService(requestRecharge, payload, accountId);

    if (resp?.data) {
        yield put(didRequestRechargeSucceedAction());

        yield put(
            storeReceiptAction({
                type: 'recharge',
                transactionCode: resp.data.transactionId,
                date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
                value: rechargePayload.totalAmount,
                rechargeInfo: {
                    phoneNumber: rechargePayload.mobilePhone.phoneNumber,
                    operator: rechargePayload.carrier.carrierName
                }
            })
        );

        setTimeout(() => {
            action.navigation.push('General', {
                screen: 'Receipt'
            });
        }, 400);

        yield all([
            put(requestBalanceAction()),
            put(getStatementDataAction()),
            put(requestLatestRechargeAction()),
            put(requestContactsRechargeAction())
        ]);
    } else {
        yield put(didRequestRechargeFailAction());
    }
}

function* getRechargeContactsDetail(action: GetRechargeContactsDetailAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const resp: any = yield callWrapperService(
        requestGetRechargeContactsDetail,
        accountId,
        action.name
    );

    // console.log('recharge detail contact', JSON.stringify(resp, null, 2));

    yield put(getRechargeContactsDetailDoneAction());

    if (resp?.data) {
        action.setClientInfo({
            name: action.name,
            phones: resp.data
        });

        action.setShowModal();
    }
}

export default all([
    takeLatest(GET_OPERATORS, rechargeOperators),
    takeLatest(GET_VALUES, rechargeValues),
    takeLatest(REQUEST_RECHARGE, recharge),
    takeLatest(REQUEST_CONTACTS_RECHARGE, contactsRecharge),
    takeLatest(REQUEST_LATEST_RECHARGE, latestRecharge),
    takeLatest(GET_RECHARGE_CONTACTS_DETAIL, getRechargeContactsDetail)
]);
