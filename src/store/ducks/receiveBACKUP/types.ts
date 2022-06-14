export const REQUEST_RECEIVE = 'REQUEST_RECEIVEbackup';
export const RECEIVE_FAILURE = 'RECEIVE_FAILUREbackup';
export const RECEIVE_SUCCESS = 'RECEIVE_SUCCESSbackup';
export const CHANGE_RECEIVE_PAYLOAD = 'CHANGE_RECEIVE_PAYLOADbackup';
export const CLEAR_RECEIVE_STATE = 'CLEAR_RECEIVE_STATEbackup';

export interface IReceivePayload {
    amount: string;
    description: string;
}

export interface IReceiveData {
    url: string;
}

export interface IReceiveState {
    payload: IReceivePayload;
    isLoading: boolean;
    error: boolean;
    data: IReceiveData;
}
