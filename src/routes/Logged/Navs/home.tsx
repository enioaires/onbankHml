import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components
import HomeScreen from '../../../screens/Logged/Home';
import ReceiptScreen from '../../../screens/Logged/Receipt';
import TransactionPasswordScreen from '../../../containers/TransactionPassword';
import TermsScreen from '../../../screens/Logged/Terms';
import ContestOptions from '../../../screens/Logged/ContestOptions';
import ContestType from '../../../screens/Logged/ContestType';
import ContestDone from '../../../screens/Logged/ContestDone';
import HmlTag from '../../../components/HmlTag';

// Store
import { shareViewShotAction } from '../../../store/ducks/receipt/actions';
import { IApplicationState } from '../../../store/types';

// Navigation Type
import { GeneralStackList as Routes } from '../types';

interface IHomeProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const HomeNav: React.FC<IHomeProps> = ({ navRef }: IHomeProps) => {
    const dispatch = useDispatch();

    const shareReceipt = async () => {
        dispatch(shareViewShotAction());
    };

    const banners = useSelector(
        (state: IApplicationState) => state.banner.data
    );

    const receiptGetBack = () => {
        // console.log('nav lenght', navRef.current.getRootState().routes.length);
        if (
            navRef?.current.getRootState() &&
            navRef.current.getRootState().routes.length > 3
        ) {
            navRef?.current.reset({
                index: 0,
                routes: [{ name: 'General' }]
            });
        } else {
            navRef.current.goBack();
        }
        // navRef?.current.getRootState()
        //     ? navRef?.current.getRootState().routes[
        //           navRef.current.getRootState().routes.length - 2
        //       ].name === 'Statement'
        //         ? () => navRef?.current.goBack()
        //         : () =>
        //               navRef?.current.reset({
        //                   index: 0,
        //                   routes: [{ name: 'General' }]
        //               })
        //     : () =>
        //           navRef?.current.reset({
        //               index: 0,
        //               routes: [{ name: 'General' }]
        //           });
    };
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerBackTitle: ' ',
                headerTitle: '',
                // headerTitle: () =>
                //     banners && banners.length > 0 ? (
                //         <Image
                //             source={require('../../../assets/logo.png')}
                //             resizeMode="contain"
                //             style={{
                //                 width: 110,
                //                 height: 45,
                //                 marginTop: 10
                //             }}
                //         />
                //     ) : undefined,
                headerRight: () =>
                    banners && banners.length > 0 ? (
                        <HmlTag>
                            <TouchableOpacity
                                onPress={() =>
                                    navRef?.current.navigate('UserHelp')
                                }
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
                    ) : undefined,
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
                )
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerLeft: undefined,
                    headerRight: () => <HmlTag />
                }}
            />
            <Stack.Screen
                name="TransactionPassword"
                component={TransactionPasswordScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => null,
                    gestureEnabled: false,
                    animationEnabled: false
                }}
            />
            <Stack.Screen
                name="Terms"
                component={TermsScreen}
                options={{
                    headerTitle: 'Atualização dos Termos',
                    headerLeft: undefined
                }}
            />
            <Stack.Screen
                name="ContestType"
                component={ContestType}
                options={{
                    headerTitle: 'Reportar problema'
                }}
            />
            <Stack.Screen
                name="ContestOptions"
                component={ContestOptions}
                options={{
                    headerTitle: 'Reportar problema'
                }}
            />
            <Stack.Screen
                name="ContestDone"
                component={ContestDone}
                options={{
                    headerTitle: 'Reportar problema'
                }}
            />
            <Stack.Screen
                name="Receipt"
                component={ReceiptScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={receiptGetBack}>
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
                    headerRight: () => (
                        <HmlTag>
                            <TouchableOpacity onPress={shareReceipt}>
                                <Image
                                    source={require('../../../../assets/icons/share.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 25,
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

export default HomeNav;
