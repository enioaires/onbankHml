import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    Text,
    Keyboard,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Alert,
    StatusBar
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import TouchID, { AuthenticationError } from 'react-native-touch-id';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// Components
import { ILoginPayload } from 'src/store/ducks/login/types';
import TouchFaceIdModal from '../../containers/TouchFaceIdModal';
import ActionButton from '../../components/ActionButton';
import TextInput from '../../components/TextInput';

// Store
import { IApplicationState } from '../../store/types';
import {
    loginAction,
    clearLoginStateAction,
    changeLoginPayloadAction
} from '../../store/ducks/login/actions';
import { removeTokenAction } from '../../store/ducks/auth/actions';

// Styles
import colors from '../../styles/colors';
import { paddings } from '../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen, getNameInitials } from '../../utils/helpers';
import { prefityNames } from '../../utils/prettiers';

// Navigation Types
import { StackNavigationProps, AuthStackList } from '../../routes/Auth/types';

const isSmallScreen = isDeviceSmallScreen();

const Login: React.FC<StackNavigationProps<AuthStackList, 'Login'>> = ({
    navigation
}: StackNavigationProps<AuthStackList, 'Login'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive, offset } = useIsKeyboardActive(
        isSmallScreen ? -90 : -120
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

    const [passwordVisible, setPasswordVisible] =
        useState<'notVisible' | 'visible'>('notVisible');

    const [touchFaceIdModal, setTouchFaceIdModal] = useState(false);
    const [touchFaceIdAble, setTouchFaceIdAble] = useState(false);

    const isButtonDisabled = useMemo(() => {
        if (credentials) return false;

        if (userInfo) {
            return loginPayload.password.trim().length <= 5;
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
                        Alert.alert('Autenticação', 'A autenticação falhou.');
                    } else if (
                        error.message === 'User canceled authentication' ||
                        error.message === 'System canceled authentication'
                    ) {
                        Alert.alert(
                            'Autenticação',
                            'A autenticação foi cancelada.'
                        );
                    } else if (error.message === 'Biometry lockout') {
                        Alert.alert(
                            'Autenticação',
                            'Foram feitas muitas tentativas. Tente novamente mais tarde.'
                        );
                    } else if (error.message === 'Biometry permanent lockout') {
                        Alert.alert(
                            'Autenticação',
                            `Você excedeu o limite de tentativas. A autenticação por ${authenticationType} foi desabilitada`
                        );
                    }
                });
        } else {
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
        <View style={styles.container}>
            {!!userInfo && (
                <>
                    <StatusBar barStyle="light-content" />
                    <LinearGradient
                        style={styles.accountInfoContainer}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[colors.blue.fourth, colors.blue.primary]}
                        useAngle
                        angle={120}
                        angleCenter={{ x: 0.1, y: 0.3 }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View style={styles.initialsBox}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.initials}
                                >
                                    {getNameInitials(userInfo.name)}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: 18,
                                        color: colors.white,
                                        fontFamily: 'Roboto-Medium',
                                        marginBottom: 4
                                    }}
                                >
                                    Olá,{' '}
                                    {prefityNames(userInfo.name.split(' ')[0])}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontSize: 13,
                                            color: colors.white,
                                            fontFamily: 'Roboto-Regular',
                                            marginRight: 8
                                        }}
                                    >
                                        Ag 000{userInfo.branch.toString()}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontSize: 13,
                                            color: colors.white,
                                            fontFamily: 'Roboto-Regular'
                                        }}
                                    >
                                        Cc {userInfo.account.toString()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.white,
                                paddingHorizontal: 8,
                                borderRadius: 10,
                                height: 25,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => dispatch(removeTokenAction())}
                        >
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontSize: 13,
                                    color: colors.blue.second,
                                    fontFamily: 'Roboto-Medium'
                                }}
                            >
                                Alternar conta
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </>
            )}
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
                    <View style={styles.top}>
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        translateY: offset
                                    }
                                ]
                            }}
                        >
                            <Image
                                style={[
                                    styles.logo,
                                    userInfo && { marginTop: 80 }
                                ]}
                                source={require('../../../assets/logo.png')}
                                resizeMode="contain"
                            />
                            {/* <Text
                                allowFontScaling={false}
                                style={[
                                    styles.text,
                                    isKeyboardActive &&
                                        isSmallScreen && { display: 'none' }
                                ]}
                            >
                                Seja bem-vindo!
                            </Text> */}
                            {!userInfo && (
                                <View
                                    style={{
                                        marginBottom: 24,
                                        marginTop: 30
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
                                    marginBottom: 14
                                }}
                            >
                                <TextInput
                                    password={passwordVisible}
                                    maxLength={6}
                                    keyboardType="number-pad"
                                    setPasswordVisible={changePasswordVisible}
                                    name="password"
                                    placeholder="Senha"
                                    onChangeText={onChangeText}
                                    value={loginPayload.password}
                                    secureTextEntry={
                                        passwordVisible === 'notVisible'
                                    }
                                    placeholderTextColor={colors.gray.primary}
                                    invalid={
                                        loginPayloadValidations.password
                                            .length > 0
                                    }
                                />
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
                                            {authenticationType}
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
                        </Animated.View>
                    </View>
                    <ActionButton
                        label="Entrar"
                        style={styles.button}
                        disabled={isButtonDisabled}
                        onPress={submitLogin}
                        isLoading={isActionLoading}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text
                            allowFontScaling={false}
                            style={styles.bottomText}
                        >
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        // backgroundColor: 'pink',
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    avoiding: {
        flex: 1
    },
    top: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: Dimensions.get('screen').height < 800 ? 40 : 100
    },
    logo: {
        width: 130,
        height: 55,
        marginBottom: 30,
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
    bottomText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: colors.blue.second
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
    accountInfoContainer: {
        backgroundColor: colors.blue.second,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        // height: 110,
        paddingTop: getStatusBarHeight() + 20,
        paddingHorizontal: 25,
        paddingBottom: 10,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    initialsBox: {
        width: 45,
        height: 45,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginRight: 15
    },
    initials: {
        fontSize: 20,
        color: colors.blue.second,
        fontFamily: 'Roboto-Medium'
    }
});

export default Login;
