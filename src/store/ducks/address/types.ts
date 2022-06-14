export const ADD_ADDRESS = 'ADD_ADDRESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const CHANGE_ADD_ADDRESS_PAYLOAD = 'CHANGE_ADD_ADDRESS_PAYLOAD';
export const CLEAR_ADD_ADDRESS_PAYLOAD = 'CLEAR_ADD_ADDRESS_PAYLOAD';
export const VALIDATE_ADD_ADDRESS_PAYLOAD = 'VALIDATE_ADD_ADDRESS_PAYLOAD';
export const GET_ADDRESS_BY_ZIPCODE = 'GET_ADDRESS_BY_ZIPCODE';

export interface IAddAddressPayload {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    complement: string;
}

export interface IAddAddressState {
    payload: IAddAddressPayload;
    inputsValidation: IAddAddressPayload;
    isLoading: boolean;
    error: boolean;
    previousZipcode: string;
    blockedInputs: string[];
}
