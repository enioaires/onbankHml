import React, { useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeCardInputAddressPayloadAction,
    addNewCardAction
} from '../../../../store/ducks/wallet/actions';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { WalletStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen(850);
const isSmallPadding = isDeviceSmallScreen();

const AddressScreen: React.FC<WalletStackNavigationProps<'NewAddress'>> = ({
    navigation,
    route
}: WalletStackNavigationProps<'NewAddress'>) => {
    const { blockedInputs, feature } = route.params;
    const { isKeyboardActive } = useIsKeyboardActive();

    const [addressPayload, loading] = useSelector(
        (state: IApplicationState) => {
            return [state.wallet.cardInput.cardAddress, state.wallet.isLoading];
        },
        shallowEqual
    );

    const findInputBlocked = (name: string) =>
        !!blockedInputs.find((e: string) => e === name);

    const dispatch = useDispatch();
    const scrollRef = useRef<any>();

    const onChangeText = (name: any, value: string) => {
        dispatch(changeCardInputAddressPayloadAction(name, value));
    };

    const onPress = () => {
        dispatch(addNewCardAction(navigation, feature));
    };

    return (
        <View style={[styles.container]}>
            <SafeAreaView style={styles.safeArea}>
                <View
                    style={
                        isKeyboardActive && isSmallDevice
                            ? { height: '55%' }
                            : { flex: 1 }
                    }
                >
                    <ScrollView ref={scrollRef}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.label]}
                            >
                                Endereço
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={addressPayload.street}
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
                                value={addressPayload.number}
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
                                value={addressPayload.complement}
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
                                        value={addressPayload.city}
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
                                        value={addressPayload.state}
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
                                    value={addressPayload.neighborhood}
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
                    label="Adicionar cartão"
                    onPress={onPress}
                    isLoading={loading}
                    disabled={
                        addressPayload.street.length <= 0 ||
                        addressPayload.neighborhood.length <= 0 ||
                        addressPayload.number.length <= 0 ||
                        addressPayload.city.length <= 0 ||
                        addressPayload.state.length < 2 ||
                        addressPayload.complement.length <= 0
                    }
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
        paddingTop: isSmallPadding ? 80 + 10 : 80 + 40
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
