export const REQUEST_RECEIVE = 'REQUEST_RECEIVE';
export const RECEIVE_FAILURE = 'RECEIVE_FAILURE';
export const RECEIVE_SUCCESS = 'RECEIVE_SUCCESS';
export const CHANGE_RECEIVE_PAYLOAD = 'CHANGE_RECEIVE_PAYLOAD';
export const CLEAR_RECEIVE_STATE = 'CLEAR_RECEIVE_STATE';
export const REQUEST_PIXQRCODEDATA = 'REQUEST_PIXQRCODEDATA';
export const REQUEST_PIXQRCODEDATA_SUCCESS = 'REQUEST_PIXQRCODEDATA_SUCCESS';
export const REQUEST_PIXQRCODEDATA_FAILURE = 'REQUEST_PIXQRCODEDATA_FAILURE';

export interface IReceivePayload {
    amount: string;
}

export interface IReceiveData {
    url: string;
    emv: string;
}

export interface IPixQrCodeReceive {
    createDateTime: string;
    amount: string;
    paid: boolean;
    payerName: string | null;
    payerDocumentNumber: string | null;
    payerCompanyDocumentNumber: string | null;
}

export interface IReceiveState {
    payload: IReceivePayload;
    isLoading: boolean;
    error: boolean;
    data: IReceiveData;
    pixQrCodeReceiveData?: IPixQrCodeReceive[];
}
