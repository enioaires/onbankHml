import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import OptionsScreen from '../../../screens/HelpScreens/OptionsScreen';
import FAQScreen from '../../../screens/HelpScreens/FAQScreen';
import ChatScreen from '../../../screens/HelpScreens/ChatScreen';

// Styles

// Types
import { HelpStackList as Routes } from '../types';

const Stack = createStackNavigator<Routes>();

const Help: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Options" headerMode="none">
            <Stack.Screen
                name="Options"
                component={OptionsScreen}
                options={{ headerTitle: '' }}
            />
            <Stack.Screen
                name="FAQ"
                component={FAQScreen}
                options={{ headerTitle: 'Dúvidas frequentes' }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerTitle: 'Chat Onbank' }}
            />
        </Stack.Navigator>
    );
};

export default Help;
