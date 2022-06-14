import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Title = styled.Text`
    font-family: 'Roboto-Medium';
    font-size: 18px;
    color: #707070;
    text-align: center;
`;

export const CodeCell = styled.TouchableOpacity`
    padding: 10px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 44px;
    height: 67px;
`;

export const CodeCellText = styled.Text`
    flex: 1;
    color: #277084;
    font-family: 'Roboto-Bold';
    font-size: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

export const ResendCodeContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    /* padding-bottom: 10px; */
`;

export const RemainingTime = styled.Text`
    color: #707070;
`;
