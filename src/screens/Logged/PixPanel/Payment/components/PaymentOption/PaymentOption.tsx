import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { Container, Title, ContentContainer } from './PaymentOption.styles';
import { PaymentOptionProps } from './PaymentOption.types';

const forward = require('../../../../../../../assets/icons/forward.png');

const PaymentOption = (props: PaymentOptionProps) => {
    const { option } = props;
    const navigation = useNavigation();
    const handlePressOption = () => {
        navigation.navigate(option.screen);
    };
    return (
        <Container onPress={handlePressOption}>
            <ContentContainer>
                <Image
                    source={option.icon}
                    style={option.size ? option.size : {}}
                />
                <Title>{option.name}</Title>
            </ContentContainer>
            <Image style={{ width: 12, height: 19 }} source={forward} />
        </Container>
    );
};

export default PaymentOption;
