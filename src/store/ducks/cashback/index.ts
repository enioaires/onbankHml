import { Reducer } from 'redux';

import {
    ICashbackState,
    IStatementCashback,
    ICashbackBalance
} from './types';
import { CashbackAction } from './actions';

const INITIAL_STATE: ICashbackState = {
    payload: {

    },
    statementData: [] as IStatementCashback[],
    balance: {} as ICashbackBalance,
    isLoading: false,
    hasError: false 
};

const reducer: Reducer<ICashbackState, CashbackAction> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'GET_CASHBACK':
        case 'GET_CASHBACK_BALANCE':
        case 'REQUEST_CASHBACK_CHARGE':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_CASHBACK_BALANCE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                balance: action.payload
            }
        case 'GET_CASHBACK_SUCCESS':
            return {
                ...state,
                isLoading: false,
                statementData: action.payload
            }
        case 'REQUEST_CASHBACK_CHARGE_SUCCESS':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_CASHBACK_BALANCE_FAIL':
        case 'GET_CASHBACK_FAIL':
        case 'REQUEST_CASHBACK_CHARGE_FAIL':
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        case 'CLEAR_CASHBACK_STATEMENT_DATA':
            return {
                ...state,
                statementData: INITIAL_STATE.statementData,
                hasError: INITIAL_STATE.hasError,
                isLoading: INITIAL_STATE.isLoading
            }
        default:
            return state;
    }
};

export default reducer;
