import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Store
import { IApplicationState } from '../../../store/types';
import { requestResetPasswordAction } from '../../../store/ducks/resetPassword/actions';

// Style
import colors from '../../../styles/colors';
import { paddings } from '../../../styles/paddings';

// Components
import ActionButton from '../../../components/ActionButton';
import InputBlocks from '../../../components/PasswordInputs';
import AlertModal from '../../../containers/AlertModal';

// Navigation Type
import { ResetPasswordStackNavigationProps } from '../../../routes/Auth/types';

const NewPasswordConfirmation: React.FC<ResetPasswordStackNavigationProps<
    'NewPasswordConfirmation'
>> = ({
    navigation,
    route
}: ResetPasswordStackNavigationProps<'NewPasswordConfirmation'>) => {
    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState('');
    const [validation, setValidation] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const newPassword = useSelector(
        (state: IApplicationState) => state.resetPassword.newPassword
    );
    const loading = useSelector(
        (state: IApplicationState) => state.resetPassword.isLoading
    );

    const onPress = () => {
        dispatch(requestResetPasswordAction(setShowAlert, route.params.token));
    };

    useEffect(() => {
        if (confirmation.length === 6 && confirmation !== newPassword) {
            setValidation('* As senhas informadas não são iguais.');
        } else if (validation.length > 0) {
            setValidation('');
        }
    }, [confirmation]);

    return (
        <>
            <AlertModal
                buttonProps={{
                    label: 'Entrar',
                    action: () =>
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{ name: 'OnBoarding' }, { name: 'Login' }]
                        // }),
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }]
                        }),
                    closeAlert: () => setShowAlert(false)
                }}
                message="Senha de acesso alterada com sucesso!"
                title=""
                showAlert={showAlert}
                icon={require('../../../../assets/icons/success.png')}
            />
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text]}
                            >
                                Confirme sua nova senha de acesso
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    marginBottom: 65
                                }}
                            >
                                <InputBlocks
                                    value={confirmation}
                                    setValue={(value) => setConfirmation(value)}
                                />
                            </View>
                            {validation.length > 0 && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.errorMessage}
                                >
                                    {validation}
                                </Text>
                            )}
                            <Text allowFontScaling={false} style={styles.rules}>
                                Essa senha será utilizada para você entrar em
                                sua conta Onbank
                            </Text>
                        </View>
                    </View>

                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        isLoading={loading}
                        disabled={
                            validation.length > 0 || confirmation.length !== 6
                        }
                    />
                </SafeAreaView>
            </View>
        </>
    );
};

export default NewPasswordConfirmation;

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
    },
    rules: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 17,
        marginTop: 15,
        color: colors.text.second,
        marginRight: 60
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    },
    description: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        lineHeight: 17,
        color: colors.text.third,
        marginTop: 18,
        marginRight: 20
    }
});
