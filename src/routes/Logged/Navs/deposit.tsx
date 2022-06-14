import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import OptionScreen from '../../../screens/Logged/Deposit/OptionScreen';
import ValueScreen from '../../../screens/Logged/Deposit/ValueScreen';
import BilletScreen from '../../../screens/Logged/Deposit/BilletScreen';
import HmlTag from '../../../components/HmlTag';
import HistoryScreen from '../../../screens/Logged/Deposit/HistoryScreen';
import HistoryBilletScreen from '../../../screens/Logged/Deposit/HistoryBilletScreen';
import TedOptionScreen from '../../../screens/Logged/Deposit/TedOptionScreen';
import BilletTedScreen from '../../../screens/Logged/Deposit/BilletTedScreen';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { DepositStackList as Routes } from '../types';

interface IDepositProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const DepositNav: React.FC<IDepositProps> = ({ navRef }: IDepositProps) => {
    return (
        <Stack.Navigator
            initialRouteName="Option"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Depositar',
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
                name="Option"
                component={OptionScreen}
                // options={{
                //     headerTitle: "Depositar"
                // }}
            />
            <Stack.Screen
                name="Value"
                component={ValueScreen}
                // options={{
                //     headerTitle: "Depositar"
                // }}
            />
            <Stack.Screen
                name="Billet"
                component={BilletScreen}
                options={{
                    headerTitle: '',
                    headerRight: undefined,
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
                    )
                }}
            />
            <Stack.Screen
                name="TedOption"
                component={TedOptionScreen}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="BilletTed"
                component={BilletTedScreen}
                options={{
                    headerTitle: ''
                    // headerLeft: () => (
                    //     <TouchableOpacity
                    //         onPress={() =>
                    //             navRef?.current.reset({
                    //                 index: 0,
                    //                 routes: [{ name: 'General' }]
                    //             })
                    //         }
                    //     >
                    //         <Image
                    //             source={require('../../../../assets/icons/close.png')}
                    //             resizeMode="contain"
                    //             style={{
                    //                 width: 22,
                    //                 height: 18,
                    //                 marginLeft: Platform.OS === 'ios' ? 27 : 16
                    //             }}
                    //         />
                    //     </TouchableOpacity>
                    // )
                }}
            />
            <Stack.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    headerTitle: 'Histórico de Depósitos'
                }}
            />
            <Stack.Screen
                name="HistoryBillet"
                component={HistoryBilletScreen}
                options={{
                    headerTitle: ''
                }}
            />
        </Stack.Navigator>
    );
};

export default DepositNav;
