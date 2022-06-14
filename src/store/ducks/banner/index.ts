import { Reducer } from 'redux';

import { IBannerState } from './types';
import { BannerActions } from './actions';

const INITIAL_STATE: IBannerState = {
    isLoading: false,
    error: false,
    data: []
};

const reducer: Reducer<IBannerState, BannerActions> = (
    state: IBannerState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'GET_BANNER':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_BANNER_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'GET_BANNER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                data: action.data
            };
        case 'CLEAR_BANNER_DATA':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
