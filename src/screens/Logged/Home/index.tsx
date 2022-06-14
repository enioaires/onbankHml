/* eslint-disable no-nested-ternary */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Dimensions,
    Linking,
    PermissionsAndroid,
    Platform,
    StatusBar,
    RefreshControl,
    StatusBarStyle
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Anticon from 'react-native-vector-icons/AntDesign';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import numeral from 'numeral';
import Contacts from 'react-native-contacts';
import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
// Components
import CardPromoModal from '../../../components/CardPromoModal';
import AddTransactionPasswordModal from '../../../containers/AddTransactionPasswordModal';
import DemoCompleteToast from '../../../components/DemoCompleteToast';
import LinearGradientHeader from '../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../store/types';
import { getUserContactsListSuccessAction } from '../../../store/ducks/transfer/actions';
import { onGetUserData } from '../../../store/ducks/userData/actions';
import {
    changeInsuranceSelectedAction,
    getInsurancesAction
} from '../../../store/ducks/insurance/actions';

// Styles
import colors from '../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../utils/helpers';
import {
    RECHARGE_SERVICES_OPTIONS,
    RESTRICTED_ID_PIX
} from '../../../utils/variables';
import { prefityNames } from '../../../utils/prettiers';

// Navigation Type
import { GeneralStackNavigationProps } from '../../../routes/Logged/types';

// Type
import { IRechargeService } from '../../../store/ducks/rechargeServices/types';
import { IInsurance } from '../../../store/ducks/insurance/types';
import { setAlertMessageAction } from '../../../store/ducks/alert/actions';

import BottomMenu from './components/BottomMenu/BottomMenu';
import ServiceRecharge from './components/ServiceRecharge/ServiceRecharge';

import PixButton from './components/PixButton/PixButton';

const isSmallDevice = isDeviceSmallScreen(850);

const barCodeIcon = require('../../../../assets/icons/new_icons/bar-code.png');
const rechargeIcon = require('../../../../assets/icons/new_icons/recharge.png');
const payIcon = require('../../../../assets/icons/new_icons/pay.png');
const payGrayIcon = require('../../../../assets/icons/new_icons/pay-gray.png');
const receiveIcon = require('../../../../assets/icons/new_icons/receive.png');
const receiveGrayIcon = require('../../../../assets/icons/new_icons/receive-gray.png');
const walletIcon = require('../../../../assets/icons/new_icons/wallet.png');
const eyeClose = require('../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../assets/icons/new_icons/show-white.png');

const HomeScreen: React.FC<GeneralStackNavigationProps<'Home'>> = ({
    navigation
}: GeneralStackNavigationProps<'Home'>) => {
    const dispatch = useDispatch();
    const carouselRef = useRef(null);
    const headerStackHeight = useHeaderHeight();
    const clientName = useSelector(
        (state: IApplicationState) => state.user.data.client.name
    );

    const clientAccount = useSelector(
        (state: IApplicationState) => state.user.data.account.account
    );

    const clientAccountId = useSelector(
        (state: IApplicationState) => state.user.data.account.accountId
    );
    const clientBranch = useSelector(
        (state: IApplicationState) => state.user.data.account.branch
    );
    const loading = useSelector(
        (state: IApplicationState) => state.banner.isLoading
    );
    const banners = useSelector(
        (state: IApplicationState) => state.banner.data,
        shallowEqual
    );
    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    const balanceLoading = useSelector(
        (state: IApplicationState) => state.balance.isLoading
    );
    const hasKeys = useSelector(
        (state: IApplicationState) => state.user.data.client.hasKeys
    );
    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    const isClientDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const cardBizData = useSelector(
        (state: IApplicationState) => state.card.card,
        shallowEqual
    );
    const rechargeServicesList = useSelector(
        (state: IApplicationState) =>
            state.rechargeServices.rechargeServicesList,
        shallowEqual
    );
    const rechargeServicesLoading = useSelector(
        (state: IApplicationState) => state.rechargeServices.isLoading,
        shallowEqual
    );
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading,
        shallowEqual
    );

    const clientIsBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );

    const [activeSlide, setActiveSlide] = useState(0);
    const [hideBalance, setHideBalance] = useState(false);

    const [currentTab, setCurrentTab] = useState<'pay' | 'receive'>('pay');
    const [registerKeys, setRegisterKeys] = useState(false);

    const [visible, setVisible] = useState(false);

    const sortBanner = useCallback(() => {
        return banners?.sort((a, b) => {
            if (a.position < b.position) return -1;
            if (a.position > b.position) return 1;
            return 0;
        });
    }, [banners]);

    const getUserContactsAndroid = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contatos',
                message:
                    'A Onbank gostaria de gerir seus contatos para transferências entre contas Onbank.',
                buttonPositive: 'Permitir',
                buttonNegative: 'Não permitir'
            }
        ).then((status) => {
            if (status === 'granted') {
                Contacts.getAll((err, contacts) => {
                    if (err) {
                        // console.log(err);
                        throw new Error(err);
                    }
                    const phoneList: string[] = [];

                    contacts.forEach((con) => {
                        // console.log(con.givenName);
                        con.phoneNumbers.forEach((phone) => {
                            // console.log(phone.number);
                            phoneList.push(phone.number.replace(/\D/g, ''));
                        });
                    });

                    dispatch(getUserContactsListSuccessAction(phoneList));
                });
            }
        });
    };

    const didMount = () => {
        if (Platform.OS === 'android') {
            getUserContactsAndroid();
        } else {
            Contacts.getAll((err, contacts) => {
                // console.log(err, contacts);
                // if (err) {
                //     throw new Error(err);
                // }

                if (contacts) {
                    const phoneList: string[] = [];

                    contacts.forEach((con) => {
                        // console.log(con.givenName);
                        con.phoneNumbers.forEach((phone) => {
                            // console.log(phone.number);
                            phoneList.push(phone.number.replace(/\D/g, ''));
                        });
                    });

                    dispatch(getUserContactsListSuccessAction(phoneList));
                }
            });
        }
    };

    const showDemoAlert = () => {
        dispatch(
            setAlertMessageAction({
                type: 'info',
                title: 'Conta Demonstrativa',
                message:
                    'Para solicitar o seu cartão precisa completar  sua conta',
                action: {
                    mainLabel: 'ok',
                    onPress: () => {}
                }
            })
        );
    };
    const navigateToCardMenu = () => {
        if (isClientDemo) {
            showDemoAlert();
            return;
        }
        if (!cardBiz || cardBiz === 'CANCELADO') {
            navigation.push('Perfil', {
                screen: 'SignUpData',
                params: { isCardRequest: true }
            });
        } else if (cardBiz === 'ATIVADO') {
            navigation.push('General', {
                screen: 'TransactionPassword',
                params: {
                    action: () => {
                        navigation.reset({
                            index: 0,
                            routes: [
                                { name: 'General' },
                                { name: 'Card', params: { screen: 'Active' } }
                            ]
                        });
                        // navigation.popToTop();
                        // navigation.push('Card', {
                        //     screen: 'Active'
                        // });
                    }
                }
            });
        } else {
            navigation.push('Card', {
                screen: 'Traffic'
            });
        }
    };

    const renderTabContent = (current: 'pay' | 'receive') => {
        if (current === 'pay') {
            return (
                <>
                    {clientAccountId !== RESTRICTED_ID_PIX && (
                        <PixButton action="Payment" />
                    )}
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.centerMenuOption]}
                        onPress={() => {
                            if (!hasKeys) {
                                setRegisterKeys(true);
                            } else {
                                navigation.push('Payments', {
                                    screen: 'Camera'
                                });
                            }
                        }}
                    >
                        <Image
                            source={barCodeIcon}
                            style={styles.topOptionsIcon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.centerMenuLabel}
                        >
                            Boleto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.centerMenuOption]}
                        onPress={() => {
                            if (!hasKeys) {
                                setRegisterKeys(true);
                            } else {
                                navigation.push('Recharge');
                            }
                        }}
                    >
                        <Image
                            source={rechargeIcon}
                            style={styles.topOptionsIcon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.centerMenuLabel}
                        >
                            Recarga Celular
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.centerMenuOption, { width: '33%' }]}
                        onPress={() => {
                            if (!hasKeys) {
                                setRegisterKeys(true);
                            } else {
                                navigation.push('Payments', {
                                    screen: 'QRCodeScan'
                                });
                            }
                        }}
                    >
                        <FontAwesome
                            name="qrcode"
                            color={colors.text.sixth}
                            size={30}
                            style={styles.centerMenuIcon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.centerMenuLabel}
                        >
                            QR Code
                        </Text>
                    </TouchableOpacity> */}
                </>
            );
        }

        if (current === 'receive') {
            return (
                <>
                    <PixButton action="Receive" />

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.centerMenuOption, { width: '50%' }]}
                        onPress={() => {
                            navigation.push('Deposit');
                        }}
                    >
                        <Image
                            source={walletIcon}
                            style={styles.topOptionsIcon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.centerMenuLabel}
                        >
                            Depósito
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.centerMenuOption]}
                        onPress={() => {
                            navigation.push('Receive', {
                                screen: 'QrCodeValue'
                            });
                        }}
                    >
                        <FontAwesome
                            name="qrcode"
                            color={colors.text.sixth}
                            size={30}
                            style={styles.centerMenuIcon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.centerMenuLabel}
                        >
                            QR Code
                        </Text>
                    </TouchableOpacity> */}
                </>
            );
        }

        return null;
    };

    const renderBanners = () => {
        if (banners.length > 0) {
            return (
                <View style={[styles.bannersContainer]}>
                    <Carousel
                        ref={carouselRef}
                        useScrollView
                        loop
                        loopClonesPerSide={2}
                        sliderWidth={Dimensions.get('window').width - 34}
                        itemWidth={Dimensions.get('window').width - 34}
                        data={sortBanner()!}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                key={item.position}
                                style={{ flex: 1 }}
                                onPress={() =>
                                    Linking.openURL(item.redirectUrl)
                                }
                            >
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    resizeMode={
                                        isSmallDevice ? 'cover' : 'stretch'
                                    }
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 10
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        autoplay
                        autoplayDelay={1000}
                        autoplayInterval={10000}
                        firstItem={0}
                        enableMomentum={false}
                        decelerationRate="fast"
                        enableSnap
                        removeClippedSubviews={false}
                        lockScrollWhileSnapping
                        shouldOptimizeUpdates
                    />
                    <Pagination
                        dotsLength={sortBanner()!.length}
                        activeDotIndex={activeSlide}
                        containerStyle={{
                            position: 'absolute',
                            bottom: -20,
                            width: '100%',
                            alignItems: 'center'
                        }}
                        dotContainerStyle={{
                            marginHorizontal: 2.5
                        }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 4
                        }}
                        dotColor={colors.blue.second}
                        inactiveDotColor={colors.white}
                        inactiveDotOpacity={1}
                        carouselRef={carouselRef as any}
                        tappableDots={!!carouselRef}
                    />
                </View>
            );
        }

        if (!loading && (!banners || banners.length === 0)) {
            return (
                <View style={[styles.bannersContainer]}>
                    <View
                        style={{
                            backgroundColor: colors.gray.primary,
                            alignSelf: 'stretch',
                            height: '90%',
                            borderRadius: 10
                        }}
                    />
                </View>
            );
        }

        return (
            <View style={[styles.bannersContainer]}>
                <ActivityIndicator
                    size="large"
                    style={{ flex: 1 }}
                    color={colors.blue.second}
                />
            </View>
        );
    };

    const handleImageRechargeService = (item: IRechargeService) => {
        let icon = null;
        RECHARGE_SERVICES_OPTIONS.forEach((element) => {
            if (item.name.toUpperCase().includes(element.serviceName)) {
                icon = element.serviceIcon;
            }
        });
        if (icon) {
            return icon;
        } else {
            return RECHARGE_SERVICES_OPTIONS[0].serviceIcon;
        }
    };

    const renderRechageServicesList = (item: IRechargeService) => (
        <View
            style={{
                alignItems: 'center',
                marginRight: 15
            }}
        >
            <TouchableOpacity
                style={styles.buttonServices}
                onPress={() => {
                    if (!hasKeys) {
                        setRegisterKeys(true);
                    } else {
                        navigation.push('RechargeServices', {
                            screen: 'Service',
                            params: { item: item }
                        });
                    }
                }}
            >
                <Image
                    source={handleImageRechargeService(item)}
                    style={{
                        height: 30,
                        width: 30
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text
                style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 12,
                    color: colors.text.fourth
                }}
            >
                {item.name}
            </Text>
        </View>
    );

    const renderInsurancesList = (item: IInsurance) => (
        <View
            style={{
                alignItems: 'center',
                marginRight: 15
            }}
        >
            <TouchableOpacity
                style={styles.buttonServices}
                onPress={() => {
                    if (!hasKeys) {
                        setRegisterKeys(true);
                    } else {
                        dispatch(changeInsuranceSelectedAction(item));
                        navigation.push('Insurance', {
                            screen: 'Insurance'
                        });
                    }
                }}
            >
                {/* <Image
                    source={handleImageRechargeService(item)}
                    style={{
                        height: 30,
                        width: 30
                    }}
                    resizeMode='contain'
                /> */}
            </TouchableOpacity>
            <Text
                style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: 12,
                    color: colors.text.fourth,
                    maxWidth: 70,
                    flexWrap: 'wrap',
                    textAlign: 'center'
                }}
            >
                {item.name}
            </Text>
        </View>
    );

    // useEffect(() => {
    //     if (cardBiz === '') {
    //         setVisible(true);
    //     }
    // }, [cardBiz]);

    useEffect(didMount, []);

    // handle StatusBarStyle
    const [barStyleContent, setBarStyleContent] =
        useState<StatusBarStyle>('light-content');
    useFocusEffect(
        useCallback(() => {
            setBarStyleContent('light-content');

            return () => {
                setBarStyleContent('dark-content');
            };
        }, [])
    );

    if (!clientAccount && !clientBranch && !clientName) {
        return (
            <ActivityIndicator
                style={{ flex: 1 }}
                size="large"
                color={colors.blue.second}
            />
        );
    }

    const [currency, cents] = numeral(userBalance).format('0,0.00').split(',');

    return (
        <View style={styles.screenContainer}>
            <CardPromoModal
                visible={visible}
                setVisible={(value) => setVisible(value)}
            />
            <AddTransactionPasswordModal
                navigation={navigation}
                showAlert={registerKeys}
                closeAlert={() => setRegisterKeys(false)}
            />
            <StatusBar barStyle={barStyleContent || 'light-content'} />
            <LinearGradientHeader
                style={[
                    styles.userInfoContainer,
                    {
                        paddingTop:
                            Platform.OS == 'ios'
                                ? headerStackHeight - getStatusBarHeight()
                                : headerStackHeight - StatusBar.currentHeight!
                    }
                ]}
            >
                <View style={styles.nameContainer}>
                    <Image
                        source={require('../../../../assets/logo-white.png')}
                        style={styles.logo}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.push('UserHelp')}
                    >
                        <Image
                            source={require('../../../../assets/icons/new_icons/help-white.png')}
                            resizeMode="contain"
                            style={{
                                width: 24,
                                height: 24
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.accountContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Text
                            allowFontScaling={false}
                            style={styles.balanceLabel}
                        >
                            Saldo disponível
                        </Text>
                        <TouchableOpacity
                            style={styles.clientContainer}
                            onPress={() => {
                                navigation.push('Perfil');
                            }}
                            activeOpacity={0.6}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.greetings}
                            >
                                Olá,{' '}
                                <Text style={styles.name}>
                                    {prefityNames(clientName).split(' ')[0]}
                                </Text>
                            </Text>
                            <View style={styles.clientAccountContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.accountText,
                                        { marginRight: 10 }
                                    ]}
                                >
                                    Ag:{' '}
                                    <Text style={styles.account}>
                                        {clientBranch === 1
                                            ? '0001'
                                            : clientBranch}
                                    </Text>
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.accountText}
                                >
                                    Cc:{' '}
                                    <Text style={styles.account}>
                                        {clientAccount}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountInfoContainer}>
                        <View style={styles.balanceContainer}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.push('Statement')}
                                style={styles.amountContainer}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.amountPrefix}
                                >
                                    R${' '}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.amount}
                                >
                                    {hideBalance ? '***' : `${currency},`}
                                </Text>
                                {!hideBalance && (
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.cents}
                                    >
                                        {cents}
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() =>
                                    setHideBalance(
                                        (oldState: boolean) => !oldState
                                    )
                                }
                            >
                                <Image
                                    source={!hideBalance ? eyeOpen : eyeClose}
                                    style={{ width: 22, height: 22 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => navigation.push('Deposit')}
                            style={styles.addMoneyContainer}
                        >
                            <Image
                                source={require('../../../../assets/icons/new_icons/add-white.png')}
                                style={styles.addMoneyIcon}
                                resizeMode="contain"
                            />
                            <Text
                                allowFontScaling={false}
                                style={styles.addMoneyText}
                            >
                                Depositar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradientHeader>
            <SafeAreaView style={[styles.content]}>
                <ScrollView
                    style={styles.scroll}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                dispatch(onGetUserData());
                            }}
                            refreshing={balanceLoading}
                            enabled
                            colors={[colors.blue.second]}
                            tintColor={colors.blue.second}
                            titleColor={colors.blue.second}
                            title="Atualizando"
                        />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainSection}>
                        {isClientDemo && <DemoCompleteToast />}
                        <View style={styles.centerMenu}>
                            <View style={styles.tabs}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => setCurrentTab('pay')}
                                    style={[
                                        styles.tab,
                                        currentTab === 'pay' && styles.tabActive
                                    ]}
                                >
                                    <Image
                                        source={currentTab === 'pay' ? payIcon : payGrayIcon}
                                        style={{...styles.tabIcon}}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.tabLabel,
                                            currentTab === 'pay' &&
                                                styles.tabLabelActive
                                        ]}
                                    >
                                        Pagar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={[
                                        styles.tab,
                                        currentTab === 'receive' &&
                                            styles.tabActive
                                    ]}
                                    onPress={() => setCurrentTab('receive')}
                                >
                                    <Image
                                        source={currentTab === 'receive' ? receiveIcon : receiveGrayIcon}
                                        style={styles.tabIcon}
                                    />
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.tabLabel,
                                            currentTab === 'receive' &&
                                                styles.tabLabelActive
                                        ]}
                                    >
                                        Receber
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerMenuOptions}>
                                {renderTabContent(currentTab)}
                            </View>
                        </View>

                        {/* {!isClientBeta ? (
                            <View
                                style={[
                                    styles.registerCardContainer,
                                    { marginBottom: 15 }
                                ]}
                            >
                                <Image
                                    source={require('../../../../assets/register-card.png')}
                                    style={styles.registerImage}
                                />
                                <View style={styles.registerTextContainer}>
                                    <View
                                        style={styles.registerMainTextContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.registerMainText}
                                        >
                                            Estamos preparando
                                        </Text>
                                        <Text style={styles.registerMainText}>
                                            o seu cartão
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.registerStrongText}
                                        >
                                            o seu cartão de débito!
                                        </Text>
                                    </View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.registerAskNow}
                                    >
                                        Em breve
                                    </Text>
                                </View>
                            </View>
                        ) : (
                        )} */}

                        {/* <View style={styles.pixContainer}>
                            <Image
                                source={require('../../../../assets/icons/pix.png')}
                                style={styles.pixLogo}
                            />
                            <View style={styles.pixContent}>
                                <Text style={styles.pixText}>
                                    Ele chegou!
                                </Text>
                                <Text style={styles.pixTextStrong}>
                                    O Pix Onbank
                                </Text>
                                <Text
                                    style={[
                                        styles.pixText,
                                        { marginBottom: 8 }
                                    ]}
                                >
                                    está disponível para você!
                                </Text>
                            </View>
                        </View> */}

                        <ServiceRecharge />
                        {/* TODO old seguro <TouchableOpacity
                            activeOpacity={0.6}
                            style={[
                                styles.rechargeContainer,
                                { maxWidth: 110 }
                            ]}
                            onPress={() => {
                                if (!hasKeys) {
                                    setRegisterKeys(true);
                                } else {
                                    dispatch(getInsurancesAction(navigation));
                                }
                            }}
                        >
                            {insuranceLoading && (
                                <ActivityIndicator 
                                    size="small"
                                    color={colors.blue.second}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: colors.white,
                                        transform: [
                                            {
                                                translateY: -10
                                            }
                                        ],
                                        height: 30,
                                        width: 30,
                                        borderRadius: 15
                                    }}
                                />
                            )}
                            <FontAwesome
                                name="edit"
                                size={50}
                                color={colors.blue.second}
                                style={{
                                    transform: [
                                        { translateX: 4 },
                                        { translateY: 5 }
                                    ]
                                }}
                            />
                            <Text
                                allowFontScaling={false}
                                style={styles.rechargeText}
                            >
                                Seguro Onbank
                            </Text>
                        </TouchableOpacity> */}
                        {/* {clientIsBeta && <PixPanel />} */}
                    </View>
                </ScrollView>
                <BottomMenu />
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    content: {
        flex: 1
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    userInfoContainer: {
        alignSelf: 'stretch',
        paddingTop: 16,
        paddingBottom: 22,
        paddingLeft: 21,
        paddingRight: 24,
        justifyContent: 'flex-end'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    clientContainer: {
        alignItems: 'flex-end',
        paddingBottom: 10
    },
    logo: {
        resizeMode: 'contain',
        width: 80,
        height: 25
        // backgroundColor: 'pink'
    },
    greetings: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        marginBottom: 5
    },
    name: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400'
    },
    accountContainer: {},
    balanceLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.white,
        marginBottom: 6
    },
    accountInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    balanceContainer: {
        flexDirection: 'row'
    },
    amountContainer: {
        flexDirection: 'row',
        marginRight: 15
    },
    amountPrefix: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        fontWeight: '400',
        color: colors.white
    },
    amount: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        fontWeight: '700',
        color: colors.white
    },
    cents: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        color: colors.white,
        marginTop: 1
    },
    addMoneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    },
    addMoneyIcon: {
        width: 18,
        height: 18,
        marginRight: 5
    },
    addMoneyText: {
        fontSize: 13,
        color: colors.white,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400'
    },
    clientAccountContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    accountText: {
        color: colors.white,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 12
    },
    account: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500'
    },
    scroll: {
        flex: 1,
        marginBottom: 15
    },
    mainSection: {
        flex: 1,
        paddingHorizontal: 17,
        paddingTop: 24
    },
    pixContainer: {
        backgroundColor: colors.white,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 50,
        // paddingRight: 60,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        marginBottom: 15
    },
    pixLogo: {
        width: 50,
        height: 50
    },
    pixContent: {
        marginLeft: 70
    },
    pixText: {
        // marginBottom: 8,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 12,
        color: colors.text.fifth
    },
    pixTextStrong: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        color: colors.text.fifth,
        fontSize: 14
    },
    pixMore: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 11,
        color: colors.blue.second
    },
    centerMenu: {
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        marginBottom: 15,
        overflow: 'hidden'
    },
    tabs: {
        flexDirection: 'row'
    },
    tab: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        //borderBottomWidth: 1.5,
        borderBottomColor: colors.gray.primary,
        paddingTop: 16,
        paddingBottom: 9,
        backgroundColor: colors.gray.tenth
    },
    tabActive: {
        borderBottomColor: colors.blue.second,
        backgroundColor: colors.white
    },
    tabIcon: {
        width: 26,
        height: 26,
        marginRight: 7
    },
    tabLabel: {
        fontSize: 14,
        color: colors.text.third,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500'
    },
    tabLabelActive: {
        color: colors.blue.second,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500'
    },
    centerMenuOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    centerMenuOption: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 19,
        width: '33%'
    },
    centerMenuIcon: {
        marginBottom: 10
    },
    centerMenuLabel: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: colors.blue.second
    },
    registerCardContainer: {
        backgroundColor: colors.white,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        paddingVertical: 10,
        paddingLeft: 23
        // paddingRight: 50
    },
    registerImage: {
        marginRight: 30
    },
    registerTextContainer: {},
    registerMainTextContainer: {
        marginBottom: 8
    },
    registerMainText: {
        fontSize: 13,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: colors.text.fifth
    },
    registerStrongText: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        color: colors.text.fifth
    },
    registerAskNow: {
        fontSize: 13,
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        color: colors.blue.second
    },
    menu: {
        paddingRight: 0
    },

    paddingView: {
        paddingBottom: 25,
        // paddingLeft: 17,
        // paddingTop: 80 + 30,
        flex: 1,
        backgroundColor: colors.gray.fifth
    },
    container: {
        flex: 1
    },
    top: {
        flex: 1,
        // paddingRight: 17,
        borderWidth: 1
    },
    updateInfo: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginBottom: 5
    },
    accountInfoText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        marginRight: 20
    },
    balance: {
        color: colors.white,
        fontSize: 30,
        fontFamily: 'Roboto-Regular'
    },
    bannersContainer: {
        alignSelf: 'stretch',
        borderRadius: 10,
        height: 188,
        position: 'relative'
        // shadowColor: "black",
        // shadowOffset: {
        // 	width: 0,
        // 	height: 3,
        // },
        // shadowOpacity: 0.16,
        // elevation: 1,
        // shadowRadius: 10,
    },
    options: {
        marginTop: 20,
        paddingLeft: 17,
        borderWidth: 1
    },
    activeCardContainer: {
        height: 150,
        alignSelf: 'stretch',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10,
        marginBottom: 15
    },
    activeCard: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent: 'space-between'
    },

    // Recharge Services Styles
    rechargeServicesContainer: {
        height: 150,
        flex: 2.8,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        marginBottom: 15
    },
    buttonServices: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.gray.primary,
        backgroundColor: colors.gray.eleventh,
        shadowColor: '#B1C0DC30',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4
    },
    rechargeContainer: {
        height: 150,
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        marginRight: 17,
        alignItems: 'center'
    },
    rechargeText: {
        color: colors.blue.third,
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        textAlign: 'center'
    },

    // Insuraces Styles
    insurancesContainer: {
        height: 150,
        flex: 2.8,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        marginBottom: 15,
        marginRight: 17
    },
    userInsurancesButton: {
        height: 150,
        flex: 1,
        backgroundColor: colors.blue.second,
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1,
        alignItems: 'center'
    },
    userInsurancesText: {
        color: colors.white,
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        textAlign: 'center'
    },
    topOptionsIcon: {
        width: 30,
        height: 30,
        marginBottom: 10
    }
});
