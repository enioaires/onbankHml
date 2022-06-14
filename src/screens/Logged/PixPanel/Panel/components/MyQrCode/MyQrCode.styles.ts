import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 30px;
    flex-direction: row;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 14px 15px;
    justify-content: space-between;
    align-items: center;
`;
export const Title = styled.Text`
    color: #707070;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Roboto-Regular';
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #dbdbdb;
`;

export const Description = styled.View`
    color: #707070;
    font-size: 11px;
    font-family: 'Roboto-Regular';
`;

export const Label = styled.Text`
    margin-top: 6px;
    margin-bottom: 2px;
    color: #707070;
    font-family: 'Roboto-Regular';
`;

export const KeyValue = styled.Text`
    color: #707070;
    font-family: 'Roboto-bold';
`;

export const ShareButtonText = styled.Text`
    color: #27a6bc;
`;
