import React, { useEffect, useRef } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Modal,
    Platform,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { ModalBody } from './ModalBottom.styles';
import { ModalBottomProps } from './ModalBottom.types';

// import { Container } from './styles';

const ModalBottom = (props: ModalBottomProps) => {
    const {
        isOpen,
        onClose,
        children,
        bodyHeight,
        modalBackgroundColor,
        disabledBackdrop
    } = props;
    const modalBodyHeight = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (isOpen) {
            return Animated.sequence([
                Animated.timing(modalBodyHeight, {
                    toValue: bodyHeight,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start();
        }
        Animated.timing(modalBodyHeight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [isOpen]);

    return (
        <Modal visible={isOpen} transparent onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.select({
                    ios: 'padding',
                    android: 'height'
                })}
                style={{
                    flex: 1
                }}
            >
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback
                        disabled={disabledBackdrop}
                        onPress={onClose}
                    >
                        <View
                            style={{
                                backgroundColor: '#04040F66',
                                flex: 1,
                                opacity: 1
                            }}
                        />
                    </TouchableWithoutFeedback>

                    <ModalBody
                        style={{
                            flex: 1,
                            height: modalBodyHeight,
                            backgroundColor: modalBackgroundColor || '#f8f8f8'
                        }}
                    >
                        {children}
                    </ModalBody>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default ModalBottom;
