import { Reducer } from 'redux';

// Types
import { IPromocodeState } from './types';
import { PromocodeActions } from './actions';

const INITIAL_STATE: IPromocodeState = {
    isLoading: false,
    error: false,
    invites: null
};

const reducer: Reducer<IPromocodeState, PromocodeActions> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'VERIFY_PROMO_CODE':
        case 'GENERATE_PROMO_CODE':
        case 'GET_PROMO_CODE_INVITES':
        case 'REFRESH_POMO_CODE':
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case 'VERIFY_PROMO_CODE_SUCCESS':
        case 'GENERATE_PROMO_CODE_SUCCESS':
        case 'REFRESH_POMO_CODE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'VERIFY_PROMO_CODE_FAIL':
        case 'GENERATE_PROMO_CODE_FAIL':
        case 'GET_PROMO_CODE_INVITES_FAIL':
        case 'REFRESH_POMO_CODE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'GET_PROMO_CODE_INVITES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                invites: action.invites
            };
        default:
            return state;
    }
};

export default reducer;
