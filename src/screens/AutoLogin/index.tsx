import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// Store
import {
    setDidAutoLoginAction,
    saveUserAuthAction,
    checkCodepushEnvironmentAction,
    saveUserInfoAction
} from '../../store/ducks/auth/actions';
import { IApplicationState } from '../../store/types';

const AutoLogin: React.FC = () => {
    const dispatch = useDispatch();
    const didCheckEnvironment = useSelector(
        (state: IApplicationState) => state.auth.didCheckEnviroment
    );
    const didMount = () => {
        const verifyIsAuth = async () => {
            if (!didCheckEnvironment) {
                // TODO old code to verify environment
                // Pushwoosh.getHwid((hwid: string) =>
                //     dispatch(checkCodepushEnvironmentAction(hwid))
                // );
            }
            const token = await AsyncStorage.getItem('authToken');
            const accountHolderId = await AsyncStorage.getItem(
                'accountHolderId'
            );
            const accountId = await AsyncStorage.getItem('accountId');
            const userName = await AsyncStorage.getItem('userName');
            const userAccount = await AsyncStorage.getItem('userAccount');
            const userBranch = await AsyncStorage.getItem('userBranch');
            const username = await AsyncStorage.getItem('username');

            if (!token) {
                dispatch(setDidAutoLoginAction());
                return;
            }

            dispatch(
                saveUserAuthAction({
                    token,
                    accountHolderId: accountHolderId!,
                    accountId: accountId!,
                    revalidated: false
                })
            );
            if (userName) {
                dispatch(
                    saveUserInfoAction({
                        name: userName!,
                        account: userAccount!,
                        branch: userBranch!,
                        username: username!
                    })
                );
            }
            dispatch(setDidAutoLoginAction());
        };
        verifyIsAuth();
    };

    useEffect(didMount, []);

    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
};

export default AutoLogin;
