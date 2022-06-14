import React, { useState, useEffect, useMemo } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import numeral from 'numeral';
import { useSelector, useDispatch } from 'react-redux';

import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import { changePaymentAmountPayloadAction } from '../../../../store/ducks/payment/actions';

import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { completeDemoSignupAction } from '../../../../store/ducks/signUp/actions';
// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { transformToCurrencyPayload } from '../../../../utils/helpers';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const AmountScreen: React.FC<PaymentsStackNavigationProps<'Amount'>> = ({
    navigation
}: PaymentsStackNavigationProps<'Amount'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const transferType = useSelector(
        (state: IApplicationState) => state.transfer.payload.type
    );
    const amount = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.consolidatedAmount
    );
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const minAmount = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.minimumAmount
    );
    const maxAmount = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.maximumAmount
    );
    const balance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );

    const [balanceDiscounted, setBalanceDiscounted] = useState('');

    // console.log(minAmount, maxAmount)
    const isButtonDisabled = useMemo(() => {
        if (
            numeral(maxAmount).value() === numeral(0).value() ||
            numeral(maxAmount).value() > numeral(999999999).value()
        ) {
            return (
                numeral(amount).value() > numeral(balance).value() ||
                numeral(amount).value() === numeral(0).value() ||
                numeral(amount).value() < numeral(minAmount).value() ||
                numeral(amount).value() > numeral(9999999).value()
            );
        }
        return (
            numeral(amount).value() > numeral(balance).value() ||
            numeral(amount).value() === numeral(0).value() ||
            numeral(amount).value() < numeral(minAmount).value() ||
            numeral(amount).value() > numeral(maxAmount).value()
        );
    }, [amount, balance, minAmount, maxAmount]);

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

    const handlePressNext = () => {
        Keyboard.dismiss();
        if (
            Number(transformToCurrencyPayload(amount ? String(amount) : '0')) >
                50 &&
            isDemo
        ) {
            return showDemoAlert();
        }

        navigation.push('Payment', { isDemoVerify: false });
    };
    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar apenas 1 (um) pagamento no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                    action: {
                        mainLabel: 'Completar conta',
                        onPress: () => {
                            navigation.popToTop();
                        },
                        secondLabel: 'Agora não'
                    }
                })
            );
        }
    };

    useEffect(didMount, []);

    useEffect(() => {
        if ((amount && amount.length > 0) || amount > 0) {
            setBalanceDiscounted(
                numeral(balance)
                    .subtract(numeral(amount).value())
                    .format('0,0.00')
            );
        } else {
            setBalanceDiscounted(numeral(balance).subtract(0).format('0,0.00'));
        }
    }, [amount, balance, transferType]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={[styles.box, isKeyboardActive && { marginBottom: 15 }]}
                behavior="padding"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={styles.text}>
                            Qual o valor do pagamento?
                        </Text>
                        {/* <Text allowFontScaling={false} style={styles.taxText}>
                            {`Este boleto permite pagar com valores entre ${numeral(
                                minAmount
                            ).format('$ 0,0.00')} e ${numeral(maxAmount).format(
                                '$ 0,0.00'
                            )}`}
                        </Text> */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                marginBottom: 40
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.currency}
                            >
                                R${' '}
                            </Text>
                            <TextInput
                                placeholder="0,00"
                                style={styles.input}
                                placeholderTextColor={colors.text.second}
                                autoFocus
                                name="value"
                                type="money"
                                checkText={(previous, next) => {
                                    return next !== '0';
                                }}
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: '',
                                    suffixUnit: ''
                                }}
                                value={amount?.toString()}
                                onChangeText={(_, value) =>
                                    dispatch(
                                        changePaymentAmountPayloadAction(value)
                                    )
                                }
                            />
                        </View>
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
                                após pagamento:{' '}
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
                        onPress={handlePressNext}
                        disabled={isButtonDisabled}
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
    taxText: {
        marginTop: -35,
        marginBottom: 45,
        fontSize: 13,
        color: colors.text.second,
        marginLeft: 7
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
