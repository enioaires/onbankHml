import { all, takeLatest, call, put, race, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import codePush from 'react-native-code-push';
import { Platform } from 'react-native';

// Types
import {
    SAVE_USER_AUTH,
    REMOVE_USER_AUTH,
    CHECK_CODEPUSH_ENVIRONMENT,
    SAVE_USER_INFO
} from './types';

// Api
import api from '../../../api';

// Actions
import {
    setCodepushEnvironmentAction,
    SaveUserAuthAction,
    CheckCodepushEnvironmentAction,
    removeTokenStoreAction,
    setConnectionErrorAction,
    SaveUserInfoAction
} from './actions';
import { clearBalanceAction } from '../balance/actions';
import { clearUserDataAction } from '../userData/actions';
import { cancelSessionExpirationAction } from '../session/actions';

const requestLogout = () => {
    return api.get('/logout');
};

const requestCodepushEnvironment = (hwid: string) => {
    return api.post('/verify/hwid/stage', { hwid });
};

function* saveToken(action: SaveUserAuthAction) {
    api.setHeader('Authorization', `Bearer ${action.payload.token}`);
    api.setHeader('AccountId', action.payload.accountId);

    yield call(() =>
        AsyncStorage.multiSet([
            ['authToken', action.payload.token],
            ['accountHolderId', action.payload.accountHolderId],
            ['accountId', action.payload.accountId]
        ])
    );
}

function* saveUserInfo(action: SaveUserInfoAction) {
    yield call(() =>
        AsyncStorage.multiSet([
            ['userName', action.payload.name],
            ['userAccount', action.payload.account],
            ['userBranch', action.payload.branch],
            ['username', action.payload.username]
        ])
    );
}

function* removeToken() {
    yield call(() =>
        AsyncStorage.multiRemove([
            'authToken',
            'accountHolderId',
            'accountId',
            'userName',
            'userAccount',
            'userBranch',
            'username'
        ])
    );
    yield call(requestLogout);
    yield all([
        put(clearBalanceAction()),
        put(clearUserDataAction()),
        put(cancelSessionExpirationAction())
    ]);
    yield put(removeTokenStoreAction());
    api.deleteHeader('Authorization');
    api.deleteHeader('AccountId');
}
function appReady({ deploymentKey, installMode, updateDialog }: any): any {
    return codePush.notifyAppReady().then(
        codePush.sync({
            deploymentKey,
            installMode,
            updateDialog
        })
    );
}

function* checkCodepushEnvironment(action: CheckCodepushEnvironmentAction) {
    try {
        const resp: any = yield call(requestCodepushEnvironment, action.hwid);

        console.log('checkCodePushEnvironmont', JSON.stringify(resp, null, 2));

        // const isHml = !!resp?.data;

        const isHml = !!resp;

        if (isHml) {
            api.setBaseURL('https://hml-api.onbank.digital');
            yield put(setCodepushEnvironmentAction(true));
        }

        let key = '';

        if (Platform.OS === 'ios') {
            if (isHml) {
                key = 'i0GGQrK0sQulqzfkB_zfavu_hBgoGfaBnL0lA';
            } else {
                key = 'Cl09esiD5lZN9tAUvkaLolt5Na7AWSCvewU8u';
            }
        }

        if (Platform.OS === 'android') {
            if (isHml) {
                key = 'GA0y8fouCVBWN7bbvI0T-bEQOgyxksEElf1d8';
            } else {
                key = 'rjhNvfdD6MsXPEBH9hA684CA5GmRMABvkZVnx';
            }
        }
        //BEFORE  call(codePush.sync)
        const { verify, timeout } = yield race({
            verify: call(appReady, {
                deploymentKey: key,
                installMode: codePush.InstallMode.IMMEDIATE,
                updateDialog: isHml
            }),
            timeout: delay(15 * 1000)
        });

        if (timeout) {
            throw new Error('Network request failed');
        }
    } catch (err) {
        if (err.message.match(/Network request failed/)) {
            yield put(setConnectionErrorAction(true));
        }
    }
}

export default all([
    takeLatest(SAVE_USER_AUTH, saveToken),
    takeLatest(REMOVE_USER_AUTH, removeToken),
    takeLatest(CHECK_CODEPUSH_ENVIRONMENT, checkCodepushEnvironment),
    takeLatest(SAVE_USER_INFO, saveUserInfo)
]);
