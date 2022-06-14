import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateStatus, AppState } from 'react-native';

// Navs
import Home from './Navs/home';
import Recharge from './Navs/recharge';
import Payments from './Navs/payment';
import Deposit from './Navs/deposit';
import Wallet from './Navs/wallet';
import Receive from './Navs/receive';
import AddAddress from './Navs/addAddress';
import UserHelp from './Navs/userHelp';
import Transfer from './Navs/transfer';
import Perfil from './Navs/perfil';
import AddTransactionPassword from './Navs/addTransactionPassword';
import Statement from './Navs/statement';
import Invite from './Navs/invite';
import Card from './Navs/card';
import PixPayment from './Navs/pixPayment';
import RechargeServices from './Navs/rechargeServices';
import Insurance from './Navs/insurance';
import Cashback from './Navs/cashback';

// Apollo
import { IApplicationState } from '../../store/types';

// Store
import { setAlertMessageAction } from '../../store/ducks/alert/actions';
import { acceptNewTermsAction } from '../../store/ducks/terms/actions';

// import { requestBalanceAction } from '../../store/ducks/balance/actions';
import { onGetUserData } from '../../store/ducks/userData/actions';

// Navigation Type
import { UserStackList } from './types';
import CreateAccount from './Navs/createAccount';
import PixPanelNav from './Navs/pixPanel';

const UserStack = createStackNavigator<UserStackList>();

export default function UserNav({ navRef }: any) {
    const dispatch = useDispatch();

    const loginLoading = useSelector(
        (state: IApplicationState) => state.login.isLoading
    );
    const hasTermsToAccept = useSelector(
        (state: IApplicationState) => state.user.data.client.termOfUse
    );

    const appState = useRef(AppState.currentState);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            // dispatch(requestBalanceAction());
            dispatch(onGetUserData());
        }

        appState.current = nextAppState;
    };

    const didMount = () => {
        // if (!hasTermsToAccept) {
        //     dispatch(
        //         setAlertMessageAction({
        //             title: 'Atualização dos termos',
        //             message:
        //                 'Nossos termos de uso sofreram alterações e/ou novas adições. É fundamental que releia para que continue de acordo com nossa política',
        //             action: {
        //                 mainLabel: 'Aceito',
        //                 onPress: () => null,
        //                 secondLabel: 'Visualizar termos',
        //                 secondOnPress: () =>
        //                     navRef?.current.reset({
        //                         index: 0,
        //                         routes: [{ name: 'Terms' }]
        //                     })
        //             }
        //         })
        //     );
        // }
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    };

    useEffect(() => {
        if (!hasTermsToAccept) {
            dispatch(
                setAlertMessageAction({
                    title: 'Atualização dos termos',
                    message:
                        'Nossos termos de uso sofreram alterações e/ou novas adições. É fundamental que releia para que continue de acordo com nossa política',
                    action: {
                        mainLabel: 'Aceito',
                        onPress: () => dispatch(acceptNewTermsAction()),
                        secondLabel: 'Visualizar termos',
                        secondOnPress: () =>
                            navRef?.current.reset({
                                index: 0,
                                routes: [{ name: 'Terms' }]
                            })
                    },
                    type: 'info'
                })
            );
        }
    }, [hasTermsToAccept, dispatch, navRef]);

    useEffect(didMount, []);

    return !loginLoading ? (
        <UserStack.Navigator initialRouteName="General" headerMode="none">
            <UserStack.Screen name="General">
                {() => <Home navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Deposit">
                {() => <Deposit navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Wallet">
                {() => <Wallet navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Card">
                {() => <Card navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Statement">
                {() => <Statement navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Receive">
                {() => <Receive navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Transfer">
                {() => <Transfer navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Payments">
                {() => <Payments navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Recharge">
                {() => <Recharge navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Perfil">
                {() => <Perfil navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="AddAddress">
                {() => <AddAddress navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="AddTransactionPassword">
                {() => <AddTransactionPassword navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="UserHelp">
                {() => <UserHelp navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Invite">
                {() => <Invite navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="PixPayment">
                {() => <PixPayment navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="RechargeServices">
                {() => <RechargeServices navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Insurance">
                {() => <Insurance navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="Cashback">
                {() => <Cashback navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="CreateAccount">
                {() => <CreateAccount navRef={navRef} />}
            </UserStack.Screen>
            <UserStack.Screen name="PixPanel" component={PixPanelNav} />
        </UserStack.Navigator>
    ) : null;
}
