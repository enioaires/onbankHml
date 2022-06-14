import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Store
import { changeTransferPayloadAction } from '../../store/ducks/transfer/actions';

// Components
import Modal from '../../components/Modal';

// Styles
import colors from '../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../utils/helpers';

const isSmallScreen = isDeviceSmallScreen();

interface IProps {
    visible: boolean;
    setVisible(value: boolean): void;
    navigation: any;
}

export default function TransferAnotherContactModal({
    visible,
    setVisible,
    navigation
}: IProps) {
    const dispatch = useDispatch();

    const intTransfer = () => {
        dispatch(
            changeTransferPayloadAction({
                key: 'type',
                value: 'int'
            })
        );
        setVisible(false);
        setTimeout(() => {
            navigation.push('Transfer', { screen: 'IntOptions' });
        }, 900);
    };

    const tedTransfer = () => {
        dispatch(
            changeTransferPayloadAction({
                key: 'type',
                value: 'ted'
            })
        );
        setVisible(false);
        setTimeout(() => {
            navigation.push('Transfer', { screen: 'DocumentNumber' });
        }, 900);
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
                    {/* <Text allowFontScaling={false} style={styles.name}>
                        {clientInfo.username &&
                            prefityNames(clientInfo.username)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.text}>
                        Na transferência entre contas Onbank,{'\n'}o dinheiro é
                        creditado imediatamente.{'\n'}A qualquer hora, todos os
                        dias!
                    </Text> */}
                </View>
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={intTransfer}
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
                    style={[styles.itemContainer, { marginBottom: 22 }]}
                    onPress={tedTransfer}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image
                            source={require('../../../assets/icons/generic-bank.png')}
                            style={styles.bankIcon}
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
        alignItems: 'center',
        paddingTop: 70
    },
    closeIcon: {
        width: 20,
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
    bankIcon: {
        width: 30,
        height: 30,
        marginRight: 30,
        marginLeft: 5
    },
    bank: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        color: colors.text.second,
        opacity: 0.5
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
