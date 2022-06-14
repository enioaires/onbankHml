import React, { useMemo, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';
import RequestCardModal from '../../../../containers/RequestCardModal';

// Store
import { IApplicationState } from '../../../../store/types';
import { updateUserDataAction } from '../../../../store/ducks/updateData/actions';
import {
    closeRegisterCardBizModalAction,
    registerCardSecondViaAction,
    showRegisterCardBizModalAction
} from '../../../../store/ducks/card/actions';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen();

const AddressScreen: React.FC<PerfilStackNavigationProps<'Address'>> = ({
    navigation,
    route
}: PerfilStackNavigationProps<'Address'>) => {
    const { blockedInputs, address } = route.params;
    const { isKeyboardActive } = useIsKeyboardActive();

    const addressPayload = useSelector(
        (state: IApplicationState) => state.user.data.billingAddress,
        shallowEqual
    );
    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );
    const registerCardBizModal = useSelector(
        (state: IApplicationState) => state.card.isRegisterModalOpen
    );
    const requestCardBizLoading = useSelector(
        (state: IApplicationState) => state.card.loading
    );

    const findInputBlocked = (name: string) =>
        !!blockedInputs.find((e: string) => e === name);

    const dispatch = useDispatch();

    const onPress = () => {
        if (!route.params?.isCardRequest || dataHasChanged) {
            navigation.push('Perfil', {
                screen: 'ValidateAccess',
                params: {
                    action: () =>
                        dispatch(
                            updateUserDataAction(
                                {
                                    endereco: {
                                        ...addressValues,
                                        country: 'BRA'
                                    }
                                },
                                navigation,
                                route.params?.isCardRequest
                            )
                        )
                }
            });
        } else if (cardBiz === 'CANCELADO') {
            dispatch(showRegisterCardBizModalAction());
        } else {
            navigation.push('Card', {
                screen: 'ChooseNameCard'
            });
        }
    };

    const [addressValues, setAddressValues] = useState({
        street: address ? address.street! : addressPayload.logradouro,
        city: address ? address.city! : addressPayload.cidade,
        state: address ? address.state! : addressPayload.estado,
        neighborhood: address ? address.district! : addressPayload.bairro,
        number: address ? '' : addressPayload.numero,
        complement: address ? '' : addressPayload.complemento || '',
        postalCode: address ? address.postalCode : addressPayload.cep
    });

    const onChangeText = (name: any, value: string) => {
        setAddressValues((oldstate: any) => ({
            ...oldstate,
            [name]: value
        }));
    };

    const isButtonDisabled = useMemo(() => {
        if (addressValues.street.trim().length <= 0) return true;
        if (addressValues.neighborhood.trim().length <= 0) return true;
        if (addressValues.number.trim().length <= 0) return true;
        if (addressValues.city.trim().length <= 0) return true;
        if (addressValues.state.trim().length < 2) return true;
        if (addressValues.complement.trim().length <= 0) return true;
        // if (
        //     addressPayload.cep &&
        //     addressValues.city.trim().toUpperCase() ===
        //         addressPayload?.cidade.trim().toUpperCase() &&
        //     addressValues.state.trim().toUpperCase() ===
        //         addressPayload?.estado.trim().toUpperCase() &&
        //     addressValues.street.trim().toUpperCase() ===
        //         addressPayload?.logradouro.trim().toUpperCase() &&
        //     addressValues.neighborhood.trim().toUpperCase() ===
        //         addressPayload?.bairro.trim().toUpperCase() &&
        //     addressValues.complement?.trim().toUpperCase() ===
        //         addressPayload?.complemento.trim().toUpperCase() &&
        //     addressValues.number === addressPayload?.numero
        // ) {
        //     return true;
        // }
        return false;
    }, [addressValues]);

    const dataHasChanged = useMemo(() => {
        if (
            addressValues.postalCode?.replace('/D/g', '') !==
                addressPayload.cep.replace('/D/g', '') ||
            addressValues.city?.trim() !== addressPayload.cidade.trim() ||
            addressValues.complement?.trim() !==
                addressPayload.complemento.trim() ||
            addressValues.neighborhood?.trim() !==
                addressPayload.bairro.trim() ||
            addressValues.state?.trim() !== addressPayload.estado.trim() ||
            addressValues.street?.trim() !== addressPayload.logradouro.trim() ||
            addressValues.number?.trim() !== addressPayload.numero.trim()
        )
            return true;
        return false;
    }, [addressPayload, addressValues]);

    return (
        <View
            style={[
                styles.container,
                !isSmallDevice && { paddingTop: 80 + 50 }
            ]}
        >
            <RequestCardModal
                isSecondVia={cardBiz === 'CANCELADO'}
                isVisible={cardBiz === 'CANCELADO' && registerCardBizModal}
                setIsVisible={() => dispatch(closeRegisterCardBizModalAction())}
                requestAction={() => {
                    dispatch(closeRegisterCardBizModalAction());
                    dispatch(registerCardSecondViaAction(navigation));
                }}
                requestLoading={requestCardBizLoading}
            />
            <SafeAreaView style={styles.safeArea}>
                <View
                    style={isKeyboardActive ? { height: '50%' } : { flex: 1 }}
                >
                    {route.params.isCardRequest && (
                        <Text
                            style={{
                                fontFamily: 'Roboto-Regular',
                                color: colors.text.second,
                                fontSize: 20,
                                marginBottom: 31,
                                lineHeight: 22
                            }}
                        >
                            Confirme seu endereço de entrega
                        </Text>
                    )}
                    <ScrollView>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.label]}
                            >
                                Endereço
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={addressValues.street}
                                name="street"
                                onChangeText={(name, value) =>
                                    onChangeText(name, value)
                                }
                            />
                            <Text allowFontScaling={false} style={styles.label}>
                                Número
                            </Text>
                            <TextInput
                                type="only-numbers"
                                style={[styles.input, { width: '25%' }]}
                                value={addressValues.number}
                                name="number"
                                onChangeText={(name, value) =>
                                    onChangeText(name, value)
                                }
                            />
                            <Text allowFontScaling={false} style={styles.label}>
                                Complemento
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={addressValues.complement}
                                name="complement"
                                maxLength={20}
                                onChangeText={(name, value) =>
                                    onChangeText(name, value)
                                }
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignSelf: 'stretch'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        marginRight: '15%'
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Cidade
                                    </Text>
                                    <TextInput
                                        editable={!findInputBlocked('city')}
                                        style={styles.input}
                                        value={addressValues.city}
                                        name="city"
                                        onChangeText={(name, value) =>
                                            onChangeText(name, value)
                                        }
                                    />
                                </View>
                                <View
                                    style={{
                                        width: '25%'
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Estado
                                    </Text>
                                    <TextInput
                                        type="custom"
                                        options={{
                                            mask: 'AA'
                                        }}
                                        editable={!findInputBlocked('state')}
                                        style={styles.input}
                                        value={addressValues.state}
                                        name="state"
                                        onChangeText={(name, value) =>
                                            onChangeText(name, value)
                                        }
                                    />
                                </View>
                            </View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Bairro
                                </Text>
                                <TextInput
                                    editable={!findInputBlocked('neighborhood')}
                                    style={styles.input}
                                    value={addressValues.neighborhood}
                                    name="neighborhood"
                                    onChangeText={(name, value) =>
                                        onChangeText(name, value)
                                    }
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <ActionButton
                    label="Continuar"
                    onPress={onPress}
                    disabled={isButtonDisabled}
                    isLoading={cardBiz === 'CANCELADO' && requestCardBizLoading}
                />
            </SafeAreaView>
        </View>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop: isSmallDevice ? 80 + 20 : 80 + 40
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 16,
        paddingBottom: 7,
        paddingTop: 0,
        height: 24,
        borderRadius: 0,
        marginBottom: 35
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 12,
        marginBottom: 5
    }
});
