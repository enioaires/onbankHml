import React, { useEffect, useState, useCallback } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';

// Components
import SMSCodeInputs from '../../components/SMSCodeInputs';

// Style
import colors from '../../styles/colors';

// Store
import { IApplicationState } from '../../store/types';
import {
    closeSMSModalAction,
    didSendSMSFailAction,
    sendSMSAction,
    validateSMSCodeAction
} from '../../store/ducks/phoneValidation/actions';

// Utils
import { maskPhoneNumber } from '../../utils/prettiers';

// Types
import { PerfilStackNavigationProps } from '../../routes/Logged/types';

interface IProps {
    isLoading: boolean;
    isVisible: boolean;
    navigation: PerfilStackNavigationProps<'ChangePhone'>['navigation'];
    phone: string;
    isPerfil?: boolean;
    routeContext?: string;
}

export default function SMSCodeModal({
    isLoading,
    isVisible,
    navigation,
    phone,
    isPerfil,
    routeContext
}: IProps) {
    const dispatch = useDispatch();
    const timeToWait = useSelector(
        (state: IApplicationState) => state.phoneValidation.timeToWait
    );

    const [timer, setTimer] = useState(0);
    const [clock, setClock] = useState<any>(null);
    const showTimer = (value: number) => {
        const [hours, minutes, seconds] = numeral(value)
            .format('00:00:00')
            .split(':');

        if ((hours === '00' || hours === '0') && minutes === '00') {
            if (parseInt(seconds, 10) > 9) {
                return `${seconds} segundos`;
            }
            return `${seconds.substring(1)} segundos`;
        }

        if ((hours === '00' || hours === '0') && minutes !== '00') {
            if (parseInt(minutes, 10) > 9) {
                return `${minutes}m ${seconds} segundos`;
            }
            return `${minutes.substring(1)}m ${seconds} segundos`;
        }

        if (parseInt(hours, 10) > 9) {
            return `${hours}h ${minutes}m ${seconds} segundos`;
        }
        return `${minutes.substring(1)}h ${minutes}m ${seconds} segundos`;
    };

    const [code, setCode] = useState('');

    const goBack = useCallback(() => {
        dispatch(didSendSMSFailAction());
        dispatch(closeSMSModalAction());
    }, [dispatch]);

    const resend = useCallback(() => {
        setCode('');
        if (isPerfil) {
            dispatch(sendSMSAction(true, navigation, true, phone));
        } else {
            dispatch(
                sendSMSAction(
                    true,
                    navigation,
                    undefined,
                    undefined,
                    routeContext
                )
            );
        }
    }, [dispatch, isPerfil, navigation, phone, routeContext]);

    const validateSMSCode = useCallback(() => {
        if (isPerfil) {
            dispatch(validateSMSCodeAction(code, navigation, true, phone));
        } else {
            dispatch(
                validateSMSCodeAction(
                    code,
                    navigation,
                    undefined,
                    undefined,
                    routeContext
                )
            );
        }
    }, [code, navigation, phone, dispatch, isPerfil, routeContext]);

    useEffect(() => {
        if (code.length > 3) {
            setTimeout(() => {
                validateSMSCode();
            }, 500);
        }
    }, [code]);

    const clearClock = useCallback(() => clearInterval(clock), [clock]);

    useEffect(() => {
        if (timeToWait) {
            clearClock();
            setTimer(Math.floor(timeToWait / 1000));
            const interval = setInterval(
                () => setTimer((oldstate: number) => oldstate - 1),
                1000
            );
            setClock(interval);
        }
    }, [timeToWait]);

    useEffect(() => {
        return () => clearClock();
    }, [clearClock]);

    return (
        <Modal
            isVisible={isVisible}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
            onModalHide={() => setCode('')}
        >
            <View style={styles.container}>
                <Text allowFontScaling={false} style={styles.title}>
                    Código de Verificação
                </Text>
                <Text allowFontScaling={false} style={styles.text}>
                    Enviamos um SMS para o celular {'\n'}
                    {maskPhoneNumber(phone)} {'\n'}
                    Informe abaixo o código recebido
                </Text>
                <View style={{ marginBottom: 100 }}>
                    <SMSCodeInputs
                        value={code}
                        setValue={(value) => setCode(value)}
                    />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color={colors.blue.sixth} />
                ) : (
                    <>
                        <TouchableOpacity onPress={resend} disabled={timer > 0}>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.resend,
                                    timer > 0 && {
                                        color: colors.text.smsModel
                                    }
                                ]}
                            >
                                Reenviar
                                {timer > 0 && (
                                    <Text
                                        allowFontScaling={false}
                                        style={{
                                            fontSize: 15,
                                            fontFamily: 'Roboto-Regular'
                                        }}
                                    >
                                        {' '}
                                        em {showTimer(timer)}
                                    </Text>
                                )}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goBack}>
                            <Text allowFontScaling={false} style={styles.back}>
                                Voltar
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 36,
        paddingBottom: 17,
        borderRadius: 11,
        paddingLeft: 36,
        paddingRight: 45,
        backgroundColor: colors.white,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    },
    title: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginBottom: 17,
        textAlign: 'center',
        color: colors.text.smsModel
    },
    text: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        marginBottom: 17,
        textAlign: 'center',
        color: colors.text.smsModel,
        lineHeight: 20
    },
    resend: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginBottom: 10,
        textAlign: 'center',
        color: colors.blue.second
    },
    back: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.text.smsModel
    },
    timer: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.text.smsModel,
        marginBottom: 10
    }
});
