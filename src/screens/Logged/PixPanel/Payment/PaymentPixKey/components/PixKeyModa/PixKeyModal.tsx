import React, { useState } from 'react';
import {
    isValidCNPJ,
    isValidCPF,
    isValidEmail,
    isValidPhone
} from '@brazilian-utils/brazilian-utils';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import ModalBottom from '../../../../../../../components/ModalBottom/ModalBottom';
import { TextInput, Title } from './PixKeyModal.styles';
import LinearGradientButton from '../../../../../../../components/LinearGradientButton/LinearGradientButton';
import { PixKeyModalProps } from './PixKeyModal.types';
import { useFetch } from '../../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../../../../store/types';

const modalTitle: { [key: string]: string } = {
    TAX_ID: 'Digite o CPF / CNPJ',
    EMAIL: 'Digite o E-mail',
    PHONE: 'Digite o Telefone',
    EVP: 'Digite a chave aleatória'
};

const maskbyKeytypes: { [key: string]: string } = {
    TAX_ID: 'custom',
    PHONE: 'cel-phone'
};

const inputsWithMask = ['TAX_ID', 'PHONE'];
const PixKeyModal = (props: PixKeyModalProps) => {
    const { isOpen, onClose, option } = props;
    const [value, setValue] = useState(''); // TODO REMOVE MOCK
    const [showInput, setToggleInput] = useState(isOpen);
    const navigation = useNavigation();
    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const handleToggleModal = () => {
        setToggleInput(!showInput);
        onClose();
    };
    const { doFetch: getPixKeyDetails, isFetching } = useFetch('', 'get', {
        onSuccess: (data) => {
            onClose();
            setToggleInput(false);
            console.log(data);
            const isCnpjOrCPF = data.aliasType === 'TAX_ID';
            const aliasType =
                isCnpjOrCPF && data.alias.length <= 11 ? 'CPF' : 'CNPJ';
            const receiverDetails = {
                alias: data.alias,
                aliasType: isCnpjOrCPF ? aliasType : data.aliasType,
                name: data.aliasAccountHolder?.name,
                taxIdMasked: data.aliasAccountHolder.taxIdentifier.taxIdMasked,
                documentType:
                    data.aliasAccountHolder.taxIdentifier.taxId.length <= 11
                        ? 'CPF'
                        : 'CNPJ'
            };
            navigation.navigate('PaymentAmount', { receiverDetails });
        }
    });
    const disabledButton = () => {
        const formattedValue = value.replace(/\D/g, '');
        console.log(isValidEmail(value), 'EMAIL');
        if (option === 'TAX_ID') {
            console.log(isValidCPF(formattedValue));
            return formattedValue.length <= 11
                ? !isValidCPF(formattedValue)
                : !isValidCNPJ(formattedValue);
        }
        if (option === 'PHONE') {
            return !isValidPhone(formattedValue);
        }
        if (option === 'EMAIL') {
            return !isValidEmail(value);
        }
        return false;
    };

    const handlePressNext = () => {
        let formattedKey = inputsWithMask.includes(option)
            ? value.replace(/\D/g, '')
            : value;
        formattedKey = option === 'PHONE' ? `+55${formattedKey}` : formattedKey;
        Keyboard.dismiss();
        getPixKeyDetails({}, `pix/alias/BRA/${formattedKey}`);
    };

    return (
        <ModalBottom
            disabledBackdrop={isFetching}
            modalBackgroundColor="#F8F8F8"
            isOpen={showInput && !hasErrorMessage}
            onClose={handleToggleModal}
            bodyHeight={280}
        >
            <Title>{modalTitle[option]}</Title>

            {inputsWithMask.includes(option) ? (
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
                    // @ts-ignore
                    type={maskbyKeytypes[option]}
                    keyboardType={
                        inputsWithMask.includes(option)
                            ? 'number-pad'
                            : 'default'
                    }
                    options={
                        option === 'TAX_ID'
                            ? {
                                  mask:
                                      value.replace(/\D/g, '').length > 11
                                          ? '99.999.999/9999-99'
                                          : '999.999.999-999'
                              }
                            : undefined
                    }
                    value={value}
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                />
            ) : (
                <TextInput
                    keyboardType={
                        option === 'EMAIL' ? 'email-address' : 'default'
                    }
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setValue}
                />
            )}

            <LinearGradientButton
                loading={isFetching}
                disabled={disabledButton()}
                title="AVANÇAR"
                onPress={handlePressNext}
            />
        </ModalBottom>
    );
};

export default PixKeyModal;
