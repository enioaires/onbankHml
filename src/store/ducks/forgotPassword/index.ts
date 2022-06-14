import { Reducer } from 'redux';

import { IForgotPasswordState } from './types';
import { ForgotPasswordActions } from './actions';

const INITIAL_STATE: IForgotPasswordState = {
    payload: {
        documentNumber: '',
        email: ''
    },
    validations: {
        documentNumber: '',
        email: ''
    },
    isLoading: false,
    clue: ''
};

const reducer: Reducer<IForgotPasswordState, ForgotPasswordActions> = (
    state: IForgotPasswordState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'REQUEST_FORGOT_PASSWORD':
            return {
                ...state,
                isLoading: true
            };
        case 'FORGOT_PASSWORD_FAILURE':
            return {
                ...state,
                isLoading: false
            };
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                clue: action.clue
            };
        case 'CLEAR_FORGOT_PASSWORD_PAYLOAD':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'CHANGE_FORGOT_PASSWORD_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    [action.key]: action.value
                }
            };
        case 'CHANGE_FORGOT_PASSWORD_PAYLOAD_VALIDATIONS':
            return {
                ...state,
                validations: {
                    ...state.validations,
                    [action.key]: action.value
                }
            };
        default:
            return state;
    }
};

export default reducer;
