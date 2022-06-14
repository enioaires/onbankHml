import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from '../../../../components/ActionButton';
import AddTransactionPasswordModal from '../../../../containers/AddTransactionPasswordModal';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Store
import { IApplicationState } from '../../../../store/types';
import { onGetUserData } from '../../../../store/ducks/userData/actions';
import {
    clearCardBizStoreAction,
    getCardBizAction
} from '../../../../store/ducks/card/actions';

// Navigation Type
import { CardStackNavigationProps } from '../../../../routes/Logged/types';

// Store

const doneIcon = require('../../../../../assets/icons/done-icon.png');
const currentIcon = require('../../../../../assets/icons/current-icon.png');
const waitingIcon = require('../../../../../assets/icons/waiting-icon.png');

const CardTraffic: React.FC<CardStackNavigationProps<'Traffic'>> = ({
    navigation
}: CardStackNavigationProps<'Traffic'>) => {
    const dispatch = useDispatch();
    const cardBizStatus = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );
    const getCardBizLoading = useSelector(
        (state: IApplicationState) => state.card.loading
    );
    const cardStatus = useSelector(
        (state: IApplicationState) => state.card.card?.status
    );
    const hasKeys = useSelector(
        (state: IApplicationState) => state.user.data.client.hasKeys
    );

    const [registerKeys, setRegisterKeys] = useState(false);

    const getCard = () => {
        if (
            cardBizStatus === 'CRIADO' ||
            cardBizStatus === 'SOLICITADO_SEGUNDA_VIA'
        ) {
            dispatch(
                getCardBizAction(cardBizStatus === 'SOLICITADO_SEGUNDA_VIA')
            );
        }
    };

    const didMount = () => {
        getCard();

        return () => {
            dispatch(clearCardBizStoreAction());
        };
    };

    const refreshStatus = () => {
        dispatch(onGetUserData());
        getCard();
    };

    useEffect(didMount, []);

    if (!cardStatus && (getCardBizLoading || cardBizStatus === 'CRIADO')) {
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

    return (
        <View style={styles.container}>
            <AddTransactionPasswordModal
                navigation={navigation}
                showAlert={registerKeys}
                closeAlert={() => setRegisterKeys(false)}
            />
            <SafeAreaView style={styles.safeArea}>
                <Text allowFontScaling={false} style={styles.title}>
                    Acompanhe seu cartão
                </Text>
                <Text allowFontScaling={false} style={styles.alertText}>
                    Considerando o cenário atual no que diz respeito à pandemia
                    pelo novo coronavírus (COVID-19) e todos os seus
                    desdobramentos, o processo de envio do cartão Onbank poderá
                    se alongar.
                </Text>
                <ScrollView
                    style={styles.trafficSection}
                    refreshControl={
                        <RefreshControl
                            style={{ marginBottom: 20 }}
                            onRefresh={refreshStatus}
                            refreshing={getCardBizLoading}
                            enabled
                            colors={[colors.blue.second]}
                            tintColor={colors.blue.second}
                            titleColor={colors.blue.second}
                            title="Atualizando"
                        />
                    }
                >
                    <View style={styles.trafficContainer}>
                        <View>
                            <View style={styles.statusContainer}>
                                <Image
                                    style={styles.icon}
                                    source={doneIcon}
                                    resizeMode="cover"
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.statusText}
                                >
                                    Cartão solicitado
                                </Text>
                            </View>
                            <View style={styles.verticalBar} />
                        </View>

                        <View>
                            <View style={styles.statusContainer}>
                                {cardBizStatus !== 'REJEITADO' ? (
                                    <Image
                                        style={styles.icon}
                                        source={
                                            cardBizStatus === 'CRIADO'
                                                ? doneIcon
                                                : currentIcon
                                        }
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.errorCircle}>
                                        <Text style={styles.errorText}>X</Text>
                                    </View>
                                )}
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.statusText}
                                    >
                                        {/* {cardBizStatus === 'CRIADO'
                                            ? 'Aprovação concluída'
                                            : 'Aguardando aprovação'} */}
                                        Em produção
                                    </Text>
                                    {cardBizStatus === 'REJEITADO' && (
                                        <Text style={styles.errorDescription}>
                                            Aprovação negada
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.verticalBar,
                                    {
                                        backgroundColor:
                                            cardBizStatus === 'CRIADO'
                                                ? colors.blue.second
                                                : colors.gray.primary
                                    }
                                ]}
                            />
                        </View>

                        <View>
                            <View style={styles.statusContainer}>
                                <Image
                                    style={styles.icon}
                                    source={
                                        cardStatus &&
                                        cardStatus === 'CARTAO EMITIDO'
                                            ? currentIcon
                                            : cardStatus &&
                                              (cardStatus ===
                                                  'ENVIADO AO CLIENTE' ||
                                                  cardStatus ===
                                                      'ENTREGUE AO CLIENTE')
                                            ? doneIcon
                                            : waitingIcon
                                    }
                                    resizeMode="cover"
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.statusText}
                                >
                                    Aguardando entrega
                                </Text>
                            </View>
                            {/* <View
                                style={[
                                    styles.verticalBar,
                                    {
                                        backgroundColor:
                                            cardStatus &&
                                            (cardStatus ===
                                                'ENVIADO AO CLIENTE' ||
                                                cardStatus ===
                                                    'ENTREGUE AO CLIENTE')
                                                ? colors.blue.primary
                                                : colors.gray.primary
                                    }
                                ]}
                            /> */}
                        </View>

                        {/* <View>
                            <View style={styles.statusContainer}>
                                <Image
                                    style={styles.icon}
                                    source={
                                        cardStatus &&
                                        cardStatus === 'ENVIADO AO CLIENTE'
                                            ? currentIcon
                                            : cardStatus &&
                                              cardStatus ===
                                                  'ENTREGUE AO CLIENTE'
                                            ? doneIcon
                                            : waitingIcon
                                    }
                                    resizeMode="cover"
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.statusText}
                                >
                                    Enviado ao remetente
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.verticalBar,
                                    { backgroundColor: colors.gray.primary }
                                ]}
                            />
                        </View> */}

                        {/* <View>
                            <View style={styles.statusContainer}>
                                <Image
                                    style={styles.icon}
                                    source={
                                        cardStatus &&
                                        cardStatus === 'ENTREGUE AO CLIENTE'
                                            ? doneIcon
                                            : cardStatus &&
                                              cardStatus ===
                                                  'ENVIADO AO CLIENTE'
                                            ? currentIcon
                                            : waitingIcon
                                    }
                                    resizeMode="cover"
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.statusText}
                                >
                                    Cartão entregue
                                </Text>
                            </View>
                            <View style={styles.verticalBar} />
                        </View> */}
                    </View>
                </ScrollView>

                {cardBizStatus === 'REJEITADO' && (
                    <TouchableOpacity
                        onPress={() => navigation.push('UserHelp')}
                    >
                        <Text style={styles.suportTouch}>
                            Entrar em contato
                        </Text>
                    </TouchableOpacity>
                )}
                <ActionButton
                    label="Ativar cartão"
                    disabled={cardBizStatus !== 'CRIADO'}
                    onPress={() => {
                        if (!hasKeys) {
                            setRegisterKeys(true);
                        } else {
                            navigation.push('Card', { screen: 'Activate' });
                        }
                    }}
                />
            </SafeAreaView>
        </View>
    );
};

export default CardTraffic;

const styles = StyleSheet.create({
    container: {
        ...paddings.container,
        paddingTop: 80 + 14,
        flex: 1
    },
    safeArea: {
        flex: 1
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 21,
        color: colors.text.second,
        marginBottom: 25
    },
    trafficSection: {
        flex: 1,
        marginBottom: 15
    },
    trafficContainer: {
        alignSelf: 'stretch',
        borderRadius: 7,
        backgroundColor: colors.gray.seventh,
        paddingHorizontal: 30,
        paddingVertical: 33
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: colors.text.smsModel
    },
    verticalBar: {
        width: 3,
        borderRadius: 1.5,
        height: 30,
        backgroundColor: colors.blue.second,
        marginLeft: 11,
        marginVertical: 13
    },
    alertText: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 30
    },
    errorCircle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        backgroundColor: colors.text.invalid
    },
    errorText: {
        color: colors.white,
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 12
    },
    errorDescription: {
        color: colors.text.invalid,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 13
    },
    suportTouch: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second,
        textAlign: 'center',
        marginBottom: 20
    }
});
