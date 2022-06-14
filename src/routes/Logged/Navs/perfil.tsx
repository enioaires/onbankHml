import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';

// Components
import MainScreen from '../../../screens/Logged/Perfil/MainScreen';
import ChangeSignUPDataScreen from '../../../screens/Logged/Perfil/ChangeSignUpDataScreen';
import NumberScreen from '../../../screens/Logged/Perfil/NumberScreen';
import EmailScreen from '../../../screens/Logged/Perfil/EmailScreen';
import NewPasswordScreen from '../../../screens/Logged/Perfil/NewPasswordScreen';
import ConfirmationNewPasswordScreen from '../../../screens/Logged/Perfil/ConfirmationNewPasswordScreen';
import NewTransactionPasswordScreen from '../../../screens/Logged/Perfil/NewTransactionPasswordScreen';
import ConfirmationNewTransactionPasswordScreen from '../../../screens/Logged/Perfil/ConfirmationNewTransactionPasswordScreen';
import SelfieCameraScreen from '../../../screens/Logged/Perfil/SelfieCameraScreen';
import FrontCameraScreen from '../../../screens/Logged/Perfil/FrontCameraScreen';
import PicturePreview from '../../../screens/Logged/Perfil/PicturePreview';
import ValidateAccessPasswordScreen from '../../../screens/Logged/Perfil/ValidateAccessPasswordScreen';
import ZipcodeScreen from '../../../screens/Logged/Perfil/ZipcodeScreen';
import AddressScreen from '../../../screens/Logged/Perfil/AddressScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Store
// import { IApplicationState } from '../../../store/types';

// Navigation Type
import { PerfilStackList as Routes } from '../types';

interface IPerfilProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const PerfilNav: React.FC<IPerfilProps> = ({ navRef }: IPerfilProps) => {
    // const zipcode = useSelector(
    //     (state: IApplicationState) => state.addressNew.payload.postalCode
    // );

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Perfil',
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
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
                name="SignUpData"
                component={ChangeSignUPDataScreen}
                options={{
                    headerTitle: 'Dados cadastrais'
                }}
            />
            <Stack.Screen
                name="ChangePhone"
                component={NumberScreen}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="ChangeEmail"
                component={EmailScreen}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="NewAccessPassword"
                component={NewPasswordScreen}
                options={{
                    headerTitle: 'Senha de acesso'
                }}
            />
            <Stack.Screen
                name="NewAccessPasswordConfirmation"
                component={ConfirmationNewPasswordScreen}
                options={{
                    headerTitle: 'Senha de acesso'
                }}
            />
            <Stack.Screen
                name="NewTransactionPassword"
                component={NewTransactionPasswordScreen}
                options={{
                    headerTitle: 'Senha'
                }}
            />
            <Stack.Screen
                name="NewTransactionPasswordConfirmation"
                component={ConfirmationNewTransactionPasswordScreen}
                options={{
                    headerTitle: 'Senha'
                }}
            />
            <Stack.Screen
                name="SelfieCamera"
                component={SelfieCameraScreen}
                options={{
                    headerTitle: 'Selfie',
                    headerRight: undefined
                }}
            />
            <Stack.Screen
                name="DocumentCamera"
                component={FrontCameraScreen}
                options={{
                    headerTitle: 'Documento',
                    headerRight: undefined
                }}
            />
            <Stack.Screen
                name="Preview"
                component={PicturePreview}
                options={{
                    headerTitle: 'Pré-visualização'
                }}
            />
            <Stack.Screen
                name="ValidateAccess"
                component={ValidateAccessPasswordScreen}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="ZipCode"
                component={ZipcodeScreen}
                options={{
                    headerTitle: 'Endereço'
                }}
            />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
                options={{
                    // headerTitle: () => (
                    //     <Text>{`CEP ${zipcode.substring(
                    //         0,
                    //         5
                    //     )}-${zipcode.substring(5)}`}</Text>
                    // )
                    headerTitle: 'Endereço'
                }}
            />
        </Stack.Navigator>
    );
};

export default PerfilNav;
