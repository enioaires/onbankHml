export const CHANGE_PAYMENT_PAYLOAD = 'CHANGE_PAYMENT_PAYLOAD';
export const CHANGE_PAYMENT_AMOUNT_PAYLOAD = 'CHANGE_PAYMENT_AMOUNT_PAYLOAD';
export const CHANGE_QRCODE_PAYLOAD = 'CHANGE_QRCODE_PAYLOAD';
export const CLEAR_PAYMENT_PAYLOAD = 'CLEAR_PAYMENT_PAYLOAD';
export const SELECT_CREDIT_CARD = 'SELECT_CREDIT_CARD';
export const CLEAR_CREDIT_CARD = 'CLEAR_CREDIT_CARD';
export const GET_INSTALLMENTS = 'GET_INSTALLMENTS';
export const GET_INSTALLMENTS_SUCCESS = 'GET_INSTALLMENTS_SUCCESS';
export const GET_INSTALLMENTS_FAILURE = 'GET_INSTALLMENTS_FAILURE';
export const SET_INSTALLMENT_AMOUNT = 'SET_INSTALLMENT_AMOUNT';
export const REQUEST_PAYMENT = 'REQUEST_PAYMENT';
export const REQUEST_QRCODE_PAYMENT = 'REQUEST_QRCODE_PAYMENT';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';

export interface IPaymentCreditCardInstallment {
    totalAmount: number;
    label: string;
}

export interface IPaymentCreditCardPayload {
    cardNumber?: string;
    nameOnCard?: string;
    expirationMonth?: string;
    expirationYear?: string;
    cvv?: string;
    cardType?: string;
    holderData?: {
        taxId: string;
        country: 'BRA';
    };
    currency?: 'BRL';
    installments?: number;
    amount?: number;
    amountPerInstallments?: string;
}

export interface IPaymentPayload {
    unmatchingValueAuthCode: string;
    drawee?: {
        name?: string;
        taxIdentifier?: {
            taxId?: string;
        };
    };
    beneficiary?: {
        name?: string;
        taxIdentifier?: {
            taxId?: string;
        };
    };
    paymentDetails: {
        barcode: string;
        dueDate?: string;
        interest: number;
        fine: number;
        discount: number;
        totalAmount?: number;
        minimumAmount: number;
        maximumAmount: number;
        consolidatedAmount?: number;
        typeableLine: string;
        documentType: string;
    } | null;
    settings: {
        startTime: string;
        endTime: string;
        timezone: string;
    };
}

export interface IQRCodePayload {
    account: string;
    branch: string;
    description: string;
    name: string;
    phoneNumber: string;
    taxId: string;
    amount: string;
}

export interface IPaymentState {
    payload: IPaymentPayload;
    creditCardData: IPaymentCreditCardPayload | null;
    creditCardInstallments: IPaymentCreditCardInstallment[];
    qrCodePayload: IQRCodePayload | null;
    isLoading: boolean;
    error: boolean;
}
