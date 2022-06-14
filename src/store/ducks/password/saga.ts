import { all, takeLatest, put, select, call } from 'redux-saga/effects';
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
    validateTransactionPasswordSuccessAction
} from './actions';
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

function* updateAccess() {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );
    const newAccessPassword: string = yield select(
        (state: IApplicationState) => state.password.newPassword
    );

    const resp: any = yield callWrapperService(requestUpdateAccessPassword, {
        accountId,
        newAccessPassword
    });

    // console.log('updateAccess', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didUpdateSucceedAction());
        yield put(
            showSuccessModalAction('Senha de acesso alterada com sucesso.')
        );
    } else {
        yield put(didUpdateFailAction());
    }
}

function* updateTransaction() {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const newTransactionPassword: string = yield select(
        (state: IApplicationState) => state.password.newPassword
    );
    const cardBiz: string = yield select(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    const resp: any = yield callWrapperService(
        requestUpdateTransactionPassword,
        { accountId, newTransactionPassword }
    );

    // console.log('updateTransaction', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didUpdateSucceedAction());
        yield put(
            showSuccessModalAction(
                `Senha ${
                    cardBiz === 'ATIVADO' ? 'do cartão' : 'de transação'
                } alterada com sucesso.`
            )
        );
    } else {
        yield put(didUpdateFailAction());
    }
}

function* validateTransactionPassword(
    action: ValidateTransactionPasswordAction
) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    let payload: any = {
        transactionPassword: action.password,
        accountId
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
        console.log('CALLBACK', action.password);
        action.callback(action.password);
    } else {
        yield put(validateTransactionPasswordFailAction());
        action.cancelButton(true);
    }
}

function* validateAccessPassword(action: ValidateAccessPasswordAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const documentNumber = yield select(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );

    const resp: any = yield callWrapperService(requestValidateAccessPassword, {
        accountId,
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
