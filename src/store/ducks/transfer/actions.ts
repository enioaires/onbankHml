import { StatementStackNavigationProps } from '../../../routes/Logged/types';
import {
    ILatestTransferData,
    IContactsTransferData,
    ITransferPayload,
    IFrequentlyTransferData,
    REQUEST_LATEST_TRANSFER,
    LATEST_TRANSFER_SUCCESS,
    REQUEST_CONTACTS_TRANSFER,
    CONTACTS_TRANSFER_SUCCESS,
    REQUEST_FREQUENTLY_TRANSFER,
    FREQUENTLY_TRANSFER_SUCCESS,
    CHANGE_TRANSFER_PAYLOAD,
    CLEAR_TRANSFER_PAYLOAD,
    REQUEST_TRANSFER,
    TRANSFER_SUCCESS,
    TRANSFER_FAILURE,
    CHANGE_PAYLOAD_ALL,
    // GET_USER_LIST_CONTACTS,
    GET_USER_LIST_CONTACTS_SUCCESS,
    CANCEL_TRANSFER_SCHEDULE,
    CANCEL_TRANSFER_SCHEDULE_SUCCESS,
    CANCEL_TRANSFER_SCHEDULE_FAILURE,
    GET_TRANSFER_CONTACTS_DETAIL,
    GET_TRANSFER_CONTACTS_DETAIL_DONE
} from './types';

export type GetTransferContactsDetailAction = {
    type: typeof GET_TRANSFER_CONTACTS_DETAIL;
    taxId: string;
    username: string;
    setClientInfo: ({
        username,
        taxId,
        banks
    }: {
        username: string;
        taxId: string;
        banks: any[];
    }) => void;
    setShowModal: () => void;
};

type GetTransferContactsDetailDoneAction = {
    type: typeof GET_TRANSFER_CONTACTS_DETAIL_DONE;
};

type ChangeTransferPayloadAction = {
    type: typeof CHANGE_TRANSFER_PAYLOAD;
    payload: {
        key: keyof ITransferPayload;
        value: string;
    };
};

type ChangeTransferPayloadAllAction = {
    type: typeof CHANGE_PAYLOAD_ALL;
    payload: any;
};

type ClearTransferPayloadAction = {
    type: typeof CLEAR_TRANSFER_PAYLOAD;
};

export type RequestTransferAction = {
    type: typeof REQUEST_TRANSFER;
    navigation: any;
    password?: string;
};

type RequestLatestTransferAction = {
    type: typeof REQUEST_LATEST_TRANSFER;
};

type RequestContactsTransferAction = {
    type: typeof REQUEST_CONTACTS_TRANSFER;
};

type RequestFrequentlyTransferAction = {
    type: typeof REQUEST_FREQUENTLY_TRANSFER;
};

type DidTransferFailAction = {
    type: typeof TRANSFER_FAILURE;
};

type DidTransferSucceedAction = {
    type: typeof TRANSFER_SUCCESS;
};

type DidLatestTransferSucceedAction = {
    type: typeof LATEST_TRANSFER_SUCCESS;
    data: ILatestTransferData[];
};

type DidContactsTransferSucceedAction = {
    type: typeof CONTACTS_TRANSFER_SUCCESS;
    data: IContactsTransferData[];
};

type DidFrequentlyTransferSucceedAction = {
    type: typeof FREQUENTLY_TRANSFER_SUCCESS;
    data: IFrequentlyTransferData[];
};

type GetUserContactsListSuccessAction = {
    type: typeof GET_USER_LIST_CONTACTS_SUCCESS;
    data: string[];
};

export type CancelTransferScheduleAction = {
    type: typeof CANCEL_TRANSFER_SCHEDULE;
    transactionId: string;
    navigation: StatementStackNavigationProps<'Schedule'>['navigation'];
};

type CancelTransferScheduleSuccessAction = {
    type: typeof CANCEL_TRANSFER_SCHEDULE_SUCCESS;
};

type CancelTransferScheduleFailAction = {
    type: typeof CANCEL_TRANSFER_SCHEDULE_FAILURE;
};

export type TransferAction =
    | ChangeTransferPayloadAction
    | ChangeTransferPayloadAllAction
    | ClearTransferPayloadAction
    | RequestTransferAction
    | RequestLatestTransferAction
    | RequestContactsTransferAction
    | RequestFrequentlyTransferAction
    | DidTransferFailAction
    | DidTransferSucceedAction
    | DidLatestTransferSucceedAction
    | DidContactsTransferSucceedAction
    | DidFrequentlyTransferSucceedAction
    | GetUserContactsListSuccessAction
    | CancelTransferScheduleAction
    | CancelTransferScheduleFailAction
    | CancelTransferScheduleSuccessAction
    | GetTransferContactsDetailAction
    | GetTransferContactsDetailDoneAction;

export const getTransferContactsDetailAction = (
    taxId: string,
    username: string,
    setClientInfo: ({
        username,
        taxId,
        banks
    }: {
        username: string;
        taxId: string;
        banks: any[];
    }) => void,
    setShowModal: () => void
): GetTransferContactsDetailAction => ({
    type: 'GET_TRANSFER_CONTACTS_DETAIL',
    taxId,
    username,
    setClientInfo,
    setShowModal
});

export const getTransferContactsDetailDoneAction =
    (): GetTransferContactsDetailDoneAction => ({
        type: 'GET_TRANSFER_CONTACTS_DETAIL_DONE'
    });

export const changeTransferPayloadAction = (payload: {
    key: keyof ITransferPayload;
    value: string;
}): ChangeTransferPayloadAction => ({
    type: 'CHANGE_TRANSFER_PAYLOAD',
    payload
});

export const changeTransferPayloadAllAction = (
    payload: any
): ChangeTransferPayloadAllAction => ({
    type: 'CHANGE_PAYLOAD_ALL',
    payload
});

export const clearTransferPayloadAction = (): ClearTransferPayloadAction => ({
    type: 'CLEAR_TRANSFER_PAYLOAD'
});

export const requestTransferAction = (
    navigation: any,
    password?: string
): RequestTransferAction => ({
    type: 'REQUEST_TRANSFER',
    navigation,
    password
});

export const requestLatestTransferAction = (): RequestLatestTransferAction => ({
    type: 'REQUEST_LATEST_TRANSFER'
});

export const requestContactsTransferAction =
    (): RequestContactsTransferAction => ({
        type: 'REQUEST_CONTACTS_TRANSFER'
    });

export const requestFrequentlyTransferAction =
    (): RequestFrequentlyTransferAction => ({
        type: 'REQUEST_FREQUENTLY_TRANSFER'
    });

export const didTransferFailAction = (): DidTransferFailAction => ({
    type: 'TRANSFER_FAILURE'
});

export const didTransferSucceedAction = (): DidTransferSucceedAction => ({
    type: 'TRANSFER_SUCCESS'
});

export const didLatestTransferSucceedAction = (
    data: ILatestTransferData[]
): DidLatestTransferSucceedAction => ({
    type: 'LATEST_TRANSFER_SUCCESS',
    data
});

export const didContactsTransferSucceedAction = (
    data: IContactsTransferData[]
): DidContactsTransferSucceedAction => ({
    type: 'CONTACTS_TRANSFER_SUCCESS',
    data
});

export const didFrequentlyTransferSucceedAction = (
    data: IFrequentlyTransferData[]
): DidFrequentlyTransferSucceedAction => ({
    type: 'FREQUENTLY_TRANSFER_SUCCESS',
    data
});

export const getUserContactsListSuccessAction = (
    data: string[]
): GetUserContactsListSuccessAction => ({
    type: 'GET_USER_LIST_CONTACTS_SUCCESS',
    data
});

export const cancelTransferScheduleAction = (
    transactionId: string,
    navigation: StatementStackNavigationProps<'Schedule'>['navigation']
): CancelTransferScheduleAction => ({
    type: 'CANCEL_TRANSFER_SCHEDULE',
    transactionId,
    navigation
});

export const cancelTransferScheduleSuccessAction =
    (): CancelTransferScheduleSuccessAction => ({
        type: 'CANCEL_TRANSFER_SCHEDULE_SUCCESS'
    });

export const cancelTransferScheduleFailAction =
    (): CancelTransferScheduleFailAction => ({
        type: 'CANCEL_TRANSFER_SCHEDULE_FAILURE'
    });
