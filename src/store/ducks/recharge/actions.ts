import { RechargeStackNavigationProps } from '../../../routes/Logged/types';
import {
    IRechargeOperators,
    ILatestRechargeData,
    IContactsRechargeData,
    REQUEST_RECHARGE,
    REQUEST_FAILURE,
    REQUEST_SUCCESS,
    GET_OPERATORS,
    GET_OPERATORS_SUCCESS,
    GET_VALUES,
    GET_VALUES_SUCCESS,
    CHANGE_PHONE_NUMBER,
    CHANGE_OPERATOR,
    CHANGE_VALUE,
    CLEAR_RECHARGE_STATE,
    REQUEST_LATEST_RECHARGE,
    LATEST_RECHARGE_SUCCESS,
    REQUEST_CONTACTS_RECHARGE,
    CONTACTS_RECHARGE_SUCCESS,
    ADD_CONTACT,
    GET_RECHARGE_CONTACTS_DETAIL,
    GET_RECHARGE_CONTACTS_DETAIL_DONE
} from './types';

export type GetRechargeContactsDetailAction = {
    type: typeof GET_RECHARGE_CONTACTS_DETAIL;
    name: string;
    setClientInfo: ({ name, phones }: { name: string; phones: any[] }) => void;
    setShowModal: () => void;
};

type GetRechargeContactsDetailDoneAction = {
    type: typeof GET_RECHARGE_CONTACTS_DETAIL_DONE;
};

type ChangeRechargePhoneNumberAction = {
    type: typeof CHANGE_PHONE_NUMBER;
    phone: string;
};

type ChangeRechargeOperatorAction = {
    type: typeof CHANGE_OPERATOR;
    operator: IRechargeOperators;
};

type AddRechargeContactAction = {
    type: typeof ADD_CONTACT;
    name: string;
};

type ChangeRechargeValueAction = {
    type: typeof CHANGE_VALUE;
    amount: string;
};

export type RequestRechargeOperatorsAction = {
    type: typeof GET_OPERATORS;
    navigation: RechargeStackNavigationProps<'Number'>['navigation'];
};

type DidRequestRechargeOperatorsSucceedAction = {
    type: typeof GET_OPERATORS_SUCCESS;
    data: any;
};

export type RequestRechargeValuesAction = {
    type: typeof GET_VALUES;
    navigation:
        | RechargeStackNavigationProps<'Operators'>['navigation']
        | RechargeStackNavigationProps<'Latest'>['navigation'];
};

type DidRequestRechargeValuesSucceedAction = {
    type: typeof GET_VALUES_SUCCESS;
    data: any;
};

export type RequestRechargeAction = {
    type: typeof REQUEST_RECHARGE;
    navigation: RechargeStackNavigationProps<'Confirmation'>['navigation'];
    password?: string;
};

type DidRequestRechargeSucceedAction = {
    type: typeof REQUEST_SUCCESS;
};

type DidRequestRechargeFailAction = {
    type: typeof REQUEST_FAILURE;
};

type ClearRechargeStateAction = {
    type: typeof CLEAR_RECHARGE_STATE;
};

type RequestLatestRechargeAction = {
    type: typeof REQUEST_LATEST_RECHARGE;
};

type RequestContactsRechargeAction = {
    type: typeof REQUEST_CONTACTS_RECHARGE;
};

type DidLatestRechargeSucceedAction = {
    type: typeof LATEST_RECHARGE_SUCCESS;
    data: ILatestRechargeData[];
};

type DidContactsRechargeSucceedAction = {
    type: typeof CONTACTS_RECHARGE_SUCCESS;
    data: IContactsRechargeData[];
};

export type RechargeActions =
    | ChangeRechargePhoneNumberAction
    | ChangeRechargeOperatorAction
    | AddRechargeContactAction
    | ChangeRechargeValueAction
    | RequestRechargeOperatorsAction
    | DidRequestRechargeOperatorsSucceedAction
    | RequestRechargeValuesAction
    | DidRequestRechargeValuesSucceedAction
    | RequestRechargeAction
    | DidRequestRechargeSucceedAction
    | DidRequestRechargeFailAction
    | ClearRechargeStateAction
    | RequestLatestRechargeAction
    | RequestContactsRechargeAction
    | DidLatestRechargeSucceedAction
    | DidContactsRechargeSucceedAction
    | GetRechargeContactsDetailAction
    | GetRechargeContactsDetailDoneAction;

export const getRechargeContactsDetailAction = (
    name: string,
    setClientInfo: ({ name, phones }: { name: string; phones: any[] }) => void,
    setShowModal: () => void
): GetRechargeContactsDetailAction => ({
    type: 'GET_RECHARGE_CONTACTS_DETAIL',
    name,
    setClientInfo,
    setShowModal
});

export const getRechargeContactsDetailDoneAction =
    (): GetRechargeContactsDetailDoneAction => ({
        type: 'GET_RECHARGE_CONTACTS_DETAIL_DONE'
    });

export const changeRechargePhoneNumberAction = (
    phone: string
): ChangeRechargePhoneNumberAction => ({
    phone,
    type: 'CHANGE_PHONE_NUMBER'
});

export const changeRechargeOperatorAction = (
    operator: IRechargeOperators
): ChangeRechargeOperatorAction => ({
    operator,
    type: 'CHANGE_OPERATOR'
});

export const addRechargeContactAction = (
    name: string
): AddRechargeContactAction => ({
    name,
    type: 'ADD_CONTACT'
});

export const changeRechargeValueAction = (
    amount: string
): ChangeRechargeValueAction => ({
    amount,
    type: 'CHANGE_VALUE'
});

export const requestRechargeOperatorsAction = (
    navigation: RechargeStackNavigationProps<'Number'>['navigation']
): RequestRechargeOperatorsAction => ({
    navigation,
    type: 'GET_OPERATORS'
});

export const didRequestRechargeOperatorsSucceedAction = (
    data: any
): DidRequestRechargeOperatorsSucceedAction => ({
    data,
    type: 'GET_OPERATORS_SUCCESS'
});

export const requestRechargeValuesAction = (
    navigation:
        | RechargeStackNavigationProps<'Operators'>['navigation']
        | RechargeStackNavigationProps<'Latest'>['navigation']
): RequestRechargeValuesAction => ({
    navigation,
    type: 'GET_VALUES'
});

export const didRequestRechargeValuesSucceedAction = (
    data: any
): DidRequestRechargeValuesSucceedAction => ({
    data,
    type: 'GET_VALUES_SUCCESS'
});

export const requestRechargeAction = (
    navigation: RechargeStackNavigationProps<'Confirmation'>['navigation'],
    password?: string
): RequestRechargeAction => ({
    navigation,
    type: 'REQUEST_RECHARGE',
    password
});

export const didRequestRechargeSucceedAction =
    (): DidRequestRechargeSucceedAction => ({
        type: 'REQUEST_SUCCESS'
    });

export const didRequestRechargeFailAction =
    (): DidRequestRechargeFailAction => ({
        type: 'REQUEST_FAILURE'
    });

export const clearRechargeStateAction = (): ClearRechargeStateAction => ({
    type: 'CLEAR_RECHARGE_STATE'
});

export const requestLatestRechargeAction = (): RequestLatestRechargeAction => ({
    type: 'REQUEST_LATEST_RECHARGE'
});

export const requestContactsRechargeAction =
    (): RequestContactsRechargeAction => ({
        type: 'REQUEST_CONTACTS_RECHARGE'
    });

export const didLatestRechargeSucceedAction = (
    data: ILatestRechargeData[]
): DidLatestRechargeSucceedAction => ({
    type: 'LATEST_RECHARGE_SUCCESS',
    data
});

export const didContactsRechargeSucceedAction = (
    data: IContactsRechargeData[]
): DidContactsRechargeSucceedAction => ({
    type: 'CONTACTS_RECHARGE_SUCCESS',
    data
});
