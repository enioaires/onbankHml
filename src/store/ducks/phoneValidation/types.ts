export const SEND_PHONE_SMS = 'SEND_PHONE_SMS';
export const SEND_PHONE_SMS_SUCCESS = 'SEND_PHONE_SMS_SUCCESS';
export const SEND_PHONE_SMS_FAILURE = 'SEND_PHONE_SMS_FAILURE';
export const VALIDATE_SMS_CODE = 'VALIDATE_SMS_CODE';
export const VALIDATE_SMS_CODE_SUCCESS = 'VALIDATE_SMS_CODE_SUCCESS';
export const VALIDATE_SMS_CODE_FAILURE = 'VALIDATE_SMS_CODE_FAILURE';
export const SHOW_SMS_MODAL = 'SHOW_SMS_MODAL';
export const CLOSE_SMS_MODAL = 'CLOSE_SMS_MODAL';
export const CLEAR_PHONE_VALIDATION_STATE = 'CLEAR_PHONE_VALIDATION_STATE';

export interface IPhoneValidationState {
    isLoading: boolean;
    error: boolean;
    registerPhone: string;
    timeToWait: number | undefined;
    showModal: boolean;
}
