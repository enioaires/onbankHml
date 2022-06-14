import styled from 'styled-components/native';
import colors from '../../../../../styles/colors';

export const Container = styled.View`
    padding-right: 0;
`;

export const MenuItem = styled.TouchableOpacity`
    width: 105px;
    height: 105px;
    border-radius: 7px;
    padding-top: 11px;
    padding-left: 17px;
    padding-bottom: 15px;
    background-color: ${colors.white};
    margin-left: 16px;
    justify-content: space-between;
    margin-bottom: 7px;
`;

export const ItemImage = styled.Image`
    width: 20px;
    height: 20px;
`;

export const ItemText = styled.Text`
    color: ${colors.blue.second};
    font-family: 'Roboto-Regular';
    font-size: 12px;
`;
