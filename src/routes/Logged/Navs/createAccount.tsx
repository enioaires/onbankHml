import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Image, Platform } from 'react-native';
import { useSelector } from 'react-redux';

// Navs
import BusinessLineScreen from '../../../screens/SignUp/BusinessLineScreen';
import NameScreen from '../../../screens/SignUp/NameScreen';
import DocumentNumberScreen from '../../../screens/SignUp/DocumentNumberScreen';
import EmailScreen from '../../../screens/SignUp/EmailScreen';
import PhoneScreen from '../../../screens/SignUp/PhoneScreen';
import PasswordScreen from '../../../screens/SignUp/PasswordScreen';
import PasswordConfirmationScreen from '../../../screens/SignUp/PasswordConfirmationScreen';
import RepresentativeTaxIdScreen from '../../../screens/SignUp/RepresentativeTaxId';
import CompanyNameScreen from '../../../screens/SignUp/CompanyScreen';
import BirthDateScreen from '../../../screens/SignUp/BirthDateScreen';
import AgreementScreen from '../../../screens/SignUp/AgreementScreen';
import TermsScreen from '../../../screens/SignUp/TermsScreen';
import ConstitutionFormScreen from '../../../screens/SignUp/ConstitutionFormScreen';
import MotherNameScreen from '../../../screens/SignUp/MotherNameScreen';
import ExistingRepresentativeScreen from '../../../screens/SignUp/ExistingRepresentativeScreen';
import ZipcodeScreen from '../../../screens/SignUp/ZipcodeScreen';
import AddressScreen from '../../../screens/SignUp/AddressScreen';
import PromoCode from '../../../screens/PromoCode';
import Confirmation from '../../../screens/SignUp/Confirmation';
import SexScreen from '../../../screens/SignUp/SexScreen';

// Store
import { IApplicationState } from '../../../store/types';

// Styles

// Navigation Types
import { SignUpStackList as Routes } from '../../Auth/types';
import colors from '../../../styles/colors';

const Stack = createStackNavigator<Routes>();
interface ICreateAccountProps {
    navRef: any;
}

const CreateAccount: React.FC<ICreateAccountProps> = ({
    navRef
}: ICreateAccountProps) => {
    const postalCode = useSelector(
        (state: IApplicationState) => state.signUp.payload.postalCode
    );
    const currentRoute = navRef?.current?.getCurrentRoute()?.name;
    // register cnpj flow is desativated on app
    return (
        <Stack.Navigator
            initialRouteName="DocumentNumber"
            // headerMode="none"
            screenOptions={{
                headerTitle: '',
                headerBackTitle: ' ',
                headerTransparent: true,
                headerTintColor: colors.gray.second,
                headerBackImage: () => {
                    if (currentRoute === 'Confirmation') {
                        return null;
                    }
                    return (
                        <Image
                            source={require('../../../../assets/icons/back.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 25,
                                marginLeft: Platform.OS === 'ios' ? 27 : 16
                            }}
                        />
                    );
                }
            }}
        >
            <Stack.Screen name="PromoCode" component={PromoCode} />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="DocumentNumber"
                component={DocumentNumberScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="Sex"
                component={SexScreen}
            />

            {/* <Stack.Screen
                name="EstablishmentDate"
                component={EstablishmentDateScreen}
            /> */}
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="ZipCode"
                component={ZipcodeScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="Address"
                component={AddressScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text allowFontScaling={false}>CEP {postalCode}</Text>
                    )
                }}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="Name"
                component={NameScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="RepresentativeTaxId"
                component={RepresentativeTaxIdScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="ExistingRepresentative"
                component={ExistingRepresentativeScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="MotherName"
                component={MotherNameScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="BirthDate"
                component={BirthDateScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="Phone"
                component={PhoneScreen}
            />
            <Stack.Screen
                initialParams={{ routeContext: 'CreateAccount' }}
                name="Email"
                component={EmailScreen}
            />
            <Stack.Screen
                options={{ headerLeft: undefined }}
                initialParams={{ routeContext: 'CreateAccount' }}
                name="Confirmation"
                component={Confirmation}
            />
        </Stack.Navigator>
    );
};

export default CreateAccount;
