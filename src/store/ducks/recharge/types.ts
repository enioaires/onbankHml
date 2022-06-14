export const REQUEST_RECHARGE = 'REQUEST_RECHARGE';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const GET_OPERATORS = 'GET_OPERATORS';
export const GET_OPERATORS_SUCCESS = 'GET_OPERATORS_SUCCESS';
export const GET_VALUES = 'GET_VALUES';
export const GET_VALUES_SUCCESS = 'GET_VALUES_SUCCESS';
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';
export const CHANGE_OPERATOR = 'CHANGE_OPERATOR';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const CLEAR_RECHARGE_STATE = 'CLEAR_RECHARGE_STATE';
export const REQUEST_LATEST_RECHARGE = 'REQUEST_LATEST_RECHARGE';
export const LATEST_RECHARGE_SUCCESS = 'LATEST_RECHARGE_SUCCESS';
export const REQUEST_CONTACTS_RECHARGE = 'REQUEST_CONTACTS_RECHARGE';
export const CONTACTS_RECHARGE_SUCCESS = 'CONTACTS_RECHARGE_SUCCESS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const GET_RECHARGE_CONTACTS_DETAIL = 'GET_RECHARGE_CONTACTS_DETAIL';
export const GET_RECHARGE_CONTACTS_DETAIL_DONE =
    'GET_RECHARGE_CONTACTS_DETAIL_DONE';

export interface IRechargeState {
    payload: IRechargePayload;
    isLoading: boolean;
    error: boolean;
    operators: IRechargeOperators[] | null;
    values: IRechargeValues[] | null;
    latest: ILatestRechargeData[] | null;
    contacts: IContactsRechargeData[] | null;
}

export interface IContactsRechargeData {
    name: string;
}

export interface ILatestRechargeData {
    name: string;
    phoneNumber: string;
    date: string;
    amount: string;
    carrierId: string;
    carrierName: string;
}

export interface IRechargePayload {
    accountId: string;
    mobilePhone: {
        phoneNumber: string;
        country: string;
    };
    totalAmount: string;
    carrier: {
        carrierId: string;
        carrierName: string;
    };
    name: string;
    addContact: boolean;
}

export interface IRechargeOperators {
    carrierName: string;
    carrierId: string;
}

export interface IRechargeValues {
    productName: string;
    amount: number;
}
