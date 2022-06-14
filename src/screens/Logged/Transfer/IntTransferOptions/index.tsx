import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

// Components
import OptionButton from '../../../../components/OptionButton';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Store
import { clearTransferPayloadAction } from '../../../../store/ducks/transfer/actions';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const IntTransferOptions: React.FC<TransferStackNavigationProps<
    'IntOptions'
>> = ({ navigation }: TransferStackNavigationProps<'IntOptions'>) => {
    const dispatch = useDispatch();

    const documentNumberMethod = () => {
        navigation.push('Transfer', { screen: 'IntDocumentNumber' });
    };

    const accountMethod = () => {
        navigation.push('Transfer', { screen: 'SearchAccount' });
    };

    useEffect(() => {
        return () => {
            dispatch(clearTransferPayloadAction());
        };
    }, [dispatch]);

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <OptionButton
                            title="CPF/CNPJ"
                            description="Utilize o CPF ou CNPJ para encontrar a conta Onbank que deseja transferir"
                            onPress={documentNumberMethod}
                            style={{ marginBottom: 15 }}
                            containerStyle={{ paddingBottom: 15 }}
                        />
                        <OptionButton
                            title="Número da conta"
                            description="Transfira para uma conta Onbank através do seu número"
                            onPress={accountMethod}
                            containerStyle={{
                                paddingBottom: 15,
                                paddingRight: '28%'
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </>
    );
};

export default IntTransferOptions;

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
