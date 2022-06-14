import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

// Store
import { IApplicationState } from 'src/store/types';
import {
    generatePromocodeAction,
    verifyPromocodeAction
} from '../../store/ducks/promocode/actions';
import { setAlertMessageAction } from '../../store/ducks/alert/actions';
import {
    changeSignUpPayloadAction,
    clearSignUpPayloadAction
} from '../../store/ducks/signUp/actions';
import { clearPhoneValidationStateAction } from '../../store/ducks/phoneValidation/actions';
import { clearSearchClientDataAction } from '../../store/ducks/searchClient/actions';

// Utils
import useIsKeyboardActive from '../../utils/useIsKeyboardActive';

// Components
import TextInput from '../../components/TextInput';
import ProgressBar from '../../components/ProgressBar';

// Styles
import colors from '../../styles/colors';

// NavigationTypes
import { SignUpStackNavigationProps } from '../../routes/Auth/types';
import { InviteStackNavigationProps } from '../../routes/Logged/types';

const PromoCode: React.FC<
    | SignUpStackNavigationProps<'PromoCode'>
    | InviteStackNavigationProps<'Promocode'>
> = ({
    navigation,
    route
}:
    | SignUpStackNavigationProps<'PromoCode'>
    | InviteStackNavigationProps<'Promocode'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive } = useIsKeyboardActive();
    const deviceHeight = useRef(Dimensions.get('window').height);
    const isSmallDevice = useMemo(() => deviceHeight.current < 800, [
        deviceHeight
    ]);
    const loading = useSelector(
        (state: IApplicationState) => state.promocode.isLoading
    );
    const signUpPromocode = useSelector(
        (state: IApplicationState) => state.signUp.payload.promocode
    );

    const isGenerate = useMemo(
        () => route.params && (route.params.type as any),
        [route]
    );
    const [promocode, setPromocode] = useState(
        !isGenerate && route?.params?.promocode ? route.params.promocode : ''
    );

    const isButtonDisabled = useMemo(() => {
        if (!!route.params as any) {
            return promocode.trim().length < 3;
        }
        return promocode.trim().length < 9;
    }, [route, promocode]);

    const pressMainButton = () => {
        if (isGenerate) {
            dispatch(generatePromocodeAction(promocode, navigation));
        } else if (promocode !== signUpPromocode) {
            dispatch(verifyPromocodeAction(promocode, navigation));
        } else {
            navigation.push('SignUp', {
                screen: 'DocumentNumber'
            });
        }
    };

    const nextScreen = () => {
        if (isGenerate) {
            navigation.goBack();
        } else {
            // dispatch(
            //     setAlertMessageAction({
            //         title: 'Importante!',
            //         message:
            //             'Estamos em período de teste. Neste momento, apenas convidados poderão ter uma conta Onbank'
            //     })
            // );
            setPromocode('');
            dispatch(
                changeSignUpPayloadAction({
                    key: 'promocode',
                    value: ''
                })
            );
            navigation.push('SignUp', {
                screen: 'DocumentNumber'
            });
        }
    };

    const clearState = useCallback(() => {
        dispatch(clearSignUpPayloadAction());
        dispatch(clearPhoneValidationStateAction());
        dispatch(clearSearchClientDataAction());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            clearState();
        };
    }, [clearState]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {!isGenerate && (
                    <View style={styles.progressContainer}>
                        <ProgressBar totalSteps={11} currentStep={0} />
                    </View>
                )}
                <KeyboardAvoidingView
                    behavior="padding"
                    keyboardVerticalOffset={70}
                    style={styles.keyboardArea}
                >
                    <Image
                        source={require('../../../assets/icons/promocode-icon.png')}
                        style={[
                            styles.icon,
                            isKeyboardActive &&
                                isSmallDevice && { display: 'none' }
                        ]}
                    />
                    <Text allowFontScaling={false} style={styles.text}>
                        {isGenerate
                            ? 'Você ainda não gerou seu promocode'
                            : 'Te enviaram um promocode?'}
                    </Text>
                    <Text allowFontScaling={false} style={styles.text}>
                        {isGenerate
                            ? 'Escolha 3 letras para gerá-lo'
                            : 'Insira-o abaixo'}
                    </Text>
                    {!isGenerate && (
                        <TouchableOpacity
                            style={[styles.button, { marginTop: 15 }]}
                            activeOpacity={0.6}
                            onPress={nextScreen}
                        >
                            <Text style={styles.buttonText}>
                                Não tenho promocode
                            </Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={promocode}
                            onChangeText={(name, value) => setPromocode(value)}
                            maxLength={isGenerate ? 3 : 9}
                            autoCorrect={false}
                            autoCapitalize="characters"
                            type={!isGenerate ? undefined : 'custom'}
                            options={
                                !isGenerate
                                    ? undefined
                                    : {
                                          mask: 'AAA'
                                      }
                            }
                        />
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            isButtonDisabled &&
                                styles.buttonTextDisabled &&
                                styles.buttonDisabled,
                            { marginBottom: 15 }
                        ]}
                        activeOpacity={0.6}
                        onPress={pressMainButton}
                        disabled={isButtonDisabled || loading}
                    >
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color={colors.blue.second}
                            />
                        ) : (
                            <Text
                                style={[
                                    styles.buttonText,
                                    isButtonDisabled &&
                                        styles.buttonTextDisabled
                                ]}
                            >
                                {isGenerate ? 'Gerar' : 'Continuar'}
                            </Text>
                        )}
                    </TouchableOpacity>
                    {isGenerate && (
                        <TouchableOpacity
                            style={[styles.button]}
                            activeOpacity={0.6}
                            onPress={nextScreen}
                        >
                            <Text style={styles.buttonText}>Agora não</Text>
                        </TouchableOpacity>
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: Platform.select({
        //     android: 80,
        //     ios: 100
        // }),
        paddingTop: 60,
        paddingHorizontal: 25
    },
    safeArea: {
        flex: 1
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 25
    },
    keyboardArea: {
        flex: 1,
        paddingHorizontal: 25
        // paddingTop: 25
    },
    icon: {
        alignSelf: 'center',
        width: '50%',
        resizeMode: 'contain'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: colors.text.second,
        textAlign: 'center'
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray.nineth,
        paddingLeft: 0,
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 15
    },
    button: {
        borderRadius: 28,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.blue.second,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    buttonDisabled: {
        borderColor: colors.gray.second
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second
    },
    buttonTextDisabled: {
        color: colors.gray.second
    },
    backButton: {
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15
    }
});

export default PromoCode;
