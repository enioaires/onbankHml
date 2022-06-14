import { all, takeLatest, put, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { UPDATE_USER_DATA, UPDATE_USER_PHONE } from './types';

// Actions
import {
    didUpdateUserDataFailAction,
    didUpdateUserDataSucceedAction,
    UpdateUserDataAction,
    UpdateUserPhoneAction
} from './actions';
import { onGetUserData } from '../userData/actions';
import { showSuccessModalAction } from '../successModal/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';
import { showRegisterCardBizModalAction } from '../card/actions';

const requestUpdateUserData = (payload: any) => {
    return api.put(`/account`, payload);
};

const requestUpdateUserPhone = (payload: any) => {
    return api.put(`/sms/revalidate`, payload);
};

function* updateUserData(action: UpdateUserDataAction) {
    const cardBizStatus: string = yield select(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    const resp = yield callWrapperService(requestUpdateUserData, {
        ...action.payload
    });

    // console.log('updateData', JSON.stringify(resp, null, 2));
    // console.log(JSON.stringify(action.payload, null, 2));

    if (resp) {
        yield put(onGetUserData());
        yield put(didUpdateUserDataSucceedAction());

        if (action.isCardRequest && action.navigation) {
            action.navigation.pop();
            if (cardBizStatus === 'CANCELADO') {
                yield put(showRegisterCardBizModalAction());
            } else {
                action.navigation.push('Card', {
                    screen: 'ChooseNameCard'
                });
            }
        } else {
            yield put(showSuccessModalAction('Dados alterados com sucesso.'));
        }
    } else {
        yield put(didUpdateUserDataFailAction());
    }
}

function* updateUserPhone(action: UpdateUserPhoneAction) {
    const resp = yield callWrapperService(
        requestUpdateUserPhone,
        action.payload
    );

    // console.log(JSON.stringify(resp, null, 2));
    // console.log(JSON.stringify(action.payload, null, 2))

    if (resp) {
        yield put(onGetUserData());
        yield put(didUpdateUserDataSucceedAction());
        yield put(showSuccessModalAction('Dados alterados com sucesso.'));
    } else {
        yield put(didUpdateUserDataFailAction());
    }
}

export default all([
    takeLatest(UPDATE_USER_DATA, updateUserData),
    takeLatest(UPDATE_USER_PHONE, updateUserPhone)
]);
