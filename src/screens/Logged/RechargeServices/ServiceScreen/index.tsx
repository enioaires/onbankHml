/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    FlatList,
    ScrollView,
    TextInput,
    Keyboard,
    Image
} from 'react-native';

import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import numeral from 'numeral';
import { RECHARGE_SERVICES_OPTIONS } from '../../../../utils/variables';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';
import ActionButton from '../../../../components/ActionButton';
import TextInputComp from '../../../../components/TextInput';
import OptionButtonCircle from '../../../../components/OptionButtonCircle';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    getRechargeServicesValuesAction,
    changeRechargeServicesSelectedAction,
    requestRechargeServiceAction,
    clearRechargeServicesStateAction,
    changeRechargeServicesPayloadAction
} from '../../../../store/ducks/rechargeServices/actions';
import {
    requestCashbackChargeAction,
    clearCashbackStatementDataAction
} from '../../../../store/ducks/cashback/actions';

// Types
import { RechargeServicesStackNavigationProps } from '../../../../routes/Logged/types';
import {
    IRechargeServiceValues,
    IRechargeService
} from '../../../../store/ducks/rechargeServices/types';

// Styles
import colors from '../../../../styles/colors';
import {
    getCashbackAction,
    getCashbackBalanceAction
} from '../../../../store/ducks/cashback/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

const eyeClose = require('../../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../../assets/icons/new_icons/show-white.png');

const ServiceScreen: React.FC<
    RechargeServicesStackNavigationProps<'Service'>
> = ({
    navigation,
    route
}: RechargeServicesStackNavigationProps<'Service'>) => {
    const itemParams = route.params.item;
    const dispatch = useDispatch();
    const headerStackHeight = useHeaderHeight();

    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    const signerCode = useSelector(
        (state: IApplicationState) => state.rechargeServices.payload.signerCode
    );
    const [amount] = useSelector((state: IApplicationState) => {
        return [state.rechargeServices.payload.amount];
    }, shallowEqual);
    const [serviceValuesList] = useSelector((state: IApplicationState) => {
        return [state.rechargeServices.rechargeServiceValuesList];
    }, shallowEqual);
    const serviceValuesSelected = useSelector(
        (state: IApplicationState) =>
            state.rechargeServices.rechargeServiceSelected,
        shallowEqual
    );
    const cashbackBalance = useSelector(
        (state: IApplicationState) => state.cashback.balance.balance,
        shallowEqual
    );
    const isLoading = useSelector(
        (state: IApplicationState) => state.rechargeServices.isLoading,
        shallowEqual
    );
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    // console.log(amount)
    //console.log(serviceValuesSelected)
    const [isInputType, setInputType] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [isConfirmStep, setConfirmStep] = useState(false);
    const [hideBalance, setHideBalance] = useState(false);
    const [balanceAmount, balanceCents] = numeral(userBalance)
        .format('0,0.00')
        .split(',');
    const [isCashback, setIsCashback] = useState(false);

    useEffect(() => {
        dispatch(clearRechargeServicesStateAction());
        dispatch(
            getRechargeServicesValuesAction({
                providerId: itemParams.providerId,
                name: itemParams.name
            })
        );

        return () => {
            dispatch(clearRechargeServicesStateAction()),
                dispatch(clearCashbackStatementDataAction());
        };
    }, [itemParams.providerId]);

    const handleOnPressOption = (item: IRechargeServiceValues) => {
        dispatch(
            changeRechargeServicesPayloadAction({
                amount: item.minValue,
                product: itemParams.name
            })
        );
        dispatch(changeRechargeServicesSelectedAction(item));
    };

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
                    'A conta demonstrativa só permite realizar apenas 1 (uma) recarga no valor de até R$ 50,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                action: {
                    mainLabel: 'Completar conta',
                    onPress: initiateKYCFlow,
                    secondLabel: 'Agora não'
                }
            })
        );
    };

    const handleRequestCharge = (transactionPassword: string) => {
        if (isCashback) {
            return dispatch(
                requestCashbackChargeAction({
                    navigation,
                    providerId: itemParams.providerId,
                    password: transactionPassword
                })
            );
        }
        dispatch(
            requestRechargeServiceAction({
                navigation,
                providerId: itemParams.providerId,
                password: transactionPassword
            })
        );
    };

    const handleOnPressActionButton = () => {
        if (Number(amount) > 50 && isDemo) {
            return showDemoAlert();
        }

        if (isConfirmStep && isChecked) {
            if (isCashback) {
                return navigation.push('General', {
                    screen: 'TransactionPassword',
                    params: {
                        action: (password) =>
                            dispatch(
                                requestCashbackChargeAction({
                                    navigation,
                                    providerId: itemParams.providerId,
                                    password
                                })
                            ),
                        onFillPassword: handleRequestCharge
                    }
                });
            }

            navigation.push('General', {
                screen: 'TransactionPassword',
                params: {
                    action: (password) =>
                        dispatch(
                            requestRechargeServiceAction({
                                navigation,
                                providerId: itemParams.providerId,
                                password
                            })
                        )
                }
            });
        } else if (isConfirmStep) {
            setChecked(true);
            Keyboard.dismiss();
        } else {
            setConfirmStep(true);
        }
    };

    const handleInputType = () => {
        if (itemParams.providerId == 2127) setInputType(true);

        if (
            serviceValuesSelected.maxValue == serviceValuesSelected.minValue &&
            !isInputType
        ) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    };

    const handleOnChangeText = (value: string) => {
        const treatment = value.replace(/\D/g, '').trim();
        const paper = treatment.substring(0, treatment.length - 2);
        const cents = treatment
            .replace(/\D/g, '')
            .substring(treatment.length - 2);
        const valueParsed = `${paper}.${cents}`;
        dispatch(
            changeRechargeServicesPayloadAction({
                amount: Number(valueParsed)
            })
        );
    };

    const handleDescriptionRechargeService = (itemParams: IRechargeService) => {
        let description = null;
        RECHARGE_SERVICES_OPTIONS.forEach((element) => {
            if (itemParams.name.toUpperCase().includes(element.serviceName)) {
                description = element.description;
            }
        });
        if (description) {
            return description;
        }
        return 'Adicione crédito ao serviço desejado através de uma simples recarga. Selecione o produto desejado e resgate-o na plataforma do serviço.';
    };

    useEffect(() => {
        handleInputType();
    }, [itemParams.providerId, serviceValuesSelected]);

    return (
        <View style={[styles.container]}>
            <StatusBar barStyle={'light-content'} />
            <LinearGradientHeader isHeaderStackHeight>
                <View style={styles.headerTop}>
                    <Text style={styles.balanceLabel}>Saldo disponível</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.balanceAmount}>
                            {hideBalance ? `R$  ***,` : `R$  ${balanceAmount},`}
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
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
                <SafeAreaView style={{ flex: 1 }}>
                    {isConfirmStep ? (
                        <ScrollView>
                            <View
                                style={[
                                    styles.contentContainer,
                                    {
                                        alignItems: 'center',
                                        paddingTop: 20,
                                        paddingHorizontal: 44
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.inFooterButtonText2,
                                        {
                                            color: colors.blue.primary,
                                            marginBottom: 20
                                        }
                                    ]}
                                >
                                    Recarga escolhida
                                </Text>
                                <Text
                                    style={[
                                        styles.titleService,
                                        { color: colors.text.third }
                                    ]}
                                >
                                    {itemParams.name}
                                </Text>
                                {serviceValuesSelected.productName ? (
                                    <Text
                                        style={[
                                            styles.infoTitle,
                                            {
                                                marginVertical: 0,
                                                color: colors.text.third
                                            }
                                        ]}
                                    >
                                        {`Nome da recarga: ${serviceValuesSelected.productName}`}
                                    </Text>
                                ) : null}
                                {serviceValuesSelected.maxValue ===
                                serviceValuesSelected.minValue ? (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text
                                            style={[
                                                styles.titleService,
                                                { color: colors.text.third }
                                            ]}
                                        >
                                            {'R$ '}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.titleService,
                                                { color: colors.blue.sixth }
                                            ]}
                                        >
                                            {numeral(amount).format('0,0.00')}
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        <Text style={styles.infoTitle}>
                                            {`Insira um valor entre ${serviceValuesSelected.minValue} e ${serviceValuesSelected.maxValue} reais`}
                                        </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={[
                                                    styles.titleService,
                                                    {
                                                        color: colors.text.third
                                                    }
                                                ]}
                                            >
                                                {'R$ '}
                                            </Text>
                                            <TextInputComp
                                                style={[
                                                    styles.titleService,
                                                    {
                                                        borderWidth: 0,
                                                        lineHeight: 24,
                                                        color: colors.blue
                                                            .sixth,
                                                        marginVertical: 0,
                                                        marginTop: 4
                                                    }
                                                ]}
                                                placeholderTextColor={
                                                    colors.text.second
                                                }
                                                autoFocus
                                                placeholder="0,00"
                                                name="Amount"
                                                type="money"
                                                options={{
                                                    unit: ''
                                                }}
                                                value={amount}
                                                onChangeText={(
                                                    _,
                                                    value: string
                                                ) => handleOnChangeText(value)}
                                                editable={!isChecked}
                                            />
                                        </View>
                                    </>
                                )}
                                <View
                                    style={[
                                        styles.infoBar,
                                        { marginTop: 0 },
                                        isChecked && {
                                            backgroundColor: colors.blue.primary
                                        }
                                    ]}
                                />
                                {isInputType && (
                                    <TextInput
                                        style={[
                                            styles.textInput,
                                            isChecked && {
                                                borderColor: colors.blue.primary
                                            }
                                        ]}
                                        value={signerCode}
                                        onChangeText={(text) => {
                                            dispatch(
                                                changeRechargeServicesPayloadAction(
                                                    {
                                                        signerCode: text
                                                    }
                                                )
                                            );
                                        }}
                                        placeholder={
                                            'Insira o código do assinante'
                                        }
                                        editable={!isChecked}
                                        placeholderTextColor={
                                            colors.gray.second
                                        }
                                    />
                                )}
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 24,
                                    marginTop: 40
                                }}
                            >
                                <OptionButtonCircle
                                    variableToCheck={isCashback}
                                    onPress={() =>
                                        setIsCashback((oldstate) => !oldstate)
                                    }
                                    style={{
                                        height: 85,
                                        paddingLeft: 10,
                                        opacity:
                                            cashbackBalance < amount ? 0.65 : 1
                                    }}
                                    disabled={cashbackBalance < amount}
                                >
                                    <View
                                        style={{
                                            height: '100%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={styles.titleCashback}>
                                            Utilizar saldo de Cashback
                                        </Text>
                                        <Text style={styles.valueCashback}>
                                            {`Disponível: R$ ${numeral(
                                                cashbackBalance
                                            ).format('0,0.00')}`}
                                        </Text>
                                    </View>
                                </OptionButtonCircle>
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={styles.titleService}>
                                    {itemParams.name}
                                </Text>
                                {numeral(amount).value() >
                                    numeral(userBalance).value() && (
                                    <Text style={styles.balanceUnavaliable}>
                                        Saldo indisponível
                                    </Text>
                                )}
                            </View>
                            <View style={styles.valuesContainer}>
                                {isLoading && (
                                    <ActivityIndicator
                                        size={'large'}
                                        color={colors.blue.second}
                                        style={{ marginTop: 40 }}
                                    />
                                )}
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={serviceValuesList}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                    renderItem={({ item }) => {
                                        const isValueDifferent =
                                            item.maxValue !== item.minValue;
                                        return (
                                            <OptionButtonCircle
                                                onPress={() =>
                                                    handleOnPressOption(item)
                                                }
                                                activeOpacity={0.55}
                                                variableToCheck={
                                                    serviceValuesSelected.productName ===
                                                        item.productName &&
                                                    serviceValuesSelected.maxValue ===
                                                        item.maxValue &&
                                                    serviceValuesSelected.dueProduct ===
                                                        item.dueProduct
                                                }
                                                style={styles.valueButton}
                                            >
                                                <View
                                                    style={{
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    {/* <Entypo
                                                        name='credit'
                                                        size={20}
                                                        color={colors.text.fourth}
                                                    /> */}
                                                    <Text
                                                        style={[
                                                            styles.inTopButtonText,
                                                            !isValueDifferent &&
                                                                !item.productName && {
                                                                    height: 0
                                                                }
                                                        ]}
                                                    >
                                                        {isValueDifferent
                                                            ? 'Definir valor'
                                                            : item.productName}
                                                    </Text>
                                                    <View
                                                        style={
                                                            styles.inFooterButton
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.inFooterButtonText1
                                                            }
                                                        >
                                                            Recarregar
                                                        </Text>
                                                        <Text
                                                            style={[
                                                                styles.inFooterButtonText2
                                                            ]}
                                                        >
                                                            {isValueDifferent
                                                                ? `R$ ${numeral(
                                                                      item.minValue
                                                                  ).format(
                                                                      '0,0.00'
                                                                  )} - ${numeral(
                                                                      item.maxValue
                                                                  ).format(
                                                                      '0,0.00'
                                                                  )}`
                                                                : `R$ ${numeral(
                                                                      item.minValue
                                                                  ).format(
                                                                      '0,0.00'
                                                                  )}`}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </OptionButtonCircle>
                                        );
                                    }}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBar} />
                                <Text style={styles.infoTitle}>Saiba mais</Text>
                                <ScrollView
                                    showsVerticalScrollIndicator={true}
                                    style={{ marginBottom: 20 }}
                                >
                                    <Text style={styles.infoDescription}>
                                        {handleDescriptionRechargeService(
                                            itemParams
                                        )}
                                    </Text>
                                    <Text style={[styles.infoDescription]}>
                                        Aviso: não é possível realizar o
                                        reembolso dos produtos(Gift Card).
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    )}
                    {isConfirmStep ? (
                        <ActionButton
                            style={{ marginHorizontal: 24 }}
                            label={isChecked ? 'Recarregar' : 'Confirmar'}
                            disabled={
                                amount === 0 ||
                                !amount ||
                                numeral(amount).value() >
                                    numeral(userBalance).value() ||
                                numeral(amount).value() ===
                                    numeral(0).value() ||
                                (isInputType && signerCode.length <= 0) ||
                                amount > serviceValuesSelected.maxValue ||
                                amount < serviceValuesSelected.minValue
                            }
                            onPress={() => handleOnPressActionButton()}
                            isLoading={isLoading}
                        />
                    ) : (
                        <ActionButton
                            style={{ marginHorizontal: 24 }}
                            label="Confirmar"
                            disabled={
                                amount === 0 ||
                                !amount ||
                                numeral(amount).value() >
                                    numeral(userBalance).value() ||
                                numeral(amount).value() === numeral(0).value()
                            }
                            onPress={() => handleOnPressActionButton()}
                        />
                    )}
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ServiceScreen;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 15
    },
    titleService: {
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        color: colors.text.fourth,
        marginVertical: 15
    },
    valuesContainer: {
        flex: 1.4
    },
    valueButton: {
        height: 78,
        width: '100%',
        backgroundColor: colors.gray.tenth,
        borderRadius: 8,
        padding: 8,
        justifyContent: 'space-between',
        marginBottom: 10,
        borderColor: colors.gray.primary,
        borderWidth: 1,
        flexDirection: 'row'
    },
    inTopButtonText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth
    },
    inFooterButton: {
        alignItems: 'flex-start'
    },
    inFooterButtonText1: {
        fontSize: 10,
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth
    },
    inFooterButtonText2: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.text.fourth
    },
    infoContainer: {
        flex: 1
    },
    infoBar: {
        height: 1,
        backgroundColor: colors.gray.fourth,
        width: '100%',
        marginTop: 15
    },
    infoTitle: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        marginVertical: 10
    },
    infoDescription: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth,
        textAlign: 'justify',
        marginBottom: 10
    },
    container: {
        flex: 1,
        paddingBottom: 24
    },
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 24,
        overflow: 'hidden'
    },
    headerTop: {
        flexDirection: 'row',
        paddingVertical: 10,
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
    textInput: {
        width: '100%',
        borderColor: colors.gray.fourth,
        borderWidth: 1,
        height: 40,
        marginTop: 40,
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.text.third,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    balanceUnavaliable: {
        color: colors.blue.second,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        marginBottom: 15
    },
    titleCashback: {
        color: colors.text.fourth,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5,
        fontSize: 16
    },
    valueCashback: {
        color: colors.text.fourth,
        fontFamily: 'Roboto',
        fontSize: 15
    }
});
