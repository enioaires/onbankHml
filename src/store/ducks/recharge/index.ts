import { Reducer } from 'redux';

// Types
import { IRechargeState } from './types';
import { RechargeActions } from './actions';

const INITIAL_STATE: IRechargeState = {
    payload: {
        accountId: '',
        mobilePhone: {
            phoneNumber: '',
            country: 'BRA'
        },
        totalAmount: '',
        carrier: {
            carrierId: '',
            carrierName: ''
        },
        name: '',
        addContact: false
    },
    operators: null,
    values: null,
    isLoading: false,
    error: false,
    contacts: null,
    latest: null
};

const reducer: Reducer<IRechargeState, RechargeActions> = (
    state: IRechargeState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_PHONE_NUMBER':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    mobilePhone: {
                        ...state.payload.mobilePhone,
                        phoneNumber: action.phone
                    }
                }
            };
        case 'CHANGE_OPERATOR':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    carrier: action.operator
                }
            };
        case 'CHANGE_VALUE':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    totalAmount: action.amount
                }
            };

        case 'GET_OPERATORS':
            return {
                ...state,
                isLoading: true
            };

        case 'GET_OPERATORS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                operators: action.data
            };

        case 'GET_VALUES':
            return {
                ...state,
                isLoading: true
            };

        case 'GET_VALUES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                values: action.data
            };

        case 'REQUEST_RECHARGE':
        case 'REQUEST_CONTACTS_RECHARGE':
        case 'REQUEST_LATEST_RECHARGE':
            return {
                ...state,
                isLoading: true
            };

        case 'REQUEST_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case 'REQUEST_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'LATEST_RECHARGE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                latest: action.data
            };
        case 'CONTACTS_RECHARGE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                contacts: action.data
            };
        case 'CLEAR_RECHARGE_STATE':
            return {
                ...state,
                payload: {
                    ...INITIAL_STATE.payload
                }
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    name: action.name,
                    addContact: action.name.length > 0
                }
            };
        case 'GET_RECHARGE_CONTACTS_DETAIL':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_RECHARGE_CONTACTS_DETAIL_DONE':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
