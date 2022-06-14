/* eslint-disable react/jsx-props-no-spreading */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PaymentPixKey from '../../../screens/Logged/PixPanel/Payment/PaymentPixKey/PaymentPixKey';
import PaymentPixQRCode from '../../../screens/Logged/PixPanel/Payment/PaymentPixQRCode/PaymentPixQRCode';
import PaymentHome from '../../../screens/Logged/PixPanel/Payment/Payment';
import PaymentAmount from '../../../screens/Logged/PixPanel/Payment/PaymentAmount/PaymentAmount';
import colors from '../../../styles/colors';
import Header from '../../../components/Header/Header';
import AddDescription from '../../../screens/Logged/PixPanel/Payment/PaymentAmount/AddDescription/AddDescription';
import PaymentSuccess from '../../../screens/Logged/PixPanel/Payment/PaymentSuccess/PaymentSuccess';
import PaymentCopyPaste from '../../../screens/Logged/PixPanel/Payment/PaymentCopyPaste/PaymentCopyPaste';
import PaymentBankData from '../../../screens/Logged/PixPanel/Payment/PaymentBankData/PaymentBankData';

export type PixPaymentStackList = {
    Payment: undefined;
    PaymentPixKey: undefined;
    PaymentPixQRCode: undefined;
    PaymentAmount: undefined;
    AddDescription: undefined;
    ConfirmTransfer: undefined;
    PaymentSuccess: undefined;
    PaymentCopyPaste: undefined;
    PaymentBankData: undefined;
};
const Stack = createStackNavigator<PixPaymentStackList>();

const NewPixPaymentNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="Payment"
            headerMode="screen"
            screenOptions={{
                headerTitle: 'Pagar com PIX',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                header: (props) => <Header {...props} isPayment />
            }}
        >
            <Stack.Screen name="Payment" component={PaymentHome} />
            <Stack.Screen name="PaymentPixKey" component={PaymentPixKey} />
            <Stack.Screen
                name="PaymentPixQRCode"
                component={PaymentPixQRCode}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaymentCopyPaste"
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
            <Stack.Screen name="PaymentBankData" component={PaymentBankData} />

            <Stack.Screen name="AddDescription" component={AddDescription} />

            <Stack.Screen name="PaymentAmount" component={PaymentAmount} />
            <Stack.Screen name="ConfirmTransfer" component={PaymentAmount} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        </Stack.Navigator>
    );
};

export default NewPixPaymentNav;
