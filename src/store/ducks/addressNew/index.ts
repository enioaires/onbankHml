import { Reducer } from 'redux';

import { IAddressState, AddressTypes } from './types';

const INITIAL_STATE: IAddressState = {
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
    isLoading: false,
    error: false,
    previousSearch: '',
    blockedInputs: []
};

const reducer: Reducer<IAddressState> = (
    state = INITIAL_STATE,
    action: any
) => {
    switch (action.type) {
        case AddressTypes.CLEAR_ADDRESS_STATE:
            return {
                ...state,
                ...INITIAL_STATE
            };
        case AddressTypes.GET_ADDRESS_BY_ZIPCODE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case AddressTypes.GET_ADDRESS_BY_ZIPCODE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                previousSearch: action.previousSearch,
                blockedInputs: action.blockedInputs,
                payload: {
                    ...state.payload,
                    ...action.address
                }
            };
        case AddressTypes.GET_ADDRESS_BY_ZIPCODE:
            return {
                ...state,
                error: false,
                isLoading: true
            };
        default:
            return state;
    }
};

export default reducer;
