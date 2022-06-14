import React, { useEffect } from 'react';
import { Image, Platform, StatusBar, View } from 'react-native';
import LinearButton from '../../../../../components/LinearGradientButton/LinearGradientButton';
import { useFetch } from '../../../../../utils/useFetch';

import {
    Container,
    Information,
    Description
} from './RequestPortability.styles';
import { RequestPortabilityProps } from './RequestPortability.types';

const requestPortabilityIcon = require('../../../../../../assets/icons/request-portability.png');

const RequestPortability = (props: RequestPortabilityProps) => {
    const { navigation, route } = props;
    const { params } = route;

    const { doFetch: requestPortability, isFetching } = useFetch(
        'pix/portability/claim',
        'post',
        {
            onSuccess: (res) => {
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'MyKeys' },
                        { name: 'RequestPortabilitySuccess' }
                    ]
                });
            }
        }
    );

    const handleRequestPortability = () => {
        requestPortability({ confirm: true, alias: params?.pixKey });
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
                <Image source={requestPortabilityIcon} />

                <Information>
                    A chave solicitada já esta {`\n`} cadastrada em outra
                    instituição
                </Information>
                <Description>
                    Ao cadastrar sua chave, você está ciente e concorda que ao
                    receber uma transação, a pessoa que fez a operação terá
                    acesso parcial ao seu dado compartilhado na chave.
                </Description>
            </View>
            <View>
                <LinearButton
                    loading={isFetching}
                    onPress={handleRequestPortability}
                    title="SOLICITAR PORTABILIDADE"
                />
            </View>
        </Container>
    );
};

export default RequestPortability;
