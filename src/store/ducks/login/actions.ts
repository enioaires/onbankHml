import {
    StackNavigationProps,
    AuthStackList
} from '../../../routes/Auth/types';
import {
    SUBMIT_LOGIN_FAILURE,
    SUBMIT_LOGIN_SUCCESS,
    SUBMIT_LOGIN,
    CLEAR_LOGIN_STATE,
    CHANGE_LOGIN_PAYLOAD,
    CHANGE_LOGIN_PAYLOAD_VALIDATIONS,
    ILoginPayload
} from './types';

export type ChangeLoginPayloadAction = {
    type: typeof CHANGE_LOGIN_PAYLOAD;
    key: keyof ILoginPayload;
    value: string;
};

type ChangeLoginPayloadValidationsAction = {
    type: typeof CHANGE_LOGIN_PAYLOAD_VALIDATIONS;
    key: keyof ILoginPayload;
    value: string;
};

type LoginFailureAction = {
    type: typeof SUBMIT_LOGIN_FAILURE;
};

type LoginSuccessAction = {
    type: typeof SUBMIT_LOGIN_SUCCESS;
};

export type SubmitLoginAction = {
    type: typeof SUBMIT_LOGIN;
    payload: ILoginPayload;
    touchFaceIdStore?: boolean;
    navigation: StackNavigationProps<AuthStackList, 'Login'>['navigation'];
};

type ClearLoginStateAction = {
    type: typeof CLEAR_LOGIN_STATE;
};

export type LoginActions =
    | ChangeLoginPayloadValidationsAction
    | ChangeLoginPayloadAction
    | LoginFailureAction
    | LoginSuccessAction
    | SubmitLoginAction
    | ClearLoginStateAction;

export const changeLoginPayloadAction = (
    key: keyof ILoginPayload,
    value: string
): ChangeLoginPayloadAction => ({
    type: 'CHANGE_LOGIN_PAYLOAD',
    key,
    value
});

export const changeLoginPayloadValidationsAction = (
    key: keyof ILoginPayload,
    value: string
): ChangeLoginPayloadValidationsAction => ({
    type: 'CHANGE_LOGIN_PAYLOAD_VALIDATIONS',
    key,
    value
});

export const didLoginFailAction = (): LoginFailureAction => ({
    type: 'SUBMIT_LOGIN_FAILURE'
});

export const didLoginSucceedAction = (): LoginSuccessAction => ({
    type: 'SUBMIT_LOGIN_SUCCESS'
});

export const loginAction = (
    payload: ILoginPayload,
    navigation: StackNavigationProps<AuthStackList, 'Login'>['navigation'],
    touchFaceIdStore?: boolean
): SubmitLoginAction => ({
    type: 'SUBMIT_LOGIN',
    payload,
    navigation,
    touchFaceIdStore
});

export const clearLoginStateAction = (): ClearLoginStateAction => ({
    type: 'CLEAR_LOGIN_STATE'
});
