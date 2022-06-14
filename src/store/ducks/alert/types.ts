export const SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE';
export const CLEAR_ALERT_STATE = 'CLEAR_ALERT_STATE';

export interface IAlertState {
    title: string;
    message: string;
    type: 'info' | 'error';
    logout?: boolean;
    revalidate?: boolean;
    action?: {
        onPress: () => void;
        mainLabel: string;
        secondLabel?: string;
        secondOnPress?: () => void;
    };
    invertedOptions?: boolean;
}
