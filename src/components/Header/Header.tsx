import React, { useState } from 'react';
import {
    Platform,
    StatusBar,
    Image,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import numeral from 'numeral';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';
import { IApplicationState } from '../../store/types';
import HmlTag from '../HmlTag';
import LinearGradientHeader from '../LinearGradientHeader';
import {
    Title,
    BackButton,
    BalanceContainer,
    BalanceLabel,
    BalanceAmount
} from './Header.styles';

const eyeClose = require('../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../assets/icons/new_icons/show-white.png');

const routesWithBalance = ['Payment', 'PaymentPixKey', 'PaymentAmount'];
const Header = (props: any) => {
    const { navigation, scene, isPayment } = props;
    const {
        descriptor: {
            options: { headerTitle, headerBackTitleVisible }
        }
    } = scene;
    const {
        route: { name: routeName }
    } = scene;

    const [hideBalance, setHideBalance] = useState(false);
    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    const [balanceAmount, balanceCents] = numeral(userBalance)
        .format('0,0.00')
        .split(',');

    return (
        <LinearGradientHeader
            style={{
                zIndex: 10,
                width: '100%',
                paddingTop: Platform.select({
                    ios: 60,
                    android: StatusBar.currentHeight
                        ? StatusBar.currentHeight + 10
                        : 80
                }),
                paddingBottom: isPayment ? 30 : 36
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {headerBackTitleVisible !== false ? (
                    <BackButton
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        onPress={navigation.goBack}
                    >
                        <Image
                            source={require('../../../assets/icons/left-arrow-alt.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18
                            }}
                        />
                    </BackButton>
                ) : (
                    <View />
                )}

                <Title>{headerTitle}</Title>
                <HmlTag>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('UserHelp');
                        }}
                    >
                        <Image
                            source={require('../../../assets/icons/new_icons/help-white.png')}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23
                            }}
                        />
                    </TouchableOpacity>
                </HmlTag>
            </View>
            {routesWithBalance.includes(routeName) && (
                <BalanceContainer>
                    <BalanceLabel>Saldo disponível</BalanceLabel>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <BalanceAmount>
                            {hideBalance ? `R$  ***,` : `R$  ${balanceAmount},`}
                        </BalanceAmount>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Regular',
                                fontSize: 14,
                                color: colors.white,
                                marginRight: 10
                            }}
                        >
                            {hideBalance ? `**` : balanceCents}
                        </Text>
                        <TouchableOpacity
                            hitSlop={{
                                top: 20,
                                bottom: 20,
                                left: 50,
                                right: 50
                            }}
                            style={{
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                console.log('PRESS');
                                setHideBalance((oldstate) => !oldstate);
                            }}
                        >
                            <Image
                                source={!hideBalance ? eyeOpen : eyeClose}
                                style={{ width: 22, height: 22 }}
                            />
                        </TouchableOpacity>
                    </View>
                </BalanceContainer>
            )}
        </LinearGradientHeader>
    );
};

export default Header;
