/* eslint-disable react/jsx-props-no-spreading */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ReceiveHome from '../../../screens/Logged/PixPanel/Receipt/Receipt';
import colors from '../../../styles/colors';
import Header from '../../../components/Header/Header';
import AddDescription from '../../../screens/Logged/PixPanel/Receipt/AddDescription/AddDescription';
import ReceiveQrCode from '../../../screens/Logged/PixPanel/Receipt/ReceiveQrCode/ReceiveQrCode';

export type PixPaymentStackList = {
    Receive: undefined;
    PaymentPixKey: undefined;
    AddDescription: undefined;
    ConfirmReceive: undefined;
    ReceiveQrCode: undefined;
};
const Stack = createStackNavigator<PixPaymentStackList>();

const NewPixReceiveNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="Receive"
            headerMode="screen"
            screenOptions={{
                headerTitle: 'Receber com PIX',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                header: (props) => <Header {...props} />
            }}
        >
            <Stack.Screen name="Receive" component={ReceiveHome} />

            <Stack.Screen name="AddDescription" component={AddDescription} />

            <Stack.Screen name="ConfirmReceive" component={ReceiveHome} />
            <Stack.Screen name="ReceiveQrCode" component={ReceiveQrCode} />
        </Stack.Navigator>
    );
};

export default NewPixReceiveNav;
