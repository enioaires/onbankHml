import React, { useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { SafeAreaView, Text, StyleSheet, View, Image } from 'react-native';
import ViewShot from 'react-native-view-shot';

// Store
import { IApplicationState } from '../../../../store/types';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Navigation Type
import { ReceiveStackNavigationProps } from '../../../../routes/Logged/types';

const QrCodeScreen: React.FC<ReceiveStackNavigationProps<'QRCode'>> = () => {
    const viewshotRef = useRef<any>(null);
    const [QRCode, description] = useSelector((state: IApplicationState) => {
        return [state.receiveBACKUP.data.url, state.receiveBACKUP.payload.description];
    }, shallowEqual);



    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <ViewShot
                        ref={viewshotRef}
                        options={{ quality: 0.9, format: 'jpg' }}
                    >
                        <Text allowFontScaling={false} style={styles.text}>
                            Mostre o QR Code{'\n'}
                            abaixo ao pagador
                        </Text>
                        <Image
                            source={{ uri: QRCode }}
                            resizeMode="cover"
                            style={{
                                width: 250,
                                height: 250,
                                marginBottom: 50,
                                alignSelf: 'center'
                            }}
                        />
                        <Text allowFontScaling={false} style={styles.value}>
                            {description}
                        </Text>
                    </ViewShot>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingTop: 80 + 80
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    box: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        shadowColor: 'black',
        shadowOpacity: 0.16,
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 4,
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 24,
        marginBottom: 60,
        textAlign: 'center',
        lineHeight: 30
    },
    label: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5
    },
    value: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 25
    }
});

export default QrCodeScreen;
