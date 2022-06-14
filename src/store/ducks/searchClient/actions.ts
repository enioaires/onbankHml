import {
    REQUEST_SEARCH_CLIENT,
    SEARCH_CLIENT_FAILURE,
    SEARCH_CLIENT_SUCCESS,
    CLEAR_SEARCH_DATA
} from './types';

export type RequestSearchClientAction = {
    type: typeof REQUEST_SEARCH_CLIENT;
    documentNumber: string;
    navigation: any;
    feature:
        | 'signUp'
        | 'forgotPassword'
        | 'representativePJ'
        | 'existingCpf'
        | 'createAccount';
};

type DidSearchClientFailAction = {
    type: typeof SEARCH_CLIENT_FAILURE;
};

type DidSearchClientSucceedAction = {
    type: typeof SEARCH_CLIENT_SUCCESS;
    data: boolean;
};

type ClearSearchClientDataAction = {
    type: typeof CLEAR_SEARCH_DATA;
};

export type SearchClientActions =
    | RequestSearchClientAction
    | DidSearchClientFailAction
    | DidSearchClientSucceedAction
    | ClearSearchClientDataAction;

export const requestSearchClientAction = (
    documentNumber: string,
    navigation: any,
    feature:
        | 'signUp'
        | 'forgotPassword'
        | 'representativePJ'
        | 'existingCpf'
        | 'createAccount'
): RequestSearchClientAction => ({
    type: 'REQUEST_SEARCH_CLIENT',
    documentNumber,
    navigation,
    feature
});

export const didSearchClientFailAction = (): DidSearchClientFailAction => ({
    type: 'SEARCH_CLIENT_FAILURE'
});

export const didSearchClientSucceedAction = (
    data: boolean
): DidSearchClientSucceedAction => ({
    type: 'SEARCH_CLIENT_SUCCESS',
    data
});

export const clearSearchClientDataAction = (): ClearSearchClientDataAction => ({
    type: 'CLEAR_SEARCH_DATA'
});
