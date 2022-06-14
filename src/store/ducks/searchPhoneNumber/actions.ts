import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import {
    REQUEST_SEARCH_PHONE_NUMBER,
    SEARCH_PHONE_NUMBER_FAILURE,
    SEARCH_PHONE_NUMBER_SUCCESS,
    CLEAR_SEARCH_DATA
} from './types';

export type RequestSearchPhoneNumberAction = {
    type: typeof REQUEST_SEARCH_PHONE_NUMBER;
    phoneNumber: string;
    navigation: SignUpStackNavigationProps<'Phone'>['navigation'];
    routeContext?: string;
};

type DidSearchPhoneNumberFailAction = {
    type: typeof SEARCH_PHONE_NUMBER_FAILURE;
};

type DidSearchPhoneNumberSucceedAction = {
    type: typeof SEARCH_PHONE_NUMBER_SUCCESS;
};

type ClearSearchPhoneNumberDataAction = {
    type: typeof CLEAR_SEARCH_DATA;
};

export type SearchPhoneNumberActions =
    | RequestSearchPhoneNumberAction
    | DidSearchPhoneNumberFailAction
    | DidSearchPhoneNumberSucceedAction
    | ClearSearchPhoneNumberDataAction;

export const requestSearchPhoneNumberAction = (
    phoneNumber: string,
    navigation: SignUpStackNavigationProps<'Phone'>['navigation'],
    routeContext?: string
): RequestSearchPhoneNumberAction => ({
    type: 'REQUEST_SEARCH_PHONE_NUMBER',
    phoneNumber,
    navigation,
    routeContext
});

export const didSearchPhoneNumberFailAction =
    (): DidSearchPhoneNumberFailAction => ({
        type: 'SEARCH_PHONE_NUMBER_FAILURE'
    });

export const didSearchPhoneNumberSucceedAction =
    (): DidSearchPhoneNumberSucceedAction => ({
        type: 'SEARCH_PHONE_NUMBER_SUCCESS'
    });

export const clearSearchPhoneNumberDataAction =
    (): ClearSearchPhoneNumberDataAction => ({
        type: 'CLEAR_SEARCH_DATA'
    });
