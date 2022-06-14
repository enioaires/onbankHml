export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_LOGIN_SUCCESS = 'SUBMIT_LOGIN_SUCCESS';
export const SUBMIT_LOGIN_FAILURE = 'SUBMIT_LOGIN_FAILURE';
export const CLEAR_LOGIN_STATE = 'CLEAR_LOGIN_STATE';
export const CHANGE_LOGIN_PAYLOAD = 'CHANGE_LOGIN_PAYLOAD';
export const CHANGE_LOGIN_PAYLOAD_VALIDATIONS =
    'CHANGE_LOGIN_PAYLOAD_VALIDATIONS';
export interface ILoginPayload {
    username: string;
    password: string;
    hwid: string;
}
export interface ILoginState {
    payload: ILoginPayload;
    validations: Omit<ILoginPayload, 'hwid'>;
    isLoading: boolean;
}
export interface ILoginResponse {
    token: string;
    user: {
        id: string;
        accountHolderId: string;
        documentNumber: string;
        email: string;
    };
}
