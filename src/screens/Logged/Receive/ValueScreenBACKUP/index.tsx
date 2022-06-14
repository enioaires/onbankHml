import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import numeral from 'numeral';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';
import AddDescriptionReceiveModal from '../../../../containers/AddDescriptionReceiveModal';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeReceivePayloadAction,
    clearReceiveStateAction
} from '../../../../store/ducks/receiveBACKUP/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { ReceiveStackNavigationProps } from '../../../../routes/Logged/types';

const ValueScreen: React.FC<ReceiveStackNavigationProps<'Value'>> = ({
    navigation
}: ReceiveStackNavigationProps<'Value'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const [amount, loading] = useSelector((state: IApplicationState) => {
        return [state.receiveBACKUP.payload.amount, state.receiveBACKUP.isLoading];
    }, shallowEqual);
    const isDemo = useSelector(
        (state: IApplicationState) => state.user.data.client.isDemo
    );
    const [showModal, setShowModal] = useState(false);

    const onChangeText = (value: string) => {
        dispatch(
            changeReceivePayloadAction({
                amount: value
            })
        );
    };

    const onPress = () => {
        Keyboard.dismiss();
        setShowModal(true);
    };

    const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa só permite realizar apenas 1 (um) depósito por qrcode no valor de até R$ 100,00. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                    action: {
                        mainLabel: 'Completar conta',
                        onPress: () => {
                            navigation.popToTop();
                        },
                        secondLabel: 'Agora não'
                    }
                })
            );
        }
    };

    useEffect(didMount, []);

    useEffect(() => {
        return () => {
            dispatch(clearReceiveStateAction());
        };
    }, [dispatch]);

    return (
        <>
            <AddDescriptionReceiveModal
                navigation={navigation}
                showAlert={showModal}
                closeAlert={setShowModal}
            />
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={[
                        styles.box,
                        isKeyboardActive && { marginBottom: 13 }
                    ]}
                    behavior="padding"
                >
                    <SafeAreaView style={styles.safeArea}>
                        <View>
                            <Text allowFontScaling={false} style={styles.text}>
                                Digite o valor a receber
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.currency}
                                >
                                    R${' '}
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={colors.text.second}
                                    autoFocus
                                    placeholder="0,00"
                                    name="value"
                                    type="money"
                                    options={{
                                        unit: ''
                                    }}
                                    value={amount}
                                    onChangeText={(_, value: string) =>
                                        onChangeText(value)
                                    }
                                />
                            </View>
                            <Text allowFontScaling={false} style={styles.rules}>
                                Valor máximo R$ 10.000,00
                            </Text>
                        </View>
                        <ActionButton
                            label="Gerar QR"
                            disabled={
                                numeral(amount).value() >
                                    numeral(10000).value() ||
                                numeral(amount).value() ===
                                    numeral(0).value() ||
                                amount.length <= 0
                            }
                            isLoading={loading}
                            onPress={onPress}
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

export default ValueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingBottom: 29
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    box: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 23,
        marginBottom: 45
    },
    input: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 40,
        borderWidth: 0,
        paddingBottom: 0,
        paddingLeft: 5,
        borderRadius: 0,
        height: 'auto'
    },
    currency: {
        fontFamily: 'Roboto-Regular',
        color: colors.gray.second,
        fontSize: 20,
        marginLeft: 13
    },
    rules: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 16,
        marginTop: 25
    }
});
