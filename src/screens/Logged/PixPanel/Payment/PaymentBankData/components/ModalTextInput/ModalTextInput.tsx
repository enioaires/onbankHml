/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Keyboard, View, Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../../../../../../store/types';
import LinearGradientButton from '../../../../../../../components/LinearGradientButton/LinearGradientButton';
import ModalBottom from '../../../../../../../components/ModalBottom/ModalBottom';
import colors from '../../../../../../../styles/colors';
import {
    Container,
    InputValue,
    ModalTitle,
    Title,
    TextInput
} from './ModalTextInput.styes';

const editIcon = require('../../../../../../../../assets/icons/new_icons/edit.png');

interface ModalTextInputProps {
    title: string;
    inputLabel: string;
    onSelect: (value: string) => void;
    isDocument?: boolean;
    maxLength?: number;
}
const ModalTextInput = (props: ModalTextInputProps) => {
    const { title, inputLabel, onSelect, isDocument, maxLength } = props;
    const [inputValue, setInputValue] = useState('');
    const [text, setText] = useState('');
    const [toggleModal, setToggleModal] = useState(false);

    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const handleToggleModal = () => {
        setText('');
        setToggleModal(!toggleModal);
    };
    const handleNextStep = () => {
        Keyboard.dismiss();
        setToggleModal(!toggleModal);
        onSelect(text);

        setInputValue(text);
    };

    const disabledButton = () => {
        const formattedValue = text.replace(/\D/g, '');
        if (isDocument) {
            return formattedValue.length <= 11
                ? !isValidCPF(formattedValue)
                : !isValidCNPJ(formattedValue);
        }
        return !text;
    };

    return (
        <>
            <Container onPress={handleToggleModal}>
                <Title>{title}</Title>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {!!inputValue && <InputValue>{inputValue}</InputValue>}
                    <Image
                        source={editIcon}
                        style={{ width: 20, height: 20 }}
                    />
                </View>
            </Container>

            <ModalBottom
                onClose={handleToggleModal}
                isOpen={toggleModal && !hasErrorMessage}
                bodyHeight={270}
            >
                <ModalTitle>{inputLabel}</ModalTitle>
                {isDocument ? (
                    <TextInputMask
                        autoFocus
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: '#7C7C7C',
                            fontSize: 30,
                            color: '#707070',
                            fontFamily: 'Roboto-Light',
                            marginVertical: 30
                        }}
                        type="custom"
                        keyboardType="number-pad"
                        options={{
                            mask:
                                text.replace(/\D/g, '').length > 11
                                    ? '99.999.999/9999-99'
                                    : '999.999.999-999'
                        }}
                        value={text}
                        onChangeText={(text) => {
                            setText(text);
                        }}
                    />
                ) : (
                    <TextInput
                        maxLength={maxLength}
                        autoFocus
                        value={text}
                        onChangeText={setText}
                        keyboardType="numeric"
                    />
                )}

                <LinearGradientButton
                    disabled={disabledButton()}
                    onPress={handleNextStep}
                    title="AVANÇAR"
                />
            </ModalBottom>
        </>
    );
};

export default ModalTextInput;
