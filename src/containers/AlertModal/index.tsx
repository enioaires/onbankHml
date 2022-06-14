import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

// Styles
import colors from '../../styles/colors';

// Components
import ActionButton from '../../components/ActionButton';

interface IProps {
    icon: any;
    title: string;
    message: string;
    buttonProps: {
        label: string;
        action?(): void;
        closeAlert(): void;
    };
    showAlert: boolean;
    largeIcon?: boolean;
}

export default function AlertModal({
    icon,
    title,
    message,
    buttonProps,
    showAlert,
    largeIcon = false
}: IProps) {
    const onPress = () => {
        buttonProps.closeAlert();
        if (buttonProps.action) {
            setTimeout(() => {
                buttonProps.action!();
            }, 400);
        }
    };
    return (
        <Modal
            isVisible={showAlert}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
            onBackdropPress={() => {
                buttonProps.closeAlert();
                if (buttonProps.action) {
                    setTimeout(() => {
                        buttonProps.action!();
                    }, 400);
                }
            }}
        >
            <View style={styles.container}>
                <LinearGradient
                    style={[
                        styles.iconContainer,
                        buttonProps.action && { height: 145 }
                    ]}
                    colors={[colors.blue.seventh, colors.blue.eigth]}
                    useAngle
                    angle={50}
                    angleCenter={{ x: 0.7, y: 0.1 }}
                >
                    <Image
                        style={[styles.icon, largeIcon && { height: 80 }]}
                        source={icon}
                        resizeMode="contain"
                    />
                </LinearGradient>

                {!buttonProps.action && (
                    <Text allowFontScaling={false} style={styles.title}>
                        {title}
                    </Text>
                )}

                <Text
                    allowFontScaling={false}
                    style={[
                        styles.text,
                        buttonProps.action && { fontSize: 24, lineHeight: 31 }
                    ]}
                >
                    {message}
                </Text>

                {buttonProps.action ? (
                    <ActionButton
                        label={buttonProps.label}
                        onPress={onPress}
                        style={{
                            height: 43,
                            marginBottom: 20,
                            marginHorizontal: 26,
                            borderRadius: 5
                        }}
                    />
                ) : (
                    <>
                        <View />
                        <TouchableOpacity
                            style={styles.noActionContainer}
                            onPress={onPress}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.noAction}
                            >
                                {buttonProps.label}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
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
        marginBottom: 21,
        textAlign: 'center',
        color: colors.text.smsModel
    },
    text: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        marginBottom: 80,
        textAlign: 'center',
        color: colors.text.smsModel,
        lineHeight: 20,
        marginRight: 27,
        marginLeft: 22
    },
    noActionContainer: {
        borderTopColor: colors.gray.seventh,
        borderTopWidth: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noAction: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: colors.blue.second,
        alignSelf: 'center'
    }
});
