import styled from 'styled-components/native';

export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 24px;
`;

export const Title = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 18px;
    text-align: center;
    margin-top: 8px;
`;

export const TransactionContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

export const Label = styled.Text`
    color: #707070;
    font-family: 'Roboto-Regular';
    font-size: 12px;
`;

export const Value = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 15px;
    margin-top: 4px;
`;

export const Card = styled.View`
    background-color: #e8e8e8;
    padding: 11px 20px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    margin-top: 10px;
`;
export const CardTitle = styled.Text`
    color: #339eb7;
    font-family: 'Roboto-Bold';
`;

export const ShareButton = styled.TouchableOpacity`
    flex-direction: row;
    border: 2px solid #3094af;
    border-radius: 8px;
    padding: 18px 0;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;
export const ShareButtonText = styled.Text`
    color: #3097b1;
    font-family: 'Roboto-Bold';
    font-size: 15px;
    margin-right: 8px;
`;

export const TransactionCodeContainer = styled.View`
    padding: 20px 0;
    border-color: #dbdbdb;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
`;

export const TransactionCodeTitle = styled.Text`
    color: #707070;
    font-size: 16px;
    font-family: 'Roboto-Bold';
`;

export const TransactionCode = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 12px;
    margin-top: 5px;
`;

export const ObankFooterText = styled.Text`
    color: #b7b7b7;
    font-family: 'Roboto-Regular';
    text-align: center;
    margin-top: 5px;
`;
