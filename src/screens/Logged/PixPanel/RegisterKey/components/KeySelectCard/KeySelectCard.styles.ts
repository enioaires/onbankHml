import styled from 'styled-components/native';
import colors from '../../../../../../styles/colors';

export const Container = styled.TouchableOpacity<{ isChecked: boolean }>`
    flex-direction: row;
    align-items: center;
    border: 1px solid ${({ isChecked }) => (isChecked ? '#10779c' : '#fff')};
    border-radius: 8px;
    padding: 16px 21px;
    background-color: #fff;
    margin-bottom: 8px;
    shadow-color: #B1C0DC3F;
    shadow-offset: { width: 0, height: 5 };
    shadow-opacity: 1;
    shadow-radius: 7;
    elevation: 1;
`;

export const RadioContainer = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 2px solid #10779c;
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
    color: #10779c;
    margin-bottom: 4px;
`;
export const LabelDescription = styled.Text`
    font-size: 11px;
    font-family: 'Roboto-Regular';
    color: ${colors.blue.second};
`;

export const RadioSelected = styled.View`
    width: 10px;
    height: 10px;
    background-color: #10779c;
    border-radius: 5px;
`;
