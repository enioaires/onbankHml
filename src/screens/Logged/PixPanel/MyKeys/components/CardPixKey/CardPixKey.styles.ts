import styled from 'styled-components/native';
import colors from '../../../../../../styles/colors';

export const Container = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 16px 24px;
    margin-bottom: 6px;
    background-color: #fff;
    shadow-color: #B1C0DC3F;
    shadow-offset: { width: 0, height: 5 };
    shadow-opacity: 1;
    shadow-radius: 7;
    elevation: 1;
`;

export const StyledContainer = styled.View`
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 16px 24px;
    margin-bottom: 6px;
`;

export const KeyType = styled.Text`
    color: ${colors.blue.second};
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 4px;
`;

export const Value = styled.Text`
    color: ${colors.blue.second};
    font-size: 13px;
`;
