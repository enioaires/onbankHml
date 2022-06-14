import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Alert,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import numeral from 'numeral';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as dateFns from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

// Components
import ActionButton from '../../../../components/ActionButton';
import CardsModal from '../../../../containers/CardsModal';

// Store
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { IApplicationState } from '../../../../store/types';
import {
    requestPaymentAction,
    clearPaymentCreditCardAction
} from '../../../../store/ducks/payment/actions';
import { getCardsAction } from '../../../../store/ducks/wallet/actions';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen();

const PaymentScreen: React.FC<PaymentsStackNavigationProps<'Payment'>> = ({
    navigation,
    route
}: PaymentsStackNavigationProps<'Payment'>) => {
    const dispatch = useDispatch();
    const { isDemoVerify } = route.params;
    const beneficiaryName = useSelector(
        (state: IApplicationState) => state.payment.payload.beneficiary?.name
    );
    const beneficiaryTaxId = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.beneficiary?.taxIdentifier?.taxId
    );
    const dueDate = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.dueDate
    );
    const value = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.totalAmount
    );
    const consolidatedAmount = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.consolidatedAmount
    );
    const discount = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.discount
    );
    const barcode = useSelector(
        (state: IApplicationState) =>
            state.payment.payload.paymentDetails?.barcode
    );
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const balance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    const cards = useSelector(
        (state: IApplicationState) => state.wallet.data,
        shallowEqual
    );
    const isBusinessDay = useSelector(
        (state: IApplicationState) => state.user.data.businessDay
    );
    const isBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );

    const [cardsModal, setCardsModal] = useState(false);

    // console.log('1 type', typeof consolidatedAmount);
    // console.log(
    //     '2 transformed type',
    //     typeof consolidatedAmount === 'string'
    //         ? parseFloat(consolidatedAmount)
    //         : ''
    // );
    // console.log('3 consolidated', consolidatedAmount);
    // console.log(
    //     '4 numeral',
    //     numeral(consolidatedAmount || value).format('0,0.00')
    // );

    const handleRequestPayment = (password?: string) => {
        dispatch(requestPaymentAction(navigation, password));
    };

    const navigateToTransactionPassword = () => {
        dispatch(clearPaymentCreditCardAction());
        navigation.push('General', {
            screen: 'TransactionPassword',
            params: {
                action: handleRequestPayment,
                url: '/v2/account/billet/pay'
            }
        });
    };

    const onPress = (withCard?: boolean) => {
        if (withCard) {
            getCards();
        } else {
            navigateToTransactionPassword();
        }

        // Remove message of no bussines day into Billet flux and QRCode payment flux
        //
        /* const formatedDate = dateFns.parseISO(
            formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm', {
                timeZone: 'America/Sao_Paulo'
            })
        );
        const isWeekend = dateFns.isWeekend(formatedDate);
        const isOffComercialTime =
            dateFns.getHours(formatedDate) >= 16 ||
            dateFns.getHours(formatedDate) < 8;
        if (!isBusinessDay || isWeekend || isOffComercialTime) {
            dispatch(
                setAlertMessageAction({
                    title: 'Importante!',
                    message:
                        'Por conta do horário não comercial, sua transação só será processada no próximo dia útil.',
                    action: {
                        onPress: () =>
                            withCard
                                ? getCards()
                                : navigateToTransactionPassword(),
                        mainLabel: 'Continuar',
                        secondLabel: 'Voltar'
                    }
                })
            );
        } else if (withCard) {
            getCards();
        } else {
            navigateToTransactionPassword();
        } */
    };

    const getCards = () => {
        dispatch(getCardsAction());
        setCardsModal(true);
    };

    const [dueYear, dueMonth, dueDay] = dueDate
        ? dueDate.split('-')
        : ['', '', ''];

    const currentDate = new Date();
    const currentDay =
        currentDate.getDate() < 10
            ? `0${currentDate.getDate()}`
            : currentDate.getDate();
    const currentMonth =
        currentDate.getMonth() + 1 < 10
            ? `0${currentDate.getMonth() + 1}`
            : currentDate.getMonth() + 1;

    const amount = consolidatedAmount
        ? numeral(consolidatedAmount).value()
        : numeral(value).value();

    const didMount = () => {
        if (isDemo && isDemoVerify) {
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

    return (
        <>
            <CardsModal
                visible={cardsModal}
                setVisible={setCardsModal}
                cards={cards}
                amount={value || consolidatedAmount || 0}
                navigation={navigation}
                feature="Payment"
            />
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.box}>
                            <Text
                                allowFontScaling={false}
                                style={[styles.title]}
                            >
                                {beneficiaryName}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.dueDate}
                            >
                                {dueDate && `Vencimento${'\n'}`}
                                <Text
                                    allowFontScaling={false}
                                    style={{ fontFamily: 'Roboto-Bold' }}
                                >
                                    {dueMonth && dueDay
                                        ? `${dueDay}/${dueMonth}`
                                        : ''}
                                </Text>
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    marginBottom: 16
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.currency}
                                >
                                    R$
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.value}
                                >
                                    {numeral(
                                        consolidatedAmount || value
                                    ).format('0,0.00')}
                                </Text>
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
                                {numeral(balance)
                                    .subtract(amount)
                                    .format('$ 0,0.00')
                                    .includes('-')
                                    ? 'R$ 0,00'
                                    : numeral(balance)
                                          .subtract(amount)
                                          .format('$ 0,0.00')}
                            </Text>
                        </View>
                        <View style={{ paddingLeft: 10 }}>
                            <Text
                                allowFontScaling={false}
                                style={styles.infoTitle}
                            >
                                Detalhes da cobrança
                            </Text>
                            <View style={styles.block}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Nome
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.infoValue}
                                >
                                    {beneficiaryName || ''}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <View style={[styles.block, { flex: 0.6 }]}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        CPF/CNPJ
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.infoValue}
                                    >
                                        {beneficiaryTaxId || 'Não informado'}
                                    </Text>
                                </View>
                                <View style={[styles.block, { flex: 0.4 }]}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Data de pagamento
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.infoValue}
                                    >
                                        {currentDay}/{currentMonth}
                                    </Text>
                                </View>
                            </View>
                            {numeral(discount).value() > 0 && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View style={[styles.block, { flex: 0.6 }]}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.label}
                                        >
                                            Valor Total
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.infoValue}
                                        >
                                            {numeral(value).format('$ 0,0.00')}
                                        </Text>
                                    </View>
                                    <View style={[styles.block, { flex: 0.4 }]}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.label}
                                        >
                                            Desconto
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.infoValue}
                                        >
                                            {numeral(discount).format(
                                                '$ 0,0.00'
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <View style={styles.block}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Código do boleto
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.infoValue}
                                >
                                    {barcode}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                    {isBeta && (
                        <TouchableOpacity
                            style={{
                                alignSelf: 'stretch',
                                marginBottom: 15
                            }}
                            onPress={() => onPress(true)}
                        >
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Medium',
                                    color: colors.blue.second,
                                    textAlign: 'center'
                                }}
                            >
                                Pagar utilizando cartão
                            </Text>
                        </TouchableOpacity>
                    )}
                    <ActionButton
                        label="Confirmar pagamento"
                        onPress={
                            numeral(consolidatedAmount || value).value() >
                                numeral(balance).value() ||
                            numeral(consolidatedAmount || value).value() ===
                                numeral(0).value()
                                ? () =>
                                      Alert.alert(
                                          'Pagamento',
                                          'Saldo insuficiente'
                                      )
                                : () => onPress()
                        }
                    />
                </SafeAreaView>
            </View>
        </>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop: 80 + 25,
        paddingBottom: isSmallDevice ? 15 : 50
    },
    safeArea: {
        flex: 1
    },
    scroll: {
        flex: 1,
        marginBottom: 15
    },
    box: {
        backgroundColor: colors.gray.seventh,
        marginBottom: 23,
        borderRadius: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingTop: isSmallDevice ? 20 : 40
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: colors.text.second,
        marginBottom: isSmallDevice ? 8 : 15,
        textAlign: 'center'
    },
    dueDate: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: colors.text.third,
        marginBottom: isSmallDevice ? 5 : 16,
        textAlign: 'center'
    },
    currency: {
        fontFamily: 'Roboto-Regular',
        color: colors.gray.second,
        fontSize: 18
    },
    value: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 34,
        marginLeft: 5
    },
    balance: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14
    },
    infoTitle: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 18,
        marginBottom: 10
    },
    block: {
        marginBottom: 15
    },
    label: {
        fontSize: 14,
        color: colors.text.third,
        fontFamily: 'Roboto-Regular',
        marginBottom: 5
    },
    infoValue: {
        fontSize: 17,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    }
});
