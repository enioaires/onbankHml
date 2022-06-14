import { IStatementData } from '../statement/types';
import {
    IReceiptData,
    STORE_RECEIPT,
    REMOVE_RECEIPT,
    STORE_VIEWSHOT_REF,
    SHARE_VIEWSHOT,
    GET_CREDIT_CARD_RECEIPT_DATA,
    GET_RECEIPT_DATA,
    GET_RECEIPT_DATA_DONE
} from './types';

export type GetReceiptDataAction = {
    type: typeof GET_RECEIPT_DATA;
    navigation: any;
    item: IStatementData;
    receiptType: IReceiptData['type'];
};

export type GetCreditCardReceiptDataAction = {
    type: typeof GET_CREDIT_CARD_RECEIPT_DATA;
    navigation: any;
    item: IStatementData;
};

type GetReceiptDataDoneAction = {
    type: typeof GET_RECEIPT_DATA_DONE;
};

type StoreReceiptAction = {
    type: typeof STORE_RECEIPT;
    data: IReceiptData;
};

type RemoveReceiptAction = {
    type: typeof REMOVE_RECEIPT;
};

type StoreViewShotRefAction = {
    type: typeof STORE_VIEWSHOT_REF;
    ref: any;
};

type ShareViewShotAction = {
    type: typeof SHARE_VIEWSHOT;
};

export type ReceiptActions =
    | StoreReceiptAction
    | RemoveReceiptAction
    | StoreViewShotRefAction
    | ShareViewShotAction
    | GetCreditCardReceiptDataAction
    | GetReceiptDataAction
    | GetReceiptDataDoneAction;

export const getReceiptDataAction = (
    navigation: any,
    item: IStatementData,
    receiptType: IReceiptData['type']
): GetReceiptDataAction => ({
    type: 'GET_RECEIPT_DATA',
    navigation,
    item,
    receiptType
});

export const getCreditCardReceiptDataAction = (
    navigation: any,
    item: IStatementData
): GetCreditCardReceiptDataAction => ({
    type: 'GET_CREDIT_CARD_RECEIPT_DATA',
    navigation,
    item
});

export const getReceiptDataDoneAction = (): GetReceiptDataDoneAction => ({
    type: 'GET_RECEIPT_DATA_DONE'
});

export const storeReceiptAction = (data: IReceiptData): StoreReceiptAction => ({
    type: 'STORE_RECEIPT',
    data
});

export const removeReceiptAction = (): RemoveReceiptAction => ({
    type: 'REMOVE_RECEIPT'
});

export const storeViewShotRefAction = (ref: any): StoreViewShotRefAction => ({
    type: 'STORE_VIEWSHOT_REF',
    ref
});

export const shareViewShotAction = (): ShareViewShotAction => ({
    type: 'SHARE_VIEWSHOT'
});
