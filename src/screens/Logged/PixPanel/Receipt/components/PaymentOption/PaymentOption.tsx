import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './PaymentOption.styles';
import { PaymentOptionProps } from './PaymentOption.types';

const arrowCarrotRight = require('../../../../../../../assets/icons/arrow-carrot-right.png');

const PaymentOption = (props: PaymentOptionProps) => {
    const { option } = props;
    const navigation = useNavigation();
    const handlePressOption = () => {
        navigation.navigate(option.screen);
    };
    return (
        <Container onPress={handlePressOption}>
            <Image source={option.icon} />
            <Title>{option.name}</Title>
            <Image source={arrowCarrotRight} />
        </Container>
    );
};

export default PaymentOption;
