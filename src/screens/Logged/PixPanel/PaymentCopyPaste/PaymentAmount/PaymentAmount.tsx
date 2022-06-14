import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { TextInputMask } from 'react-native-masked-text';
import { parseCurrency } from '@brazilian-utils/brazilian-utils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
    Title,
    InfoText,
    Label,
    AccountHolderItem,
    Value
} from './PaymentAmount.style';
import { onGetUserData } from '../../../../../store/ducks/userData/actions';
import { useFetch } from '../../../../../utils/useFetch';

import LinearGradientButton from '../../../../../components/LinearGradientButton/LinearGradientButton';
import { IApplicationState } from '../../../../../store/types';
import PageContainer from '../../Payment/components/PageContainer/PageContainer';
// import PasswordModal from '../../Payment/components/PasswordModal/PasswordModal';

const textIcon = require('../../../../../../assets/icons/text.png');

const aliasTypes = {
    CPF: 'CPF',
    CNPJ: 'CNPJ',
    EVP: 'Chave aleatória',
    PHONE: 'Telefone',
    EMAIL: 'Email',
    QRCODE: 'QR code'
};

const PaymentAmount = (props: any) => {
    const { route, navigation } = props;
    const { params } = route;
    // const [togglePasswordModal, setTogglePasswordModal] = useState(false);
    const [amount, setAmount] = useState(params?.amount || '');
    const [disabledButton, setDisabledButton] = useState(false);
    const dispatch = useDispatch();
    const [balance] = useSelector((state: IApplicationState) => {
        return [state.balance.data?.available];
    }, shallowEqual);

    useEffect(() => {
        if (!balance) {
            return setDisabledButton(true);
        }
        if (amount && balance) {
            const parsedAmount = parseCurrency(amount);
            if (parsedAmount > balance) {
                return setDisabledButton(true);
            }
            setDisabledButton(false);
        }
        console.log('validade amount', parseCurrency(amount));
    }, [amount]);

    // const handleTogglePasswordModal = () => {
    //     setTogglePasswordModal(!togglePasswordModal);
    // };
    const { doFetch: makePixTransfer, isFetching: loadingTransfer } = useFetch(
        'pix/withdraw',
        'post',
        {
            onSuccess: (data) => {
                dispatch(onGetUserData());
                navigation.pop();
                navigation.reset({
                    routes: [
                        { name: 'Panel' }
                    ]
                });
                navigation.navigate('PaymentSuccessPanel', {
                    transactionId: data.transactionId
                });
            }
        }
    );

    const handleAddDescription = () => {
        Keyboard.dismiss();

        navigation.navigate('AddDescription', {
            description: params.description
        });
    };

    const handleMakePixTransfer = () => {
        const {
            receiverDetails: {
                alias,
                qrcodeType,
                receiverReconciliationIdentifier,
                account,
                branch,
                taxId,
                accountType,
                pspId,
                instituitionName
            },
            description
        } = params;
        const totalAmount = parseCurrency(amount);
        let pixTransferPayload = {};

        pixTransferPayload = {
            qrcodeType,
            receiverReconciliationIdentifier,
            alias,
            totalAmount,
            additionalInformation: description
        };
        if (params?.isBankData) {
            pixTransferPayload = {
                account,
                totalAmount,
                branch,
                taxId,
                pspId,
                accountType,
                instituitionName
            };
        }
        const pixUrl = params.isBankData
            ? 'pix/withdraw/account'
            : 'pix/withdraw';
        makePixTransfer(pixTransferPayload, pixUrl);
    };
    const handleNextStep = () => {
        Keyboard.dismiss();
        if (params?.isReview) {
            navigation.push('General', {
                screen: 'TransactionPassword',
                params: {
                    action: () => handleMakePixTransfer(),
                    localLoading: loadingTransfer
                }
            });
            return;
        }
        navigation.navigate('ConfirmTransfer', {
            ...params,
            amount,
            isReview: true
        });
    };

    return (
        <PageContainer hiddenBalanceInfo={params?.isReview}>
            <KeyboardAvoidingView
                style={{ flex: 1, opacity: 1 }}
                behavior={Platform.select({
                    ios: 'height',
                    android: 'padding'
                })}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Title>
                        {!params?.isReview
                            ? 'Digite o valor que deseja pagar'
                            : 'Confirme o valor que deseja pagar'}
                    </Title>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <View
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
                        </View>
                    </View>
                    <InfoText>
                        Confirme o valor e os dados do destinatário
                    </InfoText>

                    <View style={{ marginTop: 40, marginBottom: 10 }}>
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
                                    fontFamily: 'Roboto-Bold'
                                }}
                            >
                                {params?.isReview
                                    ? 'Descrição'
                                    : 'Adicionar descrição'}
                            </Text>
                            {!params?.isReview && (
                                <FontAwesome5
                                    name="edit"
                                    color="#707070"
                                    size={26}
                                />
                            )}
                        </TouchableOpacity>
                        {!!params.description && (
                            <Text
                                style={{
                                    marginTop: 5,
                                    color: '#A8A8A8',
                                    fontFamily: 'Roboto-Regular'
                                }}
                            >
                                {params.description}
                            </Text>
                        )}
                    </View>
                    <View style={{ marginTop: 40 }}>
                        {!params?.isBankData && (
                            <AccountHolderItem>
                                <Image source={textIcon} />
                                <Label>Chave PIX</Label>
                                <Value>
                                    {
                                        aliasTypes[
                                            params.receiverDetails.aliasType
                                        ]
                                    }
                                </Value>
                            </AccountHolderItem>
                        )}

                        {params.receiverDetails.name && (
                            <AccountHolderItem>
                                <Image source={textIcon} />
                                <Label>Nome</Label>
                                <Value>{params.receiverDetails.name}</Value>
                            </AccountHolderItem>
                        )}

                        {params.receiverDetails.taxIdMasked && (
                            <AccountHolderItem>
                                <Image source={textIcon} />
                                <Label>
                                    {params.receiverDetails.documentType}
                                </Label>
                                <Value>
                                    {params.receiverDetails.taxIdMasked}
                                </Value>
                            </AccountHolderItem>
                        )}
                    </View>
                </ScrollView>
                <LinearGradientButton
                    disabled={disabledButton || !amount}
                    title={params?.isReview ? 'PAGAR' : 'AVANÇAR'}
                    onPress={handleNextStep}
                />
            </KeyboardAvoidingView>

            {/* {togglePasswordModal && (
                <PasswordModal
                    isLoading={loadingTransfer}
                    onSuccess={handleMakePixTransfer}
                    isOpen={togglePasswordModal}
                    onClose={handleTogglePasswordModal}
                />
            )} */}
        </PageContainer>
    );
};

export default PaymentAmount;
