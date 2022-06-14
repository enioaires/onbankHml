import React from 'react';
import {
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

// Components
import HmlTag from '../../../components/HmlTag';
import OptionScreen from '../../../screens/Logged/Insurance/OptionScreen';
import InsuranceScreen from '../../../screens/Logged/Insurance/InsuranceScreen';
import UserInsuranceScreen from '../../../screens/Logged/Insurance/UserInsurenceScreen';
import LatestScreen from '../../../screens/Logged/Insurance/LatestScreen';
import IncomeScreen from '../../../screens/Logged/Insurance/IncomeScreen';
import MaritalStateScreen from '../../../screens/Logged/Insurance/MaritalStateScreen';
import ConfirmationScreen from '../../../screens/Logged/Insurance/ConfirmationScreen';
import BeneficiaryScreen from '../../../screens/Logged/Insurance/BeneficiaryScreen';
import PercentScreen from '../../../screens/Logged/Insurance/PercentScreen';
import ValidateTokenScreen from '../../../screens/Logged/Insurance/ValidateToken';

// Navigation Type
import { InsuranceStackList as Routes } from '../types';

// Styles
import colors from '../../../styles/colors';

// Types
interface IInsuranceProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const RechargeServicesNav: React.FC<IInsuranceProps> = ({ navRef }: IInsuranceProps) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.white,
                headerBackTitle: ' ',
                headerTitle: 'Seguro',
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
                )
            }}
        >
            <Stack.Screen 
                name="Option" 
                component={OptionScreen}
            />
            <Stack.Screen 
                name="Insurance"
                component={InsuranceScreen}
            />
            <Stack.Screen 
                name="Latest"
                component={LatestScreen}
            />
            <Stack.Screen 
                name="UserInsurance"
                component={UserInsuranceScreen}
            />
            <Stack.Screen 
                name="Income"
                component={IncomeScreen}
            />
            <Stack.Screen 
                name="MaritalState"
                component={MaritalStateScreen}
            />
            <Stack.Screen 
                name="Confirmation"
                component={ConfirmationScreen}
            />
            <Stack.Screen 
                name="Beneficiary"
                component={BeneficiaryScreen}
            />
            <Stack.Screen 
                name="Percent"
                component={PercentScreen}
            />
            <Stack.Screen 
                name="ValidateToken"
                component={ValidateTokenScreen}
            />
        </Stack.Navigator>
    );
};

export default RechargeServicesNav;