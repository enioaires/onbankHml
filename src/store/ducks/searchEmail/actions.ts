import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import {
    REQUEST_SEARCH_EMAIL,
    SEARCH_EMAIL_FAILURE,
    SEARCH_EMAIL_SUCCESS,
    CLEAR_SEARCH_EMAIL_DATA
} from './types';

export type RequestSearchEmailAction = {
    type: typeof REQUEST_SEARCH_EMAIL;
    email: string;
    navigation: SignUpStackNavigationProps<'Email'>['navigation'];
    initiateIdWallSdk: () => void;
    accountFlux: 'demo' | 'completed';
};

type DidSearchEmailFailAction = {
    type: typeof SEARCH_EMAIL_FAILURE;
};

type DidSearchEmailSucceedAction = {
    type: typeof SEARCH_EMAIL_SUCCESS;
};

type ClearSearchEmailDataAction = {
    type: typeof CLEAR_SEARCH_EMAIL_DATA;
};

export type SearchEmailActions =
    | RequestSearchEmailAction
    | DidSearchEmailFailAction
    | DidSearchEmailSucceedAction
    | ClearSearchEmailDataAction;

export const requestSearchEmailAction = (
    email: string,
    navigation: SignUpStackNavigationProps<'Email'>['navigation'],
    initiateIdWallSdk: () => void,
    accountFlux: 'demo' | 'completed'
): RequestSearchEmailAction => ({
    type: 'REQUEST_SEARCH_EMAIL',
    email,
    navigation,
    initiateIdWallSdk,
    accountFlux
});

export const didSearchEmailFailAction = (): DidSearchEmailFailAction => ({
    type: 'SEARCH_EMAIL_FAILURE'
});

export const didSearchEmailSucceedAction = (): DidSearchEmailSucceedAction => ({
    type: 'SEARCH_EMAIL_SUCCESS'
});

export const clearSearchEmailDataAction = (): ClearSearchEmailDataAction => ({
    type: 'CLEAR_SEARCH_EMAIL_DATA'
});
