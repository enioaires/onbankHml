/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    TouchableOpacity,
    View
} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { truncate } from '../../../../../../utils/truncate';
import { useFetch } from '../../../../../../utils/useFetch';
import {
    Container,
    Title,
    TitleContainer,
    Description,
    Label,
    KeyValue,
    ShareButtonText
} from './MyQrCode.styles';

const MyQrCode = () => {
    const navigation = useNavigation();

    const {
        data: myQrCode,
        doFetch: getMyQrcode,
        isFetching,
        updateData
    } = useFetch('pix/static/qrcode', 'post', {
        defaultValue: { link_qrcode: '' },
        hideAlertOnError: true,
        onError: () => {
            updateData({ myQrCode: { qrcode: '' } });
        }
    });
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getMyQrcode();
        });

        return unsubscribe;
    }, [navigation]);

    const handleShareQrCode = async () => {
        RNFetchBlob.config({
            fileCache: true,
            path: `${RNFetchBlob.fs.dirs.DocumentDir}/Pix-QRCode-Onbank.png`
        })
            .fetch('GET', myQrCode.qrcode)
            .then(async (resp) => {
                const sharedQrCodeFilePath = resp.path();

                const options = {
                    title: 'QRCode Pix Onbank',
                    type: 'application/png',
                    url:
                        Platform.OS === 'android'
                            ? `file://${sharedQrCodeFilePath}`
                            : sharedQrCodeFilePath
                };
                try {
                    await Share.open(options);
                } catch (error) {
                    // console.log(error)
                }
            });
    };

    const isLoadingQrCode = isFetching || !myQrCode.qrcode;
    if (isLoadingQrCode) {
        return null;
    }
    return (
        <Container>
            {isLoadingQrCode ? (
                <View
                    style={{
                        width: 80,
                        height: 86,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator />
                </View>
            ) : (
                <Image
                    source={{
                        uri: myQrCode.qrcode
                    }}
                    resizeMode="contain"
                    width={84}
                    height={86}
                    style={{ width: 90, height: 90 }}
                />
            )}

            <View style={{ flex: 1, marginLeft: 6, paddingBottom: 5 }}>
                <TitleContainer>
                    <Title>Meu QR Code</Title>
                </TitleContainer>
                {!isLoadingQrCode && (
                    <Description>
                        <Label>Chave cadastrada</Label>
                        <KeyValue>
                            {myQrCode.key.length >= 30
                                ? truncate(myQrCode.key, 30)
                                : myQrCode.key}
                        </KeyValue>
                    </Description>
                )}

                <TouchableOpacity
                    disabled={isLoadingQrCode}
                    onPress={handleShareQrCode}
                    style={{
                        paddingTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <ShareButtonText>Compartilhar</ShareButtonText>

                    <Image
                        source={require('../../../../../../../assets/icons/new_icons/share.png')}
                        style={{ width: 18, height: 18 }}
                    />
                </TouchableOpacity>
            </View>
        </Container>
    );
};

export default MyQrCode;
