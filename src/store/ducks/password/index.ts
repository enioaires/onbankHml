import { Reducer } from 'redux';

import { IPasswordState } from './types';
import { PasswordActions } from './actions';

const INITIAL_STATE: IPasswordState = {
    newPassword: '',
    confirmationPassword: '',
    isLoading: false,
    validateLoading: false,
    error: false
};

const reducer: Reducer<IPasswordState, PasswordActions> = (
    state: IPasswordState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD_STATE':
            return {
                ...state,
                [action.key]: action.value
            };
        case 'CLEAR_PASSWORD_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'UPDATE_ACCESS_PASSWORD':
        case 'UPDATE_TRANSACTION_PASSWORD':
            return {
                ...state,
                isLoading: true
            };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'UPDATE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'VALIDATE_TRANSACTION_PASSWORD':
        case 'VALIDATE_ACCESS_PASSWORD':
            return {
                ...state,
                validateLoading: true
            };
        case 'VALIDATE_TRANSACTION_PASSWORD_SUCCESS':
        case 'VALIDATE_ACCESS_PASSWORD_SUCCESS':
            return {
                ...state,
                validateLoading: false
            };
        case 'VALIDATE_TRANSACTION_PASSWORD_FAIL':
        case 'VALIDATE_ACCESS_PASSWORD_FAIL':
            return {
                ...state,
                validateLoading: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
