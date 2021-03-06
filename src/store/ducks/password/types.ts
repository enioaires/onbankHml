export const CHANGE_PASSWORD_STATE = 'CHANGE_PASSWORD_STATE';
export const CLEAR_PASSWORD_STATE = 'CLEAR_PASSWORD_STATE';
export const UPDATE_ACCESS_PASSWORD = 'UPDATE_ACCESS_PASSWORD';
export const UPDATE_TRANSACTION_PASSWORD = 'UPDATE_TRANSACTION_PASSWORD';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';
export const VALIDATE_TRANSACTION_PASSWORD = 'VALIDATE_TRANSACTION_PASSWORD';
export const VALIDATE_TRANSACTION_PASSWORD_SUCCESS =
    'VALIDATE_TRANSACTION_PASSWORD_SUCCESS';
    export const VALIDATE_TRANSACTION_PASSWORD_FAIL =
    'VALIDATE_TRANSACTION_PASSWORD_FAIL';
export const VALIDATE_ACCESS_PASSWORD = 'VALIDATE_ACCESS_PASSWORD';
export const VALIDATE_ACCESS_PASSWORD_SUCCESS = 'VALIDATE_ACCESS_PASSWORD_SUCCESS';
export const VALIDATE_ACCESS_PASSWORD_FAIL = 'VALIDATE_ACCESS_PASSWORD_FAIL';

export interface IPasswordState {
    newPassword: string;
    confirmationPassword: string;
    isLoading: boolean;
    validateLoading: boolean;
    error: boolean;
}
