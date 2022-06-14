import { Reducer } from 'redux';

import { ISignUpState } from './types';
import { SignUpActions } from './actions';

const INITIAL_STATE: ISignUpState = {
    payload: {
        fullName: '',
        birthDate: '',
        email: '',
        emailConfirmation: '',
        phone: '',
        sex: '',
        documentNumber: '',
        password: '',
        passwordConfirmation: '',
        companyName: '',
        representativeName: '',
        representativeTaxId: '',
        motherName: '',
        businessLine: null,
        establishmentForm: null,
        establishmentDate: '',
        existingCpf: '',
        existingPassword: '',
        postalCode: '',
        neighborhood: '',
        number: '',
        state: '',
        street: '',
        city: '',
        country: 'BRA',
        complement: '',
        accountId: '',
        promocode: '',
        tokenSdk: ''
    },
    inputsValidation: {
        fullName: '',
        birthDate: '',
        email: '',
        emailConfirmation: '',
        phone: '',
        sex: '',
        documentNumber: '',
        password: '',
        passwordConfirmation: '',
        companyName: '',
        representativeName: '',
        representativeTaxId: '',
        motherName: '',
        businessLine: '',
        establishmentForm: '',
        establishmentDate: '',
        existingCpf: '',
        existingPassword: '',
        postalCode: '',
        neighborhood: '',
        number: '',
        state: '',
        street: '',
        city: '',
        country: '',
        complement: '',
        accountId: '',
        promocode: '',
        tokenSdk: ''
    },
    steps: 13,
    data: {
        token: ''
    },
    isLoading: false,
    error: false
};

const reducer: Reducer<ISignUpState, SignUpActions> = (
    state: ISignUpState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_SIGNUP_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'VALIDATE_SIGNUP_INPUTS':
            return {
                ...state,
                inputsValidation: {
                    ...state.inputsValidation,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'REQUEST_SIGNUP':
        case 'DEMO_VALIDATE_ACCOUNT':
        case 'COMPLETE_DEMO_SIGNUP':
            return {
                ...state,
                isLoading: true
            };
        case 'SIGNUP_FAILURE':
        case 'DEMO_VALIDATE_ACCOUNT_FAILURE':
        case 'COMPLETE_DEMO_SIGNUP_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'DEMO_VALIDATE_ACCOUNT_SUCCESS':
        case 'COMPLETE_DEMO_SIGNUP_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case 'CHANGE_SIGNUP_TOTAL_STEPS':
            return {
                ...state,
                steps: action.steps
            };
        case 'CLEAR_SIGNUP_PAYLOAD':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
