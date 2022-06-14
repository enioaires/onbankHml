import { AddAddressStackNavigationProps } from '../../../routes/Logged/types';

import {
    ADD_ADDRESS,
    REQUEST_FAILURE,
    REQUEST_SUCCESS,
    CHANGE_ADD_ADDRESS_PAYLOAD,
    CLEAR_ADD_ADDRESS_PAYLOAD,
    VALIDATE_ADD_ADDRESS_PAYLOAD,
    GET_ADDRESS_BY_ZIPCODE,
    IAddAddressPayload
} from './types';

export type AddAddressAction = {
    type: typeof ADD_ADDRESS;
    navigation: AddAddressStackNavigationProps<'Address'>['navigation'];
};

export type GetAddressByZipcodeAction = {
    type: typeof GET_ADDRESS_BY_ZIPCODE;
    navigation: AddAddressStackNavigationProps<'Zipcode'>['navigation'];
};

export type ChangeAddAddressPayloadAction = {
    type: typeof CHANGE_ADD_ADDRESS_PAYLOAD;
    payload: {
        key: keyof IAddAddressPayload;
        value: string;
    };
};

type ValidateAddAddressPayloadAction = {
    type: typeof VALIDATE_ADD_ADDRESS_PAYLOAD;
    payload: any;
};

type ClearAddAddressPayloadAction = {
    type: typeof CLEAR_ADD_ADDRESS_PAYLOAD;
};

type DidRequestAddAddressFailAction = {
    type: typeof REQUEST_FAILURE;
};

type DidRequestAddAddressSucceedAction = {
    type: typeof REQUEST_SUCCESS;
    previousZipcode: string;
    blockedInputs: string[];
};

export type AddressActions =
    | AddAddressAction
    | GetAddressByZipcodeAction
    | ChangeAddAddressPayloadAction
    | ValidateAddAddressPayloadAction
    | ClearAddAddressPayloadAction
    | DidRequestAddAddressFailAction
    | DidRequestAddAddressSucceedAction;

export const requestAddAddressAction = (
    navigation: AddAddressStackNavigationProps<'Address'>['navigation']
): AddAddressAction => ({
    type: 'ADD_ADDRESS',
    navigation
});

export const getAddressByZipcodeAction = (
    navigation: AddAddressStackNavigationProps<'Zipcode'>['navigation']
): GetAddressByZipcodeAction => ({
    type: 'GET_ADDRESS_BY_ZIPCODE',
    navigation
});

export const changeAddAddressPayloadAction = (payload: {
    key: keyof IAddAddressPayload;
    value: string;
}): ChangeAddAddressPayloadAction => ({
    type: 'CHANGE_ADD_ADDRESS_PAYLOAD',
    payload
});

export const validateAddAddressPayloadAction = (
    payload: any
): ValidateAddAddressPayloadAction => ({
    type: 'VALIDATE_ADD_ADDRESS_PAYLOAD',
    payload
});

export const clearAddAddressPayloadAction = (): ClearAddAddressPayloadAction => ({
    type: 'CLEAR_ADD_ADDRESS_PAYLOAD'
});

export const didRequestAddAddressFailAction = (): DidRequestAddAddressFailAction => ({
    type: 'REQUEST_FAILURE'
});

export const didRequestAddAddressSucceedAction = (
    previousZipcode: string,
    blockedInputs: string[]
): DidRequestAddAddressSucceedAction => ({
    type: 'REQUEST_SUCCESS',
    previousZipcode,
    blockedInputs
});
