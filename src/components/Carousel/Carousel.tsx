import React, { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import LinearGradientButton from '../LinearGradientButton/LinearGradientButton';

import {
    Container,
    Image,
    Title,
    Description,
    TitleBottomContainer,
    StepContainer,
    Step
} from './styles';

interface CarouselProps {
    contents: {
        image: ImageSourcePropType;
        title: string;
        description: string;
        info?: string;
    }[];
    lastButtonTitle?: string;

    onStepDone: () => void;
}

const Carousel = ({ contents, lastButtonTitle, onStepDone }: CarouselProps) => {
    const [isActive, setIsActive] = useState(0);
    const handleNextStap = () => {
        if (isActive === contents.length - 1) {
            onStepDone();
            return;
        }
        setIsActive((old) => old + 1);
    };
    return (
        <>
            <Container>
                <Image source={contents[isActive].image} />
                <Title>{contents[isActive].title}</Title>
                <Description>{contents[isActive].description}</Description>
                {contents[isActive].info && (
                    <TitleBottomContainer>
                        <Title>{contents[isActive].info}</Title>
                    </TitleBottomContainer>
                )}
            </Container>
            <LinearGradientButton
                title={
                    isActive === contents.length - 1 && lastButtonTitle
                        ? lastButtonTitle
                        : 'AVANÇAR'
                }
                onPress={handleNextStap}
            />
            <StepContainer>
                {contents.map((_, index) => (
                    <Step key={index} isActive={index === isActive} />
                ))}
            </StepContainer>
        </>
    );
};

export default Carousel;
