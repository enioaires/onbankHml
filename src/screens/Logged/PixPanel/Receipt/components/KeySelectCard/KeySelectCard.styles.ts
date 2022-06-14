import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{ isChecked: boolean }>`
    flex-direction: row;
    align-items: center;
    border: 1px solid ${({ isChecked }) => (isChecked ? '#707070' : '#E8E8E8')};
    border-radius: 8px;
    padding: 16px 21px;
    background-color: #e8e8e8;
    margin-bottom: 8px;
`;

export const RadioContainer = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 2px solid #dbdbdb;
    justify-content: center;
    align-items: center;
`;
export const LabelContainer = styled.View`
    margin-left: 16px;
`;
export const LabelTitle = styled.Text`
    font-weight: bold;
    font-size: 13px;
    font-family: 'Roboto-Regular';
    color: #707070;
    margin-bottom: 4px;
`;
export const LabelDescription = styled.Text`
    font-size: 11px;
    font-family: 'Roboto-Regular';
    color: #707070;
`;

export const RadioSelected = styled.View`
    width: 10px;
    height: 10px;
    background-color: #707070;
    border-radius: 5px;
`;
