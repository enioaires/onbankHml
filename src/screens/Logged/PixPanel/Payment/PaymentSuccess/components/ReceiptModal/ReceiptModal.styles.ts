import styled from 'styled-components/native';
import colors from '../../../../../../../styles/colors';

interface Props {
    topValue?: boolean;
}

export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    padding-top: 20px;
`;

export const Title = styled.Text`
    color: ${colors.text.second};
    font-family: 'Roboto-Bold';
    font-size: 20px;
    text-align: center;
    margin-top: 8px;
`;

export const SubTitle = styled.Text`
    font-family: 'Roboto-Medium';
    font-size: 13px;
    color: ${colors.text.third};
    text-align: center;
    margin-bottom: 11px;
    margin-top: 9px;
`;

export const TransactionContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 7px;
`;

export const Label = styled.Text`
    color: #707070;
    font-family: 'Roboto-Regular';
    font-size: 14px;
    margin-bottom: 4px;
`;

export const Value = styled.Text<Props>`
    font-family: ${({ topValue }) =>
        !topValue ? 'Roboto-Regular' : 'Roboto-Medium'};
    font-size: 16px;
    color: ${colors.text.second};
    margin-bottom: ${({ topValue }) => (!topValue ? '18px' : '16px')};
`;

export const Card = styled.View`
    background-color: #e8e8e8;
    padding: 11px 20px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    margin-bottom: 16px;
`;

export const CardTitle = styled.Text`
    color: ${colors.blue.primary};
    font-family: 'Roboto-Bold';
    font-size: 16px;
    margin-bottom: 12px;
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
    justify-content: center;
    align-items: center;
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
