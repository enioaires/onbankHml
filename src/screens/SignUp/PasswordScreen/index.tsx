import React from 'react';
import { Text, StyleSheet, View, Animated } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import ActionButton from '../../../components/ActionButton';
import ProgressBar from '../../../components/ProgressBar';
import InputBlocks from '../../../components/PasswordInputs';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Styles
import colors from '../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../../utils/helpers';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallSreen = isDeviceSmallScreen();

const PasswordScreen: React.FC<SignUpStackNavigationProps<'Password'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Password'>) => {
    const dispatch = useDispatch();
    const { offset } = useIsKeyboardActive(isSmallSreen ? -10 : -20);
    const { params } = route;
    const [value, steps] = useSelector((state: IApplicationState) => {
        return [state.signUp.payload.password, state.signUp.steps];
    }, shallowEqual);

    const onPress = () => {
        navigation.push(params?.routeContext || 'SignUp', {
            screen: 'PasswordConfirmation'
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
                                currentStep={steps === 13 ? 11 : 9}
                            />
                        </View>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text]}
                            >
                                Escolha uma senha de acesso
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
                                                key: 'password',
                                                value: inputsValue
                                            })
                                        )
                                    }
                                />
                            </View>
                            {/* {
                validation.length > 0 && 
                <Text allowFontScaling={false} style={styles.errorMessage}>{validation}</Text>
              } */}
                            <Text allowFontScaling={false} style={styles.rules}>
                                Essa senha será utilizada para você entrar em
                                sua conta Onbank
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.description}
                            >
                                Em sua conta, você terá outra senha, a de
                                transação. Com a senha de transação, você
                                realiza suas movimentações.
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                <ActionButton
                    label="Próximo"
                    onPress={onPress}
                    disabled={value.length !== 6}
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

export default PasswordScreen;
