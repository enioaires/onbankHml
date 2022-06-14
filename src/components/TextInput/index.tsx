import React from 'react';
import {
    TextInput as TextInputComp,
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    TextInputMask,
    TextInputMaskProps,
    TextInputMaskTypeProp
} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Entypo';

const eyeClose = require('../../../assets/icons/new_icons/hide.png');
const eyeOpen = require('../../../assets/icons/new_icons/show.png');

// Styles
import colors from '../../styles/colors';

interface IProps extends Omit<TextInputMaskProps, 'type'> {
    name?: string;
    onChangeText?: (name: string, value: string) => void;
    type?: TextInputMaskTypeProp;
    password?: 'visible' | 'notVisible';
    setPasswordVisible?(): void;
    largeText?: boolean;
    invalid?: boolean;
    loading?: boolean;
    isFullWidth ?: boolean;
}

const TextInput: React.FC<IProps> = ({
    style,
    onChangeText,
    name,
    placeholderTextColor,
    type,
    options,
    password,
    largeText,
    invalid,
    loading,
    setPasswordVisible,
    editable,
    isFullWidth,
    ...rest
}: IProps) => {
    const onChangeTextFn = (value: string) => {
        onChangeText!(name!, value);
    };

    if (type) {
        return (
            <View style={[{ alignSelf: 'stretch'}, isFullWidth && {width: '100%'} ]}>
                <TextInputMask
                    type={type}
                    options={options}
                    onChangeText={(text) => onChangeTextFn(text)}
                    style={[
                        styles.input,
                        largeText && { fontSize: 26 },
                        invalid && styles.invalid,
                        style
                    ]}
                    placeholderTextColor={
                        placeholderTextColor || colors.gray.second
                    }
                    allowFontScaling={false}
                    {...rest}
                    editable={editable}
                />
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color={colors.blue.primary}
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: 15
                        }}
                    />
                )}
            </View>
        );
    }
    return password ? (
        <View
            style={{
                alignSelf: 'stretch'
            }}
        >
            <TextInputComp
                onChangeText={onChangeTextFn}
                style={[
                    styles.input,
                    largeText && { fontSize: 26 },
                    invalid && styles.invalid,
                    style
                ]}
                placeholderTextColor={
                    placeholderTextColor || colors.gray.second
                }
                allowFontScaling={false}
                editable={editable}
                {...rest}
            />
            <TouchableOpacity
                onPress={setPasswordVisible}
                style={{
                    position: 'absolute',
                    right: 24,
                    top: 14
                }}
            >
                <Image
                    source={
                        password === 'notVisible'
                            ? eyeOpen
                            : eyeClose
                    }
                    style={{width: 24, height: 24}}
                />
            </TouchableOpacity>
        </View>
    ) : (
        <TextInputComp
            onChangeText={onChangeTextFn}
            style={[
                styles.input,
                largeText && { fontSize: 26 },
                invalid && styles.invalid,
                style
            ]}
            placeholderTextColor={placeholderTextColor || colors.gray.second}
            allowFontScaling={false}
            editable={editable}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        borderWidth: 1.2,
        borderRadius: 10,
        height: 53,
        borderColor: colors.gray.primary,
        fontFamily: 'Roboto-Medium',
        color: colors.text.primary,
        fontSize: 18,
        paddingLeft: 23,
        minWidth: 5
    },
    invalid: {
        borderColor: colors.red
    }
});

export default React.memo(TextInput);
