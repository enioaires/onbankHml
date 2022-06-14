import { Reducer } from 'redux';

// Types
import { IReceiptState } from './types';
import { ReceiptActions } from './actions';

const INITIAL_STATE: IReceiptState = {
    receipt: null,
    viewshotRef: null,
    isLoading: null
};

const reducer: Reducer<IReceiptState, ReceiptActions> = (
    state: IReceiptState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'STORE_RECEIPT':
            return {
                ...state,
                receipt: action.data
            };
        case 'REMOVE_RECEIPT':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'STORE_VIEWSHOT_REF':
            return {
                ...state,
                viewshotRef: action.ref
            };
        case 'GET_CREDIT_CARD_RECEIPT_DATA':
        case 'GET_RECEIPT_DATA':
            return {
                ...state,
                isLoading: action.item
            };
        case 'GET_RECEIPT_DATA_DONE':
            return {
                ...state,
                isLoading: null
            };
        default:
            return state;
    }
};

export default reducer;
