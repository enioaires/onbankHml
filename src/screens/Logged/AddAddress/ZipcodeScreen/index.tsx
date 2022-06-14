import React, { useEffect } from 'react';
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
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeAddAddressPayloadAction,
    getAddressByZipcodeAction,
    clearAddAddressPayloadAction
} from '../../../../store/ducks/address/actions';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { AddAddressStackNavigationProps } from '../../../../routes/Logged/types';

const ZipcodeScreen: React.FC<AddAddressStackNavigationProps<'Zipcode'>> = ({
    navigation
}: AddAddressStackNavigationProps<'Zipcode'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const [value, validation, loading, previous] = useSelector(
        (state: IApplicationState) => {
            return [
                state.address.payload.postalCode,
                state.address.inputsValidation.postalCode,
                state.address.isLoading,
                state.address.previousZipcode
            ];
        },
        shallowEqual
    );

    const onChangeText = (value: string) => {
        dispatch(
            changeAddAddressPayloadAction({
                key: 'postalCode',
                value
            })
        );
    };

    const onPress = () => {
        Keyboard.dismiss();
        if (value !== previous) {
            dispatch(getAddressByZipcodeAction(navigation));
        } else {
            navigation.push('AddAddress', { screen: 'Address' });
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearAddAddressPayloadAction());
        };
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <View style={{ alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={styles.text1}>
                                Este é o seu primeiro boleto.
                            </Text>
                            <Text allowFontScaling={false} style={styles.text1}>
                                Para prosseguir, preencha os dados
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
                            value={value}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.validation}
                        >
                            {validation}
                        </Text>
                        <Text allowFontScaling={false} style={styles.text2}>
                            Essa ação não será necessária na emissão dos
                            próximos boletos
                        </Text>
                    </View>
                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        isLoading={loading}
                        disabled={
                            value.replace(/\D/g, '').length < 8 ||
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
