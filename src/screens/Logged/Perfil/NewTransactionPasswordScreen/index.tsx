import React, { useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import ActionButton from '../../../../components/ActionButton';
import InputBlocks from '../../../../components/TransactionPasswordInputs';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changePasswordStateAction,
    clearPasswordStateAction
} from '../../../../store/ducks/password/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const NewTransactionPasswordScreen: React.FC<
    PerfilStackNavigationProps<'NewTransactionPassword'>
> = ({ navigation }: PerfilStackNavigationProps<'NewTransactionPassword'>) => {
    const dispatch = useDispatch();

    const value = useSelector(
        (state: IApplicationState) => state.password.newPassword
    );

    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );

    const onPress = () => {
        navigation.push('Perfil', {
            screen: 'NewTransactionPasswordConfirmation'
        });
    };

    useEffect(() => {
        return () => {
            dispatch(clearPasswordStateAction());
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.top}>
                    <View>
                        <Text allowFontScaling={false} style={[styles.text]}>
                            Escolha uma nova senha{' '}
                            {cardBiz === 'ATIVADO'
                                ? 'do cartão'
                                : 'de transação'}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                marginBottom: 65,
                                width: '70%'
                            }}
                        >
                            <InputBlocks
                                value={value}
                                setValue={(value) =>
                                    dispatch(
                                        changePasswordStateAction(
                                            'newPassword',
                                            value
                                        )
                                    )
                                }
                            />
                        </View>
                    </View>
                </View>

                <ActionButton
                    label="Continuar"
                    onPress={onPress}
                    disabled={value.length !== 4}
                />
            </SafeAreaView>
        </View>
    );
};

export default NewTransactionPasswordScreen;

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
