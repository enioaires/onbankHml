import styled from 'styled-components/native';

export const Title = styled.Text`
    color: #3199b3;
    font-family: 'Roboto-Bold';
    font-size: 16px;
    text-align: center;
`;

export const AccountHolderItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 1px;
    padding-bottom: 15px;
    border-color: #c3c3c3;
    margin-bottom: 15px;
`;
export const Label = styled.Text`
    color: #707070;
    flex: 1;
    margin-left: 8px;
    font-family: 'Roboto-Regular';
    font-size: 14px;
`;

export const AmountInputContainer = styled.View`
    margin-top: 40px;
    flex-direction: row;
    align-items: flex-end;
    border-bottom-width: 1px;
    flex: 1;
    border-color: #c3c3c3;
    justify-content: center;
    padding-left: 20px;
`;

export const ReceiveInfo = styled.Text`
    color: #707070;
    font-family: 'Roboto-Regular';
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
`;
