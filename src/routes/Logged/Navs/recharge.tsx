import React from 'react';
import { TouchableOpacity, Image, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import NumberScreen from '../../../screens/Logged/Recharge/NumberScreen';
import OperatorsScreen from '../../../screens/Logged/Recharge/OperatorsScreen';
import ValuesScreen from '../../../screens/Logged/Recharge/ValuesScreen';
import ConfirmationScreen from '../../../screens/Logged/Recharge/ConfirmationScreen';
import LatestScreen from '../../../screens/Logged/Recharge/LatestScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { RechargeStackList as Routes } from '../types';

interface IRechargeProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const RechargeNav: React.FC<IRechargeProps> = ({ navRef }: IRechargeProps) => {
    return (
        <Stack.Navigator
            initialRouteName="Latest"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: '',
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
            <Stack.Screen
                name="Latest"
                component={LatestScreen}
                options={{
                    headerTitle: 'Recarga'
                }}
            />
            <Stack.Screen
                name="Number"
                component={NumberScreen}
                options={{
                    headerTitle: 'Recarga'
                }}
            />
            <Stack.Screen name="Operators" component={OperatorsScreen} />
            <Stack.Screen name="Values" component={ValuesScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </Stack.Navigator>
    );
};

export default RechargeNav;
