import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import colors from '../../styles/colors';

// Store
import { IApplicationState } from '../../store/types';
import { closeSuccessModalNotNavAction } from '../../store/ducks/successModal/actions';

interface IProps {

}

export default function TransactionSuccessModal({

}: IProps) {
    const dispatch = useDispatch();
    const modal = useSelector(
        (state: IApplicationState) => state.successModal.modalNotNav
    );
    const onPress = (route: 'home' | 'receipt') => {
        dispatch(closeSuccessModalNotNavAction());
        /* setTimeout(() => {
            if (route === 'home') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'General' }]
                });
            } else {
                navigation.push('General', {
                    screen: 'Receipt'
                });
            }
        }, 400); */
    };

    return (
        <Modal
            isVisible={modal.visible}
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
                        source={require('../../../assets/icons/success.png')}
                        style={{
                            width: 80,
                            height: 70
                        }}
                        resizeMode="contain"
                    />
                </LinearGradient>

                <Text allowFontScaling={false} style={styles.title}>
                    {modal.message}
                </Text>
                <View style={styles.noActionContainer}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, { width: '100%' }]}
                        onPress={() => onPress('home')}
                    >
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.noAction,
                                { color: colors.gray.second }
                            ]}
                        >
                            OK
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
        fontSize: 20,
        fontFamily: 'Roboto-Medium',
        marginBottom: 30,
        textAlign: 'center',
        color: colors.text.smsModel,
        marginHorizontal: 60
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
