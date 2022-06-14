import { Reducer } from 'redux';

// Types
import { IPhoneValidationState } from './types';
import { PhoneValidationActions } from './actions';

const INITIAL_STATE: IPhoneValidationState = {
    isLoading: false,
    error: false,
    showModal: false,
    timeToWait: undefined,
    registerPhone: ''
};

const reducer: Reducer<IPhoneValidationState, PhoneValidationActions> = (
    state: IPhoneValidationState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'SEND_PHONE_SMS_PASSWORD':
        case 'SEND_PHONE_SMS':
        case 'VALIDATE_SMS_CODE':
            return {
                ...state,
                isLoading: true
            };
        case 'SEND_PHONE_SMS_PASSWORD_SUCCESS':
        case 'SEND_PHONE_SMS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                timeToWait: action.timeToWait,
                registerPhone: action.phoneNumber
            };
        case 'VALIDATE_SMS_CODE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'UPDATE_MS_TIME_WAIT':
            return {
                ...state,
                timeToWait: action.timeToWait
            }
        case 'SEND_PHONE_SMS_PASSWORD_FAILURE':
        case 'SEND_PHONE_SMS_FAILURE':
        case 'VALIDATE_SMS_CODE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'SHOW_SMS_MODAL':
            return {
                ...state,
                showModal: true
            };
        case 'CLOSE_SMS_MODAL':
            return {
                ...state,
                showModal: false
            };
        case 'CLEAR_PHONE_VALIDATION_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
