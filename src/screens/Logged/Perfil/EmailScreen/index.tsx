import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    Alert,
    Keyboard
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import api from '../../../../api';
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import { updateUserDataAction } from '../../../../store/ducks/updateData/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { validateEmailInput } from '../../../../utils/helpers';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const ChangeEmailScreen: React.FC<PerfilStackNavigationProps<
    'ChangeEmail'
>> = ({ navigation }: PerfilStackNavigationProps<'ChangeEmail'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive } = useIsKeyboardActive();
    const email = useSelector(
        (state: IApplicationState) => state.user.data.client.email
    );
    const loading = useSelector(
        (state: IApplicationState) => state.updateData.isLoading
    );

    const [newEmail, setNewEmail] = useState(email);
    const [validation, setValidation] = useState('');
    const [searchEmailLoading, setSearchEmailLoading] = useState(false);

    const onChangeText = (name: string, value: string) => {
        setNewEmail(value);
    };

    const onContinue = () => {
        if (!validateEmailInput(newEmail)) {
            Alert.alert('Email', 'Email inválido.');
        } else {
            setValidation('');
            Keyboard.dismiss();
            setSearchEmailLoading(true);
            setTimeout(async () => {
                // Saga Fora
                try {
                    const resp = await api.get(
                        `/verify/client/email/${newEmail}`
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
                        setValidation('* Email já cadastrado.');
                    } else {
                        setValidation('');
                        navigation.push('Perfil', {
                            screen: 'ValidateAccess',
                            params: {
                                action: () =>
                                    dispatch(
                                        updateUserDataAction({
                                            email: newEmail
                                        })
                                    )
                            }
                        });
                    }
                } catch (err) {
                    // err
                }
                setSearchEmailLoading(false);
            }, 300);
        }
    };

    useEffect(() => {
        if (validation.length > 0) {
            setValidation('');
        }
    }, [newEmail]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <Text allowFontScaling={false} style={styles.label}>
                            E-mail cadastrado
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            value={newEmail}
                            name="newEmail"
                            onChangeText={(name, value) =>
                                onChangeText(name, value)
                            }
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
                        disabled={
                            newEmail.length <= 0 ||
                            validation.length > 0 ||
                            newEmail.toUpperCase() === email.toUpperCase()
                        }
                        isLoading={loading || searchEmailLoading}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChangeEmailScreen;

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
