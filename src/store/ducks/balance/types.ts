export const REQUEST_BALANCE = 'REQUEST_BALANCE';
export const BALANCE_FAILURE = 'BALANCE_FAILURE';
export const BALANCE_SUCCESS = 'BALANCE_SUCCESS';
export const CLEAR_BALANCE = 'CLEAR_BALANCE';

export interface IBalanceData {
    date: string;
    real: number;
    available: number;
    overdraft: number;
    blocked: number;
}

export interface IBalanceState {
    data: IBalanceData | null;
    isLoading: boolean;
    error: boolean;
}
