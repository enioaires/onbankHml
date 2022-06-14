import { Reducer } from 'redux';

// Types
import { IUpdateDataState } from './types';
import { UpdateDataAction } from './actions';

const INITIAL_STATE: IUpdateDataState = {
    isLoading: false,
    error: false
};

const reducer: Reducer<IUpdateDataState, UpdateDataAction> = (
    state: IUpdateDataState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
        case 'UPDATE_USER_PHONE':
            return {
                ...state,
                isLoading: true
            };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case 'UPDATE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
