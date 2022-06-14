import { SetStateAction } from 'react';
import {
    REQUEST_FORGOT_PASSWORD,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    CLEAR_FORGOT_PASSWORD_PAYLOAD,
    VERIFY_DOCUMENT_NUMBER,
    CHANGE_FORGOT_PASSWORD_PAYLOAD,
    CHANGE_FORGOT_PASSWORD_PAYLOAD_VALIDATIONS,
    IForgotPasswordPayload
} from './types';

export type ChangeForgotPasswordPayloadAction = {
    type: typeof CHANGE_FORGOT_PASSWORD_PAYLOAD;
    key: keyof IForgotPasswordPayload;
    value: string;
};

type ChangeForgotPasswordPayloadValidationsAction = {
    type: typeof CHANGE_FORGOT_PASSWORD_PAYLOAD_VALIDATIONS;
    key: keyof IForgotPasswordPayload;
    value: string;
};

export type RequestForgotPasswordAction = {
    type: typeof REQUEST_FORGOT_PASSWORD;
    setShowAlert: React.Dispatch<SetStateAction<boolean>>;
    payload: IForgotPasswordPayload;
};

type DidForgotPasswordFailAction = {
    type: typeof FORGOT_PASSWORD_FAILURE;
};

type DidForgotPasswordSucceedAction = {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    clue: string;
};

type ClearForgotPasswordPayloadAction = {
    type: typeof CLEAR_FORGOT_PASSWORD_PAYLOAD;
};

type VerifyDocumentNumberAction = {
    type: typeof VERIFY_DOCUMENT_NUMBER;
};

export type ForgotPasswordActions =
    | RequestForgotPasswordAction
    | DidForgotPasswordFailAction
    | DidForgotPasswordSucceedAction
    | ClearForgotPasswordPayloadAction
    | VerifyDocumentNumberAction
    | ChangeForgotPasswordPayloadAction
    | ChangeForgotPasswordPayloadValidationsAction;

export const requestForgotPasswordAction = (
    setShowAlert: React.Dispatch<SetStateAction<boolean>>,
    payload: IForgotPasswordPayload
): RequestForgotPasswordAction => ({
    type: 'REQUEST_FORGOT_PASSWORD',
    setShowAlert,
    payload
});

export const didForgotPasswordFailAction = (): DidForgotPasswordFailAction => ({
    type: 'FORGOT_PASSWORD_FAILURE'
});

export const didForgotPasswordSucceedAction = (
    clue: string
): DidForgotPasswordSucceedAction => ({
    type: 'FORGOT_PASSWORD_SUCCESS',
    clue
});

export const clearForgotPasswordPayloadAction = (): ClearForgotPasswordPayloadAction => ({
    type: 'CLEAR_FORGOT_PASSWORD_PAYLOAD'
});

export const verifyDocumentNumberAction = (): VerifyDocumentNumberAction => ({
    type: 'VERIFY_DOCUMENT_NUMBER'
});

export const changeForgotPasswordPayloadAction = (
    key: keyof IForgotPasswordPayload,
    value: string
): ChangeForgotPasswordPayloadAction => ({
    type: 'CHANGE_FORGOT_PASSWORD_PAYLOAD',
    key,
    value
});

export const changeForgotPasswordPayloadValidationsAction = (
    key: keyof IForgotPasswordPayload,
    value: string
): ChangeForgotPasswordPayloadValidationsAction => ({
    type: 'CHANGE_FORGOT_PASSWORD_PAYLOAD_VALIDATIONS',
    key,
    value
});
