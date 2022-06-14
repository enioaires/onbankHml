import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    View,
    Animated,
    Image
} from 'react-native';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { IApplicationState } from '../../../../../../store/types';
import ModalAlert from '../../../../../../components/ModalAlert/ModalAlert';
import { useFetch } from '../../../../../../utils/useFetch';
import DeleteKeyModal from '../DeleteKeyModal/DeleteKeyModal';
import {
    Action,
    ActionName,
    KeyType,
    KeyValue,
    DeleteButton,
    DeleteButtonText,
    DetailsContainer
} from './ModalDetails.styles';
import { ModalDetailsProps } from './ModalDetails.types';

import { formatKey, keyLabel } from '../../MyKeys.data';
import { onGetUserData } from '../../../../../../store/ducks/userData/actions';

const shareNew = require('../../../../../../../assets/icons/new_icons/share.png');
const qrCodeFill = require('../../../../../../../assets/icons/new_icons/qrcode.png');
const arrowCarrotRight = require('../../../../../../../assets/icons/forward.png');
const deleteBin = require('../../../../../../../assets/icons/delete-bin.png');

const ModalDetails = (props: ModalDetailsProps) => {
    const { isOpen, onClose, selectedKey, onDeleteKey } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const detailsHeight = useRef(new Animated.Value(0)).current;
    const deteleKeyOpacity = useRef(new Animated.Value(0)).current;
    const [toggleModalAlert, setToggleModalAlert] = useState(false);

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );

    useEffect(() => {
        if (isOpen) {
            return Animated.sequence([
                Animated.timing(detailsHeight, {
                    toValue: 300,
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

    const { doFetch: deleteKey, isFetching: loadingDelete } = useFetch(
        '',
        'del',
        {
            onError: () => {
                setShowDeleteModal(!showDeleteModal);
            },
            onSuccess: () => {
                setShowDeleteModal(!showDeleteModal);
                setToggleModalAlert(true);
                dispatch(onGetUserData());
            }
        }
    );
    const handleShareKey = (keyValue: string) => async () => {
        const options = {
            title: 'ChavePix',
            message: keyValue
        };
        await Share.open(options);
    };

    const handleToggleModalAlert = () => {
        onDeleteKey();
        onClose();
        setToggleModalAlert(!toggleModalAlert);
    };

    const handleToggleDeleteKeyModal = () =>
        setShowDeleteModal(!showDeleteModal);

    const handleDeleteKey = () => {
        const formattedKey =
            selectedKey?.type === 'PHONE'
                ? `+55${selectedKey?.name}`
                : selectedKey?.name;
        deleteKey({}, `/pix/alias/${formattedKey}`);
    };
    const handleGenerateQrCode = () => {
        onClose();
        navigation.navigate('Receive', {
            screen: 'Receive',
            params: { selectedKey }
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
            {selectedKey && !showDeleteModal && (
                <DetailsContainer
                    style={{
                        height: detailsHeight
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <KeyType>
                            {keyLabel[selectedKey.type] || 'Chave'}
                        </KeyType>
                        <KeyValue>
                            {formatKey(selectedKey.name, selectedKey.type)}
                        </KeyValue>
                    </View>
                    <View style={{ marginTop: 10, flex: 1 }}>
                        <Action onPress={handleShareKey(selectedKey.name)}>
                            <Image
                                source={shareNew}
                                style={{ width: 24, height: 24 }}
                            />
                            <ActionName>Compartilhar chave</ActionName>
                            <Image
                                style={{ width: 12, height: 19 }}
                                source={arrowCarrotRight}
                            />
                        </Action>
                        <Action noBoder onPress={handleGenerateQrCode}>
                            <Image
                                source={qrCodeFill}
                                style={{ width: 24, height: 24 }}
                            />

                            <ActionName>Gerar QR Code</ActionName>
                            <Image
                                style={{ width: 12, height: 19 }}
                                source={arrowCarrotRight}
                            />
                        </Action>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Animated.View
                            style={{
                                opacity: deteleKeyOpacity
                            }}
                        >
                            <DeleteButton onPress={handleToggleDeleteKeyModal}>
                                <Image source={deleteBin} />
                                <DeleteButtonText>
                                    Deletar chave Pix
                                </DeleteButtonText>
                            </DeleteButton>
                        </Animated.View>
                    </View>
                </DetailsContainer>
            )}
            {showDeleteModal && (
                <DeleteKeyModal
                    selectedKey={selectedKey}
                    isOpen={showDeleteModal}
                    onClose={handleToggleDeleteKeyModal}
                    onConfirm={handleDeleteKey}
                    disableButton={loadingDelete}
                />
            )}

            <ModalAlert
                isOpen={toggleModalAlert}
                onClose={handleToggleModalAlert}
                title="Chave excluída com sucesso"
                description=""
                buttonText="Ok"
                buttonAction={handleToggleModalAlert}
            />
        </Modal>
    );
};

export default ModalDetails;
