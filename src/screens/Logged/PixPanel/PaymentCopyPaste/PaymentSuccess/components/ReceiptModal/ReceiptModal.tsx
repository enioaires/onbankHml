import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import { capitalize, formatCurrency } from '@brazilian-utils/brazilian-utils';
import Share from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';

import Feather from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import {
    ModalHeader,
    Title,
    TransactionContainer,
    Label,
    Value,
    Card,
    CardTitle,
    ShareButton,
    ShareButtonText,
    TransactionCodeContainer,
    TransactionCodeTitle,
    TransactionCode,
    ObankFooterText
} from './ReceiptModal.styles';
import { ReceiptModalProps } from './ReceiptModal.stypes';
import { useFetch } from '../../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../../../../store/types';

const onbankLogo = require('../../../../../../../../assets/icons/onbank-logo.png');

const closeCircleIcon = require('../../../../../../../../assets/icons/close-circle.png');

const ReceiptModal = (props: ReceiptModalProps) => {
    const { isOpen, onClose, transactionId } = props;
    const [isSharingReceipt, setSharingReceipt] = useState(false);

    const { data: receipt, doFetch: getReceipt, isFetching } = useFetch('');

    const clientAccount = useSelector(
        (state: IApplicationState) => state.user.data.account.account
    );

    const clientBranch = useSelector(
        (state: IApplicationState) => state.user.data.account.branch
    );

    const userName = useSelector(
        (state: IApplicationState) => state.user.data.client.name
    );

    useEffect(() => {
        getReceipt({}, `account/transfer/pix/${transactionId}`);
    }, [transactionId]);
    const viewShotRef = useRef<any>(null);

    const handleShareReceipt = () => {
        setSharingReceipt(true);
        setTimeout(() => {
            captureRef(viewShotRef, {
                quality: 0.9,
                format: 'png'
            }).then((uri) => {
                Share.open({
                    url: `file://${uri}`,
                    filename: 'Comprovante',
                    message: ''
                }).finally(() => {
                    setSharingReceipt(false);
                });
            });
        }, 200);
    };

    if (isFetching || !receipt) {
        return <ActivityIndicator />;
    }

    return (
        <Modal visible={isOpen} onRequestClose={onClose} animationType="slide">
            <View
                style={{
                    flex: 1,
                    // paddingHorizontal: 24,
                    backgroundColor: '#EFF1F2',
                    paddingBottom: 40
                }}
            >
                <ScrollView>
                    <ViewShot
                        ref={viewShotRef}
                        options={{ quality: 0.9, format: 'jpg' }}
                        style={{ flex: 1, backgroundColor: '#EFF1F2' }}
                    >
                        <SafeAreaView style={{ flex: 1 }}>
                            <ModalHeader>
                                <TouchableOpacity onPress={onClose}>
                                    <Image source={closeCircleIcon} />
                                    {/* <Ionicons
                                        name="ios-close-circle-outline"
                                        size={30}
                                        color="#33A0BA"
                                    /> */}
                                </TouchableOpacity>
                            </ModalHeader>
                            <View style={{ paddingHorizontal: 24 }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image source={onbankLogo} />
                                    <Title>
                                        Comprovante de {'\n'}Transferência via
                                        PIX
                                    </Title>
                                </View>
                                <TransactionContainer>
                                    <View>
                                        <Label>Valor</Label>
                                        <Value>
                                            R${' '}
                                            {formatCurrency(
                                                Number(receipt.amount)
                                            )}
                                        </Value>
                                    </View>
                                    <View>
                                        <Label>Registro</Label>
                                        <Value>
                                            {format(
                                                new Date(
                                                    receipt.paymentDateTime
                                                ),
                                                'dd/MM/yyyy HH:mm:ss'
                                            )}
                                        </Value>
                                    </View>
                                </TransactionContainer>

                                <Card>
                                    <CardTitle>Origem</CardTitle>
                                    <View style={{ marginTop: 6 }}>
                                        <Label>Nome</Label>
                                        <Value>{capitalize(userName)}</Value>
                                    </View>
                                    <View style={{ marginTop: 6 }}>
                                        <Label>Instituição</Label>
                                        <Value>Onbank</Value>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 6,
                                            flexDirection: 'row',
                                            borderTopWidth: 1,
                                            borderColor: '#C3C3C3',
                                            paddingTop: 10
                                        }}
                                    >
                                        <View>
                                            <Label>Agência</Label>
                                            <Value>
                                                {String(clientBranch).length ===
                                                    1 && '000'}
                                                {clientBranch}
                                            </Value>
                                        </View>
                                        <View style={{ marginLeft: 40 }}>
                                            <Label>Conta</Label>
                                            <Value>{clientAccount}</Value>
                                        </View>
                                    </View>
                                    {receipt.payerInfo && (
                                        <View style={{ marginTop: 6 }}>
                                            <Label>Descrição</Label>
                                            <Value>{receipt.payerInfo}</Value>
                                        </View>
                                    )}
                                </Card>
                                <Card>
                                    <CardTitle>Destino</CardTitle>
                                    <View style={{ marginTop: 6 }}>
                                        <Label>Nome</Label>
                                        <Value>{receipt.receiverName}</Value>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 6,
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <View>
                                            <Label>
                                                {' '}
                                                {receipt.receiverDocumentNumber
                                                    ? 'CPF'
                                                    : 'CNPJ'}
                                            </Label>
                                            <Value>
                                                {receipt.receiverDocumentNumber ||
                                                    receipt.receiverCompanyDocumentNumber}
                                            </Value>
                                        </View>
                                        <View
                                            style={{
                                                marginLeft: 40,
                                                maxWidth: 180
                                            }}
                                        >
                                            <Label>Instituição</Label>
                                            <Value numberOfLines={1}>
                                                {receipt.origin}
                                            </Value>
                                        </View>
                                    </View>
                                </Card>
                                {!isSharingReceipt && (
                                    <ShareButton onPress={handleShareReceipt}>
                                        <ShareButtonText>
                                            Compartilhar comprovante
                                        </ShareButtonText>
                                        <Feather
                                            color="#10779C"
                                            name="share"
                                            size={20}
                                        />
                                    </ShareButton>
                                )}
                            </View>
                        </SafeAreaView>
                        <TransactionCodeContainer>
                            <TransactionCodeTitle>
                                Código da transação
                            </TransactionCodeTitle>

                            <TransactionCode>{transactionId}</TransactionCode>
                            <ObankFooterText>
                                OnBank Soluções Financeiras S.A {'\n'} CNPJ
                                32.914.717/0001-35
                            </ObankFooterText>
                        </TransactionCodeContainer>
                    </ViewShot>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default ReceiptModal;
