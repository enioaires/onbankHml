import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    Keyboard
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { isValidPhone } from '@brazilian-utils/brazilian-utils';

// Components
import api from '../../../../api';
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';
import SMSCodeModal from '../../../../containers/SMSCodeModal';

// Store
import { IApplicationState } from '../../../../store/types';
import { sendSMSAction } from '../../../../store/ducks/phoneValidation/actions';
import { closeSuccessModalAction } from '../../../../store/ducks/successModal/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const NumberScreen: React.FC<PerfilStackNavigationProps<'ChangePhone'>> = ({
    navigation
}: PerfilStackNavigationProps<'ChangePhone'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive } = useIsKeyboardActive();
    const phoneNumber = useSelector(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );
    const phoneValidation = useSelector(
        (state: IApplicationState) => state.phoneValidation,
        shallowEqual
    );

    const [phone, setPhone] = useState(phoneNumber);
    const [validation, setValidation] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeText = (value: string) => {
        setPhone(value);
    };

    const onContinue = () => {
        Keyboard.dismiss();
        dispatch(closeSuccessModalAction('Torta'));
        setLoading(true);
        setTimeout(async () => {
            // Saga Fora
            try {
                const resp = await api.get(
                    `/verify/client/phone/${phone.replace(/\D/g, '')}`
                );

                let isClient = false;
                if (resp.error || resp.statusCode === 500) {
                    if (resp.statusCode === 500) {
                        throw new Error(
                            'Ocorreu um problema. Tente novamente mais tarde.'
                        );
                    }
                    if (
                        resp.message ===
                        'Conflito de dados encontrado, entre com contato com nosso suporte!'
                    ) {
                        isClient = true;
                    } else {
                        throw new Error(
                            resp.message || 'Algo de errado aconteceu...'
                        );
                    }
                }

                if (resp.data) {
                    if (resp.data.isClient) {
                        isClient = true;
                    }
                }

                if (isClient) {
                    setValidation('* Telefone já cadastrado.');
                } else {
                    setValidation('');
                    dispatch(sendSMSAction(false, navigation, true, phone));
                }
            } catch (err) {
                // err
            }
            setLoading(false);
        }, 400);
    };

    useEffect(() => {
        if (phone.replace(/\D/g, '').length > 10 && !isValidPhone(phone)) {
            setValidation('* Insira um número válido.');
        } else if (validation.length > 0) setValidation('');
    }, [phone]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <SMSCodeModal
                        navigation={navigation}
                        isLoading={phoneValidation.isLoading}
                        isVisible={phoneValidation.showModal}
                        phone={phone}
                        isPerfil
                    />
                    <View style={styles.top}>
                        <Text allowFontScaling={false} style={styles.label}>
                            Telefone cadastrado
                        </Text>
                        <TextInput
                            style={styles.input}
                            type="cel-phone"
                            value={phone}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        {validation.length > 0 && (
                            <Text
                                allowFontScaling={false}
                                style={styles.validation}
                            >
                                {validation}
                            </Text>
                        )}
                    </View>
                    <ActionButton
                        label="Alterar"
                        onPress={onContinue}
                        isLoading={loading || phoneValidation.isLoading}
                        disabled={
                            phone.replace(/\D/g, '') === phoneNumber ||
                            phone.replace(/\D/g, '').length < 11 ||
                            validation.length > 0
                        }
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default NumberScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '20%'
    },
    label: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: colors.text.third,
        marginBottom: 37,
        textAlign: 'center',
        lineHeight: 23
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        textAlign: 'center',
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 30,
        paddingBottom: 5,
        marginBottom: 15
    },
    validation: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.red,
        marginBottom: 5
    }
});
