import styled, { css } from 'styled-components/native';

export const Title = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    text-align: center;
`;

export const KeyName = styled.Text`
    color: #10779c;
    font-family: 'Roboto-Bold';
    font-size: 20px;
`;
export const KeyType = styled.Text`
    color: #707070;
    font-family: 'Roboto-Regular';
    font-size: 13px;
    margin-top: 8px;
`;

export const Action = styled.TouchableOpacity<{ hasBorder?: boolean }>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 16px 0;
    ${({ hasBorder }) =>
        hasBorder &&
        css`
            border-bottom-width: 1px;
            border-color: #ffffff;
        `}
`;

export const ActionName = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 18px;
    flex: 1;
    margin-left: 8px;
`;
