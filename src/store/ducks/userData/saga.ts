import {
    all,
    takeLatest,
    put,
    select,
    race,
    delay,
    take
} from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { USER_DATA_REQUEST } from './types';

// Actions
import { didGetUserDataFail, didGetUserDataSucceed } from './actions';
import { getBannerAction } from '../banner/actions';
import { getDepositBilletsAction } from '../depositBillets/actions';
import { getStatementMonthButtonsAction } from '../statement/actions';
import { requestBalanceAction } from '../balance/actions';
import { getCashbackBalanceAction } from '../cashback/actions';
import {
    removeTokenAction,
    saveUserInfoAction,
    setConnectionErrorAction
} from '../auth/actions';
import { getPromocodeInvitesAction } from '../promocode/actions';
import { getCardBizAction } from '../card/actions';
import { getRechargeServicesAction } from '../rechargeServices/actions';
import { getInsurancesAction } from '../insurance/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const getUserData = () => {
    return api.get(`/client/data`);
};

function* onGetUserData() {
    const { resp, timeout }: { resp: any; timeout: any } = yield race({
        resp: callWrapperService(getUserData),
        timeout: delay(15 * 1000)
    });

    // console.log('user data', JSON.stringify(resp, null, 2));

    if (timeout) {
        yield put(setConnectionErrorAction(true));
        return;
    }

    if (resp?.data) {
        if (resp.data.logout) {
            yield put(removeTokenAction());
            return;
        }

        yield all([
            put(requestBalanceAction()),
            put(getCashbackBalanceAction()),
            put(getBannerAction()),
            put(getRechargeServicesAction()),
            put(
                saveUserInfoAction({
                    name: resp.data.client.name,
                    account: resp.data.account.account.toString(),
                    branch: resp.data.account.branch.toString(),
                    username: resp.data.client.taxIdentifier.taxId
                })
            )
        ]);

        /* if (resp.data.client.cardBiz === 'ATIVADO') {
            yield put(getCardBizAction());
            yield race({
                success: take('GET_CARD_BIZ_SUCCESS'),
                fail: take('GET_CARD_BIZ_FAIL')
            });
        } */

        yield put(didGetUserDataSucceed(resp.data));
        yield all([
            put(getPromocodeInvitesAction()),
            put(getDepositBilletsAction())
        ]);
        yield put(getStatementMonthButtonsAction());
    } else {
        yield put(didGetUserDataFail());
    }
}

export default all([takeLatest(USER_DATA_REQUEST, onGetUserData)]);
