import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    TouchableOpacityProps
} from 'react-native';

// Styles
import colors from '../../styles/colors';

interface IProps extends TouchableOpacityProps {
    checked: boolean;
    onChange(): void;
    checkStyle?: {
        color?: string;
        size?: number;
    };
}

const Checkbox: React.FC<IProps> = ({
    checked,
    onChange,
    checkStyle,
    style,
    children
}: IProps) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, style]}
            onPress={onChange}
        >
            <Icon
                name={checked ? 'ios-checkbox' : 'ios-square-outline'}
                size={24}
                color={colors.blue.second}
                {...checkStyle}
            />
            <View>{children}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
});

export default React.memo(Checkbox);
