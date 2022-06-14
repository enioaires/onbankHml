import styled from 'styled-components/native';

export const OperationTitle = styled.Text`
    color: #707070;
    font-size: 13px;
    font-family: 'Roboto-Bold';
    margin: 20px 0;
    flex: 1;
    margin-left: 8px;
`;

export const ViewModeLabel = styled.Text`
    font-size: 13px;
    color: #3199b3;
    font-family: 'Roboto-Bold';
`;

export const PeriodLabel = styled.Text`
    color: #707070;
    font: normal normal normal 13px 'Roboto-Regular';
`;

export const MaxAmount = styled.Text`
    color: #10779c;
    font: normal normal bold 14px 'Roboto';
`;

export const Label = styled.Text<{ alignRight?: boolean }>`
    color: #aaaaaa;
    font: normal normal normal 11px 'Roboto-Regular';
    margin-top: 3px;
    text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
`;
export const Value = styled.Text`
    color: #707070;
    font: normal normal bold 14px 'Roboto';
`;
