import React, { useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    StyleSheet,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { useFetch } from '../../../../../../../utils/useFetch';
import Overlay from './Overlay/Overlay';

import { ContainerLoading } from './Camera.style';

const styles = StyleSheet.create({
    containerCamera: {
        flex: 1,
        flexDirection: 'column'
        // backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'red'
    }
});

const Camera = () => {
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    const [flashOn, setFlashOn] = useState(false);
    const [isValidFetching, setIsValidFetching] = useState(false);

    const { doFetch: decodeQrcode, isFetching } = useFetch('', 'post', {
        onSuccess: (data) => {
            const { qrcodeType } = data;
            const hasInfoAdicional =
                data.dynamicQrcodeData?.payload?.infoAdicionais;

            setIsValidFetching(true);
            const receiverDynamicDetails = {
                qrcodeType,
                receiverReconciliationIdentifier:
                    data.dynamicQrcodeData?.payload?.txid,
                aliasType: 'QRCODE',
                alias:
                    data.dynamicQrcodeData?.payload?.chave ||
                    data.staticQrcodeData?.alias,
                name: data.dynamicQrcodeData?.merchantName,
                isReview: true,
                amount: data.dynamicQrcodeData?.amount
            };

            const receiverStaticDetails = {
                qrcodeType,
                aliasType: 'QRCODE',
                alias: data.staticQrcodeData?.alias,
                name: data.staticQrcodeData?.merchantName,
                isReview: false,
                amount: data.staticQrcodeData?.amount
            };
            const description =
                hasInfoAdicional?.length > 0
                    ? hasInfoAdicional[0].nome
                    : data.staticQrcodeData?.description;
            if (qrcodeType === 'DYNAMIC' || receiverStaticDetails?.amount > 0) {
                navigation.navigate('ConfirmTransfer', {
                    receiverDetails: receiverDynamicDetails,
                    isReview: true,
                    amount:
                        qrcodeType === 'DYNAMIC'
                            ? `${parseFloat(
                                  data.dynamicQrcodeData.amount
                              ).toFixed(2)}`
                            : `${parseFloat(
                                  data.staticQrcodeData.amount
                              ).toFixed(2)}`,
                    description
                });
            } else {
                navigation.navigate('PaymentAmount', {
                    receiverDetails: receiverStaticDetails,
                    description
                });
            }
        }
    });

    const onBarcodeScanner = useCallback(({ data }) => {
        if (isFetching || isValidFetching) return;
        decodeQrcode({ qrcode: data }, 'pix/qrcode/decoding');
        setTimeout(() => {
            setIsValidFetching(false);
        }, 5000);
    }, []);
    return (
        <View style={styles.containerCamera}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                flashMode={
                    flashOn
                        ? RNCamera.Constants.FlashMode.torch
                        : RNCamera.Constants.FlashMode.off
                }
                onBarCodeRead={onBarcodeScanner}
            >
                {isFetching ? (
                    <ContainerLoading>
                        <ActivityIndicator size="large" color="#3199B3" />
                    </ContainerLoading>
                ) : (
                    <Overlay
                        onBack={() => navigation.goBack()}
                        onFlashLight={() => setFlashOn((old) => !old)}
                    />
                )}
                {({ status }) => {
                    if (status === 'NOT_AUTHORIZED') {
                        Alert.alert(
                            'Acesso Negado',
                            'Autorize o acesso da sua câmera para que possamos fazer a leitura do código de barras.',
                            [
                                {
                                    text: 'Agora não',
                                    onPress: () => navigation.goBack()
                                },
                                {
                                    text: 'Autorizar',
                                    onPress: () => Linking.openSettings()
                                }
                            ]
                        );
                        return null;
                    }
                }}
            </RNCamera>
        </View>
    );
};

export default Camera;
