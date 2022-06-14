export const VERIFY_PROMO_CODE = 'VERIFY_PROMO_CODE';
export const VERIFY_PROMO_CODE_SUCCESS = 'VERIFY_PROMO_CODE_SUCCESS';
export const VERIFY_PROMO_CODE_FAIL = 'VERIFY_PROMO_CODE_FAIL';
export const GENERATE_PROMO_CODE = 'GENERATE_PROMO_CODE';
export const GENERATE_PROMO_CODE_SUCCESS = 'GENERATE_PROMO_CODE_SUCCESS';
export const GENERATE_PROMO_CODE_FAIL = 'GENERATE_PROMO_CODE_FAIL';
export const GET_PROMO_CODE_INVITES = 'GET_PROMO_CODE_INVITES';
export const GET_PROMO_CODE_INVITES_SUCCESS = 'GET_PROMO_CODE_INVITES_SUCCESS';
export const GET_PROMO_CODE_INVITES_FAIL = 'GET_PROMO_CODE_INVITES_FAIL';
export const REFRESH_POMO_CODE = 'REFRESH_POMO_CODE';
export const REFRESH_POMO_CODE_SUCCESS = 'REFRESH_POMO_CODE_SUCCESS';
export const REFRESH_POMO_CODE_FAILURE = 'REFRESH_POMO_CODE_FAILURE';
export interface IPromocodeInvites {
    total: number;
    accounts: string[];
}
export interface IPromocodeState {
    isLoading: boolean;
    error: boolean;
    invites: IPromocodeInvites | null;
}
