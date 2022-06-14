import { all, takeLatest, put } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { ACCEPT_NEW_TERMS } from './types';

// Actions
import {
    AcceptNewTermsAction,
    didAcceptNewTermsFailAction,
    didAcceptNewTermsSucceedAction
} from './actions';
import { onGetUserData } from '../userData/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestAcceptNewTerms = () => {
    return api.put(`/termOfUser`);
};

// function* acceptNewTerms(action: AcceptNewTermsAction) {
//     try {
//         const resp = yield call(requestAcceptNewTerms);

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

//         yield put(didAcceptNewTermsSucceedAction());
//         yield put(onGetUserData());

//         if (action.navigation) {
//             action.navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'Home' }]
//             });
//         }
//     } catch (err) {
//         yield put(didAcceptNewTermsFailAction());
//         yield put(
//             setAlertMessageAction({
//                 title: 'Oops',
//                 message:
//                     err.message ||
//                     'Algo inesperado aconteceu...Tente novamente',
//                 type: 'error'
//             })
//         );
//     }
// }

function* acceptNewTerms(action: AcceptNewTermsAction) {
    const resp = yield callWrapperService(requestAcceptNewTerms);

    // console.log(JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didAcceptNewTermsSucceedAction());
        yield put(onGetUserData());

        if (action.navigation) {
            action.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            });
        }
    } else {
        yield put(didAcceptNewTermsFailAction());
    }
}

export default all([takeLatest(ACCEPT_NEW_TERMS, acceptNewTerms)]);
