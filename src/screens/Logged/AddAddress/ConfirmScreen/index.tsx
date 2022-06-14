import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';

// Style
import colors from '../../../../styles/colors';

// Utils
import { requestAddAddressAction } from '../../../../store/ducks/address/actions';

export default function ConfirmScreen({ navigation }: any) {
    const dispatch = useDispatch();

    const [requestLoading, address] = useSelector(
        (state: IApplicationState) => [
            state.address.isLoading,
            state.address.payload
        ],
        shallowEqual
    );

    const onPress = () => {
        dispatch(requestAddAddressAction(navigation));
    };

    return (
        <View style={styles.paddingView}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text allowFontScaling={false} style={styles.title}>
                        Confira seu endereço:
                    </Text>
                    <View style={styles.operatorBox}>
                        <View style={styles.box}>
                            <Text allowFontScaling={false} style={styles.text}>
                                CEP:{' '}
                            </Text>
                            <Text allowFontScaling={false} style={styles.text}>
                                {address.postalCode}
                            </Text>
                        </View>
                        <View style={styles.box}>
                            <Text allowFontScaling={false} style={styles.text}>
                                Rua:{' '}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.text}
                            >{`${address.street}, ${address.number}`}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text allowFontScaling={false} style={styles.text}>
                                Bairro:{' '}
                            </Text>
                            <Text allowFontScaling={false} style={styles.text}>
                                {address.neighborhood}
                            </Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.box}>
                            <Text allowFontScaling={false} style={styles.text}>
                                Cidade:{' '}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.text}
                            >{`${address.city}, ${address.state}`}</Text>
                        </View>
                    </View>
                </View>
                <ActionButton
                    style={{ height: 50 }}
                    label="Confirmar"
                    onPress={onPress}
                    isLoading={requestLoading}
                />
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    paddingView: {
        padding: 20,
        flex: 1
    },
    title: {
        fontSize: 20,
        color: colors.text.primary,
        fontFamily: 'Roboto-Medium',
        marginBottom: 40
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    operatorBox: {
        backgroundColor: colors.white,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    },
    box: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    text: {
        textAlign: 'center',
        paddingTop: 15
    },
    hr: {
        borderBottomColor: colors.text.third,
        borderBottomWidth: 1
    }
});
