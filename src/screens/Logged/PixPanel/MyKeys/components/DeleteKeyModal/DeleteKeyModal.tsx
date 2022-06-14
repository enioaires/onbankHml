/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, TouchableWithoutFeedback, View } from 'react-native';
import CardPixKey from '../CardPixKey/CardPixKey';
import {
    DeleteContainer,
    TextHeading,
    ButtonsContainer,
    ActionButton,
    ActionButtonText
} from './DeleteKeyModal.styles';
import { DeleteKeyModalProps } from './DeleteKeyModal.types';

// import { Container } from './styles';

const DeleteKeyModal = (props: DeleteKeyModalProps) => {
    const { isOpen, onClose, selectedKey, onConfirm, disableButton } = props;
    const deleteContainerHeight = useRef(new Animated.Value(0)).current;
    const deteleKeyOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isOpen) {
            return Animated.sequence([
                Animated.timing(deleteContainerHeight, {
                    toValue: 250,
                    duration: 500,
                    useNativeDriver: false
                }),
                Animated.timing(deteleKeyOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false
                })
            ]).start();
        }
        Animated.timing(deleteContainerHeight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(deteleKeyOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [isOpen]);

    return (
        <Modal visible={isOpen} transparent>
            <TouchableWithoutFeedback
                onPress={onClose}
                disabled={disableButton}
            >
                <View
                    style={{
                        backgroundColor: '#04040F66',
                        flex: 1,
                        opacity: 0.8
                    }}
                />
            </TouchableWithoutFeedback>
            <DeleteContainer style={{ height: deleteContainerHeight }}>
                <TextHeading>
                    Tem certeza que deseja excluir essa chave?
                </TextHeading>
                <View style={{ flex: 1 }}>
                    {selectedKey && (
                        <CardPixKey
                            isReadOnly
                            onPress={() => {}}
                            keyDeatail={selectedKey}
                        />
                    )}
                </View>
                <ButtonsContainer style={{ opacity: deteleKeyOpacity }}>
                    <ActionButton disabled={disableButton} onPress={onClose}>
                        <ActionButtonText>Não</ActionButtonText>
                    </ActionButton>
                    <ActionButton
                        disabled={disableButton}
                        isDelete
                        onPress={onConfirm}
                    >
                        <ActionButtonText>Excluir</ActionButtonText>
                    </ActionButton>
                </ButtonsContainer>
            </DeleteContainer>
        </Modal>
    );
};

export default DeleteKeyModal;
