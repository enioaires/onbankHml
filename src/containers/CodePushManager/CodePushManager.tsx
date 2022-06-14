import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import CodePush from 'react-native-code-push';
import { getUniqueId } from 'react-native-device-info';

import api from '../../api';
import {
    didCheckedCodepushEnvironmentAction,
    setCodepushEnvironmentAction
} from '../../store/ducks/auth/actions';
import { IApplicationState } from '../../store/types';
import { ENABLE_HML_BY_DEVICE_ID } from '../../utils/variables';

const requestCodepushEnvironment = async (hwid: string) => {
    const res = await api.post('/verify/hwid/stage', { hwid });
    return !!res;
};

const codepushKeys = {
    hml: Platform.select({
        ios: 'i0GGQrK0sQulqzfkB_zfavu_hBgoGfaBnL0lA',
        android: 'GA0y8fouCVBWN7bbvI0T-bEQOgyxksEElf1d8'
    }),
    production: Platform.select({
        ios: 'Cl09esiD5lZN9tAUvkaLolt5Na7AWSCvewU8u',
        android: 'rjhNvfdD6MsXPEBH9hA684CA5GmRMABvkZVnx'
    })
};

const CodePushManager = () => {
    const dispatch = useDispatch();
    const didCheckEnvironment = useSelector(
        (state: IApplicationState) => state.auth.didCheckEnviroment
    );
    const didMount = () => {
        if (!didCheckEnvironment) {
            CodePush.notifyAppReady().then(() => {
                Pushwoosh.getHwid((hwid: string) => {
                    requestCodepushEnvironment(hwid).then(async (isHml) => {
                        const deviceId = getUniqueId();
                        if (
                            isHml ||
                            ENABLE_HML_BY_DEVICE_ID.includes(deviceId)
                        ) {
                            api.setBaseURL('https://hml-api.onbank.digital');
                            await CodePush.sync({
                                deploymentKey: codepushKeys.hml,
                                installMode: CodePush.InstallMode.IMMEDIATE,
                                updateDialog: {
                                    title: 'Atualização disponivel'
                                }
                            }).then(() => {
                                dispatch(setCodepushEnvironmentAction(true));
                                dispatch(didCheckedCodepushEnvironmentAction());
                            });
                        } else {
                            CodePush.sync({
                                deploymentKey: codepushKeys.production,
                                installMode: CodePush.InstallMode.IMMEDIATE
                            });
                        }
                    });
                });
            });
        }
    };
    useEffect(() => {
        didMount();
    }, []);

    return null;
};

export default CodePushManager;
