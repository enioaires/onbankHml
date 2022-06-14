import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Store
import { IApplicationState } from '../../store/types';

// Styles
import colors from '../../styles/colors';

interface HmlTagProps {}

// eslint-disable-next-line react/prop-types
const HmlTag: React.FC<HmlTagProps> = ({ children }) => {
    const isHmlMode = useSelector(
        (state: IApplicationState) => state.auth.hmlMode
    );

    return (
        <View style={styles.container}>
            {isHmlMode && (
                <View style={[styles.tag, children ? { marginRight: 5 } : {}]}>
                    <Text allowFontScaling={false} style={styles.text}>
                        HML
                    </Text>
                </View>
            )}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {
        backgroundColor: colors.text.invalid,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 25
    },
    text: {
        color: colors.white,
        fontSize: 13,
        fontFamily: 'Roboto-bold'
    }
});

export default React.memo(HmlTag);
