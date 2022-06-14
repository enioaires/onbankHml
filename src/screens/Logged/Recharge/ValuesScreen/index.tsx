import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import numeral from 'numeral';
import { useHeaderHeight } from '@react-navigation/stack';

import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';

// Components
import Checkbox from '../../../../components/Checkbox';
import ActionButton from '../../../../components/ActionButton';
import AddRechargeContactModal from '../../../../containers/AddRechargeContactModal';
import OptionButtonCircle from '../../../../components/OptionButtonCircle';

// Store
import { IApplicationState } from '../../../../store/types';
import { changeRechargeValueAction } from '../../../../store/ducks/recharge/actions';
import { IRechargeValues } from '../../../../store/ducks/recharge/types';

// Styles
import colors from '../../../../styles/colors';

// Utils
import {
    isDeviceSmallScreen,
    transformToCurrencyPayload
} from '../../../../utils/helpers';

// Navigation Type
import { RechargeStackNavigationProps } from '../../../../routes/Logged/types';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { completeDemoSignupAction } from '../../../../store/ducks/signUp/actions';

const isSmallScreen = isDeviceSmallScreen();

const ValuesScreen: React.FC<RechargeStackNavigationProps<'Values'>> = ({
    navigation
}: RechargeStackNavigationProps<'Values'>) => {
    const dispatch = useDispatch();
    const headerStackHeight = useHeaderHeight();
    const [showModal, setShowModal] = useState(false);
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );

    const [balance, values, amount, name] = useSelector(
        (state: IApplicationState) => {
            return [
                state.balance.data?.available,
                state.recharge.values,
                state.recharge.payload.totalAmount,
                state.recharge.payload.name
            ];
        },
        shallowEqual
    );

    /* const renderItem = ({ item }: { item: IRechargeValues }) => {
        return (
            <Checkbox
                checked={amount === item.amount.toString()}
                onChange={() =>
                    dispatch(changeRechargeValueAction(item.amount.toString()))
                }
                checkStyle={{
                    color: colors.gray.nineth,
                    size: 28
                }}
                style={styles.itemContainer}
            >
                <Text allowFontScaling={false} style={styles.itemName}>
                    {numeral(item.amount).format('$ 0,0.00')}
                </Text>
            </Checkbox>
        );
    }; */

    const initiateKYCFlow = () => {
        IdwallSdk.initialize('3cb30ce77c16f00436ed732539942778');

        if (IdwallSdk.ios) {
            IdwallSdk.ios.setupPublicKeys([
                'AHYMQP+2/KIo32qYcfqnmSn+N/K3IdSZWlqa2Zan9eY=',
                'tDilFQ4366PMdAmN/kyNiBQy24YHjuDs6Qsa6Oc/4c8='
            ]);
        }

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
                    'A conta demonstrativa só permite realizar apenas 1 (uma) recarga no valor de até R$ 20,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                action: {
                    mainLabel: 'Completar conta',
                    onPress: initiateKYCFlow,
                    secondLabel: 'Agora não'
                }
            })
        );
    };

    const onPress = () => {
        if (Number(amount) > 20 && isDemo) {
            return showDemoAlert();
        }
        if (name.length > 0) {
            navigation.push('Recharge', { screen: 'Confirmation' });
        } else {
            setShowModal(true);
        }
    };
    console.log(amount);
    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar apenas 1 (uma) recarga no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
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
            <AddRechargeContactModal
                showAlert={showModal}
                closeAlert={setShowModal}
                navigation={navigation}
            />
            <View
                style={[
                    styles.container,
                    { paddingTop: headerStackHeight + 10 }
                ]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={{ flex: 1, paddingHorizontal: 24 }}>
                        <Text allowFontScaling={false} style={styles.title}>
                            Qual o valor da recarga?
                        </Text>
                        <Text allowFontScaling={false} style={[styles.balance]}>
                            Saldo{' '}
                            <Text
                                allowFontScaling={false}
                                style={{ fontFamily: 'Roboto-Bold' }}
                            >
                                disponível:{' '}
                            </Text>
                            {numeral(balance).format('$ 0,0.00')}
                        </Text>
                        {/* <FlatList
                            style={styles.list}
                            data={values}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={values}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({
                                item
                            }: {
                                item: IRechargeValues;
                            }) => {
                                return (
                                    <OptionButtonCircle
                                        variableToCheck={amount == item.amount}
                                        onPress={() =>
                                            dispatch(
                                                changeRechargeValueAction(
                                                    item.amount.toString()
                                                )
                                            )
                                        }
                                        activeOpacity={0.55}
                                        style={styles.valueButton}
                                    >
                                        <View
                                            style={{ justifyContent: 'center' }}
                                        >
                                            {/* <Entypo
                                                name='credit'
                                                size={20}
                                                color={colors.text.fourth}
                                            /> */}
                                            <Text style={styles.description}>
                                                {numeral(item.amount).format(
                                                    '$ 0,0.00'
                                                )}
                                            </Text>
                                        </View>
                                    </OptionButtonCircle>
                                );
                            }}
                        />
                    </View>
                    <ActionButton
                        label="Continuar"
                        style={{
                            marginHorizontal: 25,
                            marginTop: 15
                        }}
                        disabled={
                            amount.length <= 0 ||
                            amount === 0 ||
                            !amount ||
                            numeral(amount).value() >
                                numeral(userBalance).value() ||
                            numeral(amount).value() === numeral(0).value()
                        }
                        onPress={onPress}
                    />
                </SafeAreaView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
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
    },
    valuesContainer: {
        flex: 1.4
    },
    valueButton: {
        alignItems: 'center',
        paddingLeft: 15
    },
    description: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 16
    }
});

export default ValuesScreen;
