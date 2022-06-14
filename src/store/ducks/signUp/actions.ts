import {
    GeneralStackList,
    GeneralStackNavigationProps
} from 'src/routes/Logged/types';
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import {
    ISignUpPayload,
    REQUEST_SIGNUP,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
    CHANGE_SIGNUP_PAYLOAD,
    VALIDATE_SIGNUP_INPUTS,
    CLEAR_SIGNUP_PAYLOAD,
    CHANGE_SIGNUP_TOTAL_STEPS,
    DEMO_VALIDATE_ACCOUNT,
    DEMO_VALIDATE_ACCOUNT_SUCCESS,
    DEMO_VALIDATE_ACCOUNT_FAILURE,
    COMPLETE_DEMO_SIGNUP,
    COMPLETE_DEMO_SIGNUP_FAILURE,
    COMPLETE_DEMO_SIGNUP_SUCCESS,
    SIGNUP_BY_LEITURISTA
} from './types';

export type CompleteDemoSignupAction = {
    type: typeof COMPLETE_DEMO_SIGNUP;
    hwid: string;
    tokenSdk: string;
};

type CompleteDemoSignupFailureAction = {
    type: typeof COMPLETE_DEMO_SIGNUP_FAILURE;
};

type CompleteDemoSignupSuccessAction = {
    type: typeof COMPLETE_DEMO_SIGNUP_SUCCESS;
};

export type DemoValidateAction = {
    type: typeof DEMO_VALIDATE_ACCOUNT;
    documentNumber: string;
    initiateSdkIdwall: () => void;
};

type DemoValidateSuccessAction = {
    type: typeof DEMO_VALIDATE_ACCOUNT_SUCCESS;
};

type DemoValidateFailureAction = {
    type: typeof DEMO_VALIDATE_ACCOUNT_FAILURE;
};

export type ChangeSignUpPayloadAction = {
    type: typeof CHANGE_SIGNUP_PAYLOAD;
    payload: {
        key: keyof ISignUpPayload;
        value: string;
    };
};

type ChangeSignUpTotalSteps = {
    type: typeof CHANGE_SIGNUP_TOTAL_STEPS;
    steps: number;
};

export type RequestSignUpAction = {
    type: typeof REQUEST_SIGNUP;
    hwid: string;
    navigation: SignUpStackNavigationProps<'Agreement'>['navigation'];
};

type DidSignUpFailAction = {
    type: typeof SIGNUP_FAILURE;
};

type DidSignUpSucceedAction = {
    type: typeof SIGNUP_SUCCESS;
    data: any;
};

type ValidateSignUpInputsAction = {
    type: typeof VALIDATE_SIGNUP_INPUTS;
    payload: {
        key: keyof ISignUpPayload;
        value: string;
    };
};

type ClearSignUpPayloadAction = {
    type: typeof CLEAR_SIGNUP_PAYLOAD;
};

export type SignupBYLeituristaPayloadAction = {
    type: typeof SIGNUP_BY_LEITURISTA;
    navigation: GeneralStackNavigationProps<'Home'>['navigation'];
};

export type SignUpActions =
    | ChangeSignUpPayloadAction
    | ChangeSignUpTotalSteps
    | RequestSignUpAction
    | DidSignUpFailAction
    | DidSignUpSucceedAction
    | ValidateSignUpInputsAction
    | ClearSignUpPayloadAction
    | DemoValidateAction
    | DemoValidateFailureAction
    | DemoValidateSuccessAction
    | CompleteDemoSignupAction
    | CompleteDemoSignupFailureAction
    | CompleteDemoSignupSuccessAction;

export const completeDemoSignupAction = (
    hwid: string,
    tokenSdk: string
): CompleteDemoSignupAction => ({
    type: 'COMPLETE_DEMO_SIGNUP',
    hwid,
    tokenSdk
});

export const completeDemoSignupFailureAction =
    (): CompleteDemoSignupFailureAction => ({
        type: 'COMPLETE_DEMO_SIGNUP_FAILURE'
    });

export const completeDemoSignupSuccessAction =
    (): CompleteDemoSignupSuccessAction => ({
        type: 'COMPLETE_DEMO_SIGNUP_SUCCESS'
    });

export const demoValidateAction = (
    documentNumber: string,
    initiateSdkIdwall: () => void
): DemoValidateAction => ({
    type: 'DEMO_VALIDATE_ACCOUNT',
    documentNumber,
    initiateSdkIdwall
});

export const demoValidateSuccessAction = (): DemoValidateSuccessAction => ({
    type: 'DEMO_VALIDATE_ACCOUNT_SUCCESS'
});

export const demoValidateFailureAction = (): DemoValidateFailureAction => ({
    type: 'DEMO_VALIDATE_ACCOUNT_FAILURE'
});

export const changeSignUpPayloadAction = (payload: {
    key: keyof ISignUpPayload;
    value: string;
}): ChangeSignUpPayloadAction => ({
    type: 'CHANGE_SIGNUP_PAYLOAD',
    payload
});

export const changeSignUpTotalSteps = (
    steps: number
): ChangeSignUpTotalSteps => ({
    type: 'CHANGE_SIGNUP_TOTAL_STEPS',
    steps
});

export const requestSignUpAction = (
    hwid: any,
    navigation: SignUpStackNavigationProps<'Agreement'>['navigation']
): RequestSignUpAction => ({
    type: 'REQUEST_SIGNUP',
    hwid,
    navigation
});

export const didSignUpFailAction = (): DidSignUpFailAction => ({
    type: 'SIGNUP_FAILURE'
});

export const didSignUpSucceedAction = (data: any): DidSignUpSucceedAction => ({
    type: 'SIGNUP_SUCCESS',
    data
});

export const validateSignUpInputsAction = (payload: {
    key: keyof ISignUpPayload;
    value: string;
}): ValidateSignUpInputsAction => ({
    type: 'VALIDATE_SIGNUP_INPUTS',
    payload
});

export const clearSignUpPayloadAction = (): ClearSignUpPayloadAction => ({
    type: 'CLEAR_SIGNUP_PAYLOAD'
});

export const signupByLeituristaAction = (
    navigation: any
): SignupBYLeituristaPayloadAction => ({
    type: 'SIGNUP_BY_LEITURISTA',
    navigation
});
