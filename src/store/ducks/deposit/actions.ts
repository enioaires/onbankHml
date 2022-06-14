import { DepositStackNavigationProps } from '../../../routes/Logged/types';

import {
    IDepositTedAccount,
    REQUEST_DEPOSIT,
    DEPOSIT_FAILURE,
    DEPOSIT_SUCCESS,
    CHANGE_DEPOSIT_AMOUNT,
    CLEAR_DEPOSIT_STATE,
    CHANGE_METHOD,
    CHANGE_TED_ACCOUNT
} from './types';

export type RequestDepositAction = {
    type: typeof REQUEST_DEPOSIT;
    navigation: DepositStackNavigationProps<'Value'>['navigation'];
    password?: string;
};

type DidDepositFailAction = {
    type: typeof DEPOSIT_FAILURE;
};

type DidDepositSucceedAction = {
    type: typeof DEPOSIT_SUCCESS;
    data: any;
};

type ChangeDepositAmountAction = {
    type: typeof CHANGE_DEPOSIT_AMOUNT;
    payload: string;
};

type ClearDepositStateAction = {
    type: typeof CLEAR_DEPOSIT_STATE;
};

type ChangeDepositMethodAction = {
    type: typeof CHANGE_METHOD;
    method: 'billet' | 'transfer';
};

type ChangeDepositTedAccountAction = {
    type: typeof CHANGE_TED_ACCOUNT;
    tedAccount: IDepositTedAccount;
};

export type DepositActions =
    | RequestDepositAction
    | DidDepositFailAction
    | DidDepositSucceedAction
    | ChangeDepositAmountAction
    | ClearDepositStateAction
    | ChangeDepositMethodAction
    | ChangeDepositTedAccountAction;

export const requestDepositAction = (
    navigation: DepositStackNavigationProps<'Value'>['navigation'],
    password?: string
): RequestDepositAction => ({
    type: 'REQUEST_DEPOSIT',
    navigation,
    password
});

export const didDepositFailAction = (): DidDepositFailAction => ({
    type: 'DEPOSIT_FAILURE'
});

export const didDepositSucceedAction = (
    data: any
): DidDepositSucceedAction => ({
    type: 'DEPOSIT_SUCCESS',
    data
});

export const changeDepositAmountAction = (
    payload: string
): ChangeDepositAmountAction => ({
    type: 'CHANGE_DEPOSIT_AMOUNT',
    payload
});

export const clearDepositStateAction = (): ClearDepositStateAction => ({
    type: 'CLEAR_DEPOSIT_STATE'
});

export const changeDepositMethodAction = (
    method: 'billet' | 'transfer'
): ChangeDepositMethodAction => ({
    type: 'CHANGE_METHOD',
    method
});

export const changeDepositTedAccountAction = (
    tedAccount: IDepositTedAccount
): ChangeDepositTedAccountAction => ({
    type: 'CHANGE_TED_ACCOUNT',
    tedAccount
});
