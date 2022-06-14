import { Reducer } from 'redux'

import { IPixPaymentState } from './types'
import { PixPaymentActions } from './actions'

const INITIAL_STATE: IPixPaymentState = {
    payload: {
        valor: '',
        tipoChave: '',
        valorChave: '',
        recebedor: {
            nome: '',
            cpf: '',
            cnpj: ''
        },
        e2eId: '',
        message: '',
        status: '',
        transferenciaId: ''
    },
    isLoading: false,
    error: false
};

const reducer: Reducer<IPixPaymentState, PixPaymentActions> = (
    state: IPixPaymentState = INITIAL_STATE,
    action
) => {
    switch(action.type) {
        case 'CHANGE_PIXPAYMENT_PAYLOAD': 
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            };
        case 'GET_PRE_PIXPAYMENT_DATA':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_PIXPAYMENT_DATA':
            return {
                ...state,
                isLoading: true
            }
        case 'CLEAR_PIXPAYMENT_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'GET_PRE_PIXPAYMENT_DATA_SUCCED':
        case 'GET_PIXPAYMENT_DATA_SUCCED':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                },
                isLoading: false
            };
        case 'GET_PRE_PIXPAYMENT_DATA_FAIL':
        case 'GET_PIXPAYMENT_DATA_FAIL':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                },
                isLoading: false,
                error: true
            };
        case 'REQUEST_PIXPAYMENT':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_PIXPAYMENT_SUCCED':
            return {
                ...state,
                isLoading: false,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            }
        case 'REQUEST_PIXPAYMENT_FAIL':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                },
                isLoading: false,
                error: true
            }
        default:
            return state;
    };
};

export default reducer;
