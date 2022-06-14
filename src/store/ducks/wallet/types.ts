export const GET_CARDS = 'GET_CARDS';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAILURE = 'GET_CARDS_FAILURE';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS';
export const REMOVE_CARD_FAILURE = 'REMOVE_CARD_FAILURE';
export const TURN_DEFAULT_CARD = 'TURN_DEFAULT_CARD';
export const TURN_DEFAULT_CARD_SUCCESS = 'TURN_DEFAULT_CARD_SUCCESS';
export const TURN_DEFAULT_CARD_FAILURE = 'TURN_DEFAULT_CARD_FAILURE';
export const CHANGE_CARD_INPUT_PAYLOAD = 'CHANGE_CARD_INPUT_PAYLOAD';
export const CHANGE_CARD_INPUT_ADDRESS = 'CHANGE_CARD_INPUT_ADDRESS';
export const VALIDATE_CARD_INPUT_PAYLOAD = 'VALIDATE_CARD_INPUT_PAYLOAD';
export const VALIDATE_CARD_INPUT_ADDRESS = 'VALIDATE_CARD_INPUT_ADDRESS';
export const CLEAR_CARD_INPUT_ADDRESS_STATE = 'CLEAR_CARD_INPUT_ADDRESS_STATE';
export const CLEAR_CARD_INPUT_PAYLOAD_STATE = 'CLEAR_CARD_INPUT_PAYLOAD_STATE';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const ADD_NEW_CARD_SUCCESS = 'ADD_NEW_CARD_SUCCESS';
export const ADD_NEW_CARD_FAILURE = 'ADD_NEW_CARD_FAILURE';

export interface ICardData {
    id: string;
    cardNumber: string;
    nameOnCard: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
    cardType: string;
    cpf: string;
    cnpj: string;
    standard: boolean;
    cardAddress: ICardAddressData;
}

export interface ICardAddressData {
    nickname: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ICardInput {
    cardNumber: string;
    nameOnCard: string;
    expirationDate: string;
    cvv: string;
    cpf: string;
    cnpj: string;
    cardAddress: ICardAddressData;
    cardType: string;
    standard: boolean;
}

export interface IWalletState {
    isLoading: boolean;
    error: boolean;
    data: ICardData[];
    cardInput: ICardInput;
    cardInputErrors: {
        nameOnCard: string;
        cpf: string;
        cnpj: string;
        cvv: string;
        expirationDate: string;
        cardNumber: string;
        cardAddress: ICardAddressData;
    };
}
