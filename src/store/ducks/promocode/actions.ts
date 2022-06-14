import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import { InviteStackNavigationProps } from '../../../routes/Logged/types';
import {
    VERIFY_PROMO_CODE,
    VERIFY_PROMO_CODE_SUCCESS,
    VERIFY_PROMO_CODE_FAIL,
    GENERATE_PROMO_CODE,
    GENERATE_PROMO_CODE_FAIL,
    GENERATE_PROMO_CODE_SUCCESS,
    GET_PROMO_CODE_INVITES,
    GET_PROMO_CODE_INVITES_FAIL,
    GET_PROMO_CODE_INVITES_SUCCESS,
    REFRESH_POMO_CODE,
    REFRESH_POMO_CODE_FAILURE,
    REFRESH_POMO_CODE_SUCCESS,
    IPromocodeInvites
} from './types';

type RefreshPromocodeAction = {
    type: typeof REFRESH_POMO_CODE;
};

type RefreshPromocodeFailAction = {
    type: typeof REFRESH_POMO_CODE_FAILURE;
};

type RefreshPromocodeSuccessAction = {
    type: typeof REFRESH_POMO_CODE_SUCCESS;
};

export type VerifyPromocodeAction = {
    type: typeof VERIFY_PROMO_CODE;
    promocode: string;
    navigation: SignUpStackNavigationProps<'PromoCode'>['navigation'];
};

type VerifyPromocodeSuccessAction = {
    type: typeof VERIFY_PROMO_CODE_SUCCESS;
};

type VerifyPromocodeFailAction = {
    type: typeof VERIFY_PROMO_CODE_FAIL;
};

export type GeneratePromocodeAction = {
    type: typeof GENERATE_PROMO_CODE;
    promocode: string;
    navigation: InviteStackNavigationProps<'Promocode'>['navigation'];
};

type GeneratePromocodeSuccessAction = {
    type: typeof GENERATE_PROMO_CODE_SUCCESS;
};

type GeneratePromocodeFailAction = {
    type: typeof GENERATE_PROMO_CODE_FAIL;
};

export type GetPromocodeInvitesAction = {
    type: typeof GET_PROMO_CODE_INVITES;
};

type GetPromocodeInvitesSuccessAction = {
    type: typeof GET_PROMO_CODE_INVITES_SUCCESS;
    invites: IPromocodeInvites;
};

type GetPromocodeInvitesFailAction = {
    type: typeof GET_PROMO_CODE_INVITES_FAIL;
};

export type PromocodeActions =
    | VerifyPromocodeAction
    | VerifyPromocodeSuccessAction
    | VerifyPromocodeFailAction
    | GeneratePromocodeAction
    | GeneratePromocodeSuccessAction
    | GeneratePromocodeFailAction
    | GetPromocodeInvitesAction
    | GetPromocodeInvitesSuccessAction
    | GetPromocodeInvitesFailAction
    | RefreshPromocodeAction
    | RefreshPromocodeFailAction
    | RefreshPromocodeSuccessAction;

export const refreshPromocodeAction = (): RefreshPromocodeAction => ({
    type: 'REFRESH_POMO_CODE'
});

export const refreshPromocodeFailAction = (): RefreshPromocodeFailAction => ({
    type: 'REFRESH_POMO_CODE_FAILURE'
});

export const refreshPromocodeSuccessAction = (): RefreshPromocodeSuccessAction => ({
    type: 'REFRESH_POMO_CODE_SUCCESS'
});

export const verifyPromocodeAction = (
    promocode: string,
    navigation: SignUpStackNavigationProps<'PromoCode'>['navigation']
): VerifyPromocodeAction => ({
    type: 'VERIFY_PROMO_CODE',
    promocode,
    navigation
});

export const verifyPromocodeSuccessAction = (): VerifyPromocodeSuccessAction => ({
    type: 'VERIFY_PROMO_CODE_SUCCESS'
});

export const verifyPromocodeFailAction = (): VerifyPromocodeFailAction => ({
    type: 'VERIFY_PROMO_CODE_FAIL'
});

export const generatePromocodeAction = (
    promocode: string,
    navigation: InviteStackNavigationProps<'Promocode'>['navigation']
): GeneratePromocodeAction => ({
    type: 'GENERATE_PROMO_CODE',
    promocode,
    navigation
});

export const generatePromocodeSuccessAction = (): GeneratePromocodeSuccessAction => ({
    type: 'GENERATE_PROMO_CODE_SUCCESS'
});

export const generatePromocodeFailAction = (): GeneratePromocodeFailAction => ({
    type: 'GENERATE_PROMO_CODE_FAIL'
});

export const getPromocodeInvitesAction = (): GetPromocodeInvitesAction => ({
    type: 'GET_PROMO_CODE_INVITES'
});

export const getPromocodeInvitesSuccessAction = (
    invites: IPromocodeInvites
): GetPromocodeInvitesSuccessAction => ({
    type: 'GET_PROMO_CODE_INVITES_SUCCESS',
    invites
});

export const getPromocodeInvitesFailAction = (): GetPromocodeInvitesFailAction => ({
    type: 'GET_PROMO_CODE_INVITES_FAIL'
});
