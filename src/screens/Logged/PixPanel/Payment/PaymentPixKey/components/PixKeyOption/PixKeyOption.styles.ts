import styled from 'styled-components/native';
import colors from '../../../../../../../styles/colors';

export const Container = styled.TouchableOpacity`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    shadow-color: #B1C0DC3F;
    shadow-offset: { width: 0, height: 5 };
    shadow-opacity: 1;
    shadow-radius: 7;
    elevation: 1;
`;

export const Title = styled.Text`
    flex: 1;
    margin-left: 14px;
    font-size: 14px;
    color: ${colors.blue.second};
    font-family: 'Roboto-Regular';
`;
