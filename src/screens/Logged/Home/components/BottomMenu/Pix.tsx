import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { MyKeysReponse } from '../../../../../screens/Logged/PixPanel/MyKeys/MyKeys.types';
import { useFetch } from '../../../../../utils/useFetch';
import { ItemImage, ItemText, MenuItem } from './BottomMenu.styles';
import { IApplicationState } from '../../../../../store/types';

// import { Container } from './styles';

const pixIcon = require('../../../../../../assets/icons/new_icons/pix.png');

const unavailableStatus = ['CANCEL_PORTABILITY_REQUEST', 'PENDING_DELETION'];

const BottomMenu = () => {
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const isBlockRegisterKeyPix = useSelector(
        (state: IApplicationState) =>
            state.user.data.client.isBlockRegisterKeyPix
    );
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
        if (acitiveKeys.length <= 0 && !isBlockRegisterKeyPix) {
            return navigation.navigate('PixPanel', {
                screen: 'Panel',
                params: {
                    screen: 'RegisterKey',
                    params: {
                        fromHome: true
                    }
                }
            });
        }
        if (acitiveKeys.length <= 0 && isBlockRegisterKeyPix) {
            return navigation.navigate('PixPanel', {
                screen: 'Panel'
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
            <MenuItem
                style={{
                    margin: 0,
                    paddingLeft: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator />
            </MenuItem>
        );
    }

    return (
        <MenuItem
            activeOpacity={0.6}
            disabled={loadingKeys}
            style={{
                shadowColor: '#B1C0DC3F',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 7,
                elevation: 1
            }}
            onPress={handlePress}
        >
            <ItemImage
                width={40}
                height={40}
                source={pixIcon}
                resizeMode="contain"
            />

            <ItemText allowFontScaling={false}>Pix</ItemText>
        </MenuItem>
    );
};

export default BottomMenu;
