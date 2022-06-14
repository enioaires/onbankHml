import { Reducer } from 'redux';

// Types
import { IReceiveState } from './types';
import { ReceiveActions } from './actions';

const INITIAL_STATE: IReceiveState = {
    payload: {
        amount: '',
        description: ''
    },
    isLoading: false,
    error: false,
    data: {
        url: ''
    }
};

const reducer: Reducer<IReceiveState, ReceiveActions> = (
    state: IReceiveState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_RECEIVE_PAYLOADbackup':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            };
        case 'REQUEST_RECEIVEbackup':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_FAILUREbackup':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'RECEIVE_SUCCESSbackup':
            return {
                ...state,
                isLoading: false,
                data: {
                    url: action.url
                }
            };
        case 'CLEAR_RECEIVE_STATEbackup':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
