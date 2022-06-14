/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    Image,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components
import InputBlocks from '../../components/TransactionPasswordInputs';
import TransactionSuccessModal from '../TransactionSuccessModal';

// Store
import { IApplicationState } from '../../store/types';

// Styles
import colors from '../../styles/colors';
import { paddings } from '../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../utils/helpers';

// Navigation Type
import { GeneralStackNavigationProps } from '../../routes/Logged/types';
import { validateTransactionPasswordAction } from '../../store/ducks/password/actions';

const isSmallScren = isDeviceSmallScreen();

const TransactionPasswordScreen: React.FC<
    GeneralStackNavigationProps<'TransactionPassword'>
> = ({
    navigation,
    route
}: GeneralStackNavigationProps<'TransactionPassword'>) => {
    const dispatch = useDispatch();
    const {
        action,
        url,
        isCreditCardPayment,
        clearStateAction,
        onFillPassword,
        localLoading=false
    } = route.params;
    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );
    const loading = useSelector(
        (state: IApplicationState) => state.password.validateLoading
    );
    const rechargeServicesList = useSelector(
        (state: IApplicationState) =>
            state.rechargeServices.rechargeServicesList
    );
    const [
        transferLoading,
        paymentLoading,
        rechargeLoading,
        cardLoading,
        pixPaymentLoading,
        rechargeServicesLoading,
        insuranceLoading,
        cashbackLoading
    ] = useSelector((state: IApplicationState) => {
        return [
            state.transfer.isLoading,
            state.payment.isLoading,
            state.recharge.isLoading,
            state.card.loading,
            state.pixPayment.isLoading,
            state.rechargeServices.isLoading,
            state.insurance.isLoading,
            state.cashback.isLoading
        ];
    });

    const [password, setPassword] = useState('');
    const [isCancelButton, setCancelButton] = useState(true);

    const verifyPassword = () => {
        setCancelButton(false);
        dispatch(
            validateTransactionPasswordAction(
                action,
                navigation,
                password,
                setCancelButton,
                url
            )
        );
    };

    useEffect(() => {
        if (password.length > 3) {
            if (onFillPassword) {
                return onFillPassword(password);
            }
            verifyPassword();
        }
    }, [password]);

    const hasCard =
        cardBiz === 'CRIADO' ||
        cardBiz === 'ATIVADO' ||
        cardBiz === 'SOLICITADO_SEGUNDA_VIA';

    const disableCancelButton =
        loading ||
        transferLoading ||
        paymentLoading ||
        rechargeLoading ||
        cardLoading ||
        pixPaymentLoading ||
        insuranceLoading ||
        cashbackLoading ||
        localLoading ||
        (rechargeServicesLoading && rechargeServicesList.length > 0);
    // Prevent goBack screen
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // console.log(e)
            if (
                e.data.action.type !== 'POP' &&
                e.data.action.type !== 'GO_BACK'
            ) {
                return;
            } else {
                e.preventDefault();
            }
        });

        return unsubscribe;
    }, [navigation, isCancelButton]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.safeArea}>
                    <TransactionSuccessModal navigation={navigation} />
                    <Text allowFontScaling={false} style={[styles.text]}>
                        Digite a{' '}
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: 'Roboto-Medium',
                                color: colors.blue.second
                            }}
                        >
                            senha{' '}
                            {isCreditCardPayment
                                ? 'de transação da conta'
                                : hasCard
                                ? 'do cartão'
                                : 'de transação'}
                        </Text>
                    </Text>
                    <View
                        style={{
                            paddingHorizontal: '15%'
                        }}
                    >
                        <InputBlocks
                            value={password}
                            setValue={(value) => setPassword(value)}
                        />
                    </View>
                    {(loading ||
                        transferLoading ||
                        paymentLoading ||
                        rechargeLoading ||
                        cardLoading ||
                        pixPaymentLoading ||
                        insuranceLoading ||
                        cashbackLoading ||
                        localLoading ||
                        (rechargeServicesLoading &&
                            rechargeServicesList.length > 0)) && (
                        <ActivityIndicator
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            size="large"
                            color={colors.blue.second}
                        />
                    )}
                    {/* {isCancelButton && 
                        <TouchableOpacity onPress={() => 
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'General' }]
                            }
                        )}
                            style={{}}
                        >
                            <Image
                                source={require('../../../assets/icons/back.png')}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 18,
                                    marginLeft: Platform.OS === 'ios' ? 27 : 16
                                }}
                            />
                        </TouchableOpacity>
                    } */}
                    {isCancelButton && (
                        <TouchableOpacity
                            disabled={disableCancelButton}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'General' }]
                                });
                                if (clearStateAction) {
                                    clearStateAction();
                                }
                            }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '40%',
                                marginBottom: 40
                            }}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default TransactionPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: isSmallScren ? 80 : 80 + 48
    },
    safeArea: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 23,
        marginBottom: 31,
        textAlign: 'center',
        marginTop: '15%'
    },
    cancelText: {
        fontFamily: 'Roboto-Regular',
        color: colors.red,
        fontSize: 17,
        textAlign: 'center'
    }
});
