import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import PasswordScreen from '../../../screens/Logged/AddTransactionPassword/PasswordScreen';
import PasswordConfirmationScreen from '../../../screens/Logged/AddTransactionPassword/PasswordConfirmationScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { AddTransactionPasswordStackList as Routes } from '../types';

interface IAddTransactionPasswordProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const AddTransactionPassword: React.FC<IAddTransactionPasswordProps> = ({
    navRef
}: IAddTransactionPasswordProps) => {
    return (
        <Stack.Navigator
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
                headerRight: () => <HmlTag />
            }}
        >
            <Stack.Screen name="Password" component={PasswordScreen} />
            <Stack.Screen
                name="PasswordConfirmation"
                component={PasswordConfirmationScreen}
            />
        </Stack.Navigator>
    );
};

export default AddTransactionPassword;
