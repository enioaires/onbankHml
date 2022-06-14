import styled, { css } from 'styled-components/native';

export const TitleContainer = styled.View`
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-color: #c3c3c3;
`;

export const Title = styled.Text`
    color: #3199b3;
    font-size: 16px;
    font-family: 'Roboto-Bold';
    text-align: center;
`;

export const SectionTitle = styled.Text`
    color: #707070;
    font-size: 13px;
    font-family: 'Roboto-Bold';
    margin: 20px 0;
    text-align: center;
`;

export const OperationTitle = styled.Text`
    color: #707070;
    font-size: 13px;
    font-family: 'Roboto-Bold';
    margin: 20px 0;
    flex: 1;
    margin-left: 8px;
`;

export const ViewModeLabel = styled.Text<{ isActive: boolean }>`
    color: #707070;
    font-family: 'Roboto-Regular';
    font-size: 13px;
    ${({ isActive }) =>
        isActive &&
        css`
            color: #3199b3;
            font-family: 'Roboto-Bold';
        `}
`;
