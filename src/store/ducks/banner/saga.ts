import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { GET_BANNER } from './types';
import { IApplicationState } from '../../types';

// Actions
import { didGetBannerFailAction, didGetBannerSucceedAction } from './actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestGetBanner = () => {
    return api.get(`/banner`);
};

// function* getBanner() {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     try {
//         const resp = yield call(() => requestGetBanner(accountId));

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
//             throw new Error(resp.message);
//         }

//         yield put(didGetBannerSucceedAction(resp.data));
//     } catch (err) {
//         yield put(didGetBannerFailAction());
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

function* getBanner() {
    const resp: any = yield callWrapperService(requestGetBanner);

    // console.log('banner', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didGetBannerSucceedAction(resp.data));
    } else {
        yield put(didGetBannerFailAction());
    }
}

export default all([takeLatest(GET_BANNER, getBanner)]);
