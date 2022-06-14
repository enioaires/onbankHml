import React from 'react';
import { Image, Platform, StatusBar, View } from 'react-native';
import LinearButton from '../../../../../components/LinearGradientButton/LinearGradientButton';

import {
    Container,
    Information,
    Description
} from './RequestPortabilitySuccess.styles';

const requestPortabilitySuccessIcon = require('../../../../../../assets/icons/request-portability-sucess.png');

const RequestPortabilitySuccess = (props) => {
    const { navigation } = props;
    const handleNavigateToMyKeys = () => {
        navigation.reset({ routes: [{ name: 'Panel' }, { name: 'MyKeys' }] });
    };
    return (
        <Container
            style={{
                flex: 1,
                paddingLeft: 27,
                paddingRight: 23,
                paddingTop: Platform.select({
                    ios: 140,
                    android: StatusBar.currentHeight
                        ? StatusBar.currentHeight + 80
                        : 130
                }),
                paddingBottom: 50
            }}
        >
            <View
                style={{
                    marginTop: 40,
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <Image source={requestPortabilitySuccessIcon} />

                <Information>Portabilidade solicitada</Information>
                <Description>
                    A chave reivindicada será portada em até 7 dias. Acompanhe o
                    processo na tela de chaves cadastradas no seu app Onbank
                </Description>
            </View>
            <View>
                <LinearButton
                    onPress={handleNavigateToMyKeys}
                    title="ACOMPANHAR PORTABILIDADE"
                />
            </View>
        </Container>
    );
};

export default RequestPortabilitySuccess;
