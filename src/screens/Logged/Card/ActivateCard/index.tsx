import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
// import valid from 'card-validator';

// Components
// import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import { activateCardBizAction } from '../../../../store/ducks/card/actions';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { CardStackNavigationProps } from '../../../../routes/Logged/types';

const visaLogo = require('../../../../../assets/icons/visa.png');
const logo = require('../../../../../assets/logo-white.png');

const isSmallScreen = isDeviceSmallScreen();

const ActivateCard: React.FC<CardStackNavigationProps<'Activate'>> = ({
    navigation
}: CardStackNavigationProps<'Activate'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const cardBizClientName = useSelector(
        (state: IApplicationState) => state.card.card?.cardName
    );

    const [lastNumbers, setLastNumbers] = useState('');

    useEffect(() => {
        if (lastNumbers.length > 3) {
            navigation.push('General', {
                screen: 'TransactionPassword',
                params: {
                    action: (password?: string) => {
                        dispatch(
                            activateCardBizAction(
                                lastNumbers,
                                password!,
                                navigation
                            )
                        );
                    }
                }
            });
        }
    }, [lastNumbers, dispatch, navigation]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text allowFontScaling={false} style={styles.title}>
                    Insira os quatro últimos números do seu cartão
                </Text>
                <LinearGradient
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#3492AA', '#235879']}
                    useAngle
                    angle={120}
                >
                    <Image source={logo} style={styles.onbankLogo} />
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: -10,
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Text style={styles.placeholder}>**** **** **** </Text>
                        <TextInput
                            allowFontScaling={false}
                            style={styles.numberInput}
                            maxLength={4}
                            value={lastNumbers}
                            onChangeText={(name: string, value: string) =>
                                setLastNumbers(value)
                            }
                            autoFocus
                            keyboardType="number-pad"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ width: '65%' }}>
                            <Text
                                allowFontScaling={false}
                                style={styles.clientName}
                            >
                                {cardBizClientName || ''}
                            </Text>
                        </View>
                        <Image
                            resizeMode="contain"
                            style={styles.brand}
                            source={visaLogo}
                        />
                    </View>
                </LinearGradient>
                {/* <KeyboardAvoidingView
                        style={[
                            { flex: 1 },
                            isKeyboardActive && { marginBottom: 15 }
                        ]}
                        behavior="padding"
                    >
                        <Text allowFontScaling={false} style={styles.title}>
                            Insira os quatro últimos números do seu cartão
                        </Text>
                        <CreditCard inputMode inputModeCardData={cardInput} />
                        <View
                            style={[
                                {
                                    flex: 1,
                                    marginTop: 40,
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
                                            Número do cartão
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            type="credit-card"
                                            name="cardNumber"
                                            maxLength={4}
                                            value={cardInput.cardNumber}
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
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
                                            Código de segurança (CVV)
                                        </Text>
                                        <TextInput
                                            style={[styles.input]}
                                            keyboardType="number-pad"
                                            name="cvv"
                                            value={cardInput.cvv}
                                            maxLength={3}
                                            onChangeText={(name: any, value) =>
                                                onChangeText(name, value)
                                            }
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView> */}
                {/* <ActionButton
                        label="Ativar cartão"
                        onPress={() =>
                            navigation.push('Card', { screen: 'Active' })
                        }
                    /> */}
            </SafeAreaView>
        </View>
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
    title: {
        fontSize: 21,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        lineHeight: 25,
        marginBottom: 15,
        marginLeft: 10
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 12,
        marginBottom: 5
    },
    card: {
        borderRadius: 20,
        paddingLeft: 29,
        paddingRight: 26,
        paddingTop: 18,
        paddingBottom: 23,
        backgroundColor: colors.blue.second
    },
    onbankLogo: {
        marginBottom: 70
    },
    brand: {
        width: 60
        // height: 'auto',
    },
    placeholder: {
        color: '#EFEFEF',
        fontFamily: 'Roboto-Regular',
        fontSize: 18
    },
    numberInput: {
        flex: 1,
        color: '#EFEFEF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        borderWidth: 0,
        height: 25,
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        borderRadius: 0,
        textAlignVertical: 'top'
    },
    clientName: {
        color: '#EFEFEF',
        fontFamily: 'Roboto-Regular',
        fontSize: 15
    }
});

export default ActivateCard;
