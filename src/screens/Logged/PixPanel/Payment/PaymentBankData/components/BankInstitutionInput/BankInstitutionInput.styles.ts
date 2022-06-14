import styled from 'styled-components/native';
import colors from '../../../../../../../styles/colors';

export const Container = styled.TouchableOpacity`
    padding: 25px;
    background-color: #fff;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 8px;
    shadow-color: #B1C0DC3F;
    shadow-offset: { width: 0, height: 5 };
    shadow-opacity: 1;
    shadow-radius: 7;
    elevation: 1;
`;

export const Title = styled.Text`
    color: ${colors.blue.second};
    font-family: 'Roboto-Bold';
`;

export const ModalTitle = styled.Text`
    text-align: center;
    font-size: 18px;
    font-family: 'Roboto-Medium';
    color: #707070;
`;

export const BankSelectedValue = styled.Text`
    color: #707070;
    font-size: 12px;
    font-family: 'Roboto-Regular';
    margin-right: 8px;
    max-width: 190px;
`;

export const InstituitionSelectedContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    border-color: #ffffff;
    border-bottom-width: 1px;
`;

export const InputValue = styled.Text`
    color: #707070;
    font-family: 'Roboto-Bold';
    font-size: 20px;
`;
