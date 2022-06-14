import { Reducer } from 'redux';

import { ICardState } from './types';
import { CardBizAction } from './actions';

const INITIAL_STATE: ICardState = {
    card: null,
    cardLimit: null,
    loading: false,
    isRegisterModalOpen: false
};

const reducer: Reducer<ICardState, CardBizAction> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'GET_CARD_BIZ':
        case 'REGISTER_CARD_BIZ':
        case 'ACTIVATE_CARD_BIZ':
        case 'BLOCK_CARD_BIZ':
        case 'UNBLOCK_CARD_BIZ':
        case 'CANCEL_CARD_BIZ':
        case 'ENABLE_WITHDRAW_CARD_BIZ':
        case 'DISABLE_WITHDRAW_CARD_BIZ':
        case 'ENABLE_ONLINE_SHOPPING_CARD_BIZ':
        case 'DISABLE_ONLINE_SHOPPING_CARD_BIZ':
        case 'ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ':
        case 'DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ':
        case 'ENABLE_PHYSICAL_SHOPPING_CARD_BIZ':
        case 'DISABLE_PHYSICAL_SHOPPING_CARD_BIZ':
        case 'ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ':
        case 'DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ':
        case 'GET_CARD_MONTH_LIMIT':
        case 'REGISTER_CARD_SECOND_VIA':
            return {
                ...state,
                loading: true
            };
        case 'REGISTER_CARD_BIZ_FAIL':
        case 'GET_CARD_BIZ_FAIL':
        case 'ACTIVATE_CARD_BIZ_FAIL':
        case 'BLOCK_CARD_BIZ_FAIL':
        case 'UNBLOCK_CARD_BIZ_FAIL':
        case 'CANCEL_CARD_BIZ_FAIL':
        case 'ENABLE_WITHDRAW_CARD_BIZ_FAIL':
        case 'DISABLE_WITHDRAW_CARD_BIZ_FAIL':
        case 'ENABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL':
        case 'DISABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL':
        case 'ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL':
        case 'DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL':
        case 'ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL':
        case 'DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL':
        case 'ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL':
        case 'DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL':
        case 'GET_CARD_MONTH_LIMIT_FAILURE':
        case 'REGISTER_CARD_SECOND_VIA_FAILURE':
            return {
                ...state,
                loading: false
            };
        case 'REGISTER_CARD_BIZ_SUCCESS':
        case 'ACTIVATE_CARD_BIZ_SUCCESS':
        case 'BLOCK_CARD_BIZ_SUCCESS':
        case 'UNBLOCK_CARD_BIZ_SUCCESS':
        case 'CANCEL_CARD_BIZ_SUCCESS':
        case 'ENABLE_WITHDRAW_CARD_BIZ_SUCCESS':
        case 'DISABLE_WITHDRAW_CARD_BIZ_SUCCESS':
        case 'ENABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS':
        case 'DISABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS':
        case 'ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS':
        case 'DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS':
        case 'ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS':
        case 'DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS':
        case 'ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS':
        case 'DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS':
        case 'REGISTER_CARD_SECOND_VIA_SUCCESS':
            return {
                ...state,
                loading: false
            };
        case 'GET_CARD_BIZ_SUCCESS':
            return {
                ...state,
                loading: false,

                card: action.data
            };
        case 'GET_CARD_MONTH_LIMIT_SUCCESS':
            return {
                ...state,
                loading: false,
                cardLimit: action.cardLimit
            };
        case 'SHOW_REGISTER_CARD_BIZ_MODAL':
            return {
                ...state,
                isRegisterModalOpen: true
            };
        case 'CLOSE_REGISTER_CARD_BIZ_MODAL':
            return {
                ...state,
                isRegisterModalOpen: false
            };
        case 'CLEAR_CARD_BIZ_STORE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
