import {
    IBannerData,
    GET_BANNER,
    GET_BANNER_SUCCESS,
    GET_BANNER_FAILURE,
    CLEAR_BANNER_DATA
} from './types';

type GetBannerAction = {
    type: typeof GET_BANNER;
};

type DidGetBannerFailAction = {
    type: typeof GET_BANNER_FAILURE;
};

type DidGetBannerSucceedAction = {
    type: typeof GET_BANNER_SUCCESS;
    data: IBannerData[];
};

type ClearBannerDataAction = {
    type: typeof CLEAR_BANNER_DATA;
};

export type BannerActions =
    | GetBannerAction
    | DidGetBannerFailAction
    | DidGetBannerSucceedAction
    | ClearBannerDataAction;

export const getBannerAction = (): GetBannerAction => ({
    type: 'GET_BANNER'
});

export const didGetBannerFailAction = (): DidGetBannerFailAction => ({
    type: 'GET_BANNER_FAILURE'
});

export const didGetBannerSucceedAction = (
    data: IBannerData[]
): DidGetBannerSucceedAction => ({
    type: 'GET_BANNER_SUCCESS',
    data
});

export const clearBannerDataAction = (): ClearBannerDataAction => ({
    type: 'CLEAR_BANNER_DATA'
});
