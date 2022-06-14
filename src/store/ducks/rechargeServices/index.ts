import { Reducer } from 'redux';

// Actions
import { RechargeServicesActions } from './actions';

// Types
import { IRechargeServicesState, IRechargeServiceHistory } from './types';

const INITIAL_STATE = {
    payload: {
        signerCode: '',
        amount: 0,
        product: '',
    },
    isLoading: false,
    hasError: false,
    rechargeServicesList: [],
    rechargeServiceValuesList: [],
    rechargeServiceSelected: {
        properties: '',
        code: 0,
        cost: 0,
        detail: '',
        productName: '',
        checkSum: 0,
        dueProduct: 0,
        valueBonus: 0,
        maxValue: 0,
        minValue: 0
    },
    receipt: {
        product: '',
        transactionId: '',
        amount: 0,
        pin: '',
        signerCode: ''
    },
    rechargeServicesHistory: [] 
}

const reducer: Reducer<IRechargeServicesState, RechargeServicesActions> = (
    state: IRechargeServicesState = INITIAL_STATE,
    action
) => {
    switch(action.type) {
        case 'CHANGE_RECHARGE_SERVICES_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            };
        case 'CHANGE_RECHARGE_SERVICES_SELECTED':
            return {
                ...state,
                rechargeServiceSelected: {
                    ...action.payload
                }
            }
        case 'REQUEST_RECHARGE_SERVICE':
        case 'GET_RECHARGES_SERVICES_VALUES':
        case 'GET_RECHARGES_SERVICES':
        case 'GET_RECHARGE_SERVICES_HISTORY':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_RECHARGES_SERVICES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                rechargeServicesList: action.payload
            }
        case 'GET_RECHARGES_SERVICES_VALUES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                rechargeServiceValuesList: action.payload
            }
        case 'GET_RECHARGE_SERVICES_HISTORY_SUCCESS':
            return {
                ...state,
                isLoading: false,
                rechargeServicesHistory: action.payload
            }
        case 'REQUEST_RECHARGE_SERVICE_SUCCESS':
            return {
                ...state,
                receipt: action.payload
            }
        case 'REQUEST_RECHARGE_SERVICE_FAIL':
        case 'GET_RECHARGES_SERVICES_VALUES_FAIL':
        case 'GET_RECHARGES_SERVICES_FAIL':
        case 'GET_RECHARGE_SERVICES_HISTORY_FAIL':
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        case 'CLEAR_RECHARGE_SERVICES_STATE':
            return {
                ...state,
                ...INITIAL_STATE,
                rechargeServicesList: state.rechargeServicesList
            }
        default: 
            return state;
    };
};

export default reducer;