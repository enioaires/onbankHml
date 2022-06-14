import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #04040f66;
    height: 10px;
`;

export const AlertConatainer = styled(Animated.View)`
    background-color: #f8f8f8;
    border-radius: 14px;
    max-width: 280px;
    position: absolute;
`;

export const AlertBody = styled.View`
    justify-content: center;
    align-items: center;
    padding: 24px 16px;
`;

export const Title = styled.Text`
    color: #6b953b;
    font-family: 'Roboto-Medium';
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    margin-top: 20px;
`;
export const Description = styled.Text`
    color: #707070;
    font-size: 12px;
    font-family: 'Roboto-Regular';
    text-align: center;
    margin-top: 8px;
`;
export const AlertFooter = styled.View`
    border-top-width: 1px;
    margin-top: 30px;
    border-color: #707070;
`;

export const ButtonAction = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 16px;
`;

export const ButtonText = styled.Text`
    color: #707070;
    font-size: 17px;
    font-family: 'Roboto-Medium';
`;
