import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #1f5779;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-bottom: 26px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #ffffff;
    font-family: 'Roboto-Regular';
    font-weight: 700;
`;

export const BackButton = styled.TouchableOpacity``;

export const BalanceContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-top: 30px;
`;

export const BalanceLabel = styled.Text`
    color: #ffffff;
    font-size: 16px;
    font-family: 'Roboto-Regular';
`;

export const BalanceAmount = styled.Text`
    color: #ffffff;
    font-size: 22px;
    font-family: 'Roboto-Bold';
`;
