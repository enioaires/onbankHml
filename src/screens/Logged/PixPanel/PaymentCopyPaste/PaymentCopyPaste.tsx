import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import { useIsFocused } from '@react-navigation/native';
import LinearGradientButton from '../../../../components/LinearGradientButton/LinearGradientButton';
import ModalBottom from '../../../../components/ModalBottom/ModalBottom';

import {
    ModalBody,
    Title,
    InputText,
    PasteButton,
    PasteButtonText
} from './PaymentCopyPaste.styles';
import { useFetch } from '../../../../utils/useFetch';
import { IApplicationState } from '../../../../store/types';

// import { Container } from './styles';

const PaymentCopyPaste = ({ navigation }: any) => {
    const [code, setCode] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && !!code) {
            navigation.goBack();
        }
    }, [isFocused]);

    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const { doFetch: decodeQrcode, isFetching } = useFetch(
        'pix/qrcode/decoding',
        'post',
        {
            onSuccess: (data) => {
                const { qrcodeType } = data;
                const hasInfoAdicional =
                    data.dynamicQrcodeData?.payload?.infoAdicionais;

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
                if (
                    qrcodeType === 'DYNAMIC' ||
                    receiverStaticDetails?.amount > 0
                ) {
                    navigation.navigate('ConfirmTransferPanel', {
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
                    navigation.navigate('PaymentAmountPanel', {
                        receiverDetails: receiverStaticDetails,
                        description
                    });
                }
            },
            onError: () => {
                setCode('');
            }
        }
    );
    const pasteCode = async () => {
        const text = await Clipboard.getString();
        setCode(text);
    };
    const handleNextStep = () => {
        decodeQrcode({ qrcode: code });
    };
    return (
        <ModalBottom
            isOpen={isFocused && !hasErrorMessage}
            onClose={navigation.goBack}
            bodyHeight={340}
            modalBackgroundColor="#F8F8F8D1"
            disabledBackdrop={isFetching}
        >
            <ModalBody>
                <Title>Cole o código copiado</Title>
                <InputText value={code} onChangeText={setCode} />
                <PasteButton onPress={pasteCode} disabled={isFetching}>
                    <PasteButtonText>COLAR CÓDIGO</PasteButtonText>
                </PasteButton>
                <LinearGradientButton
                    loading={isFetching}
                    onPress={handleNextStep}
                    disabled={code.length < 30}
                    title="AVANÇAR"
                />
            </ModalBody>
        </ModalBottom>
    );
};

export default PaymentCopyPaste;
