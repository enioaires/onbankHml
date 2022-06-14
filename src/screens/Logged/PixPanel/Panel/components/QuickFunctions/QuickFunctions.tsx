import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../../../../../store/types';
import { quickFunctions } from './QuickFunctions.data';

import {
    Container,
    Title,
    QuickFunction,
    QuickFunctionName,
    QuickFunctionsContainer
} from './QuickFunctions.styles';

const arrowCarrot = require('../../../../../../../assets/icons/forward.png');

const QuickFunctions = () => {
    const navigation = useNavigation();
    const clientIsBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );

    const isBlockRegisterKeyPix = useSelector(
        (state: IApplicationState) =>
            state.user.data.client.isBlockRegisterKeyPix
    );

    const handlePress = (screen: string) => () => {
        navigation.navigate(screen);
    };
    return (
        <Container>
            {/* TODO remove after complete pix limit flux */}
            {isBlockRegisterKeyPix && !clientIsBeta ? null : (
                <Title>Consultar</Title>
            )}
            <QuickFunctionsContainer>
                {quickFunctions.map((quickFunction) => {
                    if (
                        quickFunction.screen === 'RegisterKey' &&
                        isBlockRegisterKeyPix
                    ) {
                        return null;
                    }
                    if (
                        quickFunction.screen === 'MyKeys' &&
                        isBlockRegisterKeyPix
                    ) {
                        return null;
                    }
                    if (quickFunction.name === 'Limites' && !clientIsBeta) {
                        return null;
                    }
                    return (
                        <QuickFunction
                            key={quickFunction.name}
                            onPress={handlePress(quickFunction.screen)}
                        >
                            <Image
                                source={quickFunction.icon}
                                style={{ width: 20, height: 20 }}
                            />
                            <QuickFunctionName>
                                {quickFunction.name}
                            </QuickFunctionName>
                            <Image
                                source={arrowCarrot}
                                style={{ width: 11, height: 17 }}
                            />
                        </QuickFunction>
                    );
                })}
            </QuickFunctionsContainer>
        </Container>
    );
};

export default QuickFunctions;
