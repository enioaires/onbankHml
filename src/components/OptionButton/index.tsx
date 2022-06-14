import React from 'react';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
    View
} from 'react-native';

// Styles
import colors from '../../styles/colors';

interface IProps extends TouchableOpacityProps {
    icon?: any;
    iconStyles?: any;
    title: string;
    description?: string;
    onPress(): void;
    containerStyle?: ViewStyle;
}

const OptionButton: React.FC<IProps> = ({
    icon,
    title,
    description,
    style,
    containerStyle,
    iconStyles = {},
    onPress
}: IProps) => {
    return (
        <TouchableOpacity
            style={[{ alignSelf: 'stretch' }, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[styles.container, containerStyle]}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{ ...styles.icon, ...iconStyles }}
                />
                <Text allowFontScaling={false} style={styles.title}>
                    {title}
                </Text>
                <Text allowFontScaling={false} style={styles.description}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        minHeight: 130,
        paddingHorizontal: 29,
        paddingTop: 21,
        paddingBottom: 23,
        borderRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        shadowColor: '#B1C0DC3F',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 1
    },
    icon: {
        width: 30,
        height: 30
    },
    title: {
        fontSize: 19,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.second,
        // marginTop: 9,
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.second
    }
});

export default React.memo(OptionButton);
