import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, Platform, Text } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { isEmulator } from 'react-native-device-info';

// Navs
import Help from './Navs/help';
import ResetPassword from './Navs/resetPassword';
import SignUp from './Navs/signUp';

// Screens
import Login from '../../screens/Login';
import ForgotPassword from '../../screens/ForgotPassword';
import OnBoarding from '../../screens/OnBoarding';
import IsEmulatorScreen from '../../screens/isEmulatorScreen';

// Components
import HmlTag from '../../components/HmlTag';

// Style
import colors from '../../styles/colors';

// Navigation Type
import { AuthStackList } from './types';
import { IApplicationState } from '../../store/types';

const AuthStack = createStackNavigator<AuthStackList>();

interface IAuthNavProps {
    navRef: React.RefObject<NavigationContainerRef>;
}

export default function AuthNav({ navRef }: IAuthNavProps) {
    const userInfo = useSelector(
        (state: IApplicationState) => state.auth.userInfo
    );

    const verifyIsEmulator = () => {
        isEmulator().then((isEmulator) => {
            if (isEmulator) {
                navRef?.current?.reset({
                    index: 0,
                    routes: [{ name: 'IsEmulator' }]
                });
            }
        });
    };

    // Comment this function if you are using emulator to development
    useEffect(() => {
        // verifyIsEmulator();
    }, []);

    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                // headerShown: false,
                headerTitle: '',
                headerBackTitle: ' ',
                headerTransparent: true,
                headerTintColor: colors.gray.second,
                headerBackImage: () => (
                    <Image
                        source={require('../../../assets/icons/back.png')}
                        resizeMode="contain"
                        style={{
                            width: 22,
                            height: 25,
                            marginLeft: Platform.OS === 'ios' ? 27 : 16
                        }}
                    />
                ),
                headerRight: () => (
                    <HmlTag>
                        <TouchableOpacity
                            onPress={() => navRef?.current?.navigate('Help')}
                        >
                            <Image
                                source={require('../../../assets/icons/new_icons/help-gray.png')}
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
            <AuthStack.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{
                    headerShown: true,
                    headerRight: () => <HmlTag />
                }}
            />
            <AuthStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerTransparent: false,
                    headerShown: false,
                    headerRight: () => <HmlTag />
                }}
            />
            <AuthStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerTitle: 'Recuperação de senha',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 18,
                        fontFamily: 'Roboto-Medium'
                    }
                }}
            />
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
            <AuthStack.Screen
                name="Help"
                component={Help}
                options={{
                    headerRight: () => <HmlTag />
                }}
            />
            <AuthStack.Screen
                name="IsEmulator"
                component={IsEmulatorScreen}
                options={{
                    // headerShown: false,
                    headerTitle: 'Erro',
                    headerBackTitle: ' ',
                    headerTransparent: true,
                    headerBackImage: () => null,
                    headerRight: () => null
                }}
            />
        </AuthStack.Navigator>
    );
}