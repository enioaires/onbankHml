import { Animated } from 'react-native';
import styled, { css } from 'styled-components/native';
import colors from '../../../../../../styles/colors';

export const DetailsContainer = styled(Animated.View)`
    padding: 28px;
    padding-bottom: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    background-color: #fff;
`;

export const KeyType = styled.Text`
    color: #10779c;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Roboto-Regular';
`;
export const KeyValue = styled.Text`
    font-family: 'Roboto-Regular';
    color: #707070;
    font-size: 13px;
`;

export const Action = styled.TouchableOpacity<{ noBoder?: boolean }>`
    flex-direction: row;
    align-items: center;
    padding: 24px 0;
    ${({ noBoder }) =>
        !noBoder &&
        css`
            border-bottom-width: 1px;
            border-color: ${colors.gray.fourth};
        `}
`;
export const ActionName = styled.Text`
    flex: 1;
    margin-left: 15px;
    color: ${colors.blue.second};
`;

export const DeleteButton = styled.TouchableOpacity`
    flex-direction: row;
`;
export const DeleteButtonText = styled.Text`
    color: #d32d2d;
    font-size: 14px;
    font-family: 'Roboto-Regular';
    margin-left: 10px;
`;
