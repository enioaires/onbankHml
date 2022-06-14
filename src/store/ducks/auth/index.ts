import { Reducer } from 'redux';

// State Type
import { IAuthState } from './types';

// Actions Type
import { AuthActions } from './actions';

const INITIAL_STATE: IAuthState = {
    token: null,
    didAutoLogin: false,
    deviceUUID: '',
    accountHolderId: null,
    authenticationType: undefined,
    keychainCredentials: null,
    hmlMode: false,
    didCheckEnviroment: false,
    connectionError: false,
    userInfo: null,
    revalidated: false
};

const reducer: Reducer<IAuthState, AuthActions> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'SAVE_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            };
        case 'REVALIDATE_USER':
            return {
                ...state,
                revalidated: false
            };
        case 'SAVE_USER_AUTH':
            return {
                ...state,
                token: action.payload.token,
                accountHolderId: action.payload.accountHolderId,
                revalidated: action.payload.revalidated
            };
        case 'SAVE_DEVICE_UUID':
            return {
                ...state,
                deviceUUID: action.payload
            };
        case 'REMOVE_USER_AUTH_STORE':
            return {
                ...state,
                token: null,
                didAutoLogin: false,
                accountHolderId: null,
                accountId: null,
                userInfo: null,
                revalidated: false
            };
        case 'SET_DID_AUTO_LOGIN':
            return {
                ...state,
                didAutoLogin: true
            };
        case 'SAVE_KEYCHAIN_CREDENTIALS':
            return {
                ...state,
                keychainCredentials: action.data
            };
        case 'REMOVE_KEYCHAIN_CREDENTIALS':
            return {
                ...state,
                keychainCredentials: null
            };
        case 'SAVE_AUTHENTICATION_TYPE':
            return {
                ...state,
                authenticationType: action.data
            };
        case 'CHECK_CODEPUSH_ENVIRONMENT':
            return {
                ...state,
                didCheckEnviroment: true
            };
        case 'CHECKED_CODEPUSH_ENVIRONMENT':
            return {
                ...state,
                didCheckEnviroment: true
            };
        case 'SET_CODEPUSH_ENVIRONMENT':
            return {
                ...state,
                hmlMode: action.value
            };
        case 'SET_CONNECTION_ERROR':
            return {
                ...state,
                connectionError: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
