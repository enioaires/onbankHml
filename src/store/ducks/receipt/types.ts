import { IStatementData } from '../statement/types';

export const STORE_RECEIPT = 'STORE_RECEIPT';
export const REMOVE_RECEIPT = 'REMOVE_RECEIPT';
export const STORE_VIEWSHOT_REF = 'STORE_VIEWSHOT_REF';
export const SHARE_VIEWSHOT = 'SHARE_VIEWSHOT';
export const GET_CREDIT_CARD_RECEIPT_DATA = 'GET_CREDIT_CARD_RECEIPT_DATA';
export const GET_RECEIPT_DATA = 'GET_RECEIPT_DATA';
export const GET_RECEIPT_DATA_DONE = 'GET_RECEIPT_DATA_DONE';

export interface IReceiptData {
    transactionCode: string;
    type:
        | 'transfer'
        | 'billet'
        | 'recharge'
        | 'qrcode'
        | 'qrcodeReceive'
        | 'cardDebit'
        | 'deposit/pix'
        | 'transfer/pix'
        | 'rechargeServices'
        | null;
    value: string;
    date: string;
    transferInfo?: {
        receiverName: string;
        receiverTaxId: string;
        receiverTaxIdFormatted?: string;
        receiverAccount: string;
        receiverBranch: string;
        receiverBankName: string;
        description?: string;
    };
    rechargeInfo?: {
        phoneNumber: string;
        operator: string;
    };
    paymentInfo?: {
        beneficiary: string;
        barcode: string;
        creditCard?: {
            cardNumber: string;
            cardType: string;
            installments: number;
            amountPerInstallment: string;
            taxAmount: string;
            billetAmount: string;
        };
    };
    qrCodeReceive?: {
        payerName: string;
        payerTaxId: string;
        payerAccount: string;
        description: string;
    };
    cardDebit?: {
        local: string;
    };
    pixDeposit?: {
        payerName: string;
        payerDocumentNumber: string;
        amount: string;
        e2eId: string;
        paymentDateTime: string;
    },
    pixTransfer?: {
        receiverName: string;
        receiverDocumentNumber: string;
        amount: string;
        e2eId: string;
        paymentDateTime: string;
    },
    rechargeServices?: {
        product: string;
        transactionId: string;
        amount: number;
        pin: string;
        signerCode?: string;
    }
}

export interface IReceiptState {
    receipt: IReceiptData | null;
    isLoading: IStatementData | null;
    viewshotRef: any;
}
