import { Reducer } from 'redux';

import { BilletActions } from './actions';
import { IBilletState } from './types';

const INITIAL_STATE: IBilletState = {
    loading: false
};

const reducer: Reducer<IBilletState, BilletActions> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'GET_BILLET_DETAILS':
            return {
                ...state,
                loading: true
            };
        case 'STOP_BILLET_DETAILS_REQUEST':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
