import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../styles/colors';

interface IProgressBarProps {
    totalSteps: number;
    currentStep: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
    totalSteps,
    currentStep
}: IProgressBarProps) => {
    const filledBarWidth = () => {
        if (currentStep === totalSteps) return '100%';
        return `${(currentStep / totalSteps) * 100}%`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.empty} />
            <LinearGradient
                style={[
                    styles.filled,
                    {
                        width: filledBarWidth()
                    }
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.blue.fourth, colors.blue.primary]}
                useAngle
                angle={120}
                angleCenter={{ x: 0.1, y: 0.3 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    empty: {
        flex: 1,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: colors.progressBar.empty
    },
    filled: {
        flex: 1,
        height: 5,
        borderRadius: 2.5,
        position: 'absolute',
        left: 0
    }
});

export default React.memo(ProgressBar);
