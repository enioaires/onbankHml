import {
    all,
    delay,
    put,
    takeLatest,
    fork,
    cancel,
    take
} from '@redux-saga/core/effects';

import { setAlertMessageAction } from '../alert/actions';
import { revalidateUserAction } from '../auth/actions';

import { EXPIRE_SESSION } from './types';

function* sessionCounter() {
    yield delay(1000 * 60 * 10);
    yield put(revalidateUserAction());
    yield delay(500);
    yield put(
        setAlertMessageAction({
            title: 'Atenção',
            message: 'Sua sessão expirou!\nEntre em sua conta novamente.',
            type: 'error'
        })
    );
}

function* expireSession() {
    const counter = yield fork(sessionCounter);

    yield take('CANCEL_SESSION_EXPIRATION');

    yield cancel(counter);
}

export default all([takeLatest(EXPIRE_SESSION, expireSession)]);
