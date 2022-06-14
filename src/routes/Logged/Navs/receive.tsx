import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import OptionScreen from '../../../screens/Logged/Receive/OptionScreen';
import QrCodeValueScreen from '../../../screens/Logged/Receive/ValueScreenBACKUP'
import ValueScreen from '../../../screens/Logged/Receive/ValueScreen';
import QrCodeScreenBACKUP from '../../../screens/Logged/Receive/QrCodeScreenBACKUP';
import PixQrCodeScreen from '../../../screens/Logged/Receive/PixQrCodeScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { ReceiveStackList as Routes } from '../types';

interface IReceiveProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const ReceiveNav: React.FC<IReceiveProps> = ({ navRef }: IReceiveProps) => {
    return (
        <Stack.Navigator
            initialRouteName="PixQRCode"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Receber via PIX',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navRef?.current.goBack()}>
                        <Image
                            source={require('../../../../assets/icons/back.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18,
                                marginLeft: Platform.OS === 'ios' ? 27 : 16
                            }}
                        />
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
            <Stack.Screen name="Value" component={ValueScreen} />
            <Stack.Screen name="QrCodeValue" component={QrCodeValueScreen} options={{headerTitle: 'Receber via QR Code'}}/>
            <Stack.Screen
                name="PixQRCode"
                component={PixQrCodeScreen}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navRef?.current.reset({
                                    index: 0,
                                    routes: [{ name: 'General' }]
                                })
                            }
                        >
                            <Image
                                source={require('../../../../assets/icons/close.png')}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 18,
                                    marginLeft: Platform.OS === 'ios' ? 27 : 16
                                }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => <HmlTag />
                }}
            />
            <Stack.Screen
                name="QRCode"
                component={QrCodeScreenBACKUP}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navRef?.current.reset({
                                    index: 0,
                                    routes: [{ name: 'General' }]
                                })
                            }
                        >
                            <Image
                                source={require('../../../../assets/icons/close.png')}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 18,
                                    marginLeft: Platform.OS === 'ios' ? 27 : 16
                                }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => <HmlTag />,
                    headerTitle: 'Receber via QR Code',
                }}
            /> 
        </Stack.Navigator>
    );
};

export default ReceiveNav;
