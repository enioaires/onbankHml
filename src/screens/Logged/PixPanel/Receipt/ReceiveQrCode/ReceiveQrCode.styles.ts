import styled from 'styled-components/native';

export const Title = styled.Text`
    color: #3199b3;
    font-family: 'Roboto-Bold';
    font-size: 16px;
    text-align: center;
`;

export const QrCodeContainer = styled.View`
    border: 2px solid #10779c;
    border-radius: 10px;
    width: 188px;
    height: 194px;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-top: 20px;
    padding: 10px;
`;

export const QrCodeInfo = styled.Text`
    font: normal normal normal 11px 'Roboto';
    letter-spacing: 0px;
    color: #707070;
    text-align: center;
    margin-top: 10px;
`;

export const GeneratePixCopyPasteButton = styled.TouchableOpacity`
    flex-direction: row;
    background: #e8e8e8 0% 0% no-repeat padding-box;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const GeneratePixCopyPasteText = styled.Text`
    font: normal normal bold 13px/14px Roboto;
    letter-spacing: 0px;
    color: #707070;
    padding: 25px 0;
    margin-left: 8px;
`;

export const ShareButton = styled.TouchableOpacity`
    border-radius: 8px;
    padding: 18px 0;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;
export const ShareButtonText = styled.Text`
    color: #10779c;
    font-family: 'Roboto-Bold';
    font-size: 20px;
    margin-top: 10px;
`;

export const EditBillButton = styled.TouchableOpacity`
    margin-bottom: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    padding: 25px;
    flex-direction: row;
    justify-content: space-between;
`;

export const EditBillText = styled.Text`
    font: normal normal bold 13px 'Roboto-Regular';
    letter-spacing: 0px;
    color: #707070;
`;
