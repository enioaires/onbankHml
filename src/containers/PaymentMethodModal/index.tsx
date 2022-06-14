import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

// Style
import colors from '../../styles/colors';

// Store
import { requestPaymentAction } from '../../store/ducks/payment/actions';

const addNewCardAddresIcon = require('../../../assets/icons/address-card.png');
const addressIcon = require('../../../assets/icons/address.png');

interface IProps {
    closeAlert(value: boolean): void;
    showAlert: boolean;
    navigation: any;
}

export default function PaymentMethodModal({
    showAlert,
    closeAlert,
    navigation
}: IProps) {
    const dispatch = useDispatch();

    return (
        <Modal
            isVisible={showAlert}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
            onBackdropPress={() => closeAlert(false)}
        >
            <View style={styles.container}>
                <LinearGradient
                    style={[styles.iconContainer]}
                    colors={[colors.blue.fourth, colors.blue.primary]}
                    useAngle
                    angle={120}
                    angleCenter={{ x: 0.1, y: 0.3 }}
                >
                    <Image
                        source={addNewCardAddresIcon}
                        resizeMode="contain"
                        style={{
                            width: 110,
                            height: 110
                        }}
                    />
                </LinearGradient>

                <Text allowFontScaling={false} style={styles.title}>
                    Selecione o endereço do cartão
                </Text>

                <TouchableOpacity
                    style={[styles.buttonContainer, { borderTopWidth: 0.6 }]}
                    onPress={() => {}}
                >
                    <Image
                        source={addressIcon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 23
                        }}
                    />
                    <Text allowFontScaling={false} style={styles.address}>
                        Pagar com cartão da carteira
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={() => {
                        navigation.push('General', {
                            screen: 'TransactionPassword',
                            params: {
                                action: () =>
                                    dispatch(requestPaymentAction(navigation))
                            }
                        });
                    }}
                >
                    <Image
                        source={addressIcon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 23
                        }}
                    />
                    <Text allowFontScaling={false} style={styles.address}>
                        Pagar com saldo em conta
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 11,
        backgroundColor: colors.white,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    },
    iconContainer: {
        height: 115,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11
    },
    icon: {
        width: 78,
        height: 43
    },
    title: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        marginVertical: 22,
        color: colors.text.third,
        marginLeft: 35
    },
    useAddressBox: {
        alignSelf: 'stretch',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    useAddress: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.second
    },
    buttonContainer: {
        alignSelf: 'stretch',
        borderBottomWidth: 0.6,
        borderColor: colors.text.third,
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 35
    },
    address: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.second
    },
    newAddress: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth
    }
});
