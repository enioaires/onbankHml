import React from 'react';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

// Styles
import colors from '../../styles/colors';

interface IProps extends TouchableOpacityProps {
    title: string;
    description?: string;
    onPress(): void;
}

const OptionButtonGray: React.FC<IProps> = ({
    title,
    description,
    style,
    onPress
}: IProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text allowFontScaling={false} style={styles.title}>
                {title}
            </Text>
            {description && 
                <Text allowFontScaling={false} style={styles.description}>
                    {description}
                </Text>
            }
            <Entypo
                name='chevron-right'
                size={30}
                color={colors.text.fourth}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        minHeight: 70,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: colors.gray.tenth,
        borderWidth: 1,
        borderColor: colors.gray.fourth,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 6
    },
    title: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.text.fourth,
        marginLeft: 30,
        maxWidth: '80%'
    },
    description: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: colors.white
    }
});

export default React.memo(OptionButtonGray);
