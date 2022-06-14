import { AddressTypes, IAddressPayload } from './types';

export const getAddressByZipcodeAction = (
    zipcode: string,
    feature: 'deposit' | 'perfil' | 'signUp' | 'wallet',
    navigation: any
) => ({
    type: AddressTypes.GET_ADDRESS_BY_ZIPCODE,
    zipcode,
    feature,
    navigation
});

export const clearAddressStateAction = () => ({
    type: AddressTypes.CLEAR_ADDRESS_STATE
});

export const didGetAddresByZipcodeFailAction = () => ({
    type: AddressTypes.GET_ADDRESS_BY_ZIPCODE_FAIL
});

export const didGetAddresByZipcodeSucceedAction = (
    previousSearch: string,
    blockedInputs: string[],
    address: IAddressPayload
) => ({
    type: AddressTypes.GET_ADDRESS_BY_ZIPCODE_SUCCESS,
    previousSearch,
    blockedInputs,
    address
});
