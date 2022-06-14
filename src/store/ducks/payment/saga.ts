import { all, takeLatest, put, select } from 'redux-saga/effects';
import * as dateFns from 'date-fns';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    IPaymentPayload,
    IQRCodePayload,
    IPaymentCreditCardPayload,
    REQUEST_PAYMENT,
    REQUEST_QRCODE_PAYMENT,
    GET_INSTALLMENTS
} from './types';

// Actions
import {
    didPaymentFailAction,
    didPaymentSucceedAction,
    didGetCreditCardInstallmentsSucceedAction,
    didGetCreditCardInstallmentsFailAction,
    GetCreditCardInstallmentsAction,
    RequestQRCodePaymentAction,
    RequestPaymentAction
} from './actions';
import { requestBalanceAction } from '../balance/actions';
import { storeReceiptAction } from '../receipt/actions';
import { getStatementDataAction } from '../statement/actions';

// Utils
import { transformToCurrencyPayload } from '../../../utils/helpers';
import callWrapperService from '../../../utils/callWrapperService';

const requestPayment = (account: string, branch: string, payload: any) => {
    return api.post(`v2/account/${branch}/${account}/billet/pay`, payload);
};

const requestQRCodePayment = (payload: any) => {
    return api.post(`v2/qrcode/pay`, payload);
};

const requestCreditCardInstallments = (payload: any) => {
    return api.post('/payment/creditcard/installments', payload);
};

const requestPaymentWithCreditCard = (
    account: string,
    branch: string,
    payload: any
) => {
    return api.post(`payment/creditcard/billet/${branch}/${account}`, payload);
};

// function* getCreditCardInstallments(action: GetCreditCardInstallmentsAction) {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const amount = yield select(
//         (state: IApplicationState) =>
//             state.payment.payload.paymentDetails?.totalAmount
//     );

//     const consolidatedAmount = yield select(
//         (state: IApplicationState) =>
//             state.payment.payload.paymentDetails?.consolidatedAmount
//     );

//     try {
//         const resp = yield call(() =>
//             requestCreditCardInstallments({
//                 accountId,
//                 amount: amount || consolidatedAmount
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
//             throw new Error(resp.message || 'Algo de errado ocorreu...');
//         }

//         yield put(didGetCreditCardInstallmentsSucceedAction(resp));
//         setTimeout(
//             () =>
//                 action.navigation.push('Payments', {
//                     screen: 'CreditInstallments'
//                 }),
//             500
//         );
//     } catch (err) {
//         yield put(didGetCreditCardInstallmentsFailAction());
//         Alert.alert('Pagamento', err.message);
//     }
// }

// function* payBill(action: RequestPaymentAction) {
//     const account = yield select(
//         (state: IApplicationState) => state.user.data.account.account
//     );
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const branch = yield select(
//         (state: IApplicationState) => state.user.data.account.branch
//     );
//     const paymentPayload: IPaymentPayload = yield select(
//         (state: IApplicationState) => state.payment.payload
//     );
//     const creditCard: IPaymentCreditCardPayload = yield select(
//         (state: IApplicationState) => state.payment.creditCardData
//     );
//     const documentNumber = yield select(
//         (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
//     );

//     let payload: any;

//     const total =
//         paymentPayload.paymentDetails!.consolidatedAmount ||
//         paymentPayload.paymentDetails!.totalAmount;

//     const totalAmount = total?.toString().includes(',')
//         ? transformToCurrencyPayload(total.toString())
//         : total;

//     if (paymentPayload.paymentDetails!.documentType === 'Boleto') {
//         payload = {
//             accountId,
//             totalAmount,
//             payBillet: {
//                 withdrawType: paymentPayload.paymentDetails!.documentType,
//                 boleto: {
//                     interestAmount: paymentPayload.paymentDetails!.interest,
//                     fineAmount: paymentPayload.paymentDetails!.fine,
//                     documentNumber: documentNumber.replace(/\D/g, ''),
//                     typeableLine: paymentPayload.paymentDetails!.typeableLine,
//                     dueDate: paymentPayload.paymentDetails!.dueDate,
//                     discount: paymentPayload.paymentDetails!.discount,
//                     beneficiaryName: paymentPayload.beneficiary?.name
//                 }
//             }
//         };
//     } else {
//         payload = {
//             accountId,
//             totalAmount,
//             payBillet: {
//                 withdrawType: paymentPayload.paymentDetails!.documentType,
//                 utilities: {
//                     documentNumber: documentNumber.replace(/\D/g, ''),
//                     beneficiaryTaxIdentifier:
//                         paymentPayload.beneficiary?.taxIdentifier?.taxId,
//                     typeableLine: paymentPayload.paymentDetails!.typeableLine,
//                     dueDate: paymentPayload.paymentDetails!.dueDate,
//                     paidAmount: paymentPayload.paymentDetails!.totalAmount,
//                     beneficiaryName: paymentPayload.beneficiary?.name
//                 }
//             }
//         };
//     }

//     if (creditCard)
//         payload = {
//             creditCardData: {
//                 cardNumber: creditCard.cardNumber,
//                 nameOnCard: creditCard.nameOnCard,
//                 expirationMonth: creditCard.expirationMonth,
//                 expirationYear: `${new Date()
//                     .getFullYear()
//                     .toString()
//                     .substring(0, 2)}${creditCard.expirationYear}`,
//                 cvv: creditCard.cvv,
//                 cardType: creditCard?.cardType?.toUpperCase(),
//                 holderData: {
//                     taxId: creditCard?.holderData?.taxId,
//                     country: 'BRA'
//                 },
//                 accountId,
//                 currency: 'BRL',
//                 installments: creditCard.installments,
//                 amount: creditCard.amount
//             },
//             billetData: {
//                 ...payload
//             }
//         };

//     try {
//         const resp: any = yield call(
//             creditCard
//                 ? () => requestPaymentWithCreditCard(account, branch, payload)
//                 : () => requestPayment(account, branch, payload)
//         );

//         // console.log('payload', JSON.stringify(payload, null, 2));
//         // console.log('resp', JSON.stringify(resp, null, 2));

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

//         yield all([put(requestBalanceAction()), put(getStatementDataAction())]);

//         yield put(
//             storeReceiptAction({
//                 type: 'billet',
//                 transactionCode: resp.transactionId,
//                 date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
//                 value: creditCard ? creditCard.amount!.toString() : totalAmount,
//                 paymentInfo: {
//                     barcode: creditCard
//                         ? resp.typeableLine
//                         : paymentPayload.paymentDetails!.typeableLine,
//                     beneficiary: creditCard
//                         ? resp.beneficiaryName
//                         : paymentPayload.beneficiary?.name!,
//                     creditCard: creditCard
//                         ? {
//                               cardNumber: resp.cardLast4,
//                               cardType: resp.cardFlag,
//                               installments: creditCard.installments || 1,
//                               amountPerInstallment: '',
//                               taxAmount: resp.taxAmount,
//                               billetAmount: resp.billetAmount
//                           }
//                         : undefined
//                 }
//             })
//         );

//         // yield put(showSuccessModalAction('Pagamento realizado com sucesso.'));

//         setTimeout(() => {
//             // action.navigation.popToTop();
//             action.navigation.push('General', {
//                 screen: 'Receipt'
//             });
//         }, 400);

//         yield put(didPaymentSucceedAction());
//     } catch (err) {
//         yield put(didPaymentFailAction());
//         const message = err.message.match(
//             /Esse tipo de conta não permite essa operação/g
//         )
//             ? 'A conta demonstrativa só permite realizar apenas 1 (um) pagamento no valor de até R$ 100,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!'
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

// function* qrCodePayment(action: RequestQRCodePaymentAction) {
//     const senderAccountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const senderAccount = yield select(
//         (state: IApplicationState) => state.user.data.account.account
//     );
//     const senderBranch = yield select(
//         (state: IApplicationState) => state.user.data.account.branch
//     );
//     const qrCodePayload: IQRCodePayload = yield select(
//         (state: IApplicationState) => state.payment.qrCodePayload
//     );

//     const payload = {
//         senderAccountId,
//         senderAccount,
//         senderBranch,
//         description: qrCodePayload.description,
//         receiverAccountId: qrCodePayload.accountId,
//         receiverTaxId: qrCodePayload.taxId.replace(/\D/g, ''),
//         receiverName: qrCodePayload.name,
//         amount: transformToCurrencyPayload(qrCodePayload.amount),
//         receiverAccount: qrCodePayload.account,
//         receiverBranch: qrCodePayload.branch
//     };

//     try {
//         const resp = yield call(() => requestQRCodePayment(payload));

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

//         yield all([put(requestBalanceAction()), put(getStatementDataAction())]);

//         yield put(
//             storeReceiptAction({
//                 type: 'qrcode',
//                 transactionCode: resp.transactionId,
//                 date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
//                 value: qrCodePayload.amount,
//                 transferInfo: {
//                     receiverAccount: qrCodePayload.account,
//                     receiverBankName: 'Onbank',
//                     receiverBranch: qrCodePayload.branch,
//                     receiverName: qrCodePayload.name,
//                     receiverTaxId: qrCodePayload.taxId
//                 }
//             })
//         );

//         // yield put(showSuccessModalAction('Pagamento realizado com sucesso.'));

//         setTimeout(() => {
//             action.navigation.push('General', {
//                 screen: 'Receipt'
//             });
//         }, 400);

//         yield put(didPaymentSucceedAction());
//     } catch (err) {
//         yield put(didPaymentFailAction());
//         const message = err.message.match(
//             /Esse tipo de conta não permite essa operação/g
//         )
//             ? 'A conta demonstrativa só permite realizar apenas 1 (um) pagamento por qrcode no valor de até R$ 100,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!'
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

function* getCreditCardInstallments(action: GetCreditCardInstallmentsAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const amount: number | undefined = yield select(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.totalAmount
    );

    const consolidatedAmount: number | undefined = yield select(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.consolidatedAmount
    );

    const resp = yield callWrapperService(requestCreditCardInstallments, {
        accountId,
        amount: amount || consolidatedAmount
    });

    // console.log('getCreditCardInstallment', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(didGetCreditCardInstallmentsSucceedAction(resp.data));
        setTimeout(
            () =>
                action.navigation.push('Payments', {
                    screen: 'CreditInstallments'
                }),
            500
        );
    } else {
        yield put(didGetCreditCardInstallmentsFailAction());
    }
}

function* payBill(action: RequestPaymentAction) {
    const account: number = yield select(
        (state: IApplicationState) => state.user.data.account.account
    );
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const branch: number = yield select(
        (state: IApplicationState) => state.user.data.account.branch
    );
    const paymentPayload: IPaymentPayload = yield select(
        (state: IApplicationState) => state.payment.payload
    );
    const creditCard: IPaymentCreditCardPayload = yield select(
        (state: IApplicationState) => state.payment.creditCardData
    );
    const documentNumber: string = yield select(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );

    let payload: any;

    const total =
        paymentPayload.paymentDetails!.totalAmount ||
        paymentPayload.paymentDetails!.consolidatedAmount;

    const totalAmount = total?.toString().includes(',')
        ? transformToCurrencyPayload(total.toString())
        : total;

    if (paymentPayload.paymentDetails!.documentType === 'Boleto') {
        payload = {
            accountId,
            totalAmount,
            payBillet: {
                withdrawType: paymentPayload.paymentDetails!.documentType,
                boleto: {
                    interestAmount: paymentPayload.paymentDetails!.interest,
                    fineAmount: paymentPayload.paymentDetails!.fine,
                    documentNumber: documentNumber.replace(/\D/g, ''),
                    typeableLine: paymentPayload.paymentDetails!.typeableLine,
                    dueDate: paymentPayload.paymentDetails!.dueDate,
                    discount: paymentPayload.paymentDetails!.discount,
                    beneficiaryName: paymentPayload.beneficiary?.name
                }
            }
        };
    } else {
        payload = {
            accountId,
            totalAmount,
            payBillet: {
                withdrawType: paymentPayload.paymentDetails!.documentType,
                utilities: {
                    documentNumber: documentNumber.replace(/\D/g, ''),
                    beneficiaryTaxIdentifier:
                        paymentPayload.beneficiary?.taxIdentifier?.taxId,
                    typeableLine: paymentPayload.paymentDetails!.typeableLine,
                    dueDate: paymentPayload.paymentDetails!.dueDate,
                    paidAmount: paymentPayload.paymentDetails!.totalAmount,
                    beneficiaryName: paymentPayload.beneficiary?.name
                }
            }
        };
    }

    if (creditCard)
        payload = {
            creditCardData: {
                cardNumber: creditCard.cardNumber,
                nameOnCard: creditCard.nameOnCard,
                expirationMonth: creditCard.expirationMonth,
                expirationYear: `${new Date()
                    .getFullYear()
                    .toString()
                    .substring(0, 2)}${creditCard.expirationYear}`,
                cvv: creditCard.cvv,
                cardType: creditCard?.cardType?.toUpperCase(),
                holderData: {
                    taxId: creditCard?.holderData?.taxId,
                    country: 'BRA'
                },
                accountId,
                currency: 'BRL',
                installments: creditCard.installments,
                amount: creditCard.amount
            },
            billetData: {
                ...payload
            }
        };

    const resp: any = yield callWrapperService(
        creditCard
            ? () =>
                  requestPaymentWithCreditCard(account, branch, {
                      ...payload,
                      transactionPassword: action.password
                  })
            : () =>
                  requestPayment(account, branch, {
                      ...payload,
                      transactionPassword: action.password
                  })
    );

    // console.log('payBill', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield all([put(requestBalanceAction()), put(getStatementDataAction())]);

        yield put(
            storeReceiptAction({
                type: 'billet',
                transactionCode: resp.data.transactionId,
                date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
                value: creditCard ? creditCard.amount!.toString() : totalAmount,
                paymentInfo: {
                    barcode: creditCard
                        ? resp.data.typeableLine
                        : paymentPayload.paymentDetails!.typeableLine,
                    beneficiary: creditCard
                        ? resp.data.beneficiaryName
                        : paymentPayload.beneficiary?.name!,
                    creditCard: creditCard
                        ? {
                              cardNumber: resp.data.cardLast4,
                              cardType: resp.data.cardFlag,
                              installments: creditCard.installments || 1,
                              amountPerInstallment: '',
                              taxAmount: resp.data.taxAmount,
                              billetAmount: resp.data.billetAmount
                          }
                        : undefined
                }
            })
        );

        setTimeout(() => {
            action.navigation.replace('General', {
                screen: 'Receipt'
            });
        }, 400);

        yield put(didPaymentSucceedAction());
    } else {
        yield put(didPaymentFailAction());
    }
}

function* qrCodePayment(action: RequestQRCodePaymentAction) {
    const senderAccountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );

    const senderAccount: number = yield select(
        (state: IApplicationState) => state.user.data.account.account
    );
    const senderBranch: number = yield select(
        (state: IApplicationState) => state.user.data.account.branch
    );
    const qrCodePayload: IQRCodePayload = yield select(
        (state: IApplicationState) => state.payment.qrCodePayload
    );

    const payload = {
        transactionPassword: action.password,
        senderAccount,
        senderBranch,
        description: qrCodePayload.description,
        receiverAccountId: qrCodePayload.accountId,
        receiverTaxId: qrCodePayload.taxId.replace(/\D/g, ''),
        receiverName: qrCodePayload.name,
        amount: transformToCurrencyPayload(qrCodePayload.amount),
        receiverAccount: qrCodePayload.account,
        receiverBranch: qrCodePayload.branch
    };

    const resp: any = yield callWrapperService(requestQRCodePayment, payload);

    // console.log('qrCodePayment', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield all([put(requestBalanceAction()), put(getStatementDataAction())]);

        yield put(
            storeReceiptAction({
                type: 'qrcode',
                transactionCode: resp.data.transactionId,
                date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
                value: qrCodePayload.amount,
                transferInfo: {
                    receiverAccount: qrCodePayload.account,
                    receiverBankName: 'Onbank',
                    receiverBranch: qrCodePayload.branch,
                    receiverName: qrCodePayload.name,
                    receiverTaxId: qrCodePayload.taxId
                }
            })
        );

        setTimeout(() => {
            action.navigation.push('General', {
                screen: 'Receipt'
            });
        }, 400);

        yield put(didPaymentSucceedAction());
    } else {
        yield put(didPaymentFailAction());
    }
}

export default all([
    takeLatest(REQUEST_PAYMENT, payBill),
    takeLatest(REQUEST_QRCODE_PAYMENT, qrCodePayment),
    takeLatest(GET_INSTALLMENTS, getCreditCardInstallments)
]);
