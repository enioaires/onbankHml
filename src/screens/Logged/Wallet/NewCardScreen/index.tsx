import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import valid from 'card-validator';

// Components
import CreditCard from '../../../../components/CreditCard';
import TextInput from '../../../../components/TextInput';
import ActionButton from '../../../../components/ActionButton';
import AddNewCardAddressModal from '../../../../containers/AddNewCardAddressModal';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeCardInputPayloadAction,
    clearCardInputPayload
} from '../../../../store/ducks/wallet/actions';
import { ICardInput } from '../../../../store/ducks/wallet/types';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { WalletStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const NewCardScreen: React.FC<WalletStackNavigationProps<'NewCard'>> = ({
    navigation,
    route
}: WalletStackNavigationProps<'NewCard'>) => {
    const dispatch = useDispatch();
    const { feature } = route.params;
    const { isKeyboardActive } = useIsKeyboardActive();
    const [cardInput, cardInputErrors, loading, clientType] = useSelector(
        (state: IApplicationState) => {
            return [
                state.wallet.cardInput,
                state.wallet.cardInputErrors,
                state.wallet.isLoading,
                state.user.data.clientType
            ];
        },
        shallowEqual
    );

    const isPJ = clientType === 'CORPORATE';

    const isAmex = cardInput.cardType === 'american-express';
    const cardLength = isAmex ? 15 : 16;
    const cvvLength = isAmex ? 4 : 3;

    const onChangeText = (name: keyof ICardInput, value: string) => {
        dispatch(changeCardInputPayloadAction(name, value));
    };

    const [modal, setModal] = useState(false);

    const addNewCard = () => {
        setModal(true);
    };

    const getCardType = () => {
        dispatch(
            changeCardInputPayloadAction(
                'cardType',
                valid.number(cardInput.cardNumber).card?.type || ''
            )
        );
    };

    useEffect(() => {
        return () => {
            dispatch(clearCardInputPayload());
        };
    }, []);

    useEffect(() => {
        getCardType();
    }, [cardInput.cardNumber]);

    useEffect(() => {
        if (cardInput.cvv.length === cvvLength) {
            Keyboard.dismiss();
        }
    }, [cardInput.cvv]);

    return (
        <>
            <AddNewCardAddressModal
                showAlert={modal}
                closeAlert={setModal}
                navigation={navigation}
                feature={feature}
            />
            <View style={styles.container}>
                <SafeAreaView style={[styles.safeArea]}>
                    <KeyboardAvoidingView
                        style={[
                            { flex: 1 },
                            isKeyboardActive && { marginBottom: 15 }
                        ]}
                        behavior="padding"
                    >
                        <CreditCard inputMode inputModeCardData={cardInput} />
                        <View
                            style={[
                                {
                                    flex: 1,
                                    marginTop: 20,
                                    paddingHorizontal: 8
                                },
                                isKeyboardActive && { height: '35%', flex: 0 }
                            ]}
                        >
                            <ScrollView>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignSelf: 'stretch',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <View
                                        style={{
                                            marginBottom: 20,
                                            width: '45%'
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[styles.label]}
                                        >
                                            Nome impresso no cartão
                                        </Text>
                                        <TextInput
                                            maxLength={20}
                                            style={[styles.input]}
                                            name="nameOnCard"
                                            value={cardInput.nameOnCard}
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.errorMessage}
                                        >
                                            {cardInputErrors.nameOnCard}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginBottom: 20,
                                            width: '45%'
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[styles.label]}
                                        >
                                            {isPJ ? 'CNPJ' : 'CPF'} do titular
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            type={isPJ ? 'cnpj' : 'cpf'}
                                            name={isPJ ? 'cnpj' : 'cpf'}
                                            value={
                                                isPJ
                                                    ? cardInput.cnpj
                                                    : cardInput.cpf
                                            }
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.errorMessage}
                                        >
                                            {isPJ
                                                ? cardInputErrors.cnpj
                                                : cardInputErrors.cpf}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignSelf: 'stretch',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <View
                                        style={{
                                            marginBottom: 20,
                                            width: '45%'
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[styles.label]}
                                        >
                                            Número do cartão
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            type="credit-card"
                                            name="cardNumber"
                                            value={cardInput.cardNumber}
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.errorMessage}
                                        >
                                            {cardInputErrors.cardNumber}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginBottom: 20,
                                            width: '45%'
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[styles.label]}
                                        >
                                            Validade do cartão
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            keyboardType="number-pad"
                                            type="custom"
                                            options={{
                                                mask: '99/99'
                                            }}
                                            name="expirationDate"
                                            value={cardInput.expirationDate}
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.errorMessage}
                                        >
                                            {cardInputErrors.expirationDate}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <View style={{ width: '45%' }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={[styles.label]}
                                        >
                                            Código de segurança (CVV)
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            keyboardType="number-pad"
                                            name="cvv"
                                            value={cardInput.cvv}
                                            maxLength={cvvLength}
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.errorMessage}
                                        >
                                            {cardInputErrors.cvv}
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                    <ActionButton
                        label="Adicionar cartão"
                        disabled={
                            cardInput.cardNumber.replace(/\D/g, '').length <
                                cardLength ||
                            cardInputErrors.cardNumber.length > 0 ||
                            (!isPJ &&
                                cardInput.cpf.replace(/\D/g, '').length < 11) ||
                            (isPJ &&
                                cardInput.cnpj.replace(/\D/g, '').length <
                                    14) ||
                            (!isPJ && cardInputErrors.cpf.length > 0) ||
                            (isPJ && cardInputErrors.cnpj.length > 0) ||
                            cardInput.cvv.replace(/\D/g, '').length <
                                cvvLength ||
                            cardInputErrors.cvv.length > 0 ||
                            cardInput.expirationDate.replace(/\D/g, '').length <
                                4 ||
                            cardInputErrors.expirationDate.length > 0 ||
                            cardInput.nameOnCard.length <= 0
                        }
                        isLoading={loading}
                        onPress={addNewCard}
                    />
                </SafeAreaView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        paddingTop: isSmallScreen ? 80 : 80 + 20,
        flex: 1
    },
    safeArea: {
        flex: 1
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
        borderRadius: 0
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 12,
        marginBottom: 5
    },
    errorMessage: {
        marginTop: 7,
        fontSize: 12,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Medium'
    }
});

export default NewCardScreen;
