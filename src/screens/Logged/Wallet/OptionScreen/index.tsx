import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Components
import ActionButton from '../../../../components/ActionButton';
import CreditCard from '../../../../components/CreditCard';
import ActionSheet from '../../../../components/ActionSheet';

// Store
import { IApplicationState } from '../../../../store/types';
import { ICardData } from '../../../../store/ducks/wallet/types';
import {
    getCardsAction,
    removeCardAction,
    turnDefaultCardAction
} from '../../../../store/ducks/wallet/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Navigation Type
import { WalletStackNavigationProps } from '../../../../routes/Logged/types';

const OptionScreen: React.FC<WalletStackNavigationProps<'Option'>> = ({
    navigation
}: WalletStackNavigationProps<'Option'>) => {
    const buttonIcon = require('../../../../../assets/icons/close-black.png');
    const checkIcon = require('../../../../../assets/icons/main-card.png');
    const carouselRef = useRef(null);

    const [activeSlide, setActiveSlide] = useState(0);
    const [modalShow, setModalShow] = useState<ICardData | null>(null);

    const [cards, loading] = useSelector((state: IApplicationState) => {
        return [state.wallet.data, state.wallet.isLoading];
    }, shallowEqual);

    const dispatch = useDispatch();

    const didMount = () => {
        dispatch(getCardsAction());
    };

    useEffect(didMount, []);

    const onPressCard = (card: ICardData) => {
        setModalShow(card);
    };

    if (loading) {
        return (
            <ActivityIndicator
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                size="large"
                color={colors.blue.second}
            />
        );
    }

    const turnDefaultCard = () => {
        const currentCard = modalShow!;

        if (currentCard.standard) {
            setModalShow(null);
            Alert.alert('Esse cartão já é o padrão');
            return;
        }

        dispatch(turnDefaultCardAction(currentCard.id));
        setModalShow(null);
    };

    const removeCard = () => {
        const currentCard = modalShow!;

        if (currentCard.standard && cards.length > 1) {
            Alert.alert('', 'Não é possível remover o cartão padrão', [
                {
                    text: 'OK',
                    onPress: () => setModalShow(null)
                }
            ]);
            return;
        }

        dispatch(removeCardAction(currentCard.id));
        setModalShow(null);
    };

    return (
        <>
            <ActionSheet
                visible={!!modalShow}
                onClose={() => setModalShow(null)}
                buttons={
                    cards.length > 1 && !modalShow?.standard
                        ? [
                              {
                                  label: 'Tornar padrão',
                                  onClick: () => turnDefaultCard(),
                                  icon: checkIcon
                              },
                              {
                                  label: 'Remover cartão',
                                  onClick: () => removeCard(),
                                  icon: buttonIcon
                              }
                          ]
                        : [
                              {
                                  label: 'Remover cartão',
                                  onClick: () => removeCard(),
                                  icon: buttonIcon
                              }
                          ]
                }
            />
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.cardsContainer}>
                        {cards.length === 0 && (
                            <View
                                style={[
                                    styles.carouselBox,
                                    {
                                        alignItems: 'center',
                                        paddingHorizontal: 17
                                    }
                                ]}
                            >
                                <CreditCard emptyCard />
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.emptyCardText,
                                        { marginTop: 20, textAlign: 'center' }
                                    ]}
                                >
                                    Você não possui nenhum cartão cadastrado.
                                    {'\n'}
                                    Cadastre um cartão de crédito.
                                </Text>
                            </View>
                        )}
                        {cards.length > 0 && (
                            <View style={styles.carouselBox}>
                                <Carousel
                                    ref={carouselRef}
                                    useScrollView
                                    // loop
                                    // loopClonesPerSide={2}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={
                                        Dimensions.get('window').width - 50
                                    }
                                    data={cards}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => onPressCard(item)}
                                        >
                                            <CreditCard
                                                gradient={index}
                                                key={item.cardNumber}
                                                cardData={item}
                                            />
                                            {item.standard && (
                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: -10,
                                                        width: '100%',
                                                        alignItems: 'center',
                                                        elevation: 5
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                '#62A9FC',
                                                            height: 30,
                                                            width: 30,
                                                            borderRadius: 40,
                                                            justifyContent:
                                                                'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('../../../../../assets/icons/check.png')}
                                                            style={{
                                                                height: 20,
                                                                width: 20
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    onSnapToItem={(index) =>
                                        setActiveSlide(index)
                                    }
                                    firstItem={0}
                                />
                                <Pagination
                                    dotsLength={cards.length}
                                    activeDotIndex={activeSlide}
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -20,
                                        width: '100%',
                                        alignItems: 'center'
                                    }}
                                    dotContainerStyle={{
                                        marginHorizontal: 2.5
                                    }}
                                    dotStyle={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 10
                                    }}
                                    dotColor="#727272"
                                    inactiveDotColor="#C4C0C0"
                                    inactiveDotOpacity={1}
                                    carouselRef={carouselRef as any}
                                    tappableDots={!!carouselRef}
                                />
                            </View>
                        )}
                    </View>
                    <ActionButton
                        style={{
                            marginLeft: 25,
                            marginRight: 25,
                            marginTop: 30
                        }}
                        label="Adicionar novo cartão"
                        onPress={() =>
                            navigation.push('Wallet', {
                                screen: 'NewCard',
                                params: { feature: null }
                            })
                        }
                    />
                </SafeAreaView>
            </View>
        </>
    );
};

export default OptionScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        paddingRight: 0,
        paddingLeft: 0,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    emptyCardText: {
        color: colors.text.second,
        fontFamily: 'Roboto-Bold',
        fontSize: 14
    },
    detailText: {
        color: colors.text.third,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10
    },
    carouselBox: {
        alignSelf: 'stretch',
        borderRadius: 10,
        height: 240
    }
});
