import styled from 'styled-components/native';
import colors from '../../../../styles/colors';

export const ModalBody = styled.View`
    padding-bottom: 50px;
`;

export const Title = styled.Text`
    text-align: center;
    color: #707070;
    font-family: 'Roboto-Medium';
    font-size: 18px;
`;

export const ModalFooter = styled.View``;

export const InputText = styled.TextInput`
    padding: 10px;
    border-bottom-width: 1px;
    border-color: #7c7c7c;
    font-size: 30px;
    color: #707070;
    font-family: 'Roboto-Light';
    margin: 25px 0;
`;

export const PasteButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 18px 0;
    shadow-color: #B1C0DC3F;
    shadow-offset: { width: 0, height: 5 };
    shadow-opacity: 1;
    shadow-radius: 7;
    elevation: 1;
`;

export const PasteButtonText = styled.Text`
    font-family: 'Roboto-Bold';
    color: ${colors.blue.second};
    font-size: 15px;
`;
