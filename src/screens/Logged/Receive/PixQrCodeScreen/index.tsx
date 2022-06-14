import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Image,
    Platform,
    Clipboard
} from 'react-native';
import ViewShot from 'react-native-view-shot';
// import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';
import Share from 'react-native-share';

// Store
import { IApplicationState } from '../../../../store/types';

// Components
import ActionButton from '../../../../components/ActionButton'

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Navigation Type
import { ReceiveStackNavigationProps } from '../../../../routes/Logged/types';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers'
import { ScrollView } from 'react-native-gesture-handler';

const PixQrCodeScreen: React.FC<ReceiveStackNavigationProps<'QRCode'>> = () => {
    const viewshotRef = useRef<any>(null);
    const sharedQrCodeFilePath = useRef('');

    const [qrCode, copiaECola, amount] = useSelector((state: IApplicationState) => {
        return [state.receive.data.url, state.receive.data.emv, state.receive.payload.amount]
    }, shallowEqual)

    const shareCopiaECola = async () => {
        try {
            await Share.open({
                title: 'Onbank Pix copia e cola',
                message: copiaECola
            });
        } catch (err) {
            // console.log('share', err);
            // Alert.alert('Cancelou');
        };
    };

    const shareQRCode = async () => {
        RNFetchBlob.config({
            fileCache: true,
            path: `${RNFetchBlob.fs.dirs.DocumentDir}/Pix-QRCode-Onbank.png`
        })
            .fetch('GET', qrCode)
            .then(async (resp) => {
                sharedQrCodeFilePath.current = resp.path();

                const options = {
                    title: 'QRCode Pix Onbank',
                    type: 'application/png',
                    url:
                        Platform.OS === 'android'
                            ? `file://${sharedQrCodeFilePath.current}`
                            : sharedQrCodeFilePath.current
                };
                try {
                    await Share.open(options);
                } catch (error) {
                    // console.log(error)
                };
            });
    };

    
    const copyPixCopiaecola = useCallback(() => {
        Clipboard.setString(copiaECola);
        showMessage({
            message: 'Copiado!',
            description: 'Pix Copia e Cola copiado!',
            backgroundColor: colors.blue.second,
            icon: 'success'
        });
    }, []);

    useEffect(() => {
        setTimeout(() => copyPixCopiaecola(), 1000);
    }, [copyPixCopiaecola]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <ViewShot
                        ref={viewshotRef}
                        options={{ quality: 0.9, format: 'jpg' }}
                        style={styles.infoContainer}
                    >
                        <Text allowFontScaling={false} style={styles.title}>
                            Mostre o QR Code abaixo{'\n'}para o pagador
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            marginTop: 10
                        }}>
                            <Text 
                                style={[
                                    styles.text,
                                    {
                                        marginBottom: 2,
                                        marginRight: 2
                                    }
                                ]}
                            >R$</Text>
                            <Text
                                style={[
                                    styles.text,
                                    {fontSize: 28, color: colors.text.primary}
                                ]}
                            >{amount}</Text>
                        </View>
                        {qrCode.length !== 0 ? (
                            <Image
                                source={{ uri: qrCode }}
                                resizeMode='contain'
                                style={styles.qrCodeImage}
                            />
                        ) : ( null )}
                        <Text style={styles.text2}>
                            Válido por 24 horas
                        </Text>
                    </ViewShot>
                </ScrollView>
                <View>
                    <ActionButton
                        icon={require('../../../../../assets/icons/share.png')}
                        label='Compartilhar QR Code'
                        onPress={shareQRCode}
                        style={{
                            justifyContent: 'flex-start',
                            paddingLeft: 30
                        }}
                    />
                    <ActionButton
                        icon={require('../../../../../assets/icons/share.png')}
                        label='Compartilhar Pix Copia e Cola'
                        onPress={shareCopiaECola}
                        secondTheme
                        style={{
                            marginTop: 10,
                            backgroundColor: 'transparent',
                            justifyContent: 'flex-start',
                            paddingLeft: 30
                        }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop: 80 + 20,
        paddingBottom: Platform.OS === 'ios' ? 0 : 20
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    infoContainer: {
        backgroundColor: colors.gray.seventh,
        borderRadius: 10,
        paddingVertical: isDeviceSmallScreen() ? 5 : 20,
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fifth,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 20
    },
    text2: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth,
        fontSize: 14,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    value: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 17
    },
    qrCodeImage: {
        height: 250,
        width: 250,
        marginVertical: 20,
        borderWidth: 3,
        borderColor: colors.blue.sixth,
        borderRadius: 10
    }
});

export default PixQrCodeScreen;
