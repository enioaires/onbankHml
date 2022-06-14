import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Platform,
    ScrollView
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import numeral from 'numeral';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';

// Components
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { clearDepositStateAction } from '../../../../store/ducks/deposit/actions'

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { DepositStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen();

const BilletScreen: React.FC<DepositStackNavigationProps<'Billet'>> = () => {
    const dispatch = useDispatch()
    const sharedFilePath = useRef('');

    const [barcode, dueDate, value, url] = useSelector(
        (state: IApplicationState) => {
            return [
                state.deposit.data.typeableLine,
                state.deposit.data.dueDate,
                state.deposit.payload.amount,
                state.deposit.data.boletoUrl
            ];
        },
        shallowEqual
    );

    const copyBarcode = useCallback(() => {
        Clipboard.setString(barcode!);
        showMessage({
            message: 'Copiado!',
            description: 'Linha digitável copiada',
            backgroundColor: colors.blue.second,
            icon: 'success'
        });
    }, []);

    const share = async () => {
        RNFetchBlob.config({
            fileCache: true,
            path: `${RNFetchBlob.fs.dirs.DocumentDir}/boleto-de-recarga-onbank.pdf`
        })
            .fetch('GET', url)
            .then(async (resp) => {
                sharedFilePath.current = resp.path();

                const options = {
                    title: 'Boleto de Recarga Onbank',
                    type: 'application/pdf',
                    url:
                        Platform.OS === 'android'
                            ? `file://${sharedFilePath.current}`
                            : sharedFilePath.current
                };

                await Share.open(options);
            });
    };

    const [, month, day] = dueDate.split('-');

    const maskBarcode = (barCodeValue: string) => {
        const first = barCodeValue.substring(0, 5);
        const second = barCodeValue.substring(5, 10);
        const third = barCodeValue.substring(10, 15);
        const fourth = barCodeValue.substring(15, 21);
        const fifth = barCodeValue.substring(21, 26);
        const sixth = barCodeValue.substring(26, 32);
        const seventh = barCodeValue.substring(32, 33);
        const eigth = barCodeValue.substring(33);

        return `${first}.${second} ${third}.${fourth} ${fifth}.${sixth} ${seventh} ${eigth}`;
    };

    useEffect(() => {
        setTimeout(() => copyBarcode(), 1000);
    }, [copyBarcode]);

    useEffect(() => {
        const clearSharedFile = async () => {
            if (sharedFilePath.current.length > 0) {
                await RNFetchBlob.fs.unlink(sharedFilePath.current);
                sharedFilePath.current = '';
            }
        };

        return () => {
            clearSharedFile();
            dispatch(clearDepositStateAction())
        };
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.infoBox}>
                        <Text allowFontScaling={false} style={styles.title}>
                            Boleto para depósito
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.title,
                                { marginBottom: isSmallDevice ? 17 : 25 }
                            ]}
                        >
                            Onbank
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                marginBottom: isSmallDevice ? 29 : 35
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.currency}
                            >
                                R$
                            </Text>
                            <Text allowFontScaling={false} style={styles.value}>
                                {numeral(value).format('0,0.00')}
                            </Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.codeLabel}>
                            Linha digitável
                        </Text>
                        <Text allowFontScaling={false} style={styles.barCode}>
                            {maskBarcode(barcode!)}
                        </Text>
                        <Text allowFontScaling={false} style={styles.dueDate}>
                            Boleto válido até {`${day}/${month}`}
                        </Text>
                    </View>
                    <Text allowFontScaling={false} style={styles.alertText}>
                        Após o pagamento, o valor pode levar até{' '}
                        <Text
                            allowFontScaling={false}
                            style={{ fontFamily: 'Roboto-Bold' }}
                        >
                            2 dias úteis
                        </Text>{' '}
                        para ser creditado na sua conta Onbank
                    </Text>
                </ScrollView>
                <View>
                    <ActionButton
                        label="Compartilhar Boleto"
                        secondTheme
                        style={styles.shareButton}
                        textStyle={{
                            color: colors.blue.second
                        }}
                        onPress={share}
                    />
                    <ActionButton
                        label="Copiar código"
                        onPress={() => copyBarcode()}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default BilletScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop: 80 + 10
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    scroll: {
        flex: 1,
        marginBottom: 15
    },
    infoBox: {
        backgroundColor: colors.gray.seventh,
        marginBottom: isSmallDevice ? 23 : 50,
        borderRadius: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingTop: isSmallDevice ? 22 : 40
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 21,
        color: colors.text.second
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
    codeLabel: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        marginBottom: 5
    },
    barCode: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: isSmallDevice ? 35 : 40
    },
    dueDate: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 16,
        marginBottom: isSmallDevice ? 30 : 40
    },
    alertText: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30
    },
    shareButton: {
        marginBottom: 14,
        backgroundColor: '#fff',
        shadowColor: '#B1C0DC3F',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 1
    }
});
