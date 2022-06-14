import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';

// Components
import Modal from '../../components/Modal';

// Styles
import colors from '../../styles/colors';

// Store
import {
    changeTransferPayloadAllAction,
    clearTransferPayloadAction
} from '../../store/ducks/transfer/actions';

// Utils
import { isDeviceSmallScreen } from '../../utils/helpers';
import { prefityNames } from '../../utils/prettiers';

const isSmallScreen = isDeviceSmallScreen();

interface IProps {
    visible: boolean;
    setVisible(value: boolean): void;
    navigation: any;
    clientInfo: any;
}

export default function TransferModal2({
    visible,
    setVisible,
    navigation,
    clientInfo
}: IProps) {
    const dispatch = useDispatch();

    const onPress = (type: 'otherBank' | 'onbank') => {
        Keyboard.dismiss();
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

        if (type === 'onbank') {
            dispatch(
                changeTransferPayloadAllAction({
                    receiverAccountId: clientInfo.accountId,
                    receiverBankName: clientInfo.bankName,
                    receiverBranch: clientInfo.branch,
                    receiverAccount: clientInfo.account,
                    type: 'int'
                })
            );

            setTimeout(() => {
                navigation.push('Transfer', { screen: 'Amount' });
            }, 900);
        } else {
            setTimeout(() => {
                navigation.push('Transfer', { screen: 'Banks' });
            }, 900);
        }
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
                            source={require('../../../assets/icons/back.png')}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.name}>
                        {clientInfo.username &&
                            prefityNames(clientInfo.username)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.text}>
                        Na transferência entre contas Onbank,{'\n'}o dinheiro é
                        creditado imediatamente.{'\n'}A qualquer hora, todos os
                        dias!
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => onPress('onbank')}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image
                            source={require('../../../assets/icons/transfer-onbank.png')}
                            style={styles.logo}
                        />
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.bank,
                                    isSmallScreen && { maxWidth: '95%' }
                                ]}
                            >
                                Transferir para conta Onbank
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={require('../../../assets/icons/forward.png')}
                        style={styles.forwardIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.itemContainer, { marginBottom: 15 }]}
                    onPress={() => onPress('otherBank')}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image
                            source={require('../../../assets/icons/generic-bank.png')}
                            style={styles.logo}
                        />
                        <View>
                            <Text allowFontScaling={false} style={styles.bank}>
                                Outro banco
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={require('../../../assets/icons/forward.png')}
                        style={styles.forwardIcon}
                    />
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
        fontSize: 19,
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second,
        marginTop: 49,
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        marginBottom: 22,
        opacity: 0.5,
        textAlign: 'center',
        lineHeight: 24
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
    }
});
