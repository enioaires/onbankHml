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

// Components
import api from '../../../../api';
import TextInput from '../../../../components/TextInput';
import ActionButton from '../../../../components/ActionButton';
import TransferModal2 from '../../../../containers/TransferModal2';

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

const SearchAccountScreen: React.FC<TransferStackNavigationProps<
    'SearchAccount'
>> = ({ navigation }: TransferStackNavigationProps<'SearchAccount'>) => {
    const dispatch = useDispatch();
    const [accountNumber, receiverName, accountTaxId, clientName] = useSelector(
        (state: IApplicationState) => {
            return [
                state.transfer.payload.receiverAccount,
                state.transfer.payload.receiverName,
                state.user.data.client.taxIdentifier.taxId,
                state.user.data.client.name
            ];
        },
        shallowEqual
    );
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
                key: 'receiverAccount',
                value: value.replace(/\D/g, '')
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
        // Saga Fora
        try {
            const resp = await api.get(`/account/data/account/${value}`);

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
                    key: 'receiverTaxId',
                    value: resp.data.taxId
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
            <TransferModal2
                visible={modal}
                setVisible={setModal}
                navigation={navigation}
                clientInfo={isClientInfo}
            />
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
                                Insira a{' '}
                                <Text
                                    allowFontScaling={false}
                                    style={{ color: colors.blue.second }}
                                >
                                    conta
                                </Text>
                                {'\n'}
                                de quem deseja transferir
                            </Text>
                            <TextInput
                                maxLength={12}
                                style={styles.input}
                                autoFocus
                                type="only-numbers"
                                keyboardType="number-pad"
                                value={accountNumber}
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
                                        receiverName ===
                                            'Conta não encontrada' && {
                                            color: colors.text.invalid,
                                            fontFamily: 'Roboto-Light'
                                        }
                                    ]}
                                >
                                    {receiverName === 'Conta não encontrada'
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

export default SearchAccountScreen;

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
