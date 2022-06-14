import { Platform } from 'react-native';
import { all, takeLatest, put, select, call, delay } from 'redux-saga/effects';
import * as Keychain from 'react-native-keychain';

// Api
import api from '../../../api';

// Types
import {
    UPDATE_ACCESS_PASSWORD,
    UPDATE_TRANSACTION_PASSWORD,
    VALIDATE_ACCESS_PASSWORD,
    VALIDATE_TRANSACTION_PASSWORD
} from './types';
import { IApplicationState } from '../../types';

// Actions
import {
    didUpdateFailAction,
    didUpdateSucceedAction,
    ValidateAccessPasswordAction,
    validateAccessPasswordSuccessAction,
    ValidateTransactionPasswordAction,
    validateTransactionPasswordFailAction,
    validateTransactionPasswordSuccessAction,
    UpdateAccessPasswordAction,
    UpdateTransactionPasswordAction,
    updatePasswordStartAction
} from './actions';

import { updateSmsTimeToWait } from '../phoneValidation/actions'; 

import { closeSMSModalAction } from '../phoneValidation/actions';

import { showSuccessModalAction } from '../successModal/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';
import { updateUserPhoneAction } from '../updateData/actions';
import { saveKeychainCredentialsAction } from '../auth/actions';

import password from '.';

const requestUpdateAccessPassword = (payload: any) => {
    return api.put(`/accessPassword`, payload);
};

const requestUpdateTransactionPassword = (payload: any) => {
    return api.put(`/key`, payload);
};

const requestValidateTransactionPassword = (payload: any) => {
    return api.post('/key/validate', payload);
};

const requestValidateAccessPassword = (payload: any) => {
    return api.post('/accessPassword/validate', payload);
};

function* updateAccess(action: UpdateAccessPasswordAction) {
    yield put(updatePasswordStartAction());
    const newAccessPassword: string = yield select(
        (state: IApplicationState) => state.password.newPassword
    );

    const callParameters = {
        isCustomParameterModal: true,
        returnErrorMessage: true,
        // returnDelayErrorMessage: false
        // beforeErrorAction: {
        //     isYieldFunction: true,
        //     actions: [closeSMSModalAction, didUpdateFailAction]
        // },
        // beforeErrorDelay: 650
    };

    const payload = {
        newAccessPassword,
        code: action.code
    }

    const resp: any = yield callWrapperService(requestUpdateAccessPassword,
        payload,
        callParameters
    );

    if (resp && !resp.error) {
        yield all([put(didUpdateSucceedAction()), put(closeSMSModalAction())]);
        // if (Platform.OS === 'ios') {
        if (action.navigation) {
            action.navigation.reset({
                index: 0,
                routes: [{ name: 'General' }]
            });
        }
        yield delay(1250);
        yield put(
            showSuccessModalAction('Senha de acesso alterada com sucesso.')
        );
        // } else {
        //     yield put(
        //         showSuccessModalAction('Senha de acesso alterada com sucesso.')
        //     );
        // }
    } else {
        if (resp?.customErrorParams?.waitingTimeMs) {
            yield put(
                updateSmsTimeToWait(resp?.customErrorParams?.waitingTimeMs)
            );
        }
        // && Platform.OS === 'ios'
        yield put(didUpdateFailAction(resp?.message ? resp.message : ''));
    }
}

function* updateTransaction(action: UpdateTransactionPasswordAction) {
    yield put(updatePasswordStartAction());
    const newTransactionPassword: string = yield select(
        (state: IApplicationState) => state.password.newPassword
    );
    const cardBiz: string = yield select(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    const callParameters = {
        isCustomParameterModal: true,
        returnErrorMessage: true,
        // returnDelayErrorMessage: Platform.OS !== 'ios'
        // beforeErrorAction: {
        //     isYieldFunction: true,
        //     actions: [closeSMSModalAction, didUpdateFailAction]
        // },
        // beforeErrorDelay: 650
    };

    const payload: {
        newTransactionPassword: string;
        code?: string | null | undefined;
    } = { newTransactionPassword };
    // if (!cardBiz)
    payload.code = action.code;

    const resp: any = yield callWrapperService(
        requestUpdateTransactionPassword,
        payload,
        callParameters
    );

    if (resp && !resp.error) {
        yield all([put(didUpdateSucceedAction()), put(closeSMSModalAction())]);
        if (action.navigation) {
            action.navigation.reset({
                index: 0,
                routes: [{ name: 'General' }]
            });
        }
        yield delay(1250);
        yield put(
            showSuccessModalAction(
                `Senha ${
                    cardBiz === 'ATIVADO' ? 'do cartão' : 'de transação'
                } alterada com sucesso.`
            )
        );
    } else {
        if (resp?.customErrorParams?.waitingTimeMs)
            yield put(
                updateSmsTimeToWait(resp?.customErrorParams?.waitingTimeMs)
            );
        yield put(didUpdateFailAction(resp?.message ? resp.message : ''));
    }
}

function* validateTransactionPassword(
    action: ValidateTransactionPasswordAction
) {
    let payload: any = {
        transactionPassword: action.password
    };

    if (action.url) {
        payload = {
            ...payload,
            url: action.url
        };
    }

    const resp: any = yield callWrapperService(
        requestValidateTransactionPassword,
        payload
    );

    // console.log('validate password', JSON.stringify(resp, null, 2));
    // console.log('validate payload', JSON.stringify(payload, null, 2));

    if (resp) {
        yield put(validateTransactionPasswordSuccessAction());
        action.callback(action.password);
    } else {
        yield put(validateTransactionPasswordFailAction());
        action.cancelButton(true);
    }
}

function* validateAccessPassword(action: ValidateAccessPasswordAction) {
    const documentNumber = yield select(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );

    const resp: any = yield callWrapperService(requestValidateAccessPassword, {
        accessPassword: action.password
    });

    // console.log('validate access', JSON.stringify(resp, null, 2));

    yield put(validateAccessPasswordSuccessAction());

    if (resp?.data) {
        if (action.updatePayload) {
            yield put(
                updateUserPhoneAction({
                    phoneNumber: action.updatePayload.phoneNumber.replace(
                        /\D/g,
                        ''
                    ),
                    code: action.updatePayload.code,
                    oldPhoneNumber: action.updatePayload.oldPhoneNumber
                })
            );
        } else if (action.isRegisterKeys) {
            yield call(
                Keychain.setGenericPassword(
                    documentNumber.replace(/\D/g, ''),
                    action.password,
                    { service: 'br.com.onbank.mobile-keychain' }
                )
            );

            yield put(
                saveKeychainCredentialsAction({
                    password: action.password,
                    username: documentNumber.replace(/\D/g, ''),
                    service: 'br.com.onbank.mobile-keychain',
                    storage: 'keychain'
                })
            );
            action.navigation.pop();
        } else {
            action.callback();
        }
    }
}

export default all([
    takeLatest(UPDATE_ACCESS_PASSWORD, updateAccess),
    takeLatest(UPDATE_TRANSACTION_PASSWORD, updateTransaction),
    takeLatest(VALIDATE_TRANSACTION_PASSWORD, validateTransactionPassword),
    takeLatest(VALIDATE_ACCESS_PASSWORD, validateAccessPassword)
]);
