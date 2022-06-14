export const CHANGE_RESET_PASSWORD_PAYLOAD = 'CHANGE_RESET_PASSWORD_PAYLOAD';
export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const CLEAR_RESET_PASSWORD_PAYLOAD = 'CLEAR_RESET_PASSWORD_PAYLOAD';

export interface IResetPasswordState {
    newPassword: string;
    isLoading: boolean;
    error: boolean;
}
