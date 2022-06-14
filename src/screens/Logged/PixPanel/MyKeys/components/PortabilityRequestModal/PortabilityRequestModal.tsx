/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Modal,
    TouchableWithoutFeedback,
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFetch } from '../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../../../store/types';
import { formatKey, keyLabel } from '../../MyKeys.data';
import { PortabilityRequestModalProps } from './PortabilityRequest.types';
import {
    DetailsContainer,
    Title,
    KeyValue,
    KeyType,
    Status,
    CancelRequest
} from './PortabilityRequestModal.styles';

// import { Container } from './styles';

const closeCircleIcon = require('../../../../../../../assets/icons/md-close-circle-outline.png');

const PortabilityRequestModal = (props: PortabilityRequestModalProps) => {
    const { isOpen, onClose, selectedKey, onCancelRequest } = props;
    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const detailsHeight = useRef(new Animated.Value(0)).current;
    const deteleKeyOpacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (isOpen) {
            return Animated.sequence([
                Animated.timing(detailsHeight, {
                    toValue: 270,
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
        Animated.timing(detailsHeight, {
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

    const { doFetch: cancelRequest, isFetching } = useFetch(
        '/pix/portability/claim/cancel',
        'post',
        {
            onSuccess: () => {
                onCancelRequest();
            }
        }
    );

    const handleCancelRequest = () => {
        const formattedKey =
            selectedKey?.type === 'PHONE'
                ? `+55${selectedKey?.name}`
                : selectedKey?.name;
        cancelRequest({
            confirm: true,
            alias: formattedKey
        });
    };

    return (
        <Modal
            visible={isOpen && !hasErrorMessage}
            transparent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View
                    style={{
                        backgroundColor: '#04040F66',
                        flex: 1,
                        opacity: 0.8
                    }}
                />
            </TouchableWithoutFeedback>
            {selectedKey && (
                <DetailsContainer
                    style={{
                        height: detailsHeight
                    }}
                >
                    <Title>Portabilidade enviada</Title>
                    <View
                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: '#FFFFFF',
                            paddingBottom: 18,
                            marginTop: 32,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <View>
                            <KeyValue>
                                {formatKey(selectedKey.name, selectedKey.type)}
                            </KeyValue>
                            <KeyType>
                                {keyLabel[selectedKey.type] || selectedKey.type}
                            </KeyType>
                        </View>
                        <View>
                            <Text
                                style={{
                                    marginBottom: 4,
                                    color: '#707070',
                                    fontFamily: 'Roboto-Regular',
                                    textAlign: 'right'
                                }}
                            >
                                Status
                            </Text>
                            <Status>Aguardando confirmação</Status>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleCancelRequest}
                        disabled={isFetching}
                        style={{
                            flexDirection: 'row',
                            marginTop: 18,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {isFetching ? (
                            <ActivityIndicator />
                        ) : (
                            <>
                                <Image source={closeCircleIcon} />
                                <CancelRequest>
                                    Cancelar solicitação
                                </CancelRequest>
                            </>
                        )}
                    </TouchableOpacity>
                </DetailsContainer>
            )}
            {/* <ModalAlert
            isOpen={toggleModalAlert}
            onClose={handleToggleModalAlert}
            title="Chave excluída com sucesso"
            description=""
            buttonText="Ok"
            buttonAction={handleToggleModalAlert}
        /> */}
        </Modal>
    );
};

export default PortabilityRequestModal;
