import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import MainScreen from '../../../screens/Logged/Invite/MainScreen';
import EmailScreen from '../../../screens/Logged/Invite/EmailScreen';
import Promocode from '../../../screens/PromoCode';
import AccountsList from '../../../screens/Logged/Invite/AccountsList';
import Header from '../../../components/Header/Header';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { InviteStackList as Routes } from '../types';

interface IInviteProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();
 
const InviteNav: React.FC<IInviteProps> = ({ navRef }: IInviteProps) => {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Convidar',
                header: (props) => <Header {...props} />
            }}
        >
            <Stack.Screen
                name="Promocode"
                component={Promocode}
                options={{
                    headerTitle: 'Gerar Promocode'
                }}
            />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Email" component={EmailScreen} />
            <Stack.Screen
                name="AccountsList"
                component={AccountsList}
                options={{
                    headerTitle: ''
                }}
            />
        </Stack.Navigator>
    );
};

export default InviteNav;
