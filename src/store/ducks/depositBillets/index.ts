import { Reducer } from 'redux';

import { IConditionBillet, IDepositBilletsState } from './types';
import { DepositBilletsActions } from './actions';

const INITIAL_STATE: IDepositBilletsState = {
    isLoading: false,
    error: false,
    data: null,
    condition: {} as IConditionBillet
};

const reducer: Reducer<IDepositBilletsState, DepositBilletsActions> = (
    state: IDepositBilletsState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'GET_DEPOSIT_BILLETS':
        case 'GET_CONDITION_BILLETS':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_DEPOSIT_BILLETS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                data: action.data
            };
        case 'GET_CONDITION_BILLETS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                condition: action.payload
            }
        case 'CLEAR_DEPOSIT_BILLETS':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'GET_DEPOSIT_BILLETS_FAILURE':
        case 'GET_CONDITION_BILLETS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
