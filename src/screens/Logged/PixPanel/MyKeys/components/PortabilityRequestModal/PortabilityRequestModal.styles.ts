import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const DetailsContainer = styled(Animated.View)`
    padding: 28px;
    padding-bottom: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    background-color: #f8f8f8d1;
`;

export const Title = styled.Text`
    text-align: center;
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 16px;
`;

export const KeyValue = styled.Text`
    color: #10779c;
    font-family: 'Roboto-Bold';
    font-size: 20px;
    margin-bottom: 4px;
`;
export const KeyType = styled.Text`
    color: #707070;
    font-family: 'Roboto-Regular';
`;

export const Status = styled.Text`
    text-align: right;
    color: #3199b3;
    font-family: 'Roboto-Regular';
`;

export const CancelRequest = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 18px;
    margin-left: 10px;
`;
