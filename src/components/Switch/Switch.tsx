/* eslint-disable react/require-default-props */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Circle, Container } from './Switch.styles';

interface SwitchProps {
    onChange: (isActive: boolean) => void;
    isActive: boolean;
    width?: number;
    height?: number;
    circleSize?: number;
    circleColor?: string;
    switchBackground?: string;
    disabled?: boolean;
    loading?: boolean;
}
const Switch = ({
    onChange,
    isActive,
    width,
    height,
    circleSize,
    circleColor,
    switchBackground,
    disabled,
    loading
}: SwitchProps) => {
    const handleToggle = () => {
        onChange(!isActive);
    };
    return (
        <Container
            disabled={disabled || loading}
            backgroundColor={switchBackground}
            width={width}
            height={height}
            onPress={handleToggle}
            isActive={isActive}
        >
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Circle color={circleColor} size={circleSize} />
            )}
        </Container>
    );
};

export default Switch;
