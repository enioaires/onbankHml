import React from 'react';
import {
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

// Components
import HmlTag from '../../../components/HmlTag';
import OptionScreen from '../../../screens/Logged/RechargeServices/OptionScreen';
import ServiceScreen from '../../../screens/Logged/RechargeServices/ServiceScreen';
import LatestScreen from '../../../screens/Logged/RechargeServices/LatestScreen';
import HistoryScreen from '../../../screens/Logged/RechargeServices/HistoryScreen';

// Navigation Type
import { RechargeServicesStackList as Routes } from '../types';

// Styles
import colors from '../../../styles/colors';

// Types
interface IRechargeServicesProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const RechargeServicesNav: React.FC<IRechargeServicesProps> = ({ navRef }: IRechargeServicesProps) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.white,
                headerBackTitle: ' ',
                headerTitle: 'Recargas',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navRef?.current.goBack()}
                        style={{paddingLeft: Platform.OS === 'ios' ? 27 : 16}}
                    >
                        {/* <Image
                            source={require('../../../../assets/icons/back.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18,
                                marginLeft: Platform.OS === 'ios' ? 27 : 16
                            }}
                        /> */}
                        <Feather
                            name='arrow-left'
                            size={30}
                            color={colors.white}
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
            }}
        >
            <Stack.Screen 
                name="Option" 
                component={OptionScreen}
            />
            <Stack.Screen 
                name="Service" 
                component={ServiceScreen}
            />
            <Stack.Screen 
                name="Latest" 
                component={LatestScreen}
            />
            <Stack.Screen 
                name="History" 
                component={HistoryScreen}
                options={{
                    headerTitle: 'Histórico de Recargas'
                }}
            />
        </Stack.Navigator>
    );
};

export default RechargeServicesNav;