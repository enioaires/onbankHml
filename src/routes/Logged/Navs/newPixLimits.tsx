import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../../../styles/colors';
import Header from '../../../components/Header/Header';
import LimitsHome from '../../../screens/Logged/PixPanel/Limits/Limits';
import Ownership from '../../../screens/Logged/PixPanel/Limits/Ownership/Ownership';
import LimitDetail from '../../../screens/Logged/PixPanel/Limits/LimitDetail/LimitDetail';
import LimitConfig from '../../../screens/Logged/PixPanel/Limits/LimitConfig/LimitConfig';

export type PixLimitsStack = {
    Limits: undefined;
    Ownership: undefined;
    LimitDetail: undefined;
    LimitConfig: undefined;
};
const Stack = createStackNavigator<PixLimitsStack>();

const NewPixLimitsNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="Limits"
            headerMode="screen"
            screenOptions={{
                headerTitle: 'Limites PIX',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                header: (props) => <Header {...props} />
            }}
        >
            <Stack.Screen name="Limits" component={LimitsHome} />
            <Stack.Screen name="Ownership" component={Ownership} />
            <Stack.Screen name="LimitDetail" component={LimitDetail} />
            <Stack.Screen name="LimitConfig" component={LimitConfig} />
        </Stack.Navigator>
    );
};

export default NewPixLimitsNav;
