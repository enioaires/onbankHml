import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #e8e8e8 0% 0% no-repeat padding-box;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    flex: 1;
    margin-left: 16px;
    color: #707070;
    font-size: 14px;
    font-family: 'Roboto-Bold';
`;
