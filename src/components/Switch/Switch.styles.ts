import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity<{
    isActive: boolean;
    backgroundColor?: string;
    width?: number;
    height?: number;
}>`
    background: #cccbcb 0% 0% no-repeat padding-box;
    flex-direction: row;
    padding: 4px;
    border-radius: 11px;
    width: ${({ width }) => width || 44}px;
    justify-content: flex-start;
    ${({ isActive }) =>
        isActive &&
        css`
            justify-content: flex-end;
            background: #34a2bb 0% 0% no-repeat padding-box;
        `}
    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};
        `}
`;

export const Circle = styled.View<{ color?: string; size?: number }>`
    background: #ffffff 0% 0% no-repeat padding-box;
    width: ${({ size }) => size || 15}px;
    height: ${({ size }) => size || 15}px;
    border-radius: ${15 / 2}px;

    ${({ color }) =>
        color &&
        css`
            background-color: ${color};
        `}
`;
