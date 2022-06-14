import { Reducer } from 'redux';

import { IBalanceState } from './types';
import { BalanceActions } from './actions';

const INITIAL_STATE: IBalanceState = {
    data: null,
    isLoading: false,
    error: false
};

const reducer: Reducer<IBalanceState, BalanceActions> = (
    state: IBalanceState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'REQUEST_BALANCE':
            return {
                ...state,
                isLoading: true
            };
        case 'BALANCE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'BALANCE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'CLEAR_BALANCE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
