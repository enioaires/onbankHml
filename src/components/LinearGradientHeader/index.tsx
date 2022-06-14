import React from 'react';
import {
    StyleSheet
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'

import LinearGradient from 'react-native-linear-gradient';

import colors from '../../styles/colors'


const LinearGradientHeader: React.FC<{children?: any; style?: any, isHeaderStackHeight?: boolean}> = (
    {children, style, isHeaderStackHeight}: {children?: any; style?: any, isHeaderStackHeight?: boolean}
) => {
    const headerStackHeight = useHeaderHeight()

    return (
        <LinearGradient
            style={[ styles.header, style, isHeaderStackHeight && {paddingTop: headerStackHeight}]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.blue.fourth, colors.blue.primary]}
            useAngle
            angle={80}
            angleCenter={{ x: 0.1, y: 0.3 }}
        >
            {children}
        </LinearGradient>
    );
};

export default LinearGradientHeader;

const styles = StyleSheet.create({
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 22,
        paddingVertical: 17
    }
})