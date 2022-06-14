import {
    ICardData,
    ICardInput,
    ICardAddressData,
    GET_CARDS,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAILURE,
    REMOVE_CARD,
    REMOVE_CARD_SUCCESS,
    REMOVE_CARD_FAILURE,
    TURN_DEFAULT_CARD,
    TURN_DEFAULT_CARD_SUCCESS,
    TURN_DEFAULT_CARD_FAILURE,
    CHANGE_CARD_INPUT_PAYLOAD,
    CHANGE_CARD_INPUT_ADDRESS,
    VALIDATE_CARD_INPUT_PAYLOAD,
    VALIDATE_CARD_INPUT_ADDRESS,
    CLEAR_CARD_INPUT_ADDRESS_STATE,
    CLEAR_CARD_INPUT_PAYLOAD_STATE,
    ADD_NEW_CARD,
    ADD_NEW_CARD_SUCCESS,
    ADD_NEW_CARD_FAILURE
} from './types';

type GetCardsAction = {
    type: typeof GET_CARDS;
};

type DidGetCardsFailAction = {
    type: typeof GET_CARDS_FAILURE;
};

type DidGetCardsSucceedAction = {
    type: typeof GET_CARDS_SUCCESS;
    data: ICardData[];
};

export type RemoveCardAction = {
    type: typeof REMOVE_CARD;
    cardId: string;
};

type DidRemoveCardFailAction = {
    type: typeof REMOVE_CARD_FAILURE;
};

type DidRemoveCardSucceedAction = {
    type: typeof REMOVE_CARD_SUCCESS;
    deletedCardId: string;
};

export type TurnDefaultCardAction = {
    type: typeof TURN_DEFAULT_CARD;
    cardId: string;
};

type DidTurnDefaultCardFailAction = {
    type: typeof TURN_DEFAULT_CARD_FAILURE;
};

type DidTurnDefaultCardSucceedAction = {
    type: typeof TURN_DEFAULT_CARD_SUCCESS;
    cardId: string;
};

export type ChangeCardInputPayloadAction = {
    type: typeof CHANGE_CARD_INPUT_PAYLOAD;
    name: keyof ICardInput;
    value: string;
};

type ChangeCardInputAddressPayloadAction = {
    type: typeof CHANGE_CARD_INPUT_ADDRESS;
    name: keyof ICardAddressData;
    value: string;
};

type ValidateCardInputPayloadAction = {
    type: typeof VALIDATE_CARD_INPUT_PAYLOAD;
    name: keyof ICardInput;
    value: string;
};

type ValidateCardInputAddressPayloadAction = {
    type: typeof VALIDATE_CARD_INPUT_ADDRESS;
    name: keyof ICardAddressData;
    value: string;
};

type ClearCardInputAddressStateAction = {
    type: typeof CLEAR_CARD_INPUT_ADDRESS_STATE;
};

export type AddNewCardAction = {
    type: typeof ADD_NEW_CARD;
    navigation: any;
    feature: null | 'Payment' | 'QRCodeConfirmation';
};

type DidAddNewCardFailAction = {
    type: typeof ADD_NEW_CARD_FAILURE;
};

type DidAddNewCardSucceedAction = {
    type: typeof ADD_NEW_CARD_SUCCESS;
};

type ClearCardInputPayload = {
    type: typeof CLEAR_CARD_INPUT_PAYLOAD_STATE;
};

export type WalletAction =
    | GetCardsAction
    | DidGetCardsFailAction
    | DidGetCardsSucceedAction
    | RemoveCardAction
    | DidRemoveCardFailAction
    | DidRemoveCardSucceedAction
    | TurnDefaultCardAction
    | DidTurnDefaultCardFailAction
    | DidTurnDefaultCardSucceedAction
    | ChangeCardInputPayloadAction
    | ChangeCardInputAddressPayloadAction
    | ValidateCardInputPayloadAction
    | ValidateCardInputAddressPayloadAction
    | ClearCardInputAddressStateAction
    | AddNewCardAction
    | DidAddNewCardFailAction
    | DidAddNewCardSucceedAction
    | ClearCardInputPayload;

export const getCardsAction = (): GetCardsAction => ({
    type: 'GET_CARDS'
});

export const didGetCardsFailAction = (): DidGetCardsFailAction => ({
    type: 'GET_CARDS_FAILURE'
});

export const didGetCardsSucceedAction = (
    data: ICardData[]
): DidGetCardsSucceedAction => ({
    type: 'GET_CARDS_SUCCESS',
    data
});

export const removeCardAction = (cardId: string): RemoveCardAction => ({
    type: 'REMOVE_CARD',
    cardId
});

export const didRemoveCardFailAction = (): DidRemoveCardFailAction => ({
    type: 'REMOVE_CARD_FAILURE'
});

export const didRemoveCardSucceedAction = (
    deletedCardId: string
): DidRemoveCardSucceedAction => ({
    type: 'REMOVE_CARD_SUCCESS',
    deletedCardId
});

export const turnDefaultCardAction = (
    cardId: string
): TurnDefaultCardAction => ({
    type: 'TURN_DEFAULT_CARD',
    cardId
});

export const didTurnDefaultCardFailAction = (): DidTurnDefaultCardFailAction => ({
    type: 'TURN_DEFAULT_CARD_FAILURE'
});

export const didTurnDefaultCardSucceedAction = (
    cardId: string
): DidTurnDefaultCardSucceedAction => ({
    type: 'TURN_DEFAULT_CARD_SUCCESS',
    cardId
});

export const changeCardInputPayloadAction = (
    name: keyof ICardInput,
    value: string
): ChangeCardInputPayloadAction => ({
    type: 'CHANGE_CARD_INPUT_PAYLOAD',
    name,
    value
});

export const changeCardInputAddressPayloadAction = (
    name: keyof ICardAddressData,
    value: string
): ChangeCardInputAddressPayloadAction => ({
    type: 'CHANGE_CARD_INPUT_ADDRESS',
    name,
    value
});

export const validateCardInputPayloadAction = (
    name: keyof ICardInput,
    value: string
): ValidateCardInputPayloadAction => ({
    type: 'VALIDATE_CARD_INPUT_PAYLOAD',
    name,
    value
});

export const validateCardInputAddressPayloadAction = (
    name: keyof ICardAddressData,
    value: string
): ValidateCardInputAddressPayloadAction => ({
    type: 'VALIDATE_CARD_INPUT_ADDRESS',
    name,
    value
});

export const clearCardInputAddressStateAction = (): ClearCardInputAddressStateAction => ({
    type: 'CLEAR_CARD_INPUT_ADDRESS_STATE'
});

export const addNewCardAction = (
    navigation: any,
    feature: null | 'Payment' | 'QRCodeConfirmation'
): AddNewCardAction => ({
    type: 'ADD_NEW_CARD',
    navigation,
    feature
});

export const didAddNewCardFailAction = (): DidAddNewCardFailAction => ({
    type: 'ADD_NEW_CARD_FAILURE'
});

export const didAddNewCardSucceedAction = (): DidAddNewCardSucceedAction => ({
    type: 'ADD_NEW_CARD_SUCCESS'
});

export const clearCardInputPayload = (): ClearCardInputPayload => ({
    type: 'CLEAR_CARD_INPUT_PAYLOAD_STATE'
});
