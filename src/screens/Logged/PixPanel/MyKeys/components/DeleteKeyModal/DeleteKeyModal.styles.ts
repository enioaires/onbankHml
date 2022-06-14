import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');
export const DeleteContainer = styled(Animated.View)`
    padding: 28px;
    padding-bottom: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    background-color: white;
`;

export const TextHeading = styled.Text`
    font-size: 20px;
    font-weight: bold;
    /* color: white; */
`;

export const ButtonsContainer = styled(Animated.View)`
    flex-direction: row;
    justify-content: space-between;
`;

export const ActionButton = styled.TouchableOpacity<{ isDelete?: boolean }>`
    background-color: ${({ isDelete }) => (isDelete ? '#d32d2d' : '#707070')};
    border-radius: 10px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    width: ${width * 0.35}px;
`;

export const ActionButtonText = styled.Text`
    color: white;
`;
