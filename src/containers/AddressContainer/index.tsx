import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import ActionButton from '../../components/ActionButton';
import TextInput from '../../components/TextInput';

// Styles
import { paddings } from '../../styles/paddings';
import colors from '../../styles/colors';

// Store
import { IApplicationState } from '../../store/types';

// Utils
import { isDeviceSmallScreen } from '../../utils/helpers';
import useIsKeyboardActive from '../../utils/useIsKeyboardActive';

export interface IAddressContainerProps {
    navigation: any;
    blockedInputs: string[];
    state?: string;
    city?: string;
    neighborhood?: string;
    number?: string;
    street?: string;
    complement?: string;
}

const isSmallDevice = isDeviceSmallScreen();

const AddressContainer: React.FC<IAddressContainerProps> = ({
    blockedInputs,
    state,
    city,
    neighborhood,
    number,
    street,
    complement
}: IAddressContainerProps) => {
    const { isKeyboardActive } = useIsKeyboardActive();

    const [addressState] = useSelector((appState: IApplicationState) => {
        return [appState.addressNew.payload];
    });
    const findInputBlocked = (name: string) =>
        !!blockedInputs.find((e: string) => e === name);

    // const dispatch = useDispatch();

    const onPress = () => {};

    const [address, setAddress] = useState({
        street: street || addressState.street,
        city: city || addressState.city,
        state: state || addressState.state,
        neighborhood: neighborhood || addressState.neighborhood,
        number: number || addressState.number,
        complement: complement || addressState.complement
    });

    const onChangeText = (name: any, value: string) => {
        setAddress((oldstate: any) => ({
            ...oldstate,
            [name]: value
        }));
    };

    return (
        <View
            style={[
                styles.container,
                !isSmallDevice && { paddingTop: 80 + 50 }
            ]}
        >
            <SafeAreaView style={styles.safeArea}>
                <View
                    style={isKeyboardActive ? { height: '50%' } : { flex: 1 }}
                >
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
                                value={address.street}
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
                                value={address.number}
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
                                value={address.complement}
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
                                        value={address.city}
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
                                        value={address.state}
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
                                    value={address.neighborhood}
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
                    disabled={
                        address.street.length <= 0 ||
                        address.neighborhood.length <= 0 ||
                        address.number.length <= 0 ||
                        address.city.length <= 0 ||
                        address.state.length < 2 ||
                        (addressState.postalCode &&
                            address.city.toUpperCase() ===
                                addressState?.city.toUpperCase() &&
                            address.state.toUpperCase() ===
                                addressState?.state.toUpperCase() &&
                            address.street.toUpperCase() ===
                                addressState?.street.toUpperCase() &&
                            address.neighborhood.toUpperCase() ===
                                addressState?.neighborhood.toUpperCase() &&
                            address.complement.toUpperCase() ===
                                addressState?.complement.toUpperCase() &&
                            address.number === addressState?.number)
                    }
                />
            </SafeAreaView>
        </View>
    );
};

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

export default AddressContainer;
