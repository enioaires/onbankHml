import React from 'react';
import { 
    View,
    ViewStyle,
    StyleSheet 
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack'

// Utils
import { paddings } from '../../styles/paddings'

export const ViewContainerStackPadding: React.FC<{children?: any, style?: ViewStyle}> = (
    {children, style}: {children?: any, style?: ViewStyle}
) => {

    return (
        <View style={[styles.container, {paddingTop: useHeaderHeight()}, style]}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    }
})