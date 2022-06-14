export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_CONFIRMATION = 'CHANGE_CONFIRMATION';
export const ADD_TRANSACTION_PASSWORD = 'ADD_TRANSACTION_PASSWORD';
export const ADD_TRANSACTION_PASSWORD_FAILURE =
    'ADD_TRANSACTION_PASSWORD_FAILURE';
export const ADD_TRANSACTION_PASSWORD_SUCCESS =
    'ADD_TRANSACTION_PASSWORD_SUCCESS';
export const CLEAR_STATE = 'CLEAR_STATE';

export interface IAddTransactionPasswordState {
    password: string;
    confirmation: string;
    isLoading: boolean;
    error: boolean;
}
