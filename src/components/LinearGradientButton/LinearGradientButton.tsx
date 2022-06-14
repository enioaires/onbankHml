import React from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearButton, LinearButtonText } from './LinearGradientButton.styles';
import { LinearGradientButtonProps } from './LinearGradientButton.types';

const LinearGradientButton = (props: LinearGradientButtonProps) => {
    const { onPress, disabled, title, loading } = props;
    return (
        <LinearGradient
            style={{
                height: 55,
                backgroundColor: '#1f5779',
                borderRadius: 10,
                marginTop: 15,
                opacity: disabled || loading ? 0.7 : 1
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#34A2BB', '#1F5779']}
            useAngle
            angle={120}
        >
            <LinearButton onPress={onPress} disabled={disabled || loading}>
                {loading ? (
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    />
                ) : (
                    <LinearButtonText>{title}</LinearButtonText>
                )}
            </LinearButton>
        </LinearGradient>
    );
};

export default LinearGradientButton;
