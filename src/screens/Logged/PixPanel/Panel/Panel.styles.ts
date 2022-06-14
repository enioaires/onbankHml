import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../../styles/colors';

const { width } = Dimensions.get('screen');
export const Container = styled.ScrollView`
    background-color: #eff1f2;
    flex: 1;
`;

export const Title = styled.Text`
    color: #707070;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Roboto-Regular';
    text-align: center;
    margin: 16px 0;
`;

export const OperationsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    justify-content: center;
`;

export const Operation = styled.TouchableOpacity`
    border-radius: 8px;
    height: 130px;
    width: ${width * 0.27}px; //109px;
    margin-right: 5px;
    margin-bottom: 5px;
    justify-content: flex-end;
    padding-bottom: 16px;
    padding-left: 15px;
    padding-right: 16px;
    background-color: #fff;
    shadow-color: #B1C0DC3F;
    shadow-offset: { width: 0, height: 5 };
    shadow-opacity: 1;
    shadow-radius: 7;
    elevation: 1;
`;

export const OperationName = styled.Text`
    color: ${colors.blue.second};
    font-size: 12px;
    font-family: 'Roboto-Regular';
    max-width: 80px;
    margin-top: 3px;
`;
