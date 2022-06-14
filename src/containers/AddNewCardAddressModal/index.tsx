import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Alert,
    FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import api from '../../api';

// Store
import { IApplicationState } from '../../store/types';
import {
    changeCardInputAddressPayloadAction,
    addNewCardAction
} from '../../store/ducks/wallet/actions';
import { ICardAddressData } from '../../store/ducks/wallet/types';

// Styles
import colors from '../../styles/colors';

const addNewCardAddresIcon = require('../../../assets/icons/address-card.png');
const addressIcon = require('../../../assets/icons/address.png');
const addAddressIcon = require('../../../assets/icons/add-address.png');

interface IProps {
    closeAlert(value: boolean): void;
    showAlert: boolean;
    navigation: any;
    feature: null | 'Payment' | 'QRCodeConfirmation';
}

const AddNewCardAddressModal: React.FC<IProps> = ({
    showAlert,
    closeAlert,
    navigation,
    feature
}: IProps) => {
    const [
        city,
        complement,
        country,
        neighborhood,
        number,
        postalCode,
        state,
        street
    ] = useSelector((appState: IApplicationState) => {
        return [
            appState.user.data.billingAddress.cidade,
            appState.user.data.billingAddress.complemento,
            appState.user.data.billingAddress.pais,
            appState.user.data.billingAddress.bairro,
            appState.user.data.billingAddress.numero,
            appState.user.data.billingAddress.cep,
            appState.user.data.billingAddress.estado,
            appState.user.data.billingAddress.logradouro
        ];
    }, shallowEqual);

    const [address, setAddress] = useState<any[]>([]);

    const dispatch = useDispatch();

    const getAddress = async () => {
        // Saga Fora
        try {
            const resp = await api.get(`/card/address`);

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema. Tente novamente mais tarde.'
                    );
                }
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }

            const myAddress = {
                city,
                complement,
                country,
                neighborhood,
                number,
                postalCode,
                state,
                street
            };

            const addresses = [myAddress];

            resp.data.forEach((ad: ICardAddressData) => {
                if (
                    ad.city.toLowerCase() !== myAddress.city.toLowerCase() ||
                    ad.complement.toLowerCase() !==
                        myAddress.complement.toLowerCase() ||
                    ad.country.toLowerCase() !==
                        myAddress.country.toLowerCase() ||
                    ad.neighborhood.toLowerCase() !==
                        myAddress.neighborhood.toLowerCase() ||
                    ad.number.toLowerCase() !==
                        myAddress.number.toLowerCase() ||
                    ad.state.toLowerCase() !== myAddress.state.toLowerCase() ||
                    ad.street.toLowerCase() !==
                        myAddress.street.toLowerCase() ||
                    ad.postalCode.replace(/\D/g, '') !==
                        myAddress.postalCode.replace(/\D/g, '')
                ) {
                    addresses.push(ad);
                }
            });

            setAddress(addresses);
        } catch (err) {
            Alert.alert('Cartão', err.message);
        }
    };

    const onPress = (item: ICardAddressData) => {
        closeAlert(false);
        dispatch(changeCardInputAddressPayloadAction('city', item.city));
        dispatch(changeCardInputAddressPayloadAction('country', item.country));
        dispatch(
            changeCardInputAddressPayloadAction('complement', item.complement)
        );
        dispatch(changeCardInputAddressPayloadAction('state', item.state));
        dispatch(changeCardInputAddressPayloadAction('number', item.number));
        dispatch(
            changeCardInputAddressPayloadAction('postalCode', item.postalCode)
        );
        dispatch(changeCardInputAddressPayloadAction('street', item.street));
        dispatch(
            changeCardInputAddressPayloadAction(
                'neighborhood',
                item.neighborhood
            )
        );
        setTimeout(() => {
            dispatch(addNewCardAction(navigation, feature));
        }, 400);
    };

    return (
        <Modal
            isVisible={showAlert}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
            onBackdropPress={() => closeAlert(false)}
            onModalWillShow={getAddress}
        >
            <View style={styles.container}>
                <LinearGradient
                    style={[styles.iconContainer]}
                    colors={[colors.blue.fourth, colors.blue.primary]}
                    useAngle
                    angle={120}
                    angleCenter={{ x: 0.1, y: 0.3 }}
                >
                    <Image
                        source={addNewCardAddresIcon}
                        resizeMode="contain"
                        style={{
                            width: 110,
                            height: 110
                        }}
                    />
                </LinearGradient>

                <Text allowFontScaling={false} style={styles.title}>
                    Selecione o endereço do cartão
                </Text>

                <FlatList
                    style={{ height: 170 }}
                    data={address}
                    renderItem={({ item, index }: any) => (
                        <TouchableOpacity
                            style={[
                                styles.buttonContainer,
                                index === 0 && { borderTopWidth: 0.6 }
                            ]}
                            onPress={() => onPress(item)}
                        >
                            <Image
                                source={addressIcon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 23
                                }}
                            />
                            <Text
                                allowFontScaling={false}
                                style={styles.address}
                            >
                                {item.street}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        closeAlert(false);
                        setTimeout(() => {
                            navigation.push('Wallet', {
                                screen: 'NewAddressZipcode',
                                params: { feature }
                            });
                        }, 900);
                    }}
                >
                    <Image
                        source={addAddressIcon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            marginRight: 23
                        }}
                    />
                    <Text allowFontScaling={false} style={styles.newAddress}>
                        Adicionar novo endereço
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 11,
        backgroundColor: colors.white,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    },
    iconContainer: {
        height: 115,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11
    },
    icon: {
        width: 78,
        height: 43
    },
    title: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        marginVertical: 22,
        color: colors.text.third,
        marginLeft: 35
    },
    useAddressBox: {
        alignSelf: 'stretch',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    useAddress: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.second
    },
    buttonContainer: {
        alignSelf: 'stretch',
        borderBottomWidth: 0.6,
        borderColor: colors.text.third,
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 35
    },
    address: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.second
    },
    newAddress: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth
    }
});

export default React.memo(AddNewCardAddressModal);
