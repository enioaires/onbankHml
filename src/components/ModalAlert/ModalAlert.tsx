/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Modal, Image, Animated, Dimensions } from 'react-native';
import {
    AlertBody,
    AlertConatainer,
    AlertFooter,
    ButtonAction,
    ButtonText,
    Container,
    Description,
    Title
} from './ModalAlert.styles';
import { ModalAlertProps } from './ModalAlert.types';

const checkCircle = require('../../../assets/icons/check-circle.png');

const { height } = Dimensions.get('window');

const ModalAlert = (props: ModalAlertProps) => {
    const { isOpen, onClose, title, description, buttonText, buttonAction } =
        props;
    const handlePressButton = () => {
        if (buttonAction) {
            buttonAction();
        }
        onClose();
    };

    const modalAlertHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isOpen) {
            return Animated.sequence([
                Animated.timing(modalAlertHeight, {
                    toValue: height * 0.37,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start();
        }
        Animated.timing(modalAlertHeight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [isOpen]);

    return (
        <Modal visible={isOpen} transparent onRequestClose={onClose}>
            <Container>
                <AlertConatainer style={{ bottom: modalAlertHeight }}>
                    <AlertBody>
                        <Image source={checkCircle} />
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                    </AlertBody>
                    <AlertFooter>
                        <ButtonAction onPress={handlePressButton}>
                            <ButtonText>{buttonText}</ButtonText>
                        </ButtonAction>
                    </AlertFooter>
                </AlertConatainer>
            </Container>
        </Modal>
    );
};

export default ModalAlert;
