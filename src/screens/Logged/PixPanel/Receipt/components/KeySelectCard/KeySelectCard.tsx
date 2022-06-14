import React from 'react';
import { formatKey } from './KeyFormat';
import {
    Container,
    RadioContainer,
    LabelContainer,
    LabelTitle,
    LabelDescription,
    RadioSelected
} from './KeySelectCard.styles';
import { KeySelectCardProps } from './KeySelectCardProps.types';

const keyLabelByTypes: { [key: string]: string } = {
    TAX_ID: 'CNPJ/CPF',
    EMAIL: 'Email',
    PHONE: 'Celular',
    EVP: 'Chave aleatória'
};
const KeySelectCard = (props: KeySelectCardProps) => {
    const { keyType, keyValue, isSelected, onSelect } = props;
    console.log(props);
    return (
        <Container onPress={onSelect} isChecked={isSelected}>
            <RadioContainer>
                {isSelected && (
                    <RadioSelected style={{ transform: [{ scale: 1 }] }} />
                )}
            </RadioContainer>
            <LabelContainer>
                <LabelTitle>{keyLabelByTypes[keyType] || keyType}</LabelTitle>
                <LabelDescription>
                    {formatKey(keyValue.toLowerCase(), keyType)}
                </LabelDescription>
            </LabelContainer>
        </Container>
    );
};

export default KeySelectCard;
