import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #eff1f2;
`;

export const Title = styled.Text`
    text-align: center;
    font: normal normal bold 16px 'Roboto';
    color: #3199b3;
`;

export const InputMask = styled(TextInputMask)`
    flex: 1;
    font-family: 'Roboto-Bold';
    color: #10779c;
    font-size: 40px;
    border-width: 0;
    padding-bottom: 0;
    padding-left: 5px;
    border-radius: 0;
    height: auto;
`;

export const WithoutValueButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const WithoutValueText = styled.Text`
    color: #707070;
    font: normal normal normal 14px 'Roboto';
`;
