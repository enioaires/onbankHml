import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useSelector, useDispatch } from 'react-redux';

// Components
import api from '../../../../api';
import InputBlocks from '../../../../components/PasswordInputs';
import TransactionSuccessModal from '../../../../containers/TransactionSuccessModal';

// Store
import { IApplicationState } from '../../../../store/types';
import { saveKeychainCredentialsAction } from '../../../../store/ducks/auth/actions';
import { updateUserPhoneAction } from '../../../../store/ducks/updateData/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const ValidateAccessPasswordScreen: React.FC<
    PerfilStackNavigationProps<'ValidateAccess'>
> = ({ navigation, route }: PerfilStackNavigationProps<'ValidateAccess'>) => {
    const { action, phone, code, oldPhoneNumber, registerKey } = route.params;
    const dispatch = useDispatch();

    const accountId = useSelector(
        (state: IApplicationState) => state.auth.accountId
    );

    const modal = useSelector(
        (state: IApplicationState) => state.successModal.modal.visible
    );

    const updateLoading = useSelector(
        (state: IApplicationState) => state.updateData.isLoading
    );
    const passwordLoading = useSelector(
        (state: IApplicationState) => state.password.isLoading
    );
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading
    );
    const documentNumber = useSelector(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );

    useEffect(() => {
        // code here
    }, [modal]);

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const verifyPassword = async () => {
        setLoading(true);
        // Saga Fora
        try {
            const resp: any = await api.post('/accessPassword/validate', {
                accountId,
                accessPassword: password
            });

            // console.log('validate access', JSON.stringify(resp, null, 2));

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 403 || resp.statusCode === 401) {
                    setLoading(false);
                    const isRevalidate = resp.message.match(/Token expirado./g);

                    dispatch(
                        setAlertMessageAction({
                            title: 'Aten????o',
                            message: isRevalidate
                                ? 'Sua sess??o expirou!\nEntre em sua conta novamente.'
                                : 'Entre em sua conta novamente.',
                            type: 'error',
                            logout: !isRevalidate,
                            revalidate: isRevalidate
                        })
                    );
                    return;
                }
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema.\nTente novamente mais tarde.'
                    );
                }
                throw new Error(
                    resp.message ||
                        'Ocorreu um problema.\nTente novamente mais tarde.'
                );
            }

            if (phone) {
                dispatch(
                    updateUserPhoneAction({
                        phoneNumber: phone.replace(/\D/g, ''),
                        code,
                        oldPhoneNumber
                    })
                );
            } else if (registerKey) {
                await Keychain.setGenericPassword(
                    documentNumber.replace(/\D/g, ''),
                    password,
                    { service: 'br.com.onbank.mobile-keychain' }
                );
                dispatch(
                    saveKeychainCredentialsAction({
                        password,
                        username: documentNumber.replace(/\D/g, ''),
                        service: 'br.com.onbank.mobile-keychain',
                        storage: 'keychain'
                    })
                );
                navigation.pop();
            } else {
                action();
            }
        } catch (err) {
            dispatch(
                setAlertMessageAction({
                    title: 'Oops',
                    message:
                        err.message ||
                        'Ocorreu um prolema.\nTente novamente mais tarde.',
                    type: 'error'
                })
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        if (password.length > 5) {
            verifyPassword();
        }
    }, [password]);

    // useFocusEffect(() => {
    //     if (phone) {
    //         dispatch(closeSMSModalAction());
    //     }
    // });

    return (
        <>
            <TransactionSuccessModal navigation={navigation} noReceiptMode />
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <Text allowFontScaling={false} style={[styles.text]}>
                        Digite a{' '}
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: 'Roboto-Medium',
                                color: colors.blue.second
                            }}
                        >
                            senha de acesso
                        </Text>
                        {'\n'}
                        atual, para confirmar a altera????o
                    </Text>
                    <View>
                        <InputBlocks
                            value={password}
                            setValue={(value) => setPassword(value)}
                        />
                    </View>
                    {(loading ||
                        updateLoading ||
                        passwordLoading ||
                        insuranceLoading) && (
                        <ActivityIndicator
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            size="large"
                            color={colors.blue.second}
                        />
                    )}
                </SafeAreaView>
            </View>
        </>
    );
};

export default ValidateAccessPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: 80 + 48
    },
    safeArea: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 23,
        marginBottom: 31
    }
});
