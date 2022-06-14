import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../../../styles/colors';
import { IApplicationState } from '../../../../../store/types';
import { USER_NAV_OPTIONS } from './BottomMenu.data';
import { Container, ItemImage, ItemText, MenuItem } from './BottomMenu.styles';
import { setAlertMessageAction } from '../../../../../store/ducks/alert/actions';
import { IUserNavOptions } from '../../../../../utils/types';
import Pix from './Pix';

const BottomMenu = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    const isClientBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );

    const isClientDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );

    const clientPromocode = useSelector(
        (state: IApplicationState) => state.user.data.client.promoCode
    );
    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    const showDemoAlert = () => {
        dispatch(
            setAlertMessageAction({
                type: 'info',
                title: 'Conta Demonstrativa',
                message:
                    'Para solicitar o seu cartão precisa completar  sua conta',
                action: {
                    mainLabel: 'Ok',
                    onPress: () => {}
                }
            })
        );
    };

    const navigateToCardMenu = () => {
        // TODO replace mock to isDemo
        if (isClientDemo) {
            showDemoAlert();
            return;
        }
        if (!cardBiz || cardBiz === 'CANCELADO') {
            navigation.push('Perfil', {
                screen: 'SignUpData',
                params: { isCardRequest: true }
            });
        } else if (cardBiz === 'ATIVADO') {
            navigation.push('General', {
                screen: 'TransactionPassword',
                params: {
                    action: () => {
                        navigation.reset({
                            index: 0,
                            routes: [
                                { name: 'General' },
                                { name: 'Card', params: { screen: 'Active' } }
                            ]
                        });
                        // navigation.popToTop();
                        // navigation.push('Card', {
                        //     screen: 'Active'
                        // });
                    }
                }
            });
        } else {
            navigation.push('Card', {
                screen: 'Traffic'
            });
        }
    };

    // eslint-disable-next-line consistent-return
    const onMenuPress = (screen: string) => () => {
        if (screen === 'Card') {
            if (isClientDemo) {
                return showDemoAlert();
            }
            navigateToCardMenu();
        } else if (screen === 'Invite' && !clientPromocode) {
            navigation.push('Invite', {
                screen: 'Promocode',
                params: {
                    type: 'generate'
                }
            });
        } else {
            navigation.push(screen as any);
        }
    };

    const renderMenuItem = ({ item }: { item: IUserNavOptions }) => {
        if (!item.screenName) {
            return null;
        }
        if (!isClientBeta && item.screenName === 'Wallet') {
            return null;
        }
        if (item.label === 'Pix') {
            return <Pix />;
        }

        return (
            <MenuItem
                activeOpacity={0.6}
                style={{
                    shadowColor: '#B1C0DC3F',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 1,
                    shadowRadius: 7,
                    elevation: 1
                }}
                onPress={onMenuPress(item.screenName)}
            >
                {item.icon && (
                    <ItemImage source={item.icon} resizeMode="contain" />
                )}
                {item.iconName && (
                    <FontAwesome
                        name={item.iconName}
                        color={colors.blue.second}
                        size={20}
                    />
                )}
                <ItemText allowFontScaling={false}>{item.label}</ItemText>
            </MenuItem>
        );
    };
    return (
        <Container>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={USER_NAV_OPTIONS}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.screenName}
                contentContainerStyle={{ paddingRight: 17 }}
            />
        </Container>
    );
};

export default BottomMenu;
