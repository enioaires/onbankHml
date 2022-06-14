import React, { useRef, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import numeral from 'numeral';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-community/clipboard';
import { showMessage } from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Store
import { IApplicationState } from '../../../store/types';
import { storeViewShotRefAction } from '../../../store/ducks/receipt/actions';

// Styles
import colors from '../../../styles/colors';

// Utils
import {
    maskDocumentNumber,
    prefityNames,
    maskSecureCpfDocumentNumber
} from '../../../utils/prettiers';

// Types
import { GeneralStackNavigationProps } from '../../../routes/Logged/types';
import { IReceiptData } from '../../../store/ducks/receipt/types';

const ReceiptScren: React.FC<GeneralStackNavigationProps<'Receipt'>> = ({
    navigation
}) => {
    const viewShotRef = useRef<any>(null);
    const dispatch = useDispatch();
    const name = useSelector(
        (state: IApplicationState) => state.user.data.client.name
    );
    const branch = useSelector(
        (state: IApplicationState) => state.user.data.account.branch
    );
    const account = useSelector(
        (state: IApplicationState) => state.user.data.account.account
    );
    const receipt = useSelector(
        (state: IApplicationState) => state.receipt.receipt,
        shallowEqual
    );
    const clientType = useSelector(
        (state: IApplicationState) => state.user.data.clientType
    );
    const companyName = useSelector(
        (state: IApplicationState) =>
            state.user.data.additionalDetailsCorporate?.companyName
    );
    const taxId = useSelector(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );

    const isPJ = clientType === 'CORPORATE';

    // console.log(JSON.stringify(receipt, null, 2));
    // const formattedValue = parseFloat('4.300,55');

    const renderTransferReceipt = () => {
        const isDestinyPJ =
            receipt?.transferInfo?.receiverTaxId &&
            receipt?.transferInfo?.receiverTaxId!.replace(/\D/g, '').length >
                11;

        const handleDocumentNumber = () => {
            if (receipt?.transferInfo?.receiverTaxIdFormatted) {
                return receipt?.transferInfo?.receiverTaxIdFormatted;
            }
            if (
                receipt?.transferInfo?.receiverTaxId &&
                receipt?.transferInfo?.receiverTaxId.match(/\D/g)
            ) {
                return receipt?.transferInfo?.receiverTaxId;
            }
            if (
                receipt?.transferInfo?.receiverTaxId &&
                receipt?.transferInfo?.receiverTaxId.length > 11
            ) {
                return maskDocumentNumber(receipt?.transferInfo?.receiverTaxId);
            }
            return maskSecureCpfDocumentNumber(
                receipt?.transferInfo?.receiverTaxId || ''
            );
        };

        return (
            <View style={styles.box}>
                <Text allowFontScaling={false} style={styles.boxTitle}>
                    Destino
                </Text>
                <Text allowFontScaling={false} style={styles.boxLabel}>
                    Nome
                </Text>
                <Text allowFontScaling={false} style={styles.boxValue}>
                    {receipt?.transferInfo
                        ? prefityNames(receipt?.transferInfo?.receiverName)
                        : ''}
                </Text>
                <Text allowFontScaling={false} style={styles.boxLabel}>
                    {isDestinyPJ ? 'CNPJ' : 'CPF'}
                </Text>
                <Text allowFontScaling={false} style={styles.boxValue}>
                    {handleDocumentNumber()}
                </Text>
                <Text allowFontScaling={false} style={styles.boxLabel}>
                    Instituição
                </Text>
                <Text allowFontScaling={false} style={styles.boxValue}>
                    {receipt?.transferInfo?.receiverBankName || ''}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>
                        <Text allowFontScaling={false} style={styles.boxLabel}>
                            Agência
                        </Text>
                        <Text allowFontScaling={false} style={styles.boxValue}>
                            {receipt?.transferInfo?.receiverBranch
                                ? receipt?.transferInfo?.receiverBankName ===
                                  'Onbank'
                                    ? `000${receipt?.transferInfo?.receiverBranch}`
                                    : receipt?.transferInfo?.receiverBranch
                                : ''}
                        </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text allowFontScaling={false} style={styles.boxLabel}>
                            Conta
                        </Text>
                        <Text allowFontScaling={false} style={styles.boxValue}>
                            {receipt?.transferInfo?.receiverAccount || ''}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderPaymentReceipt = () => {
        return (
            <>
                <View style={[styles.box, { marginBottom: 15 }]}>
                    <Text allowFontScaling={false} style={styles.boxTitle}>
                        Beneficiário
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Nome
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {receipt?.paymentInfo?.beneficiary || 'Indisponível'}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Código de barras
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {receipt?.paymentInfo?.barcode || 'Indisponível'}
                    </Text>
                    {receipt?.paymentInfo?.creditCard && (
                        <>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxLabel}
                            >
                                Método de pagamento
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxValue}
                            >
                                Cartão de Crédito
                            </Text>
                        </>
                    )}
                </View>
            </>
        );
    };

    const renderRechargeReceipt = () => {
        return (
            <>
                <View style={[styles.box, { marginBottom: 15 }]}>
                    <Text allowFontScaling={false} style={styles.boxTitle}>
                        Recarga
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Número
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {receipt?.rechargeInfo?.phoneNumber}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Operadora
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {receipt?.rechargeInfo?.operator}
                    </Text>
                </View>
            </>
        );
    };

    const renderPixReceipt = () => {
        if (receipt?.pixTransfer) {
            return (
                <View style={styles.box}>
                    <Text allowFontScaling={false} style={styles.boxTitle}>
                        Destino
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Nome
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {prefityNames(receipt?.pixTransfer?.receiverName ?? '')}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        {receipt?.pixTransfer.receiverDocumentNumber &&
                        receipt?.pixTransfer.receiverDocumentNumber.replace(
                            /\D/g,
                            ''
                        ).length > 11
                            ? 'CNPJ'
                            : 'CPF'}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {receipt?.pixTransfer.receiverDocumentNumber &&
                        receipt?.pixTransfer.receiverDocumentNumber.match(/\D/g)
                            ? receipt?.pixTransfer.receiverDocumentNumber
                            : maskDocumentNumber(
                                  receipt?.pixTransfer.receiverDocumentNumber ??
                                      ''
                              )}
                    </Text>
                </View>
            );
        }
        if (receipt?.pixDeposit) {
            return (
                <View style={styles.box}>
                    <Text allowFontScaling={false} style={styles.boxTitle}>
                        Destino
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Nome
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {prefityNames(isPJ ? companyName! : name)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        {isPJ ? 'CNPJ' : 'CPF'}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        {maskDocumentNumber(taxId)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Instituição
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxValue}>
                        Onbank
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxLabel}
                            >
                                Agência
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxValue}
                            >
                                {`000${branch}`}
                            </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxLabel}
                            >
                                Conta
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxValue}
                            >
                                {account}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.box}>
                <Text>Ocorreu algum erro. Entre em contato com o suporte.</Text>
            </View>
        );
    };

    const renderReceiptTitle = (
        type:
            | 'transfer'
            | 'billet'
            | 'recharge'
            | 'qrcode'
            | 'qrcodeReceive'
            | 'cardDebit'
            | 'deposit/pix'
            | 'transfer/pix'
            | 'rechargeServices'
    ) => {
        switch (type) {
            case 'transfer':
                if (receipt?.transferInfo?.description) {
                    return 'Agendamento';
                }
                return 'Transferência';
            case 'billet':
                if (receipt?.paymentInfo?.creditCard) {
                    return 'Pagamento Cartão de Crédito';
                }
                return 'Pagamento';
            case 'qrcode':
                return 'Pagamento QR Code';
            case 'recharge':
            case 'rechargeServices':
                return 'Recarga';
            case 'qrcodeReceive':
                return 'Recebimento QR Code';
            case 'cardDebit':
                return 'no Débito';
            case 'deposit/pix':
            case 'transfer/pix':
                return 'Transferência via Pix';
            default:
                return type;
        }
    };

    const renderRechargeServicesReceipt = () => {
        const handleOnPressPin = () => {
            Clipboard.setString(receipt?.rechargeServices?.pin || '');
            showMessage({
                message: 'Copiado!',
                description: 'código PIN copiado!',
                backgroundColor: colors.blue.second,
                icon: 'success'
            });
        };

        if (receipt?.rechargeServices) {
            return (
                <View style={styles.box}>
                    <Text allowFontScaling={false} style={styles.boxLabel}>
                        Serviço
                    </Text>
                    <Text style={styles.boxValue}>
                        {receipt.rechargeServices.product}
                    </Text>
                    {receipt.rechargeServices.pin.length > 0 && (
                        <TouchableOpacity
                            onPress={handleOnPressPin}
                            activeOpacity={0.5}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.boxLabel}
                            >
                                PIN
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={[
                                        styles.boxValue,
                                        {
                                            marginTop: 2,
                                            fontFamily: 'Roboto-Medium',
                                            color: colors.text.second
                                        }
                                    ]}
                                >
                                    {receipt.rechargeServices.pin}
                                </Text>
                                <FontAwesome
                                    name="copy"
                                    color={colors.text.second}
                                    size={20}
                                    style={{
                                        marginLeft: 10
                                    }}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.boxLabel,
                                    {
                                        marginBottom: 20,
                                        marginTop: 10,
                                        textAlign: 'center'
                                    }
                                ]}
                            >
                                Copie e cole o PIN para resgatar os créditos
                            </Text>
                        </TouchableOpacity>
                    )}
                    {receipt.rechargeServices.signerCode?.length! > 0 && (
                        <>
                            <Text
                                allowFontScaling={false}
                                style={styles.boxLabel}
                            >
                                Código do Assinante
                            </Text>
                            <Text style={styles.boxValue}>
                                {receipt.rechargeServices.signerCode}
                            </Text>
                        </>
                    )}
                </View>
            );
        }
    };

    const handleRenderReceipt = (receipt: IReceiptData) => {
        switch (receipt.type) {
            case 'recharge':
                return renderRechargeReceipt();
            case 'rechargeServices':
                return renderRechargeServicesReceipt();
            case 'billet':
                return renderPaymentReceipt();
            case 'deposit/pix':
            case 'transfer/pix':
                return renderPixReceipt();
            case 'qrcodeReceive':
            case 'cardDebit':
                return null;
            default:
                return renderTransferReceipt();
        }
    };

    useEffect(() => {
        if (viewShotRef) {
            dispatch(storeViewShotRefAction(viewShotRef));
        }
    }, [viewShotRef, dispatch]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
                <SafeAreaView
                    collapsable={false}
                    style={styles.safeArea}
                    ref={viewShotRef}
                >
                    <Image
                        source={require('../../../../assets/logo.png')}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                    <Text allowFontScaling={false} style={styles.receiptTitle}>
                        {receipt?.type === 'cardDebit'
                            ? 'Compra'
                            : 'Comprovante de'}
                        {'\n'}
                        {renderReceiptTitle(receipt?.type!)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.date}>
                        {receipt?.date!}
                    </Text>
                    {receipt?.type === 'cardDebit' && (
                        <Text
                            style={[
                                styles.boxValue,
                                {
                                    textAlign: 'center',
                                    marginTop: 20,
                                    marginBottom: 20
                                }
                            ]}
                        >
                            {receipt.cardDebit?.local
                                .split(' ')
                                .filter((word) => !!word)
                                .join(' ')}
                        </Text>
                    )}
                    <Text allowFontScaling={false} style={styles.valueLable}>
                        Valor
                    </Text>
                    <Text allowFontScaling={false} style={styles.value}>
                        {receipt?.value
                            ? numeral(
                                  receipt?.value.toString().replace('.', ',')
                              ).format('$ 0,0.00')
                            : 'Indisponível'}
                    </Text>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginBottom: 50 }}>
                            <View style={[styles.box, { marginBottom: 15 }]}>
                                {receipt?.paymentInfo?.creditCard && (
                                    <>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '40%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxTitle}
                                                >
                                                    Cartão
                                                </Text>
                                            </View>
                                            <View style={{ width: '60%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxTitle}
                                                >
                                                    {`${receipt.paymentInfo.creditCard.cardType.toUpperCase()} **** ${
                                                        receipt.paymentInfo
                                                            .creditCard
                                                            .cardNumber
                                                    }`}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <View style={{ width: '50%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxLabel}
                                                >
                                                    Parcelas
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxValue}
                                                >
                                                    {/* {`${receipt.paymentInfo.creditCard.installments.toString()}x R$ ${
                                                        receipt.paymentInfo
                                                            .creditCard
                                                            .amountPerInstallment
                                                    }`} */}
                                                    {receipt.paymentInfo.creditCard.installments.toString()}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxLabel}
                                                >
                                                    Taxa
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxValue}
                                                >
                                                    {`${numeral(
                                                        receipt.paymentInfo
                                                            .creditCard
                                                            .taxAmount
                                                    ).format('$ 0,0.00')}`}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxLabel}
                                        >
                                            Valor do Boleto
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxValue}
                                        >
                                            {`${numeral(
                                                receipt.paymentInfo.creditCard
                                                    .billetAmount
                                            ).format('$ 0,0.00')}`}
                                        </Text>
                                    </>
                                )}
                                <Text
                                    allowFontScaling={false}
                                    style={styles.boxTitle}
                                >
                                    {receipt?.type === 'billet'
                                        ? 'Pagador'
                                        : 'Origem'}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.boxLabel}
                                >
                                    Nome
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.boxValue}
                                >
                                    {receipt?.type === 'qrcodeReceive'
                                        ? prefityNames(
                                              receipt.qrCodeReceive
                                                  ?.payerName! || ''
                                          )
                                        : receipt?.type === 'deposit/pix'
                                        ? prefityNames(
                                              receipt.pixDeposit?.payerName! ||
                                                  ''
                                          )
                                        : prefityNames(
                                              isPJ ? companyName! : name
                                          )}
                                </Text>

                                {receipt?.type === 'qrcodeReceive' && (
                                    <>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxLabel}
                                        >
                                            {receipt?.qrCodeReceive!.payerTaxId!.replace(
                                                /\D/g,
                                                ''
                                            ).length > 11
                                                ? 'CNPJ'
                                                : 'CPF'}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxValue}
                                        >
                                            {maskDocumentNumber(
                                                receipt?.qrCodeReceive
                                                    ?.payerTaxId ?? ''
                                            )}
                                        </Text>
                                    </>
                                )}

                                {receipt?.type === 'deposit/pix' && (
                                    <>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxLabel}
                                        >
                                            {receipt?.pixDeposit
                                                ?.payerDocumentNumber
                                                ? receipt?.pixDeposit?.payerDocumentNumber.replace(
                                                      /\D/g,
                                                      ''
                                                  ).length > 11
                                                    ? 'CNPJ'
                                                    : 'CPF'
                                                : 'CPF'}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxValue}
                                        >
                                            {receipt?.pixDeposit
                                                ?.payerDocumentNumber &&
                                            receipt?.pixDeposit?.payerDocumentNumber.match(
                                                /\D/g
                                            )
                                                ? receipt?.pixDeposit
                                                      ?.payerDocumentNumber
                                                : maskDocumentNumber(
                                                      receipt?.pixDeposit
                                                          ?.payerDocumentNumber ||
                                                          ''
                                                  )}
                                        </Text>
                                    </>
                                )}

                                {!receipt?.pixDeposit && (
                                    <>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxLabel}
                                        >
                                            Instituição
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxValue}
                                        >
                                            Onbank
                                        </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '50%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxLabel}
                                                >
                                                    Agência
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxValue}
                                                >
                                                    {`000${branch}`}
                                                </Text>
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxLabel}
                                                >
                                                    Conta
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.boxValue}
                                                >
                                                    {receipt?.type ===
                                                    'qrcodeReceive'
                                                        ? receipt.qrCodeReceive
                                                              ?.payerAccount
                                                        : account}
                                                </Text>
                                            </View>
                                        </View>
                                    </>
                                )}

                                {receipt?.type === 'transfer' &&
                                    receipt.transferInfo?.description && (
                                        <>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.boxLabel}
                                            >
                                                Agendado para
                                            </Text>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.boxValue}
                                            >
                                                {receipt.transferInfo
                                                    ?.description || ''}
                                            </Text>
                                        </>
                                    )}

                                {receipt?.type === 'qrcodeReceive' && (
                                    <>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxLabel}
                                        >
                                            Descrição
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.boxValue}
                                        >
                                            {receipt.qrCodeReceive
                                                ?.description || ''}
                                        </Text>
                                    </>
                                )}
                            </View>
                            {/* {receipt?.type === 'recharge'
                                ? renderRechargeReceipt()
                                : receipt?.type === 'billet'
                                ? renderPaymentReceipt()
                                : receipt?.type === 'qrcodeReceive' ||
                                  receipt?.type === 'cardDebit'
                                ? null
                                : receipt?.type === 'deposit/pix' ||
                                  receipt?.type === 'transfer/pix'
                                ? renderPixReceipt()
                                : renderTransferReceipt()} */}
                            {handleRenderReceipt(receipt!)}
                        </View>
                        <View style={styles.bottom}>
                            <Text
                                allowFontScaling={false}
                                style={styles.bottomTitle}
                            >
                                Código da transação
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.bottomText}
                            >
                                {receipt?.transactionCode || ''}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.bottomText}
                            >
                                Onbank Soluções Financeiras S.A.{'\n'}
                                CNPJ 32.914.717/0001-35
                            </Text>
                        </View>
                        {receipt?.type === 'cardDebit' && (
                            <TouchableOpacity
                                style={{
                                    height: 80,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopWidth: 0.7,
                                    borderTopColor: 'rgba(0,0,0,.26)',
                                    flexDirection: 'row',
                                    marginTop: 30
                                }}
                                onPress={() => {
                                    navigation.push('General', {
                                        screen: 'ContestType'
                                    });
                                }}
                            >
                                <MaterialIcon
                                    name="report-problem"
                                    size={25}
                                    color={colors.blue.second}
                                />
                                <Text
                                    style={[
                                        styles.bottomText,
                                        {
                                            marginBottom: 0,
                                            fontSize: 14,
                                            marginLeft: 10
                                        }
                                    ]}
                                >
                                    Reportar problema
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default ReceiptScren;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.gray.fifth
    },
    icon: {
        width: 70,
        height: 30,
        marginBottom: 8,
        alignSelf: 'center'
    },
    receiptTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: colors.text.second,
        textAlign: 'center',
        marginBottom: 8
    },
    date: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: colors.text.third,
        textAlign: 'center',
        marginBottom: 11
    },
    valueLable: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.third,
        textAlign: 'center',
        marginBottom: 4
    },
    value: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: colors.text.second,
        textAlign: 'center',
        marginBottom: 15
    },
    box: {
        marginHorizontal: 17,
        backgroundColor: 'rgba(0,0,0,.06)',
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingTop: 15
    },
    boxTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: colors.blue.primary,
        marginBottom: 12
    },
    boxLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 4
    },
    boxValue: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: colors.text.second,
        marginBottom: 18
    },
    bottom: {
        paddingTop: 20,
        borderTopColor: 'rgba(0,0,0,.26)',
        borderTopWidth: 0.7,
        alignItems: 'center'
    },
    bottomTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: colors.text.second,
        marginBottom: 8
    },
    bottomText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 14,
        textAlign: 'center'
    }
});
