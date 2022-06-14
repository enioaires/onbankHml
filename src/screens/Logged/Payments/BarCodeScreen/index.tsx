import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard,
    Clipboard,
    AppState,
    AppStateStatus
} from 'react-native';
// import { isValidBoleto } from '@brazilian-utils/brazilian-utils';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import { getBilletDetailsAction } from '../../../../store/ducks/billet/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { PaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const BarCodeScreen: React.FC<PaymentsStackNavigationProps<'BarCode'>> = ({
    navigation
}: PaymentsStackNavigationProps<'BarCode'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive } = useIsKeyboardActive();
    const loading = useSelector(
        (state: IApplicationState) => state.billet.loading
    );
    const [inputValue, setInputValue] = useState('');

    const onChangeText = (value: string) => {
        setInputValue(value);

        // if (!isValidBoleto(value)) {
        //     if (validationMessage.length <= 0) {
        //         setValidationMessage('* Código inválido');
        //     }
        // } else {
        //     setValidationMessage('');
        // }
    };

    const onPress = async () => {
        Keyboard.dismiss();

        const billetNumber = inputValue.replace(/\D/g, '');

        dispatch(getBilletDetailsAction(billetNumber, navigation));
    };

    const getCopiedCode = async () => {
        const copied = await Clipboard.getString();
        // console.log(
        //     'copia',
        //     copied.trim().replace(/\D/g, ''),
        //     'input',
        //     inputValue,
        //     inputValue.trim().replace(/\D/g, '')
        // );
        if (
            copied &&
            copied.trim().replace(/\D/g, '') !==
                inputValue.trim().replace(/\D/g, '') &&
            copied.trim().replace(/\D/g, '').length > 46
        ) {
            // console.log(
            //     'copia',
            //     copied.trim().replace(/\D/g, ''),
            //     inputValue.trim().replace(/\D/g, '')
            // );
            setTimeout(() => {
                setInputValue(copied.trim().replace(/\D/g, ''));
                showMessage({
                    message: 'Identificado',
                    description: 'Linha digitável colada',
                    backgroundColor: colors.blue.second,
                    icon: 'success'
                });
            }, 1000);
        }
    };

    const appState = useRef(AppState.currentState);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            getCopiedCode();
        }

        appState.current = nextAppState;
    };

    const didMount = () => {
        getCopiedCode();
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    };

    useEffect(didMount, []);

    // useEffect(() => {
    //     AppState.addEventListener('change', handleAppStateChange);

    //     return () => {
    //         AppState.removeEventListener('change', handleAppStateChange);
    //     };
    // }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 15 }]}
                behavior="padding"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text allowFontScaling={false} style={styles.title}>
                            Informe a linha digitável
                        </Text>
                        <TextInput
                            style={[styles.input]}
                            multiline
                            numberOfLines={4}
                            autoFocus
                            name="barCode"
                            value={inputValue}
                            type="custom"
                            keyboardType="number-pad"
                            options={{
                                mask:
                                    inputValue.replace(/\D/g, '').length < 48
                                        ? '99999.99999 99999.999999 99999.999999 9 999999999999999'
                                        : '99999999999-9 99999999999-9 99999999999-9 99999999999-9'
                            }}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        {/* {validationMessage.length > 0 &&
                            inputValue.replace(/\D/g, '').length > 46 && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.errorMessage}
                                >
                                    {validationMessage}
                                </Text>
                            )} */}
                    </View>
                    <ActionButton
                        label="Continuar"
                        onPress={onPress}
                        disabled={inputValue.replace(/\D/g, '').length < 47}
                        isLoading={loading}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default BarCodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 24,
        marginBottom: 25,
        textAlign: 'center'
    },
    input: {
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 0,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        // backgroundColor: 'pink',
        marginHorizontal: isSmallScreen ? 30 : 50,
        alignSelf: 'center',
        height: 'auto',
        minWidth: '50%',
        minHeight: '50%',
        textAlignVertical: 'top'
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 14,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Medium',
        marginHorizontal: 30,
        textAlign: 'center'
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 40,
        paddingHorizontal: 20
    },
    balanceContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: 30
    },
    balanceText: {
        fontSize: 16,
        color: colors.gray.fourth,
        fontFamily: 'Roboto-Medium',
        lineHeight: 30
    }
});
