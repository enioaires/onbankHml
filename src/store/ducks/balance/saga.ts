import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { REQUEST_BALANCE } from './types';

// Actions
import { didBalanceFailAction, didBalanceSucceedAction } from './actions';
import { removeTokenAction } from '../auth/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestBalance = (accountId: string) => {
    return api.get(`/balance/${accountId}`);
};

// function* getBalance() {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );

//     try {
//         const resp = yield call(() => requestBalance(accountId));

//         if (resp.logout) {
//             yield put(removeTokenAction());
//             return;
//         }

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 403 || resp.statusCode === 401) {
//                 yield new Promise((resolve) => {
//                     Alert.alert('Atenção', 'Entre em sua conta novamente', [
//                         { text: 'OK', onPress: resolve }
//                     ]);
//                 });
//                 yield put(removeTokenAction());
//                 return;
//             }
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message);
//         }

//         yield put(didBalanceSucceedAction(resp.data));
//     } catch (err) {
//         yield put(didBalanceFailAction());
//         yield put(
//             setAlertMessageAction({
//                 type: 'error',
//                 title: 'Oops',
//                 message: err.message || 'Algo inesperado aconteceu...'
//             })
//         );
//     }
// }

function* getBalance() {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );
    const resp = yield callWrapperService(requestBalance, accountId);

    // console.log('balance', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        if (resp.data.logout) {
            yield put(removeTokenAction());
            return;
        }

        yield put(didBalanceSucceedAction(resp.data));
    } else {
        yield put(didBalanceFailAction());
    }
}

export default all([takeLatest(REQUEST_BALANCE, getBalance)]);
