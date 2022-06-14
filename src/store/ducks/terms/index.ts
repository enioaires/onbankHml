import { Reducer } from 'redux';

import { ITermsState } from './types';
import { TermsActions } from './actions';

const INITIAL_STATE: ITermsState = {
    isLoading: false,
    error: false
};

const reducer: Reducer<ITermsState, TermsActions> = (
    state: ITermsState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'ACCEPT_NEW_TERMS':
            return {
                ...state,
                isLoading: true
            };
        case 'ACCEPT_NEW_TERMS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'ACCEPT_NEW_TERMS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        default:
            return state;
    }
};

export default reducer;
