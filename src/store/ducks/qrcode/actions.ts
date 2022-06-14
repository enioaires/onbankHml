import { GET_QRCODE_DATA, GET_QRCODE_DATA_DONE } from './types';

export type GetQRCodeDataAction = {
    type: typeof GET_QRCODE_DATA;
    url: string;
    navigation: any;
};

type GetQRCodeDataDoneAction = {
    type: typeof GET_QRCODE_DATA_DONE;
};

export type QRCodeActions = GetQRCodeDataAction | GetQRCodeDataDoneAction;

export const getQRCodeDataAction = (
    url: string,
    navigation: any
): GetQRCodeDataAction => ({
    type: 'GET_QRCODE_DATA',
    url,
    navigation
});

export const getQRCodeDataDoneAction = (): GetQRCodeDataDoneAction => ({
    type: 'GET_QRCODE_DATA_DONE'
});
