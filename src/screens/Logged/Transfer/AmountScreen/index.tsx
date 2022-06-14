import React, { useState, useEffect } from 'react';
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
import { changeTransferPayloadAction } from '../../../../store/ducks/transfer/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { completeDemoSignupAction } from '../../../../store/ducks/signUp/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { transformToCurrencyPayload } from '../../../../utils/helpers';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const AmountScreen: React.FC<TransferStackNavigationProps<'Amount'>> = ({
    navigation
}: TransferStackNavigationProps<'Amount'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const transferType = useSelector(
        (state: IApplicationState) => state.transfer.payload.type
    );
    const amount = useSelector(
        (state: IApplicationState) => state.transfer.payload.amount
    );
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const balance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );

    const [balanceDiscounted, setBalanceDiscounted] = useState('');

    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar apenas 1 (uma) transferência no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
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
    }, [amount, balance, transferType]);

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

    const handleClickTransfer = () => {
        if (Number(transformToCurrencyPayload(amount)) > 50 && isDemo) {
            return showDemoAlert();
        }

        Keyboard.dismiss();
        navigation.push('Transfer', {
            screen: 'Confirmation'
        });
    };
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={[styles.box, isKeyboardActive && { marginBottom: 15 }]}
                behavior="padding"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={styles.text}>
                            Quanto você deseja transferir?
                        </Text>
                        {/* {transferType === 'ted' && (
                            <Text
                                allowFontScaling={false}
                                style={styles.taxText}
                            >
                                É descontada uma taxa de R$ 0,50 para TED
                            </Text>
                        )} */}
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
                                value={amount}
                                onChangeText={(_, value) =>
                                    dispatch(
                                        changeTransferPayloadAction({
                                            key: 'amount',
                                            value
                                        })
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
                        label="Transferir"
                        onPress={handleClickTransfer}
                        disabled={
                            numeral(amount).value() >
                                numeral(balance).value() ||
                            numeral(amount).value() === numeral(0).value() ||
                            amount.length <= 0
                            // (transferType === 'ted' &&
                            //     numeral(amount).value() + numeral(0.5).value() >
                            //         numeral(balance).value())
                        }
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
