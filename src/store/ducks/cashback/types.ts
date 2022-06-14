export const GET_CASHBACK = 'GET_CASHBACK';
export const GET_CASHBACK_SUCCESS = 'GET_CASHBACK_SUCCESS';
export const GET_CASHBACK_FAIL = 'GET_CASHBACK_FAIL';
export const GET_CASHBACK_BALANCE = 'GET_CASHBACK_BALANCE';
export const GET_CASHBACK_BALANCE_SUCCESS = 'GET_CASHBACK_BALANCE_SUCCESS';
export const GET_CASHBACK_BALANCE_FAIL = 'GET_CASHBACK_BALANCE_FAIL';
export const REQUEST_CASHBACK_CHARGE = 'REQUEST_CASHBACK_CHARGE';
export const REQUEST_CASHBACK_CHARGE_SUCCESS = 'REQUEST_CASHBACK_CHARGE_SUCCESS';
export const REQUEST_CASHBACK_CHARGE_FAIL = 'REQUEST_CASHBACK_CHARGE_FAIL';
export const CLEAR_CASHBACK_STATEMENT_DATA = 'CLEAR_CASHBACK_STATEMENT_DATA';

export interface ICashbackState {
    payload: {

    };
    statementData: IStatementCashback[];
    balance: {
        balance: number,
        blockCashback: number,
        active: boolean
    };
    isLoading: boolean;
    hasError: boolean;
};

export interface IStatementCashback {
    cancelled: false,
    amount: string,
    provider: string,
    cashbackDate: string,
    cashbackType: string,
    operationDescription: string,
    operationType: string
}

export interface ICashbackBalance {
    balance: number,
    blockCashback: number,
    active: boolean
}