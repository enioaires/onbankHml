import { Reducer } from 'redux';

import { IStatementState } from './types';
import { StatementsAction } from './actions';

const INITIAL_STATE: IStatementState = {
    data: [],
    lastWeekData: undefined,
    payload: {
        startDate: '',
        endDate: '',
        label: ''
    },
    filters: {
        period: 'month',
        type: 'all',
        filter: 'account'
    },
    monthButtons: [],
    isLoading: false,
    error: false
};

const reducer: Reducer<IStatementState, StatementsAction> = (
    state: IStatementState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_STATEMENT_FILTERS':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.key]: action.value
                }
            };
        case 'REQUEST_STATEMENT':
        case 'DEBIT_CHARGE_CONTEST':
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case 'STATEMENT_REQUEST_FAILURE':
        case 'DEBIT_CHARGE_CONTEST_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'CLEAR_STATEMENT_DATA':
            return {
                ...state,
                data: INITIAL_STATE.data
            };
        case 'STATEMENT_REQUEST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                data: action.data
            };
        case 'CHANGE_STATEMENT_PAYLOAD':
            return {
                ...state,
                payload: action.payload
            };
        case 'SET_STATEMENT_MONTH_BUTTONS':
            return {
                ...state,
                monthButtons: action.payload
            };
        case 'DEBIT_CHARGE_CONTEST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'GET_LASTWEEK_STATEMENT':
            return {
                ...state,
                lastWeekData: action.data
            }
        default:
            return state;
    }
};

export default reducer;
