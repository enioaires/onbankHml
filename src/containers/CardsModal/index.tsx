import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

// Components
import Modal from '../../components/Modal';

// Store
import {
    selectPaymentCreditCardAction,
    getCreditCardInstallmentsAction
} from '../../store/ducks/payment/actions';

// Styles
import colors from '../../styles/colors';

// Utils
import { getCreditCardBrand } from '../../utils/helpers';
import { maskCardNumber } from '../../utils/prettiers';

interface IProps {
    visible: boolean;
    setVisible(value: boolean): void;
    cards: any;
    amount: number;
    navigation: any;
    feature: null | 'Payment' | 'QRCodeConfirmation';
}

export default function CardsModal({
    visible,
    setVisible,
    cards,
    amount,
    navigation,
    feature
}: IProps) {
    const dispatch = useDispatch();

    const onItemClick = (item: any) => {
        dispatch(
            selectPaymentCreditCardAction({
                cardNumber: item.cardNumber,
                nameOnCard: item.nameOnCard,
                expirationMonth: item.expirationMonth,
                expirationYear: item.expirationYear,
                cvv: item.cvv,
                cardType: item.cardType,
                holderData: {
                    taxId: item.documentNumber,
                    country: 'BRA'
                },
                accountId: item.accountId,
                currency: 'BRL',
                installments: 0,
                amount
            })
        );
        setVisible(false);
        setTimeout(() => {
            dispatch(getCreditCardInstallmentsAction(navigation));
        }, 500);
    };

    const addCard = () => {
        setVisible(false);
        setTimeout(() => {
            navigation.push('Wallet', {
                screen: 'NewCard',
                params: { feature }
            });
        }, 400);
    };

    const renderCard = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                key={index}
                onPress={() => onItemClick(item)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={getCreditCardBrand(item.cardType, true)}
                        style={[
                            styles.logo,
                            item.cardType !== 'visa' && { height: 40 }
                        ]}
                    />
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={styles.cardNumber}
                        >
                            {maskCardNumber(item.cardNumber)}
                        </Text>
                    </View>
                </View>
                <Image
                    source={require('../../../assets/icons/forward.png')}
                    style={styles.forwardIcon}
                />
            </TouchableOpacity>
        );
    };

    const hasCards = cards.length > 0;

    return (
        <Modal visible={visible}>
            <>
                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={{
                            position: 'absolute',
                            top: 22,
                            left: 24
                        }}
                    >
                        <Image
                            source={require('../../../assets/icons/close.png')}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.title}>
                        Escolha o cartão
                    </Text>
                </View>
                {visible && hasCards ? (
                    <FlatList
                        style={{
                            maxHeight: 190
                        }}
                        data={cards}
                        renderItem={renderCard}
                        keyExtractor={(_, index) => index.toString()}
                    />
                ) : (
                    <Text
                        allowFontScaling={false}
                        style={[styles.title, { fontSize: 15 }]}
                    >
                        Sem cartões cadastrados
                    </Text>
                )}
                <TouchableOpacity style={styles.bottom} onPress={addCard}>
                    <Image
                        source={require('../../../assets/icons/add.png')}
                        style={styles.addIcon}
                    />
                    <Text
                        allowFontScaling={false}
                        style={styles.add}
                    >{`Adicionar ${hasCards ? 'novo' : ''} cartão`}</Text>
                </TouchableOpacity>
                <Text allowFontScaling={false} style={styles.taxTitle}>
                    Importante:
                </Text>
                <View style={styles.taxBox}>
                    <Text allowFontScaling={false} style={styles.taxText}>
                        taxa de conveniência do cartão:
                    </Text>
                    <Text allowFontScaling={false} style={styles.tax}>
                        4
                        <Text
                            allowFontScaling={false}
                            style={{ fontFamily: 'Roboto-Light' }}
                        >
                            %
                        </Text>
                    </Text>
                </View>
            </>
        </Modal>
    );
}

const styles = StyleSheet.create({
    top: {
        position: 'relative',
        borderBottomWidth: 0.7,
        borderBottomColor: colors.gray.third
    },
    closeIcon: {
        width: 16,
        height: 16
    },
    title: {
        fontSize: 17,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        marginBottom: 28,
        marginTop: 56,
        opacity: 0.54,
        textAlign: 'center'
    },
    taxTitle: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        marginBottom: 10,
        opacity: 0.54,
        marginLeft: 25
    },
    taxBox: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginBottom: 20
    },
    taxText: {
        fontSize: 16,
        fontFamily: 'Roboto-Light',
        color: colors.text.second,
        opacity: 0.54
    },
    tax: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        opacity: 0.54
    },
    itemContainer: {
        borderBottomWidth: 0.7,
        borderBottomColor: colors.gray.third,
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 38,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90
    },
    logo: {
        width: 60,
        height: 20,
        marginRight: 25
    },
    cardNumber: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        opacity: 0.54
    },
    account: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        opacity: 0.8,
        marginTop: 4
    },
    forwardIcon: {
        width: 6,
        height: 12
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        width: 20,
        height: 20,
        marginRight: 19
    },
    add: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.text.second,
        opacity: 0.8,
        marginVertical: 26
    }
});
