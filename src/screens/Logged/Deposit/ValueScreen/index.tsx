import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import numeral from 'numeral';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import {
    requestDepositAction,
    changeDepositAmountAction,
    clearDepositStateAction
} from '../../../../store/ducks/deposit/actions';
import { IApplicationState } from '../../../../store/types';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { DepositStackNavigationProps } from '../../../../routes/Logged/types';
import { transformToCurrencyPayload } from '../../../../utils/helpers';
import { completeDemoSignupAction } from '../../../../store/ducks/signUp/actions';

const ValueScreen: React.FC<DepositStackNavigationProps<'Value'>> = ({
    navigation,
    route
}: DepositStackNavigationProps<'Value'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const { method } = route.params;
    const dispatch = useDispatch();
    const [requestLoading, amount] = useSelector((state: IApplicationState) => {
        return [state.deposit.isLoading, state.deposit.payload.amount];
    }, shallowEqual);
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const billetCondition = useSelector(
        (state: IApplicationState) => state.depositBillets.condition
    );
    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );

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
                    'A conta demonstrativa só permite realizar apenas 1 (um) depósito no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
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
        if (method === 'billet') {
            if (!billetCondition.isOverTheLimit) {
                dispatch(requestDepositAction(navigation));
            } else {
                navigation.replace('General', {
                    screen: 'TransactionPassword',
                    params: {
                        action: (password) =>
                            dispatch(requestDepositAction(navigation, password))
                    }
                });
            }
        }
        if (method === 'transfer') {
            navigation.push('Deposit', { screen: 'BilletTed' });
        }
    };

    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar apenas 1 (um) depósito no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
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

    /* useEffect(() => {
        return () => {
            dispatch(clearDepositStateAction());
        };
    }, [dispatch]); */

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={[styles.box, isKeyboardActive && { marginBottom: 13 }]}
                behavior="padding"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={styles.text}>
                            Quanto você quer depositar?
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
                                onChangeText={(_, value) =>
                                    dispatch(changeDepositAmountAction(value))
                                }
                            />
                        </View>
                        <Text allowFontScaling={false} style={styles.rules}>
                            Valor mínimo R$20,00
                        </Text>
                        {billetCondition.isOverTheLimit &&
                            numeral(3).value() >
                                numeral(userBalance).value() && (
                                <Text style={styles.balanceUnavaliable}>
                                    Saldo indisponível para{'\n'}realizar a
                                    emissão do boleto
                                </Text>
                            )}
                    </View>
                    <ActionButton
                        label={
                            method === 'billet' ? 'Gerar boleto' : 'Depositar'
                        }
                        onPress={onPress}
                        disabled={
                            numeral(amount).value() < numeral(20).value() ||
                            amount.length <= 0 ||
                            (billetCondition.isOverTheLimit &&
                                numeral(3).value() >
                                    numeral(userBalance).value())
                        }
                        isLoading={requestLoading}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ValueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
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
    },
    balanceUnavaliable: {
        color: colors.blue.second,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        marginBottom: 15,
        marginVertical: 15,
        alignSelf: 'center',
        textAlign: 'center'
    }
});
