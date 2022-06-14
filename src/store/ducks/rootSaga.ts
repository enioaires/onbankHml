import { all } from 'redux-saga/effects';

// Sagas
import loginSaga from './login/saga';
import authSaga from './auth/saga';
import sessionSaga from './session/saga';
import userDataSaga from './userData/saga';
import statementSaga from './statement/saga';
import forgotPasswordSaga from './forgotPassword/saga';
import signUpSaga from './signUp/saga';
import balanceSaga from './balance/saga';
import paymentSaga from './payment/saga';
import depositSaga from './deposit/saga';
import receiveSaga from './receive/saga';
import receiveBACKUPSaga from './receiveBACKUP/saga';
import rechargeSaga from './recharge/saga';
import addressSaga from './address/saga';
import addressNewSaga from './addressNew/saga';
import phoneValidationSaga from './phoneValidation/saga';
import searchClientSaga from './searchClient/saga';
import searchEmailSaga from './searchEmail/saga';
import searchPhoneNumberSaga from './searchPhoneNumber/saga';
import resetPasswordSaga from './resetPassword/saga';
import bannerSaga from './banner/saga';
import depositBilletsSaga from './depositBillets/saga';
import addTransactionPasswordSaga from './addTransaction/saga';
import transferSaga from './transfer/saga';
import walletSaga from './wallet/saga';
import passwordSaga from './password/saga';
import updateDataSaga from './updateData/saga';
import receiptSaga from './receipt/saga';
import cardSaga from './card/saga';
import promocodeSaga from './promocode/saga';
import termsSaga from './terms/saga';
import billetSaga from './billet/saga';
import qrcodeSaga from './qrcode/saga';
import pixPaymentSaga from './pixPayment/saga';
import rechargeServicesSaga from './rechargeServices/saga';
import insuranceSaga from './insurance/saga';
import cashbackSaga from './cashback/saga';

export default function* rootSaga() {
    yield all({
        loginSaga,
        authSaga,
        sessionSaga,
        userDataSaga,
        statementSaga,
        forgotPasswordSaga,
        signUpSaga,
        balanceSaga,
        paymentSaga,
        depositSaga,
        receiveSaga,
        receiveBACKUPSaga,
        rechargeSaga,
        addressSaga,
        addressNewSaga,
        phoneValidationSaga,
        searchClientSaga,
        searchEmailSaga,
        searchPhoneNumberSaga,
        resetPasswordSaga,
        bannerSaga,
        depositBilletsSaga,
        addTransactionPasswordSaga,
        transferSaga,
        walletSaga,
        passwordSaga,
        updateDataSaga,
        receiptSaga,
        cardSaga,
        promocodeSaga,
        termsSaga,
        billetSaga,
        qrcodeSaga,
        pixPaymentSaga,
        rechargeServicesSaga,
        insuranceSaga,
        cashbackSaga
    });
}
