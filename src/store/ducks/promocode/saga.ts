import { all, takeLatest, put } from 'redux-saga/effects';

// API
import api from '../../../api';

// Types
import {
    GENERATE_PROMO_CODE,
    VERIFY_PROMO_CODE,
    GET_PROMO_CODE_INVITES,
    REFRESH_POMO_CODE
} from './types';

// Actions
import {
    verifyPromocodeFailAction,
    verifyPromocodeSuccessAction,
    VerifyPromocodeAction,
    generatePromocodeFailAction,
    generatePromocodeSuccessAction,
    GeneratePromocodeAction,
    getPromocodeInvitesSuccessAction,
    getPromocodeInvitesFailAction,
    refreshPromocodeSuccessAction,
    refreshPromocodeFailAction
} from './actions';
import { setAlertMessageAction } from '../alert/actions';
import { changeSignUpPayloadAction } from '../signUp/actions';
import { onGetUserData } from '../userData/actions';
import { removeTokenAction } from '../auth/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestVerifyPromocode = (promocode: string) => {
    return api.get(`/verify/promocode/${promocode}`);
};

const requestGetInvites = () => {
    return api.get(`/promocode/invites`);
};

const requestRefreshPromocode = () => {
    return api.get(`/promocode/invite`);
};

const requestGeneratePromocode = (promoCode: string) => {
    return api.post(`/promoCode`, {
        promoCode
    });
};

// function* refreshPromocode() {
//     try {
//         const resp = yield call(requestRefreshPromocode);

//         // console.log('refresh', JSON.stringify(resp, null, 2));

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message || 'Algo de errado aconteceu...');
//         }

//         yield put(refreshPromocodeSuccessAction());
//         yield put(onGetUserData());
//     } catch (err) {
//         yield put(refreshPromocodeFailAction());
//     }
// }

// function* verifyPromocode(action: VerifyPromocodeAction) {
//     try {
//         const resp = yield call(requestVerifyPromocode, action.promocode);

//         // console.log(resp, action.promocode);

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message || 'Algo de errado aconteceu...');
//         }

//         yield put(verifyPromocodeSuccessAction());

//         if (!resp.data.isValidPromoCode) {
//             yield put(
//                 setAlertMessageAction({
//                     title: 'Oops',
//                     message: 'O promocode digitado é inválido',
//                     type: 'error'
//                 })
//             );
//         } else {
//             yield put(
//                 changeSignUpPayloadAction({
//                     key: 'promocode',
//                     value: action.promocode
//                 })
//             );
//             action.navigation.push('SignUp', {
//                 screen: 'DocumentNumber'
//             });
//         }
//     } catch (err) {
//         Sentry.captureException(err);
//         yield put(verifyPromocodeFailAction());
//     }
// }

// function* generatePromocode(action: GeneratePromocodeAction) {
//     try {
//         const resp = yield call(requestGeneratePromocode, action.promocode);

//         // console.log(resp);

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

//         yield put(generatePromocodeSuccessAction());
//         if (resp.data.promoCode) {
//             yield put(onGetUserData());
//             action.navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'General' }, { name: 'Invite' }]
//             });
//         }
//     } catch (err) {
//         Sentry.captureException(err);
//         yield put(generatePromocodeFailAction());
//     }
// }

// function* getInvites() {
//     try {
//         const resp = yield call(requestGetInvites);

//         // console.log('invites', resp);

//         if (resp.error || resp.statusCode === 500) {
//             // if (resp.statusCode === 403) {
//             //     yield new Promise((resolve) => {
//             //         Alert.alert('Atenção', 'Entre em sua conta novamente', [
//             //             { text: 'OK', onPress: resolve }
//             //         ]);
//             //     });
//             //     yield put(removeTokenAction());
//             //     return;
//             // }
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message || 'Algo de errado aconteceu...');
//         }

//         yield put(getPromocodeInvitesSuccessAction(resp));
//     } catch (err) {
//         Sentry.captureException(err);
//         yield put(getPromocodeInvitesFailAction());
//     }
// }

function* refreshPromocode() {
    const resp = yield callWrapperService(requestRefreshPromocode);

    // console.log('refresh', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(refreshPromocodeSuccessAction());
        yield put(onGetUserData());
    } else {
        yield put(refreshPromocodeFailAction());
    }
}

function* verifyPromocode(action: VerifyPromocodeAction) {
    const resp = yield callWrapperService(
        requestVerifyPromocode,
        action.promocode
    );

    // console.log(resp, action.promocode);

    if (resp) {
        yield put(verifyPromocodeSuccessAction());

        if (!resp.data.isValidPromoCode) {
            yield put(
                setAlertMessageAction({
                    title: 'Oops',
                    message: 'O promocode digitado é inválido',
                    type: 'error'
                })
            );
        } else {
            yield put(
                changeSignUpPayloadAction({
                    key: 'promocode',
                    value: action.promocode
                })
            );
            action.navigation.push('SignUp', {
                screen: 'DocumentNumber'
            });
        }
    } else {
        yield put(verifyPromocodeFailAction());
    }
}

function* generatePromocode(action: GeneratePromocodeAction) {
    const resp = yield callWrapperService(
        requestGeneratePromocode,
        action.promocode
    );

    // console.log(resp);

    if (resp) {
        yield put(generatePromocodeSuccessAction());
        if (resp.data.promoCode) {
            yield put(onGetUserData());
            action.navigation.reset({
                index: 0,
                routes: [{ name: 'General' }, { name: 'Invite' }]
            });
        }
    } else {
        yield put(generatePromocodeFailAction());
    }
}

function* getInvites() {
    const resp = yield callWrapperService(requestGetInvites);

    // console.log('invites', resp);

    if (resp?.data) {
        yield put(getPromocodeInvitesSuccessAction(resp.data));
    } else {
        yield put(getPromocodeInvitesFailAction());
    }
}

export default all([
    takeLatest(VERIFY_PROMO_CODE, verifyPromocode),
    takeLatest(GENERATE_PROMO_CODE, generatePromocode),
    takeLatest(GET_PROMO_CODE_INVITES, getInvites),
    takeLatest(REFRESH_POMO_CODE, refreshPromocode)
]);
