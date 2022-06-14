import React from 'react';
import { useSelector } from 'react-redux';

import { ActivityIndicator, Image, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalBottom from '../../../../../../components/ModalBottom/ModalBottom';
import { formatKey, keyLabel } from '../../MyKeys.data';

import {
    Title,
    KeyName,
    KeyType,
    Action,
    ActionName
} from './PotabilityDonorModal.styles';
import { useFetch } from '../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../../../store/types';

// import { Container } from './styles';
const arrowCarrot = require('../../../../../../../assets/icons/arrow-carrot-right.png');

const PotabilityDonorModal = (props) => {
    const { isOpen, onClose, selectedKey, onConfirm } = props;
    // const handle
    const { doFetch: confirmPortablity, isFetching } = useFetch(
        'pix/portability/claim/confirm',
        'post',
        {
            onSuccess: () => {
                onConfirm();
                onClose();
            }
        }
    );

    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const handleResponsePortability = (action: boolean) => () => {
        const formattedKey =
            selectedKey?.type === 'PHONE'
                ? `+55${selectedKey?.name}`
                : selectedKey?.name;
        confirmPortablity({ confirm: action, alias: formattedKey });
    };

    return (
        <ModalBottom
            modalBackgroundColor="#F8F8F8D1"
            isOpen={isOpen && !hasErrorMessage}
            onClose={onClose}
            bodyHeight={300}
        >
            <Title>Portabilidade da chave</Title>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30
                }}
            >
                <KeyName>
                    {formatKey(selectedKey.name, selectedKey.type)}
                </KeyName>
                <KeyType> {keyLabel[selectedKey.type] || 'Chave'}</KeyType>
            </View>
            <View>
                <Action
                    disabled={isFetching}
                    hasBorder
                    onPress={handleResponsePortability(true)}
                >
                    {isFetching ? (
                        <ActivityIndicator />
                    ) : (
                        <MaterialCommunityIcons
                            name="check-circle-outline"
                            size={24}
                            color="#08AA3A"
                        />
                    )}

                    <ActionName>Aceitar doação da chave</ActionName>
                    <Image source={arrowCarrot} />
                </Action>
                <Action
                    disabled={isFetching}
                    onPress={handleResponsePortability(false)}
                >
                    {isFetching ? (
                        <ActivityIndicator />
                    ) : (
                        <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={24}
                            color="#9B0000"
                        />
                    )}

                    <ActionName>Recusar doação da chave</ActionName>
                    <Image source={arrowCarrot} />
                </Action>
            </View>
        </ModalBottom>
    );
};

export default PotabilityDonorModal;
