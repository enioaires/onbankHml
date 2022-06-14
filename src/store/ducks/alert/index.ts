import { Reducer } from 'redux';

import { IAlertState } from './types';
import { AlertActions } from './actions';

const INITIAL_STATE: IAlertState = {
    title: '',
    message: '',
    type: 'info',
    logout: false,
    action: undefined,
    revalidate: false,
    invertedOptions: false
};

const reducer: Reducer<IAlertState, AlertActions> = (
    state: IAlertState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'SET_ALERT_MESSAGE':
            return {
                ...state,
                title: action.alert.title,
                message: action.alert.message,
                action: action.alert.action,
                type: action.alert.type || 'info',
                logout: action.alert.logout || false,
                revalidate: action.alert.revalidate || false,
                invertedOptions: action.alert.invertedOptions || false
            };
        case 'CLEAR_ALERT_STATE':
            return {
                ...state,
                title: '',
                message: '',
                logout: false,
                action: undefined,
                invertedOptions: false
            };
        default:
            return state;
    }
};

export default reducer;
