import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import OptionButton from '../../../../components/OptionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { getConditionBilletsAction } from '../../../../store/ducks/depositBillets/actions';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Navigation Type
import { DepositStackNavigationProps } from '../../../../routes/Logged/types';

// Utils
import { RESTRICTED_ID_PIX } from '../../../../utils/variables';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

const OptionScreen: React.FC<DepositStackNavigationProps<'Option'>> = ({
    navigation
}: DepositStackNavigationProps<'Option'>) => {
    const dispatch = useDispatch();

    const isClientBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );
    const isBlockRegisterKeyPix = useSelector(
        (state: IApplicationState) =>
            state.user.data.client.isBlockRegisterKeyPix
    );
    const hasPixKeyActive = useSelector(
        (state: IApplicationState) => state.user.data.client.hasPixKeyActive
    );
    const clientAccountId = useSelector(
        (state: IApplicationState) => state.user.data.account.accountId
    );

    const handleOnPressDeposit = () => {
        dispatch(getConditionBilletsAction(navigation));
        /* navigation.push('Deposit', {
            screen: 'Value',
            params: { method: 'billet' }
        }); */
    };

    const handleOnPressPixDeposit = () => {
        if (!hasPixKeyActive && !isBlockRegisterKeyPix) {
            return navigation.navigate('PixPanel', {
                screen: 'Panel',
                // @ts-ignore
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
        return navigation.push('PixPanel', { screen: 'Receive' });

        // TODO old pix receive flux
        // navigation.push('Receive', {
        //     screen: 'Value'
        // });
    };

    // const onTransfer = () => {
    //     navigation.push('Deposit', { screen: 'TedOption' });
    // };

    return (
        <View style={[styles.container]}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    {clientAccountId !== RESTRICTED_ID_PIX && (
                        <OptionButton
                            disabled={!hasPixKeyActive && isBlockRegisterKeyPix}
                            title="Pix"
                            description="Gere um QR Code ou link Copia e Cola para adicionar saldo à sua conta Onbank"
                            onPress={handleOnPressPixDeposit}
                            style={{ marginBottom: 15 }}
                            containerStyle={{ paddingBottom: 15 }}
                            icon={require('../../../../../assets/icons/new_icons/pix.png')}
                            iconStyles={{ marginBottom: 8 }}
                        />
                    )}
                    <OptionButton
                        title="Boleto"
                        description="Creditado em até 2 dias úteis"
                        onPress={handleOnPressDeposit}
                        style={{ marginBottom: 15 }}
                        containerStyle={{ paddingBottom: 15 }}
                        icon={require('../../../../../assets/icons/new_icons/bar-code.png')}
                    />
                    {/* <OptionButton
                        title="Transferência"
                        description="Transfira de sua conta de outro banco para a Onbank"
                        onPress={onTransfer}
                        containerStyle={{ paddingBottom: 15 }}
                    /> */}
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() =>
                        navigation.push('Deposit', { screen: 'History' })
                    }
                >
                    <Text allowFontScaling={false} style={styles.bottomText}>
                        Histórico de Depósitos
                    </Text>
                    <Image
                        source={require('../../../../../assets/icons/forward.png')}
                        resizeMode="contain"
                        style={{
                            width: 10,
                            height: 10
                        }}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottomText: {
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second,
        fontSize: 17,
        marginRight: 7
    }
});

export default OptionScreen;
