import { Reducer } from 'redux';

import { IPaymentState } from './types';
import { PaymentActions } from './actions';

const INITIAL_STATE: IPaymentState = {
    payload: {
        unmatchingValueAuthCode: '',
        drawee: {
            name: '',
            taxIdentifier: {
                taxId: ''
            }
        },
        beneficiary: {
            name: '',
            taxIdentifier: {
                taxId: ''
            }
        },
        paymentDetails: null,
        settings: {
            startTime: '',
            endTime: '',
            timezone: ''
        }
    },
    qrCodePayload: null,
    creditCardData: null,
    creditCardInstallments: [],
    isLoading: false,
    error: false
};

const reducer: Reducer<IPaymentState, PaymentActions> = (
    state: IPaymentState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_PAYMENT_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            };
        case 'CHANGE_PAYMENT_AMOUNT_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    paymentDetails: {
                        ...state.payload.paymentDetails,
                        totalAmount: action.amount,
                        consolidatedAmount: action.amount
                    }
                }
            };
        case 'CHANGE_QRCODE_PAYLOAD':
            return {
                ...state,
                qrCodePayload: action.payload
            };
        case 'CLEAR_PAYMENT_PAYLOAD':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'REQUEST_PAYMENT':
        case 'REQUEST_QRCODE_PAYMENT':
            return {
                ...state,
                isLoading: true
            };
        case 'PAYMENT_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'PAYMENT_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case 'SELECT_CREDIT_CARD':
            return {
                ...state,
                creditCardData: action.card
            };
        case 'CLEAR_CREDIT_CARD':
            return {
                ...state,
                creditCardData: null
            };
        case 'SET_INSTALLMENT_AMOUNT':
            return {
                ...state,
                creditCardData: {
                    ...state.creditCardData,
                    installments: action.installments,
                    amount: action.amount,
                    amountPerInstallments: action.amountPerInstallments
                }
            };
        case 'GET_INSTALLMENTS':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_INSTALLMENTS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'GET_INSTALLMENTS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                creditCardInstallments: action.installments
            };
        default:
            return state;
    }
};

export default reducer;
