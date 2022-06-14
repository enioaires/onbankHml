import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import {
    Container,
    Row,
    CenterOpacity,
    BorderTopContainer,
    BorderTopLeft,
    BorderTopRight,
    BorderBottomContainer,
    BorderBottomLeft,
    BorderBottomRight
} from './Center.styles';

const styles = StyleSheet.create({
    transform: {
        transform: [{ rotateX: '180deg' }, { rotateZ: '180deg' }]
    }
});

function Center() {
    const BorderTop = useCallback(({ style }) => {
        return (
            <BorderTopContainer style={style}>
                <BorderTopLeft />
                <BorderTopRight />
            </BorderTopContainer>
        );
    }, []);

    const BorderBottom = useCallback(({ style }) => {
        return (
            <BorderBottomContainer style={style}>
                <BorderBottomLeft />
                <BorderBottomRight />
            </BorderBottomContainer>
        );
    }, []);

    return (
        <Container>
            <Row>
                <BorderTop />
                <BorderTop style={styles.transform} />
            </Row>
            <CenterOpacity />
            <Row>
                <BorderBottom />
                <BorderBottom style={styles.transform} />
            </Row>
        </Container>
    );
}

export default Center;
