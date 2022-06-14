import { Reducer } from 'redux';

// Types
import { IAddTransactionPasswordState } from './types';
import { AddTransactionActions } from './actions';

const INITIAL_STATE: IAddTransactionPasswordState = {
    password: '',
    confirmation: '',
    isLoading: false,
    error: false
};

const reducer: Reducer<IAddTransactionPasswordState, AddTransactionActions> = (
    state: IAddTransactionPasswordState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'ADD_TRANSACTION_PASSWORD':
            return {
                ...state,
                isLoading: true
            };
        case 'ADD_TRANSACTION_PASSWORD_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'ADD_TRANSACTION_PASSWORD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'CHANGE_CONFIRMATION':
            return {
                ...state,
                confirmation: action.confirmation
            };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        case 'CLEAR_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
