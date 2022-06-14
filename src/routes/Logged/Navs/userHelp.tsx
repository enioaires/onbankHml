import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import OptionsScreen from '../../../screens/HelpScreens/OptionsScreen';
import FAQScreen from '../../../screens/HelpScreens/FAQScreen';
import ChatScreen from '../../../screens/HelpScreens/ChatScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { UserHelpStackList as Routes } from '../types';

interface IUserHelpProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const UserHelpNav: React.FC<IUserHelpProps> = ({ navRef }: IUserHelpProps) => {
    return (
        <Stack.Navigator
            initialRouteName="Options"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
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
            <Stack.Screen
                name="Options"
                component={OptionsScreen}
                options={{ headerTitle: '' }}
            />
            <Stack.Screen
                name="FAQ"
                component={FAQScreen}
                options={{
                    headerTitle: 'Dúvidas frequentes'
                }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerTitle: 'Chat Onbank' }}
            />
        </Stack.Navigator>
    );
};

export default UserHelpNav;
