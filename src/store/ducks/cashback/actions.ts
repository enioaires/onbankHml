import { RechargeServicesStackNavigationProps } from '../../../routes/Logged/types';

import {
    GET_CASHBACK,
    GET_CASHBACK_SUCCESS,
    GET_CASHBACK_FAIL,
    GET_CASHBACK_BALANCE,
    GET_CASHBACK_BALANCE_FAIL,
    GET_CASHBACK_BALANCE_SUCCESS,
    IStatementCashback,
    ICashbackBalance,
    REQUEST_CASHBACK_CHARGE,
    REQUEST_CASHBACK_CHARGE_FAIL,
    REQUEST_CASHBACK_CHARGE_SUCCESS,
    CLEAR_CASHBACK_STATEMENT_DATA
} from './types';

export type GetCashbackAction = {
    type: typeof GET_CASHBACK;
};
type GetCashbackSuccessAction = {
    type: typeof GET_CASHBACK_SUCCESS;
    payload: IStatementCashback[];
};
type GetCashbackFailAction = {
    type: typeof GET_CASHBACK_FAIL;
};
export type GetCashbackBalanceAction = {
    type: typeof GET_CASHBACK_BALANCE;
};
type GetCashbackBalanceSuccessAction = {
    type: typeof GET_CASHBACK_BALANCE_SUCCESS;
    payload: ICashbackBalance;
};
type GetCashbackBalanceFailAction = {
    type: typeof GET_CASHBACK_BALANCE_FAIL;
};
export type RequestCashbackChargeAction = {
    type: typeof REQUEST_CASHBACK_CHARGE;
    navigation: RechargeServicesStackNavigationProps<'Service'>['navigation'];
    providerId: number;
    password?: string;
};
type DidRequestCashbackChargeSuccessAction = {
    type: typeof REQUEST_CASHBACK_CHARGE_SUCCESS;
    payload: {
        product: string;
        transactionId: string;
        amount: number;
        pin: string;
        signerCode?: string;
    };
};
type DidRequestCashbackChargeFailAction = {
    type: typeof REQUEST_CASHBACK_CHARGE_FAIL;
};

type ClearCashbackStatementDataAction = {
    type: typeof CLEAR_CASHBACK_STATEMENT_DATA;
};

export type CashbackAction =
    | GetCashbackAction
    | GetCashbackSuccessAction
    | GetCashbackFailAction
    | GetCashbackBalanceAction
    | GetCashbackBalanceSuccessAction
    | GetCashbackBalanceFailAction
    | RequestCashbackChargeAction
    | DidRequestCashbackChargeSuccessAction
    | DidRequestCashbackChargeFailAction
    | ClearCashbackStatementDataAction;

export const getCashbackAction = (): GetCashbackAction => ({
    type: 'GET_CASHBACK'
});

export const getCashbackSuccessAction = (
    payload: IStatementCashback[]
): GetCashbackSuccessAction => ({
    type: 'GET_CASHBACK_SUCCESS',
    payload
});

export const getCashbackFailAction = (): GetCashbackFailAction => ({
    type: 'GET_CASHBACK_FAIL'
});

export const getCashbackBalanceAction = (): GetCashbackBalanceAction => ({
    type: 'GET_CASHBACK_BALANCE'
});

export const getCashbackBalanceSuccessAction = (
    payload: ICashbackBalance
): GetCashbackBalanceSuccessAction => ({
    type: 'GET_CASHBACK_BALANCE_SUCCESS',
    payload
});

export const getCashbackBalanceFailAction =
    (): GetCashbackBalanceFailAction => ({
        type: 'GET_CASHBACK_BALANCE_FAIL'
    });

export const requestCashbackChargeAction = ({
    navigation,
    providerId,
    password
}: {
    navigation: RechargeServicesStackNavigationProps<'Service'>['navigation'];
    providerId: number;
    password?: string;
}): RequestCashbackChargeAction => ({
    type: 'REQUEST_CASHBACK_CHARGE',
    navigation,
    providerId,
    password
});

export const didRequestCashbackChargeSuccessAction = (payload: {
    product: string;
    transactionId: string;
    amount: number;
    pin: string;
    signerCode?: string;
}): DidRequestCashbackChargeSuccessAction => ({
    type: 'REQUEST_CASHBACK_CHARGE_SUCCESS',
    payload
});

export const didRequestCashbackChargeFailAction =
    (): DidRequestCashbackChargeFailAction => ({
        type: 'REQUEST_CASHBACK_CHARGE_FAIL'
    });

export const clearCashbackStatementDataAction =
    (): ClearCashbackStatementDataAction => ({
        type: 'CLEAR_CASHBACK_STATEMENT_DATA'
    });
