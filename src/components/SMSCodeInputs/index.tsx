/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Keyboard, Platform } from 'react-native';

import {
    CodeField,
    Cursor,
    useClearByFocusCell,
    useBlurOnFulfill
} from 'react-native-confirmation-code-field';

// Styles
import colors from '../../styles/colors';

interface IProps {
    value: string;
    setValue(value: string): void;
}

const SMSCodeInputs: React.FC<IProps> = ({ value, setValue }: IProps) => {
    const isIos = Platform.OS === 'ios';
    const ref = useBlurOnFulfill({ value, cellCount: 5 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    useEffect(() => {
        if (value.replace(/\D/g, '').length > 3) Keyboard.dismiss();
    }, [value]);

    return (
        <View style={styles.container}>
            <Text
                allowFontScaling={false}
                style={{
                    width: 42,
                    height: 60,
                    fontSize: 35,
                    backgroundColor: colors.gray.fourth,
                    textAlign: 'center',
                    paddingTop: isIos ? '3.5%' : '2%',
                    marginRight: 8,
                    borderRadius: 5,
                    color: colors.blue.sixth,
                    fontFamily: 'Roboto-Bold'
                }}
            >
                O
            </Text>

            <Text
                allowFontScaling={false}
                style={{
                    fontSize: 32,
                    height: 60,
                    backgroundColor: colors.white,
                    textAlign: 'center',
                    paddingTop: '3%',
                    marginRight: 8,
                    borderRadius: 5,
                    fontFamily: 'Roboto-Bold',
                    color: colors.blue.sixth
                }}
            >
                -
            </Text>

            <CodeField
                ref={ref}
                {...props}
                autoFocus={value.length < 4}
                rootStyle={{
                    flex: 1,
                    height: 60,
                    marginLeft: 5,
                    justifyContent: 'space-between'
                }}
                value={value}
                onChangeText={setValue}
                cellCount={4}
                keyboardType="numeric"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        allowFontScaling={false}
                        key={index}
                        style={[
                            styles.input,
                            { paddingTop: isIos ? '6%' : '4.5%' }
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        flex: 1,
        fontSize: 30,
        backgroundColor: colors.gray.fourth,
        textAlign: 'center',
        marginRight: 8,
        borderRadius: 5,
        color: colors.blue.sixth,
        fontFamily: 'Roboto-Bold'
    }
});

export default SMSCodeInputs;
