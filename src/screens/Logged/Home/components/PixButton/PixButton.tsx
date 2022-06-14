import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, Text, Image } from 'react-native';
import colors from '../../../../../styles/colors';
import { IApplicationState } from '../../../../../store/types';
import { setAlertMessageAction } from '../../../../../store/ducks/alert/actions';

// const unavailableStatus = ['CANCEL_PORTABILITY_REQUEST', 'PENDING_DELETION'];

const PixButton = ({ action }: any) => {
    const navigation = useNavigation<any>();
    const isBlockRegisterKeyPix = useSelector(
        (state: IApplicationState) =>
            state.user.data.client.isBlockRegisterKeyPix
    );

    const hasPixKeyActive = useSelector(
        (state: IApplicationState) => state.user.data.client.hasPixKeyActive
    );

    const dispatch = useDispatch();

    const handlePress = () => {
        if (action === 'Receive') {
            if (!hasPixKeyActive && !isBlockRegisterKeyPix) {
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
            if (!hasPixKeyActive && isBlockRegisterKeyPix) {
                return dispatch(
                    setAlertMessageAction({
                        title: 'Oops',
                        message:
                            'Operação indisponível, entre em contato com o suporte',
                        type: 'error'
                    })
                );
            }
        }
        return navigation.navigate('PixPanel', {
            screen: action
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 16,
                paddingBottom: 19,
                width: action === 'Receive' ? '50%' : '33%'
            }}
            onPress={handlePress}
        >
            <Image
                source={require('../../../../../../assets/icons/new_icons/pix.png')}
                style={{
                    height: 30,
                    width: 30,
                    marginBottom: 10
                }}
                resizeMode="contain"
            />
            <Text
                allowFontScaling={false}
                style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Regular',
                    fontWeight: '400',
                    color: colors.blue.second
                }}
            >
                Pix
            </Text>
        </TouchableOpacity>
    );
};

export default PixButton;
