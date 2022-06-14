import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';

// Components
import HmlTag from '../../../components/HmlTag';
import PixOption from '../../../screens/Logged/PixPayment/PixOption';
import PixKeyOption from '../../../screens/Logged/PixPayment/PixKeyOption';
import ValueScreen from '../../../screens/Logged/PixPayment/ValueScreen';
import AmountScreen from '../../../screens/Logged/PixPayment/AmountScreen';
import ConfirmationScreen from '../../../screens/Logged/PixPayment/ConfimationScreen';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { PixPaymentStackList as Routes } from '../types';

//Store

import { clearPixPaymentStateAction } from '../../../store/ducks/pixPayment/actions';

interface IPixPaymentProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const PixPayment: React.FC<IPixPaymentProps> = ({
    navRef
}: IPixPaymentProps) => {
    const dispatch = useDispatch();
    return (
        <Stack.Navigator
            initialRouteName="PixKeyOption"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.white,
                headerBackTitle: ' ',
                headerTitle: 'Pagar com Pix',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navRef?.current.goBack()}
                        style={{ paddingLeft: Platform.OS === 'ios' ? 27 : 16 }}
                    >
                        {/* <Image
                            source={require('../../../../assets/icons/back.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18,
                                marginLeft: Platform.OS === 'ios' ? 27 : 16
                            }}
                        /> */}
                        <Feather
                            name="arrow-left"
                            size={30}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <HmlTag>
                        <TouchableOpacity
                            onPress={() => navRef?.current.navigate('UserHelp')}
                        >
                            <Image
                                source={require('../../../../assets/icons/new_icons/help-white.png')}
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
            <Stack.Screen name="Option" component={PixOption} />
            <Stack.Screen name="PixKeyOption" component={PixKeyOption} />
            <Stack.Screen name="Value" component={ValueScreen} />
            <Stack.Screen name="Amount" component={AmountScreen} />
            <Stack.Screen
                name="Confirmation"
                component={ConfirmationScreen}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navRef?.current.reset({
                                    index: 0,
                                    routes: [{ name: 'General' }]
                                });
                                dispatch(clearPixPaymentStateAction());
                            }}
                        >
                            <Entypo
                                name="cross"
                                size={30}
                                color={colors.white}
                                style={{ marginLeft: 14 }}
                            />
                        </TouchableOpacity>
                    ),
                    gestureEnabled: false,
                    headerRight: () => (
                        <HmlTag>
                            <TouchableOpacity
                                onPress={() =>
                                    navRef?.current.navigate('UserHelp')
                                }
                            >
                                <Image
                                    source={require('../../../../assets/icons/new_icons/help-white.png')}
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
            />
        </Stack.Navigator>
    );
};

export default PixPayment;
