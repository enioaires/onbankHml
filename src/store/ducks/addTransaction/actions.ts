import { AddTransactionPasswordStackNavigationProps } from '../../../routes/Logged/types';

import {
    CHANGE_PASSWORD,
    CHANGE_CONFIRMATION,
    ADD_TRANSACTION_PASSWORD,
    ADD_TRANSACTION_PASSWORD_FAILURE,
    ADD_TRANSACTION_PASSWORD_SUCCESS,
    CLEAR_STATE
} from './types';

export type AddTransactionPasswordAction = {
    type: typeof ADD_TRANSACTION_PASSWORD;
    navigation: AddTransactionPasswordStackNavigationProps<
        'PasswordConfirmation'
    >['navigation'];
};

type DidAddTransactionPasswordFailAction = {
    type: typeof ADD_TRANSACTION_PASSWORD_FAILURE;
};

type DidAddTransactionPasswordSucceedAction = {
    type: typeof ADD_TRANSACTION_PASSWORD_SUCCESS;
};

type ChangeAddTransactionPasswordAction = {
    type: typeof CHANGE_PASSWORD;
    password: string;
};

type ChangeAddTransactionConfirmationAction = {
    type: typeof CHANGE_CONFIRMATION;
    confirmation: string;
};

type ClearAddTransactionPasswordAction = {
    type: typeof CLEAR_STATE;
};

export type AddTransactionActions =
    | AddTransactionPasswordAction
    | DidAddTransactionPasswordFailAction
    | DidAddTransactionPasswordSucceedAction
    | ChangeAddTransactionPasswordAction
    | ChangeAddTransactionConfirmationAction
    | ClearAddTransactionPasswordAction;

export const addTransactionPasswordAction = (
    navigation: AddTransactionPasswordStackNavigationProps<
        'PasswordConfirmation'
    >['navigation']
): AddTransactionPasswordAction => ({
    type: 'ADD_TRANSACTION_PASSWORD',
    navigation
});

export const didAddTransactionPasswordFailAction = (): DidAddTransactionPasswordFailAction => ({
    type: 'ADD_TRANSACTION_PASSWORD_FAILURE'
});

export const didAddTransactionPasswordSucceedAction = (): DidAddTransactionPasswordSucceedAction => ({
    type: 'ADD_TRANSACTION_PASSWORD_SUCCESS'
});

export const changeAddTransactionPasswordAction = (
    password: string
): ChangeAddTransactionPasswordAction => ({
    type: 'CHANGE_PASSWORD',
    password
});

export const changeAddTransactionConfirmationAction = (
    confirmation: string
): ChangeAddTransactionConfirmationAction => ({
    type: 'CHANGE_CONFIRMATION',
    confirmation
});

export const clearAddTransactionPasswordAction = (): ClearAddTransactionPasswordAction => ({
    type: 'CLEAR_STATE'
});
