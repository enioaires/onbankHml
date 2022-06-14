import { put, all, takeLatest, select } from 'redux-saga/effects';
import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    REQUEST_STATEMENT,
    GET_STATEMENT_MONTH_BUTTONS,
    DEBIT_CHARGE_CONTEST,
    IStatementState,
    IStatementData
} from './types';

// Actions
import {
    didStatementRequestFailAction,
    changeStatementPayloadAction,
    setStatementMonthButtonsAction,
    didStatementRequestSucceedAction,
    DebitChargeContestAction,
    debitChargeContestSuccessAction,
    debitChargeContestFailureAction,
    getLastWeekStatementAction
} from './actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestStatement = (startDate: string, endDate: string) => {
    return api.get(`/statements/${startDate}/${endDate}`);
};

const requestStatementWallet = (startDate: string, endDate: string) => {
    return api.get(`/payment/creditcard/statement/${startDate}/${endDate}`);
};

const requestDebitChargeContest = (
    reason: string,
    transactionId: string,
    virtual: boolean
) => {
    return api.post('/cardbiz/contest', {
        reason,
        transactionId,
        virtual
    });
};

// function* debitChargeContest(action: DebitChargeContestAction) {
//     try {
//         const resp = yield call(
//             requestDebitChargeContest,
//             action.reason,
//             action.transactionId,
//             action.isVirtual
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

//         if (resp.data) {
//             yield put(debitChargeContestSuccessAction());
//             action.navigation.pop();
//             action.navigation.pop();
//             action.navigation.pop();
//             action.navigation.push('General', { screen: 'ContestDone' });
//         } else {
//             throw new Error();
//         }
//     } catch (err) {
//         yield put(debitChargeContestFailureAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops!',
//                 message: err.message || 'Tente novamente mais tarde...',
//                 type: 'error'
//             })
//         );
//     }
// }

// function* getStatementMonthButtons() {
//     const createdAccount = yield select(
//         (state: IApplicationState) => state.user.data.client.createdAccount
//     );

//     const [year, month, day] = createdAccount.split('-');

//     const months = dateFns
//         .eachMonthOfInterval({
//             start: new Date(`${year}/${month}/${day}`),
//             end: dateFns.add(new Date(), {
//                 days: 1
//             })
//         })
//         .map((date) => ({
//             startDate: dateFns.format(date, 'yyyy-MM-01'),
//             endDate: dateFns.format(
//                 date,
//                 `yyyy-MM-${dateFns.getDaysInMonth(new Date(date))}`
//             ),
//             label:
//                 dateFns
//                     .format(date, 'MMM/yyyy', { locale: ptBR })
//                     .charAt(0)
//                     .toUpperCase() +
//                 dateFns.format(date, 'MMM/yyyy', { locale: ptBR }).substring(1)
//         }));

//     yield all([
//         put(setStatementMonthButtonsAction(months)),
//         put(
//             changeStatementPayloadAction({
//                 startDate: dateFns.format(new Date(), 'yyyy-MM-01'),
//                 endDate: dateFns.format(
//                     new Date(),
//                     `yyyy-MM-${dateFns.getDaysInMonth(new Date(new Date()))}`
//                 ),
//                 label:
//                     dateFns
//                         .format(new Date(), 'MMM/yyyy', { locale: ptBR })
//                         .charAt(0)
//                         .toUpperCase() +
//                     dateFns
//                         .format(new Date(), 'MMM/yyyy', { locale: ptBR })
//                         .substring(1)
//             })
//         )
//     ]);
// }

// function* getStatementsData() {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const [startDate, endDate, filter] = yield select(
//         (state: IApplicationState) => {
//             return [
//                 state.statement.payload.startDate,
//                 state.statement.payload.endDate,
//                 state.statement.filters.filter
//             ];
//         }
//     );

//     try {
//         const resp: any = yield call(
//             filter === 'account'
//                 ? () => requestStatement(accountId, startDate, endDate)
//                 : () => requestStatementWallet(accountId, startDate, endDate)
//         );

//         // console.log(resp, accountId);

//         // console.log('Inicio:', startDate, 'Final: ', endDate);
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

//         // console.log(JSON.stringify(resp.data.response.statement, null, 2));

//         yield put(
//             didStatementRequestSucceedAction(resp.data.response.statement)
//         );
//     } catch (err) {
//         yield put(didStatementRequestFailAction());
//         Alert.alert('Extrato', err.message);
//     }
// }

function* debitChargeContest(action: DebitChargeContestAction) {
    const resp = yield callWrapperService(
        requestDebitChargeContest,
        action.reason,
        action.transactionId,
        action.isVirtual
    );

    if (resp) {
        if (resp.data) {
            yield put(debitChargeContestSuccessAction());
            action.navigation.pop();
            action.navigation.pop();
            action.navigation.pop();
            action.navigation.push('General', { screen: 'ContestDone' });
        } else {
            yield put(debitChargeContestFailureAction());
        }
    } else {
        yield put(debitChargeContestFailureAction());
    }
}

function* getStatementMonthButtons() {
    const createdAccount: string = yield select(
        (state: IApplicationState) => state.user.data.client.createdAccount
    );

    const [year, month, day] = createdAccount.split('-');

    const months = dateFns
        .eachMonthOfInterval({
            start: new Date(`${year}/${month}/${day}`),
            end: dateFns.add(new Date(), {
                days: 1
            })
        })
        .map((date) => ({
            startDate: dateFns.format(date, 'yyyy-MM-01'),
            endDate: dateFns.format(
                date,
                `yyyy-MM-${dateFns.getDaysInMonth(new Date(date))}`
            ),
            label:
                dateFns
                    .format(date, 'MMM/yyyy', { locale: ptBR })
                    .charAt(0)
                    .toUpperCase() +
                dateFns.format(date, 'MMM/yyyy', { locale: ptBR }).substring(1)
        }));

    yield all([
        put(setStatementMonthButtonsAction(months)),
        put(
            changeStatementPayloadAction({
                startDate: dateFns.format(new Date(), 'yyyy-MM-01'),
                endDate: dateFns.format(
                    new Date(),
                    `yyyy-MM-${dateFns.getDaysInMonth(new Date(new Date()))}`
                ),
                label:
                    dateFns
                        .format(new Date(), 'MMM/yyyy', { locale: ptBR })
                        .charAt(0)
                        .toUpperCase() +
                    dateFns
                        .format(new Date(), 'MMM/yyyy', { locale: ptBR })
                        .substring(1)
            })
        )
    ]);
}

function* getStatementsData() {
    const [startDate, endDate, filter, lastWeekData] = yield select(
        (state: IApplicationState) => {
            return [
                state.statement.payload.startDate,
                state.statement.payload.endDate,
                state.statement.filters.filter,
                state.statement.lastWeekData
            ];
        }
    );

    const resp: any = yield callWrapperService(
        filter === 'account'
            ? () => requestStatement(startDate, endDate)
            : () => requestStatementWallet(startDate, endDate)
    );

    // console.log(resp, accountId);

    // console.log('Inicio:', startDate, 'Final: ', endDate);
    // console.log(JSON.stringify(resp, null, 2));

    // console.log(JSON.stringify(resp.data.response.statement, null, 2));

    if (resp) {
        yield put(
            didStatementRequestSucceedAction(resp?.data?.response.statement)
        );
    } else {
        yield put(didStatementRequestFailAction());
    }

    if (resp && !lastWeekData) {
        const dateToCompare = dateFns.add(new Date(), {
            days: -6
        });

        const lastWeekData = (resp?.data?.response.statement).filter(
            (element: IStatementData) =>
                dateFns.isAfter(new Date(element.entryDate), dateToCompare)
        );

        yield put(getLastWeekStatementAction(lastWeekData));
    }
}

export default all([
    takeLatest(REQUEST_STATEMENT, getStatementsData),
    takeLatest(GET_STATEMENT_MONTH_BUTTONS, getStatementMonthButtons),
    takeLatest(DEBIT_CHARGE_CONTEST, debitChargeContest)
]);
