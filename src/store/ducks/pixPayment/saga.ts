import { all, takeLatest, put, select } from 'redux-saga/effects';
import dateFns from 'date-fns';

// Api
import api from '../../../api';

// Actions
import {
    changePixPaymentPayloadAction,
    clearPixPaymentStateAction,
    GetPrePixPaymentDataAction,
    didPrePixPaymentDataFailAction,
    didPrePixPaymentDataSucceedAction,
    GetPixPaymentDataAction,
    didPixPaymentDataSucceedAction,
    didPixPaymentDataFailAction,
    RequestPixPaymentAction,
    didRequestPixPaymentFailAction,
    didRequestPixPaymentSuccedAction
} from './actions';

import { requestBalanceAction } from '../../ducks/balance/actions';
import { setAlertMessageAction } from '../alert/actions';
import { getStatementDataAction } from '../../ducks/statement/actions';

// Utils
import { transformToCurrencyPayload } from '../../../utils/helpers';
import callWrapperService from '../../../utils/callWrapperService';

// Types
import { IApplicationState } from '../../types';
import {
    IPixPaymentPayload,
    GET_PIXPAYMENT_DATA,
    REQUEST_PIXPAYMENT,
    GET_PRE_PIXPAYMENT_DATA
} from './types';

const requestPixPaymentData = (payload: any) => {
    return api.post('/pix/bankly/transfer', payload);
};

const requestPixPaymentConfirmation = (payload: any) => {
    return api.post('pix/bankly/confirm', payload);
};

// Pre confirm Pix destinatary function
function* getPrePixPaymentData(action: GetPrePixPaymentDataAction) {
    const tipoChave: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.tipoChave
    );
    const valorChave: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.valorChave
    );

    const payload = {
        valor: '0.00',
        chave: {
            tipoChave: tipoChave,
            valor:
                tipoChave === 'Phone'
                    ? `+55${valorChave.replace(/\D/g, '')}`
                    : tipoChave === 'Cpf' || tipoChave === 'Cnpj'
                    ? valorChave.replace(/\D/g, '')
                    : valorChave
        }
    };

    // console.log('payload Final', payload)

    const resp = yield callWrapperService(requestPixPaymentData, payload);

    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data.recebedor) {
        yield put(
            didPrePixPaymentDataSucceedAction({
                recebedor: {
                    nome: resp?.data.recebedor.nome,
                    cpf: resp?.data.recebedor.cpf,
                    cnpj: resp?.data.recebedor.cnpj
                },
                status: 'PRE_PIXPAYMENTDATA'
            })
        );
    } else {
        yield put(
            didPrePixPaymentDataFailAction({
                message: resp?.data?.message ? resp?.data.message : ''
            })
        );
        if (!resp?.data.message && resp?.data) {
            yield put(
                setAlertMessageAction({
                    title: 'Oops',
                    message:
                        'Algo de errado aconteceu\ntente novamente mais tarde',
                    type: 'error',
                    action: {
                        onPress: () => {
                            action.navigation.reset({
                                index: 0,
                                routes: [{ name: 'General' }]
                            });
                        },
                        mainLabel: 'Ok'
                    }
                })
            );
        }
    }
}

function* getPixPaymentData(action: GetPixPaymentDataAction) {
    const valor: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.valor
    );
    const tipoChave: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.tipoChave
    );
    const valorChave: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.valorChave
    );

    const payload = {
        valor: transformToCurrencyPayload(valor),
        chave: {
            tipoChave: tipoChave,
            valor:
                tipoChave === 'Phone'
                    ? `+55${valorChave.replace(/\D/g, '')}`
                    : tipoChave === 'Cpf' || tipoChave === 'Cnpj'
                    ? valorChave.replace(/\D/g, '')
                    : valorChave
        }
    };

    // console.log('payload Final', payload)

    const resp = yield callWrapperService(requestPixPaymentData, payload);

    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data?.recebedor) {
        yield put(
            didPixPaymentDataSucceedAction({
                recebedor: {
                    nome: resp?.data.recebedor.nome,
                    cpf: resp?.data.recebedor.cpf,
                    cnpj: resp?.data.recebedor.cnpj
                }
            })
        );
        action.navigation.pop();
        action.navigation.replace('PixPayment', { screen: 'Confirmation' });
    } else {
        yield put(
            didPixPaymentDataFailAction({
                message: resp?.data?.message ? resp?.data.message : ''
            })
        );

        if (resp?.data.message) {
            action.navigation.goBack();
        }

        if (!resp?.data.message && resp?.data) {
            yield put(
                setAlertMessageAction({
                    title: 'Oops',
                    message:
                        'Algo de errado aconteceu\ntente novamente mais tarde',
                    type: 'error',
                    action: {
                        onPress: () => {
                            action.navigation.reset({
                                index: 0,
                                routes: [{ name: 'General' }]
                            });
                        },
                        mainLabel: 'Ok'
                    }
                })
            );
        }
    }
}

const formattedKeyValue = (keyType: string, keyValue: string) => {
    const formattedByKey: { [key: string]: string } = {
        Phone: `+55${keyValue.replace(/\D/g, '')}`,
        Cpf: keyValue.replace(/\D/g, ''),
        Cnpj: keyValue.replace(/\D/g, '')
    };
    return formattedByKey[keyType] || keyValue;
};
function* requestPixPayment(action: RequestPixPaymentAction) {
    const valor: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.valor
    );
    const tipoChave: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.tipoChave
    );
    const valorChave: string = yield select(
        (state: IApplicationState) => state.pixPayment.payload.valorChave
    );

    const payload = {
        transactionPassword: action.password,
        valor: transformToCurrencyPayload(valor),
        chave: {
            tipoChave,
            valor: formattedKeyValue(tipoChave, valorChave)
        }
    };

    const resp = yield callWrapperService(
        requestPixPaymentConfirmation,
        payload
    );

    if (resp?.data.recebedor) {
        yield all([put(requestBalanceAction()), put(getStatementDataAction())]);

        yield put(
            didRequestPixPaymentSuccedAction({
                status: resp?.data.status
            })
        );
        setTimeout(() => {
            action.navigation.replace('PixPayment', { screen: 'Confirmation' });
        }, 400);
    } else {
        yield put(
            didRequestPixPaymentFailAction(
                resp?.data[0].message
                    ? { message: resp?.data[0].message }
                    : { message: '' }
            )
        );
        if (resp?.data[0].message) {
            yield put(
                setAlertMessageAction({
                    title: 'Oops',
                    message: resp?.data[0].message,
                    type: 'error',
                    action: {
                        onPress: () => {
                            action.navigation.reset({
                                index: 0,
                                routes: [{ name: 'General' }]
                            });
                        },
                        mainLabel: 'Ok'
                    }
                })
            );
        }
    }
}

export default all([
    takeLatest(GET_PIXPAYMENT_DATA, getPixPaymentData),
    takeLatest(REQUEST_PIXPAYMENT, requestPixPayment),
    takeLatest(GET_PRE_PIXPAYMENT_DATA, getPrePixPaymentData)
]);
