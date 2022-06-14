import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    ActivityIndicator,
    Switch,
    Image,
    Platform,
    StatusBar
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack'
import { format, addHours } from 'date-fns';
import numeral from 'numeral';
import Entypo from 'react-native-vector-icons/Entypo';

// Components
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import CreditCard from '../../../../components/CreditCard';
import LinearGradientHeader from '../../../../components/LinearGradientHeader'

// Store
// import { ICardInput } from '../../../../store/ducks/wallet/types';
import {
    blockCardBizAction,
    cancelCardBizAction,
    disableContactlessShoppingCardBizAction,
    disableInternationalShoppingCardBizAction,
    disableOnlineShoppingCardBizAction,
    disablePhysicalShoppingCardBizAction,
    disableWithdrawCardBizAction,
    enableContactlessShoppingCardBizAction,
    enableInternationalShoppingCardBizAction,
    enableOnlineShoppingCardBizAction,
    enablePhysicalShoppingCardBizAction,
    enableWithdrawCardBizAction,
    getCardBizAction,
    unblockCardBizAction
} from '../../../../store/ducks/card/actions';
import { IApplicationState } from '../../../../store/types';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import {
    isDeviceSmallScreen
    // currencyToCurrencyString
} from '../../../../utils/helpers';

// Navigation Type
import { CardStackNavigationProps } from '../../../../routes/Logged/types';
import { STATES_DATA } from '@brazilian-utils/brazilian-utils/dist/common/states';

// const { width } = Dimensions.get('window');

const blockIcon = require('../../../../../assets/icons/new_icons/block-card.png');
const contactlessIcon = require('../../../../../assets/icons/card-contactless.png');
const onlineIcon = require('../../../../../assets/icons/card-online.png');
const internationalIcon = require('../../../../../assets/icons/card-international.png');
const physicalIcon = require('../../../../../assets/icons/card-physical.png');
const withdrawIcon = require('../../../../../assets/icons/card-withdraw.png');

const eyeClose = require('../../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../../assets/icons/new_icons/show-white.png');

const isSmallScreen = isDeviceSmallScreen();

const ActiveCard: React.FC<CardStackNavigationProps<'Active'>> = ({
    navigation
}: CardStackNavigationProps<'Active'>) => {
    const dispatch = useDispatch();
    const headerHeight = useHeaderHeight()

    // const [isDefineLimitOpen, setIsDefineLimitOpen] = useState(false);

    const didMount = () => {
        dispatch(getCardBizAction());
        // dispatch(getCardBizLimitAction());

        // return () => {
        //     dispatch(clearCardBizStoreAction());
        // };
    };

    const card = useSelector(
        (state: IApplicationState) => state.card.card,
        shallowEqual
    );
    const cardLimit = useSelector(
        (state: IApplicationState) => state.card.cardLimit,
        shallowEqual
    );
    const getCardLoading = useSelector(
        (state: IApplicationState) => state.card.loading
    );
    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );

    const [blockState, setBlockState] = useState(false);
    const [onlineState, setOnlineState] = useState(false);
    const [physicalState, setPhysicalState] = useState(false);
    const [internationalState, setInternationalState] = useState(false);
    const [contactlessState, setContactlessState] = useState(false);
    const [withdrawState, setWithdrawState] = useState(false);
    // const [monthLimit, setMonthLimit] = useState(false);
    // const [monthLimitValue, setMonthLimitValue] = useState('1');

    // Balance avaliable
    const [balanceAmount, balanceCents] = numeral(userBalance).format('0,0.00').split(',');
    const [hideBalance, setHideBalance] = useState(false);

    useEffect(didMount, []);

    useEffect(() => {
        if (card) {
            setBlockState(card.status === 'ATIVO');
            setOnlineState(card.onlineShoppingFunction);
            setPhysicalState(card.physicalShoppingFunction);
            setInternationalState(card.internationalShoppingFunction);
            setContactlessState(card.contactlessShoppingFunction);
            setWithdrawState(card.withdrawCashFunction);
        }
    }, [card]);

    // useEffect(() => {
    //     if (cardLimit) {
    //         setMonthLimit(cardLimit.active);
    //         setMonthLimitValue((cardLimit.limitMonth * 100).toString() || '');
    //     }
    // }, [cardLimit]);

    if ((getCardLoading && !card) || !card) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={{ flex: 1 }}
                    size="large"
                    color={colors.blue.second}
                />
            </View>
        );
    }

    // const spentPercent = cardLimit
    //     ? (numeral(
    //           currencyToCurrencyString(cardLimit?.limitMonthAmount)
    //       ).value() /
    //           numeral(
    //               currencyToCurrencyString(cardLimit?.limitMonth)
    //           ).value()) *
    //       100
    //     : 0;

    // console.log(
    //     'gasto',
    //     numeral(currencyToCurrencyString(cardLimit?.limitMonthAmount)).value()
    // );
    // console.log(
    //     'limite',
    //     numeral(currencyToCurrencyString(cardLimit?.limitMonth)).value()
    // );
    // console.log('calculo', spentPercent);
    // console.log('');
    // console.log('gasto mock', numeral('100.00').value());
    // console.log('limite mock', numeral('100.50').value());
    // console.log(
    //     'calculo mock',
    //     (numeral('100').value() / numeral('100.5').value()) * 100
    // );

    const handleOnPressBlockButton = () => {
        if (card.status === 'ATIVO') {
            dispatch(
                setAlertMessageAction({
                    title: 'Atenção',
                    message: `Você quer bloquear temporariamente${'\n'} o seu cartão?`,
                    action: {
                        mainLabel: 'Bloquear',
                        secondLabel: 'Cancelar',
                        onPress: () => {
                            setBlockState(oldstate => !oldstate);
                            dispatch(
                                blockCardBizAction(() =>
                                    setBlockState(true)
                                )
                            )
                        }},
                    type: 'info'
                })
            )
        } else {
            dispatch(
                setAlertMessageAction({
                    title: 'Atenção',
                    message: `Você quer desbloquear o seu cartão?`,
                    action: {
                        mainLabel: 'Desbloquear',
                        secondLabel: 'Cancelar',
                        onPress: () => {
                            setBlockState(oldstate => !oldstate);
                            dispatch(
                                unblockCardBizAction(() =>
                                    setBlockState(false)
                                )
                            )
                        }},
                    type: 'info'
                })
            )
        }
    }

    return (
        <View 
            style={styles.container}
        >
            <StatusBar barStyle='light-content' />
            <LinearGradientHeader
                style={styles.header}
                isHeaderStackHeight
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.balanceLabel}>
                            Saldo disponível
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.balanceAmount}>
                                {hideBalance ? `R$  ***,` : `R$  ${balanceAmount},`}
                            </Text>
                            <Text style={styles.balanceCents}>
                                {hideBalance ? `**` : balanceCents}
                            </Text>
                            <TouchableOpacity 
                                style={{justifyContent:'center'}}
                                onPress={() => setHideBalance(oldstate => !oldstate)}
                            >
                                <Image
                                    source={hideBalance ? eyeClose : eyeOpen}
                                    style={{ width: 22, height: 22 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradientHeader>
            <SafeAreaView style={[styles.safeArea]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 22, paddingBottom: 20 }}>
                        <CreditCard
                            isOnbank
                            inputMode
                            inputModeCardData={{
                                cardNumber: card?.cardNumberMask || '',
                                nameOnCard: card?.cardName || '',
                                expirationDate: card?.expirationDate
                                    ? format(
                                        addHours(new Date(card.expirationDate), 3),
                                        'MM/yy'
                                    )
                                    : '',
                                cardType: 'visa',
                                cvv: card?.cvv || ''
                            }}
                        />
                        {/* <Text
                            allowFontScaling={false}
                            style={[styles.controlsTitle, { marginTop: 20 }]}
                        >
                            Funções do cartão
                        </Text> */}
                        <View style={styles.controlsContainer}>
                            <View style={styles.controlsButtons}>
                                {/*{blockState && (
                                    <>
                                        <View style={[styles.buttonContainer]}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={withdrawIcon}
                                                    style={styles.icon}
                                                />
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.actionText,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                >
                                                    {/* {card.withdrawCashFunction
                                                        ? `Bloquear saque`
                                                        : `Desbloquear saque`} */}
                                                    {/*Saque
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.statusText,
                                                        withdrawState && styles.statusActive
                                                    ]}
                                                >
                                                    {withdrawState ? 'Ativo' : 'Bloqueado'}
                                                </Text>
                                                <Switch
                                                    style={[
                                                        styles.switch,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                    value={withdrawState}
                                                    disabled={getCardLoading}
                                                    thumbColor="#fff"
                                                    ios_backgroundColor={colors.gray.second}
                                                    trackColor={{
                                                        false: colors.gray.second,
                                                        true: colors.blue.primary
                                                    }}
                                                    onValueChange={(value) => {
                                                        setWithdrawState(value);
                                                        if (card.withdrawCashFunction) {
                                                            dispatch(
                                                                disableWithdrawCardBizAction(
                                                                    () =>
                                                                        setWithdrawState(
                                                                            true
                                                                        )
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(
                                                                enableWithdrawCardBizAction(
                                                                    () =>
                                                                        setWithdrawState(
                                                                            false
                                                                        )
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.buttonContainer
                                                // getCardLoading && card && { opacity: 0.6 }
                                            ]}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={onlineIcon}
                                                    style={styles.icon}
                                                />
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.actionText,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                >
                                                    {/* {card.status === 'ATIVO'
                                                ? 'Bloquear cartão'
                                                : 'Desbloquear cartão'} */}
                                                    {/*Compra online
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.statusText,
                                                        onlineState && styles.statusActive
                                                    ]}
                                                >
                                                    {onlineState ? 'Ativo' : 'Bloqueado'}
                                                </Text>
                                                <Switch
                                                    style={[
                                                        styles.switch,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                    value={onlineState}
                                                    disabled={getCardLoading}
                                                    ios_backgroundColor={colors.gray.second}
                                                    thumbColor="#fff"
                                                    trackColor={{
                                                        false: colors.gray.second,
                                                        true: colors.blue.primary
                                                    }}
                                                    onValueChange={(value) => {
                                                        setOnlineState(value);
                                                        if (card.onlineShoppingFunction) {
                                                            dispatch(
                                                                disableOnlineShoppingCardBizAction(
                                                                    () =>
                                                                        setOnlineState(true)
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(
                                                                enableOnlineShoppingCardBizAction(
                                                                    () =>
                                                                        setOnlineState(
                                                                            false
                                                                        )
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={[styles.buttonContainer]}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={physicalIcon}
                                                    style={styles.icon}
                                                />
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.actionText,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                >
                                                    {/* {card.status === 'ATIVO'
                                                ? 'Bloquear cartão'
                                                : 'Desbloquear cartão'} */}
                                                    {/*Compra física
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.statusText,
                                                        physicalState && styles.statusActive
                                                    ]}
                                                >
                                                    {physicalState ? 'Ativo' : 'Bloqueado'}
                                                </Text>
                                                <Switch
                                                    style={[
                                                        styles.switch,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                    value={physicalState}
                                                    disabled={getCardLoading}
                                                    ios_backgroundColor={colors.gray.second}
                                                    thumbColor="#fff"
                                                    trackColor={{
                                                        false: colors.gray.second,
                                                        true: colors.blue.primary
                                                    }}
                                                    onValueChange={(value) => {
                                                        setPhysicalState(value);
                                                        if (card.physicalShoppingFunction) {
                                                            dispatch(
                                                                disablePhysicalShoppingCardBizAction(
                                                                    () =>
                                                                        setPhysicalState(
                                                                            true
                                                                        )
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(
                                                                enablePhysicalShoppingCardBizAction(
                                                                    () =>
                                                                        setPhysicalState(
                                                                            false
                                                                        )
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={[styles.buttonContainer]}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={contactlessIcon}
                                                    style={styles.icon}
                                                />
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.actionText,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                >
                                                    {/* {card.status === 'ATIVO'
                                                ? 'Bloquear cartão'
                                                : 'Desbloquear cartão'} */}
                                                    {/*Compra por aproximação
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.statusText,
                                                        contactlessState &&
                                                            styles.statusActive
                                                    ]}
                                                >
                                                    {contactlessState
                                                        ? 'Ativo'
                                                        : 'Bloqueado'}
                                                </Text>
                                                <Switch
                                                    style={[
                                                        styles.switch,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                    value={contactlessState}
                                                    disabled={getCardLoading}
                                                    ios_backgroundColor={colors.gray.second}
                                                    thumbColor="#fff"
                                                    trackColor={{
                                                        false: colors.gray.second,
                                                        true: colors.blue.primary
                                                    }}
                                                    onValueChange={(value) => {
                                                        setContactlessState(value);
                                                        if (
                                                            card.contactlessShoppingFunction
                                                        ) {
                                                            dispatch(
                                                                disableContactlessShoppingCardBizAction(
                                                                    () =>
                                                                        setContactlessState(
                                                                            true
                                                                        )
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(
                                                                enableContactlessShoppingCardBizAction(
                                                                    () =>
                                                                        setContactlessState(
                                                                            false
                                                                        )
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={[styles.buttonContainer]}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Image
                                                    source={internationalIcon}
                                                    style={styles.icon}
                                                />
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.actionText,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                >
                                                    {/* {card.status === 'ATIVO'
                                                ? 'Bloquear cartão'
                                                : 'Desbloquear cartão'} */}
                                                    {/*Compra internacional
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.statusText,
                                                        internationalState &&
                                                            styles.statusActive
                                                    ]}
                                                >
                                                    {internationalState
                                                        ? 'Ativo'
                                                        : 'Bloqueado'}
                                                </Text>
                                                <Switch
                                                    style={[
                                                        styles.switch,
                                                        getCardLoading &&
                                                            card && { opacity: 0.6 }
                                                    ]}
                                                    value={internationalState}
                                                    disabled={getCardLoading}
                                                    ios_backgroundColor={colors.gray.second}
                                                    thumbColor="#fff"
                                                    trackColor={{
                                                        false: colors.gray.second,
                                                        true: colors.blue.primary
                                                    }}
                                                    onValueChange={(value) => {
                                                        setInternationalState(value);
                                                        if (
                                                            card.internationalShoppingFunction
                                                        ) {
                                                            dispatch(
                                                                disableInternationalShoppingCardBizAction(
                                                                    () =>
                                                                        setInternationalState(
                                                                            true
                                                                        )
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(
                                                                enableInternationalShoppingCardBizAction(
                                                                    () =>
                                                                        setInternationalState(
                                                                            false
                                                                        )
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </>
                                )}*/}
                                <TouchableOpacity 
                                    style={[styles.buttonBlockContainer]}
                                    onPress={handleOnPressBlockButton}
                                    disabled={getCardLoading}
                                >
                                    <Image
                                        source={blockIcon}
                                        style={styles.icon}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.actionText,
                                            { paddingVertical: 7},
                                            getCardLoading &&
                                                card && { opacity: 0.6 }
                                        ]}
                                    >
                                        {blockState ? `Bloquear cartão temporariamente` : 'Desbloquear cartão'}
                                    </Text>
                                        {/* <Switch
                                            style={[
                                                styles.switch,
                                                getCardLoading &&
                                                    card && { opacity: 0.6 }
                                            ]}
                                            value={!blockState}
                                            disabled={getCardLoading}
                                            ios_backgroundColor={
                                                colors.gray.second
                                            }
                                            thumbColor="#fff"
                                            trackColor={{
                                                false: colors.gray.second,
                                                true: colors.blue.primary
                                            }}
                                            onValueChange={(value) => {
                                                setBlockState(value);
                                                if (card.status === 'ATIVO') {
                                                    dispatch(
                                                        blockCardBizAction(() =>
                                                            setBlockState(true)
                                                        )
                                                    );
                                                } else {
                                                    dispatch(
                                                        unblockCardBizAction(
                                                            () =>
                                                                setBlockState(
                                                                    false
                                                                )
                                                        )
                                                    );}
                                            }}
                                        /> */}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.buttonBlockContainer,
                                    ]}
                                    disabled={getCardLoading}
                                    onPress={() => {
                                        dispatch(
                                            setAlertMessageAction({
                                                title: 'Atenção',
                                                message: `Essa operação é irreversível.${'\n'}Deseja continuar?`,
                                                action: {
                                                    mainLabel: 'Sim',
                                                    secondLabel: 'Não',
                                                    onPress: () =>
                                                        dispatch(
                                                            cancelCardBizAction(
                                                                navigation
                                                            )
                                                        )
                                                },
                                                type: 'info',
                                                invertedOptions: true
                                            })
                                        );
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.actionText, 
                                            {marginLeft: 0}, 
                                            getCardLoading &&
                                                card && { opacity: 0.6 }]}
                                    >
                                        Cancelar cartão
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: colors.gray.seventh
    },
    safeArea: {
        flex: 1
    },
    controlsContainer: {
        flex: 1,
        marginTop: 20
    },
    controlsTitle: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.gray.nineth,
        lineHeight: 21,
        marginBottom: 15,
        paddingLeft: 5
    },
    controlsButtons: {
        flex: 1
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between'
    },
    buttonContainer: {
        borderRadius: 8,
        // paddingTop: 73,
        // paddingBottom: 11,
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray.fourth,
        position: 'relative',
        marginBottom: 11,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // height: 142,
        // width: (width - 50) / 3.2
    },
    buttonBlockContainer: {
        borderRadius: 8,
        paddingHorizontal: 0,
        backgroundColor: colors.white,
        marginBottom: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        shadowColor: '#B1C0DC3F',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 1
    },
    switch: {
        // position: 'absolute',
        // right: 8,
        // top: 10,
        transform: [{ scale: Platform.OS === 'ios' ? 0.6 : 1 }]
        // width: 44,
        // height: 21
    },
    actionText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        lineHeight: 16,
        color: colors.blue.second,
        marginLeft: 8
    },
    statusText: {
        color: colors.text.invalid,
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        lineHeight: 14,
        marginRight: 5
    },
    statusActive: {
        color: '#37CB00'
    },
    icon: {
        resizeMode: 'contain',
        width: 24,
        height: 24
    },
    limitCard: {
        backgroundColor: colors.blue.second,
        paddingVertical: 15,
        paddingHorizontal: 13,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 24
    },
    defineLimitTouch: {
        fontSize: 12,
        lineHeight: 14,
        color: '#1A4B5D',
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        paddingLeft: 13
    },
    limitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    limitText: {
        color: colors.white,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400'
    },
    limitBar: {
        height: 4,
        backgroundColor: colors.white,
        alignSelf: 'stretch',
        marginBottom: 8,
        marginTop: 16,
        position: 'relative'
    },
    limitSpent: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#B0FF1A'
    },
    currency: {
        color: colors.blue.second,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 14
    },
    input: {
        borderWidth: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingTop: 0,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 14,
        height: 16,
        color: colors.blue.second
    },
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 18,
        paddingHorizontal: 22,
        paddingVertical: 17
    },
    headerTop: {
        flexDirection: 'row'
    },
    headerBar: {
        height: 1,
        backgroundColor: colors.white,
        opacity: 0.3
    },
    balanceLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
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
});

export default ActiveCard;
