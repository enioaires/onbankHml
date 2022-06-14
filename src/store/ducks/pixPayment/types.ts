export const CHANGE_PIXPAYMENT_PAYLOAD = 'CHANGE_PIXPAYMENT_PAYLOAD';
export const CLEAR_PIXPAYMENT_STATE = 'CLEAR_PIXPAYMENT_STATE';
export const GET_PRE_PIXPAYMENT_DATA = 'GET_PRE_PIXPAYMENT_DATA';
export const GET_PIXPAYMENT_DATA = 'GET_PIXPAYMENT_DATA';
export const GET_PIXPAYMENT_DATA_SUCCED = 'GET_PIXPAYMENT_DATA_SUCCED';
export const GET_PIXPAYMENT_DATA_FAIL = 'GET_PIXPAYMENT_DATA_FAIL';
export const REQUEST_PIXPAYMENT = 'REQUEST_PIXPAYMENT';
export const REQUEST_PIXPAYMENT_SUCCED = 'REQUEST_PIXPAYMENT_SUCCED';
export const REQUEST_PIXPAYMENT_FAIL = 'REQUEST_PIXPAYMENT_FAIL';
export const GET_PRE_PIXPAYMENT_DATA_SUCCED = 'GET_PRE_PIXPAYMENT_DATA_SUCCED';
export const GET_PRE_PIXPAYMENT_DATA_FAIL = 'GET_PRE_PIXPAYMENT_DATA_FAIL';

export interface IPixPaymentPayload {
    valor: string;
    tipoChave: string;
    valorChave: string;
    recebedor: {
        nome: string;
        cpf: string | null;
        cnpj: string | null;
    };
    e2eId: string;
    status: string;
    transferenciaId: string;
    message: string;
};

export interface IPixPaymentState {
    payload: IPixPaymentPayload;
    isLoading: boolean;
    error: boolean;
};