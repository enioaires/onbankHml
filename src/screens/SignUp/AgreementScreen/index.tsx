import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import CheckBox from '../../../components/Checkbox';
import ActionButton from '../../../components/ActionButton';
import ProgressBar from '../../../components/ProgressBar';

// Store
import { IApplicationState } from '../../../store/types';
import { requestSignUpAction } from '../../../store/ducks/signUp/actions';

// Styles
import colors from '../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../utils/helpers';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallDevice = isDeviceSmallScreen();

const AgreementScreen: React.FC<SignUpStackNavigationProps<'Agreement'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Agreement'>) => {
    const dispatch = useDispatch();
    const { params } = route;
    const requestLoading = useSelector(
        (state: IApplicationState) => state.signUp.isLoading
    );
    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );

    const [agreement, setAgreement] = useState(false);
    const changeAgreement = () => {
        setAgreement((oldstate: boolean) => !oldstate);
    };

    const onPress = () => {
        Pushwoosh.getHwid((hwid: string) => {
            dispatch(requestSignUpAction(hwid, navigation));
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.top}>
                    <View>
                        <View style={styles.progressContainer}>
                            <ProgressBar
                                totalSteps={totalSteps}
                                currentStep={totalSteps === 13 ? 13 : 11}
                            />
                        </View>
                        <Text allowFontScaling={false} style={styles.title}>
                            Termos e Condições
                        </Text>
                        <Text allowFontScaling={false} style={[styles.text]}>
                            Honrando o nosso compromisso de simplicidade e
                            transparência, fizemos o máximo para ter um contrato
                            reduzido e escrito em uma linguagem simples e
                            direta.
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginTop: isSmallDevice ? '10%' : '20%'
                        }}
                    >
                        <TouchableOpacity
                            style={{ marginBottom: 30 }}
                            onPress={() =>
                                navigation.push(
                                    params?.routeContext || 'SignUp',
                                    {
                                        screen: 'Terms',
                                        params: { webView: 'Termos' }
                                    }
                                )
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.textClick}
                            >
                                Leia aqui os nossos Termos de Uso
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.push(
                                    params?.routeContext || 'SignUp',
                                    {
                                        screen: 'Terms',
                                        params: { webView: 'Privacidade' }
                                    }
                                )
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.textClick}
                            >
                                Leia aqui a nossa Política de Privacidade
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <CheckBox checked={agreement} onChange={changeAgreement}>
                    <Text allowFontScaling={false} style={styles.checkBoxText}>
                        Declaro que li e aceito os
                        <Text
                            allowFontScaling={false}
                            onPress={() =>
                                navigation.push('SignUp', {
                                    screen: 'Terms',
                                    params: { webView: 'Termos' }
                                })
                            }
                            style={[
                                styles.checkBoxText,
                                { fontFamily: 'Roboto-Bold' }
                            ]}
                        >
                            {' '}
                            termos de uso
                        </Text>{' '}
                        e a
                        <Text
                            allowFontScaling={false}
                            onPress={() =>
                                navigation.push('SignUp', {
                                    screen: 'Terms',
                                    params: { webView: 'Privacidade' }
                                })
                            }
                            style={[
                                styles.checkBoxText,
                                { fontFamily: 'Roboto-Bold' }
                            ]}
                        >
                            {' '}
                            política de privacidade
                        </Text>
                    </Text>
                </CheckBox>
                <ActionButton
                    label="Concluir"
                    disabled={!agreement}
                    onPress={onPress}
                    isLoading={requestLoading}
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
        flex: 1
    },
    top: {
        flex: 1
    },
    progressContainer: {
        marginBottom: 45
    },
    title: {
        color: colors.text.primary,
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        marginBottom: 28,
        lineHeight: 19
    },
    text: {
        lineHeight: 26,
        fontSize: 18,
        color: colors.text.primary,
        fontFamily: 'Roboto-Regular'
    },
    checkBoxText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: colors.blue.second,
        lineHeight: 25,
        marginRight: 25,
        marginLeft: 8,
        marginBottom: 50
    },
    textClick: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: colors.gray.sixth,
        textDecorationLine: 'underline'
    }
});

export default AgreementScreen;
