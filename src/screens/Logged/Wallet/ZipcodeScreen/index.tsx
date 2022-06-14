import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import api from '../../../../api';
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeCardInputAddressPayloadAction,
    clearCardInputAddressStateAction
} from '../../../../store/ducks/wallet/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { WalletStackNavigationProps } from '../../../../routes/Logged/types';

const ZipcodeScreen: React.FC<WalletStackNavigationProps<
    'NewAddressZipcode'
>> = ({
    navigation,
    route
}: WalletStackNavigationProps<'NewAddressZipcode'>) => {
    const { feature } = route.params;
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const [cepValue, validation] = useSelector((state: IApplicationState) => {
        return [
            state.wallet.cardInput.cardAddress.postalCode,
            state.wallet.cardInputErrors.cardAddress.postalCode
        ];
    }, shallowEqual);
    const [loading, setLoading] = useState(false);

    const onChangeText = (value: string) => {
        dispatch(changeCardInputAddressPayloadAction('postalCode', value));
    };

    const getAddressByZipcode = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const blockedInputs: string[] = [];
        // Saga Fora
        try {
            const resp = await api.get(`/cep/${cepValue.replace(/\D/g, '')}`);

            if (resp?.data?.ok) {
                if (resp.data.address) {
                    dispatch(
                        changeCardInputAddressPayloadAction(
                            'street',
                            resp.data.address
                        )
                    );
                }
                if (resp.data.district) {
                    dispatch(
                        changeCardInputAddressPayloadAction(
                            'neighborhood',
                            resp.data.district
                        )
                    );
                    blockedInputs.push('neighborhood');
                }
                if (resp.data.city) {
                    dispatch(
                        changeCardInputAddressPayloadAction(
                            'city',
                            resp.data.city
                        )
                    );
                    blockedInputs.push('city');
                }
                if (resp.data.state) {
                    dispatch(
                        changeCardInputAddressPayloadAction(
                            'state',
                            resp.data.state
                        )
                    );
                    blockedInputs.push('state');
                }
            }

            navigation.push('Wallet', {
                screen: 'NewAddress',
                params: { blockedInputs, feature }
            });
        } catch (err) {
            // err
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            dispatch(clearCardInputAddressStateAction());
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <View style={{ alignItems: 'center' }}>
                            {/* <Text allowFontScaling={false} style={styles.text1}>Esse é o seu primeiro boleto,</Text> */}
                            <Text allowFontScaling={false} style={styles.text1}>
                                Preencha os dados
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.text1,
                                    {
                                        fontFamily: 'Roboto-Bold',
                                        marginBottom: 30
                                    }
                                ]}
                            >
                                do seu endereço.
                            </Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.label}>
                            CEP
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            type="zip-code"
                            value={cepValue}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.validation}
                        >
                            {validation}
                        </Text>
                        {/* <Text allowFontScaling={false} style={styles.text2}>
                            Essa ação não será necessária na emissão dos próximos boletos
                        </Text> */}
                    </View>
                    <ActionButton
                        label="Próximo"
                        onPress={getAddressByZipcode}
                        isLoading={loading}
                        disabled={
                            cepValue.replace(/\D/g, '').length < 8 ||
                            validation.length > 0
                        }
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ZipcodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1,
        alignItems: 'center'
    },
    text1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.text.third,
        textAlign: 'center',
        lineHeight: 22
    },
    text2: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        color: colors.text.fourth,
        textAlign: 'center',
        lineHeight: 19,
        width: '60%'
    },
    label: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 5
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        textAlign: 'center',
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 30,
        paddingBottom: 5,
        marginBottom: 5
    },
    validation: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.red,
        marginBottom: 5
    }
});
