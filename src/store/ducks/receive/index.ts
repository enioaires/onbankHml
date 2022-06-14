import { Reducer } from 'redux';

// Types
import { IReceiveState } from './types';
import { ReceiveActions } from './actions';
import ActionSheet from 'src/components/ActionSheet';

const INITIAL_STATE: IReceiveState = {
    payload: {
        amount: ''
    },
    isLoading: false,
    error: false,
    data: {
        url: '',
        emv: ''
    },
    pixQrCodeReceiveData: []
};

const reducer: Reducer<IReceiveState, ReceiveActions> = (
    state: IReceiveState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_RECEIVE_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            };
        case 'REQUEST_RECEIVE':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_PIXQRCODEDATA_FAILURE':
        case 'RECEIVE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'RECEIVE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: {
                    url: action.payload.linkQrCode,
                    emv: action.payload.emv 
                }
            };
        case 'REQUEST_PIXQRCODEDATA':
            return {
                ...state,
                isLoading: true
            }
        case 'REQUEST_PIXQRCODEDATA_SUCCESS':
            return {
                ...state,
                isLoading: false,
                pixQrCodeReceiveData: [
                    ...action.payload
                ]
            }
        case 'CLEAR_RECEIVE_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
