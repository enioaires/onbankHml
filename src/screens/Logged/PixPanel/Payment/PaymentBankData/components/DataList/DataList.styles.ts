import styled from 'styled-components/native';

export const Container = styled.View``;

export const TextInput = styled.TextInput`
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #7c7c7c;
    font-size: 20px;
    color: #707070;
    font-family: 'Roboto-Light';
    margin: 30px 0;
`;

export const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    padding: 25px;
    border: 0.7px solid #6d6d6d;
    /* border-color: #707070; */
`;

export const ItemName = styled.Text`
    color: #2d2e2c;
    font-family: 'Roboto-Regular';
`;
