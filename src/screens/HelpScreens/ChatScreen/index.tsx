import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Keyboard, KeyboardEvent, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import queryString from 'query-string';
import { useSelector, shallowEqual } from 'react-redux';

// Store
import { IApplicationState } from 'src/store/types';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { HelpStackNavigationProps } from '../../../routes/Auth/types';

const ChatScreen: React.FC<HelpStackNavigationProps<'Chat'>> = () => {
    const [token, id, name, email, documentNumber] = useSelector(
        (state: IApplicationState) => {
            return [
                state.auth.token,
                state.user.data.accountHolderId,
                state.user.data.client.name,
                state.user.data.client.email,
                state.user.data.client.taxIdentifier.taxId
            ];
        },
        shallowEqual
    );

    const tel = useSelector(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );
    const address = useSelector(
        (state: IApplicationState) => state.user.data.billingAddress,
        shallowEqual
    );

    const [webRef, setWebRef] = useState<WebView | null>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const keyboardDidShow = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardDidHide = (e: KeyboardEvent) => {
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
        if (token) {
            const data = {
                accountHolderId: id,
                name,
                documentNumber,
                email,
                cel: tel,
                address,
                key: 'AFPEfdsKFS7kd6AJfs34'
            };

            const stringified = queryString.stringify(data);

            return `http://onbank-chat-mobile-hml.s3-website-sa-east-1.amazonaws.com/?${stringified}`;
        }
        return `http://onbank-chat-mobile-hml.s3-website-sa-east-1.amazonaws.com/`;
    };

    const handleStatusBarHeight = () => {
        if (keyboardHeight !== 0 && StatusBar.currentHeight) {
            if (StatusBar.currentHeight > 24) {
                return StatusBar.currentHeight
            }else{
                return 24
            }
        }else{
            return 0
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <SafeAreaView style={{ flex: 1, paddingTop: 100 }}>
                <KeyboardAvoidingView
                    behavior={Platform.select({ ios: 'padding', android: 'padding' })}
                    enabled
                    contentContainerStyle={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
                    style={{ flexGrow: 1 }}
                >
                    <WebView
                        ref={(r) => setWebRef(r)}
                        automaticallyAdjustContentInsets={false}
                        /* style={
                            Platform.OS === 'android'
                                ? {
                                    flex: 1,
                                }
                                : { flex: 1 }
                        } */
                        source={{
                            uri: getUri()
                        }}
                        startInLoadingState
                        scrollEnabled={Platform.OS === 'ios' ? false : true}
                        // onHttpError={(e) => console.log('end', e)}
                        // onError={(e) => console.log(e)}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

export default ChatScreen;
