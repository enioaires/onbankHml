export const GET_RECHARGES_SERVICES = 'GET_RECHARGES_SERVICES';
export const GET_RECHARGES_SERVICES_SUCCESS = 'GET_RECHARGES_SERVICES_SUCCESS';
export const GET_RECHARGES_SERVICES_FAIL = 'GET_RECHARGES_SERVICES_FAIL';
export const CHANGE_RECHARGE_SERVICES_PAYLOAD =
    'CHANGE_RECHARGE_SERVICES_PAYLOAD';
export const CHANGE_RECHARGE_SERVICES_SELECTED =
    'CHANGE_RECHARGE_SERVICES_SELECTED';
export const GET_RECHARGES_SERVICES_VALUES = 'GET_RECHARGES_SERVICES_VALUES';
export const GET_RECHARGES_SERVICES_VALUES_SUCCESS =
    'GET_RECHARGES_SERVICES_VALUES_SUCCESS';
export const GET_RECHARGES_SERVICES_VALUES_FAIL =
    'GET_RECHARGES_SERVICES_VALUES_FAIL';
export const REQUEST_RECHARGE_SERVICE = 'REQUEST_RECHARGE_SERVICE';
export const REQUEST_RECHARGE_SERVICE_SUCCESS =
    'REQUEST_RECHARGE_SERVICE_SUCCESS';
export const REQUEST_RECHARGE_SERVICE_FAIL = 'REQUEST_RECHARGE_SERVICE_FAIL';
export const CLEAR_RECHARGE_SERVICES_STATE = 'CLEAR_RECHARGE_SERVICES_STATE';
export const GET_RECHARGE_SERVICES_HISTORY = 'GET_RECHARGE_SERVICES_HISTORY';
export const GET_RECHARGE_SERVICES_HISTORY_SUCCESS =
    'GET_RECHARGE_SERVICES_HISTORY_SUCCESS';
export const GET_RECHARGE_SERVICES_HISTORY_FAIL =
    'GET_RECHARGE_SERVICES_HISTORY_FAIL';

export interface IRechargeServicesState {
    payload: {
        signerCode: string;
        amount: number;
        product: string;
    };
    isLoading: boolean;
    hasError: boolean;
    rechargeServicesList: IRechargeService[];
    rechargeServiceValuesList: IRechargeServiceValues[] | [];
    rechargeServiceSelected: IRechargeServiceValues;
    receipt: {
        product: string;
        transactionId: string;
        amount: number;
        pin: string;
        signerCode?: string;
    };
    rechargeServicesHistory: IRechargeServiceHistory[] | [];
}

export interface IRechargeService {
    category: number;
    name: string;
    providerId: number;
    RegionaisnameProvider: any[];
    TipoRecarganameProvider: number;
    maxValue: number;
    minValue: number;
    slugname?: string;
}

export interface IRechargeServiceValues {
    properties: any;
    code: number;
    cost: number;
    detail: string;
    productName: string;
    checkSum: number;
    dueProduct: number;
    valueBonus: number;
    maxValue: number;
    minValue: number;
}

export interface IRechargeServiceHistory {
    amount: string;
    captured: boolean;
    pin?: string;
    date: string;
    id: string;
    productName: string;
    productType?: string;
    signedCode?: string | null;
}
