import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
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
import CapacityFinancialScreen from '../../../screens/SignUp/FinancialCapacity';

// Store
import { IApplicationState } from '../../../store/types';

// Styles

// Navigation Types
import { SignUpStackList as Routes } from '../types';

const Stack = createStackNavigator<Routes>();

const SignUp: React.FC = () => {
    const postalCode = useSelector(
        (state: IApplicationState) => state.signUp.payload.postalCode
    );

    // register cnpj flow is desativated on app
    return (
        <Stack.Navigator initialRouteName="PromoCode" headerMode="none">
            <Stack.Screen name="PromoCode" component={PromoCode} />
            <Stack.Screen
                name="DocumentNumber"
                component={DocumentNumberScreen}
            />
            <Stack.Screen name="Sex" component={SexScreen} />
            <Stack.Screen name="Company" component={CompanyNameScreen} />
            <Stack.Screen name="BusinessArea" component={BusinessLineScreen} />
            <Stack.Screen
                name="ConstitutionForm"
                component={ConstitutionFormScreen}
            />
            {/* <Stack.Screen
                name="EstablishmentDate"
                component={EstablishmentDateScreen}
            /> */}
            <Stack.Screen name="ZipCode" component={ZipcodeScreen} />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text allowFontScaling={false}>CEP {postalCode}</Text>
                    )
                }}
            />
            <Stack.Screen name="Name" component={NameScreen} />
            <Stack.Screen
                name="RepresentativeTaxId"
                component={RepresentativeTaxIdScreen}
            />
            <Stack.Screen
                name="ExistingRepresentative"
                component={ExistingRepresentativeScreen}
            />
            <Stack.Screen name="MotherName" component={MotherNameScreen} />
            <Stack.Screen name="BirthDate" component={BirthDateScreen} />
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen name="Email" component={EmailScreen} />
            <Stack.Screen name="Password" component={PasswordScreen} />
            <Stack.Screen
                name="PasswordConfirmation"
                component={PasswordConfirmationScreen}
            />
            <Stack.Screen
                name="CapacityFinancial"
                component={CapacityFinancialScreen}
            />

            <Stack.Screen name="Agreement" component={AgreementScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
    );
};

export default SignUp;
