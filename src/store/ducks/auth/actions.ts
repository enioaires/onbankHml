// Types
import {
    IKeychainCredentials,
    SAVE_AUTHENTICATION_TYPE,
    SAVE_DEVICE_UUID,
    SAVE_USER_AUTH,
    SAVE_KEYCHAIN_CREDENTIALS,
    REMOVE_KEYCHAIN_CREDENTIALS,
    REMOVE_USER_AUTH,
    SET_DID_AUTO_LOGIN,
    SET_CODEPUSH_ENVIRONMENT,
    CHECK_CODEPUSH_ENVIRONMENT,
    REMOVE_USER_AUTH_STORE,
    SET_CONNECTION_ERROR,
    SAVE_USER_INFO,
    REVALIDATE_USER,
    IUserRememberInfo,
    CHECKED_CODEPUSH_ENVIRONMENT
} from './types';

export type SaveUserInfoAction = {
    type: typeof SAVE_USER_INFO;
    payload: IUserRememberInfo;
};

type RevalidateUserAction = {
    type: typeof REVALIDATE_USER;
};

export type SaveUserAuthAction = {
    type: typeof SAVE_USER_AUTH;
    payload: {
        token: string;
        accountHolderId: string;
        accountId: string;
        revalidated: boolean;
    };
};

type SetConnectionErrorAction = {
    type: typeof SET_CONNECTION_ERROR;
    payload: boolean;
};

type RemoveTokenAction = {
    type: typeof REMOVE_USER_AUTH;
};

type RemoveTokenStoreAction = {
    type: typeof REMOVE_USER_AUTH_STORE;
};

type DidAutoLoginAction = {
    type: typeof SET_DID_AUTO_LOGIN;
};

type SaveDeviceUUIDAction = {
    type: typeof SAVE_DEVICE_UUID;
    payload: string;
};

type SaveAuthenticationTypeAction = {
    type: typeof SAVE_AUTHENTICATION_TYPE;
    data: string | undefined;
};

type SaveKeychainCredentialsAction = {
    type: typeof SAVE_KEYCHAIN_CREDENTIALS;
    data: IKeychainCredentials | null;
};

type RemoveKeychainCredentialsAction = {
    type: typeof REMOVE_KEYCHAIN_CREDENTIALS;
};

export type CheckCodepushEnvironmentAction = {
    type: typeof CHECK_CODEPUSH_ENVIRONMENT;
    hwid: string;
};

export type CheckedCodepushEnvironmentAction = {
    type: typeof CHECKED_CODEPUSH_ENVIRONMENT;
};

type SetCodepushEnvironmentAction = {
    type: typeof SET_CODEPUSH_ENVIRONMENT;
    value: boolean;
};

export type AuthActions =
    | SaveUserAuthAction
    | RemoveTokenAction
    | DidAutoLoginAction
    | SaveDeviceUUIDAction
    | SaveAuthenticationTypeAction
    | SaveKeychainCredentialsAction
    | RemoveKeychainCredentialsAction
    | CheckCodepushEnvironmentAction
    | CheckedCodepushEnvironmentAction
    | SetCodepushEnvironmentAction
    | RemoveTokenStoreAction
    | SetConnectionErrorAction
    | SaveUserInfoAction
    | RevalidateUserAction;

export const saveUserInfoAction = (
    payload: IUserRememberInfo
): SaveUserInfoAction => ({
    type: 'SAVE_USER_INFO',
    payload
});

export const revalidateUserAction = (): RevalidateUserAction => ({
    type: 'REVALIDATE_USER'
});

export const saveUserAuthAction = (payload: {
    token: string;
    accountHolderId: string;
    accountId: string;
    revalidated: boolean;
}): SaveUserAuthAction => ({
    type: 'SAVE_USER_AUTH',
    payload
});

export const removeTokenAction = (): RemoveTokenAction => ({
    type: 'REMOVE_USER_AUTH'
});

export const removeTokenStoreAction = (): RemoveTokenStoreAction => ({
    type: 'REMOVE_USER_AUTH_STORE'
});

export const setDidAutoLoginAction = (): DidAutoLoginAction => ({
    type: 'SET_DID_AUTO_LOGIN'
});

export const saveDeviceUUIDAction = (
    payload: string
): SaveDeviceUUIDAction => ({
    type: 'SAVE_DEVICE_UUID',
    payload
});

export const saveAuthenticationTypeAction = (
    data: string | undefined
): SaveAuthenticationTypeAction => ({
    type: 'SAVE_AUTHENTICATION_TYPE',
    data
});

export const saveKeychainCredentialsAction = (
    data: IKeychainCredentials | null
): SaveKeychainCredentialsAction => ({
    type: 'SAVE_KEYCHAIN_CREDENTIALS',
    data
});

export const removeKeychainCredentialsAction =
    (): RemoveKeychainCredentialsAction => ({
        type: 'REMOVE_KEYCHAIN_CREDENTIALS'
    });

export const checkCodepushEnvironmentAction = (
    hwid: string
): CheckCodepushEnvironmentAction => ({
    type: 'CHECK_CODEPUSH_ENVIRONMENT',
    hwid
});

export const didCheckedCodepushEnvironmentAction =
    (): CheckedCodepushEnvironmentAction => ({
        type: 'CHECKED_CODEPUSH_ENVIRONMENT'
    });

export const setCodepushEnvironmentAction = (
    value: boolean
): SetCodepushEnvironmentAction => ({
    type: 'SET_CODEPUSH_ENVIRONMENT',
    value
});

export const setConnectionErrorAction = (
    payload: boolean
): SetConnectionErrorAction => ({
    type: 'SET_CONNECTION_ERROR',
    payload
});
