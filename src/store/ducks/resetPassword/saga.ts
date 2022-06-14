import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { REQUEST_RESET_PASSWORD } from './types';

// Actions
import {
    didResetPasswordFailAction,
    didResetPasswordSucceedAction,
    clearResetPasswordPayloadAction
} from './actions';

const requestResetPassword = (payload: any) => {
    return api.post('/change/password', payload);
};

function* resetPassword(action: any) {
    const newPassword = yield select(
        (state: IApplicationState) => state.resetPassword.newPassword
    );

    const payload = {
        newPassword,
        token: action.token
    };

    try {
        const resp = yield call(() => requestResetPassword(payload));

        if (resp.error || resp.statusCode === 500) {
            if (resp.statusCode === 500) {
                throw new Error(
                    'Ocorreu um problema. Tente novamente mais tarde.'
                );
            }
            throw new Error(resp.message);
        }

        action.setShowAlert(true);
        yield put(didResetPasswordSucceedAction());
        yield put(clearResetPasswordPayloadAction());
    } catch (err) {
        yield put(didResetPasswordFailAction());
        Alert.alert('Reset Password Error', err.message);
    }
}

export default all([takeLatest(REQUEST_RESET_PASSWORD, resetPassword)]);
