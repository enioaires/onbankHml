import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
    CodeField,
    Cursor,
    useClearByFocusCell,
    useBlurOnFulfill
} from 'react-native-confirmation-code-field';

// Styles
import colors from '../../styles/colors';

const eyeClose = require('../../../assets/icons/new_icons/hide.png');
const eyeOpen = require('../../../assets/icons/new_icons/show.png');

interface IProps {
    value: string;
    setValue(value: string): void;
}

const InputBlocks: React.FC<IProps> = ({ value, setValue }: IProps) => {
    const ref = useBlurOnFulfill({ value, cellCount: 7 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (value.replace(/\D/g, '').length > 5) Keyboard.dismiss();
    }, [value]);

    return (
        <View style={styles.container}>
            <CodeField
                ref={ref}
                {...props}
                autoFocus={value.length < 6}
                rootStyle={{
                    flex: 1,
                    height: 60,
                    marginRight: 5,
                    justifyContent: 'space-between'
                }}
                value={value}
                onChangeText={setValue}
                cellCount={6}
                keyboardType="numeric"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        allowFontScaling={false}
                        key={index}
                        style={[
                            styles.input,
                            visible && !isFocused && { paddingTop: '5%' }
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol && visible ? (
                            <Icon
                                name="controller-record"
                                size={28}
                                color={colors.blue.second}
                            />
                        ) : symbol && !visible ? (
                            symbol
                        ) : isFocused ? (
                            <Cursor />
                        ) : null}
                    </Text>
                )}
            />

            <TouchableOpacity
                style={{
                    width: 40,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 0
                }}
                onPress={() => setVisible((oldstate: boolean) => !oldstate)}
            >
                <Image
                    source={visible ? eyeOpen : eyeClose}
                    style={{ width: 24, height: 24 }}
                />
            </TouchableOpacity>
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
        fontSize: 28,
        borderWidth: 1,
        borderColor: colors.gray.second,
        textAlign: 'center',
        paddingTop: '3%',
        marginRight: 5,
        borderRadius: 5,
        color: colors.blue.second
    }
});

export default InputBlocks;
