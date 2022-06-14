import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import numeral from 'numeral';
import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changePixPaymentPayloadAction,
    clearPixPaymentStateAction,
    getPixPaymentDataAction
} from '../../../../store/ducks/pixPayment/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { completeDemoSignupAction } from '../../../../store/ducks/signUp/actions';

// Styles
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { transformToCurrencyPayload } from '../../../../utils/helpers';

// Navigation Type
import { PixPaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const AmountScreen: React.FC<PixPaymentsStackNavigationProps<'Amount'>> = ({
    navigation,
    route
}: PixPaymentsStackNavigationProps<'Amount'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    // console.log(route)
    const [balance] = useSelector((state: IApplicationState) => {
        return [state.balance.data?.available];
    }, shallowEqual);

    const [amount] = useSelector((state: IApplicationState) => {
        return [state.pixPayment.payload.valor];
    }, shallowEqual);

    const [isLoading] = useSelector((state: IApplicationState) => {
        return [state.pixPayment.isLoading];
    }, shallowEqual);

    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );

    const onChangeText = (value: string) => {
        dispatch(
            changePixPaymentPayloadAction({
                valor: value
            })
        );
        if (amount.length > 0) {
            setBalanceDiscounted(
                numeral(balance)
                    .subtract(
                        // transferType === 'ted'
                        //     ? numeral(amount).value() + numeral(0.5).value()
                        //     :
                        numeral(amount).value()
                    )
                    .format('0,0.00')
            );
        } else {
            setBalanceDiscounted(numeral(balance).subtract(0).format('0,0.00'));
        }
    };

    const initiateKYCFlow = () => {
        IdwallSdk.initialize('3cb30ce77c16f00436ed732539942778');

        if (IdwallSdk.ios) {
            IdwallSdk.ios.setupPublicKeys([
                'AHYMQP+2/KIo32qYcfqnmSn+N/K3IdSZWlqa2Zan9eY=',
                'tDilFQ4366PMdAmN/kyNiBQy24YHjuDs6Qsa6Oc/4c8='
            ]);
        }

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
        setTimeout(
            () => dispatch(getPixPaymentDataAction(navigation, route)),
            500
        );
    };

    // use this on flux with amount first screen
    /* useEffect(() => {
        dispatch(
            clearPixPaymentStateAction()
        )
    },[]); */

    const [balanceDiscounted, setBalanceDiscounted] = useState('');

    const didMount = () => {
        dispatch(
            changePixPaymentPayloadAction({
                valor: ''
            })
        );
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar operações no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
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
        if (amount.length > 0) {
            setBalanceDiscounted(
                numeral(balance)
                    .subtract(
                        // transferType === 'ted'
                        //     ? numeral(amount).value() + numeral(0.5).value()
                        //     :
                        numeral(amount).value()
                    )
                    .format('0,0.00')
            );
        } else {
            setBalanceDiscounted(numeral(balance).subtract(0).format('0,0.00'));
        }
    }, [amount, balance]);

    return (
        <View style={styles.container}>
            <LinearGradientHeader isHeaderStackHeight />
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                style={[styles.box, isKeyboardActive && { marginBottom: 13 }]}
                behavior="padding"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={[styles.text, { marginTop: 20 }]}
                        >
                            Digite o valor a pagar
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
                                name="Amount"
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
                        <View style={styles.bar} />
                        <Text
                            allowFontScaling={false}
                            style={[styles.balance, { marginBottom: 10 }]}
                        >
                            Saldo{' '}
                            <Text
                                allowFontScaling={false}
                                style={{ fontFamily: 'Roboto-Bold' }}
                            >
                                disponível:{' '}
                            </Text>
                            {numeral(balance).format('$ 0,0.00')}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[styles.balance, { marginBottom: 20 }]}
                        >
                            Saldo{' '}
                            <Text
                                allowFontScaling={false}
                                style={{ fontFamily: 'Roboto-Bold' }}
                            >
                                após transferência:{' '}
                            </Text>
                            R${' '}
                            {balanceDiscounted.includes('-')
                                ? '0,00'
                                : balanceDiscounted}
                        </Text>
                        {numeral(balanceDiscounted).value() < 0 && (
                            <Text
                                allowFontScaling={false}
                                style={styles.validation}
                            >
                                Saldo insuficiente
                            </Text>
                        )}
                    </View>
                    <ActionButton
                        label="Próximo"
                        disabled={
                            amount === '0,00' ||
                            !amount ||
                            numeral(amount).value() >
                                numeral(balance).value() ||
                            numeral(amount).value() === numeral(0).value() ||
                            amount.length <= 0
                        }
                        isLoading={isLoading}
                        onPress={() => onPress()}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AmountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 29
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    box: {
        flex: 1,
        paddingHorizontal: 24
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth,
        fontSize: 23,
        marginBottom: 45,
        alignSelf: 'center',
        marginTop: 10
    },
    input: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fifth,
        fontSize: 28,
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
    bar: {
        height: 2,
        backgroundColor: colors.gray.fourth,
        marginTop: 5,
        marginBottom: 10
    },
    balance: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14
    },
    validation: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: colors.text.invalid
    }
});
