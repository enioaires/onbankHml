export const AddressTypes = {
    CLEAR_ADDRESS_STATE: 'CLEAR_ADDRESS_STATE',
    GET_ADDRESS_BY_ZIPCODE: 'GET_ADDRESS_BY_ZIPCODE',
    GET_ADDRESS_BY_ZIPCODE_SUCCESS: 'GET_ADDRESS_BY_ZIPCODE_SUCCESS',
    GET_ADDRESS_BY_ZIPCODE_FAIL: 'GET_ADDRESS_BY_ZIPCODE_FAIL'
};

export interface IAddressPayload {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    complement: string;
}

export interface IAddressState {
    payload: IAddressPayload;
    isLoading: boolean;
    error: boolean;
    previousSearch: string;
    blockedInputs: string[];
}
