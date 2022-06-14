import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

// Components
import HmlTag from '../../../components/HmlTag';
import CardTraffic from '../../../screens/Logged/Card/CardTraffic';
import ActivateCard from '../../../screens/Logged/Card/ActivateCard';
import ActiveCard from '../../../screens/Logged/Card/ActiveCard';
import ChooseNameCard from '../../../screens/Logged/Card/ChooseNameCard';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { CardStackList as Routes } from '../types';

interface ICardProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const CardNav: React.FC<ICardProps> = ({ navRef }: ICardProps) => {
    return (
        <Stack.Navigator
            initialRouteName="Traffic"
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
            <Stack.Screen
                name="Active"
                component={ActiveCard}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navRef?.current.reset({
                                    index: 0,
                                    routes: [{ name: 'General' }]
                                })
                            }
                        >
                            <Feather
                                name='arrow-left'
                                size={30}
                                color={colors.white}
                                style={{ marginLeft: Platform.OS === 'ios' ? 27 : 16 }}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <HmlTag>
                            <TouchableOpacity
                                onPress={() => navRef?.current.navigate('UserHelp')}
                            >
                                <Image
                                    source={require('../../../../assets/icons/new_icons/help-white.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 23,
                                        height: 23,
                                        marginRight: 25
                                    }}
                                />
                            </TouchableOpacity>
                        </HmlTag>
                    ),
                    headerTitle: 'Cartão',
                    headerTintColor: colors.white,
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen name="Traffic" component={CardTraffic} />
            <Stack.Screen
                name="Activate"
                component={ActivateCard}
                options={{
                    headerTitle: 'Ativação de cartão'
                }}
            />
            <Stack.Screen name="ChooseNameCard" component={ChooseNameCard} />
        </Stack.Navigator>
    );
};

export default CardNav;
