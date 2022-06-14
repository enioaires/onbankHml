import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Animated,
    Keyboard,
    Alert
} from 'react-native';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// Components
import api from '../../../api';
import ProgressBar from '../../../components/ProgressBar';
import TextInput from '../../../components/TextInput';
import ActionButton from '../../../components/ActionButton';

// Store
import { requestSearchClientAction } from '../../../store/ducks/searchClient/actions';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';
import { IApplicationState } from '../../../store/types';

// Styles
import colors from '../../../styles/colors';
import { paddings } from '../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../utils/helpers';
import useIsKeyboardActive from '../../../utils/useIsKeyboardActive';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallSreen = isDeviceSmallScreen();

const ExistingRepresentativeScreen: React.FC<SignUpStackNavigationProps<
    'ExistingRepresentative'
>> = ({ navigation }: SignUpStackNavigationProps<'ExistingRepresentative'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive, offset } = useIsKeyboardActive(
        isSmallSreen ? -10 : -20
    );

    const [loading, setLoading] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState<
        'notVisible' | 'visible'
    >('notVisible');

    const changePasswordVisible = () => {
        setPasswordVisible((oldstate: 'notVisible' | 'visible') =>
            oldstate === 'notVisible' ? 'visible' : 'notVisible'
        );
    };

    const [
        existingCpf,
        existingPassword,
        cpfValidation,
        passwordValidation,
        searchClientLoading
    ] = useSelector((state: IApplicationState) => {
        return [
            state.signUp.payload.existingCpf,
            state.signUp.payload.existingPassword,
            state.signUp.inputsValidation.existingCpf,
            state.signUp.inputsValidation.existingPassword,
            state.searchClient.isLoading
        ];
    }, shallowEqual);

    const searchClient = useCallback(
        () =>
            dispatch(
                requestSearchClientAction(
                    existingCpf.replace(/\D/g, ''),
                    navigation,
                    'existingCpf'
                )
            ),
        [existingCpf, navigation, dispatch]
    );

    useEffect(() => {
        if (
            existingCpf.replace(/\D/g, '').length === 11 &&
            isValidCPF(existingCpf)
        ) {
            searchClient();
        }
    }, [existingCpf]);

    const onPress = async () => {
        Keyboard.dismiss();
        setLoading(true);
        // Saga Fora
        try {
            const resp = await api.post('register/pj/signin/pf', {
                documentNumber: existingCpf.replace(/\D/g, ''),
                password: existingPassword
            });

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema. Tente novamente mais tarde.'
                    );
                }
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }

            dispatch(
                changeSignUpPayloadAction({
                    key: 'accountId',
                    value: resp.accountId
                })
            );

            Alert.alert('Cadastro', resp.message, [
                {
                    text: 'OK',
                    onPress: () =>
                        navigation.push('SignUp', { screen: 'Phone' })
                }
            ]);
        } catch (err) {
            Alert.alert('Cadastro', err.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <SafeAreaView
                    style={[
                        styles.safeArea,
                        isKeyboardActive && { marginBottom: 20 }
                    ]}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ translateY: offset }]
                        }}
                    >
                        <View style={styles.top}>
                            <View
                                style={[
                                    styles.progressContainer,
                                    isKeyboardActive &&
                                        isSmallSreen && { marginBottom: 20 }
                                ]}
                            >
                                <ProgressBar totalSteps={12} currentStep={9} />
                            </View>
                            <View
                                style={{
                                    marginBottom:
                                        isKeyboardActive && isSmallSreen
                                            ? 20
                                            : 50
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text,
                                        isKeyboardActive &&
                                            isSmallSreen && {
                                                marginBottom: 10
                                            }
                                    ]}
                                >
                                    Informe o CPF do representante Onbank
                                </Text>
                                <TextInput
                                    autoFocus
                                    largeText
                                    autoCorrect={false}
                                    type="cpf"
                                    name="existingCpf"
                                    onChangeText={(name, value) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: name,
                                                value
                                            })
                                        )
                                    }
                                    value={existingCpf}
                                    invalid={cpfValidation.length > 0}
                                />
                                {cpfValidation.length > 0 && (
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.errorMessage}
                                    >
                                        {cpfValidation}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text,
                                        isKeyboardActive &&
                                            isSmallSreen && {
                                                marginBottom: 10
                                            }
                                    ]}
                                >
                                    Informe a senha do representante Onbank
                                </Text>
                                <TextInput
                                    autoCorrect={false}
                                    invalid={passwordValidation.length > 0}
                                    password={passwordVisible}
                                    setPasswordVisible={changePasswordVisible}
                                    secureTextEntry={
                                        passwordVisible === 'notVisible'
                                    }
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    name="existingPassword"
                                    onChangeText={(name, value) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: name,
                                                value
                                            })
                                        )
                                    }
                                    value={existingPassword}
                                />
                            </View>
                        </View>
                    </Animated.View>

                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        disabled={
                            cpfValidation.length > 0 ||
                            existingCpf.replace(/\D/g, '').length < 11 ||
                            existingPassword.length < 6 ||
                            searchClientLoading
                        }
                        isLoading={loading}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: isSmallSreen ? 80 : 80 + 48
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 20,
        lineHeight: 22
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 14,
        lineHeight: 13,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Regular'
    },
    rules: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 17,
        marginTop: 15,
        color: colors.text.second,
        marginRight: 60
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    },
    existingAccount: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    existingText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.second
    }
});

export default ExistingRepresentativeScreen;
