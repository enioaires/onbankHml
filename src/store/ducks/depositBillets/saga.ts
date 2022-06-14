import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { GET_DEPOSIT_BILLETS, GET_CONDITION_BILLETS } from './types';
import { IApplicationState } from '../../types';

// Actions
import {
    didGetDepositBilletsFailAction,
    didGetDepositBilletsSucceedAction,
    didConditionBilletsFailAction,
    didConditionBilletsSucceedAction,
    GetConditionBilletsAction
} from './actions';
import { setAlertMessageAction } from '../../../store/ducks/alert/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestGetDepositBillets = () => {
    return api.get(`/deposit/billet`);
};

const requestGetConditionBillets = () => {
    return api.get(`/deposit/condition`);
};

// function* getDepositBillets() {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );

//     try {
//         const resp: any = yield call(() => requestGetDepositBillets(accountId));

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
//             throw new Error(resp.message || 'Algo de errado aconteceu...');
//         }

//         yield put(didGetDepositBilletsSucceedAction(resp.data));
//     } catch (err) {
//         yield put(didGetDepositBilletsFailAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops',
//                 type: 'error',
//                 message:
//                     err.message ||
//                     'Ocorreu um problema. Tente novamente mais tarde...'
//             })
//         );
//     }
// }

function* getDepositBillets() {
    const resp: any = yield callWrapperService(requestGetDepositBillets);

    // console.log('depositBillets', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(didGetDepositBilletsSucceedAction(resp.data));
    } else {
        yield put(didGetDepositBilletsFailAction());
    }
}

function* getConditionBillets(action: GetConditionBilletsAction) {
    const resp = yield callWrapperService(requestGetConditionBillets);

    // console.log('conditionBillets', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(didConditionBilletsSucceedAction(resp.data));

        if (
            resp.data.depositsIssuedInActualMonth == 25 ||
            resp.data.depositsIssuedInActualMonth == 30
        ) {
            yield put(
                setAlertMessageAction({
                    title: 'Aviso',
                    message: resp.data.isOverTheLimit
                        ? 'Você atingiu o seu limite de emissões de boletos gratuitos mensais, a partir de agora será cobrada uma taxa de R$ 3,00 para cada boleto emitido'
                        : 'Você está perto de atingir o limite de emissões de boletos gratuitos mensais',
                    type: 'info',
                    action: {
                        onPress: () => {
                            action.navigation.push('Deposit', {
                                screen: 'Value',
                                params: { method: 'billet' }
                            });
                        },
                        mainLabel: 'Continuar',
                        secondLabel: 'Voltar'
                    }
                })
            );
        } else {
            action.navigation.push('Deposit', {
                screen: 'Value',
                params: { method: 'billet' }
            });
        }
    } else {
        put(didConditionBilletsFailAction());
    }
}

export default all([
    takeLatest(GET_DEPOSIT_BILLETS, getDepositBillets),
    takeLatest(GET_CONDITION_BILLETS, getConditionBillets)
]);
