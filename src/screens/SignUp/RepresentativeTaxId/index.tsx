import React, { useEffect, useCallback } from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// Components
import ActionButton from '../../../components/ActionButton';
import ProgressBar from '../../../components/ProgressBar';
import TextInput from '../../../components/TextInput';

// Store
import { IApplicationState } from '../../../store/types';
import { requestSearchClientAction } from '../../../store/ducks/searchClient/actions';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Style
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../utils/helpers';
import useIsKeyboardActive from '../../../utils/useIsKeyboardActive';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallSreen = isDeviceSmallScreen(850);
const isSmallPadding = isDeviceSmallScreen();

const RepresentativeTaxIdScreen: React.FC<SignUpStackNavigationProps<
    'RepresentativeTaxId'
>> = ({ navigation }: SignUpStackNavigationProps<'RepresentativeTaxId'>) => {
    const dispatch = useDispatch();
    const [
        representativeTaxId,
        representativeName,
        representativeTaxIdValidation,
        totalSteps,
        searchClientLoading
    ] = useSelector((state: IApplicationState) => {
        return [
            state.signUp.payload.representativeTaxId,
            state.signUp.payload.representativeName,
            state.signUp.inputsValidation.representativeTaxId,
            state.signUp.steps,
            state.searchClient.isLoading
        ];
    }, shallowEqual);

    const { isKeyboardActive, offset } = useIsKeyboardActive(
        isSmallSreen ? -10 : -20
    );

    const onPress = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            navigation.push('SignUp', { screen: 'MotherName' });
        }, 300);
    };

    const searchClient = useCallback(
        () =>
            dispatch(
                requestSearchClientAction(
                    representativeTaxId.replace(/\D/g, ''),
                    navigation,
                    'representativePJ'
                )
            ),
        [dispatch, representativeTaxId, navigation]
    );

    useEffect(() => {
        if (
            representativeTaxId.replace(/\D/g, '').length === 11 &&
            isValidCPF(representativeTaxId)
        ) {
            searchClient();
        }
    }, [representativeTaxId]);

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
                                        isSmallSreen && { display: 'none' }
                                ]}
                            >
                                <ProgressBar
                                    totalSteps={totalSteps}
                                    currentStep={6}
                                />
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
                                            isSmallSreen && { marginBottom: 10 }
                                    ]}
                                >
                                    CPF do representante
                                </Text>
                                <TextInput
                                    autoFocus
                                    name="representativeTaxId"
                                    type="cpf"
                                    style={styles.input}
                                    value={representativeTaxId}
                                    largeText
                                    invalid={
                                        representativeTaxIdValidation.length > 0
                                    }
                                    onChangeText={(name, value) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: name,
                                                value
                                            })
                                        )
                                    }
                                />
                                {representativeTaxIdValidation.length > 0 && (
                                    <Text
                                        allowFontScaling={false}
                                        style={[styles.errorMessage]}
                                    >
                                        {representativeTaxIdValidation}
                                    </Text>
                                )}
                            </View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text,
                                        isKeyboardActive &&
                                            isSmallSreen && { marginBottom: 10 }
                                    ]}
                                >
                                    Nome do representante
                                </Text>
                                <TextInput
                                    name="representativeName"
                                    style={styles.input}
                                    autoCapitalize="words"
                                    value={representativeName}
                                    onChangeText={(name, value) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: name,
                                                value
                                            })
                                        )
                                    }
                                />
                            </View>
                        </View>
                    </Animated.View>

                    <TouchableOpacity
                        style={[
                            styles.existingAccount,
                            isKeyboardActive &&
                                isSmallSreen && { marginBottom: 15 }
                        ]}
                        onPress={() =>
                            navigation.push('SignUp', {
                                screen: 'ExistingRepresentative'
                            })
                        }
                    >
                        <Text
                            allowFontScaling={false}
                            style={styles.existingText}
                        >
                            Representante com conta Onbank
                        </Text>
                    </TouchableOpacity>

                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        disabled={
                            representativeTaxId.replace(/\D/g, '').length <
                                11 ||
                            representativeTaxIdValidation.length > 0 ||
                            !representativeName.split(' ')[1] ||
                            searchClientLoading
                        }
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
        paddingTop: isSmallPadding ? 80 : 80 + 48
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
    input: {
        alignSelf: 'stretch',
        borderWidth: 1.2,
        borderRadius: 10,
        height: 53,
        borderColor: colors.gray.primary,
        fontFamily: 'Roboto-Medium',
        color: colors.text.primary,
        paddingLeft: 23,
        justifyContent: 'center'
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

export default RepresentativeTaxIdScreen;
