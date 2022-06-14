import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './PixKeyOption.styles';
import { PixKeyOptionProps } from './PixKeyOption.types';

const forward = require('../../../../../../../../assets/icons/forward.png');

const PixKeyOption = (props: PixKeyOptionProps) => {
    const { option, onPressOption } = props;
    const handlePress = () => {
        onPressOption(option);
    };
    return (
        <Container onPress={handlePress}>
            <Image
                source={option.icon}
                style={option.size ? option.size : {}}
            />
            <Title>{option.name}</Title>
            <Image style={{ width: 12, height: 19 }} source={forward} />
        </Container>
    );
};

export default PixKeyOption;
