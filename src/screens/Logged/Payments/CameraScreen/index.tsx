import React, { useCallback, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Linking
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Orientation from 'react-native-orientation';
import { useFocusEffect } from '@react-navigation/native';

// Components
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { getBilletDetailsAction } from '../../../../store/ducks/billet/actions';

// Style
import colors from '../../../../styles/colors';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const CameraScreen: React.FC<PaymentsStackNavigationProps<'Camera'>> = ({
    navigation
}: PaymentsStackNavigationProps<'Camera'>) => {
    const dispatch = useDispatch();
    const cameraRef = useRef(null);
    const loading = useSelector(
        (state: IApplicationState) => state.billet.loading
    );

    const onPress = () => {
        navigation.push('Payments', { screen: 'BarCode' });
    };

    const request = (barcode: string) => {
        dispatch(getBilletDetailsAction(barcode, navigation));
    };

    const handleScreen = useCallback(() => {
        Orientation.unlockAllOrientations();
        Orientation.lockToLandscapeLeft();

        return () => {
            Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
        };
    }, []);

    useFocusEffect(handleScreen);

    // useEffect(handleBarCode, [barCode]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    size="large"
                    color={colors.blue.second}
                />
            ) : (
                <RNCamera
                    captureAudio={false}
                    ref={cameraRef}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    // androidCameraPermissionOptions={{
                    //     title: 'Permissão para utilizar a câmera',
                    //     message: 'A Onbank gostaria de utilizar a câmera',
                    //     buttonPositive: 'Ok',
                    //     buttonNegative: 'Cancelar'
                    // }}
                    androidRecordAudioPermissionOptions={null}
                    androidCameraPermissionOptions={null}
                    onBarCodeRead={(e) => {
                        if (e && e.data) {
                            request(e.data);
                        }
                    }}
                >
                    {({ status }) => {
                        // console.log(status);
                        // PermissionsAndroid.check('android.permission.CAMERA');
                        if (
                            status === 'NOT_AUTHORIZED'
                            // Platform.OS === 'ios'
                        ) {
                            Alert.alert(
                                'Acesso Negado',
                                'Autorize o acesso da sua câmera para que possamos fazer a leitura do código de barras.',
                                [
                                    {
                                        text: 'Agora não',
                                        onPress: () =>
                                            navigation.push('Payments', {
                                                screen: 'BarCode'
                                            })
                                    },
                                    {
                                        text: 'Autorizar',
                                        onPress: () => Linking.openSettings()
                                    }
                                ]
                            );
                            return null;
                        }
                        return <View style={styles.line} />;
                    }}
                </RNCamera>
            )}
            <View style={styles.bottom}>
                <Text allowFontScaling={false} style={styles.instructions}>
                    Posicione o código de barras na área acima
                </Text>
                <ActionButton
                    style={styles.button}
                    label="Informar manualmente"
                    textStyle={{
                        color: colors.white
                    }}
                    secondTheme
                    onPress={onPress}
                />
            </View>
        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 90
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 50,
        paddingHorizontal: 30
    },
    line: {
        height: 5,
        backgroundColor: colors.blue.second,
        alignSelf: 'stretch',
        borderRadius: 2
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        width: 500,
        alignSelf: 'center'
    },
    bottom: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 30
    },
    instructions: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: colors.text.third,
        marginBottom: 20
    }
});
