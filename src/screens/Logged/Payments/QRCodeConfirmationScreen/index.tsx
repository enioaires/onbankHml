import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Alert } from 'react-native';
import numeral from 'numeral';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as dateFns from 'date-fns';

// Components
import ActionButton from '../../../../components/ActionButton';
// import CardsModal from '../../../../containers/CardsModal';

// Store
import { IApplicationState } from '../../../../store/types';
import { requestQRCodePaymentAction } from '../../../../store/ducks/payment/actions';
// import { getCardsAction } from '../../../../store/ducks/wallet/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen();

const QRCodeConfirmationScreen: React.FC<
    PaymentsStackNavigationProps<'QRCodeConfirmation'>
> = ({ navigation }: PaymentsStackNavigationProps<'QRCodeConfirmation'>) => {
    const dispatch = useDispatch();
    const [
        amount,
        taxId,
        branch,
        account,
        name,
        description,
        balance
        // cards
    ] = useSelector((state: IApplicationState) => {
        return [
            state.payment.qrCodePayload?.amount,
            state.payment.qrCodePayload?.taxId,
            state.payment.qrCodePayload?.branch,
            state.payment.qrCodePayload?.account,
            state.payment.qrCodePayload?.name,
            state.payment.qrCodePayload?.description,
            state.balance.data?.available
            // state.wallet.data
        ];
    }, shallowEqual);
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    // const [cardsModal, setCardsModal] = useState(false);

    const formattedAmount = parseFloat(amount!);

    // const getCards = async () => {
    //     dispatch(getCardsAction());
    //     setCardsModal(true);
    // };

    const onPress = async () => {
        navigation.push('General', {
            screen: 'TransactionPassword',
            params: {
                action: (password) =>
                    dispatch(requestQRCodePaymentAction(navigation, password)),
                url: '/v2/qrcode/pay'
            }
        });
    };

    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar apenas 1 (um) pagamento por qrcode no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
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
            {/* <CardsModal
                navigation={navigation}
                visible={cardsModal}
                setVisible={setCardsModal}
                cards={cards}
                feature="QRCodeConfirmation"
            /> */}
            <View
                style={[styles.container, isSmallDevice && { paddingTop: 80 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={[styles.title]}>
                            Pagamento QR Code
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.valueLabel}
                        >
                            Valor
                        </Text>
                        <Text allowFontScaling={false} style={styles.value}>
                            {numeral(formattedAmount).format('$ 0,0.00')}
                        </Text>
                        <Text allowFontScaling={false} style={styles.dateLabel}>
                            Data do pagamento{' '}
                            <Text allowFontScaling={false} style={styles.date}>
                                {dateFns.format(new Date(), 'dd/MM')}
                            </Text>
                        </Text>
                        <Text allowFontScaling={false} style={styles.boxTitle}>
                            Pagamento para:
                        </Text>
                        <View style={styles.box}>
                            <Text
                                allowFontScaling={false}
                                style={styles.infoTitle}
                            >
                                {name}
                            </Text>
                            <View style={styles.block}>
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
                                    {taxId}
                                </Text>
                            </View>
                            <View style={styles.block}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Instituição
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.infoValue}
                                >
                                    Onbank
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.block, { width: '50%' }]}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Agência{' '}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.infoValue}
                                    >
                                        {branch}
                                    </Text>
                                </View>
                                <View
                                    style={[[styles.block, { width: '50%' }]]}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Conta{' '}
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.infoValue}
                                    >
                                        {account}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.block,
                                    { marginBottom: isSmallDevice ? 15 : 30 }
                                ]}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Descrição do pagamento
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.infoValue}
                                >
                                    {description}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/* <TouchableOpacity
                            style={{
                                alignSelf: 'stretch',
                                marginBottom: isSmallDevice ? 15 : 20
                            }}
                            onPress={getCards}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Medium',
                                    color: colors.blue.second,
                                    textAlign: 'center'
                                }}
                            >
                                Pagar utilizando cartão
                            </Text>
                        </TouchableOpacity> */}
                        <ActionButton
                            label="Confirmar pagamento"
                            onPress={
                                numeral(formattedAmount).value() >
                                numeral(balance).value()
                                    ? () =>
                                          Alert.alert(
                                              'Pagamento',
                                              'Saldo insuficiente'
                                          )
                                    : () => onPress()
                            }
                        />
                    </View>
                </SafeAreaView>
            </View>
        </>
    );
};

export default QRCodeConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    box: {
        backgroundColor: colors.gray.seventh,
        marginBottom: 23,
        borderRadius: 10,
        paddingHorizontal: 19,
        paddingTop: isSmallDevice ? 15 : 22
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: colors.text.second,
        marginBottom: 10,
        textAlign: 'center'
    },
    valueLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 5,
        textAlign: 'center'
    },
    value: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 9
    },
    dateLabel: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: isSmallDevice ? 18 : 30
    },
    date: {
        fontFamily: 'Roboto-Bold',
        color: colors.blue.primary,
        fontSize: 16
    },
    boxTitle: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 9
    },
    infoTitle: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 18,
        marginBottom: isSmallDevice ? 10 : 23,
        textAlign: 'center'
    },
    block: {
        marginBottom: isSmallDevice ? 8 : 15
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
