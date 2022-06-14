import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { isValidPhone } from '@brazilian-utils/brazilian-utils';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeRechargePhoneNumberAction,
    requestRechargeOperatorsAction,
    clearRechargeStateAction
} from '../../../../store/ducks/recharge/actions';

// Style
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { RechargeStackNavigationProps } from '../../../../routes/Logged/types';

const NumberScreen: React.FC<RechargeStackNavigationProps<'Number'>> = ({
    navigation
}: RechargeStackNavigationProps<'Number'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive } = useIsKeyboardActive();
    const [phoneNumber, loading] = useSelector((state: IApplicationState) => {
        return [
            state.recharge.payload.mobilePhone.phoneNumber,
            state.recharge.isLoading
        ];
    }, shallowEqual);

    const [validation, setValidation] = useState('');

    const onChangeText = (value: string) => {
        dispatch(changeRechargePhoneNumberAction(value));
    };

    const onContinue = () => {
        dispatch(requestRechargeOperatorsAction(navigation));
    };

    useEffect(() => {
        if (
            phoneNumber.replace(/\D/g, '').length > 10 &&
            !isValidPhone(phoneNumber)
        ) {
            setValidation('* Insira um número válido.');
        } else if (validation.length > 0) setValidation('');
    }, [phoneNumber]);

    useEffect(() => {
        return () => {
            dispatch(clearRechargeStateAction());
        };
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <Text allowFontScaling={false} style={styles.label}>
                            Insira o número do telefone,{'\n'}
                            com o DDD, que deseja recarregar
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            type="cel-phone"
                            value={phoneNumber}
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
                        label="Continuar"
                        isLoading={loading}
                        disabled={
                            phoneNumber.replace(/\D/g, '').length !== 11 ||
                            validation.length > 0
                        }
                        onPress={onContinue}
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
