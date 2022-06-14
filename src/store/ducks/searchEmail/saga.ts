import { all, takeLatest, put, call } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { REQUEST_SEARCH_EMAIL } from './types';

// Actions
import {
    didSearchEmailFailAction,
    didSearchEmailSucceedAction,
    RequestSearchEmailAction
} from './actions';
import { validateSignUpInputsAction } from '../signUp/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestSearchEmail = (email: string) => {
    return api.get(`/verify/client/email/${email}`);
};

// function* searchEmail(action: RequestSearchEmailAction) {
//     try {
//         const resp = yield call(() =>
//             requestSearchEmail(action.email.toUpperCase())
//         );

//         // console.log(JSON.stringify(resp, null, 2));

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message);
//         }

//         yield put(didSearchEmailSucceedAction());

//         if (resp.data.isClient) {
//             yield put(
//                 validateSignUpInputsAction({
//                     key: 'email',
//                     value: '* Email já cadastrado.'
//                 })
//             );
//         } else if (action.accountFlux === 'demo') {
//             action.navigation.push('SignUp', { screen: 'Password' });
//         } else {
//             action.initiateIdWallSdk();
//         }
//     } catch (err) {
//         yield put(didSearchEmailFailAction());
//     }
// }

function* searchEmail(action: RequestSearchEmailAction) {
    const resp = yield callWrapperService(
        requestSearchEmail,
        action.email.toUpperCase()
    );

    // console.log(JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didSearchEmailSucceedAction());

        if (resp.data.isClient) {
            yield put(
                validateSignUpInputsAction({
                    key: 'email',
                    value: '* Email já cadastrado.'
                })
            );
        } else if (action.accountFlux === 'demo') {
            action.navigation.push('SignUp', { screen: 'Password' });
        } else {
            action.initiateIdWallSdk();
        }
    } else {
        yield put(didSearchEmailFailAction());
    }
}

export default all([takeLatest(REQUEST_SEARCH_EMAIL, searchEmail)]);
