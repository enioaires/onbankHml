import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../../../styles/colors';
import Header from '../../../components/Header/Header';
import AmountScreen from '../../../screens/Logged/PixReceive/Amount/Amount';

// import { Container } from './styles';
export type PixReveice = {
    Amount: undefined;
};
const Stack = createStackNavigator<PixReveice>();

const PixReceiveNav = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerTitle: 'Receber com PIX',
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                header: (props) => <Header {...props} />
            }}
        >
            <Stack.Screen name="Amount" component={AmountScreen} />
        </Stack.Navigator>
    );
};

export default PixReceiveNav;
