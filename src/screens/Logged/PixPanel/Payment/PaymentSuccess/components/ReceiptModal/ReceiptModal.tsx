import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import { capitalize, formatCurrency } from '@brazilian-utils/brazilian-utils';
import Share from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';

import Feather from 'react-native-vector-icons/Feather';

import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

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
    ObankFooterText,
    SubTitle
} from './ReceiptModal.styles';
import { useFetch } from '../../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../../../../store/types';
import { ReceiptModalProps } from './ReceiptModal.stypes';
import { setAlertMessageAction } from '../../../../../../../store/ducks/alert/actions';

const onbankLogo = require('../../../../../../../../assets/icons/onbank-logo.png');

const closeIcon = require('../../../../../../../../assets/icons/close.png');
const shareIcon = require('../../../../../../../../assets/icons/share.png');

const operationTypeLabel = {
    transfer: 'Transferência',
    deposit: 'Recebimento',
    devolution: 'Devolução'
};
const operationTypeUrl = {
    transfer: 'transfer',
    deposit: 'deposit',
    devolution: 'deposit'
};
const ReceiptModal = (props: ReceiptModalProps) => {
    const { isOpen, onClose, transactionId, type = 'transfer' } = props;
    const [isSharingReceipt, setSharingReceipt] = useState(false);
    const dispatch = useDispatch();
    const {
        data: receipt,
        doFetch: getReceipt,
        isFetching
    } = useFetch('', 'get', {
        hideAlertOnError: true,
        onError: (err) => {
            dispatch(
                setAlertMessageAction({
                    type: 'error',
                    title: 'Erro',
                    message: err?.message || 'Falha ao consultar comprovante',
                    action: {
                        mainLabel: 'Ok',
                        onPress: onClose
                    }
                })
            );
        }
    });

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
        getReceipt(
            {},
            `account/${operationTypeUrl[type]}/pix/${transactionId}`
        );
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
                                    <Image
                                        source={closeIcon}
                                        resizeMode="contain"
                                        style={{
                                            width: 22,
                                            height: 18,
                                            marginLeft:
                                                Platform.OS === 'ios' ? 27 : 16
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleShareReceipt}
                                    disabled={isSharingReceipt}
                                >
                                    <Image
                                        source={shareIcon}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 25,
                                            marginRight: 10
                                        }}
                                    />
                                </TouchableOpacity>
                            </ModalHeader>
                            <View style={{ paddingHorizontal: 24, marginTop: 22 }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image source={onbankLogo} />
                                    <Title>
                                        Comprovante de {'\n'}
                                        {operationTypeLabel[type]} via PIX
                                    </Title>
                                    <SubTitle>
                                        {format(
                                            new Date(
                                                receipt.paymentDateTime
                                            ),
                                            'dd/MM/yyyy HH:mm:ss'
                                        )}
                                    </SubTitle>
                                </View>
                                <TransactionContainer>
                                    <Label>Valor</Label>
                                    <Value topValue>
                                        R${' '}
                                        {formatCurrency(Number(receipt.amount))}
                                    </Value>
                                </TransactionContainer>

                                <Card>
                                    <CardTitle>Origem</CardTitle>
                                    <View style={{ marginTop: 6 }}>
                                        <Label>Nome</Label>
                                        <Value>
                                            {type === 'transfer'
                                                ? capitalize(userName)
                                                : receipt.payerName}
                                        </Value>
                                    </View>
                                    <View style={{ marginTop: 6 }}>
                                        <Label>Instituição</Label>
                                        <Value>
                                            {type === 'transfer'
                                                ? 'Onbank'
                                                : receipt.origin}
                                        </Value>
                                    </View>
                                    {type === 'transfer' && (
                                        <View
                                            style={{
                                                marginTop: 6,
                                                flexDirection: 'row',
                                                paddingTop: 10
                                            }}
                                        >
                                            <View style={{ width: '50%' }}>
                                                <Label>Agência</Label>
                                                <Value>
                                                    {String(clientBranch)
                                                        .length === 1 && '000'}
                                                    {clientBranch}
                                                </Value>
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                <Label>Conta</Label>
                                                <Value>{clientAccount}</Value>
                                            </View>
                                        </View>
                                    )}

                                    {!!receipt.payerInfo && (
                                        <View style={{ marginTop: 6 }}>
                                            <Label>Descrição</Label>
                                            <Value>{receipt.payerInfo}</Value>
                                        </View>
                                    )}
                                </Card>
                                {type === 'transfer' && (
                                    <Card>
                                        <CardTitle>Destino</CardTitle>
                                        <View style={{ marginTop: 6 }}>
                                            <Label>Nome</Label>
                                            <Value>
                                                {receipt.receiverName}
                                            </Value>
                                        </View>
                                        <View>
                                            <Label>
                                                {receipt.receiverDocumentNumber
                                                    ? 'CPF'
                                                    : 'CNPJ'}
                                            </Label>
                                            <Value>
                                                {receipt.receiverDocumentNumber ||
                                                    receipt.receiverCompanyDocumentNumber}
                                            </Value>
                                        </View>
                                        <View>
                                            <Label>Instituição</Label>
                                            <Value numberOfLines={1}>
                                                {receipt.origin}
                                            </Value>
                                        </View>
                                    </Card>
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
