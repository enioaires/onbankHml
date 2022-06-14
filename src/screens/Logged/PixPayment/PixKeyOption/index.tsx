import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import numeral, { options } from 'numeral';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';

// Components
import OptionButtonGray from '../../../../components/OptionButtonGray';
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../../store/types';
import { clearPixPaymentStateAction } from '../../../../store/ducks/pixPayment/actions';

// Styles
import colors from '../../../../styles/colors';

// Navigation type
import { PixPaymentsStackNavigationProps } from 'src/routes/Logged/types';

export type keyType = 'CPF-CNPJ' | 'Phone' | 'Evp' | 'Email';

const eyeClose = require('../../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../../assets/icons/new_icons/show-white.png');

const PixKeyOption: React.FC<PixPaymentsStackNavigationProps<'PixKeyOption'>> =
    ({ navigation }: PixPaymentsStackNavigationProps<'PixKeyOption'>) => {
        const dispatch = useDispatch();
        const headerStackHeight = useHeaderHeight();
        const userBalance = useSelector(
            (state: IApplicationState) => state.balance.data?.available
        );

        const [balanceAmount, balanceCents] = numeral(userBalance)
            .format('0,0.00')
            .split(',');
        const [hideBalance, setHideBalance] = useState(false);

        // Clear value state
        useEffect(() => {
            return () => {
                dispatch(clearPixPaymentStateAction());
            };
        }, [dispatch]);

        useFocusEffect(
            useCallback(() => {
                dispatch(clearPixPaymentStateAction());
            }, [])
        );

        const pixOptions = ['CPF-CNPJ', 'Email', 'Phone', 'Evp'];
        const onPress = (value: keyType) => {
            if (!pixOptions.includes(value)) {
                return;
            }
            navigation.push('PixPayment', {
                screen: 'Value',
                params: { type: value }
            });
        };

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <LinearGradientHeader
                    style={{ paddingVertical: 10 }}
                    isHeaderStackHeight
                >
                    <View style={styles.headerTop}>
                        <Text style={styles.balanceLabel}>
                            Saldo disponível
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.balanceAmount}>
                                {hideBalance
                                    ? `R$  ***,`
                                    : `R$  ${balanceAmount},`}
                            </Text>
                            <Text style={styles.balanceCents}>
                                {hideBalance ? `**` : balanceCents}
                            </Text>
                            <TouchableOpacity
                                style={{ justifyContent: 'center' }}
                                onPress={() =>
                                    setHideBalance((oldstate) => !oldstate)
                                }
                            >
                                <Image
                                    source={hideBalance ? eyeClose : eyeOpen}
                                    style={{ width: 22, height: 22 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradientHeader>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.optionsContainer}>
                        <Text style={styles.title}>Escolha a chave Pix</Text>
                        <OptionButtonGray
                            title="CPF / CNPJ"
                            onPress={() => onPress('CPF-CNPJ')}
                        />
                        <OptionButtonGray
                            title="Email"
                            onPress={() => onPress('Email')}
                        />
                        <OptionButtonGray
                            title="Celular"
                            onPress={() => onPress('Phone')}
                        />
                        <OptionButtonGray
                            title="Chave Aleatória"
                            onPress={() => onPress('Evp')}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 24,
        overflow: 'hidden'
    },
    headerTop: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    headerBar: {
        height: 1,
        backgroundColor: colors.white,
        opacity: 0.3
    },
    balanceLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: colors.white,
        marginBottom: 6
    },
    balanceAmount: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: colors.white
    },
    balanceCents: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.white,
        marginRight: 10
    },
    optionsContainer: {
        paddingHorizontal: 24,
        paddingTop: 20
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: colors.text.fifth,
        alignSelf: 'center',
        marginBottom: 20
    }
});

export default PixKeyOption;
