import { parseCurrency } from '@brazilian-utils/brazilian-utils';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import LinearGradientButton from '../../../../../../../components/LinearGradientButton/LinearGradientButton';
import ModalBottom from '../../../../../../../components/ModalBottom/ModalBottom';
import { ModalTitle } from './ModalInputValue.styles';

// import { Container } from './styles';

const ModalInputValue = ({ onConfirmValue, onClose, maxValue }) => {
    const [amount, setAmount] = useState('0');
    const [disableButton, setDisabledButton] = useState(true);

    useEffect(() => {
        const parsedAmount = parseCurrency(amount);

        if (parsedAmount > maxValue) {
            return setDisabledButton(true);
        }
        if (parsedAmount === 0) {
            return setDisabledButton(true);
        }
        if (disableButton && parsedAmount > 0) {
            setDisabledButton(false);
        }
    }, [amount]);
    const handleConfirmValue = () => {
        onConfirmValue(parseCurrency(amount));
    };

    return (
        <ModalBottom isOpen bodyHeight={280} onClose={onClose}>
            <ModalTitle>Digite um valor</ModalTitle>
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
                // placeholderTextColor={colors.text.second}
                // autoFocus
                type="money"
                checkText={(previous, next) => {
                    return next !== '0';
                }}
                options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: ''
                }}
                value={amount.toString()}
                onChangeText={(text) => setAmount(text)}
            />

            <LinearGradientButton
                // loading={isFetching}
                disabled={disableButton}
                title="CONFIRMAR"
                onPress={handleConfirmValue}
            />
        </ModalBottom>
    );
};

export default ModalInputValue;
