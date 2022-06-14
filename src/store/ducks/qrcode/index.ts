import { Reducer } from 'redux';

import { QRCodeActions } from './actions';
import { IQRCodeState } from './types';

const INITIAL_STATE: IQRCodeState = {
    isLoading: false
};

const reducer: Reducer<IQRCodeState, QRCodeActions> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'GET_QRCODE_DATA':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_QRCODE_DATA_DONE':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
