export const REQUEST_DEPOSIT = 'REQUEST_DEPOSIT';
export const DEPOSIT_FAILURE = 'DEPOSIT_FAILURE';
export const DEPOSIT_SUCCESS = 'DEPOSIT_SUCCESS';
export const CHANGE_DEPOSIT_AMOUNT = 'CHANGE_DEPOSIT_AMOUNT';
export const CLEAR_DEPOSIT_STATE = 'CLEAR_DEPOSIT_STATE';
export const CHANGE_METHOD = 'CHANGE_METHOD';
export const CHANGE_TED_ACCOUNT = 'CHANGE_TED_ACCOUNT';

export interface IDepositPayload {
    // transactionType: "Boleto",
    // bank: "341",
    // accountingMethod: "DEF",
    // shopperStatement: "TESTE",
    // accountId: string,
    // amount: string,
    // currency: "BRL",
    // logradouro: string,
    // numero: string,
    // complemento: string,
    // bairro: string,
    // cidade: string,
    // estado: string,
    // cep: string,
    // pais: string,
    // mediatorFee: number,
    // totalAmount: string,
    amount: string;
}

export interface IDepositTedAccount {
    icon: 'banco-do-brasil' | 'santander' | 'itau' | 'bradesco' | 'caixa';
    name: string;
    branch: string;
    account: string;
}

export interface IDepositData {
    transactionId: string;
    externalIdentifier: string;
    boletoUrl: string;
    typeableLine: string;
    financialStatement: {
        status: string;
    };
    dueDate: string;
}

export interface IDepositState {
    isLoading: boolean;
    error: boolean;
    payload: IDepositPayload;
    data: IDepositData;
    method: 'billet' | 'transfer';
    tedAccount: IDepositTedAccount | null;
}
