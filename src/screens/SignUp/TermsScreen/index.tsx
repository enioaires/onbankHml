import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const TermsScreen: React.FC<SignUpStackNavigationProps<'Terms'>> = ({
    route
}: SignUpStackNavigationProps<'Terms'>) => {
    const { webView } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, paddingTop: 100 }}>
                <WebView
                    style={{ flex: 1 }}
                    source={{
                        uri: `https://onbank-api-v2-master.s3-sa-east-1.amazonaws.com/${webView}/index.html`
                    }}
                    startInLoadingState
                />
            </SafeAreaView>
        </View>
    );
};

export default TermsScreen;
