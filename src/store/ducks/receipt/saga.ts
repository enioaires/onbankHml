import { all, takeLatest, call, select, put } from 'redux-saga/effects';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import * as dateFns from 'date-fns';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    GET_CREDIT_CARD_RECEIPT_DATA,
    GET_RECEIPT_DATA,
    IReceiptData,
    SHARE_VIEWSHOT
} from './types';

// Utils
import callWrapperService from '../../../utils/callWrapperService';
import {
    GetCreditCardReceiptDataAction,
    GetReceiptDataAction,
    getReceiptDataDoneAction,
    removeReceiptAction,
    storeReceiptAction
} from './actions';

const requestGetCreditCardReceiptData = (transactionId: string) => {
    return api.get(`/payment/creditcard/statement/recipe/${transactionId}`);
};
const requestGetReceiptData = (type: string, transactionId: string) => {
    let typeParsed = type
    if (type === 'rechargeServices') {
        typeParsed = 'topup'
    }
    return api.get(`/account/${typeParsed}/${transactionId}`);
};

function* shareReceipt() {
    const viewshotRef = yield select(
        (state: IApplicationState) => state.receipt.viewshotRef
    );

    const uri = yield call(() =>
        captureRef(viewshotRef, {
            quality: 0.9,
            format: 'png'
        })
    );

    try {
        yield call(() =>
            Share.open({
                url: `file://${uri}`,
                filename: 'Comprovante'
            })
        );
    } catch (err) {
        // Alert.alert('Compartilhar', err.message);
    }
}

function* getCreditCardReceiptData(action: GetCreditCardReceiptDataAction) {
    const resp: any = yield callWrapperService(
        requestGetCreditCardReceiptData,
        action.item.transactionId || ''
    );

    // console.log('get credit receipt', JSON.stringify(resp, null, 2));

    yield put(getReceiptDataDoneAction());

    if (resp?.data) {
        yield put(
            storeReceiptAction({
                type: 'billet',
                value: action.item.amount.toString(),
                transactionCode: action.item.transactionId || '',
                date: dateFns.format(
                    // dateFns.parseISO(action.item.creditDate),
                    // 'dd/MM/yyyy; HH:mm'
                    dateFns.parseISO(action.item.entryDate),
                    'dd/MM/yyyy; HH:mm'
                ),
                paymentInfo: {
                    barcode: resp.data.typeableLine,
                    beneficiary: resp.data.beneficiaryName,
                    creditCard: {
                        cardNumber: action.item.cardLast4 ?? '',
                        cardType: action.item.cardFlag || '',
                        installments: resp.data.installments,
                        amountPerInstallment: '100',
                        taxAmount: resp.data.taxAmount,
                        billetAmount: resp.data.billetAmount
                    }
                }
            })
        );
        action.navigation.push('General', { screen: 'Receipt' });
    } else {
        yield put(removeReceiptAction());
    }
}

function* getReceiptData(action: GetReceiptDataAction) {
    const resp: any = yield callWrapperService(
        requestGetReceiptData,
        action.receiptType,
        action.item.transactionId || ''
    );

    // console.log('get receipt', JSON.stringify(resp, null, 2));

    yield put(getReceiptDataDoneAction());

    if (resp?.data) {
        if (action.item.historyCode === 1100) {
            yield put(
                storeReceiptAction({
                    type: 'qrcodeReceive',
                    value: action.item.amount.toString(),
                    transactionCode: action.item.transactionId || '',
                    date: dateFns.format(
                        // dateFns.parseISO(action.item.creditDate),
                        // 'dd/MM/yyyy; HH:mm'
                        dateFns.parseISO(action.item.entryDate),
                        'dd/MM/yyyy; HH:mm'
                    ),
                    qrCodeReceive: {
                        payerName:
                            action.item.counterpart?.name || 'Não informado.',
                        payerTaxId:
                            action.item.counterpart?.taxIdentifier.taxId ||
                            'Não informado.',
                        payerAccount: resp.data.senderAccount,
                        description: resp.data.description
                    }
                })
            );
        } else {
            let receipt: IReceiptData = {
                type: action.receiptType,
                transactionCode: action.item.transactionId!,
                value: action.item.amount.toString(),
                // date: dateFns.isSameDay(
                //     dateFns.parseISO(item.creditDate),
                //     new Date(item.entryDate)
                // )
                //     ? dateFns.format(
                //           dateFns.parseISO(item.entryDate),
                //           'dd/MM/yyyy ; HH:mm'
                //       )
                //     : dateFns.format(
                //           dateFns.parseISO(item.creditDate),
                //           'dd/MM/yyyy'
                //       )
                date: dateFns.format(
                    dateFns.parseISO(action.item.entryDate),
                    'dd/MM/yyyy ; HH:mm'
                )
            };

            if (
                action.receiptType === 'transfer' ||
                action.receiptType === 'qrcode'
            ) {
                if (resp.data.description) {
                    receipt = {
                        ...receipt,
                        transferInfo: {
                            receiverName: resp.data.name,
                            receiverBankName: resp.data.bankName,
                            receiverTaxId: resp.data.receiverTaxId,
                            receiverBranch: resp.data.receiverBranch,
                            receiverAccount: resp.data.receiverAccount,
                            description: resp.data.description
                        }
                    };
                } else {
                    receipt = {
                        ...receipt,
                        transferInfo: {
                            receiverName: resp.data.name,
                            receiverBankName: resp.data.bankName,
                            receiverTaxId: resp.data.receiverTaxId,
                            receiverBranch: resp.data.receiverBranch,
                            receiverAccount: resp.data.receiverAccount
                        }
                    };
                }
            }

            if (action.receiptType === 'billet') {
                receipt = {
                    ...receipt,
                    paymentInfo: {
                        barcode: resp.data.typeableLine,
                        beneficiary: resp.data.beneficiaryName
                    }
                };
            }

            if (action.receiptType === 'recharge') {
                receipt = {
                    ...receipt,
                    rechargeInfo: {
                        phoneNumber: resp.data.phoneNumber,
                        operator: resp.data.carrier
                    }
                };
            }

            if (action.receiptType === 'transfer/pix') {
                receipt = {
                    ...receipt,
                    transactionCode: resp.data.e2eId,
                    pixTransfer: {
                        receiverName: resp.data.receiverName || '',
                        receiverDocumentNumber: resp.data.receiverDocumentNumber || resp.data.receiverCompanyDocumentNumber || '',
                        amount: resp.data.amount,
                        e2eId: resp.data.e2eId,
                        paymentDateTime: resp.data.paymentDateTime
                    }
                }
            }

            if (action.receiptType === 'deposit/pix') {
                receipt = {
                    ...receipt,
                    transactionCode: resp.data.e2eId,
                    pixDeposit: {
                        payerName: resp.data.payerName || '',
                        payerDocumentNumber: resp.data.payerDocumentNumber || resp.data.payerCompanyDocumentNumber || '',
                        amount: resp.data.amount,
                        e2eId: resp.data.e2eId,
                        paymentDateTime: resp.data.paymentDateTime
                    }
                }
            }

            if (action.receiptType === 'rechargeServices') {
                receipt = {
                    ...receipt,
                    rechargeServices: {
                        product: resp.data.product,
                        transactionId: resp.data.transactionId,
                        amount: resp.data.amount,
                        pin: resp.data.pin || '',
                        signerCode: resp.data.signerCode || ''
                    }
                }
            }

            yield put(
                storeReceiptAction({
                    ...receipt
                })
            );
        }

        action.navigation.push('General', { screen: 'Receipt' });
    } else {
        yield put(removeReceiptAction());
    }
}

export default all([
    takeLatest(SHARE_VIEWSHOT, shareReceipt),
    takeLatest(GET_CREDIT_CARD_RECEIPT_DATA, getCreditCardReceiptData),
    takeLatest(GET_RECEIPT_DATA, getReceiptData)
]);
