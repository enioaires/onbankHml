/* eslint-disable react/jsx-props-no-spreading */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Presentation from '../../../screens/Logged/PixPanel/Withdraw/Presentation';
import ScanQrCode from '../../../screens/Logged/PixPanel/Withdraw/ScanQrCode';
import PaymentAmount from '../../../screens/Logged/PixPanel/Withdraw/PaymentAmount/PaymentAmount';
import AddDescription from '../../../screens/Logged/PixPanel/Withdraw/PaymentAmount/AddDescription/AddDescription';
import Success from '../../../screens/Logged/PixPanel/Withdraw/PaymentSuccess/PaymentSuccess';

export type PixWithdrawStackList = {
    Presentation: undefined;
    ScanQrCode: undefined;
    PaymentAmount: undefined;
    ConfirmTransfer: undefined;
    AddDescription: undefined;
    Success: undefined;
};
const Stack = createStackNavigator<PixWithdrawStackList>();

const PixWithdraw = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Presentation" component={Presentation} />
            <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
            <Stack.Screen name="PaymentAmount" component={PaymentAmount} />
            <Stack.Screen name="ConfirmTransfer" component={PaymentAmount} />
            <Stack.Screen name="AddDescription" component={AddDescription} />
            <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
    );
};

export default PixWithdraw;
