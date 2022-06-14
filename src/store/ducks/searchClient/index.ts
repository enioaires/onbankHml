import { Reducer } from 'redux';

import { ISearchClientState } from './types';
import { SearchClientActions } from './actions';

const INITIAL_STATE: ISearchClientState = {
    isLoading: false,
    error: false,
    isClient: false
};

const reducer: Reducer<ISearchClientState, SearchClientActions> = (
    state: ISearchClientState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'REQUEST_SEARCH_CLIENT':
            return {
                ...state,
                isLoading: true
            };
        case 'SEARCH_CLIENT_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'SEARCH_CLIENT_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                isClient: action.data
            };
        case 'CLEAR_SEARCH_DATA':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
