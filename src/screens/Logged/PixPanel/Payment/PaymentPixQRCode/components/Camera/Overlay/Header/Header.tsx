import React from 'react';

import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Container } from './Header.styles';

interface HeaderProps {
    onBack: () => void;
    onFlashLight: () => void;
}

const Header = ({ onBack, onFlashLight }: HeaderProps) => {
    return (
        <Container style={{ marginTop: getStatusBarHeight() }}>
            <TouchableOpacity onPress={() => onBack()}>
                <Feather name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onFlashLight()}>
                <MaterialCommunityIcons
                    name="flashlight"
                    size={20}
                    color="#fff"
                />
            </TouchableOpacity>
        </Container>
    );
};

export default Header;
