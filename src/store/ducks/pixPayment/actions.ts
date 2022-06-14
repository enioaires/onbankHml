import { PixPaymentsStackNavigationProps } from '../../../routes/Logged/types';
import {
    CHANGE_PIXPAYMENT_PAYLOAD,
    CLEAR_PIXPAYMENT_STATE,
    GET_PRE_PIXPAYMENT_DATA,
    GET_PRE_PIXPAYMENT_DATA_SUCCED,
    GET_PRE_PIXPAYMENT_DATA_FAIL,
    GET_PIXPAYMENT_DATA,
    GET_PIXPAYMENT_DATA_SUCCED,
    GET_PIXPAYMENT_DATA_FAIL,
    REQUEST_PIXPAYMENT,
    REQUEST_PIXPAYMENT_FAIL,
    REQUEST_PIXPAYMENT_SUCCED
} from './types';

type ChangePixPaymentPayloadAction = {
    type: typeof CHANGE_PIXPAYMENT_PAYLOAD;
    payload: any;
};

type ClearPixPaymentStateAction = {
    type: typeof CLEAR_PIXPAYMENT_STATE;
};

type DidPixPaymentDataSucceedAction = {
    type: typeof GET_PIXPAYMENT_DATA_SUCCED;
    payload: {
        recebedor: {
            nome: string;
            cpf: string | null;
            cnpj: string | null;
        };
        transferenciaId?: string;
    };
};

type DidPixPaymentDataFailAction = {
    type: typeof GET_PIXPAYMENT_DATA_FAIL;
    payload: {
        message: string;
    };
};

export type RequestPixPaymentAction = {
    type: typeof REQUEST_PIXPAYMENT;
    navigation: PixPaymentsStackNavigationProps<'Confirmation'>['navigation'];
    password?: string;
};

type DidRequestPixPaymentSuccedAction = {
    type: typeof REQUEST_PIXPAYMENT_SUCCED;
    payload: {
        status: string;
    };
};

type DidRequestPixPaymentFailAction = {
    type: typeof REQUEST_PIXPAYMENT_FAIL;
    payload: {
        message: string;
    };
};

export type GetPixPaymentDataAction = {
    type: typeof GET_PIXPAYMENT_DATA;
    navigation: PixPaymentsStackNavigationProps<'Amount'>['navigation'];
    route: PixPaymentsStackNavigationProps<'Amount'>['route'];
};

export type GetPrePixPaymentDataAction = {
    type: typeof GET_PRE_PIXPAYMENT_DATA;
    navigation: PixPaymentsStackNavigationProps<'Value'>['navigation'];
};

type DidPrePixPaymentDataSucceedAction = {
    type: typeof GET_PRE_PIXPAYMENT_DATA_SUCCED;
    payload: {
        recebedor: {
            nome: string;
            cpf: string | null;
            cnpj: string | null;
        };
        status: string;
    };
};

type DidPrePixPaymentDataFailAction = {
    type: typeof GET_PRE_PIXPAYMENT_DATA_FAIL;
    payload: {
        message: string;
    };
};

export type PixPaymentActions =
    | ChangePixPaymentPayloadAction
    | ClearPixPaymentStateAction
    | GetPixPaymentDataAction
    | DidPixPaymentDataSucceedAction
    | DidPixPaymentDataFailAction
    | RequestPixPaymentAction
    | DidRequestPixPaymentSuccedAction
    | DidRequestPixPaymentFailAction
    | GetPrePixPaymentDataAction
    | DidPrePixPaymentDataSucceedAction
    | DidPrePixPaymentDataFailAction;

export const changePixPaymentPayloadAction = (
    payload: any
): ChangePixPaymentPayloadAction => ({
    type: 'CHANGE_PIXPAYMENT_PAYLOAD',
    payload
});

export const clearPixPaymentStateAction = (): ClearPixPaymentStateAction => ({
    type: 'CLEAR_PIXPAYMENT_STATE'
});

export const getPrePixPaymentDataAction = (
    navigation: PixPaymentsStackNavigationProps<'Value'>['navigation']
): GetPrePixPaymentDataAction => ({
    type: 'GET_PRE_PIXPAYMENT_DATA',
    navigation
});

export const didPrePixPaymentDataSucceedAction = (payload: {
    recebedor: {
        nome: string;
        cpf: string | null;
        cnpj: string | null;
    };
    status: string;
}): DidPrePixPaymentDataSucceedAction => ({
    type: 'GET_PRE_PIXPAYMENT_DATA_SUCCED',
    payload
});

export const didPrePixPaymentDataFailAction = (payload: {
    message: string;
}): DidPrePixPaymentDataFailAction => ({
    type: 'GET_PRE_PIXPAYMENT_DATA_FAIL',
    payload
});

export const getPixPaymentDataAction = (
    navigation: PixPaymentsStackNavigationProps<'Amount'>['navigation'],
    route: PixPaymentsStackNavigationProps<'Amount'>['route']
): GetPixPaymentDataAction => ({
    type: GET_PIXPAYMENT_DATA,
    navigation,
    route
});

export const didPixPaymentDataSucceedAction = (payload: {
    recebedor: {
        nome: string;
        cpf: string | null;
        cnpj: string | null;
    };
}): DidPixPaymentDataSucceedAction => ({
    type: 'GET_PIXPAYMENT_DATA_SUCCED',
    payload
});

export const didPixPaymentDataFailAction = (payload: {
    message: string;
}): DidPixPaymentDataFailAction => ({
    type: 'GET_PIXPAYMENT_DATA_FAIL',
    payload
});

export const requestPixPaymentAction = (
    navigation: PixPaymentsStackNavigationProps<'Confirmation'>['navigation'],
    password?: string
): RequestPixPaymentAction => ({
    type: 'REQUEST_PIXPAYMENT',
    navigation,
    password
});

export const didRequestPixPaymentSuccedAction = (payload: {
    status: string;
}): DidRequestPixPaymentSuccedAction => ({
    type: 'REQUEST_PIXPAYMENT_SUCCED',
    payload
});

export const didRequestPixPaymentFailAction = (payload: {
    message: string;
}): DidRequestPixPaymentFailAction => ({
    type: 'REQUEST_PIXPAYMENT_FAIL',
    payload
});
