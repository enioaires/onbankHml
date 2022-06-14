import styled from 'styled-components/native';
import colors from '../../../../../../styles/colors';

export const Container = styled.View`
    margin-top: 50px;
    flex: 1;
    margin-bottom: 150px;
`;

export const Title = styled.Text`
    color: #707070;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Roboto-Regular';
    text-align: center;
`;

export const QuickFunctionsContainer = styled.View`
    margin-bottom: 40px;
`;
export const QuickFunction = styled.TouchableOpacity`
    flex-direction: row;
    padding: 12px;
    border-bottom-width: 1px;
    border-color: ${colors.blue.second}66;
`;

export const QuickFunctionName = styled.Text`
    margin-left: 8px;
    color: ${colors.blue.second};
    font-size: 14px;
    flex: 1;
`;
