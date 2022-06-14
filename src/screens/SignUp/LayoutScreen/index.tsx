import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Keyboard,
    KeyboardTypeOptions,
    KeyboardAvoidingView
} from 'react-native';
import { TextInputMaskTypeProp } from 'react-native-masked-text';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import SMSCodeModal from '../../../containers/SMSCodeModal';
import ActionButton from '../../../components/ActionButton';
import TextInput from '../../../components/TextInput';
import ProgressBar from '../../../components/ProgressBar';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Styles
import colors from '../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../utils/helpers';
import useIsKeyboardActive from '../../../utils/useIsKeyboardActive';

export interface ILayoutScreenProps {
    key: string;
    placeHolder: string;
    nextScreen?: {
        cpf: string;
        cnpj?: string;
    };
    title: {
        cpf: string;
        cnpj?: string;
    };
    inputTextProps?: {
        type?: TextInputMaskTypeProp;
        options?: any;
        largeText?: boolean;
        keyboardType?: KeyboardTypeOptions;
    };
    stepNumber: {
        cpf: number;
        cnpj?: number;
    };
    hasConfirmation?: string;
    rules?: string;
    descriptions?: string;
    isButtonDisabled(): boolean;
    onNext?(): void;
    loading?: boolean;
    buttonLabel?: string;
    routeContext?: string;
}

interface IProps {
    navigation: any;
    screenProps: ILayoutScreenProps;
}

const isSmallSreen = isDeviceSmallScreen();

const LayoutScreen: React.FC<IProps> = ({
    navigation,
    screenProps
}: IProps) => {
    const dispatch = useDispatch();
    const signUpState = useSelector(
        (state: IApplicationState) => state.signUp,
        shallowEqual
    );

    const { isKeyboardActive } = useIsKeyboardActive(isSmallSreen ? -10 : -20);

    const phoneValidationState = useSelector(
        (state: IApplicationState) => state.phoneValidation
    );

    const isDocumentCNPJ =
        signUpState.payload.documentNumber.replace(/\D/g, '').length > 11;

    const onPress = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            if (screenProps.onNext) {
                screenProps.onNext();
            } else if (screenProps.nextScreen) {
                let screen: any = null;
                if (screenProps.nextScreen.cnpj && isDocumentCNPJ) {
                    screen = screenProps.nextScreen.cnpj;
                } else {
                    screen = screenProps.nextScreen.cpf;
                }
                navigation.push(screenProps.routeContext || 'SignUp', {
                    screen
                });
            }
        }, 300);
    };

    return (
        <>
            {screenProps.key === 'phone' && (
                <SMSCodeModal
                    navigation={navigation}
                    isLoading={phoneValidationState.isLoading}
                    isVisible={phoneValidationState.showModal}
                    phone={signUpState.payload.phone}
                    routeContext={screenProps.routeContext}
                />
            )}
            <View style={styles.container}>
                <SafeAreaView style={[styles.safeArea]}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.keyboardAvoid}
                        keyboardVerticalOffset={70}
                    >
                        <KeyboardAwareScrollView
                            enableAutomaticScroll={false}
                            showsHorizontalScrollIndicator={false}
                            style={{
                                flex: 1,
                                marginBottom: 15
                            }}
                        >
                            <View style={styles.top}>
                                <View
                                    style={[
                                        styles.progressContainer,
                                        !!screenProps.hasConfirmation &&
                                            isKeyboardActive &&
                                            isSmallSreen && { marginBottom: 20 }
                                    ]}
                                >
                                    <ProgressBar
                                        totalSteps={signUpState.steps}
                                        currentStep={
                                            screenProps.stepNumber.cnpj
                                                ? isDocumentCNPJ
                                                    ? screenProps.stepNumber
                                                          .cnpj
                                                    : screenProps.stepNumber.cpf
                                                : screenProps.stepNumber.cpf
                                        }
                                    />
                                </View>
                                <View
                                    style={[
                                        screenProps.key === 'email' && {
                                            marginBottom: 30
                                        }
                                    ]}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.text,
                                            !!screenProps.hasConfirmation &&
                                                isKeyboardActive &&
                                                isSmallSreen && {
                                                    marginBottom: 10
                                                },
                                            screenProps.key === 'email' && {
                                                marginBottom: 20
                                            }
                                        ]}
                                    >
                                        {screenProps.title.cnpj
                                            ? isDocumentCNPJ
                                                ? screenProps.title.cnpj
                                                : screenProps.title.cpf
                                            : screenProps.title.cpf}
                                    </Text>
                                    <TextInput
                                        autoCapitalize={
                                            screenProps.key === 'email'
                                                ? 'none'
                                                : 'words'
                                        }
                                        autoFocus
                                        autoCorrect={false}
                                        placeholder={screenProps.placeHolder}
                                        {...screenProps.inputTextProps}
                                        name={screenProps.key}
                                        onChangeText={(name, value) =>
                                            dispatch(
                                                changeSignUpPayloadAction({
                                                    key: name,
                                                    value
                                                })
                                            )
                                        }
                                        value={
                                            signUpState.payload[screenProps.key]
                                        }
                                        invalid={
                                            screenProps.key === 'email'
                                                ? signUpState.inputsValidation[
                                                      screenProps.key
                                                  ].startsWith('* Informe')
                                                : signUpState.inputsValidation[
                                                      screenProps.key
                                                  ].length > 0
                                        }
                                    />
                                    {!screenProps.hasConfirmation &&
                                        signUpState.inputsValidation[
                                            screenProps.key
                                        ].length > 0 && (
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.errorMessage}
                                            >
                                                {
                                                    signUpState
                                                        .inputsValidation[
                                                        screenProps.key
                                                    ]
                                                }
                                            </Text>
                                        )}
                                    {screenProps.rules && (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.rules}
                                        >
                                            {screenProps.rules}
                                        </Text>
                                    )}
                                </View>

                                {screenProps.hasConfirmation && (
                                    <View
                                        style={{
                                            marginTop:
                                                isKeyboardActive && isSmallSreen
                                                    ? 15
                                                    : 24
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.text,
                                                isKeyboardActive &&
                                                    isSmallSreen && {
                                                        marginBottom: 10
                                                    },
                                                screenProps.key === 'email' && {
                                                    marginBottom: 20
                                                }
                                            ]}
                                        >
                                            {screenProps.hasConfirmation}
                                        </Text>
                                        <TextInput
                                            autoCorrect={false}
                                            invalid={signUpState.inputsValidation[
                                                screenProps.key
                                            ].startsWith('* Os')}
                                            autoCapitalize={
                                                screenProps.key === 'email'
                                                    ? 'none'
                                                    : 'words'
                                            }
                                            placeholder={
                                                screenProps.placeHolder
                                            }
                                            {...screenProps.inputTextProps}
                                            name={`${screenProps.key}Confirmation`}
                                            onChangeText={(name, value) =>
                                                dispatch(
                                                    changeSignUpPayloadAction({
                                                        key: name,
                                                        value
                                                    })
                                                )
                                            }
                                            value={
                                                signUpState.payload[
                                                    `${screenProps.key}Confirmation`
                                                ]
                                            }
                                        />
                                        {signUpState.inputsValidation[
                                            screenProps.key
                                        ].length > 0 && (
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.errorMessage}
                                            >
                                                {
                                                    signUpState
                                                        .inputsValidation[
                                                        screenProps.key
                                                    ]
                                                }
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </KeyboardAwareScrollView>

                        {screenProps.key === 'representativeTaxId' && (
                            <TouchableOpacity
                                style={styles.existingAccount}
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
                                    Cadastrar representante Onbank
                                </Text>
                            </TouchableOpacity>
                        )}

                        <ActionButton
                            label={screenProps.buttonLabel || 'Próximo'}
                            onPress={onPress}
                            disabled={screenProps.isButtonDisabled()}
                            isLoading={
                                screenProps.loading
                                    ? screenProps.loading
                                    : signUpState.isLoading
                            }
                        />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 60,
        paddingHorizontal: 25
    },
    safeArea: {
        flex: 1
    },
    keyboardAvoid: {
        justifyContent: 'space-between',
        flex: 1
    },
    top: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 31,
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

export default LayoutScreen;
