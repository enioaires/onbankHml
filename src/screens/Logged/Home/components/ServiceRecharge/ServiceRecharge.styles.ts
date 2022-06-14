import styled, { css } from 'styled-components/native';
import colors from '../../../../../styles/colors';

export const Container = styled.View`
    flex: 2.8;
    background-color: ${colors.white};
    border-radius: 10px;
    justify-content: center;
    margin-bottom: 15px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
    border-bottom-width: 1px;
    border-color: #efefef;
    padding: 10px 20px;
`;

export const HeaderTitle = styled.Text`
    font-size: 13px;
    font-family: 'Roboto-Bold';
    color: ${colors.blue.second};
`;

export const HistoryButton = styled.TouchableOpacity`
    flex-direction: row;
    height: 20px;
    align-items: center;
`;

export const HistoryButtonTitle = styled.Text`
    font-size: 12px;
    font-family: 'Roboto-Regular';
    font-weight: 400;
    color: ${colors.blue.second};
`;

export const ServiceName = styled.Text`
    font-family: 'Roboto-Regular';
    font-size: 12px;
    color: ${colors.blue.second};
    max-width: 60px;
    text-align: center;
`;

export const ServiceButton = styled.TouchableOpacity`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    border-width: 1px;
    border-color: ${colors.gray.primary};
    background-color: ${colors.gray.eleventh};
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
`;

export const Service = styled.View`
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
    flex: 1 0 25%;
    /* margin: 0 15px; */
`;
