import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { ADD_TRANSACTION_PASSWORD } from './types';

// Actions
import { onGetUserData } from '../userData/actions';
import {
    didAddTransactionPasswordFailAction,
    AddTransactionPasswordAction
} from './actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestAddTransactionPassword = (payload: any) => {
    return api.post('/key', payload);
};

// function* addTransactionPassword(action: AddTransactionPasswordAction) {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const transactionPassword = yield select(
//         (state: IApplicationState) => state.addTransactionPassword.password
//     );

//     try {
//         const resp = yield call(() =>
//             requestAddTransactionPassword({
//                 accountId,
//                 transactionPassword
//             })
//         );

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 403) {
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

//         yield put(didAddTransactionPasswordFailAction());

//         yield put(onGetUserData());

//         action.navigation.reset({
//             index: 0,
//             routes: [{ name: 'General' }]
//         });
//     } catch (err) {
//         yield put(didAddTransactionPasswordFailAction());
//         Alert.alert('Senha', err.message);
//     }
// }

function* addTransactionPassword(action: AddTransactionPasswordAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const transactionPassword: string = yield select(
        (state: IApplicationState) => state.addTransactionPassword.password
    );

    const resp: any = yield callWrapperService(requestAddTransactionPassword, {
        accountId,
        transactionPassword
    });

    // console.log('addTransactionPassword', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didAddTransactionPasswordFailAction());

        yield put(onGetUserData());

        action.navigation.reset({
            index: 0,
            routes: [{ name: 'General' }]
        });
    } else {
        yield put(didAddTransactionPasswordFailAction());
    }
}

export default all([
    takeLatest(ADD_TRANSACTION_PASSWORD, addTransactionPassword)
]);
