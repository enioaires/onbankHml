import { PaymentsStackNavigationProps } from '../../../routes/Logged/types';
import {
    IQRCodePayload,
    IPaymentCreditCardPayload,
    IPaymentCreditCardInstallment,
    CHANGE_PAYMENT_PAYLOAD,
    CHANGE_PAYMENT_AMOUNT_PAYLOAD,
    CHANGE_QRCODE_PAYLOAD,
    CLEAR_PAYMENT_PAYLOAD,
    SELECT_CREDIT_CARD,
    CLEAR_CREDIT_CARD,
    GET_INSTALLMENTS,
    GET_INSTALLMENTS_SUCCESS,
    GET_INSTALLMENTS_FAILURE,
    SET_INSTALLMENT_AMOUNT,
    REQUEST_PAYMENT,
    REQUEST_QRCODE_PAYMENT,
    PAYMENT_FAILURE,
    PAYMENT_SUCCESS
} from './types';

type ChangePaymentPayloadAction = {
    type: typeof CHANGE_PAYMENT_PAYLOAD;
    payload: any;
};

type ChangePaymentAmountPayloadAction = {
    type: typeof CHANGE_PAYMENT_AMOUNT_PAYLOAD;
    amount: string;
};

type ClearPaymentPayloadAction = {
    type: typeof CLEAR_PAYMENT_PAYLOAD;
};

export type RequestPaymentAction = {
    type: typeof REQUEST_PAYMENT;
    navigation:
        | PaymentsStackNavigationProps<'CreditInstallments'>['navigation']
        | PaymentsStackNavigationProps<'Payment'>['navigation'];
    password?: string;
};

export type RequestQRCodePaymentAction = {
    type: typeof REQUEST_QRCODE_PAYMENT;
    navigation: PaymentsStackNavigationProps<'QRCodeConfirmation'>['navigation'];
    password?: string;
};

type DidPaymentFailAction = {
    type: typeof PAYMENT_FAILURE;
};

type DidPaymentSucceedAction = {
    type: typeof PAYMENT_SUCCESS;
};

type ChangeQRCodePaymentPayloadAction = {
    type: typeof CHANGE_QRCODE_PAYLOAD;
    payload: IQRCodePayload;
};

type SelectPaymentCreditCardAction = {
    type: typeof SELECT_CREDIT_CARD;
    card: IPaymentCreditCardPayload;
};

type ClearPaymentCreditCardAction = {
    type: typeof CLEAR_CREDIT_CARD;
};

export type GetCreditCardInstallmentsAction = {
    type: typeof GET_INSTALLMENTS;
    navigation: any;
};

type DidGetCreditCardInstallmentsFailAction = {
    type: typeof GET_INSTALLMENTS_FAILURE;
};

type DidGetCreditCardInstallmentsSucceedAction = {
    type: typeof GET_INSTALLMENTS_SUCCESS;
    installments: IPaymentCreditCardInstallment[];
};

type SetCrediCardInstallmentAmountAction = {
    type: typeof SET_INSTALLMENT_AMOUNT;
    amount: number;
    installments: number;
    amountPerInstallments: string;
};

export type PaymentActions =
    | ChangePaymentPayloadAction
    | ClearPaymentPayloadAction
    | RequestPaymentAction
    | RequestQRCodePaymentAction
    | DidPaymentFailAction
    | DidPaymentSucceedAction
    | ChangeQRCodePaymentPayloadAction
    | SelectPaymentCreditCardAction
    | ClearPaymentCreditCardAction
    | GetCreditCardInstallmentsAction
    | DidGetCreditCardInstallmentsFailAction
    | DidGetCreditCardInstallmentsSucceedAction
    | SetCrediCardInstallmentAmountAction
    | ChangePaymentAmountPayloadAction;

export const changePaymentPayloadAction = (
    payload: any
): ChangePaymentPayloadAction => ({
    type: 'CHANGE_PAYMENT_PAYLOAD',
    payload
});

export const changePaymentAmountPayloadAction = (
    amount: string
): ChangePaymentAmountPayloadAction => ({
    type: 'CHANGE_PAYMENT_AMOUNT_PAYLOAD',
    amount
});

export const clearPaymentPayloadAction = (): ClearPaymentPayloadAction => ({
    type: 'CLEAR_PAYMENT_PAYLOAD'
});

export const requestPaymentAction = (
    navigation:
        | PaymentsStackNavigationProps<'CreditInstallments'>['navigation']
        | PaymentsStackNavigationProps<'Payment'>['navigation'],
    password?: string
): RequestPaymentAction => ({
    type: 'REQUEST_PAYMENT',
    navigation,
    password
});

export const requestQRCodePaymentAction = (
    navigation: PaymentsStackNavigationProps<'QRCodeConfirmation'>['navigation'],
    password?: string
): RequestQRCodePaymentAction => ({
    type: 'REQUEST_QRCODE_PAYMENT',
    navigation,
    password
});

export const didPaymentFailAction = (): DidPaymentFailAction => ({
    type: 'PAYMENT_FAILURE'
});

export const didPaymentSucceedAction = (): DidPaymentSucceedAction => ({
    type: 'PAYMENT_SUCCESS'
});

export const changeQRCodePaymentPayloadAction = (
    payload: IQRCodePayload
): ChangeQRCodePaymentPayloadAction => ({
    type: 'CHANGE_QRCODE_PAYLOAD',
    payload
});

export const selectPaymentCreditCardAction = (
    card: IPaymentCreditCardPayload
): SelectPaymentCreditCardAction => ({
    type: 'SELECT_CREDIT_CARD',
    card
});

export const clearPaymentCreditCardAction =
    (): ClearPaymentCreditCardAction => ({
        type: 'CLEAR_CREDIT_CARD'
    });

export const getCreditCardInstallmentsAction = (
    navigation: any
): GetCreditCardInstallmentsAction => ({
    type: 'GET_INSTALLMENTS',
    navigation
});

export const didGetCreditCardInstallmentsFailAction =
    (): DidGetCreditCardInstallmentsFailAction => ({
        type: 'GET_INSTALLMENTS_FAILURE'
    });

export const didGetCreditCardInstallmentsSucceedAction = (
    installments: IPaymentCreditCardInstallment[]
): DidGetCreditCardInstallmentsSucceedAction => ({
    type: 'GET_INSTALLMENTS_SUCCESS',
    installments
});

export const setCrediCardInstallmentAmountAction = (
    amount: number,
    installments: number,
    amountPerInstallments: string
): SetCrediCardInstallmentAmountAction => ({
    type: 'SET_INSTALLMENT_AMOUNT',
    amount,
    installments,
    amountPerInstallments
});
