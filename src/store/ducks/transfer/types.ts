export const REQUEST_LATEST_TRANSFER = 'REQUEST_LATEST_TRANSFER';
export const LATEST_TRANSFER_SUCCESS = 'LATEST_TRANSFER_SUCCESS';
export const REQUEST_CONTACTS_TRANSFER = 'REQUEST_CONTACTS_TRANSFER';
export const CONTACTS_TRANSFER_SUCCESS = 'CONTACTS_TRANSFER_SUCCESS';
export const REQUEST_FREQUENTLY_TRANSFER = 'REQUEST_FREQUENTLY_TRANSFER';
export const FREQUENTLY_TRANSFER_SUCCESS = 'FREQUENTLY_TRANSFER_SUCCESS';
export const CHANGE_TRANSFER_PAYLOAD = 'CHANGE_TRANSFER_PAYLOAD';
export const CLEAR_TRANSFER_PAYLOAD = 'CLEAR_TRANSFER_PAYLOAD';
export const REQUEST_TRANSFER = 'REQUEST_TRANSFER';
export const TRANSFER_SUCCESS = 'TRANSFER_SUCCESS';
export const TRANSFER_FAILURE = 'TRANSFER_FAILURE';
export const CHANGE_PAYLOAD_ALL = 'CHANGE_PAYLOAD_ALL';
export const GET_USER_LIST_CONTACTS = 'GET_USER_LIST_CONTACTS';
export const GET_USER_LIST_CONTACTS_SUCCESS = 'GET_USER_LIST_CONTACTS_SUCCESS';
export const CANCEL_TRANSFER_SCHEDULE = 'CANCEL_TRANSFER_SCHEDULE';
export const CANCEL_TRANSFER_SCHEDULE_SUCCESS =
    'CANCEL_TRANSFER_SCHEDULE_SUCCESS';
export const CANCEL_TRANSFER_SCHEDULE_FAILURE =
    'CANCEL_TRANSFER_SCHEDULE_FAILURE';
export const GET_TRANSFER_CONTACTS_DETAIL = 'GET_TRANSFER_CONTACTS_DETAIL';
export const GET_TRANSFER_CONTACTS_DETAIL_DONE =
    'GET_TRANSFER_CONTACTS_DETAIL_DONE';

export interface IContactsTransferData {
    contact: string;
    taxId: string;
    onbankAccount: boolean;
    phone?: string;
}

export interface ILatestTransferData {
    name: string;
    taxId: string;
    taxIdFormatted: string;
    amount: string;
    date: string;
    onbankAccount: boolean;
    phone?: string;
    receiverBankNumber: string;
    receiverBankName: string;
    receiverBranch: string;
    receiverAccount: string;
    receiverAccountId?: string;
}

export interface IFrequentlyTransferData {
    onbankAccount: boolean;
    name: string;
    taxId: string;
    receiverAccount: string;
    receiverBranch: string;
    phone?: string;
}

export interface ITransferPayload {
    type: string;
    receiverAccountId: string;
    receiverTaxId: string;
    receiverTaxIdFormatted: string;
    receiverName: string;
    amount: string;
    receiverBank: string;
    receiverBankName: string;
    receiverBranch: string;
    receiverAccount: string;
    receiverAccountType: string;
    receiverPersonType: string;
}

export interface ITransferState {
    payload: ITransferPayload;
    latest: ILatestTransferData[] | null;
    contacts: IContactsTransferData[] | null;
    frequently: IFrequentlyTransferData[] | null;
    listContact: string[];
    isLoading: boolean;
    error: boolean;
}
