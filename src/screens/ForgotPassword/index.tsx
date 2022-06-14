import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { isValidCPF, isValidCNPJ } from '@brazilian-utils/brazilian-utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import { IForgotPasswordPayload } from 'src/store/ducks/forgotPassword/types';
import TextInput from '../../components/TextInput';
import ActionButton from '../../components/ActionButton';
import AlertModal from '../../containers/AlertModal';

// Store
import { IApplicationState } from '../../store/types';
import {
    changeForgotPasswordPayloadAction,
    clearForgotPasswordPayloadAction,
    requestForgotPasswordAction
} from '../../store/ducks/forgotPassword/actions';
import { requestSearchClientAction } from '../../store/ducks/searchClient/actions';

// Styles
import colors from '../../styles/colors';
import { paddings } from '../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../utils/helpers';
import useIsKeyboardActive from '../../utils/useIsKeyboardActive';

// Navigation Types
import { StackNavigationProps, AuthStackList } from '../../routes/Auth/types';

const isSmallScreen = isDeviceSmallScreen();

const ForgotPassword: React.FC<StackNavigationProps<
    AuthStackList,
    'ForgotPassword'
>> = ({
    navigation
}: StackNavigationProps<AuthStackList, 'ForgotPassword'>) => {
    const dispatch = useDispatch();

    const { isKeyboardActive } = useIsKeyboardActive(isSmallScreen ? -30 : -5);
    const loading = useSelector(
        (state: IApplicationState) => state.forgotPassword.isLoading
    );
    const clue = useSelector(
        (state: IApplicationState) => state.forgotPassword.clue
    );
    const forgotPasswordPayload = useSelector(
        (state: IApplicationState) => state.forgotPassword.payload,
        shallowEqual
    );
    const forgotPasswordPayloadValidations = useSelector(
        (state: IApplicationState) => state.forgotPassword.validations,
        shallowEqual
    );
    const searchClientLoading = useSelector(
        (state: IApplicationState) => state.searchClient.isLoading
    );

    const [showAlert, setShowAlert] = useState(false);
    const [debounce, setDebounce] = useState<any>(null);

    const isButtonDisabled = useMemo(
        () =>
            Object.values(forgotPasswordPayloadValidations).some(
                (value) => !!value.trim()
            ) ||
            forgotPasswordPayload.email.trim().length <= 0 ||
            (forgotPasswordPayload.documentNumber.trim().replace(/\D/g, '')
                .length !== 11 &&
                forgotPasswordPayload.documentNumber.trim().replace(/\D/g, '')
                    .length !== 14),
        [forgotPasswordPayload, forgotPasswordPayloadValidations]
    );

    const onChangeText = (name: string, value: string) => {
        dispatch(
            changeForgotPasswordPayloadAction(
                name as keyof IForgotPasswordPayload,
                value
            )
        );
    };

    const onSubmit = () => {
        Keyboard.dismiss();
        dispatch(
            requestForgotPasswordAction(setShowAlert, {
                documentNumber: forgotPasswordPayload.documentNumber
                    .trim()
                    .replace(/\D/g, ''),
                email: forgotPasswordPayload.email.trim()
            })
        );
    };

    const maskEmail = (value: string) => {
        const [first, second] = value.split('@');
        const [provider, com, ...rest] = second.split('.');

        const firstPart =
            first.substring(0, 1) + first.substring(1).replace(/\d|\D/g, '*');
        const secondPart = `@${provider.substring(0, 1)}${provider
            .substring(1)
            .replace(/\d|\D/g, '*')}`;
        const thirdPart = `.${com}${rest.length > 0 ? `.${rest}` : ''}`;

        return `${firstPart}${secondPart}${thirdPart}`;
    };

    const didMount = () => {
        return () => {
            dispatch(clearForgotPasswordPayloadAction());
        };
    };

    const verifyDocument = () => {
        clearTimeout(debounce);
        if (
            isValidCPF(forgotPasswordPayload.documentNumber) ||
            isValidCNPJ(forgotPasswordPayload.documentNumber)
        ) {
            setDebounce(
                setTimeout(() => {
                    dispatch(
                        requestSearchClientAction(
                            forgotPasswordPayload.documentNumber,
                            navigation,
                            'forgotPassword'
                        )
                    );
                }, 1000)
            );
        }
    };

    useEffect(didMount, []);

    useEffect(verifyDocument, [forgotPasswordPayload.documentNumber]);

    return (
        <>
            <AlertModal
                showAlert={showAlert}
                icon={require('../../../assets/icons/email.png')}
                buttonProps={{
                    label: 'Ok',
                    closeAlert: () => setShowAlert(false),
                    action: () =>
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{ name: 'OnBoarding' }, { name: 'Login' }]
                        // })
                        navigation.pop()
                }}
                title="Verifique seu email"
                message="Enviamos para o seu e-mail cadastrado um link para a troca de senha"
            />
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{
                        flex: 1
                    }}
                >
                    <SafeAreaView
                        style={[
                            styles.safeArea,
                            isKeyboardActive && { marginBottom: 20 }
                        ]}
                    >
                        <KeyboardAwareScrollView
                            enableAutomaticScroll={false}
                            showsVerticalScrollIndicator={false}
                            style={{
                                flex: 1,
                                marginBottom: 15
                            }}
                        >
                            <View
                                style={[
                                    {
                                        flex: 1
                                        // transform: [
                                        //     {
                                        //         translateY: offset
                                        //     }
                                        // ]
                                    }
                                ]}
                            >
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        style={[styles.title]}
                                    >
                                        Informe o seu CPF
                                    </Text>
                                    <TextInput
                                        invalid={
                                            forgotPasswordPayloadValidations
                                                .documentNumber.length > 0
                                        }
                                        name="documentNumber"
                                        type="custom"
                                        options={{
                                            mask:
                                                forgotPasswordPayload.documentNumber.replace(
                                                    /\D/g,
                                                    ''
                                                ).length > 11
                                                    ? '99.999.999/9999-99'
                                                    : '999.999.999-999'
                                        }}
                                        autoCapitalize="none"
                                        keyboardType="number-pad"
                                        onChangeText={(name, value) =>
                                            onChangeText(name, value)
                                        }
                                        value={
                                            forgotPasswordPayload.documentNumber
                                        }
                                        loading={searchClientLoading}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.errorMessage
                                            // isKeyboardActive &&
                                            //     isSmallScreen && {
                                            //         marginBottom: 5,
                                            //         marginTop: 7
                                            //     }
                                        ]}
                                    >
                                        {
                                            forgotPasswordPayloadValidations.documentNumber
                                        }
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.title}
                                    >
                                        Informe o seu e-mail
                                    </Text>
                                    <TextInput
                                        invalid={
                                            forgotPasswordPayloadValidations
                                                .email.length > 0
                                        }
                                        name="email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(name, value) =>
                                            onChangeText(name, value)
                                        }
                                        value={forgotPasswordPayload.email}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.errorMessage
                                            // isKeyboardActive &&
                                            //     isSmallScreen && {
                                            //         display: 'none'
                                            //     }
                                        ]}
                                    >
                                        {forgotPasswordPayloadValidations.email}
                                    </Text>
                                    {clue.length > 0 && (
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.clue
                                                // isKeyboardActive &&
                                                //     isSmallScreen && {
                                                //         marginBottom: 5,
                                                //         marginTop: 7
                                                //     }
                                            ]}
                                        >
                                            {maskEmail(clue)}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                        <TouchableOpacity
                            onPress={() => navigation.push('Help')}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.contact
                                    // isKeyboardActive &&
                                    //     isSmallScreen && { display: 'none' }
                                ]}
                            >
                                Entrar em contato com o suporte
                            </Text>
                        </TouchableOpacity>
                        <ActionButton
                            label="Próximo"
                            disabled={isButtonDisabled}
                            isLoading={loading}
                            onPress={onSubmit}
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: 80 + 17
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 17,
        lineHeight: 22
    },
    errorMessage: {
        marginTop: 20,
        marginBottom: 15,
        fontSize: 15,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Medium'
    },
    contact: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second,
        textAlign: 'center',
        marginBottom: 20
    },
    clue: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 15,
        marginTop: 12
    }
});

export default ForgotPassword;
