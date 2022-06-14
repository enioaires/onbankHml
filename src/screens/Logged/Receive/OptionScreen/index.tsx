import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

// Components
import OptionButton from '../../../../components/OptionButton';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Navigation Type
import { ReceiveStackNavigationProps } from '../../../../routes/Logged/types';

const OptionScreen: React.FC<ReceiveStackNavigationProps<'Option'>> = ({
    navigation
}: ReceiveStackNavigationProps<'Option'>) => {
    const onPress = () => {
        navigation.push('Receive', { screen: 'Value' });
    };

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <OptionButton
                            title="Receber via QR Code"
                            description="Utilize para recebimento presencial entre clientes Onbank"
                            onPress={onPress}
                            style={{ marginBottom: 15 }}
                            containerStyle={{
                                paddingBottom: 15,
                                paddingRight: '26%'
                            }}
                        />
                        {/* <OptionButton
                            title="Enviar Cobrança"
                            description="Utilize para enviar uma cobrança"
                            onPress={() => {
                                Alert.alert(
                                    'Cobrança',
                                    'Necessário adquirente'
                                );
                            }}
                            style={{ marginBottom: 35 }}
                            containerStyle={{ paddingBottom: 15 }}
                        /> */}
                    </View>
                </SafeAreaView>
            </View>
        </>
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
