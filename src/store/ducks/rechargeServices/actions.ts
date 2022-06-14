import { RechargeServicesStackNavigationProps } from '../../../routes/Logged/types';
import {
    IRechargeService,
    IRechargeServicesState,
    IRechargeServiceValues,
    GET_RECHARGES_SERVICES,
    GET_RECHARGES_SERVICES_FAIL,
    GET_RECHARGES_SERVICES_SUCCESS,
    CHANGE_RECHARGE_SERVICES_PAYLOAD,
    CHANGE_RECHARGE_SERVICES_SELECTED,
    GET_RECHARGES_SERVICES_VALUES,
    GET_RECHARGES_SERVICES_VALUES_FAIL,
    GET_RECHARGES_SERVICES_VALUES_SUCCESS,
    REQUEST_RECHARGE_SERVICE,
    REQUEST_RECHARGE_SERVICE_FAIL,
    REQUEST_RECHARGE_SERVICE_SUCCESS,
    CLEAR_RECHARGE_SERVICES_STATE,
    GET_RECHARGE_SERVICES_HISTORY,
    GET_RECHARGE_SERVICES_HISTORY_FAIL,
    GET_RECHARGE_SERVICES_HISTORY_SUCCESS
} from './types';

export type GetRechargeServicesAction = {
    type: typeof GET_RECHARGES_SERVICES;
};

export type DidRechargeServicesSuccessAction = {
    type: typeof GET_RECHARGES_SERVICES_SUCCESS;
    payload: IRechargeService[];
};

export type DidRechargeServicesFailAction = {
    type: typeof GET_RECHARGES_SERVICES_FAIL;
};

export type ChangeRechargeServicesPayloadAction = {
    type: typeof CHANGE_RECHARGE_SERVICES_PAYLOAD;
    payload: any;
};

export type ChangeRechargeServicesSelectedAction = {
    type: typeof CHANGE_RECHARGE_SERVICES_SELECTED;
    payload: IRechargeServiceValues;
};

export type GetRechargeServicesValuesAction = {
    type: typeof GET_RECHARGES_SERVICES_VALUES;
    providerId: number;
    name: string;
};

export type DidRechargeServicesValuesSuccessAction = {
    type: typeof GET_RECHARGES_SERVICES_VALUES_SUCCESS;
    payload: IRechargeServiceValues[];
};

export type DidRechargeServicesValuesFailAction = {
    type: typeof GET_RECHARGES_SERVICES_VALUES_FAIL;
};

export type RequestRechargeServiceAction = {
    type: typeof REQUEST_RECHARGE_SERVICE;
    navigation: RechargeServicesStackNavigationProps<'Service'>['navigation'];
    providerId: number;
    password?: string;
};

export type DidRequestRechargeServiceSuccessAction = {
    type: typeof REQUEST_RECHARGE_SERVICE_SUCCESS;
    payload: {
        product: string;
        transactionId: string;
        amount: number;
        pin: string;
        signerCode?: string;
    };
};

export type DidRequestRechargeServiceFailAction = {
    type: typeof REQUEST_RECHARGE_SERVICE_FAIL;
};

export type ClearRechargeServicesStateAction = {
    type: typeof CLEAR_RECHARGE_SERVICES_STATE;
};

export type GetRechargeServicesHistoryAction = {
    type: typeof GET_RECHARGE_SERVICES_HISTORY;
};

export type DidRechargeServicesHistorySuccessAction = {
    type: typeof GET_RECHARGE_SERVICES_HISTORY_SUCCESS;
    payload: any;
};

export type DidRechargeServicesHistoryFailAction = {
    type: typeof GET_RECHARGE_SERVICES_HISTORY_FAIL;
};

export type RechargeServicesActions =
    | GetRechargeServicesAction
    | DidRechargeServicesFailAction
    | DidRechargeServicesSuccessAction
    | ChangeRechargeServicesPayloadAction
    | GetRechargeServicesValuesAction
    | DidRechargeServicesValuesSuccessAction
    | DidRechargeServicesValuesFailAction
    | ChangeRechargeServicesSelectedAction
    | RequestRechargeServiceAction
    | DidRequestRechargeServiceSuccessAction
    | DidRequestRechargeServiceFailAction
    | ClearRechargeServicesStateAction
    | GetRechargeServicesHistoryAction
    | DidRechargeServicesHistorySuccessAction
    | DidRechargeServicesHistoryFailAction;

export const getRechargeServicesAction = (): GetRechargeServicesAction => ({
    type: 'GET_RECHARGES_SERVICES'
});

export const didRechargeServicesSuccesAction = (
    payload: IRechargeService[]
): DidRechargeServicesSuccessAction => ({
    type: 'GET_RECHARGES_SERVICES_SUCCESS',
    payload
});

export const didRechargeServicesFailAction =
    (): DidRechargeServicesFailAction => ({
        type: 'GET_RECHARGES_SERVICES_FAIL'
    });

export const changeRechargeServicesPayloadAction = (
    payload: any
): ChangeRechargeServicesPayloadAction => ({
    type: 'CHANGE_RECHARGE_SERVICES_PAYLOAD',
    payload
});

export const changeRechargeServicesSelectedAction = (
    payload: IRechargeServiceValues
): ChangeRechargeServicesSelectedAction => ({
    type: 'CHANGE_RECHARGE_SERVICES_SELECTED',
    payload
});

export const getRechargeServicesValuesAction = ({
    providerId,
    name
}: {
    providerId: number;
    name: string;
}): GetRechargeServicesValuesAction => ({
    type: 'GET_RECHARGES_SERVICES_VALUES',
    providerId,
    name
});

export const didRechargeServicesValuesSuccessAction = (
    payload: IRechargeServiceValues[]
): DidRechargeServicesValuesSuccessAction => ({
    type: 'GET_RECHARGES_SERVICES_VALUES_SUCCESS',
    payload
});

export const didRechargeServicesValuesFailAction =
    (): DidRechargeServicesValuesFailAction => ({
        type: 'GET_RECHARGES_SERVICES_VALUES_FAIL'
    });

export const requestRechargeServiceAction = ({
    navigation,
    providerId,
    password
}: {
    navigation: RechargeServicesStackNavigationProps<'Service'>['navigation'];
    providerId: number;
    password?: string;
}): RequestRechargeServiceAction => ({
    type: 'REQUEST_RECHARGE_SERVICE',
    navigation,
    providerId,
    password
});

export const didRequestRechargeServiceSuccessAction = (payload: {
    product: string;
    transactionId: string;
    amount: number;
    pin: string;
    signerCode?: string;
}): DidRequestRechargeServiceSuccessAction => ({
    type: 'REQUEST_RECHARGE_SERVICE_SUCCESS',
    payload
});

export const didRequestRechargeServiceFailAction =
    (): DidRequestRechargeServiceFailAction => ({
        type: 'REQUEST_RECHARGE_SERVICE_FAIL'
    });

export const clearRechargeServicesStateAction =
    (): ClearRechargeServicesStateAction => ({
        type: 'CLEAR_RECHARGE_SERVICES_STATE'
    });

export const getRechargeServicesHistoryAction =
    (): GetRechargeServicesHistoryAction => ({
        type: 'GET_RECHARGE_SERVICES_HISTORY'
    });

export const didRechargeServicesHistorySuccessAction = (
    payload: any
): DidRechargeServicesHistorySuccessAction => ({
    type: 'GET_RECHARGE_SERVICES_HISTORY_SUCCESS',
    payload
});

export const didRechargeServicesHistoryFailAction =
    (): DidRechargeServicesHistoryFailAction => ({
        type: 'GET_RECHARGE_SERVICES_HISTORY_FAIL'
    });
