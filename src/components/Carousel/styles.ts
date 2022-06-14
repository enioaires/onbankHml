import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const Image = styled.Image`
    margin-bottom: 75px;
`;

export const Title = styled.Text`
    padding: 0 60px;
    font-size: 16px;
    color: #707070;
    text-align: center;
    font-weight: bold;
`;

export const TitleBottomContainer = styled.View`
    margin-top: auto;
`;

export const Description = styled.Text`
    margin-top: 19px;
    padding: 0 35px;
    font-size: 12px;
    color: #707070;
    text-align: center;
`;

export const StepContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 12px 0;
`;

interface StepProps {
    isActive?: boolean;
}
export const Step = styled.View<StepProps>`
    width: 19px;
    height: 6px;
    background-color: #b9b9b9;
    border-radius: 3px;
    margin: 0 10px;
    align-self: center;
    ${({ isActive }) =>
        isActive &&
        css`
            background-color: #2c7a8d;
        `}
`;
