import { PerfilStackNavigationProps } from '../../../routes/Logged/types';
import {
    UPDATE_USER_DATA,
    UPDATE_USER_PHONE,
    UPDATE_FAILURE,
    UPDATE_SUCCESS
} from './types';

export type UpdateUserDataAction = {
    type: typeof UPDATE_USER_DATA;
    payload: any;
    navigation?: PerfilStackNavigationProps<'Address'>['navigation'];
    isCardRequest?: boolean;
};

export type UpdateUserPhoneAction = {
    type: typeof UPDATE_USER_PHONE;
    payload: any;
};

type DidUpdateUserDataFailAction = {
    type: typeof UPDATE_FAILURE;
};

type DidUpdateUserDataSucceedAction = {
    type: typeof UPDATE_SUCCESS;
};

export type UpdateDataAction =
    | UpdateUserDataAction
    | UpdateUserPhoneAction
    | DidUpdateUserDataFailAction
    | DidUpdateUserDataSucceedAction;

export const updateUserDataAction = (
    payload: any,
    navigation?: PerfilStackNavigationProps<'Address'>['navigation'],
    isCardRequest?: boolean
): UpdateUserDataAction => ({
    type: 'UPDATE_USER_DATA',
    payload,
    navigation,
    isCardRequest
});

export const updateUserPhoneAction = (payload: any): UpdateUserPhoneAction => ({
    type: 'UPDATE_USER_PHONE',
    payload
});

export const didUpdateUserDataFailAction = (): DidUpdateUserDataFailAction => ({
    type: 'UPDATE_FAILURE'
});

export const didUpdateUserDataSucceedAction = (): DidUpdateUserDataSucceedAction => ({
    type: 'UPDATE_SUCCESS'
});
