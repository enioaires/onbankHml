import { Reducer } from 'redux';

import { ISearchEmailState } from './types';
import { SearchEmailActions } from './actions';

const INITIAL_STATE: ISearchEmailState = {
    isLoading: false,
    error: false
};

const reducer: Reducer<ISearchEmailState, SearchEmailActions> = (
    state: ISearchEmailState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'REQUEST_SEARCH_EMAIL':
            return {
                ...state,
                isLoading: true
            };
        case 'SEARCH_EMAIL_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'SEARCH_EMAIL_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'CLEAR_SEARCH_EMAIL_DATA':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
