import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import numeral from 'numeral';

import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';
import AddDescriptionReceiveModal from '../../../../containers/AddDescriptionReceiveModal';
import { ViewContainerStackPadding } from '../../../../components/ViewContainerStackPadding';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeReceivePayloadAction,
    clearReceiveStateAction,
    requestReceiveAction
} from '../../../../store/ducks/receive/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { ReceiveStackNavigationProps } from '../../../../routes/Logged/types';
import { transformToCurrencyPayload } from '../../../../utils/helpers';
import { completeDemoSignupAction } from '../../../../store/ducks/signUp/actions';

const ValueScreen: React.FC<ReceiveStackNavigationProps<'Value'>> = ({
    navigation
}: ReceiveStackNavigationProps<'Value'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const [amount, loading] = useSelector((state: IApplicationState) => {
        return [state.receive.payload.amount, state.receive.isLoading];
    }, shallowEqual);
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    // const [showModal, setShowModal] = useState(false);

    const onChangeText = (value: string) => {
        dispatch(
            changeReceivePayloadAction({
                amount: value
            })
        );
    };
    const initiateKYCFlow = () => {
        IdwallSdk.initialize('3cb30ce77c16f00436ed732539942778');
        IdwallSdk.setupPublicKeys([
            'AHYMQP+2/KIo32qYcfqnmSn+N/K3IdSZWlqa2Zan9eY=',
            'tDilFQ4366PMdAmN/kyNiBQy24YHjuDs6Qsa6Oc/4c8='
        ]);

        IdwallSdk.startCompleteFlow('CHOOSE')
            .then((token: any) => {
                Pushwoosh.getHwid((hwid: string) => {
                    dispatch(completeDemoSignupAction(hwid, token));
                });
            })
            .catch((error: any) => {
                if (!error.message.match(/[canceled|cancelled] by user/g)) {
                    dispatch(
                        setAlertMessageAction({
                            title: 'Oops',
                            message:
                                'Algo inesperado ocorreu...Tente novamente',
                            type: 'error'
                        })
                    );
                }
            });
    };

    const showDemoAlert = () => {
        dispatch(
            setAlertMessageAction({
                type: 'info',
                title: 'Conta Demonstrativa',
                message:
                    'A conta demonstrativa não permite realizar operações com  valor maior que R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                action: {
                    mainLabel: 'Completar conta',
                    onPress: initiateKYCFlow,
                    secondLabel: 'Agora não'
                }
            })
        );
    };

    const onPress = () => {
        if (Number(transformToCurrencyPayload(amount)) > 50 && isDemo) {
            return showDemoAlert();
        }
        Keyboard.dismiss();
        setTimeout(() => {
            dispatch(requestReceiveAction(navigation));
        }, 500);
    };

    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa não permite realizar operações com  valor maior que R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                    action: {
                        mainLabel: 'Completar conta',
                        onPress: initiateKYCFlow,
                        secondLabel: 'Agora não'
                    }
                })
            );
        }
    };

    useEffect(didMount, []);

    useEffect(() => {
        return () => {
            dispatch(clearReceiveStateAction());
        };
    }, [dispatch]);

    return (
        <>
            {/* <AddDescriptionReceiveModal
                navigation={navigation}
                showAlert={showModal}
                closeAlert={setShowModal}
            /> */}
            <ViewContainerStackPadding style={styles.container}>
                <KeyboardAvoidingView
                    style={[
                        styles.box,
                        isKeyboardActive && { marginBottom: 13 }
                    ]}
                    behavior="padding"
                >
                    <SafeAreaView style={styles.safeArea}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text, { marginTop: 20 }]}
                            >
                                Digite o valor a receber
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.currency}
                                >
                                    R${' '}
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={colors.text.second}
                                    autoFocus
                                    placeholder="0,00"
                                    name="value"
                                    type="money"
                                    options={{
                                        unit: ''
                                    }}
                                    value={amount}
                                    onChangeText={(_, value: string) =>
                                        onChangeText(value)
                                    }
                                />
                            </View>
                            {/* <Text allowFontScaling={false} style={styles.rules}>
                                Valor máximo R$ 10.000,00
                            </Text> */}
                        </View>
                        <ActionButton
                            label="Gerar Pix"
                            /* disabled={
                                numeral(amount).value() >
                                    numeral(10000).value() ||
                                numeral(amount).value() ===
                                    numeral(0).value() ||
                                amount.length <= 0
                            } */
                            disabled={
                                numeral(amount).value() ===
                                    numeral(0).value() || amount.length <= 0
                            }
                            isLoading={loading}
                            onPress={onPress}
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ViewContainerStackPadding>
        </>
    );
};

export default ValueScreen;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 29
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    box: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 23,
        marginBottom: 45
    },
    input: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 40,
        borderWidth: 0,
        paddingBottom: 0,
        paddingLeft: 5,
        borderRadius: 0,
        height: 'auto'
    },
    currency: {
        fontFamily: 'Roboto-Regular',
        color: colors.gray.second,
        fontSize: 20,
        marginLeft: 13
    },
    rules: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 16,
        marginTop: 25
    }
});
