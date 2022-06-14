import { Reducer } from 'redux';

import { IResetPasswordState } from './types';
import { ResetPasswordActions } from './actions';

const INITIAL_STATE: IResetPasswordState = {
    newPassword: '',
    isLoading: false,
    error: false
};

const reducer: Reducer<IResetPasswordState, ResetPasswordActions> = (
    state: IResetPasswordState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_RESET_PASSWORD_PAYLOAD':
            return {
                ...state,
                newPassword: action.payload
            };
        case 'REQUEST_RESET_PASSWORD':
            return {
                ...state,
                isLoading: true
            };
        case 'RESET_PASSWORD_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                clue: action.clue
            };
        case 'CLEAR_RESET_PASSWORD_PAYLOAD':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
