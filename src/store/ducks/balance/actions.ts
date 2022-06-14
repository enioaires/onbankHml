import {
    IBalanceData,
    REQUEST_BALANCE,
    BALANCE_FAILURE,
    BALANCE_SUCCESS,
    CLEAR_BALANCE
} from './types';

type RequestBalanceAction = {
    type: typeof REQUEST_BALANCE;
};

type DidBalanceFailAction = {
    type: typeof BALANCE_FAILURE;
};

type DidBalanceSucceedAction = {
    type: typeof BALANCE_SUCCESS;
    data: IBalanceData;
};

type ClearBalanceAction = {
    type: typeof CLEAR_BALANCE;
};

export type BalanceActions =
    | RequestBalanceAction
    | DidBalanceFailAction
    | DidBalanceSucceedAction
    | ClearBalanceAction;

export const requestBalanceAction = (): RequestBalanceAction => ({
    type: 'REQUEST_BALANCE'
});

export const didBalanceFailAction = (): DidBalanceFailAction => ({
    type: 'BALANCE_FAILURE'
});

export const didBalanceSucceedAction = (
    data: IBalanceData
): DidBalanceSucceedAction => ({
    type: 'BALANCE_SUCCESS',
    data
});

export const clearBalanceAction = (): ClearBalanceAction => ({
    type: 'CLEAR_BALANCE'
});
