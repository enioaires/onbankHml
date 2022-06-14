import { combineReducers } from 'redux';

import loginReducer from './login';
import userDataReducer from './userData';
import authReducer from './auth';
import statementReducer from './statement';
import forgotPasswordReducer from './forgotPassword';
import signUpReducer from './signUp';
import balanceReducer from './balance';
import paymentReducer from './payment';
import depositReducer from './deposit';
import receiveReducer from './receive';
import receiveReducerBACKUP from './receiveBACKUP'
import rechargeReducer from './recharge';
import addressReducer from './address';
import addressNewReducer from './addressNew';
import phoneValidationReducer from './phoneValidation';
import searchClientReducer from './searchClient';
import searchEmailReducer from './searchEmail';
import searchPhoneNumberReducer from './searchPhoneNumber';
import resetPasswordReducer from './resetPassword';
import bannerReducer from './banner';
import depositBilletsReducer from './depositBillets';
import addTransactionPasswordReducer from './addTransaction';
import transferReducer from './transfer';
import receiptReducer from './receipt';
import successModalReducer from './successModal';
import walletReducer from './wallet';
import passwordReducer from './password';
import updateDataReducer from './updateData';
import cardReducer from './card';
import alertReducer from './alert';
import promocodeReducer from './promocode';
import termsReducer from './terms';
import billetReducer from './billet';
import qrcodeReducer from './qrcode';
import pixPaymentReducer from './pixPayment';
import rechargeServicesReducer from './rechargeServices';
import insuranceReducer from './insurance';
import cashbackReducer from './cashback';

export default combineReducers({
    login: loginReducer,
    user: userDataReducer,
    auth: authReducer,
    statement: statementReducer,
    forgotPassword: forgotPasswordReducer,
    signUp: signUpReducer,
    balance: balanceReducer,
    payment: paymentReducer,
    deposit: depositReducer,
    receive: receiveReducer,
    receiveBACKUP: receiveReducerBACKUP,
    recharge: rechargeReducer,
    address: addressReducer,
    addressNew: addressNewReducer,
    phoneValidation: phoneValidationReducer,
    searchClient: searchClientReducer,
    searchEmail: searchEmailReducer,
    searchPhoneNumber: searchPhoneNumberReducer,
    resetPassword: resetPasswordReducer,
    banner: bannerReducer,
    depositBillets: depositBilletsReducer,
    addTransactionPassword: addTransactionPasswordReducer,
    transfer: transferReducer,
    receipt: receiptReducer,
    successModal: successModalReducer,
    wallet: walletReducer,
    password: passwordReducer,
    updateData: updateDataReducer,
    card: cardReducer,
    alert: alertReducer,
    promocode: promocodeReducer,
    terms: termsReducer,
    billet: billetReducer,
    qrcode: qrcodeReducer,
    pixPayment: pixPaymentReducer,
    rechargeServices: rechargeServicesReducer,
    insurance: insuranceReducer,
    cashback: cashbackReducer
});

// export default (state: any, action: any) => {
//     if (action.type === 'REMOVE_USER_AUTH') {
//         state = undefined;
//     }

//     return appReducers(state, action);
// };
