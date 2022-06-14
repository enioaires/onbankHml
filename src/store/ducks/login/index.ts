import { Reducer } from 'redux';

// State Type
import { ILoginState } from './types';

// Action Type
import { LoginActions } from './actions';

const INITIAL_STATE: ILoginState = {
    payload: {
        username: '',
        password: '',
        hwid: ''
    },
    validations: {
        username: '',
        password: ''
    },
    isLoading: false
};

const reducer: Reducer<ILoginState, LoginActions> = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'CHANGE_LOGIN_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    [action.key]: action.value
                }
            };
        case 'CHANGE_LOGIN_PAYLOAD_VALIDATIONS':
            return {
                ...state,
                validations: {
                    ...state.validations,
                    [action.key]: action.value
                }
            };
        case 'SUBMIT_LOGIN':
            return {
                ...state,
                isLoading: true
            };
        case 'SUBMIT_LOGIN_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case 'SUBMIT_LOGIN_FAILURE':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    password: ''
                },
                isLoading: false
            };
        case 'CLEAR_LOGIN_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};

export default reducer;
