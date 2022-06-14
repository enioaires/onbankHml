import { Reducer } from 'redux';
import { IAddAddressState } from './types';
import { AddressActions } from './actions';

const INITIAL_STATE: IAddAddressState = {
    payload: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'BRA',
        complement: ''
    },
    inputsValidation: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        complement: ''
    },
    isLoading: false,
    error: false,
    previousZipcode: '',
    blockedInputs: []
};

const reducer: Reducer<IAddAddressState, AddressActions> = (
    state: IAddAddressState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_ADD_ADDRESS_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'VALIDATE_ADD_ADDRESS_PAYLOAD':
            return {
                ...state,
                inputsValidation: {
                    ...state.inputsValidation,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'CLEAR_ADD_ADDRESS_PAYLOAD':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'ADD_ADDRESS':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'REQUEST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                previousZipcode: action.previousZipcode,
                blockedInputs: action.blockedInputs
            };
        case 'GET_ADDRESS_BY_ZIPCODE':
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};

export default reducer;
