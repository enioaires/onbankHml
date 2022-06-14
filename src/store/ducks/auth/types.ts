export const SAVE_USER_AUTH = 'SAVE_USER_AUTH';
export const REMOVE_USER_AUTH = 'REMOVE_USER_AUTH';
export const REMOVE_USER_AUTH_STORE = 'REMOVE_USER_AUTH_STORE';
export const SET_DID_AUTO_LOGIN = 'SET_DID_AUTO_LOGIN';
export const SAVE_DEVICE_UUID = 'SAVE_DEVICE_UUID';
export const SAVE_AUTHENTICATION_TYPE = 'SAVE_AUTHENTICATION_TYPE';
export const SAVE_KEYCHAIN_CREDENTIALS = 'SAVE_KEYCHAIN_CREDENTIALS';
export const REMOVE_KEYCHAIN_CREDENTIALS = 'REMOVE_KEYCHAIN_CREDENTIALS';
export const CHECK_CODEPUSH_ENVIRONMENT = 'CHECK_CODEPUSH_ENVIRONMENT';
export const CHECKED_CODEPUSH_ENVIRONMENT = 'CHECKED_CODEPUSH_ENVIRONMENT';

export const SET_CODEPUSH_ENVIRONMENT = 'SET_CODEPUSH_ENVIRONMENT';
export const SET_CONNECTION_ERROR = 'SET_CONNECTION_ERROR';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const REVALIDATE_USER = 'REVALIDATE_USER';

export interface IKeychainCredentials {
    password: string;
    username: string;
    service: string;
    storage: string;
}

export interface IUserRememberInfo {
    name: string;
    account: string;
    branch: string;
    username: string;
}

export interface IAuthState {
    token: string | null;
    didAutoLogin: boolean;
    deviceUUID: string;
    accountHolderId: string | null;
    authenticationType: string | undefined;
    keychainCredentials: IKeychainCredentials | null;
    hmlMode: boolean;
    didCheckEnviroment: boolean;
    connectionError: boolean;
    userInfo: IUserRememberInfo | null;
    revalidated: boolean;
}
