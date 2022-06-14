import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Style
import colors from '../../../styles/colors';
import { paddings } from '../../../styles/paddings';

// Components
import ActionButton from '../../../components/ActionButton';
import InputBlocks from '../../../components/PasswordInputs';

// Store
import { IApplicationState } from '../../../store/types';
import { changeResetPasswordPayloadAction } from '../../../store/ducks/resetPassword/actions';

// Navigation Type
import { ResetPasswordStackNavigationProps } from '../../../routes/Auth/types';

const NewPassword: React.FC<ResetPasswordStackNavigationProps<
    'NewPassword'
>> = ({
    navigation,
    route
}: ResetPasswordStackNavigationProps<'NewPassword'>) => {
    const dispatch = useDispatch();

    const newPassword = useSelector((state: IApplicationState) => {
        return state.resetPassword.newPassword;
    });

    const onPress = () => {
        navigation.push('ResetPassword', {
            screen: 'NewPasswordConfirmation',
            params: { token: route.params?.token }
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.top}>
                    <View>
                        <Text allowFontScaling={false} style={[styles.text]}>
                            Escolha uma nova senha de acesso
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                marginBottom: 65
                            }}
                        >
                            <InputBlocks
                                value={newPassword}
                                setValue={(value) =>
                                    dispatch(
                                        changeResetPasswordPayloadAction(value)
                                    )
                                }
                            />
                        </View>
                        <Text allowFontScaling={false} style={styles.rules}>
                            Utilize essa senha para entrar na sua conta
                        </Text>
                    </View>
                </View>

                <ActionButton
                    label="Próximo"
                    onPress={onPress}
                    disabled={newPassword.length !== 6}
                />
            </SafeAreaView>
        </View>
    );
};

export default NewPassword;

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
