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
export const InputValue = styled.Text`
    color: #707070;
    font-size: 12px;
    font-family: 'Roboto-Regular';
    margin-right: 8px;
`;

export const ModalTitle = styled.Text`
    text-align: center;
    font-size: 18px;
    font-family: 'Roboto-Medium';
    color: #707070;
`;

export const TextInput = styled.TextInput`
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #7c7c7c;
    font-size: 30px;
    color: #707070;
    font-family: 'Roboto-Light';
    margin: 30px 0;
`;
