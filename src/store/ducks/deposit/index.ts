import { Reducer } from 'redux';

import { IDepositState } from './types';
import { DepositActions } from './actions';

const INITIAL_STATE: IDepositState = {
    payload: {
        amount: ''
    },
    isLoading: false,
    error: false,
    data: {
        transactionId: '',
        dueDate: '',
        typeableLine: '',
        financialStatement: {
            status: ''
        },
        boletoUrl: '',
        externalIdentifier: ''
    },
    method: 'billet',
    tedAccount: null
};

const reducer: Reducer<IDepositState, DepositActions> = (
    state: IDepositState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'REQUEST_DEPOSIT':
            return {
                ...state,
                isLoading: true
            };
        case 'DEPOSIT_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'DEPOSIT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'CHANGE_DEPOSIT_AMOUNT':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    amount: action.payload
                }
            };
        case 'CHANGE_METHOD':
            return {
                ...state,
                method: action.method
            };
        case 'CHANGE_TED_ACCOUNT':
            return {
                ...state,
                tedAccount: action.tedAccount
            };
        case 'CLEAR_DEPOSIT_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
