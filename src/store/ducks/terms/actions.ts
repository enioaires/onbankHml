import { GeneralStackNavigationProps } from '../../../routes/Logged/types';
import {
    ACCEPT_NEW_TERMS,
    ACCEPT_NEW_TERMS_FAILURE,
    ACCEPT_NEW_TERMS_SUCCESS
} from './types';

export type AcceptNewTermsAction = {
    type: typeof ACCEPT_NEW_TERMS;
    navigation?: GeneralStackNavigationProps<'Terms'>['navigation'];
};

type DidAcceptNewTermsFailAction = {
    type: typeof ACCEPT_NEW_TERMS_FAILURE;
};

type DidAcceptNewTermsSucceedAction = {
    type: typeof ACCEPT_NEW_TERMS_SUCCESS;
};

export type TermsActions =
    | AcceptNewTermsAction
    | DidAcceptNewTermsFailAction
    | DidAcceptNewTermsSucceedAction;

export const acceptNewTermsAction = (
    navigation?: GeneralStackNavigationProps<'Terms'>['navigation']
): AcceptNewTermsAction => ({
    type: 'ACCEPT_NEW_TERMS',
    navigation
});

export const didAcceptNewTermsFailAction = (): DidAcceptNewTermsFailAction => ({
    type: 'ACCEPT_NEW_TERMS_FAILURE'
});

export const didAcceptNewTermsSucceedAction = (): DidAcceptNewTermsSucceedAction => ({
    type: 'ACCEPT_NEW_TERMS_SUCCESS'
});
