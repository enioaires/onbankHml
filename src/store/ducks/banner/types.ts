export const GET_BANNER = 'GET_BANNER';
export const GET_BANNER_SUCCESS = 'GET_BANNER_SUCCESS';
export const GET_BANNER_FAILURE = 'GET_BANNER_FAILURE';
export const CLEAR_BANNER_DATA = 'CLEAR_BANNER_DATA';

export interface IBannerData {
    imageUrl: string;
    position: number;
    redirectUrl: string;
    type: string;
}

export interface IBannerState {
    isLoading: boolean;
    error: boolean;
    data: IBannerData[];
}
