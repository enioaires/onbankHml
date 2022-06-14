import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import { IApplicationState } from '../../store/types';

interface IProps {
    closeAlert(): void;
    showAlert: boolean;
    navigation: any;
}

export default function AddTransactionPasswordModal({
    showAlert,
    closeAlert,
    navigation
}: IProps) {
    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    return (
        <Modal
            isVisible={showAlert}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
        >
            <View style={styles.container}>
                <LinearGradient
                    style={[styles.iconContainer]}
                    colors={[colors.blue.fourth, colors.blue.primary]}
                    useAngle
                    angle={120}
                    angleCenter={{ x: 0.1, y: 0.3 }}
                />

                <Text allowFontScaling={false} style={styles.title}>
                    Cadastrar{'\n'}
                    senha {cardBiz === 'ATIVADO' ? 'do cartão' : 'de transação'}
                </Text>

                <Text allowFontScaling={false} style={[styles.text]}>
                    Você ainda não possui uma senha{' '}
                    {cardBiz === 'ATIVADO' ? 'do cartão' : 'de transação'}{' '}
                    cadastrada. Cadastre agora para continuar a transação.
                </Text>

                <View style={styles.noActionContainer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={closeAlert}
                    >
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.noAction,
                                { color: colors.gray.second }
                            ]}
                        >
                            Voltar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            closeAlert();
                            setTimeout(() => {
                                navigation.push('AddTransactionPassword');
                            }, 900);
                        }}
                    >
                        <Text allowFontScaling={false} style={styles.noAction}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 31,
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
        fontSize: 22,
        fontFamily: 'Roboto-Bold',
        marginBottom: 30,
        textAlign: 'center',
        color: colors.text.smsModel
    },
    text: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        marginBottom: 50,
        textAlign: 'center',
        color: colors.text.smsModel,
        lineHeight: 20,
        marginRight: 27,
        marginLeft: 22
    },
    noActionContainer: {
        borderTopColor: colors.gray.seventh,
        borderTopWidth: 1,
        height: 53,
        flexDirection: 'row'
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center'
    },
    noAction: {
        fontSize: 19,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: colors.blue.second
    }
});
