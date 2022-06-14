import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './OptionCard.styles';

const arrowCarrot = require('../../../../../../../assets/icons/arrow-carrot-right.png');

const OptionCard = ({ name, type, icon, onPress }) => {
    const handlePress = () => {
        onPress(type);
    };
    return (
        <Container onPress={handlePress}>
            <Image
                width={25}
                height={25}
                style={{ width: 25, height: 25 }}
                source={icon}
            />
            <Title>{name}</Title>
            <Image source={arrowCarrot} />
        </Container>
    );
};

export default OptionCard;
