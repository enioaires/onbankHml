import React from 'react';
import { Text, StyleSheet, View, Animated } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Components
import ProgressBar from '../../../components/ProgressBar';
import ActionButton from '../../../components/ActionButton';
import InputBlocks from '../../../components/PasswordInputs';

// Utils
import useIsKeyboardActive from '../../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../../utils/helpers';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallSreen = isDeviceSmallScreen();

const PasswordConfirmationScreen: React.FC<
    SignUpStackNavigationProps<'PasswordConfirmation'>
> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'PasswordConfirmation'>) => {
    const dispatch = useDispatch();
    const { offset } = useIsKeyboardActive(isSmallSreen ? -10 : -20);
    const { params } = route;
    const [value, validation, steps] = useSelector(
        (state: IApplicationState) => {
            return [
                state.signUp.payload.passwordConfirmation,
                state.signUp.inputsValidation.passwordConfirmation,
                state.signUp.steps
            ];
        },
        shallowEqual
    );

    const onPress = () => {
        navigation.push(params?.routeContext || 'SignUp', {
            screen: 'Agreement'
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Animated.View
                    style={{
                        flex: 1
                        // transform: [{ translateY: offset }]
                    }}
                >
                    <View style={styles.top}>
                        <View style={[styles.progressContainer]}>
                            <ProgressBar
                                totalSteps={steps}
                                currentStep={steps === 13 ? 12 : 10}
                            />
                        </View>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text]}
                            >
                                Confirme a senha de acesso
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    marginBottom: 65
                                }}
                            >
                                <InputBlocks
                                    value={value}
                                    setValue={(inputsValue) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: 'passwordConfirmation',
                                                value: inputsValue
                                            })
                                        )
                                    }
                                />
                            </View>
                            {validation.length > 0 && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.errorMessage}
                                >
                                    {validation}
                                </Text>
                            )}
                        </View>
                    </View>
                </Animated.View>

                <ActionButton
                    label="Próximo"
                    onPress={onPress}
                    disabled={
                        (validation.length > 0 && value.length === 6) ||
                        value.length !== 6
                    }
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 15
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
        marginBottom: 31,
        lineHeight: 19
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
    description: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        lineHeight: 17,
        color: colors.text.third,
        marginTop: 18,
        marginRight: 20
    }
});

export default PasswordConfirmationScreen;
