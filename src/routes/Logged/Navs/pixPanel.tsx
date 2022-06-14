/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PixPanelScreen from '../../../screens/Logged/PixPanel/Panel/Panel';
import MyKeysScreen from '../../../screens/Logged/PixPanel/MyKeys/MyKeys';
import RegisterKeyScreen from '../../../screens/Logged/PixPanel/RegisterKey/RegisterKey';
import RequestPortability from '../../../screens/Logged/PixPanel/RegisterKey/RequestPortability/RequestPortability';

import RequestPortabilitySuccess from '../../../screens/Logged/PixPanel/RegisterKey/RequestPortabilitySuccess/RequestPortabilitySuccess';
import PaymentCopyPaste from '../../../screens/Logged/PixPanel/PaymentCopyPaste/PaymentCopyPaste';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { PixPanelStackList as Routes } from '../types';
import Header from '../../../components/Header/Header';
import NewPixPaymentNav from './newPixPayment';
import NewPixReceiptNav from './newPixReceipt';
import PixWithdraw from './PixWithdraw';
import PixChange from './PixChange';
import PaymentAmount from '../../../screens/Logged/PixPanel/PaymentCopyPaste/PaymentAmount/PaymentAmount';
import PaymentSuccess from '../../../screens/Logged/PixPanel/PaymentCopyPaste/PaymentSuccess/PaymentSuccess';
import NewPixLimitsNav from './newPixLimits';

interface IUserHelpProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const PixPanelRoutes = () => {
    const PanelStack = createStackNavigator<Routes>();
    return (
        <PanelStack.Navigator
            initialRouteName="Panel"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: 'Pix',
                header: (props) => <Header {...props} />
            }}
        >
            <Stack.Screen
                name="Panel"
                component={PixPanelScreen}
                options={{
                    headerTitle: 'PIX'
                }}
            />
            <Stack.Screen
                name="MyKeys"
                component={MyKeysScreen}
                options={{
                    headerTitle: 'Chaves cadastradas'
                }}
            />
            <Stack.Screen
                name="RegisterKey"
                component={RegisterKeyScreen}
                options={{ headerTitle: 'Cadastrar chave' }}
            />
            <Stack.Screen
                name="RequestPortability"
                component={RequestPortability}
                options={{ headerTitle: 'Portabilidade PIX' }}
            />
            <Stack.Screen
                name="RequestPortabilitySuccess"
                component={RequestPortabilitySuccess}
                options={{
                    headerTitle: 'Portabilidade PIX',
                    headerBackTitleVisible: false
                }}
            />
            <Stack.Screen
                name="PaymentCopyPastePanel"
                component={PaymentCopyPaste}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current: { progress } }) => ({
                        cardStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 0.5, 0.9, 1],
                                outputRange: [0, 0.25, 0.7, 1]
                            })
                        },
                        overlayStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                                extrapolate: 'clamp'
                            })
                        }
                    })
                }}
            />
            <Stack.Screen
                name="PaymentAmountPanel"
                options={{ headerTitle: 'Pagar com PIX' }}
                component={PaymentAmount}
            />
            <Stack.Screen
                options={{ headerTitle: 'Pagar com PIX' }}
                name="ConfirmTransferPanel"
                component={PaymentAmount}
            />

            <Stack.Screen
                options={{ headerTitle: 'Pagar com PIX' }}
                name="PaymentSuccessPanel"
                component={PaymentSuccess}
            />

            <Stack.Screen name="ConfirmTransfer" component={PaymentAmount} />
            <Stack.Screen
                name="Withdraw"
                options={{
                    headerTitle: 'Pix Saque'
                }}
                component={PixWithdraw}
            />
            <Stack.Screen
                name="Change"
                options={{
                    headerTitle: 'Pix Troco'
                }}
                component={PixChange}
            />
        </PanelStack.Navigator>
    );
};
const PixPanelNav = () => {
    return (
        <Stack.Navigator initialRouteName="Panel" headerMode="none">
            <Stack.Screen name="Panel" component={PixPanelRoutes} />
            <Stack.Screen name="Payment" component={NewPixPaymentNav} />
            <Stack.Screen name="Receive" component={NewPixReceiptNav} />
            <Stack.Screen name="Limits" component={NewPixLimitsNav} />
        </Stack.Navigator>
    );
};

export default PixPanelNav;
