import React from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

// Store
import { changeDepositTedAccountAction } from '../../../../store/ducks/deposit/actions';
import { IDepositTedAccount } from '../../../../store/ducks/deposit/types';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';
import { IApplicationState } from '../../../../store/types';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Navigation Type
import { DepositStackNavigationProps } from '../../../../routes/Logged/types';

const TedOptionScreen: React.FC<DepositStackNavigationProps<'TedOption'>> = ({
    navigation
}: DepositStackNavigationProps<'TedOption'>) => {
    const dispatch = useDispatch();

    const documentNumber = useSelector(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );
    const clientType = useSelector(
        (state: IApplicationState) => state.user.data.clientType
    );

    const maskedCpf = `******${documentNumber.substring(
        6,
        9
    )}-${documentNumber.substring(9)}`;

    const maskedCnpj = `********/${documentNumber.substring(
        8,
        12
    )}-${documentNumber.substring(12)}`;

    const onPress = (tedAccoun: IDepositTedAccount) => {
        dispatch(changeDepositTedAccountAction(tedAccoun));
        dispatch(
            setAlertMessageAction({
                title: 'Importante!',
                message: `Só serão aceitos depósitos realizados por contas de mesma titularidade da conta Onbank (${
                    clientType === 'CORPORATE'
                        ? `CNPJ: ${maskedCnpj}`
                        : `CPF: ${maskedCpf}`
                })`
            })
        );
        navigation.push('Deposit', { screen: 'BilletTed' });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text allowFontScaling={false} style={styles.title}>
                    Escolha o banco de origem
                </Text>
                <ScrollView>
                    {/* <TouchableOpacity
                        onPress={() =>
                            onPress({
                                icon: 'banco-do-brasil',
                                name: 'Banco do Brasil',
                                account: '33.736-6',
                                branch: '2799-5'
                            })
                        }
                        activeOpacity={0.8}
                        style={styles.box}
                    >
                        <Image
                            source={require('../../../../../assets/icons/banco-do-brasil.png')}
                            resizeMode="contain"
                            style={styles.icon}
                        />
                        <Text allowFontScaling={false} style={[styles.text, { color: '#1A5DAD' }]}>
                            Transferência Banco do Brasil
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            onPress({
                                icon: 'bradesco',
                                name: 'Bradesco',
                                account: '3304-9',
                                branch: '2864'
                            })
                        }
                        activeOpacity={0.8}
                        style={styles.box}
                    >
                        <Image
                            source={require('../../../../../assets/icons/bradesco.png')}
                            resizeMode="contain"
                            style={styles.icon}
                        />
                        <Text allowFontScaling={false} style={[styles.text, { color: '#CF0A2C' }]}>
                            Transferência Bradesco
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            onPress({
                                icon: 'caixa',
                                name: 'Caixa Econômica',
                                account: '00000005-6',
                                branch: '4248'
                            })
                        }
                        activeOpacity={0.8}
                        style={styles.box}
                    >
                        <Image
                            source={require('../../../../../assets/icons/caixa.png')}
                            resizeMode="contain"
                            style={styles.icon}
                        />
                        <Text allowFontScaling={false} style={[styles.text, { color: '#0070AF' }]}>
                            Transferência Caixa Econômica
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            onPress({
                                icon: 'santander',
                                name: 'Santander',
                                account: '13006093-8',
                                branch: '4682'
                            })
                        }
                        activeOpacity={0.8}
                        style={styles.box}
                    >
                        <Image
                            source={require('../../../../../assets/icons/santander.png')}
                            resizeMode="contain"
                            style={styles.icon}
                        />
                        <Text allowFontScaling={false} style={[styles.text, { color: '#E51900' }]}>
                            Transferência Santander
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() =>
                            onPress({
                                icon: 'itau',
                                name: 'Itaú',
                                account: '50869-2',
                                branch: '2928'
                            })
                        }
                        activeOpacity={0.8}
                        style={styles.box}
                    >
                        <Image
                            source={require('../../../../../assets/icons/itau.png')}
                            resizeMode="contain"
                            style={styles.icon}
                        />
                        <Text
                            allowFontScaling={false}
                            style={[styles.text, { color: '#004990' }]}
                        >
                            Transferência Itaú
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default TedOptionScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        flex: 1,
        backgroundColor: colors.white
    },
    safeArea: {
        flex: 1
    },
    box: {
        borderRadius: 10,
        height: 100,
        alignSelf: 'stretch',
        paddingHorizontal: 29,
        justifyContent: 'center',
        backgroundColor: colors.gray.seventh,
        marginBottom: 12
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 10
    },
    text: {
        fontSize: 17,
        fontFamily: 'Roboto-Bold'
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        color: colors.text.third,
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 23
    }
});
