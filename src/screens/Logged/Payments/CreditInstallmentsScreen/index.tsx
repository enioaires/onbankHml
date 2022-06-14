import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import Checkbox from '../../../../components/Checkbox';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    setCrediCardInstallmentAmountAction,
    requestPaymentAction,
    clearPaymentCreditCardAction
} from '../../../../store/ducks/payment/actions';

// Styles
import colors from '../../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';
import { IPaymentCreditCardInstallment } from '../../../../store/ducks/payment/types';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const CreditInstallmentsScreen: React.FC<
    PaymentsStackNavigationProps<'CreditInstallments'>
> = ({ navigation }: PaymentsStackNavigationProps<'CreditInstallments'>) => {
    const dispatch = useDispatch();

    const [installments, installmentAmount, installmentTimes] = useSelector(
        (state: IApplicationState) => {
            return [
                state.payment.creditCardInstallments,
                state.payment.creditCardData?.amount,
                state.payment.creditCardData?.installments
            ];
        },
        shallowEqual
    );

    const renderItem = ({
        item,
        index
    }: {
        item: IPaymentCreditCardInstallment;
        index: number;
    }) => {
        const [times, amount] = item.label.split('R$');
        const [paper, cents] = amount.split('.');

        return (
            <Checkbox
                checked={
                    item.totalAmount === installmentAmount &&
                    index + 1 === installmentTimes
                }
                onChange={() =>
                    dispatch(
                        setCrediCardInstallmentAmountAction(
                            item.totalAmount,
                            index + 1,
                            `${paper.replace(/\,/g, '.')},${cents}`
                        )
                    )
                }
                checkStyle={{
                    color: colors.gray.nineth,
                    size: 28
                }}
                style={styles.itemContainer}
            >
                <Text allowFontScaling={false} style={styles.itemName}>
                    {times} R$ {paper.replace(/\,/g, '.')},{cents}
                </Text>
            </Checkbox>
        );
    };

    const onPress = () => {
        navigation.push('General', {
            screen: 'TransactionPassword',
            params: {
                action: (password) =>
                    dispatch(requestPaymentAction(navigation, password)),
                url: '/payment/creditcard/billet',
                isCreditCardPayment: true
            }
        });
    };

    useEffect(() => {
        return () => {
            dispatch(clearPaymentCreditCardAction());
        };
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={{ flex: 1 }}>
                    <Text allowFontScaling={false} style={styles.title}>
                        Em quantas parcelas{'\n'}deseja pagar?
                    </Text>
                    {/* <Text allowFontScaling={false} style={[styles.balance]}>
                        Saldo{' '}
                        <Text allowFontScaling={false} style={{ fontFamily: 'Roboto-Bold' }}>
                            disponível:{' '}
                        </Text>
                        {numeral(balance).format('$ 0,0.00')}
                    </Text> */}
                    <FlatList
                        style={styles.list}
                        data={installments}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <ActionButton
                    label="Pagar"
                    style={{
                        marginHorizontal: 25,
                        marginTop: 50
                    }}
                    disabled={installmentTimes! <= 0}
                    onPress={onPress}
                />
            </SafeAreaView>
        </View>
    );
};

export default CreditInstallmentsScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: isSmallScreen ? 80 : 80 + 20,
        paddingBottom: 25,
        flex: 1
    },
    safeArea: {
        flex: 1
    },
    title: {
        fontSize: 23,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular',
        marginLeft: 25,
        marginBottom: 20
    },
    list: {
        flex: 1
    },
    itemContainer: {
        height: 50,
        alignSelf: 'stretch',
        paddingHorizontal: 36,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemName: {
        fontSize: 16,
        color: colors.text.fourth,
        fontFamily: 'Roboto-Bold',
        marginLeft: 10
    },
    icon: {
        width: 6,
        height: 12
    },
    balance: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        marginLeft: 25,
        marginBottom: 35
    }
});
