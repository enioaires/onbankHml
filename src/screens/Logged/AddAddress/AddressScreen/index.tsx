import React, { useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

// Components
import { IAddAddressPayload } from 'src/store/ducks/address/types';
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeAddAddressPayloadAction,
    requestAddAddressAction
} from '../../../../store/ducks/address/actions';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { AddAddressStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen();

const AddressScreen: React.FC<AddAddressStackNavigationProps<'Address'>> = ({
    navigation
}: AddAddressStackNavigationProps<'Address'>) => {
    const loading = useSelector(
        (state: IApplicationState) => state.address.isLoading
    );
    const blockedInputs = useSelector(
        (state: IApplicationState) => state.address.blockedInputs
    );
    const addressPayload = useSelector(
        (state: IApplicationState) => state.address.payload,
        shallowEqual
    );

    const findInputBlocked = (name: string) =>
        !!blockedInputs.find((e: string) => e === name);

    const dispatch = useDispatch();
    const scrollRef = useRef<any>();

    const onChangeText = (name: keyof IAddAddressPayload, value: string) => {
        dispatch(
            changeAddAddressPayloadAction({
                key: name,
                value
            })
        );
    };

    const onPress = () => {
        dispatch(requestAddAddressAction(navigation));
    };

    return (
        <View
            style={[
                styles.container,
                !isSmallDevice && { paddingTop: 80 + 50 }
            ]}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView ref={scrollRef}>
                    <View>
                        <Text allowFontScaling={false} style={[styles.label]}>
                            Endereço
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={addressPayload.street}
                            name="street"
                            onChangeText={(name, value) =>
                                onChangeText(
                                    name as keyof IAddAddressPayload,
                                    value
                                )
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
                                onChangeText(
                                    name as keyof IAddAddressPayload,
                                    value
                                )
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
                                onChangeText(
                                    name as keyof IAddAddressPayload,
                                    value
                                )
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
                                        onChangeText(
                                            name as keyof IAddAddressPayload,
                                            value
                                        )
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
                                        onChangeText(
                                            name as keyof IAddAddressPayload,
                                            value
                                        )
                                    }
                                />
                            </View>
                        </View>
                        <View>
                            <Text allowFontScaling={false} style={styles.label}>
                                Bairro
                            </Text>
                            <TextInput
                                editable={!findInputBlocked('neighborhood')}
                                style={styles.input}
                                value={addressPayload.neighborhood}
                                name="neighborhood"
                                onChangeText={(name, value) =>
                                    onChangeText(
                                        name as keyof IAddAddressPayload,
                                        value
                                    )
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
                <ActionButton
                    label="Próximo"
                    onPress={onPress}
                    isLoading={loading}
                    disabled={
                        addressPayload.street.length <= 0 ||
                        addressPayload.neighborhood.length <= 0 ||
                        addressPayload.number.length <= 0 ||
                        addressPayload.city.length <= 0 ||
                        addressPayload.state.length < 2
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
        paddingTop: 80 + 40
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
