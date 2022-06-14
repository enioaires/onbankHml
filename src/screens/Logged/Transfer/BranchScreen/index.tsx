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

const BranchScreen: React.FC<TransferStackNavigationProps<'Branch'>> = ({
    navigation
}: TransferStackNavigationProps<'Branch'>) => {
    const dispatch = useDispatch();
    const branch = useSelector(
        (state: IApplicationState) => state.transfer.payload.receiverBranch
    );

    const { isKeyboardActive } = useIsKeyboardActive();

    const onChangeText = (value: string) => {
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverBranch',
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
                                agência{' '}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={{ fontSize: 16 }}
                            >
                                (sem o dígito)
                            </Text>
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            keyboardType="number-pad"
                            type="only-numbers"
                            maxLength={4}
                            value={branch}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        {/* <Text allowFontScaling={false} style={styles.validation}>* Insira um CPF válido</Text> */}
                    </View>
                    <ActionButton
                        label="Continuar"
                        disabled={branch.length <= 0}
                        onPress={() =>
                            navigation.push('Transfer', { screen: 'Account' })
                        }
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default BranchScreen;

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
