import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';
import { useSelector } from 'react-redux';

// Components
import api from '../../../../api';
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const ZipcodeScreen: React.FC<PerfilStackNavigationProps<'ZipCode'>> = ({
    navigation,
    route
}: PerfilStackNavigationProps<'ZipCode'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const cep = useSelector(
        (state: IApplicationState) => state.user.data.billingAddress?.cep
    );

    const [loading, setLoading] = useState(false);
    const [cepValue, setCepValue] = useState(cep || '');
    const [validation, setVaidation] = useState(cep);

    const onChangeText = (value: string) => {
        setCepValue(value);
    };

    useEffect(() => {
        if (cepValue.replace(/\D/g, '').length > 7 && !isValidCEP(cepValue)) {
            setVaidation('* CEP inválido.');
        } else {
            setVaidation('');
        }
    }, [cepValue]);

    const getAddressByZipcode = async () => {
        Keyboard.dismiss();
        if (cepValue.replace(/\D/g, '') === cep) {
            const sameBlockedInputs = ['neighborhood', 'city', 'state'];
            navigation.push('Perfil', {
                screen: 'Address',
                params: {
                    blockedInputs: sameBlockedInputs,
                    isCardRequest: route.params?.isCardRequest
                }
            });
        } else {
            setLoading(true);
            const blockedInputs: string[] = [];
            // Saga Fora
            try {
                const resp = await api.get(
                    `/cep/${cepValue.replace(/\D/g, '')}`
                );

                let address = {};

                if (resp?.data?.ok) {
                    if (resp.data.address) {
                        address = {
                            ...address,
                            street: resp.data.address
                        };
                    } else {
                        address = {
                            ...address,
                            street: ''
                        };
                    }
                    if (resp.data.district) {
                        address = {
                            ...address,
                            district: resp.data.district
                        };
                        blockedInputs.push('neighborhood');
                    } else {
                        address = {
                            ...address,
                            district: ''
                        };
                    }

                    if (resp.data.city) {
                        address = {
                            ...address,
                            city: resp.data.city
                        };
                        blockedInputs.push('city');
                    }
                    if (resp.data.state) {
                        address = {
                            ...address,
                            state: resp.data.state
                        };
                        blockedInputs.push('state');
                    }
                } else {
                    address = {
                        street: '',
                        district: '',
                        city: '',
                        state: ''
                    };
                }

                navigation.push('Perfil', {
                    screen: 'Address',
                    params: {
                        isCardRequest: route.params?.isCardRequest,
                        blockedInputs,
                        address: {
                            ...address,
                            postalCode: cepValue.replace(/\D/g, '')
                        }
                    }
                });
            } catch (err) {
                // err
            }
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <View style={{ alignItems: 'center' }}>
                            {cep ? (
                                <>
                                    {route.params?.isCardRequest ? (
                                        <>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.text1}
                                            >
                                                Confirme o CEP do
                                            </Text>

                                            <Text
                                                allowFontScaling={false}
                                                style={[
                                                    styles.text1,
                                                    {
                                                        fontFamily:
                                                            'Roboto-Bold',
                                                        marginBottom: 30
                                                    }
                                                ]}
                                            >
                                                seu endereço cadastrado.
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.text1}
                                            >
                                                CEP do seu
                                            </Text>
                                            {/* <Text allowFontScaling={false} style={styles.text1}>
                                        Altere para editá-lo
                                    </Text> */}
                                            <Text
                                                allowFontScaling={false}
                                                style={[
                                                    styles.text1,
                                                    {
                                                        fontFamily:
                                                            'Roboto-Bold',
                                                        marginBottom: 30
                                                    }
                                                ]}
                                            >
                                                endereço cadastrado.
                                            </Text>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.text1}
                                    >
                                        Você ainda não possui
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.text1}
                                    >
                                        endereço cadastrado. Insira o CEP
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
                                        e prossiga com o cadastro.
                                    </Text>
                                </>
                            )}
                        </View>
                        <Text allowFontScaling={false} style={styles.label}>
                            CEP
                        </Text>
                        <TextInput
                            style={styles.input}
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
                        {cep && (
                            <Text allowFontScaling={false} style={styles.text2}>
                                Para alterar, insira o{'\n'}
                                CEP do novo endereço
                            </Text>
                        )}
                    </View>
                    <ActionButton
                        label={
                            route.params?.isCardRequest
                                ? 'Confirmar'
                                : 'Continuar'
                        }
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
        alignItems: 'center',
        paddingTop: '20%'
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
