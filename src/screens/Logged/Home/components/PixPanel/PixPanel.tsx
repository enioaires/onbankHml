/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { MyKeysReponse } from '../../../PixPanel/MyKeys/MyKeys.types';
import { useFetch } from '../../../../../utils/useFetch';
import { Container } from './PixPanel.styles';

const pixPanel = require('../../../../../../assets/icons/pix-panel.png');

const unavailableStatus = ['CANCEL_PORTABILITY_REQUEST', 'PENDING_DELETION'];
const PixPanel = () => {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const {
        data: registeredKeys,
        doFetch: getKeys,
        isFetching: loadingKeys
    } = useFetch<MyKeysReponse>('/pix/alias', 'get', {
        defaultValue: { aliases: [] }
    });

    useEffect(() => {
        getKeys();
    }, [isFocused]);

    const handlePress = () => {
        const acitiveKeys = registeredKeys.aliases.filter(
            (key) => !unavailableStatus.includes(key.status)
        );
        if (acitiveKeys.length <= 0) {
            return navigation.navigate('PixPanel', {
                screen: 'Panel',
                params: {
                    screen: 'RegisterKey'
                }
            });
        }
        const hasOnlyKeysWithRequestPortability = acitiveKeys.every(
            (key) =>
                key.status === 'AWAITING_RETURN_PSP_DONOR' ||
                key.status === 'PENDING_PORTABILITY_CONFIRMATION'
        );
        if (hasOnlyKeysWithRequestPortability) {
            return navigation.navigate('PixPanel', {
                screen: 'Panel',
                params: { screen: 'MyKeys' }
            });
        }
        navigation.navigate('PixPanel', {
            screen: 'Panel'
        });
    };
    if (loadingKeys) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }
    return (
        <Container onPress={handlePress}>
            <Image style={{ marginLeft: -10 }} source={pixPanel} />
        </Container>
    );
};

export default PixPanel;
