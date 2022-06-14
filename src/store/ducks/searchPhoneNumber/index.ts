import { Reducer } from 'redux';

import { ISearchPhoneNumberState } from './types';
import { SearchPhoneNumberActions } from './actions';

const INITIAL_STATE: ISearchPhoneNumberState = {
    isLoading: false,
    error: false
};

const reducer: Reducer<ISearchPhoneNumberState, SearchPhoneNumberActions> = (
    state: ISearchPhoneNumberState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'REQUEST_SEARCH_PHONE_NUMBER':
            return {
                ...state,
                isLoading: true
            };
        case 'SEARCH_PHONE_NUMBER_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'SEARCH_PHONE_NUMBER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
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
