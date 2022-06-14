import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import InputBlocks from '../../../../components/TransactionPasswordInputs';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { addTransactionPasswordAction } from '../../../../store/ducks/addTransaction/actions';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { AddTransactionPasswordStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const TransactionPasswordConfirmationScreen: React.FC<AddTransactionPasswordStackNavigationProps<
    'PasswordConfirmation'
>> = ({
    navigation
}: AddTransactionPasswordStackNavigationProps<'PasswordConfirmation'>) => {
    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState('');
    const [validation, setValidation] = useState('');
    const [password, loading] = useSelector((state: IApplicationState) => {
        return [
            state.addTransactionPassword.password,
            state.addTransactionPassword.isLoading
        ];
    }, shallowEqual);

    const onPress = () => {
        dispatch(addTransactionPasswordAction(navigation));
    };

    useEffect(() => {
        if (password.length > 3) {
            if (password !== confirmation) {
                setValidation('* As senhas informadas não são iguais.');
            } else {
                setValidation('');
            }
        }
    }, [confirmation, password]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text allowFontScaling={false} style={[styles.text]}>
                        Confirme a{' '}
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: 'Roboto-Medium',
                                color: colors.blue.second
                            }}
                        >
                            senha
                        </Text>{' '}
                        escolhida
                    </Text>
                    <View
                        style={{
                            paddingRight: '28%'
                        }}
                    >
                        <InputBlocks
                            value={confirmation}
                            setValue={(value) => setConfirmation(value)}
                        />
                    </View>
                    {validation.length > 0 && confirmation.length === 4 && (
                        <Text
                            allowFontScaling={false}
                            style={styles.errorMessage}
                        >
                            {validation}
                        </Text>
                    )}
                </View>
                <ActionButton
                    label="Próximo"
                    disabled={confirmation.length < 4 || validation.length > 0}
                    onPress={onPress}
                    isLoading={loading}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: isSmallScreen ? 80 : 80 + 48
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 23,
        marginBottom: 31
    },
    errorMessage: {
        marginTop: 100,
        fontSize: 14,
        lineHeight: 13,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Regular'
    }
});

export default TransactionPasswordConfirmationScreen;
