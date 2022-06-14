import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    background: #eaeaea 0% 0% no-repeat padding-box;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    flex: 1;
    font: normal normal bold 14px/14px 'Roboto-Regular';
    color: #707070;
    margin-left: 8px;
`;

export const Amount = styled.Text`
    font: normal normal bold 14px/14px 'Roboto-Regular';
    color: #707070;
    margin-right: 8px;
`;

export const ProgressBar = styled.View`
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 10px;
    height: 5px;
    margin-top: 10px;
    position: relative;
`;

export const Progress = styled(Animated.View)`
    position: absolute;
    background: #10779c 0% 0% no-repeat padding-box;
    border-radius: 10px;
    /* width: ${({ width }) => width}%; */
    height: 5px;
`;

export const Label = styled.Text`
    color: #aaaaaa;
    font: normal normal normal 11px 'Roboto-Regular';
    margin-top: 3px;
    text-align: right;
`;
export const Value = styled.Text`
    color: #707070;
    font: normal normal normal 13px 'Roboto-Regular';
`;
