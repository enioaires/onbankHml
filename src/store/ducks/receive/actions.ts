import { ReceiveStackNavigationProps } from '../../../routes/Logged/types';
import {
    REQUEST_RECEIVE,
    RECEIVE_FAILURE,
    RECEIVE_SUCCESS,
    CHANGE_RECEIVE_PAYLOAD,
    CLEAR_RECEIVE_STATE,
    REQUEST_PIXQRCODEDATA,
    REQUEST_PIXQRCODEDATA_FAILURE,
    REQUEST_PIXQRCODEDATA_SUCCESS,
    IPixQrCodeReceive
} from './types';

export type RequestReceiveAction = {
    type: typeof REQUEST_RECEIVE;
    navigation: ReceiveStackNavigationProps<'Value'>['navigation'];
};

type ChangeReceivePayloadAction = {
    type: typeof CHANGE_RECEIVE_PAYLOAD;
    payload: {
        amount?: string;
        description?: string;
    };
};

type DidReceiveFailAction = {
    type: typeof RECEIVE_FAILURE;
};

type DidReceiveSucceedAction = {
    type: typeof RECEIVE_SUCCESS;
    payload: {
        linkQrCode: string;
        emv: string;
    };
};

type RequestPixQrCodeDataAction = {
    type: typeof REQUEST_PIXQRCODEDATA;
};

type DidPixQrCodeDataSucessAction = {
    type: typeof REQUEST_PIXQRCODEDATA_SUCCESS;
    payload: IPixQrCodeReceive[];
};

type DidPixQrCodeDataFailureAction = {
    type: typeof REQUEST_PIXQRCODEDATA_FAILURE;
}

type ClearReceiveStateAction = {
    type: typeof CLEAR_RECEIVE_STATE;
};

export type ReceiveActions =
    | RequestReceiveAction
    | ChangeReceivePayloadAction
    | DidReceiveFailAction
    | DidReceiveSucceedAction
    | ClearReceiveStateAction
    | RequestPixQrCodeDataAction
    | DidPixQrCodeDataFailureAction
    | DidPixQrCodeDataSucessAction;

export const requestReceiveAction = (
    navigation: ReceiveStackNavigationProps<'Value'>['navigation']
): RequestReceiveAction => ({
    type: 'REQUEST_RECEIVE',
    navigation
});

export const changeReceivePayloadAction = (payload: {
    amount?: string;
    description?: string;
}): ChangeReceivePayloadAction => ({
    type: 'CHANGE_RECEIVE_PAYLOAD',
    payload
});

export const didReceiveFailAction = (): DidReceiveFailAction => ({
    type: 'RECEIVE_FAILURE'
});

export const didReceiveSucceedAction = (payload: {
        linkQrCode: string;
        emv: string;
}): DidReceiveSucceedAction => ({
    type: 'RECEIVE_SUCCESS',
    payload
});

export const requestPixQrCodeDataAction = (): RequestPixQrCodeDataAction => ({
    type: 'REQUEST_PIXQRCODEDATA'
});

export const didPixQrCodeDataSucessAction = (
    payload: IPixQrCodeReceive[] 
): DidPixQrCodeDataSucessAction => ({
    type: 'REQUEST_PIXQRCODEDATA_SUCCESS',
    payload
});

export const didPixQrCodeDataFailureAction = (): DidPixQrCodeDataFailureAction => ({
    type: 'REQUEST_PIXQRCODEDATA_FAILURE'
});

export const clearReceiveStateAction = (): ClearReceiveStateAction => ({
    type: 'CLEAR_RECEIVE_STATE'
});
