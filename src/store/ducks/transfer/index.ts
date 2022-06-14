import { Reducer } from 'redux';

// Types
import { ITransferState } from './types';
import { TransferAction } from './actions';

const INITIAL_STATE: ITransferState = {
    payload: {
        type: '',
        receiverAccountId: '',
        receiverTaxId: '',
        receiverTaxIdFormatted: '',
        receiverName: '',
        amount: '',
        receiverBank: '',
        receiverBankName: '',
        receiverBranch: '',
        receiverAccount: '',
        receiverAccountType: 'CC',
        receiverPersonType: ''
    },
    latest: null,
    contacts: null,
    frequently: null,
    isLoading: false,
    error: false,
    listContact: []
};

const reducer: Reducer<ITransferState, TransferAction> = (
    state: ITransferState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_PAYLOAD_ALL':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            };
        case 'CHANGE_TRANSFER_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'REQUEST_LATEST_TRANSFER':
        case 'REQUEST_CONTACTS_TRANSFER':
        case 'REQUEST_FREQUENTLY_TRANSFER':
        case 'REQUEST_TRANSFER':
        case 'CANCEL_TRANSFER_SCHEDULE':
            return {
                ...state,
                isLoading: true
            };
        case 'LATEST_TRANSFER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                latest: action.data
            };
        case 'CONTACTS_TRANSFER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                contacts: action.data
            };
        case 'FREQUENTLY_TRANSFER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                frequently: action.data
            };
        case 'CLEAR_TRANSFER_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...INITIAL_STATE.payload
                }
            };
        case 'TRANSFER_FAILURE':
        case 'CANCEL_TRANSFER_SCHEDULE_FAILURE':
            return {
                ...state,
                error: true,
                isLoading: false
            };
        case 'TRANSFER_SUCCESS':
        case 'CANCEL_TRANSFER_SCHEDULE_SUCCESS':
            return {
                ...state,
                error: false,
                isLoading: false
            };
        case 'GET_USER_LIST_CONTACTS_SUCCESS':
            return {
                ...state,
                listContact: action.data
            };
        case 'GET_TRANSFER_CONTACTS_DETAIL':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_TRANSFER_CONTACTS_DETAIL_DONE':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
