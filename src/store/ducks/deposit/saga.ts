import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { REQUEST_DEPOSIT } from './types';

// Actions
import {
    didDepositFailAction,
    didDepositSucceedAction,
    RequestDepositAction
} from './actions';
import { transformToCurrencyPayload } from '../../../utils/helpers';
import { getDepositBilletsAction } from '../depositBillets/actions';
import { requestBalanceAction } from '../../ducks/balance/actions';
import { getStatementDataAction } from '../../ducks/statement/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestDeposit = (payload: {
    isOverTheLimit: boolean;
    payloadParsed: any;
}) => {
    if (!payload.isOverTheLimit) {
        return api.post('/deposit/billet', payload.payloadParsed);
    } else {
        return api.post('/deposit/charged/billet', payload.payloadParsed);
    }
};

// function* deposit(action: RequestDepositAction) {
//     const amount = yield select(
//         (state: IApplicationState) => state.deposit.payload.amount
//     );
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );

//     const payload = {
//         amount: transformToCurrencyPayload(amount),
//         accountId
//     };

//     try {
//         const resp = yield call(() => requestDeposit(payload));

//         // console.log(JSON.stringify(payload, null, 2));
//         // console.log(JSON.stringify(resp, null, 2));

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

//         yield put(getDepositBilletsAction());
//         yield put(didDepositSucceedAction(resp.data));
//         action.navigation.push('Deposit', { screen: 'Billet' });

//         // NavigationService.popToTop();
//         // NavigationService.navigate('Deposit', { screen: 'Billet' });
//     } catch (err) {
//         yield put(didDepositFailAction());
//         const message = err.message.match(
//             /Esse tipo de conta não permite essa operação/g
//         )
//             ? 'A conta demonstrativa só permite realizar apenas 1 (um) depósito no valor de até R$ 100,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!'
//             : err.message || 'Algo inesperado aconteceu...Tente novamente';
//         yield put(
//             setAlertMessageAction({
//                 type: 'error',
//                 title: 'Oops',
//                 message,
//                 action: err.message.match(
//                     /Esse tipo de conta não permite essa operação/g
//                 )
//                     ? {
//                           mainLabel: 'Completar conta',
//                           onPress: () => {
//                               action.navigation.push('Perfil');
//                           },
//                           secondLabel: 'Agora não'
//                       }
//                     : undefined
//             })
//         );
//     }
// }

function* deposit(action: RequestDepositAction) {
    const amount: string = yield select(
        (state: IApplicationState) => state.deposit.payload.amount
    );
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const isOverTheLimit: boolean = yield select(
        (state: IApplicationState) =>
            state.depositBillets.condition.isOverTheLimit
    );

    const payload = {
        payloadParsed: {
            amount: transformToCurrencyPayload(amount),
            accountId
        },
        isOverTheLimit
    };

    const resp: any = yield callWrapperService(requestDeposit, payload);

    // console.log('deposit', JSON.stringify(resp, null, 2));

    if (resp) {
        yield all([put(requestBalanceAction()), put(getStatementDataAction())]);
        yield put(getDepositBilletsAction());
        yield put(didDepositSucceedAction(resp.data));
        action.navigation.replace('Deposit', { screen: 'Billet' });
    } else {
        yield put(didDepositFailAction());
    }
}

export default all([takeLatest(REQUEST_DEPOSIT, deposit)]);
