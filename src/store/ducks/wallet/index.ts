import { Reducer } from 'redux';

// Types
import { IWalletState } from './types';
import { WalletAction } from './actions';

const INITIAL_STATE: IWalletState = {
    isLoading: false,
    error: false,
    data: [],
    cardInput: {
        nameOnCard: '',
        cardNumber: '',
        cvv: '',
        expirationDate: '',
        cpf: '',
        cnpj: '',
        cardAddress: {
            nickname: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        cardType: '',
        standard: false
    },
    cardInputErrors: {
        nameOnCard: '',
        cardNumber: '',
        cpf: '',
        cnpj: '',
        cvv: '',
        expirationDate: '',
        cardAddress: {
            nickname: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        }
    }
};

const reducer: Reducer<IWalletState, WalletAction> = (
    state: IWalletState = INITIAL_STATE,
    action
) => {
    let currentCards = [];
    let idx = -1;
    switch (action.type) {
        case 'GET_CARDS':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_CARDS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'GET_CARDS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false,
                data: action.data || []
            };
        case 'REMOVE_CARD':
            return {
                ...state,
                isLoading: true
            };
        case 'REMOVE_CARD_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'REMOVE_CARD_SUCCESS':
            currentCards = [...state.data];
            idx = state.data.findIndex((e) => e.id === action.deletedCardId);

            if (idx !== -1) {
                currentCards.splice(idx, 1);
            }

            return {
                ...state,
                isLoading: false,
                error: false,
                data: currentCards
            };
        case 'TURN_DEFAULT_CARD':
            return {
                ...state
            };
        case 'TURN_DEFAULT_CARD_FAILURE':
            return {
                ...state,
                error: true
            };
        case 'TURN_DEFAULT_CARD_SUCCESS':
            currentCards = [...state.data];
            idx = state.data.findIndex((e) => e.id === action.cardId);
            if (idx !== -1) {
                currentCards = currentCards.map((e) => ({
                    ...e,
                    standard: false
                }));
                currentCards[idx] = { ...currentCards[idx], standard: true };
            }
            return {
                ...state,
                error: false,
                data: currentCards
            };
        case 'CHANGE_CARD_INPUT_PAYLOAD':
            return {
                ...state,
                cardInput: {
                    ...state.cardInput,
                    [action.name]: action.value
                }
            };
        case 'CHANGE_CARD_INPUT_ADDRESS':
            return {
                ...state,
                cardInput: {
                    ...state.cardInput,
                    cardAddress: {
                        ...state.cardInput.cardAddress,
                        [action.name]: action.value
                    }
                }
            };
        case 'VALIDATE_CARD_INPUT_PAYLOAD':
            return {
                ...state,
                cardInputErrors: {
                    ...state.cardInputErrors,
                    [action.name]: action.value
                }
            };
        case 'VALIDATE_CARD_INPUT_ADDRESS':
            return {
                ...state,
                cardInputErrors: {
                    ...state.cardInputErrors,
                    cardAddress: {
                        ...state.cardInputErrors.cardAddress,
                        [action.name]: action.value
                    }
                }
            };
        case 'CLEAR_CARD_INPUT_ADDRESS_STATE':
            return {
                ...state,
                cardInputErrors: {
                    ...state.cardInputErrors,
                    cardAddress: {
                        ...INITIAL_STATE.cardInput.cardAddress
                    }
                }
            };
        case 'ADD_NEW_CARD':
            return {
                ...state,
                isLoading: true
            };
        case 'ADD_NEW_CARD_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'ADD_NEW_CARD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case 'CLEAR_CARD_INPUT_PAYLOAD_STATE':
            return {
                ...state,
                cardInput: {
                    ...INITIAL_STATE.cardInput
                }
            };
        default:
            return state;
    }
};

export default reducer;
