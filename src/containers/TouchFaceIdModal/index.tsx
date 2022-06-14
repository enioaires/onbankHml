import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

// Store
import { IApplicationState } from '../../store/types';

// Styles
import colors from '../../styles/colors';

interface IProps {
    isVisible: boolean;
    authenticationType: string;
    isFirstTime: boolean;
    setIsVisible: (value: boolean) => void;
    setTouchFaceIdAble: (value: boolean) => void;
}

const TouchFaceIdModal: React.FC<IProps> = ({
    isVisible,
    authenticationType,
    isFirstTime,
    setIsVisible,
    setTouchFaceIdAble
}: IProps) => {
    const loginLoading = useSelector(
        (state: IApplicationState) => state.login.isLoading
    );

    const onPress = (value: boolean) => {
        setTouchFaceIdAble(value);
        setIsVisible(false);
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
                    <Icon
                        size={50}
                        name={
                            authenticationType === 'TouchID'
                                ? 'fingerprint'
                                : 'face-recognition'
                        }
                        color={colors.white}
                    />
                </LinearGradient>

                {!isFirstTime && loginLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={colors.blue.second}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch'
                        }}
                    />
                ) : (
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.message,
                            !isFirstTime && { marginHorizontal: 50 }
                        ]}
                    >
                        {isFirstTime
                            ? `Deseja habilitar seu acesso${'\n'} utilizando o ${authenticationType}?`
                            : `Utilize o leitor de ${authenticationType} para acessar sua conta`}
                    </Text>
                )}

                <View style={styles.noActionContainer}>
                    {isFirstTime ? (
                        <>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => onPress(false)}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.noAction,
                                        { color: colors.gray.second }
                                    ]}
                                >
                                    Agora não
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => onPress(true)}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.noAction}
                                >
                                    Habilitar
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={[styles.buttonContainer, { width: '100%' }]}
                            onPress={() => onPress(false)}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.noAction,
                                    {
                                        color: colors.gray.second
                                    }
                                ]}
                            >
                                Digitar manualmente
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
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
    message: {
        fontSize: 17,
        fontFamily: 'Roboto-Medium',
        marginBottom: 30,
        textAlign: 'center',
        color: colors.text.smsModel,
        marginHorizontal: 20
    },
    text: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        marginBottom: 50,
        textAlign: 'center',
        color: colors.text.smsModel,
        lineHeight: 20,
        marginHorizontal: '10%'
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
        fontSize: 17,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: colors.blue.second
    }
});

export default React.memo(TouchFaceIdModal);
