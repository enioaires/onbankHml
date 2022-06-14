export const REQUEST_FORGOT_PASSWORD = 'REQUEST_FORGOT_PASSWORD';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const CLEAR_FORGOT_PASSWORD_PAYLOAD = 'CLEAR_FORGOT_PASSWORD_PAYLOAD';
export const VERIFY_DOCUMENT_NUMBER = 'VERIFY_DOCUMENT_NUMBER';
export const CHANGE_FORGOT_PASSWORD_PAYLOAD = 'CHANGE_FORGOT_PASSWORD_PAYLOAD';
export const CHANGE_FORGOT_PASSWORD_PAYLOAD_VALIDATIONS =
    'CHANGE_FORGOT_PASSWORD_PAYLOAD_VALIDATIONS';

export interface IForgotPasswordPayload {
    documentNumber: string;
    email: string;
}
export interface IForgotPasswordState {
    payload: IForgotPasswordPayload;
    validations: IForgotPasswordPayload;
    isLoading: boolean;
    clue: string;
}
export interface IForgotPasswordResponse {
    isEmail: boolean;
    clue?: string;
    message?: string;
}
