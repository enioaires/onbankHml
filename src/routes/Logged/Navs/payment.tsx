import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import BarCodeScreen from '../../../screens/Logged/Payments/BarCodeScreen';
import PaymentScreen from '../../../screens/Logged/Payments/PaymentScreen';
import OptionScreen from '../../../screens/Logged/Payments/OptionScreen';
import CameraScreen from '../../../screens/Logged/Payments/CameraScreen';
import QRCodeScanScreen from '../../../screens/Logged/Payments/QRCodeScanScreen';
import QRCodeConfirmationScreen from '../../../screens/Logged/Payments/QRCodeConfirmationScreen';
import CreditInstallmentsScreen from '../../../screens/Logged/Payments/CreditInstallmentsScreen';
import AmountScreen from '../../../screens/Logged/Payments/AmountScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { PaymentsStackList as Routes } from '../types';

interface IPaymentsProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const PaymentsNav: React.FC<IPaymentsProps> = ({ navRef }: IPaymentsProps) => {
    const { name } = navRef?.current.getCurrentRoute();
    return (
        <Stack.Navigator
            initialRouteName="Option"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Pagar',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navRef?.current.goBack()}>
                        {name !== "Payment" && (
                            <Image
                                source={require('../../../../assets/icons/back.png')}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 18,
                                    marginLeft: Platform.OS === 'ios' ? 27 : 16
                                }}
                            />
                        )}
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <HmlTag>
                        <TouchableOpacity
                            onPress={() => navRef?.current.navigate('UserHelp')}
                        >
                            <Image
                                source={require('../../../../assets/icons/new_icons/help-gray.png')}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                    marginRight: 25
                                }}
                            />
                        </TouchableOpacity>
                    </HmlTag>
                )
            }}
        >
            <Stack.Screen name="Option" component={OptionScreen} />
            <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    headerTitle: 'Escanear código',
                    headerTintColor: colors.white,
                    headerRight: undefined
                }}
            />
            <Stack.Screen name="BarCode" component={BarCodeScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen
                name="CreditInstallments"
                component={CreditInstallmentsScreen}
            />
            <Stack.Screen
                name="QRCodeScan"
                component={QRCodeScanScreen}
                options={{
                    headerRight: undefined,
                    headerTitle: 'Escanear QR Code'
                }}
            />
            <Stack.Screen
                name="QRCodeConfirmation"
                component={QRCodeConfirmationScreen}
            />
            <Stack.Screen name="Amount" component={AmountScreen} />
        </Stack.Navigator>
    );
};

export default PaymentsNav;