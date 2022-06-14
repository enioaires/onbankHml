import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

// Styles
import colors from '../../styles/colors';

const cardIcon = require('../../../assets/icons/modal-cards.png');

interface IProps {
    isVisible: boolean;
    setIsVisible: () => void;
    requestAction: () => void;
    requestLoading: boolean;
    isSecondVia: boolean;
}

const RequestCardModal: React.FC<IProps> = ({
    isVisible,
    setIsVisible,
    requestAction,
    requestLoading,
    isSecondVia
}: IProps) => {
    const onPress = (request: boolean) => {
        if (request) {
            setIsVisible();
            setTimeout(() => requestAction(), 800);
            // requestAction();
        } else {
            setIsVisible();
        }
    };

    return (
        <Modal
            isVisible={isVisible}
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
                >
                    <Image
                        source={cardIcon}
                        resizeMode="cover"
                        style={styles.icon}
                    />
                </LinearGradient>
                <Text allowFontScaling={false} style={[styles.mainText]}>
                    {isSecondVia
                        ? `Deseja solicitar o ${'\n'}cartão novamante?`
                        : `Parabéns! Agora é só solicitar seu cartão Onbank!`}
                </Text>
                <Text allowFontScaling={false} style={[styles.subText]}>
                    {/* Você ainda não possui o Cartão Onbank. {`\n`} */}
                    {isSecondVia ? (
                        `O valor de R$ 10,00 é necessário${'\n'}para a solicitação da 2º via`
                    ) : (
                        <Text>
                            Sempre que utilizá-lo,{' '}
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontFamily: 'Roboto-Bold'
                                }}
                            >
                                escolha a opção crédito.
                            </Text>{' '}
                            No entanto, o valor{' '}
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Bold'
                                }}
                            >
                                será debitado da sua conta no momento da compra.
                            </Text>
                        </Text>
                    )}
                </Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => onPress(false)}
                >
                    <Text allowFontScaling={false} style={[styles.notText]}>
                        Voltar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.buttonContainer,
                        {
                            borderTopWidth: 0.5,
                            borderTopColor: colors.text.smsModel
                        }
                    ]}
                    onPress={() => onPress(true)}
                >
                    {requestLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={colors.blue.second}
                        />
                    ) : (
                        <Text
                            allowFontScaling={false}
                            style={styles.actionText}
                        >
                            Solicitar
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

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
        height: 100,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11
    },
    icon: {
        width: 70,
        height: 55
    },
    mainText: {
        fontSize: 21,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        lineHeight: 26,
        color: colors.text.smsModel,
        marginHorizontal: '7%',
        marginBottom: 26
    },
    subText: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.blue.second,
        lineHeight: 20,
        marginHorizontal: '7%',
        marginBottom: 14
    },
    buttonContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 14
    },
    notText: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.text.smsModel
    },
    actionText: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: colors.blue.second
    }
});

export default React.memo(RequestCardModal);
