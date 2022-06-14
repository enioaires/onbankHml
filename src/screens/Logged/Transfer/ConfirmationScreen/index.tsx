import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';
import numeral from 'numeral';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as dateFns from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';

// Components
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    clearTransferPayloadAction,
    requestTransferAction
} from '../../../../store/ducks/transfer/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';
import {
    maskDocumentNumber,
    prefityNames,
    maskSecureCpfDocumentNumber
} from '../../../../utils/prettiers';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';
import password from 'src/store/ducks/password';

const isSmallDevice = isDeviceSmallScreen();

const ConfirmationScreen: React.FC<
    TransferStackNavigationProps<'Confirmation'>
> = ({ navigation }: TransferStackNavigationProps<'Confirmation'>) => {
    const dispatch = useDispatch();
    const [amount, taxId, taxIdFormatted, bank, branch, account, name, type] =
        useSelector((state: IApplicationState) => {
            return [
                state.transfer.payload.amount,
                state.transfer.payload.receiverTaxId,
                state.transfer.payload.receiverTaxIdFormatted,
                state.transfer.payload.receiverBankName,
                state.transfer.payload.receiverBranch,
                state.transfer.payload.receiverAccount,
                state.transfer.payload.receiverName,
                state.transfer.payload.type
            ];
        }, shallowEqual);
    const isBusinessDay = useSelector(
        (state: IApplicationState) => state.user.data.businessDay
    );

    const isPJ = taxId.replace(/\D/g, '').length > 11;

    const handleRequestTransferAaction = (
        nav: any,
        transactionPassword: string
    ) => {
        dispatch(requestTransferAction(nav, transactionPassword));
    };
    const navigateToTransactionPassword = () => {
        navigation.replace('General', {
            screen: 'TransactionPassword',
            params: {
                action: (transactionPassword) =>
                    dispatch(
                        requestTransferAction(navigation, transactionPassword)
                    ),
                url: type === 'int' ? '/v2/transfer/int' : '/v2/transfer/ext'
            }
        });
    };

    const onPress = async () => {
        if (type === 'ted') {
            const formatedDate = dateFns.parseISO(
                formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm', {
                    timeZone: 'America/Sao_Paulo'
                })
            );
            const isWeekend = dateFns.isWeekend(formatedDate);
            const isOffComercialTime =
                dateFns.getHours(formatedDate) >= 16 ||
                dateFns.getHours(formatedDate) < 8;

            if (!isBusinessDay || isWeekend || isOffComercialTime) {
                dispatch(
                    setAlertMessageAction({
                        title: 'Importante!',
                        message:
                            'Por conta do horário não comercial (08:00 às 16:00 hrs), sua transação será agendada para o próximo dia útil. Deseja continuar?',
                        action: {
                            onPress: () => navigateToTransactionPassword(),
                            mainLabel: 'Continuar',
                            secondLabel: 'Voltar'
                        }
                    })
                );
            } else {
                navigateToTransactionPassword();
            }
        } else {
            navigateToTransactionPassword();
        }
    };

    // useEffect(() => {
    //     console.log(
    //         formatToTimeZone(new Date(), 'DD/MM/YYYY HH:mm', {
    //             timeZone: 'America/Sao_Paulo'
    //         }),
    //         dateFns.parseISO(
    //             formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm', {
    //                 timeZone: 'America/Sao_Paulo'
    //             })
    //         ),
    //         dateFns.isWeekend(
    //             dateFns.parseISO(
    //                 formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm', {
    //                     timeZone: 'America/Sao_Paulo'
    //                 })
    //             )
    //         ),
    //         dateFns.getHours(
    //             dateFns.parseISO(
    //                 formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm', {
    //                     timeZone: 'America/Sao_Paulo'
    //                 })
    //             )
    //         ) - 1
    //     );
    // }, []);

    return (
        <View style={[styles.container, isSmallDevice && { paddingTop: 80 }]}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scroll}>
                    <Text allowFontScaling={false} style={[styles.title]}>
                        Transferência
                    </Text>
                    <Text allowFontScaling={false} style={styles.valueLabel}>
                        Valor
                    </Text>
                    <Text allowFontScaling={false} style={styles.value}>
                        {numeral(amount).format('$ 0,0.00')}
                    </Text>
                    <Text allowFontScaling={false} style={styles.dateLabel}>
                        Data da transferência{' '}
                        <Text allowFontScaling={false} style={styles.date}>
                            {dateFns.format(new Date(), 'dd/MM')}
                        </Text>
                    </Text>
                    <Text allowFontScaling={false} style={styles.boxTitle}>
                        Transferindo para:
                    </Text>
                    <View style={styles.box}>
                        <Text allowFontScaling={false} style={styles.infoTitle}>
                            {prefityNames(name)}
                        </Text>
                        <View style={styles.block}>
                            <Text allowFontScaling={false} style={styles.label}>
                                {isPJ ? 'CNPJ' : 'CPF'}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.infoValue}
                            >
                                {taxIdFormatted.length > 0
                                    ? taxIdFormatted
                                    : taxId.match(/\D/g)
                                    ? taxId
                                    : taxId.length > 11
                                    ? maskDocumentNumber(taxId)
                                    : maskSecureCpfDocumentNumber(taxId)}
                            </Text>
                        </View>
                        <View style={styles.block}>
                            <Text allowFontScaling={false} style={styles.label}>
                                Instituição
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.infoValue}
                            >
                                {bank}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                alignSelf: 'stretch'
                            }}
                        >
                            <View style={[styles.block, { width: '45%' }]}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Agência{' '}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.infoValue}
                                >
                                    {bank === 'Onbank'
                                        ? `000${branch}`
                                        : branch}
                                </Text>
                            </View>
                            <View
                                style={[
                                    [styles.block, { width: '45%' }],
                                    { marginBottom: 30 }
                                ]}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Conta{' '}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.infoValue}
                                >
                                    {account}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <ActionButton
                    label="Confirmar transferência"
                    onPress={onPress}
                />
            </SafeAreaView>
        </View>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    scroll: {
        flex: 1,
        marginBottom: 15
    },
    box: {
        backgroundColor: colors.gray.seventh,
        marginBottom: 23,
        borderRadius: 10,
        paddingHorizontal: 19,
        paddingTop: 22
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: colors.text.second,
        marginBottom: 10,
        textAlign: 'center'
    },
    valueLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 5,
        textAlign: 'center'
    },
    value: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 9
    },
    dateLabel: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30
    },
    date: {
        fontFamily: 'Roboto-Bold',
        color: colors.blue.primary,
        fontSize: 16
    },
    boxTitle: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 9
    },
    infoTitle: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 18,
        marginBottom: 23,
        textAlign: 'center'
    },
    block: {
        marginBottom: 15
    },
    label: {
        fontSize: 14,
        color: colors.text.third,
        fontFamily: 'Roboto-Regular',
        marginBottom: 5
    },
    infoValue: {
        fontSize: 17,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    }
});
