import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';

// Components
import api from '../../../../api';
import TextInput from '../../../../components/TextInput';
import ActionButton from '../../../../components/ActionButton';

// Store
import {
    clearTransferPayloadAction,
    changeTransferPayloadAction
} from '../../../../store/ducks/transfer/actions';
import { IApplicationState } from '../../../../store/types';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { prefityNames } from '../../../../utils/prettiers';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const IntDocumentNumberScreen: React.FC<TransferStackNavigationProps<
    'IntDocumentNumber'
>> = ({ navigation }: TransferStackNavigationProps<'IntDocumentNumber'>) => {
    const dispatch = useDispatch();
    const [
        documentNumber,
        receiverName,
        accountTaxId,
        clientName
    ] = useSelector((state: IApplicationState) => {
        return [
            state.transfer.payload.receiverTaxId,
            state.transfer.payload.receiverName,
            state.user.data.client.taxIdentifier.taxId,
            state.user.data.client.name
        ];
    }, shallowEqual);
    const { isKeyboardActive } = useIsKeyboardActive();
    const [modal, setModal] = useState(false);
    const [isClientInfo, setIsClientInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [debounce, setDebounce] = useState<any>(null);

    const onChangeText = (value: string) => {
        if (receiverName.length > 0) {
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverName',
                    value: ''
                })
            );
        }
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverTaxId',
                value
            })
        );
        if (debounce) {
            clearTimeout(debounce);
        }
        if (value.length > 0) {
            setDebounce(setTimeout(() => onPress(value), 1000));
        }
    };

    const onPress = async (value: string) => {
        setLoading(true);

        if (value.replace(/\D/g, '') === accountTaxId) {
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverName',
                    value: 'Essa é sua conta'
                })
            );
            setLoading(false);
            return;
        }

        if (value.replace(/\D/g, '').length <= 11 && !isValidCPF(value)) {
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverName',
                    value: 'CPF inválido'
                })
            );
            setLoading(false);
            return;
        }

        if (value.replace(/\D/g, '').length > 11 && !isValidCNPJ(value)) {
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverName',
                    value: 'CNPJ inválido'
                })
            );
            setLoading(false);
            return;
        }

        // Saga Fora
        try {
            const resp = await api.get(
                `/verify/cpf/${value.replace(/\D/g, '')}`
            );

            if (resp.error || resp.statusCode === 500) {
                if (resp.message.includes('encontrada')) {
                    dispatch(
                        changeTransferPayloadAction({
                            key: 'receiverName',
                            value: resp.message
                        })
                    );
                    setLoading(false);
                    return;
                }
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema. Tente novamente mais tarde.'
                    );
                }
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }

            if (!resp.data.CPFClient) {
                dispatch(
                    changeTransferPayloadAction({
                        key: 'receiverName',
                        value: 'Conta não encontrada'
                    })
                );
                setLoading(false);
                return;
            }

            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverName',
                    value: resp.data.username
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverBranch',
                    value: resp.data.branch
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverAccountId',
                    value: resp.data.accountId
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverAccount',
                    value: resp.data.account
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverBankName',
                    value: 'Onbank'
                })
            );
            // dispatch(
            //     changeTransferPayloadAction({
            //         key: 'receiverPersonType',
            //         value: resp.data.taxId.length > 11 ? 'CORPORATE' : 'PERSON'
            //     })
            // );
        } catch (err) {
            Alert.alert('Transferência', err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            dispatch(clearTransferPayloadAction());
            dispatch(
                changeTransferPayloadAction({
                    key: 'type',
                    value: 'int'
                })
            );
        };
    }, [dispatch]);

    return (
        <>
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={[
                        { flex: 1 },
                        isKeyboardActive && { marginBottom: 15 }
                    ]}
                >
                    <SafeAreaView style={styles.safeArea}>
                        <View>
                            <Text allowFontScaling={false} style={styles.title}>
                                Insira o{' '}
                                <Text
                                    allowFontScaling={false}
                                    style={{ color: colors.blue.second }}
                                >
                                    CPF ou CNPJ
                                </Text>
                                {'\n'}
                                de quem deseja transferir
                            </Text>
                            <TextInput
                                style={styles.input}
                                autoFocus
                                type="custom"
                                options={{
                                    mask:
                                        documentNumber.replace(/\D/g, '')
                                            .length < 12
                                            ? '999.999.999-999'
                                            : '99.999.999/9999-99'
                                }}
                                keyboardType="number-pad"
                                value={documentNumber}
                                onChangeText={(_, value) => onChangeText(value)}
                            />
                            {loading && (
                                <ActivityIndicator
                                    size="small"
                                    color={colors.blue.second}
                                />
                            )}
                            {!loading && receiverName.length > 0 && (
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.accountName,
                                        (receiverName ===
                                            'Conta não encontrada' ||
                                            receiverName === 'CPF inválido' ||
                                            receiverName === 'CNPJ inválido' ||
                                            receiverName ===
                                                'Essa é sua conta') && {
                                            color: colors.text.invalid,
                                            fontFamily: 'Roboto-Light'
                                        }
                                    ]}
                                >
                                    {receiverName === 'Conta não encontrada' ||
                                    receiverName === 'CPF inválido' ||
                                    receiverName === 'CNPJ inválido' ||
                                    receiverName === 'Essa é sua conta'
                                        ? receiverName
                                        : prefityNames(receiverName)}
                                </Text>
                            )}
                        </View>
                        <ActionButton
                            label="Continuar"
                            onPress={() => {
                                navigation.push('Transfer', {
                                    screen: 'Amount'
                                });
                            }}
                            disabled={
                                receiverName === 'Conta não encontrada' ||
                                receiverName === 'CPF inválido' ||
                                receiverName === 'CNPJ inválido' ||
                                receiverName === 'Essa é sua conta' ||
                                receiverName.length <= 0 ||
                                loading
                            }
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

export default IntDocumentNumberScreen;

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
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: colors.text.third,
        marginBottom: 35,
        textAlign: 'center'
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        paddingLeft: 0,
        fontFamily: 'Roboto-Light',
        color: colors.blue.second,
        fontSize: 28,
        paddingBottom: 7,
        paddingTop: 0,
        borderRadius: 0,
        marginBottom: 35,
        textAlign: 'center'
    },
    accountName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.text.smsModel,
        textAlign: 'center'
    }
});
