import React, { ReactNode } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
    View
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

// Styles
import colors from '../../styles/colors';

interface IProps extends TouchableOpacityProps {
    variableToCheck: boolean;
    children: ReactNode;
    onPress(): any;
}

const OptionButtonCircle: React.FC<IProps> = ({
    style,
    onPress,
    variableToCheck,
    children,
    ...props
}: IProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.valueButton,
                style,
                variableToCheck &&
                { borderColor: colors.blue.second, borderWidth: 1 }
            ]}
            onPress={onPress}
            activeOpacity={0.55}
            {...props}
        >
            <View style={{flex: 1}}>
                {children}
            </View>
            <View 
                style={styles.circle}
            >
                <View 
                    style={{
                        height: 14,
                        width: 14,
                        borderRadius: 8,
                        backgroundColor: 
                            variableToCheck ? 
                            colors.blue.second : 
                            'transparent'
                    }}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    valueButton: {
        minHeight: 75,
        width: '100%',
        backgroundColor: colors.gray.tenth,
        borderRadius: 10,
        paddingRight: 20,
        justifyContent: 'space-between',
        marginBottom: 10,
        borderColor: colors.gray.primary,
        borderWidth: 1,
        flexDirection: 'row'
    },
    circle: {
        borderWidth: 2,
        height: 25,
        width: 25,
        borderColor: colors.blue.second,
        borderRadius: 12.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    }
});

export default React.memo(OptionButtonCircle);