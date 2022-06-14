import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import NewPassword from '../../../screens/ResetPassword/NewPassword';
import NewPasswordConfirmation from '../../../screens/ResetPassword/NewPasswordConfirmation';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { ResetPasswordStackList as Routes } from '../types';

const Stack = createStackNavigator<Routes>();

const ResetPassword: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="NewPassword"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerTitle: 'Nova senha de acesso',
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: 'Roboto-Medium'
                }
            }}
        >
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen
                name="NewPasswordConfirmation"
                component={NewPasswordConfirmation}
            />
        </Stack.Navigator>
    );
};

export default ResetPassword;
