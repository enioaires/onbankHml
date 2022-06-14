import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import TextInput from '../TextInput';

// Utils
import { isDeviceSmallScreen, getCreditCardBrand } from '../../utils/helpers';
import { maskCardNumber } from '../../utils/prettiers';

// Styles
import colors from '../../styles/colors';

interface IProps {
    isOnbank?: boolean;
    inputMode?: boolean;
    emptyCard?: boolean;
    noCopy?: boolean;
    gradient?: number;
    cardData?: {
        cardNumber: string;
        nameOnCard: string;
        expirationMonth: string;
        expirationYear: string;
        cardType: string;
    };
    inputModeCardData?: {
        cardNumber: string;
        nameOnCard: string;
        expirationDate: string;
        cvv: string;
        cardType: string;
        inputModeChangeText?: (text: string) => void;
    };
}

const isSmallDevice = isDeviceSmallScreen(850);

const CreditCard: React.FC<IProps> = ({
    isOnbank,
    noCopy,
    emptyCard,
    cardData,
    inputModeCardData,
    gradient,
    inputMode
}: IProps) => {
    const getColorsGradient = (n: number) => {
        const parsedNumber = n;
        const idx = parsedNumber % 3;

        switch (idx) {
            case 0:
                return ['#3492AA', '#235879'];
            case 1:
                return ['#92C73C', '#237968'];
            case 2:
                return ['#3C7CC7', '#35DAF8'];
            default:
                return ['#3492AA', '#235879'];
        }
    };

    const copyCardNumber = () => {
        Clipboard.setString(inputModeCardData!.cardNumber);
        showMessage({
            message: 'Copiado!',
            description: 'Número do seu cartão foi copiado',
            backgroundColor: colors.blue.second,
            icon: 'info',
            duration: 3000
        });
    };

    if (emptyCard)
        return (
            <View style={styles.container}>
                <LinearGradient
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#C4C4C4', '#919191']}
                    useAngle
                    angle={120}
                />
            </View>
        );

    return (
        <View
            style={[
                styles.container,
                inputMode && isSmallDevice && { height: 180 }
            ]}
        >
            <LinearGradient
                style={[styles.card, { position: 'relative' }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={getColorsGradient(gradient || 0)}
                useAngle
                angle={120}
            >
                {isOnbank && (
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.subTitleCard,
                            {
                                position: 'absolute',
                                top: '60%',
                                right: -47,
                                transform: [{ rotate: '270deg' }],
                                fontSize: 9
                            }
                        ]}
                    >
                        UTILIZAR FUNÇÃO CRÉDITO
                    </Text>
                )}
                {isOnbank && (
                    <Image
                        source={require('../../../assets/logo-white.png')}
                        style={{
                            position: 'absolute',
                            top: 28,
                            left: 20,
                            resizeMode: 'contain',
                            width: 100,
                            height: 25
                        }}
                    />
                )}
                {getCreditCardBrand(
                    inputModeCardData
                        ? inputModeCardData!.cardType
                        : cardData
                        ? cardData!.cardType
                        : ''
                ) ? (
                    <Image
                        resizeMode="contain"
                        style={[
                            styles.brand,
                            inputModeCardData &&
                                inputModeCardData.cardType ===
                                    'american-express' && {
                                    width: 100,
                                    height: 70,
                                    marginTop: 20,
                                    marginRight: -20
                                },
                            cardData &&
                                cardData.cardType === 'amex' && {
                                    width: 100,
                                    height: 70,
                                    marginTop: 20,
                                    marginRight: -20
                                }
                        ]}
                        source={getCreditCardBrand(
                            inputModeCardData
                                ? inputModeCardData!.cardType
                                : cardData!.cardType
                        )}
                    />
                ) : (
                    <View
                        style={{ height: 60, width: 60, alignSelf: 'flex-end' }}
                    />
                )}
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    disabled={!isOnbank}
                    onPress={copyCardNumber}
                    style={{ flexDirection: 'row' }}
                >
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.cardText,
                            { marginBottom: 20, fontSize: 17 }
                        ]}
                    >
                        {inputMode
                            ? inputModeCardData!.cardNumber
                                  .replace(/\D/g, '')
                                  .split('')
                                  .map((char, index) => {
                                      if ((index + 1) % 4 === 0) {
                                          return `${char} `;
                                      }
                                      return char;
                                  })
                            : maskCardNumber(cardData!.cardNumber)}
                    </Text>
                    {isOnbank && !noCopy && (
                        <>
                            <Image
                                source={require('../../../assets/icons/new_icons/copy-white.png')}
                                style={{
                                    marginHorizontal: 8,
                                    width: 20,
                                    height: 20
                                }}
                            />
                            <Text
                                style={{
                                    color: colors.white,
                                    fontSize: 10,
                                    marginTop: 4
                                }}
                            >
                                Copiar
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View style={{ width: '65%' }}>
                        <Text
                            allowFontScaling={false}
                            style={styles.subTitleCard}
                        >
                            Nome
                        </Text>
                        {inputMode && inputModeCardData?.inputModeChangeText ? (
                            <TextInput
                                autoFocus
                                style={styles.input}
                                autoCapitalize="characters"
                                keyboardType="default"
                                maxLength={19}
                                value={inputModeCardData!.nameOnCard.toUpperCase()}
                                onChangeText={(_, value) => inputModeCardData!.inputModeChangeText(value)}
                            />
                            ) : (
                            <Text
                                allowFontScaling={false}
                                style={styles.cardText}
                            >
                                {inputMode
                                    ? inputModeCardData!.nameOnCard.toUpperCase()
                                    : cardData!.nameOnCard.toUpperCase()}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={styles.subTitleCard}
                        >
                            Validade
                        </Text>
                        <Text allowFontScaling={false} style={styles.cardText}>
                            {inputMode
                                ? inputModeCardData!.expirationDate
                                : `${cardData!.expirationMonth}/${
                                      cardData!.expirationYear
                                  }`}
                        </Text>
                    </View>
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={styles.subTitleCard}
                        >
                            CVV
                        </Text>
                        <Text allowFontScaling={false} style={styles.cardText}>
                            {inputMode ? inputModeCardData!.cvv : '***'}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        alignSelf: 'stretch',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    },
    card: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    brand: {
        width: 80,
        height: 80,
        alignSelf: 'flex-end'
    },
    subTitleCard: {
        color: '#EFEFEF',
        fontFamily: 'Roboto-Regular',
        fontSize: 12
    },
    cardText: {
        color: '#EFEFEF',
        fontFamily: 'Roboto-Regular',
        fontSize: 13
    },
    input: {
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 0,
        fontSize: 13,
        color: '#fff',
        height: 14,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 5
    }
});

export default React.memo(CreditCard);
