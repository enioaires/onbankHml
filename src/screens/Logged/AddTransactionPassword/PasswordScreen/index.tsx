import React, { useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import InputBlocks from '../../../../components/TransactionPasswordInputs';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeAddTransactionPasswordAction,
    clearAddTransactionPasswordAction
} from '../../../../store/ducks/addTransaction/actions';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { AddTransactionPasswordStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const TransactionPasswordScreen: React.FC<AddTransactionPasswordStackNavigationProps<
    'Password'
>> = ({
    navigation
}: AddTransactionPasswordStackNavigationProps<'Password'>) => {
    const password = useSelector(
        (state: IApplicationState) => state.addTransactionPassword.password
    );
    const cardBiz = useSelector(
        (state: IApplicationState) => state.user.data.client.cardBiz
    );
    const dispatch = useDispatch();

    const onChangeText = (value: string) => {
        dispatch(changeAddTransactionPasswordAction(value));
    };

    useEffect(() => {
        return () => {
            dispatch(clearAddTransactionPasswordAction());
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text allowFontScaling={false} style={[styles.text]}>
                        Escolha uma{' '}
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: 'Roboto-Medium',
                                color: colors.blue.second
                            }}
                        >
                            senha{' '}
                            {cardBiz === 'ATIVADO'
                                ? 'do cartão'
                                : 'de transação'}
                        </Text>
                    </Text>
                    <View
                        style={{
                            paddingRight: '28%'
                        }}
                    >
                        <InputBlocks
                            value={password}
                            setValue={(value) => onChangeText(value)}
                        />
                    </View>
                    <Text allowFontScaling={false} style={styles.rules}>
                        Essa senha será utilizada para você realizar
                        movimentações na sua conta
                        {cardBiz === 'ATIVADO'
                            ? ' e utilizar seu cartão Onbank'
                            : ''}
                    </Text>
                </View>
                <ActionButton
                    label="Próximo"
                    disabled={password.length < 4}
                    onPress={() =>
                        navigation.push('AddTransactionPassword', {
                            screen: 'PasswordConfirmation'
                        })
                    }
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
    rules: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 17,
        marginTop: 100,
        color: colors.text.second,
        marginRight: 60
    }
});

export default TransactionPasswordScreen;
