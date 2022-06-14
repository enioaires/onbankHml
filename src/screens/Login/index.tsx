import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
    Platform,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import TouchID, { AuthenticationError } from 'react-native-touch-id';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Entypo from 'react-native-vector-icons/Entypo';

// Components
import { ILoginPayload } from 'src/store/ducks/login/types';
import TouchFaceIdModal from '../../containers/TouchFaceIdModal';
import ActionButton from '../../components/ActionButton';
import TextInput from '../../components/TextInput';
import LoginPasswordInputs from '../../components/LoginPasswordInputs';
import AccountInfoContainer from '../../components/AccountInfoContainer';
import HmlTag from '../../components/HmlTag';

// Store
import { IApplicationState } from '../../store/types';
import {
    loginAction,
    clearLoginStateAction,
    changeLoginPayloadAction
} from '../../store/ducks/login/actions';
import { removeTokenAction } from '../../store/ducks/auth/actions';
import { setAlertMessageAction } from '../../store/ducks/alert/actions';

// Styles
import colors from '../../styles/colors';
import { paddings } from '../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../utils/helpers';

// Navigation Types
import { StackNavigationProps, AuthStackList } from '../../routes/Auth/types';

const isSmallScreen = isDeviceSmallScreen();

const Login: React.FC<StackNavigationProps<AuthStackList, 'Login'>> = ({
    navigation
}: StackNavigationProps<AuthStackList, 'Login'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive, offset } = useIsKeyboardActive(
        isSmallScreen ? -30 : -60
    );
    const isActionLoading = useSelector(
        (state: IApplicationState) => state.login.isLoading
    );
    const authenticationType = useSelector(
        (state: IApplicationState) => state.auth.authenticationType
    );
    const credentials = useSelector(
        (state: IApplicationState) => state.auth.keychainCredentials,
        shallowEqual
    );
    const loginPayload = useSelector(
        (state: IApplicationState) => state.login.payload,
        shallowEqual
    );
    const loginPayloadValidations = useSelector(
        (state: IApplicationState) => state.login.validations,
        shallowEqual
    );
    const userInfo = useSelector(
        (state: IApplicationState) => state.auth.userInfo,
        shallowEqual
    );

    // password with input balls
    const [inputBlocksVisible, setInputBlocksVisible] = useState(false);

    // state to change password input mask
    const [passwordVisible, setPasswordVisible] =
        useState<'notVisible' | 'visible'>('notVisible');

    const [touchFaceIdModal, setTouchFaceIdModal] = useState(false);
    const [touchFaceIdAble, setTouchFaceIdAble] = useState(false);

    // a logic to activate the main submit login button
    const isButtonDisabled = useMemo(() => {
        if (credentials) return false;

        if (userInfo) {
            const passwordDisplayed = loginPayload.password.trim().length;
            return passwordDisplayed > 0 && passwordDisplayed < 6;
        }

        return (
            Object.values(loginPayloadValidations).some(
                (value) => !!value.trim()
            ) ||
            loginPayload.password.trim().length <= 5 ||
            (loginPayload.username.trim().replace(/\D/g, '').length !== 11 &&
                loginPayload.username.trim().replace(/\D/g, '').length !== 14)
        );
    }, [loginPayload, loginPayloadValidations, userInfo, credentials]);

    const changePasswordVisible = () => {
        setPasswordVisible((oldstate: 'notVisible' | 'visible') =>
            oldstate === 'notVisible' ? 'visible' : 'notVisible'
        );
    };

    const onChangeText = (name: string, value: string) => {
        dispatch(changeLoginPayloadAction(name as keyof ILoginPayload, value));
    };

    const submitLogin = () => {
        Keyboard.dismiss();
        if (credentials && !loginPayload.password) {
            TouchID.authenticate(`Entrar com ${authenticationType}`, {
                title: ``, // Android
                imageColor: colors.blue.second, // Android
                imageErrorColor: colors.text.invalid, // Android
                sensorDescription: authenticationType, // Android
                sensorErrorDescription: 'Identificação falhou', // Android
                cancelText: 'Cancelar', // Android
                fallbackLabel: '', // iOS (if empty, then label is hidden)
                unifiedErrors: true, // use unified error messages (default false)
                passcodeFallback: false
            })
                .then(async () => {
                    Pushwoosh.getHwid((hwid: string) => {
                        dispatch(
                            loginAction(
                                {
                                    username: credentials.username,
                                    password: credentials.password,
                                    hwid
                                },
                                navigation
                            )
                        );
                    });
                })
                .catch((error: AuthenticationError) => {
                    if (error.message === 'Authentication failed') {
                        Alert.alert('Autenticação', 'A autenticação falhou.', [
                            {
                                text: 'Digite sua senha',
                                onPress: () => setInputBlocksVisible(true)
                            },
                            { text: 'OK' }
                        ]);
                    } else if (
                        error.message === 'User canceled authentication' ||
                        error.message === 'System canceled authentication'
                    ) {
                        Alert.alert(
                            'Autenticação',
                            'A autenticação foi cancelada.',
                            [
                                {
                                    text: 'Digite sua senha',
                                    onPress: () => setInputBlocksVisible(true)
                                },
                                { text: 'OK' }
                            ]
                        );
                    } else if (error.message === 'Biometry lockout') {
                        Alert.alert(
                            'Autenticação',
                            'Foram feitas muitas tentativas. Tente novamente mais tarde.',
                            [
                                {
                                    text: 'Digite sua senha',
                                    onPress: () => setInputBlocksVisible(true)
                                },
                                { text: 'OK' }
                            ]
                        );
                    } else if (error.message === 'Biometry permanent lockout') {
                        Alert.alert(
                            'Autenticação',
                            `Você excedeu o limite de tentativas. A autenticação por ${authenticationType} foi desabilitada`,
                            [
                                {
                                    text: 'Digite sua senha',
                                    onPress: () => setInputBlocksVisible(true)
                                },
                                { text: 'OK' }
                            ]
                        );
                    }
                });
        } else if (loginPayload.password) {
            Pushwoosh.getHwid((hwid: string) => {
                const { username, password } = loginPayload;
                const unmaskedDocument = userInfo
                    ? userInfo.username
                    : username.replace(/\D/g, '');
                if (touchFaceIdAble) {
                    dispatch(
                        loginAction(
                            { username: unmaskedDocument, password, hwid },
                            navigation,
                            true
                        )
                    );
                } else {
                    dispatch(
                        loginAction(
                            { username: unmaskedDocument, password, hwid },
                            navigation
                        )
                    );
                }
            });
        } else {
            setInputBlocksVisible(true);
        }
    };

    const clearLoginState = useCallback(
        () => dispatch(clearLoginStateAction()),
        [dispatch]
    );

    useEffect(() => {
        return () => {
            clearLoginState();
        };
    }, [clearLoginState]);

    return (
        <LinearGradient
            style={[styles.container]}
            colors={[colors.blue.third, colors.white]}
            start={{ x: 0, y: -0.5 }}
            end={{ x: 0, y: 0.4 }}
        >
            <KeyboardAvoidingView behavior="padding" style={styles.avoiding}>
                <SafeAreaView
                    style={[
                        styles.safeArea,
                        isKeyboardActive && { marginBottom: 20 }
                    ]}
                >
                    <TouchFaceIdModal
                        isVisible={touchFaceIdModal}
                        setIsVisible={setTouchFaceIdModal}
                        authenticationType={authenticationType!}
                        setTouchFaceIdAble={setTouchFaceIdAble}
                        isFirstTime={!credentials}
                    />
                    <View style={styles.headerContainer}>
                        <View style={styles.changeAccountContainer}>
                            <TouchableOpacity
                                onPress={() => dispatch(removeTokenAction())}
                                style={{
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={styles.textChangeAccount}
                                    allowFontScaling={false}
                                >
                                    {!!userInfo ? 'Alternar conta' : ''}
                                </Text>
                            </TouchableOpacity>
                            <HmlTag>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center'
                                    }}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Help')}
                                >
                                    <Entypo
                                        name="help-with-circle"
                                        size={22}
                                        color={colors.blue.fifth}
                                    />
                                </TouchableOpacity>
                            </HmlTag>
                        </View>
                        <View style={styles.logoContainer}>
                            <Image
                                style={[
                                    styles.logo,
                                    userInfo
                                        ? { marginTop: 40 }
                                        : { marginTop: 20 }
                                ]}
                                source={require('../../../assets/logo.png')}
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            {!userInfo && (
                                <View
                                    style={{
                                        marginBottom: 24,
                                        marginTop: 24
                                    }}
                                >
                                    <TextInput
                                        name="username"
                                        placeholder="CPF/CNPJ"
                                        onChangeText={onChangeText}
                                        value={loginPayload.username}
                                        autoCapitalize="none"
                                        type="custom"
                                        options={{
                                            mask:
                                                loginPayload.username.replace(
                                                    /\D/g,
                                                    ''
                                                ).length > 11
                                                    ? '99.999.999/9999-99'
                                                    : '999.999.999-999'
                                        }}
                                        keyboardType="number-pad"
                                        placeholderTextColor={
                                            colors.gray.primary
                                        }
                                        invalid={
                                            loginPayloadValidations.username
                                                .length > 0
                                        }
                                    />
                                    {loginPayloadValidations.username.length >
                                        0 && (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.errorMessage}
                                        >
                                            {loginPayloadValidations.username}
                                        </Text>
                                    )}
                                </View>
                            )}
                            <View
                                style={{
                                    marginBottom: 40
                                }}
                            >
                                {userInfo && inputBlocksVisible ? (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            marginTop: 20
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontFamily: 'Roboto-Bold',
                                                color: colors.blue.fifth
                                            }}
                                        >
                                            Digite sua senha
                                        </Text>
                                        <LoginPasswordInputs
                                            value={loginPayload.password}
                                            setValue={(value) =>
                                                dispatch(
                                                    changeLoginPayloadAction(
                                                        'password',
                                                        value
                                                    )
                                                )
                                            }
                                        />
                                    </View>
                                ) : (
                                    !userInfo && (
                                        <TextInput
                                            password={passwordVisible}
                                            maxLength={6}
                                            keyboardType="number-pad"
                                            setPasswordVisible={
                                                changePasswordVisible
                                            }
                                            name="password"
                                            placeholder="Senha"
                                            onChangeText={onChangeText}
                                            value={loginPayload.password}
                                            secureTextEntry={
                                                passwordVisible === 'notVisible'
                                            }
                                            placeholderTextColor={
                                                colors.gray.primary
                                            }
                                            invalid={
                                                loginPayloadValidations.password
                                                    .length > 0
                                            }
                                        />
                                    )
                                )}
                                {loginPayloadValidations.password.length >
                                    0 && (
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.errorMessage}
                                    >
                                        {loginPayloadValidations.password}
                                    </Text>
                                )}
                                {authenticationType && !credentials && (
                                    <TouchableOpacity
                                        style={styles.authenticationTypeButton}
                                        onPress={() =>
                                            setTouchFaceIdModal(true)
                                        }
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.authenticationType}
                                        >
                                            {touchFaceIdAble
                                                ? `Acesse sua conta para ativar o ${authenticationType}`
                                                : authenticationType}
                                        </Text>
                                        <Icon
                                            size={26}
                                            name={
                                                authenticationType === 'TouchID'
                                                    ? 'fingerprint'
                                                    : 'face-recognition'
                                            }
                                            color={colors.blue.second}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                    {userInfo && !inputBlocksVisible && (
                        <AccountInfoContainer
                            name={userInfo.name}
                            branch={userInfo.branch}
                            account={userInfo.account}
                        />
                    )}
                    <ActionButton
                        label="Entrar"
                        style={styles.button}
                        disabled={isButtonDisabled}
                        onPress={submitLogin}
                        isLoading={isActionLoading}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-around'
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate('ForgotPassword')
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.textForgotButton}
                            >
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>
                        {inputBlocksVisible && userInfo ? (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Help')}
                            >
                                <Text style={styles.textSingupButton}>
                                    Solicite ajuda
                                </Text>
                                <Image
                                    style={{ marginLeft: 10, width: 18, height: 18 }}
                                    source={require('../../../assets/icons/new_icons/help.png')}
                                />
                            </TouchableOpacity>
                        ) : (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.push('SignUp')}
                                >
                                    <Text style={styles.textSingupButton}>
                                        Cadastre-se
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop:
            Platform.OS === 'ios'
                ? 55
                : StatusBar.currentHeight
                ? StatusBar.currentHeight + 10
                : 34
    },
    safeArea: {
        flex: 1,
        alignItems: 'center'
    },
    avoiding: {
        flex: 1
    },
    headerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between'
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 210,
        height: 70,
        alignSelf: 'center',
        marginRight: 20
    },
    text: {
        fontSize: 22,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.fifth,
        marginBottom: 37,
        textAlign: 'center',
        lineHeight: 25
    },
    errorMessage: {
        marginTop: 12,
        fontSize: 14,
        lineHeight: 13,
        color: colors.red,
        fontFamily: 'Roboto-Regular'
    },
    button: {
        marginBottom: 22
    },
    textSingupButton: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: colors.blue.second
    },
    textForgotButton: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: colors.gray.sixth
    },
    authenticationTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    authenticationType: {
        fontSize: 16,
        color: colors.blue.second,
        marginRight: 10
    },
    changeAccountContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    textChangeAccount: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.fifth
    }
});

export default Login;
