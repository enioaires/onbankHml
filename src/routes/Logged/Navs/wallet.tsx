import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import OptionScreen from '../../../screens/Logged/Wallet/OptionScreen';
import NewCardScreen from '../../../screens/Logged/Wallet/NewCardScreen';
import HmlTag from '../../../components/HmlTag';
import ZipcodeScreen from '../../../screens/Logged/Wallet/ZipcodeScreen';
import AddressScreen from '../../../screens/Logged/Wallet/AddressScreen';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { WalletStackList as Routes } from '../types';

interface IWalletProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const WalletNav: React.FC<IWalletProps> = ({ navRef }: IWalletProps) => {
    return (
        <Stack.Navigator
            initialRouteName="Option"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Carteira',
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
            <Stack.Screen
                name="NewCard"
                options={{
                    headerTitle: 'Adicionar Cartão'
                }}
                component={NewCardScreen}
            />
            <Stack.Screen
                name="NewAddressZipcode"
                options={{
                    headerTitle: 'Novo endereço'
                }}
                component={ZipcodeScreen}
            />
            <Stack.Screen
                name="NewAddress"
                options={{
                    headerTitle: 'Novo endereço'
                }}
                component={AddressScreen}
            />
        </Stack.Navigator>
    );
};

export default WalletNav;
