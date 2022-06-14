import React, { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import numeral from 'numeral';

// Components
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    requestRechargeAction,
    addRechargeContactAction
} from '../../../../store/ducks/recharge/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { maskPhoneNumber } from '../../../../utils/prettiers';

// Navigation Type
import { RechargeStackNavigationProps } from '../../../../routes/Logged/types';

const ConfirmationScreen: React.FC<
    RechargeStackNavigationProps<'Confirmation'>
> = ({ navigation }: RechargeStackNavigationProps<'Confirmation'>) => {
    const dispatch = useDispatch();
    const [phoneNumber, amount, operator, name] = useSelector(
        (state: IApplicationState) => {
            return [
                state.recharge.payload.mobilePhone.phoneNumber,
                state.recharge.payload.totalAmount,
                state.recharge.payload.carrier.carrierName,
                state.recharge.payload.name
            ];
        },
        shallowEqual
    );

    const handleRequestPhoneRecharge = (transactionPassword?: string) => {
        dispatch(requestRechargeAction(navigation, transactionPassword));
    };
    const onPress = () => {
        navigation.push('General', {
            screen: 'TransactionPassword',
            params: {
                action: handleRequestPhoneRecharge,
                url: '/v2/phone-recharge/recharge'
            }
        });
    };

    useEffect(() => {
        return () => {
            dispatch(addRechargeContactAction(''));
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.box}>
                    <Text allowFontScaling={false} style={styles.title}>
                        Recarga de celular
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        Valor
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            marginBottom: 16
                        }}
                    >
                        <Text allowFontScaling={false} style={styles.currency}>
                            R$
                        </Text>
                        <Text allowFontScaling={false} style={styles.value}>
                            {numeral(amount).format('0,0.00')}
                        </Text>
                    </View>
                    <Text allowFontScaling={false} style={styles.label}>
                        Operadora
                    </Text>
                    <Text allowFontScaling={false} style={styles.phone}>
                        {operator}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        Número do celular
                    </Text>
                    <Text allowFontScaling={false} style={styles.phone}>
                        {maskPhoneNumber(phoneNumber)}
                    </Text>
                    {name.length > 0 && (
                        <>
                            <Text allowFontScaling={false} style={styles.label}>
                                Nome do contato
                            </Text>
                            <Text allowFontScaling={false} style={styles.phone}>
                                {name}
                            </Text>
                        </>
                    )}
                </View>
                <ActionButton label="Recarregar" onPress={onPress} />
            </SafeAreaView>
        </View>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container,
        paddingTop: 80 + 50,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 23,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular',
        marginBottom: 21,
        textAlign: 'center'
    },
    box: {
        backgroundColor: colors.gray.seventh,
        marginBottom: 23,
        borderRadius: 10,
        paddingHorizontal: 19,
        paddingTop: 22
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
    label: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5
    },
    phone: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 25
    }
});
