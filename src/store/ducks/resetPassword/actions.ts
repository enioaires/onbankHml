import {
    CHANGE_RESET_PASSWORD_PAYLOAD,
    REQUEST_RESET_PASSWORD,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    CLEAR_RESET_PASSWORD_PAYLOAD
} from './types';

type ChangeResetPasswordPayloadAction = {
    type: typeof CHANGE_RESET_PASSWORD_PAYLOAD;
    payload: string;
};

type RequestResetPasswordAction = {
    type: typeof REQUEST_RESET_PASSWORD;
    setShowAlert: any;
    token: string;
};

type DidResetPasswordFailAction = {
    type: typeof RESET_PASSWORD_FAILURE;
};

type DidResetPasswordSucceedAction = {
    type: typeof RESET_PASSWORD_SUCCESS;
    clue?: string;
};

type ClearResetPasswordPayloadAction = {
    type: typeof CLEAR_RESET_PASSWORD_PAYLOAD;
};

export type ResetPasswordActions =
    | ChangeResetPasswordPayloadAction
    | RequestResetPasswordAction
    | DidResetPasswordFailAction
    | DidResetPasswordSucceedAction
    | ClearResetPasswordPayloadAction;

export const changeResetPasswordPayloadAction = (
    payload: string
): ChangeResetPasswordPayloadAction => ({
    type: 'CHANGE_RESET_PASSWORD_PAYLOAD',
    payload
});

export const requestResetPasswordAction = (
    setShowAlert: any,
    token: string
): RequestResetPasswordAction => ({
    type: 'REQUEST_RESET_PASSWORD',
    setShowAlert,
    token
});

export const didResetPasswordFailAction = (): DidResetPasswordFailAction => ({
    type: 'RESET_PASSWORD_FAILURE'
});

export const didResetPasswordSucceedAction = (
    clue?: string
): DidResetPasswordSucceedAction => ({
    type: 'RESET_PASSWORD_SUCCESS',
    clue
});

export const clearResetPasswordPayloadAction = (): ClearResetPasswordPayloadAction => ({
    type: 'CLEAR_RESET_PASSWORD_PAYLOAD'
});
