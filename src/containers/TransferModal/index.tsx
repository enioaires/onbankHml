import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useDispatch } from 'react-redux';

// Styles
import colors from '../../styles/colors';

// Components
import Modal from '../../components/Modal';

// Store
import {
    changeTransferPayloadAllAction,
    clearTransferPayloadAction
} from '../../store/ducks/transfer/actions';

// Utils
import { prefityNames } from '../../utils/prettiers';

interface IProps {
    visible: boolean;
    setVisible(value: boolean): void;
    clientInfo: any;
    navigation: any;
}

export default function TransferModal({
    visible,
    setVisible,
    clientInfo,
    navigation
}: IProps) {
    const dispatch = useDispatch();
    const masDocumentNumber = (documentNumber: string) => {
        if (documentNumber.replace(/\D/g, '').length === 11) {
            return `CPF: ***.***.${documentNumber.substring(
                6,
                9
            )}-${documentNumber.substring(9)}`;
        }
        return `CNPJ: **.***.***/${documentNumber.substring(
            8,
            12
        )}-${documentNumber.substring(12)}`;
    };

    const getLogo = (bankCode: string) => {
        const onbankLogo = require('../../../assets/icons/transfer-onbank.png');
        const itauLogo = require('../../../assets/icons/itau.png');
        const brasilLogo = require('../../../assets/icons/banco-do-brasil.png');
        const bradescoLogo = require('../../../assets/icons/bradesco.png');
        const caixaLogo = require('../../../assets/icons/caixa.png');
        const santanderLogo = require('../../../assets/icons/santander.png');
        const otherLogo = require('../../../assets/icons/generic-bank.png');

        switch (bankCode) {
            case '341':
            case '184':
            case '029':
            case '652':
                return itauLogo;
            case 'Onbank':
                return onbankLogo;
            case '033':
                return santanderLogo;
            case '237':
            case '036':
            case '204':
            case '394':
                return bradescoLogo;
            case '104':
                return caixaLogo;
            case '001':
                return brasilLogo;
            default:
                return otherLogo;
        }
    };

    const renderBank = ({ item, index }: any) => {
        const isNotOnbank = item.bankNumber;

        const onItemClick = () => {
            dispatch(clearTransferPayloadAction());

            setVisible(false);

            dispatch(
                changeTransferPayloadAllAction({
                    receiverName: clientInfo.username,
                    receiverTaxId: clientInfo.taxId,
                    receiverBranch: item.branch,
                    receiverAccount: item.account,
                    receiverBankName: item.bankName,
                    type: isNotOnbank ? 'ted' : 'int',
                    receiverAccountId: item.accountId || '',
                    receiverBank: item.bankNumber || '',
                    receiverPersonType:
                        clientInfo.taxId.replace(/\D/g, '').length > 11
                            ? 'CORPORATE'
                            : 'PERSON'
                })
            );

            setTimeout(() => {
                navigation.push('Transfer', { screen: 'Amount' });
            }, 900);
        };

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                key={index}
                onPress={onItemClick}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={getLogo(item.bankNumber || item.bankName)}
                        style={styles.logo}
                    />
                    <View>
                        <Text allowFontScaling={false} style={styles.bank}>
                            {item.bankName}
                        </Text>
                        {isNotOnbank && (
                            <>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.account}
                                >
                                    Agência: {item.branch}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.account}
                                >
                                    Conta: {item.account}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
                <Image
                    source={require('../../../assets/icons/forward.png')}
                    style={styles.forwardIcon}
                />
            </TouchableOpacity>
        );
    };

    const addAnotherAccount = () => {
        dispatch(clearTransferPayloadAction());
        setVisible(false);
        dispatch(
            changeTransferPayloadAllAction({
                receiverName: clientInfo.username,
                receiverTaxId: clientInfo.taxId,
                receiverPersonType:
                    clientInfo.taxId.replace(/\D/g, '').length > 11
                        ? 'CORPORATE'
                        : 'PERSON'
            })
        );

        setTimeout(() => navigation.push('Transfer', { screen: 'Banks' }), 400);
    };

    return (
        <Modal visible={visible}>
            <>
                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={{
                            position: 'absolute',
                            top: 22,
                            left: 24
                        }}
                    >
                        <Image
                            source={require('../../../assets/icons/close.png')}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.name}>
                        {visible && prefityNames(clientInfo.username)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.cpf}>
                        {visible && masDocumentNumber(clientInfo.taxId)}
                    </Text>
                </View>
                {visible && (
                    <FlatList
                        style={{
                            maxHeight: 190
                        }}
                        data={clientInfo.banks}
                        renderItem={renderBank}
                        keyExtractor={(_, index) => index.toString()}
                    />
                )}
                <TouchableOpacity
                    style={styles.bottom}
                    onPress={addAnotherAccount}
                >
                    <Image
                        source={require('../../../assets/icons/add.png')}
                        style={styles.addIcon}
                    />
                    <Text allowFontScaling={false} style={styles.add}>
                        Adicionar nova conta
                    </Text>
                </TouchableOpacity>
            </>
        </Modal>
    );
}

const styles = StyleSheet.create({
    top: {
        position: 'relative',
        borderBottomWidth: 0.7,
        borderBottomColor: colors.gray.third,
        alignItems: 'center'
    },
    closeIcon: {
        width: 16,
        height: 16
    },
    name: {
        fontSize: 17,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.second,
        marginTop: 49,
        marginBottom: 5
    },
    cpf: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        marginBottom: 15,
        opacity: 0.5
    },
    itemContainer: {
        borderBottomWidth: 0.7,
        borderBottomColor: colors.gray.third,
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 38,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 25
    },
    bank: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.text.second,
        opacity: 0.8
    },
    account: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        opacity: 0.8,
        marginTop: 4
    },
    forwardIcon: {
        width: 6,
        height: 12
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        width: 20,
        height: 20,
        marginRight: 19
    },
    add: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.text.second,
        opacity: 0.8,
        marginVertical: 26
    }
});
