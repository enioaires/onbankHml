import { addMinutes } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
    View,
    Keyboard,
    Platform,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../store/types';
import LinearGradientButton from '../LinearGradientButton/LinearGradientButton';
import ModalBottom from '../ModalBottom/ModalBottom';
import {
    CodeCell,
    CodeCellText,
    RemainingTime,
    ResendCodeContainer,
    Title
} from './ModalConfirmCode.styles';
import { ModalConfirmCodeProps } from './ModalConfirmCode.types';

const { height } = Dimensions.get('screen');
const ModalConfirmCode = (props: ModalConfirmCodeProps) => {
    const {
        onClose,
        isOpen,
        onPressConfirm,
        timeToResendCode,
        disableButton,
        loading,
        title,
        onClickResendCode,
        textButton
    } = props;
    const [value, setValue] = useState('');
    const [timer, setTimer] = useState('');

    useEffect(() => {
        const countDownDate = addMinutes(
            new Date(),
            timeToResendCode
        ).getTime();

        const x = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance > 0) {
                const formatedSeconds = seconds > 9 ? seconds : `0${seconds}`;
                setTimer(
                    `${
                        minutes <= 9 ? `0${minutes}` : minutes
                    }:${formatedSeconds}`
                );
            }

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
            }
        }, 1000);
        return () => clearInterval(x);
    }, [timeToResendCode]);

    const ref = useBlurOnFulfill({ value, cellCount: 6 });
    const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });
    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );

    useEffect(() => {
        if (value.replace(/\D/g, '').length > 5) Keyboard.dismiss();
    }, [value]);

    const handlePressConfirm = (code: string) => () => {
        Keyboard.dismiss();
        onPressConfirm(code);
    };

    useEffect(() => {
        if (isOpen && !hasErrorMessage) {
            setValue('');
        }
    }, [isOpen, hasErrorMessage]);

    return (
        <ModalBottom
            onClose={onClose}
            bodyHeight={height * 0.37}
            isOpen={isOpen && !hasErrorMessage}
        >
            <View style={{ flex: 1 }}>
                <Title>{title}</Title>
                <View style={{ marginVertical: 14 }}>
                    <CodeField
                        onFocus={() => console.log('FOCUS')}
                        ref={ref}
                        {...codeFieldProps}
                        autoFocus
                        rootStyle={{
                            flex: 1,
                            height: 60,
                            marginLeft: 6
                            // justifyContent: 'space-between'
                        }}
                        value={value}
                        onChangeText={setValue}
                        cellCount={6}
                        keyboardType="numeric"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <CodeCell
                                style={{
                                    paddingTop:
                                        Platform.OS === 'ios' ? '4.8%' : '4%'
                                }}
                                onPress={() =>
                                    console.log(ref?.current?.focus())
                                }
                            >
                                <CodeCellText
                                    allowFontScaling={false}
                                    key={index}
                                    onLayout={getCellOnLayoutHandler(index)}
                                >
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </CodeCellText>
                            </CodeCell>
                        )}
                    />
                </View>
                <ResendCodeContainer>
                    <TouchableOpacity
                        disabled={timer !== '00:00'}
                        onPress={onClickResendCode}
                    >
                        <RemainingTime>
                            {timer !== '00:00'
                                ? `Enviar novamente em ${timer}`
                                : 'Enviar novamente'}
                        </RemainingTime>
                    </TouchableOpacity>
                </ResendCodeContainer>
            </View>

            <LinearGradientButton
                loading={loading}
                disabled={disableButton || value.length < 6}
                title={textButton || 'Confirmar'}
                onPress={handlePressConfirm(value)}
            />
        </ModalBottom>
    );
};

export default ModalConfirmCode;
