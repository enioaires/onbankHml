import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import OptionButton from '../../../../components/OptionButton';
import AddTransactionPasswordModal from '../../../../containers/AddTransactionPasswordModal';

// Store
import { IApplicationState } from '../../../../store/types';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

// Utils
import { RESTRICTED_ID_PIX } from '../../../../utils/variables';

const OptionScreen: React.FC<PaymentsStackNavigationProps<'Option'>> = ({
    navigation
}: PaymentsStackNavigationProps<'Option'>) => {
    const hasKeys = useSelector(
        (state: IApplicationState) => state.user.data.client.hasKeys
    );
    const isClientBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );
    const clientAccountId = useSelector(
        (state: IApplicationState) => state.user.data.account.accountId
    );
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal((oldState: boolean) => !oldState);
    };

    const onPress = (option: 'qrcode' | 'billet' | 'pixPayment') => {
        if (hasKeys) {
            if (option === 'billet') {
                navigation.push('Payments', { screen: 'Camera' });
            } else if (option === 'pixPayment') {
                navigation.push('PixPayment', { screen: 'Amount' });
            } else {
                navigation.push('Payments', { screen: 'QRCodeScan' });
            }
        } else {
            toggleModal();
        }
    };

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <OptionButton
                            title="Pagar um boleto ou uma conta"
                            description="Pague conta de luz, telefone, etc"
                            onPress={() => onPress('billet')}
                            style={{ marginBottom: 15 }}
                            containerStyle={{ paddingBottom: 15 }}
                        />
                        {/* <OptionButton
                            title="Pagar via QR Code"
                            description="Utilize para pagamento presencial entre clientes Onbank"
                            onPress={() => onPress('qrcode')}
                            containerStyle={{
                                paddingBottom: 15,
                                paddingRight: '28%'
                            }}
                        /> */}
                        {/* {(clientAccountId !== RESTRICTED_ID_PIX) &&
                            <OptionButton
                                title="Pagar via Pix"
                                description="Pague utilizando uma chave pix"
                                onPress={() => onPress('pixPayment')}
                                style={{ marginBottom: 15 }}
                                containerStyle={{ paddingBottom: 15 }}
                                icon={require('../../../../../assets/icons/pix-white.png')}
                            />
                        } */}
                    </View>
                </SafeAreaView>
            </View>
            <AddTransactionPasswordModal
                closeAlert={toggleModal}
                showAlert={showModal}
                navigation={navigation}
            />
        </>
    );
};

export default OptionScreen;

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
