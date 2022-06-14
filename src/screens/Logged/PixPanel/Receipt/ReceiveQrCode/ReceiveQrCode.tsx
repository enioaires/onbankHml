import React from 'react';
import { Image, ScrollView, View, Clipboard, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Share from 'react-native-share';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import colors from '../../../../../styles/colors';
import PageContainer from '../components/PageContainer/PageContainer';
import {
    Title,
    QrCodeContainer,
    QrCodeInfo,
    GeneratePixCopyPasteText,
    GeneratePixCopyPasteButton,
    ShareButton,
    ShareButtonText,
    EditBillButton,
    EditBillText
} from './ReceiveQrCode.styles';

// import { Container } from './styles';

const pixCopiaColaIcon = require('../../../../../../assets/icons/pix-copia-cola.png');

const ReceiveQrCode = ({ navigation, route }) => {
    const handleShareQrCode = () => {
        RNFetchBlob.config({
            fileCache: true,
            path: `${RNFetchBlob.fs.dirs.DocumentDir}/Pix-QRCode-Onbank.png`
        })
            .fetch('GET', params.linkQrCode)
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

    const handleGenerateCopyPaste = () => {
        Clipboard.setString(params.emv);
        showMessage({
            message: 'Copiado!',
            description: 'Pix Copia e Cola copiado',
            backgroundColor: colors.blue.second,
            icon: 'success'
        });
    };

    const { params } = route;

    const handleEditBill = () => {
        navigation.reset({
            routes: [{ name: 'Panel' }, { name: 'Receive' }]
        });
    };
    return (
        <PageContainer hiddenBalanceInfo>
            <ScrollView>
                <Title>Seu QR Code foi gerado</Title>
                <QrCodeContainer
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        style={{
                            width: 160,
                            height: 170,
                            padding: 6,
                            backgroundColor: 'transparent',
                            borderRadius: 8
                        }}
                        width={180}
                        height={190}
                        source={{
                            uri: params.linkQrCode
                        }}
                    />
                </QrCodeContainer>
                <QrCodeInfo>
                    Mostre seu QR Code ou {'\n'}compartilhe o link para o
                    pagador
                </QrCodeInfo>
                <View
                    style={{
                        borderBottomColor: '#C3C3C3',
                        borderBottomWidth: 1,
                        paddingBottom: 20
                    }}
                >
                    <GeneratePixCopyPasteButton
                        onPress={handleGenerateCopyPaste}
                    >
                        <Image source={pixCopiaColaIcon} />
                        <GeneratePixCopyPasteText>
                            Gerar Pix Copia e Cola
                        </GeneratePixCopyPasteText>
                    </GeneratePixCopyPasteButton>
                </View>
                <ShareButton onPress={handleShareQrCode}>
                    <Feather color="#10779C" name="share" size={30} />

                    <ShareButtonText>Compartilhar QR Code</ShareButtonText>
                </ShareButton>
            </ScrollView>
            <EditBillButton onPress={handleEditBill}>
                <EditBillText>Editar cobrança</EditBillText>
                <FontAwesome5 name="edit" color="#707070" size={20} />
            </EditBillButton>
        </PageContainer>
    );
};

export default ReceiveQrCode;
