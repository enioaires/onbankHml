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
import { changeTransferPayloadAction } from '../../../../store/ducks/transfer/actions';
import { IApplicationState } from '../../../../store/types';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const NameScreen: React.FC<TransferStackNavigationProps<'Name'>> = ({
    navigation
}: TransferStackNavigationProps<'Name'>) => {
    const dispatch = useDispatch();

    const name = useSelector(
        (state: IApplicationState) => state.transfer.payload.receiverName
    );

    const { isKeyboardActive } = useIsKeyboardActive();

    const onChangeText = (value: string) => {
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverName',
                value
            })
        );
    };

    const [firstName, second, ...rest] = name.split(' ');

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 15 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={styles.title}>
                            Insira o{' '}
                            <Text
                                allowFontScaling={false}
                                style={{ fontFamily: 'Roboto-Bold' }}
                            >
                                nome completo
                            </Text>
                            {'\n'}
                            do destinatário
                        </Text>
                        <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={2}
                            autoFocus
                            value={name}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        {/* <Text allowFontScaling={false} style={styles.validation}>* Insira um CPF válido</Text> */}
                    </View>
                    <ActionButton
                        label="Continuar"
                        disabled={!second}
                        onPress={() =>
                            navigation.push('Transfer', { screen: 'Banks' })
                        }
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default NameScreen;

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
        marginBottom: 27
    },
    input: {
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 0,
        fontSize: 28,
        marginBottom: 10,
        height: 'auto'
    },
    validation: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: colors.text.invalid
    }
});
