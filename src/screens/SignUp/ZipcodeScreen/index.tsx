import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import api from '../../../api';
import ActionButton from '../../../components/ActionButton';
import TextInput from '../../../components/TextInput';
import ProgressBar from '../../../components/ProgressBar';

// Store
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';
import { IApplicationState } from '../../../store/types';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const ZipcodeScreen: React.FC<SignUpStackNavigationProps<'ZipCode'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'ZipCode'>) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const postalCode = useSelector(
        (state: IApplicationState) => state.signUp.payload.postalCode
    );
    const postalCodeValidation = useSelector(
        (state: IApplicationState) => state.signUp.inputsValidation.postalCode
    );
    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );

    const { params } = route;
    const onChangeText = (value: string) => {
        dispatch(
            changeSignUpPayloadAction({
                key: 'postalCode',
                value
            })
        );
    };

    const onPress = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const blockedInputs: string[] = [];
        // Saga Fora
        try {
            const resp = await api.get(`/cep/${postalCode.replace(/\D/g, '')}`);
            console.log(JSON.stringify(resp, null, 2));

            dispatch(
                changeSignUpPayloadAction({
                    key: 'number',
                    value: ''
                })
            );
            dispatch(
                changeSignUpPayloadAction({
                    key: 'complement',
                    value: ''
                })
            );

            if (resp?.data?.ok) {
                if (resp.data.address) {
                    dispatch(
                        changeSignUpPayloadAction({
                            key: 'street',
                            value: resp.data.address
                        })
                    );
                }
                if (resp?.data?.district) {
                    dispatch(
                        changeSignUpPayloadAction({
                            key: 'neighborhood',
                            value: resp.data.district
                        })
                    );
                    blockedInputs.push('neighborhood');
                }
                if (resp?.data?.city) {
                    dispatch(
                        changeSignUpPayloadAction({
                            key: 'city',
                            value: resp.data.city
                        })
                    );
                    blockedInputs.push('city');
                }
                if (resp?.data?.state) {
                    dispatch(
                        changeSignUpPayloadAction({
                            key: 'state',
                            value: resp.data.state
                        })
                    );
                    blockedInputs.push('state');
                }
            } else {
                dispatch(
                    changeSignUpPayloadAction({
                        key: 'street',
                        value: ''
                    })
                );
                dispatch(
                    changeSignUpPayloadAction({
                        key: 'neighborhood',
                        value: ''
                    })
                );
                dispatch(
                    changeSignUpPayloadAction({
                        key: 'city',
                        value: ''
                    })
                );
                dispatch(
                    changeSignUpPayloadAction({
                        key: 'state',
                        value: ''
                    })
                );
            }

            navigation.push(params?.routeContext || 'SignUp', {
                screen: 'Address',
                params: {
                    blockedInputs,
                    routeContext: params?.routeContext
                }
            });
        } catch (err) {
            // err
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.keyboardAvoid}
                    keyboardVerticalOffset={70}
                >
                    <View style={styles.top}>
                        <View style={[styles.progressContainer]}>
                            <ProgressBar
                                totalSteps={totalSteps}
                                currentStep={5}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {/* <Text allowFontScaling={false} style={styles.text1}>
                                Este é o seu primeiro boleto.
                            </Text> */}
                            <Text allowFontScaling={false} style={styles.text1}>
                                Para prosseguir, preencha os dados
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.text1,
                                    {
                                        fontFamily: 'Roboto-Bold',
                                        marginBottom: 30
                                    }
                                ]}
                            >
                                do {!params?.routeContext ? 'seu' : ''} endereço
                            </Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.label}>
                            CEP
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            type="zip-code"
                            value={postalCode}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.validation}
                        >
                            {postalCodeValidation}
                        </Text>
                    </View>
                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        isLoading={loading}
                        disabled={
                            postalCode.replace(/\D/g, '').length < 8 ||
                            postalCodeValidation.length > 0
                        }
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 25,
        paddingTop: 60
    },
    safeArea: {
        flex: 1
    },
    keyboardAvoid: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1,
        alignItems: 'center'
    },
    text1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.text.third,
        textAlign: 'center',
        lineHeight: 22
    },
    text2: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        color: colors.text.fourth,
        textAlign: 'center',
        lineHeight: 19,
        width: '60%'
    },
    label: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 5
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        textAlign: 'center',
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 30,
        paddingBottom: 5,
        marginBottom: 5
    },
    validation: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.red,
        marginBottom: 5
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    }
});

export default ZipcodeScreen;
