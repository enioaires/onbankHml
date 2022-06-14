import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header/Header';
import Center from './Center/Center';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    }
});

interface OverlayProps {
    onBack: () => void;
    onFlashLight: () => void;
}
const Overlay = ({ onBack, onFlashLight }: OverlayProps) => {
    return (
        <View style={[styles.container]}>
            <Header onBack={onBack} onFlashLight={onFlashLight} />
            <Center />
        </View>
    );
};

export default Overlay;
