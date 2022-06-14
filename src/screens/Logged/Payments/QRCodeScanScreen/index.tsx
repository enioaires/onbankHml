import React, { useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Linking
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Store
import { getQRCodeDataAction } from '../../../../store/ducks/qrcode/actions';
import { IApplicationState } from '../../../../store/types';

// Style
import colors from '../../../../styles/colors';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const QRCodeScanScreen: React.FC<PaymentsStackNavigationProps<
    'QRCodeScan'
>> = ({ navigation }: PaymentsStackNavigationProps<'QRCodeScan'>) => {
    const cameraRef = useRef(null);
    const dispatch = useDispatch();

    const loading = useSelector(
        (state: IApplicationState) => state.qrcode.isLoading
    );

    const request = async (url: string) => {
        dispatch(getQRCodeDataAction(url, navigation));
    };

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
                <View style={styles.border}>
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
                                    'Autorize o acesso da sua câmera para que possamos fazer a leitura do QR Code.',
                                    [
                                        {
                                            text: 'Agora não',
                                            onPress: () => navigation.goBack()
                                        },
                                        {
                                            text: 'Autorizar',
                                            onPress: () =>
                                                Linking.openSettings()
                                        }
                                    ]
                                );
                                return null;
                            }
                            return null;
                        }}
                    </RNCamera>
                </View>
            )}
        </View>
    );
};

export default QRCodeScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 100
    },
    camera: {
        // flex: 1,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white'
    },
    border: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        borderRadius: 0,
        marginHorizontal: '12%',
        // height: 320,
        borderWidth: 3,
        borderColor: colors.blue.second,
        padding: 20,
        borderStyle: 'dashed'
    }
});
