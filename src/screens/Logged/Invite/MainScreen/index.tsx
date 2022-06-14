import React, { useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Linking,
    Platform,
    RefreshControl,
    Alert,
    StatusBar
    // Dimensions
} from 'react-native';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';

import Clipboard from '@react-native-community/clipboard';
import { showMessage } from 'react-native-flash-message';

// Store
import { refreshPromocodeAction } from '../../../../store/ducks/promocode/actions';
import { IApplicationState } from '../../../../store/types';

// Style
import colors from '../../../../styles/colors';

// Navigation Type
import { InviteStackNavigationProps } from '../../../../routes/Logged/types';
import { onGetUserData } from '../../../../store/ducks/userData/actions';

const inviteImg = require('../../../../../assets/invite-img.png');
const forward = require('../../../../../assets/icons/arrow-carrot-right.png');

const MainScreen: React.FC<InviteStackNavigationProps<'Main'>> = ({
    navigation
}: InviteStackNavigationProps<'Main'>) => {
    const dispatch = useDispatch();
    const promocode = useSelector(
        (state: IApplicationState) => state.user.data.client.promoCode
    );
    const accountsInveted = useSelector(
        (state: IApplicationState) => state.promocode.invites?.total
    );
    const loading = useSelector(
        (state: IApplicationState) => state.user.isLoading
    );

    const isGreaterThan100 = accountsInveted && accountsInveted > 100;

    const didMount = () => {
        dispatch(onGetUserData());
    };
    // const message = `Olá, você foi convidado para abrir sua conta Onbank utilizando meu promocode. Clique no link para ser redirecionado para o app: onbank://cadastro/${promocode}.${'\n\n'}Baixe o aplicativo Onbank!${'\n\n'}Android:${'\n'}https://play.google.com/store/apps/details?id=br.com.onbank.mobile${'\n'}IOS:${'\n'}https://apps.apple.com/us/app/onbank/id1509548331?l=pt&ls=1`;
    const message = `Olá, abra sua conta digital Onbank utilizando meu promocode ${promocode}.${'\n\n'}Clique no link para baixar o aplicativo Onbank!${'\n\n'}Android:${'\n'}https://play.google.com/store/apps/details?id=br.com.onbank.mobile${'\n'}IOS:${'\n'}https://apps.apple.com/us/app/onbank/id1509548331?l=pt&ls=1`;

    const share = async () => {
        try {
            await Share.open({
                title: 'Convite Onbank',
                subject: 'Convite Onbank',
                message
            });

            dispatch(refreshPromocodeAction());
        } catch (err) {
            // console.log('share', err);
            // Alert.alert('Cancelou');
        }
    };

    const getSMSLink = () => {
        if (Platform.OS === 'ios') {
            return `sms:&addresses=&body=${message}`;
        }
        return `sms:?body=${message}`;
    };

    const handleCopyCode = (code: string = '') => {
        Clipboard.setString(code);
        showMessage({
            message: 'Copiado!',
            description: 'código copiado!',
            backgroundColor: colors.blue.second,
            icon: 'success'
        });
    };

    useEffect(didMount, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            style={{ marginBottom: 20 }}
                            onRefresh={() => {
                                dispatch(onGetUserData());
                            }}
                            refreshing={loading}
                            enabled
                            colors={[colors.gray.eigth]}
                            tintColor={colors.gray.eigth}
                            titleColor={colors.gray.eigth}
                            title="Atualizando Promocode"
                        />
                    }
                >
                    <View style={styles.imgContainer}>
                        <Image source={inviteImg} style={styles.img} />
                    </View>
                    <Text allowFontScaling={false} style={styles.title}>
                        Agora é só compartilhar!
                    </Text>
                    <Text allowFontScaling={false} style={styles.text}>
                        Compartilhe agora o seu código com seus amigos e
                        aproveitem juntos todos os benefícios de ser um cliente
                        Onbank.
                    </Text>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 8
                        }}
                        onPress={() => handleCopyCode(promocode)}
                    >
                        <Image
                            source={require('../../../../../assets/icons/new_icons/copy-gray.png')}
                            style={{
                                marginRight: 10,
                                width: 24,
                                height: 24
                            }}
                        />
                        <Text style={styles.promocode}>{promocode}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.invitesListButton}
                        onPress={() =>
                            navigation.push('Invite', {
                                screen: 'AccountsList'
                            })
                        }
                    >
                        {/* <Text
                            allowFontScaling={false}
                            style={styles.invitesListText}
                        >
                            Clique aqui e veja seus amigos que abriram uma conta
                            On
                        </Text> */}
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <View style={styles.countBox}>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.count,
                                        { fontSize: isGreaterThan100 ? 15 : 16 }
                                    ]}
                                >
                                    {accountsInveted}
                                </Text>
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={styles.invitesListText}>
                                    {accountsInveted === 1
                                        ? 'amigo seu está '
                                        : 'amigos seus estão '}
                                    <Text
                                        style={{
                                            color: colors.blue.primary,
                                            fontFamily: 'Roboto-Bold',
                                            fontWeight: '700'
                                        }}
                                    >
                                        ON
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <Image source={forward} />
                    </TouchableOpacity>
                    {/* <Text allowFontScaling={false} style={styles.sendLabel}>
                        Enviar convite por:
                    </Text> */}
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                            Linking.openURL(`whatsapp://send?text=${message}`)
                                .then(() => {
                                    // console.log('whats', resp);
                                    // Alert.alert('Mandou');
                                    dispatch(refreshPromocodeAction());
                                })
                                .catch(() => {
                                    // console.log(err);
                                    // Alert.alert('Cancelou');
                                });
                        }}
                    >
                        <Image
                            source={require('../../../../../assets/icons/whats.png')}
                            style={styles.icon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.optionText}
                        >
                            Compartilhar por WhatsApp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() =>
                            Linking.openURL(getSMSLink())
                                .then(() => {
                                    // console.log('sms', resp);
                                    // Alert.alert('Mandou');
                                    dispatch(refreshPromocodeAction());
                                })
                                .catch(() => {
                                    // console.log(err);
                                    // Alert.alert('Cancelou');
                                })
                        }
                    >
                        <Image
                            source={require('../../../../../assets/icons/invite-sms.png')}
                            style={styles.icon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.optionText}
                        >
                            Compartilhar por SMS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={share}>
                        <Image
                            source={require('../../../../../assets/icons/new_icons/share.png')}
                            style={[styles.icon, { width: 27 }]}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.optionText}
                        >
                            Compartilhar por link
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option]}
                        onPress={() =>
                            navigation.push('Invite', { screen: 'Email' })
                        }
                    >
                        <Image
                            source={require('../../../../../assets/icons/new_icons/email.png')}
                            style={styles.icon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.optionText}
                        >
                            Compartilhar por Email
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray.seventh,
        paddingTop: Platform.select({
            android: StatusBar.currentHeight
                ? StatusBar.currentHeight + 80
                : 130,
            ios: 140
        }),
        paddingHorizontal: 25
    },
    safeArea: {
        flex: 1
    },
    scroll: {
        flex: 1
    },
    scrollContainer: {
        alignItems: 'center'
    },
    imgContainer: {
        marginBottom: 20
    },
    img: {
        width: '70%',
        height: undefined,
        aspectRatio: 310 / 159,
        marginTop: 20
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 21,
        color: colors.blue.second,
        marginBottom: 5
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 12,
        color: colors.gray.eigth,
        lineHeight: 14,
        marginBottom: 16,
        textAlign: 'center',
        marginHorizontal: '18%'
    },
    promocode: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '400',
        color: colors.text.third,
        fontSize: 16
    },
    invitesListButton: {
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    invitesListText: {
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        fontWeight: '400',
        color: colors.gray.third
        // textDecorationLine: 'underline'
    },
    sendLabel: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        color: colors.text.smsModel,
        marginBottom: 10
    },
    option: {
        width: '100%',
        borderRadius: 7,
        backgroundColor: '#fff',
        minHeight: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 8,
        shadowColor: '#B1C0DC3F',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 1
    },
    icon: {
        width: 23,
        height: 23,
        marginRight: 10,
        resizeMode: 'contain'
    },
    optionText: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '400',
        fontSize: 13,
        color: colors.blue.second
    },
    countBox: {
        width: 32,
        height: 32,
        borderRadius: 25,
        backgroundColor: colors.blue.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        fontSize: 30,
        fontWeight: '700',
        fontFamily: 'Roboto-Bold',
        color: colors.white
    }
});
