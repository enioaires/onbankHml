import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavigationContainerRef, StackActions } from '@react-navigation/core';

// Store
import { clearAlertStateAction } from '../../store/ducks/alert/actions';
import { IApplicationState } from '../../store/types';
import {
    removeTokenAction
    // revalidateUserAction
} from '../../store/ducks/auth/actions';

// Style
import colors from '../../styles/colors';

// Components

const infoIcon = require('../../../assets/icons/info-modal-icon.png');
const errorIcon = require('../../../assets/icons/info-error-icon.png');

interface IInfoModalProps {
    navRef: React.RefObject<NavigationContainerRef>;
}

const InfoModal: React.FC<IInfoModalProps> = ({ navRef }: IInfoModalProps) => {
    const dispatch = useDispatch();

    const alertTitle = useSelector(
        (state: IApplicationState) => state.alert.title
    );
    const alertMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const isLogout = useSelector(
        (state: IApplicationState) => state.alert.logout
    );
    // const isRevalidate = useSelector(
    //     (state: IApplicationState) => state.alert.revalidate
    // );
    const alertType = useSelector(
        (state: IApplicationState) => state.alert.type
    );
    const alertAction = useSelector(
        (state: IApplicationState) => state.alert.action,
        shallowEqual
    );

    const invertedOptions = useSelector(
        (state: IApplicationState) => state.alert.invertedOptions,
        shallowEqual
    );
    if (!alertMessage) {
        return null;
    }
    return (
        <Modal
            isVisible={!!alertMessage}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
        >
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image
                        style={[styles.icon]}
                        source={alertType === 'error' ? errorIcon : infoIcon}
                        resizeMode="contain"
                    />
                </View>

                <Text allowFontScaling={false} style={styles.title}>
                    {alertTitle}
                </Text>

                <Text allowFontScaling={false} style={styles.text}>
                    {alertMessage}
                </Text>

                <TouchableOpacity
                    style={invertedOptions ? styles.backButton : styles.button}
                    activeOpacity={0.6}
                    onPress={() => {
                        dispatch(clearAlertStateAction());
                        if (alertAction) {
                            if (
                                alertAction.mainLabel.match(
                                    /Completar conta/g
                                ) &&
                                alertType === 'error'
                            ) {
                                navRef?.current?.dispatch(
                                    StackActions.popToTop()
                                );
                            } else {
                                setTimeout(() => {
                                    alertAction.onPress();
                                }, 1000);
                            }
                        } else if (
                            navRef?.current?.getCurrentRoute()?.name ===
                                'TransactionPassword' &&
                            !alertMessage.match(/Senha de transação incorreta/g)
                        ) {
                            navRef?.current?.dispatch(StackActions.popToTop());
                        }
                        // if (isRevalidate) {
                        //     setTimeout(() => {
                        //         dispatch(revalidateUserAction());
                        //     }, 1000);
                        // }
                        if (isLogout) {
                            setTimeout(() => {
                                dispatch(removeTokenAction());
                            }, 1000);
                        }
                    }}
                >
                    <Text
                        style={
                            invertedOptions
                                ? styles.backButtonText
                                : styles.buttonText
                        }
                    >
                        {alertAction ? alertAction.mainLabel : 'Ok'}
                    </Text>
                </TouchableOpacity>

                {alertAction && alertAction.secondLabel && (
                    <TouchableOpacity
                        style={
                            invertedOptions ? styles.button : styles.backButton
                        }
                        activeOpacity={0.6}
                        onPress={() => {
                            dispatch(clearAlertStateAction());
                            if (alertAction.secondOnPress) {
                                setTimeout(() => {
                                    alertAction.secondOnPress!();
                                }, 1000);
                            }
                        }}
                    >
                        <Text
                            style={
                                invertedOptions
                                    ? styles.buttonText
                                    : styles.backButtonText
                            }
                        >
                            {alertAction.secondLabel}
                        </Text>
                    </TouchableOpacity>
                )}
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
        shadowRadius: 10,
        paddingHorizontal: 40,
        paddingVertical: 25
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },
    icon: {
        width: '45%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: colors.text.third,
        fontWeight: '700',
        lineHeight: 20
    },
    text: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.text.fifth,
        fontWeight: '400',
        lineHeight: 17,
        marginTop: 19,
        marginBottom: 34
    },
    button: {
        borderRadius: 28,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.blue.second,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second
    },
    backButton: {
        borderRadius: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    backButtonText: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Roboto-Medium',
        color: colors.gray.second
    }
});

export default InfoModal;
