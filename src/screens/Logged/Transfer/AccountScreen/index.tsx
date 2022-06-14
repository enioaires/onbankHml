import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components
import TextInput from '../../../../components/TextInput';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { changeTransferPayloadAction } from '../../../../store/ducks/transfer/actions';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const AccountScreen: React.FC<TransferStackNavigationProps<'Account'>> = ({
    navigation
}: TransferStackNavigationProps<'Account'>) => {
    const dispatch = useDispatch();
    const account = useSelector(
        (state: IApplicationState) => state.transfer.payload.receiverAccount
    );
    const { isKeyboardActive } = useIsKeyboardActive();

    const onChangeText = (value: string) => {
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverAccount',
                value
            })
        );
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 15 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={styles.title}>
                            Insira a{' '}
                            <Text
                                allowFontScaling={false}
                                style={{ fontFamily: 'Roboto-Bold' }}
                            >
                                conta{' '}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={{ fontSize: 16 }}
                            >
                                (com dígito)
                            </Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            keyboardType="number-pad"
                            type="only-numbers"
                            value={account}
                            maxLength={15}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        {/* <Text allowFontScaling={false} style={styles.validation}>* Insira um CPF válido</Text> */}
                    </View>
                    <ActionButton
                        label="Continuar"
                        disabled={account.length <= 0}
                        onPress={() =>
                            navigation.push('Transfer', { screen: 'Amount' })
                        }
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        color: colors.text.second,
        marginBottom: 27,
        textAlignVertical: 'center'
    },
    input: {
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 0,
        fontSize: 28,
        marginBottom: 10
    },
    validation: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: colors.text.invalid
    }
});
