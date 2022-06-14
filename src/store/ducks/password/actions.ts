import { Dispatch, SetStateAction } from 'react';
import {
    IPasswordState,
    CHANGE_PASSWORD_STATE,
    CLEAR_PASSWORD_STATE,
    UPDATE_ACCESS_PASSWORD,
    UPDATE_TRANSACTION_PASSWORD,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    VALIDATE_TRANSACTION_PASSWORD,
    VALIDATE_TRANSACTION_PASSWORD_SUCCESS,
    VALIDATE_TRANSACTION_PASSWORD_FAIL,
    VALIDATE_ACCESS_PASSWORD,
    VALIDATE_ACCESS_PASSWORD_SUCCESS,
    VALIDATE_ACCESS_PASSWORD_FAIL,
    UPDATE_PASSWORD_START
} from './types';

export type ValidateAccessPasswordAction = {
    type: typeof VALIDATE_ACCESS_PASSWORD;
    callback: () => void;
    password: string;
    navigation: any;
    updatePayload?: {
        phoneNumber: string;
        code: string;
        oldPhoneNumber: string;
    };
    isRegisterKeys?: boolean;
};

type ValidateAccessPasswordSuccessAction = {
    type: typeof VALIDATE_ACCESS_PASSWORD_SUCCESS;
};

type ValidateAccessPasswordFailAction = {
    type: typeof VALIDATE_ACCESS_PASSWORD_FAIL;
};

export type ValidateTransactionPasswordAction = {
    type: typeof VALIDATE_TRANSACTION_PASSWORD;
    callback: (password: string) => void;
    navigation: any;
    password: string;
    cancelButton: Dispatch<SetStateAction<boolean>>;
    url?: string;
};

type ValidateTransactionPasswordSuccessAction = {
    type: typeof VALIDATE_TRANSACTION_PASSWORD_SUCCESS;
};

type ValidateTransactionPasswordFailAction = {
    type: typeof VALIDATE_TRANSACTION_PASSWORD_FAIL;
};

type ChangePasswordStateAction = {
    type: typeof CHANGE_PASSWORD_STATE;
    key: keyof IPasswordState;
    value: string;
};

type ClearPasswordStateAction = {
    type: typeof CLEAR_PASSWORD_STATE;
};

export type UpdatePasswordStartAction = {
    type: typeof UPDATE_PASSWORD_START;
};

export type UpdateAccessPasswordAction = {
    type: typeof UPDATE_ACCESS_PASSWORD;
    code: string;
    navigation?: any;
};

export type UpdateTransactionPasswordAction = {
    type: typeof UPDATE_TRANSACTION_PASSWORD;
    code?: string | null | undefined;
    navigation?: any;
};

type DidUpdateSucceedAction = {
    type: typeof UPDATE_SUCCESS;
};

type DidUpdateFailAction = {
    type: typeof UPDATE_FAILURE;
    errorMessage?: string | null | undefined;
};

export type PasswordActions =
    | ChangePasswordStateAction
    | ClearPasswordStateAction
    | UpdateAccessPasswordAction
    | UpdateTransactionPasswordAction
    | DidUpdateSucceedAction
    | DidUpdateFailAction
    | ValidateTransactionPasswordAction
    | ValidateTransactionPasswordSuccessAction 
    | ValidateTransactionPasswordFailAction 
    | ValidateAccessPasswordAction
    | UpdatePasswordStartAction
    | ValidateAccessPasswordSuccessAction
    | ValidateAccessPasswordFailAction;

export const validateAccessPasswordAction = (
    callback: () => void,
    password: string,
    navigation: any,
    updatePayload?: {
        phoneNumber: string;
        code: string;
        oldPhoneNumber: string;
    },
    isRegisterKeys?: boolean
): ValidateAccessPasswordAction => ({
    type: 'VALIDATE_ACCESS_PASSWORD',
    callback,
    password,
    navigation,
    updatePayload,
    isRegisterKeys
});

export const validateAccessPasswordSuccessAction = (): ValidateAccessPasswordSuccessAction => ({
    type: 'VALIDATE_ACCESS_PASSWORD_SUCCESS'
});

export const validateAccessPasswordFailAction = (): ValidateAccessPasswordFailAction => ({
    type: 'VALIDATE_ACCESS_PASSWORD_FAIL'
});

export const validateTransactionPasswordAction = (
    callback: (password: string) => void,
    navigation: any,
    password: string,
    cancelButton: Dispatch<SetStateAction<boolean>>,
    url?: string
): ValidateTransactionPasswordAction => ({
    type: 'VALIDATE_TRANSACTION_PASSWORD',
    callback,
    navigation,
    password,
    cancelButton,
    url
});

export const validateTransactionPasswordSuccessAction = (): ValidateTransactionPasswordSuccessAction => ({
    type: 'VALIDATE_TRANSACTION_PASSWORD_SUCCESS'
});

export const validateTransactionPasswordFailAction = (): ValidateTransactionPasswordFailAction => ({
    type: 'VALIDATE_TRANSACTION_PASSWORD_FAIL'
});


export const changePasswordStateAction = (
    key: keyof IPasswordState,
    value: string
): ChangePasswordStateAction => ({
    type: 'CHANGE_PASSWORD_STATE',
    key,
    value
});

export const clearPasswordStateAction = (): ClearPasswordStateAction => ({
    type: 'CLEAR_PASSWORD_STATE'
});

export const updatePasswordStartAction = (): UpdatePasswordStartAction => ({
    type: 'UPDATE_PASSWORD_START'
});

export const updateAccessPasswordAction = (
    code: string,
    navigation: any = null
): UpdateAccessPasswordAction => ({
    type: 'UPDATE_ACCESS_PASSWORD',
    code,
    navigation
});

export const updateTransactionPasswordAction = (
    code: string | null | undefined = null,
    navigation: any = null
): UpdateTransactionPasswordAction => ({
    type: 'UPDATE_TRANSACTION_PASSWORD',
    code,
    navigation
});

export const didUpdateSucceedAction = (): DidUpdateSucceedAction => ({
    type: 'UPDATE_SUCCESS'
});

export const didUpdateFailAction = (
    errorMessage: string | null | undefined = ''
): DidUpdateFailAction => ({
    type: 'UPDATE_FAILURE',
    errorMessage
});
