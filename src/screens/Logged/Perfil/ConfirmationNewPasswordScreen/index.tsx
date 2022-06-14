import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import ActionButton from '../../../../components/ActionButton';
import InputBlocks from '../../../../components/PasswordInputs';

// Store
import { IApplicationState } from '../../../../store/types';
import { changePasswordStateAction } from '../../../../store/ducks/password/actions';
import { sendSMSPasswordAction } from '../../../../store/ducks/phoneValidation/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const ConfirmationNewPasswordScreen: React.FC<PerfilStackNavigationProps<
    'NewAccessPasswordConfirmation'
>> = ({
    navigation
}: PerfilStackNavigationProps<'NewAccessPasswordConfirmation'>) => {
    const dispatch = useDispatch();

    const [newPassword, value, loading] = useSelector(
        (state: IApplicationState) => {
            return [
                state.password.newPassword,
                state.password.confirmationPassword,
                state.password.isLoading
            ];
        },
        shallowEqual
    );

    const phoneNumber = useSelector(
        (state: IApplicationState) =>
            state.user.data.account.mobilePhone.phoneNumber
    );

    const [validation, setValidation] = useState('');

    const onPress = () => {
        navigation.push('Perfil', {
            screen: 'ValidateAccess',
            params: {
                action: () =>
                    dispatch(
                        sendSMSPasswordAction(false, navigation, phoneNumber)
                    ),
                loadingPassword: loading,
                fromAccessPassword: true
            }
        });
    };

    useEffect(() => {
        if (value !== newPassword) {
            setValidation('* As senhas informadas não são iguais.');
        } else {
            setValidation('');
        }
    }, [value]);

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text]}
                            >
                                Confirme a nova senha
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    marginBottom: 65
                                }}
                            >
                                <InputBlocks
                                    value={value}
                                    setValue={(value) =>
                                        dispatch(
                                            changePasswordStateAction(
                                                'confirmationPassword',
                                                value
                                            )
                                        )
                                    }
                                />
                            </View>
                            {validation.length > 0 && value.length === 6 && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.errorMessage}
                                >
                                    {validation}
                                </Text>
                            )}
                        </View>
                    </View>

                    <ActionButton
                        label="Continuar"
                        onPress={onPress}
                        disabled={validation.length > 0 || value.length <= 0}
                        isLoading={loading}
                    />
                </SafeAreaView>
            </View>
        </>
    );
};

export default ConfirmationNewPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: 80 + 48
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 31,
        lineHeight: 19
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 14,
        lineHeight: 13,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Regular'
    }
});
