import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Keyboard, KeyboardEvent, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import colors from '../../../styles/colors';

// Navigation type
import { HelpStackNavigationProps } from '../../../routes/Auth/types';

const FAQScreen: React.FC<HelpStackNavigationProps<'FAQ'>> = () => {
    const [webRef, setWebRef] = useState<WebView | null>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const keyboardDidShow = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardDidHide = () => {
        setKeyboardHeight(0);
    };

    const didMount = () => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
        };
    };

    useEffect(didMount, []);

    const getUri = () => {
        return `http://onbank-faq-mobile-hml.s3-website-sa-east-1.amazonaws.com/`;
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <SafeAreaView style={{ flex: 1, paddingTop: 100 }}>
                <WebView
                    ref={(r) => setWebRef(r)}
                    automaticallyAdjustContentInsets={false}
                    style={
                        Platform.OS === 'android'
                            ? {
                                  flex: 1,
                                  marginBottom: keyboardHeight
                              }
                            : { flex: 1 }
                    }
                    source={{
                        uri: getUri()
                    }}
                    startInLoadingState
                />
            </SafeAreaView>
        </View>
    );
};

export default FAQScreen;
