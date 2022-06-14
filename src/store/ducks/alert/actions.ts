import { SET_ALERT_MESSAGE, CLEAR_ALERT_STATE, IAlertState } from './types';

type SetAlertMessageAction = {
    type: typeof SET_ALERT_MESSAGE;
    alert: IAlertState;
};

type ClearAlertStateAction = {
    type: typeof CLEAR_ALERT_STATE;
};

export type AlertActions = SetAlertMessageAction | ClearAlertStateAction;

export const setAlertMessageAction = (
    alert: IAlertState
): SetAlertMessageAction => ({
    type: 'SET_ALERT_MESSAGE',
    alert
});

export const clearAlertStateAction = (): ClearAlertStateAction => ({
    type: 'CLEAR_ALERT_STATE'
});
