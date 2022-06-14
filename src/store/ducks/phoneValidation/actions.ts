import { PerfilStackNavigationProps } from '../../../routes/Logged/types';
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import {
    SEND_PHONE_SMS,
    SEND_PHONE_SMS_SUCCESS,
    SEND_PHONE_SMS_FAILURE,
    SEND_PHONE_SMS_PASSWORD,
    SEND_PHONE_SMS_PASSWORD_SUCCESS,
    SEND_PHONE_SMS_PASSWORD_FAILURE,
    VALIDATE_SMS_CODE,
    VALIDATE_SMS_CODE_SUCCESS,
    VALIDATE_SMS_CODE_FAILURE,
    SHOW_SMS_MODAL,
    CLOSE_SMS_MODAL,
    CLEAR_PHONE_VALIDATION_STATE,
    UPDATE_MS_TIME_WAIT
} from './types';

export type SendSMSAction = {
    type: typeof SEND_PHONE_SMS;
    isResend: boolean;
    navigation:
        | PerfilStackNavigationProps<'ChangePhone'>['navigation']
        | SignUpStackNavigationProps<'Phone'>['navigation'];
    perfil?: boolean;
    phone?: string;
    routeContext?: string;
};

export type SendSMSPasswordAction = {
    type: typeof SEND_PHONE_SMS_PASSWORD;
    isResend: boolean;
    navigation: any;
    phone?: string;
    isPasswordTransaction?: boolean;
};

export type ValidateSMSCodeAction = {
    type: typeof VALIDATE_SMS_CODE;
    code: string;
    navigation: any;
    perfil?: boolean;
    phone?: string;
    routeContext?: string;
};

type ShowSMSModalAction = {
    type: typeof SHOW_SMS_MODAL;
};

type CloseSMSModalAction = {
    type: typeof CLOSE_SMS_MODAL;
};

type DidSendSMSFailAction = {
    type: typeof SEND_PHONE_SMS_FAILURE;
};

type DidSendSMSPasswordFailAction = {
    type: typeof SEND_PHONE_SMS_PASSWORD_FAILURE;
};

type DidSendSMSSucceedAction = {
    type: typeof SEND_PHONE_SMS_SUCCESS;
    timeToWait: number | undefined;
    phoneNumber: string;
};

type UpdateSmsTimeToWaitAction = {
    type: typeof UPDATE_MS_TIME_WAIT;
    timeToWait: number | undefined;
};

type DidSendSMSPasswordSucceedAction = {
    type: typeof SEND_PHONE_SMS_PASSWORD_SUCCESS;
    timeToWait: number | undefined;
    phoneNumber: string;
};

type DidValidateSMSFailAction = {
    type: typeof VALIDATE_SMS_CODE_FAILURE;
};

type DidValidateSMSSucceedAction = {
    type: typeof VALIDATE_SMS_CODE_SUCCESS;
};

type ClearPhoneValidationStateAction = {
    type: typeof CLEAR_PHONE_VALIDATION_STATE;
};

export type PhoneValidationActions =
    | SendSMSAction
    | SendSMSPasswordAction
    | ValidateSMSCodeAction
    | ShowSMSModalAction
    | CloseSMSModalAction
    | DidSendSMSFailAction
    | DidSendSMSPasswordFailAction
    | DidSendSMSSucceedAction
    | DidSendSMSPasswordSucceedAction
    | UpdateSmsTimeToWaitAction
    | DidValidateSMSFailAction
    | DidValidateSMSSucceedAction
    | ClearPhoneValidationStateAction;

export const sendSMSAction = (
    isResend: boolean,
    navigation:
        | PerfilStackNavigationProps<'ChangePhone'>['navigation']
        | SignUpStackNavigationProps<'Phone'>['navigation'],
    perfil?: boolean,
    phone?: string,
    routeContext?: string
): SendSMSAction => ({
    type: 'SEND_PHONE_SMS',
    isResend,
    navigation,
    perfil,
    phone,
    routeContext
});

export const sendSMSPasswordAction = (
    isResend: boolean,
    navigation: any,
    phone?: string,
    isPasswordTransaction?: boolean
): SendSMSPasswordAction => ({
    type: 'SEND_PHONE_SMS_PASSWORD',
    isResend,
    navigation,
    phone,
    isPasswordTransaction
});

export const validateSMSCodeAction = (
    code: string,
    navigation: any,
    perfil?: boolean,
    phone?: string,
    routeContext?: string
): ValidateSMSCodeAction => ({
    type: 'VALIDATE_SMS_CODE',
    code,
    navigation,
    perfil,
    phone,
    routeContext
});

export const showSMSModalAction = (): ShowSMSModalAction => ({
    type: 'SHOW_SMS_MODAL'
});

export const closeSMSModalAction = (): CloseSMSModalAction => ({
    type: 'CLOSE_SMS_MODAL'
});

export const didSendSMSFailAction = (): DidSendSMSFailAction => ({
    type: 'SEND_PHONE_SMS_FAILURE'
});

export const didSendSMSPasswordFailAction =
    (): DidSendSMSPasswordFailAction => ({
        type: 'SEND_PHONE_SMS_PASSWORD_FAILURE'
    });

export const didSendSMSSucceedAction = (
    timeToWait: number | undefined,
    phoneNumber: string
): DidSendSMSSucceedAction => ({
    type: 'SEND_PHONE_SMS_SUCCESS',
    timeToWait,
    phoneNumber
});

export const updateSmsTimeToWait = (
    timeToWait: number | undefined
): UpdateSmsTimeToWaitAction => ({
    type: 'UPDATE_MS_TIME_WAIT',
    timeToWait
});

export const didSendSMSPasswordSucceedAction = (
    timeToWait: number | undefined,
    phoneNumber: string
): DidSendSMSPasswordSucceedAction => ({
    type: 'SEND_PHONE_SMS_PASSWORD_SUCCESS',
    timeToWait,
    phoneNumber
});

export const didValidateSMSFailAction = (): DidValidateSMSFailAction => ({
    type: 'VALIDATE_SMS_CODE_FAILURE'
});

export const didValidateSMSSucceedAction = (): DidValidateSMSSucceedAction => ({
    type: 'VALIDATE_SMS_CODE_SUCCESS'
});

export const clearPhoneValidationStateAction =
    (): ClearPhoneValidationStateAction => ({
        type: 'CLEAR_PHONE_VALIDATION_STATE'
    });
