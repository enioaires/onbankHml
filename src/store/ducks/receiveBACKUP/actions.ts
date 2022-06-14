import { ReceiveStackNavigationProps } from '../../../routes/Logged/types';
import {
    REQUEST_RECEIVE,
    RECEIVE_FAILURE,
    RECEIVE_SUCCESS,
    CHANGE_RECEIVE_PAYLOAD,
    CLEAR_RECEIVE_STATE
} from './types';

export type RequestReceiveAction = {
    type: typeof REQUEST_RECEIVE;
    navigation: ReceiveStackNavigationProps<'Value'>['navigation'];
};

type ChangeReceivePayloadAction = {
    type: typeof CHANGE_RECEIVE_PAYLOAD;
    payload: {
        amount?: string;
        description?: string;
    };
};

type DidReceiveFailAction = {
    type: typeof RECEIVE_FAILURE;
};

type DidReceiveSucceedAction = {
    type: typeof RECEIVE_SUCCESS;
    url: string;
};

type ClearReceiveStateAction = {
    type: typeof CLEAR_RECEIVE_STATE;
};

export type ReceiveActions =
    | RequestReceiveAction
    | ChangeReceivePayloadAction
    | DidReceiveFailAction
    | DidReceiveSucceedAction
    | ClearReceiveStateAction;

export const requestReceiveAction = (
    navigation: ReceiveStackNavigationProps<'Value'>['navigation']
): RequestReceiveAction => ({
    type: 'REQUEST_RECEIVEbackup',
    navigation
});

export const changeReceivePayloadAction = (payload: {
    amount?: string;
    description?: string;
}): ChangeReceivePayloadAction => ({
    type: 'CHANGE_RECEIVE_PAYLOADbackup',
    payload
});

export const didReceiveFailAction = (): DidReceiveFailAction => ({
    type: 'RECEIVE_FAILUREbackup'
});

export const didReceiveSucceedAction = (
    url: string
): DidReceiveSucceedAction => ({
    type: 'RECEIVE_SUCCESSbackup',
    url
});

export const clearReceiveStateAction = (): ClearReceiveStateAction => ({
    type: 'CLEAR_RECEIVE_STATEbackup'
});
