import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableOpacity,
    Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { TextInputMask } from 'react-native-masked-text';
import {
    capitalize,
    formatCNPJ,
    formatCPF,
    parseCurrency
} from '@brazilian-utils/brazilian-utils';
import { shallowEqual, useSelector } from 'react-redux';
import LinearGradientButton from '../../../../components/LinearGradientButton/LinearGradientButton';
import PageContainer from './components/PageContainer/PageContainer';

import {
    Title,
    AccountHolderItem,
    Label,
    ReceiveInfo,
    AmountInputContainer
} from './Receipt.style';

import { IApplicationState } from '../../../../store/types';
import { useFetch } from '../../../../utils/useFetch';

import { Value } from '../MyKeys/components/CardPixKey/CardPixKey.styles';
import { replaceRange } from '../../../../utils/replaceRange';

const textIcon = require('../../../../../assets/icons/text.png');
const editGrayIcon = require('../../../../../assets/icons/new_icons/edit-gray.png');
const editIcon = require('../../../../../assets/icons/new_icons/edit.png');

const Receive = (props: any) => {
    const { route, navigation } = props;
    const { params } = route;
    const [amount, setAmount] = useState(params?.amount || '');

    const maskDocument = (documentNumber) => {
        if (documentNumber.length <= 11) {
            const formattedDocument = formatCPF(documentNumber);
            const maskedDocument = replaceRange(formattedDocument, 0, 3, '***');
            return replaceRange(maskedDocument, 12, 14, '**');
        }
        const formattedDocument = formatCNPJ(documentNumber);
        const maskedDocument = replaceRange(formattedDocument, 0, 2, '**');
        return replaceRange(maskedDocument, 16, 19, '**');
    };

    const [balance, clientName, documentNumber] = useSelector(
        (state: IApplicationState) => {
            return [
                state.balance.data?.available,
                state.user.data.client.name,
                state.user.data.client.taxIdentifier.taxId
            ];
        },
        shallowEqual
    );

    const { doFetch: generateQrCode, isFetching } = useFetch(
        'pix/dynamic/qrcode',
        'post',
        {
            onSuccess: (data) => {
                navigation.reset({
                    routes: [
                        { name: 'ReceiveQrCode', params: { ...data.links } }
                    ]
                });
            }
        }
    );

    const handleAddDescription = () => {
        Keyboard.dismiss();
        navigation.navigate('AddDescription', {
            description: params?.description
        });
    };

    const handleNextStep = () => {
        Keyboard.dismiss();

        if (params?.isReview) {
            const {
                alias,
                amount: receiveAmount,
                description,
                keyType
            } = params;

            const totalAmount = parseCurrency(receiveAmount);

            return generateQrCode({
                totalAmount,
                alias: keyType === 'Telefone' ? `+55${alias}` : alias,
                description
            });
        }

        navigation.navigate('ConfirmReceive', {
            ...params,
            amount,
            isReview: true
        });
    };

    const disableNextButton = params?.isReview
        ? false
        : !amount || amount === '0,00' || isFetching;

    return (
        <PageContainer hiddenBalanceInfo>
            <KeyboardAvoidingView
                style={{ flex: 1, opacity: 1 }}
                behavior={Platform.select({
                    ios: 'height',
                    android: 'padding'
                })}
            >
                <View style={{ flex: 1 }}>
                    <Title>
                        {params?.isReview
                            ? 'Confirme o valor que deseja receber'
                            : 'Qual valor você quer receber'}
                    </Title>
                    {params?.isReview && (
                        <ReceiveInfo>
                            Confirme as informações que {'\n'}aparecerão para o
                            pagador da {'\n'}cobrança aqui solicitada
                        </ReceiveInfo>
                    )}
                    {!params?.isReview && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <AmountInputContainer
                                style={{
                                    marginTop: 40,
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    borderBottomWidth: 1,
                                    flex: 1,
                                    borderColor: '#C3C3C3',
                                    justifyContent: 'center',
                                    paddingLeft: 20
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontFamily: 'Roboto-Bold',
                                        color: '#C3C3C3',
                                        fontSize: 30,
                                        marginBottom: 5
                                        // marginLeft: 10
                                    }}
                                >
                                    R${' '}
                                </Text>
                                <TextInputMask
                                    editable={!params?.isReview}
                                    // placeholder="0,00"
                                    style={{
                                        flex: 1,
                                        fontFamily: 'Roboto-Bold',
                                        color: '#10779C',
                                        fontSize: 40,
                                        borderWidth: 0,
                                        paddingBottom: 0,
                                        paddingLeft: 5,
                                        borderRadius: 0,
                                        height: 'auto'
                                    }}
                                    // placeholderTextColor={colors.text.second}
                                    // autoFocus
                                    type="money"
                                    checkText={(previous, next) => {
                                        return next !== '0';
                                    }}
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: '',
                                        suffixUnit: ''
                                    }}
                                    value={amount?.toString()}
                                    onChangeText={(text) => setAmount(text)}
                                />
                            </AmountInputContainer>
                        </View>
                    )}

                    {params?.isReview && (
                        <View style={{ marginTop: 30, marginBottom: 10 }}>
                            <TouchableOpacity
                                onPress={navigation.goBack}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#10779C',
                                        fontSize: 30,
                                        fontFamily: 'Roboto-Bold'
                                    }}
                                >
                                    R$ {params?.amount}
                                </Text>
                                <Image
                                    source={editIcon}
                                    style={{ width: 26, height: 26 }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={{ marginTop: 30, marginBottom: 10 }}>
                        {params?.isReview && !params.description ? (
                            <></>
                        ) : (
                            <TouchableOpacity
                                onPress={handleAddDescription}
                                disabled={params?.isReview}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#707070',
                                        fontSize: 16,
                                        fontFamily: 'Roboto-Regular'
                                    }}
                                >
                                    {params?.isReview
                                        ? 'Descrição'
                                        : 'Adicionar descrição'}
                                </Text>
                                {!params?.isReview && (
                                    <Image
                                        source={editGrayIcon}
                                        style={{ width: 26, height: 26 }}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                        {!!params?.description && (
                            <Text
                                style={{
                                    marginTop: 5,
                                    color: '#A8A8A8',
                                    fontFamily: 'Roboto-Regular'
                                }}
                            >
                                {params?.description}
                            </Text>
                        )}
                    </View>
                </View>

                {params?.isReview && (
                    <View>
                        <AccountHolderItem>
                            <Image source={textIcon} />
                            <Label>Nome</Label>
                            <Value>{capitalize(clientName)}</Value>
                        </AccountHolderItem>
                        <AccountHolderItem>
                            <Image source={textIcon} />
                            <Label>
                                {documentNumber?.length <= 11 ? 'CPF' : 'CNPJ'}
                            </Label>
                            <Value>{maskDocument(documentNumber)}</Value>
                        </AccountHolderItem>
                        <AccountHolderItem>
                            <Image source={textIcon} />
                            <Label>Instiuição</Label>
                            <Value>Onbank</Value>
                        </AccountHolderItem>
                        {params?.description && (
                            <AccountHolderItem>
                                <Image source={textIcon} />
                                <Label>Identificador (opcional)</Label>
                                <Value>{params?.description}</Value>
                            </AccountHolderItem>
                        )}
                    </View>
                )}

                <LinearGradientButton
                    loading={isFetching}
                    disabled={disableNextButton}
                    title={params?.isReview ? 'GERAR QR CODE' : 'AVANÇAR'}
                    onPress={handleNextStep}
                />
            </KeyboardAvoidingView>
        </PageContainer>
    );
};

export default Receive;
