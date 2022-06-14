import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { SafeAreaView, Text, StyleSheet, View, Image } from 'react-native';
// import numeral from 'numeral';
// import ImagePicker from 'react-native-image-picker';

// Components
// import ActionButton from '../../../../components/ActionButton';

// Store
// import api from '../../../../api';
import { IApplicationState } from '../../../../store/types';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { DepositStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallDevice = isDeviceSmallScreen();

const BilletTedScreen: React.FC<DepositStackNavigationProps<
    'BilletTed'
>> = () => {
    const tedAccount = useSelector(
        (state: IApplicationState) => state.deposit.tedAccount,
        shallowEqual
    );
    const documentNumber = useSelector(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );
    const clientType = useSelector(
        (state: IApplicationState) => state.user.data.clientType
    );

    // const [loading, setLoading] = useState(false);

    const isPJ = clientType === 'CORPORATE';
    const maskedCpf = `******${documentNumber.substring(
        6,
        9
    )}-${documentNumber.substring(9)}`;

    const maskedCnpj = `********/${documentNumber.substring(
        8,
        12
    )}-${documentNumber.substring(12)}`;

    const requireIcon = () => {
        let icon: any;

        switch (tedAccount?.icon) {
            case 'banco-do-brasil':
                icon = require('../../../../../assets/icons/banco-do-brasil.png');
                break;
            case 'bradesco':
                icon = require('../../../../../assets/icons/bradesco.png');
                break;
            case 'caixa':
                icon = require('../../../../../assets/icons/caixa.png');
                break;
            case 'santander':
                icon = require('../../../../../assets/icons/santander.png');
                break;
            case 'itau':
                icon = require('../../../../../assets/icons/itau.png');
                break;
            default:
                break;
        }

        return icon;
    };

    // const sendImage = () => {
    //     Keyboard.dismiss();
    //     ImagePicker.showImagePicker(
    //         {
    //             title: 'Enviar comprovante',
    //             takePhotoButtonTitle: 'Tirar foto',
    //             chooseFromLibraryButtonTitle: 'Escolher da galeria',
    //             cancelButtonTitle: 'Cancelar',
    //             cameraType: 'front',
    //             mediaType: 'photo',
    //             permissionDenied: {
    //                 title: 'Permissão negada',
    //                 text:
    //                     'Para tirar foto ou escolher da galera é preciso que nos permita acesso',
    //                 reTryTitle: 'Tentar novamente',
    //                 okTitle: 'Ok'
    //             }
    //         },
    //         async (response) => {
    //             Keyboard.dismiss();
    //             if (response.didCancel) {
    //                 Keyboard.dismiss();
    //                 return;
    //             }
    //             if (response.error) {
    //                 Keyboard.dismiss();
    //             } else {
    //                 Keyboard.dismiss();
    //                 setLoading(true);
    //                 try {
    //                     const data = new FormData();

    //                     data.append('file', {
    //                         name: response.fileName || 'image.jpg',
    //                         uri: response.uri,
    //                         type: response.type || 'image/jpeg'
    //                     });

    //                     const resp: any = await api.post(
    //                         `/deposit/upload/${accountId}`,
    //                         data,
    //                         false,
    //                         {
    //                             Accept: 'application/json',
    //                             'Content-Type': 'multipart/form-data'
    //                         }
    //                     );

    //                     if (resp && resp.error) {
    //                         Keyboard.dismiss();
    //                         throw new Error(
    //                             'Não foi possível enviar a imagem.'
    //                         );
    //                     }
    //                     Keyboard.dismiss();
    //                     Alert.alert('Comprovante', 'Imagem enviada!');
    //                 } catch (err) {
    //                     Keyboard.dismiss();
    //                     Alert.alert(
    //                         'Comprovante',
    //                         'Não foi possível enviar a imagem.'
    //                     );
    //                 } finally {
    //                     Keyboard.dismiss();
    //                     setLoading(false);
    //                 }
    //             }
    //         }
    //     );
    // };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <View style={styles.infoBox}>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.title,
                                { marginBottom: isSmallDevice ? 17 : 15 }
                            ]}
                        >
                            Transfira para a conta abaixo
                        </Text>
                        <Text allowFontScaling={false} style={styles.alertText}>
                            Só serão aceitos depósitos realizados por contas de
                            mesma titularidade da conta Onbank (
                            {isPJ ? `CNPJ: ${maskedCnpj}` : `CPF: ${maskedCpf}`}
                            )
                        </Text>
                        <View style={styles.nameContainer}>
                            <Image
                                source={requireIcon()}
                                resizeMode="contain"
                                style={styles.icon}
                            />
                            <Text allowFontScaling={false} style={styles.name}>
                                {tedAccount?.name}
                            </Text>
                        </View>
                        {/* <View style={styles.accountInfo}>
                            <Text allowFontScaling={false} style={styles.label}>
                                Valor:
                            </Text>
                            <Text allowFontScaling={false} style={styles.value}>
                                {numeral(value).format('$ 0,0.00')}
                            </Text>
                        </View> */}
                        <View style={styles.accountInfo}>
                            <Text allowFontScaling={false} style={styles.label}>
                                Agência:
                            </Text>
                            <Text allowFontScaling={false} style={styles.value}>
                                {tedAccount?.branch}
                            </Text>
                        </View>
                        <View style={styles.accountInfo}>
                            <Text allowFontScaling={false} style={styles.label}>
                                Conta corrente:
                            </Text>
                            <Text allowFontScaling={false} style={styles.value}>
                                {tedAccount?.account}
                            </Text>
                        </View>
                        <View style={styles.accountInfo}>
                            <Text allowFontScaling={false} style={styles.label}>
                                CNPJ
                            </Text>
                            <Text allowFontScaling={false} style={styles.value}>
                                32.914.717/0001-35
                            </Text>
                        </View>
                        <Text
                            allowFontScaling={false}
                            style={[styles.value, { marginBottom: 40 }]}
                        >
                            Onbank Soluções Financeiras
                        </Text>
                    </View>
                </View>
                {/* <ActionButton
                    label="Enviar foto do comprovante"
                    onPress={sendImage}
                    isLoading={loading}
                /> */}
            </SafeAreaView>
        </View>
    );
};

export default BilletTedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop: 80 + 10
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    infoBox: {
        backgroundColor: colors.gray.seventh,
        marginBottom: isSmallDevice ? 23 : 50,
        borderRadius: 10,
        paddingHorizontal: 35,
        alignItems: 'center',
        paddingTop: isSmallDevice ? 22 : 40
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 21,
        color: colors.text.second,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: colors.text.third,
        textAlign: 'center',
        lineHeight: 16,
        marginBottom: 25
    },
    nameContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: 28
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    name: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: colors.text.second
    },
    accountInfo: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginBottom: isSmallDevice ? 20 : 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.text.third
    },
    value: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        color: colors.text.second
    },
    alertText: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30
    }
});
