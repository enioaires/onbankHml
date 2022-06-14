import React, { useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

// Style
import colors from '../../../../styles/colors';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const SelfieCameraScreen: React.FC<PerfilStackNavigationProps<
    'SelfieCamera'
>> = ({ navigation }: PerfilStackNavigationProps<'SelfieCamera'>) => {
    const cameraRef = useRef<any>(null);

    const takePicture = async () => {
        if (cameraRef?.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef?.current!.takePictureAsync(options);

            navigation.push('Perfil', {
                screen: 'Preview',
                params: { image: data.uri, upload: 'selfie' }
            });
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                captureAudio={false}
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: 'Permissão para utilizar a câmera',
                    message: 'A Onbank gostaria de utilizar a câmera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancelar'
                }}
            />
            <TouchableOpacity
                style={{
                    alignSelf: 'center',
                    marginTop: 50
                }}
                onPress={takePicture}
            >
                <Icon size={35} color={colors.white} name="camera" />
            </TouchableOpacity>
        </View>
    );
};

export default SelfieCameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 90,
        paddingBottom: 50
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white'
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
    }
});
