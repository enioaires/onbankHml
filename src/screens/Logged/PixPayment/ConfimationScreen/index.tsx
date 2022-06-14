import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as dateFns from 'date-fns';
import numeral from 'numeral';

// Components
import ActionButton from '../../../../components/ActionButton';
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changePixPaymentPayloadAction,
    clearPixPaymentStateAction,
    getPixPaymentDataAction,
    requestPixPaymentAction
} from '../../../../store/ducks/pixPayment/actions';
import { storeReceiptAction } from '../../../../store/ducks/receipt/actions';

// Styles
import colors from '../../../../styles/colors';

// Utils
import { prefityNames, maskDocumentNumber } from '../../../../utils/prettiers';

// Navigation Type
import { PixPaymentsStackNavigationProps } from '../../../../routes/Logged/types';
import password from 'src/store/ducks/password';

const ConfirmationScreen: React.FC<
    PixPaymentsStackNavigationProps<'Confirmation'>
> = ({
    navigation,
    route
}: PixPaymentsStackNavigationProps<'Confirmation'>) => {
    const dispatch = useDispatch();

    const [keyType, keyValue, e2eId] = useSelector(
        (state: IApplicationState) => {
            return [
                state.pixPayment.payload.tipoChave,
                state.pixPayment.payload.valorChave,
                state.pixPayment.payload.e2eId
            ];
        },
        shallowEqual
    );

    const [amount] = useSelector((state: IApplicationState) => {
        return [state.pixPayment.payload.valor];
    }, shallowEqual);

    const [name, cpf, cnpj] = useSelector((state: IApplicationState) => {
        return [
            state.pixPayment.payload.recebedor.nome,
            state.pixPayment.payload.recebedor.cpf,
            state.pixPayment.payload.recebedor.cnpj
        ];
    }, shallowEqual);

    const [transferenciaId, status] = useSelector(
        (state: IApplicationState) => {
            return [
                state.pixPayment.payload.transferenciaId,
                state.pixPayment.payload.status
            ];
        }
    );
    // const status = 'EM_PROCESSAMENTO'

    const handleRequestPaymentAction = (password) => {
        dispatch(requestPixPaymentAction(navigation));
    };
    const onPress = () => {
        navigation.replace('General', {
            screen: 'TransactionPassword',
            params: {
                action: (password) =>
                    dispatch(requestPixPaymentAction(navigation, password)),
                clearStateAction: () => dispatch(clearPixPaymentStateAction())
            }
        });
    };

    /* useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // console.log(e)
            if (e.data.action.type !== 'POP' && e.data.action.type !== 'GO_BACK'){
                return
            } else if (status === 'EM_PROCESSAMENTO'){
                dispatch(clearPixPaymentStateAction())
                return
            } else {
                e.preventDefault()
            }
        })

        return unsubscribe;
      }, [
        navigation,
        status
    ]); */

    const handleOnPressReceipt = () => {
        dispatch(
            storeReceiptAction({
                type: 'transfer/pix',
                transactionCode: e2eId,
                date: dateFns.format(new Date(), 'dd/MM/yyyy ; HH:mm'),
                value: amount,
                pixTransfer: {
                    receiverName: name!,
                    receiverDocumentNumber: cnpj ? cnpj : cpf!,
                    amount: amount,
                    e2eId: e2eId,
                    paymentDateTime: dateFns.format(
                        new Date(),
                        'dd/MM/yyyy ; HH:mm'
                    )
                }
            })
        );
        setTimeout(() => {
            navigation.push('General', {
                screen: 'Receipt'
            });
        }, 500);
    };

    return (
        <View style={styles.container}>
            <LinearGradientHeader isHeaderStackHeight />
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ paddingHorizontal: 24 }}>
                    <Text style={styles.title}>
                        {status === 'EM_PROCESSAMENTO'
                            ? 'Valor pago'
                            : 'Valor a pagar'}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 20
                        }}
                    >
                        <Text style={styles.currency}>R$</Text>
                        <Text style={styles.value}>
                            {numeral(amount).format('0,0.00')}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.bar,
                            { backgroundColor: colors.gray.primary }
                        ]}
                    />
                    <Text style={styles.description}>
                        {status == 'EM_PROCESSAMENTO'
                            ? 'Comprovante da transação \n disponível no extrato da conta'
                            : 'Confirme o valor e os dados do destinatário'}
                    </Text>
                    <View style={{ marginTop: 40 }}>
                        <View style={styles.dataContainer}>
                            <Text style={styles.data}>Chave Pix</Text>
                            <Text
                                style={[
                                    styles.data,
                                    { color: colors.text.third }
                                ]}
                            >
                                {keyValue}
                            </Text>
                        </View>
                        <View style={styles.bar} />
                        <View style={styles.dataContainer}>
                            <Text style={styles.data}>Nome</Text>
                            <Text
                                style={[
                                    styles.data,
                                    { color: colors.text.third }
                                ]}
                            >
                                {name ? prefityNames(name) : ''}
                            </Text>
                        </View>
                        <View style={styles.bar} />
                        <View style={styles.dataContainer}>
                            <Text style={styles.data}>
                                {cnpj ? 'CNPJ' : 'CPF'}
                            </Text>
                            <Text
                                style={[
                                    styles.data,
                                    { color: colors.text.third }
                                ]}
                            >
                                {cnpj ? maskDocumentNumber(cnpj) : cpf}
                            </Text>
                        </View>
                        <View style={styles.bar} />
                    </View>
                    {status === 'EM_PROCESSAMENTO' && (
                        <View style={styles.confirmContainer}>
                            {/* <AntIcon
                                name='checkcircle'
                                size={60}
                                color={'#109C3B'}
                                style={{alignSelf: 'center'}}
                            /> */}
                            <Text style={styles.confirmText}>
                                Envio Confirmado
                            </Text>
                        </View>
                    )}
                </View>
                {status === 'EM_PROCESSAMENTO' ? (
                    <>
                        {/* <ActionButton
                            label='Ver comprovante'
                            onPress={handleOnPressReceipt}
                            style={{marginBottom: 15}}
                        /> */}
                    </>
                ) : (
                    <ActionButton
                        label="Confirmar"
                        onPress={onPress}
                        style={{ marginBottom: 15, marginHorizontal: 24 }}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24,
        backgroundColor: colors.gray.tenth
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth,
        fontSize: 23,
        marginBottom: 45,
        alignSelf: 'center',
        marginTop: 10
    },
    currency: {
        fontFamily: 'Roboto-Bold',
        fontSize: 32,
        color: colors.text.third
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: colors.blue.primary,
        alignSelf: 'center',
        marginTop: 40
    },
    value: {
        fontFamily: 'Roboto-Bold',
        fontSize: 32,
        color: colors.blue.third,
        marginLeft: 10
    },
    description: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.blue.third,
        marginLeft: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    bar: {
        height: 1.5,
        backgroundColor: colors.gray.fourth,
        marginVertical: 15
    },
    data: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.fifth,
        maxWidth: '80%'
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    confirmContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    confirmText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        color: colors.text.fourth,
        marginTop: 5
    }
});

export default ConfirmationScreen;
