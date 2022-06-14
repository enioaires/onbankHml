import styled from 'styled-components/native';

export const Container = styled.View`
    width: 250px;
    height: 250px;
    margin: 0 46px;
    margin-bottom: 110px;
    justify-content: center;
    align-items: center;
`;
export const Row = styled.View`
    flex: 1;
    flex-direction: row;
`;
export const CenterOpacity = styled.View`
    background-color: #fff;
    width: 150px;
    height: 150px;
    position: absolute;
    opacity: 0.1;
`;
export const BorderTopContainer = styled.View`
    flex-direction: row;
    width: 50%;
`;
export const BorderTopLeft = styled.View`
    width: 15px;
    height: 50%;
    background-color: #78787b;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-left-radius: 50px;
`;
export const BorderTopRight = styled.View`
    height: 15px;
    width: 45%;
    background-color: #78787b;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
`;
export const BorderBottomContainer = styled.View`
    flex-direction: row;
    flex: 1;
    align-items: flex-end;
`;
export const BorderBottomLeft = styled.View`
    height: 50%;
    width: 15px;
    background-color: #78787b;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 50px;
`;
export const BorderBottomRight = styled.View`
    height: 15px;
    width: 45%;
    background-color: #78787b;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
`;
