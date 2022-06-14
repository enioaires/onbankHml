import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components
import api from '../../../../api';
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import { onGetUserData } from '../../../../store/ducks/userData/actions';
import { refreshPromocodeAction } from '../../../../store/ducks/promocode/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { validateEmailInput } from '../../../../utils/helpers';

// Navigation Type
import { InviteStackNavigationProps } from '../../../../routes/Logged/types';

const EmailScreen: React.FC<InviteStackNavigationProps<'Email'>> = ({
    navigation
}: InviteStackNavigationProps<'Email'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const accountId = useSelector(
        (state: IApplicationState) => state.auth.accountId
    );
    const [email, setEmail] = useState('');
    const [validation, setValidation] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeText = (value: string) => {
        setEmail(value);
    };

    const sendInvite = async () => {
        if (!validateEmailInput(email)) {
            Alert.alert('Convite', 'Email inválido.');
        } else {
            setValidation('');
            setLoading(true);
            // Saga Fora
            try {
                const resp = await api.post('/invite/email', {
                    accountId,
                    email
                });

                if (resp.error || resp.statusCode === 500) {
                    if (resp.statusCode === 500) {
                        throw new Error(
                            'Ocorreu um problema. Tente novamente mais tarde.'
                        );
                    }
                    throw new Error(
                        resp.message || 'Algo de errado aconteceu...'
                    );
                }

                dispatch(refreshPromocodeAction());

                Alert.alert('Convite', 'Convite enviado com sucesso!', [
                    {
                        text: 'Ok',
                        onPress: () => {
                            dispatch(onGetUserData());
                            navigation.goBack();
                        }
                    }
                ]);
            } catch (err) {
                Alert.alert('Convite', err.message);
            }
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <Text allowFontScaling={false} style={styles.label}>
                            Insira o e-mail de quem{'\n'}
                            deseja convidar
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoFocus
                            value={email}
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
                        label="Enviar"
                        onPress={sendInvite}
                        disabled={email.length <= 0 || validation.length > 0}
                        isLoading={loading}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default EmailScreen;

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
        justifyContent: 'center'
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
        borderBottomColor: colors.text.third,
        textAlign: 'center',
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 16,
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
