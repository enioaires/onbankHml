import styled from 'styled-components/native';

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

export const SubTitle = styled.Text`
    color: #707070;
    font-size: 12px;
    font-family: 'Roboto-Regular';
    margin-top: 8px;
`;

export const ActionButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    margin-top: 8px;
`;

export const ActionName = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
`;
