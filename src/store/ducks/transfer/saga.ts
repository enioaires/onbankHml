import { all, takeLatest, put, select } from 'redux-saga/effects';
import * as dateFns from 'date-fns';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    ITransferPayload,
    REQUEST_CONTACTS_TRANSFER,
    REQUEST_FREQUENTLY_TRANSFER,
    REQUEST_LATEST_TRANSFER,
    REQUEST_TRANSFER,
    CANCEL_TRANSFER_SCHEDULE,
    GET_TRANSFER_CONTACTS_DETAIL
} from './types';

// Actions
import {
    didLatestTransferSucceedAction,
    didTransferFailAction,
    didContactsTransferSucceedAction,
    didTransferSucceedAction,
    requestLatestTransferAction,
    requestContactsTransferAction,
    didFrequentlyTransferSucceedAction,
    RequestTransferAction,
    cancelTransferScheduleFailAction,
    cancelTransferScheduleSuccessAction,
    CancelTransferScheduleAction,
    GetTransferContactsDetailAction,
    getTransferContactsDetailDoneAction
} from './actions';
import { requestBalanceAction } from '../balance/actions';
import { getStatementDataAction } from '../statement/actions';
import { storeReceiptAction } from '../receipt/actions';

// Utils
import { transformToCurrencyPayload } from '../../../utils/helpers';
import callWrapperService from '../../../utils/callWrapperService';

const requestIntTransfer = (payload: any) => {
    return api.post('v2/transfer/int', payload);
};

const requestTEDTransfer = (payload: any) => {
    return api.post('v2/transfer/ext', payload);
};

const requestLatestTransfer = (accountId: string) => {
    return api.get(`/transfer/statements/${accountId}`);
};

const requestContactsTransfer = (listContact: string[]) => {
    return api.post(`/transfer/phone/contacts`, { listContact });
};

const requestFrequentlyTransfer = () => {
    return api.get(`/transfer/frequently`);
};

const requestCancelSchedule = (transactionId: string) => {
    return api.del(`/schedule/${transactionId}`);
};

const requestGetTransferContacts = (accountId: string, taxId: string) => {
    return api.get(
        `/transfer/contacts/${accountId}/${taxId.replace(/\D/g, '')}`
    );
};

function* cancelSchedule(action: CancelTransferScheduleAction) {
    const resp = yield callWrapperService(
        requestCancelSchedule,
        action.transactionId
    );

    if (resp) {
        yield put(getStatementDataAction());
        yield put(cancelTransferScheduleSuccessAction());
        action.navigation.goBack();
    } else {
        yield put(cancelTransferScheduleFailAction());
    }
}

function* latestTransfer() {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const resp = yield callWrapperService(requestLatestTransfer, accountId);

    // console.log('latest transfer', JSON.stringify(resp.data, null, 2));

    if (resp?.data) {
        yield put(didLatestTransferSucceedAction(resp.data.reverse()));
    } else {
        yield put(didTransferFailAction());
    }
}

function* contactsTransfer() {
    const listContact: string[] = yield select(
        (state: IApplicationState) => state.transfer.listContact
    );

    const resp = yield callWrapperService(requestContactsTransfer, listContact);

    // console.log('contacts', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(
            didContactsTransferSucceedAction(
                resp.data.sort((a: any, b: any) => {
                    if (a.contact > b.contact) return 1;
                    if (a.contact < b.contact) return -1;
                    return 0;
                })
            )
        );
    } else {
        yield put(didTransferFailAction());
    }
}

function* frequentlyTransfer() {
    const resp = yield callWrapperService(requestFrequentlyTransfer);

    if (resp?.data) {
        yield put(didFrequentlyTransferSucceedAction(resp.data));
    } else {
        yield put(didTransferFailAction());
    }
}

function* transfer(action: RequestTransferAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );
    const senderAccount: number = yield select(
        (state: IApplicationState) => state.user.data.account.account
    );
    const senderBranch: number = yield select(
        (state: IApplicationState) => state.user.data.account.branch
    );
    const transferPayload: ITransferPayload = yield select(
        (state: IApplicationState) => state.transfer.payload
    );

    let payload: any = {
        amount: transformToCurrencyPayload(transferPayload.amount),
        senderAccountId: accountId,
        receiverTaxId: transferPayload.receiverTaxId.replace(/\D/g, ''),
        receiverName: transferPayload.receiverName,
        receiverBranch: transferPayload.receiverBranch,
        receiverAccount: transferPayload.receiverAccount,
        senderAccount,
        senderBranch,
        transactionPassword: action.password
    };

    if (transferPayload.type === 'ted') {
        payload = {
            ...payload,
            receiverBank: transferPayload.receiverBank,
            receiverBankName: transferPayload.receiverBankName,
            receiverAccountType: transferPayload.receiverAccountType,
            receiverPersonType: transferPayload.receiverPersonType
        };
    }

    if (transferPayload.type === 'int') {
        payload = {
            ...payload,
            receiverAccountId: transferPayload.receiverAccountId
        };
    }

    const resp = yield callWrapperService(() => {
        if (transferPayload.type === 'ted') {
            return requestTEDTransfer(payload);
        }
        return requestIntTransfer(payload);
    });

    // console.log('transfer', JSON.stringify(resp, null, 2));
    // console.log('transfer payload', JSON.stringify(payload, null, 2));

    if (resp?.data) {
        yield all([
            put(requestBalanceAction()),
            put(getStatementDataAction()),
            put(requestLatestTransferAction()),
            put(requestContactsTransferAction())
        ]);

        yield put(
            storeReceiptAction({
                type: 'transfer',
                transactionCode: resp.data.transactionId,
                date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
                value: transformToCurrencyPayload(transferPayload.amount),
                transferInfo: {
                    receiverName: transferPayload.receiverName,
                    receiverTaxId: transferPayload.receiverTaxId.replace(
                        /\D/g,
                        ''
                    ),
                    receiverTaxIdFormatted:
                        transferPayload.receiverTaxIdFormatted,
                    receiverAccount: transferPayload.receiverAccount,
                    receiverBranch: transferPayload.receiverBranch,
                    receiverBankName: transferPayload.receiverBankName,
                    description: resp.data.nextDate || undefined
                }
            })
        );
        setTimeout(() => {
            action.navigation.reset({
                index: 0,
                routes: [
                    { name: 'General' },
                    { name: 'General', params: { screen: 'Receipt' } }
                ]
            });
        }, 400);

        yield put(didTransferSucceedAction());
    } else {
        yield put(didTransferFailAction());
    }
}

function* getTransferContactsDetail(action: GetTransferContactsDetailAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const resp: any = yield callWrapperService(
        requestGetTransferContacts,
        accountId,
        action.taxId
    );

    // console.log('transfer contacts', JSON.stringify(resp, null, 2));

    yield put(getTransferContactsDetailDoneAction());

    if (resp?.data) {
        action.setClientInfo({
            username: action.username,
            taxId: action.taxId,
            banks: resp.data
        });

        action.setShowModal();
    }
}

export default all([
    takeLatest(REQUEST_LATEST_TRANSFER, latestTransfer),
    takeLatest(REQUEST_CONTACTS_TRANSFER, contactsTransfer),
    takeLatest(REQUEST_FREQUENTLY_TRANSFER, frequentlyTransfer),
    takeLatest(REQUEST_TRANSFER, transfer),
    takeLatest(CANCEL_TRANSFER_SCHEDULE, cancelSchedule),
    takeLatest(GET_TRANSFER_CONTACTS_DETAIL, getTransferContactsDetail)
]);
