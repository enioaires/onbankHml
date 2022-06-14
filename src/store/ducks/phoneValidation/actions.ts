import { PerfilStackNavigationProps } from '../../../routes/Logged/types';
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import {
    SEND_PHONE_SMS,
    SEND_PHONE_SMS_SUCCESS,
    SEND_PHONE_SMS_FAILURE,
    VALIDATE_SMS_CODE,
    VALIDATE_SMS_CODE_SUCCESS,
    VALIDATE_SMS_CODE_FAILURE,
    SHOW_SMS_MODAL,
    CLOSE_SMS_MODAL,
    CLEAR_PHONE_VALIDATION_STATE
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

type DidSendSMSSucceedAction = {
    type: typeof SEND_PHONE_SMS_SUCCESS;
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
    | ValidateSMSCodeAction
    | ShowSMSModalAction
    | CloseSMSModalAction
    | DidSendSMSFailAction
    | DidSendSMSSucceedAction
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

export const didSendSMSSucceedAction = (
    timeToWait: number | undefined,
    phoneNumber: string
): DidSendSMSSucceedAction => ({
    type: 'SEND_PHONE_SMS_SUCCESS',
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
