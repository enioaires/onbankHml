import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    Image,
    SafeAreaView
} from 'react-native';
import Modal from 'react-native-modal';

import colors from '../../styles/colors';

const cardPromo = require('../../../assets/card-promo.png');
const cardPromo2 = require('../../../assets/card-promo-2.png');
const checkIcon = require('../../../assets/icons/card-promo-check.png');
const handIcon = require('../../../assets/icons/card-promo-hand.png');

const { width, height } = Dimensions.get('window');

interface ICardPromoModal {
    visible: boolean;
    setVisible: (value: boolean) => void;
}

const CardPromoModal: React.FC<ICardPromoModal> = ({
    visible,
    setVisible
}: ICardPromoModal) => {
    return (
        <Modal
            style={{ margin: 0 }}
            isVisible={visible}
            hasBackdrop={false}
            animationIn="fadeInUp"
            animationOut="slideOutLeft"
            animationInTiming={1200}
            animationOutTiming={800}
            scrollOffset={width}
            hideModalContentWhileAnimating
        >
            <ScrollView
                onScroll={(e) => {
                    // console.log('---------------SEPARATOR---------------');
                    // console.log('');
                    // console.log(
                    //     e.nativeEvent.contentOffset.x +
                    //         width
                    // );
                    // console.log(width * 3);
                    // console.log(width / 2);
                    // console.log(
                    //     width * 3 -
                    //         width / 2
                    // );
                    if (
                        e.nativeEvent.contentOffset.x + width >
                        width * 3 - width / 2
                    ) {
                        setVisible(false);
                    }
                }}
                snapToInterval={width}
                snapToAlignment="center"
                scrollEventThrottle={200}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                horizontal
                style={
                    {
                        // flex: 1
                        // width: '200%'
                    }
                }
            >
                <View
                    style={{
                        width,
                        position: 'relative',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Image
                        source={cardPromo}
                        style={{
                            width,
                            height,
                            position: 'absolute'
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                            // width: '63%',
                            paddingRight: 10,
                            paddingBottom: 30
                        }}
                    >
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontSize: 29,
                                lineHeight: 31,
                                fontFamily: 'Roboto-Bold',
                                color: colors.white,
                                textAlign: 'left'
                            }}
                        >
                            Já pediu seu{'\n'}cartão Onbank?
                        </Text>
                        <View
                            style={{
                                borderRadius: 13,
                                backgroundColor: 'rgba(0,0,0,.2)',
                                height: 32,
                                width: 250,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5
                            }}
                        >
                            <Image
                                source={handIcon}
                                style={{ marginRight: 9, marginTop: 16 }}
                            />
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontSize: 12,
                                    fontFamily: 'Roboto-Regular',
                                    lineHeight: 14,
                                    color: colors.white
                                }}
                            >
                                Arrasta pro lado e veja os benefícios.
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width,
                        position: 'relative'
                        // alignItems: 'flex-end',
                        // justifyContent: 'flex-end'
                    }}
                >
                    <Image
                        source={cardPromo2}
                        style={{
                            width,
                            height,
                            position: 'absolute'
                        }}
                    />
                    <SafeAreaView>
                        <View
                            style={{
                                paddingLeft: 21,
                                paddingBottom: 30,
                                paddingTop: 30
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                style={{
                                    fontSize: 34,
                                    lineHeight: 36,
                                    fontFamily: 'Roboto-Bold',
                                    color: '#1F5B7E',
                                    textAlign: 'left',
                                    marginBottom: 14
                                    // marginTop: 10
                                }}
                            >
                                Benefícios do seu{'\n'}cartão Onbank:
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius: 10,
                                        borderColor: '#414141',
                                        borderWidth: 2,
                                        width: 20,
                                        height: 20,
                                        marginRight: 6,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={checkIcon}
                                        style={{ width: 15, height: 15 }}
                                    />
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: 19,
                                        lineHeight: 21,
                                        fontFamily: 'Roboto-Regular',
                                        color: '#414141'
                                    }}
                                >
                                    Compra on-line e presencialmente;
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius: 10,
                                        borderColor: '#414141',
                                        borderWidth: 2,
                                        width: 20,
                                        height: 20,
                                        marginRight: 6,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={checkIcon}
                                        style={{ width: 15, height: 15 }}
                                    />
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: 19,
                                        lineHeight: 21,
                                        fontFamily: 'Roboto-Regular',
                                        color: '#414141'
                                    }}
                                >
                                    Pagamento por aproximação;
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius: 10,
                                        borderColor: '#414141',
                                        borderWidth: 2,
                                        width: 20,
                                        height: 20,
                                        marginRight: 6,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={checkIcon}
                                        style={{ width: 15, height: 15 }}
                                    />
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: 19,
                                        lineHeight: 21,
                                        fontFamily: 'Roboto-Regular',
                                        color: '#414141'
                                    }}
                                >
                                    Saque na rede Banco24horas;
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius: 10,
                                        borderColor: '#414141',
                                        borderWidth: 2,
                                        width: 20,
                                        height: 20,
                                        marginRight: 6,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={checkIcon}
                                        style={{ width: 15, height: 15 }}
                                    />
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: 19,
                                        lineHeight: 21,
                                        fontFamily: 'Roboto-Regular',
                                        color: '#414141'
                                    }}
                                >
                                    Sempre que utilizar seu cartão,{'\n'}escolha
                                    a opção crédito;
                                </Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
                <View
                    style={{
                        width,
                        backgroundColor: 'transparent'
                    }}
                />
            </ScrollView>
        </Modal>
    );
};

export default CardPromoModal;
