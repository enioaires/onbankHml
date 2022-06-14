import { Reducer } from 'redux';

import { ISuccessModalState } from './types';
import { SuccessModalAction } from './actions';

const INITIAL_STATE: ISuccessModalState = {
    modal: {
        visible: false,
        message: ''
    },
    modalNotNav: {
        visible: false,
        message: ''
    }
};

const reducer: Reducer<ISuccessModalState, SuccessModalAction> = (
    state: ISuccessModalState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'SHOW_MODAL_SUCCESS':
            return {
                ...state,
                modal: {
                    message: action.message,
                    visible: true
                }
            };
        case 'CLOSE_MODAL_SUCCESS':
            return {
                ...state,
                modal: {
                    ...state.modal,
                    visible: false,
                    message: ''
                }
            };
        case 'SHOW_MODAL_NOTNAV_SUCCESS':
            return {
                ...state,
                modalNotNav: {
                    message: action.message,
                    visible: true
                }
            };
        case 'CLOSE_MODAL_NOTNAV_SUCCESS':
            return {
                ...state,
                modalNotNav: {
                    ...state.modal,
                    visible: false,
                    message: ''
                }
            };
        default:
            return state;
    }
};

export default reducer;
