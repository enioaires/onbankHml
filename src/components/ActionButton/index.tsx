import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    TextStyle
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Styles
import colors from '../../styles/colors';

interface IActionButtonProps extends TouchableOpacityProps {
    label: string;
    isLoading?: boolean;
    secondTheme?: boolean;
    icon?: any;
    textStyle?: TextStyle;
}

const ActionButton: React.FC<IActionButtonProps> = ({
    label,
    style,
    disabled,
    onPress,
    secondTheme,
    isLoading,
    icon,
    textStyle,
    ...rest
}: IActionButtonProps) => {
    const buttonContent = () => {
        if (isLoading) {
            return (
                <ActivityIndicator
                    size="small"
                    color={secondTheme ? colors.blue.second : colors.white}
                />
            );
        }

        if (icon) {
            return (
                <>
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{ marginRight: 13, width: 30, height: 28 }}
                    />
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.text,
                            secondTheme
                                ? styles.secondText
                                : styles.primaryText,
                            textStyle
                        ]}
                    >
                        {label}
                    </Text>
                </>
            );
        }
        return (
            <Text
                allowFontScaling={false}
                style={[
                    styles.text,
                    secondTheme ? styles.secondText : styles.primaryText,
                    textStyle
                ]}
            >
                {label}
            </Text>
        );
    };

    return secondTheme ? (
        <TouchableOpacity
            style={[
                styles.container,
                styles.secondContainer,
                icon && { flexDirection: 'row' },
                style
            ]}
            activeOpacity={disabled ? 1 : 0.8}
            onPress={onPress}
            disabled={disabled || isLoading}
            {...rest}
        >
            {buttonContent()}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={{ alignSelf: 'stretch' }}
            activeOpacity={disabled ? 1 : 0.8}
            onPress={onPress}
            disabled={disabled || isLoading}
            {...rest}
        >
            <LinearGradient
                style={[
                    styles.container,
                    icon && { flexDirection: 'row' },
                    style
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={
                    disabled
                        ? [colors.gray.primary, colors.gray.primary]
                        : [colors.blue.fourth, colors.blue.primary]
                }
                useAngle
                angle={120}
                angleCenter={{ x: 0.1, y: 0.3 }}
            >
                {buttonContent()}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        height: 53,
        borderRadius: 10
    },
    primaryContainer: {
        backgroundColor: colors.blue.primary
    },
    secondContainer: {
        backgroundColor: colors.white,
        borderColor: colors.blue.third,
        borderWidth: 1
    },
    text: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium'
    },
    primaryText: {
        color: colors.white
    },
    secondText: {
        color: colors.blue.second
    }
});

export default React.memo(ActionButton);
