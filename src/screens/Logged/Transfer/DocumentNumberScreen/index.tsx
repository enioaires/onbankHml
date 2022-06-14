import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { isValidCPF, isValidCNPJ } from '@brazilian-utils/brazilian-utils';

// Components
// import api from '../../../../api';
// import TransferModal2 from '../../../../containers/TransferModal2';
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

const DocumentNumberScreen: React.FC<TransferStackNavigationProps<
    'DocumentNumber'
>> = ({ navigation }: TransferStackNavigationProps<'DocumentNumber'>) => {
    const dispatch = useDispatch();
    const [documentNumber, accountTaxId, clientName] = useSelector(
        (state: IApplicationState) => {
            return [
                state.transfer.payload.receiverTaxId,
                state.user.data.client.taxIdentifier.taxId,
                state.user.data.client.name
            ];
        },
        shallowEqual
    );
    const unmaskedDocumentNumber = documentNumber.replace(/\D/g, '');
    const { isKeyboardActive } = useIsKeyboardActive();
    // const [modal, setModal] = useState(false);
    // const [isClientInfo, setIsClientInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState('');

    const onChangeText = (value: string) => {
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverTaxId',
                value: value.replace(/\D/g, '')
            })
        );
    };

    const onPress = async () => {
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverPersonType',
                value:
                    unmaskedDocumentNumber.length > 11 ? 'CORPORATE' : 'PERSON'
            })
        );
        dispatch(
            changeTransferPayloadAction({
                key: 'receiverName',
                value:
                    accountTaxId.replace(/\D/g, '') ===
                    documentNumber.replace(/\D/g, '')
                        ? prefityNames(clientName)
                        : ''
            })
        );
        // Keyboard.dismiss();
        // dispatch(
        //     changeTransferPayloadAction({
        //         key: 'receiverPersonType',
        //         value:
        //             unmaskedDocumentNumber.length > 11 ? 'CORPORATE' : 'PERSON'
        //     })
        // );
        // setLoading(true);
        // try {
        //     const resp = await api.get(`/verify/cpf/${unmaskedDocumentNumber}`);

        //     let isClient = false;

        //     if (resp.error || resp.statusCode === 500) {
        //         if (
        //             resp.message ===
        //             'Conflito de dados encontrado, entre com contato com nosso suporte!'
        //         ) {
        //             isClient = false;
        //         } else {
        //             throw new Error(
        //                 resp.message || 'Algo de errado aconteceu...'
        //             );
        //         }
        //     }

        //     if (resp.data?.CPFClient) isClient = true;

        //     if (
        //         isClient &&
        //         accountTaxId.replace(/\D/g, '') !==
        //             documentNumber.replace(/\D/g, '')
        //     ) {
        //         setIsClientInfo({
        //             username: resp.data.username,
        //             accountId: resp.data.accountId,
        //             bankName: 'Onbank',
        //             branch: resp.data.branch,
        //             account: resp.data.account,
        //             taxId: documentNumber
        //         });
        //         setModal(true);
        //     } else {
        //         dispatch(
        //             changeTransferPayloadAction({
        //                 key: 'receiverName',
        //                 value:
        //                     accountTaxId.replace(/\D/g, '') ===
        //                     documentNumber.replace(/\D/g, '')
        //                         ? prefityNames(clientName)
        //                         : ''
        //             })
        //         );
        //         navigation.push('Transfer', { screen: 'Name' });
        //     }
        // } catch (err) {
        //     // err
        // }
        // setLoading(false);
        navigation.push('Transfer', { screen: 'Name' });
    };

    useEffect(() => {
        if (
            documentNumber.replace(/\D/g, '').length === 11 &&
            !isValidCPF(documentNumber)
        ) {
            setValidation('* Insira um CPF válido.');
        } else if (validation.length > 0) {
            setValidation('');
        }
        if (
            documentNumber.replace(/\D/g, '').length === 14 &&
            !isValidCNPJ(documentNumber)
        ) {
            setValidation('* Insira um CNPJ válido.');
        } else if (validation.length > 0) {
            setValidation('');
        }
    }, [documentNumber]);

    useEffect(() => {
        return () => {
            dispatch(clearTransferPayloadAction());
        };
    }, [dispatch]);

    return (
        <>
            {/* <TransferModal2
                visible={modal}
                setVisible={setModal}
                navigation={navigation}
                clientInfo={isClientInfo}
            /> */}
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
                                    style={{ fontFamily: 'Roboto-Bold' }}
                                >
                                    CPF ou CNPJ
                                </Text>
                                {'\n'}
                                do destinatário
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
                            {validation.length > 0 && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.validation}
                                >
                                    {validation}
                                </Text>
                            )}
                        </View>
                        <ActionButton
                            label="Continuar"
                            onPress={onPress}
                            disabled={
                                documentNumber.replace(/\D/g, '').length < 11 ||
                                (documentNumber.replace(/\D/g, '').length >
                                    11 &&
                                    documentNumber.replace(/\D/g, '').length <
                                        14) ||
                                validation.length > 0
                            }
                            isLoading={loading}
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

export default DocumentNumberScreen;

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
        marginBottom: 10
    },
    validation: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: colors.text.invalid
    }
});
