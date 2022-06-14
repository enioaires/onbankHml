export const GET_DEPOSIT_BILLETS = 'GET_DEPOSIT_BILLETS';
export const GET_DEPOSIT_BILLETS_FAILURE = 'GET_DEPOSIT_BILLETS_FAILURE';
export const GET_DEPOSIT_BILLETS_SUCCESS = 'GET_DEPOSIT_BILLETS_SUCCESS';
export const CLEAR_DEPOSIT_BILLETS = 'CLEAR_DEPOSIT_BILLETS';
export const GET_CONDITION_BILLETS = 'GET_CONDITION_BILLETS';
export const GET_CONDITION_BILLETS_SUCCESS = 'GET_CONDITION_BILLETS_SUCCESS';
export const GET_CONDITION_BILLETS_FAILURE = 'GET_CONDITION_BILLETS_FAILURE';

export interface IDepositBilletsData {
    id: string;
    typeableLine: string;
    billetUrl: string;
    transactionId: string;
    externalIdentifier: string;
    issueDate: string;
    dueDate: string;
    amount: string;
    createDateTime: string;
    paid: boolean;
}

export interface IConditionBillet {
    depositsIssuedInActualMonth: number;
    isOverTheLimit: boolean;
};

export interface IDepositBilletsState {
    isLoading: boolean;
    error: boolean;
    data: null | IDepositBilletsData[];
    condition: IConditionBillet
}
