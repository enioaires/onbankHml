import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { periodLabel } from '../../../Limits.data';
import {
    Amount,
    ProgressBar,
    Container,
    Title,
    Progress,
    Label,
    Value
} from './LimitCard.styles';

export const typeIcon = {
    daytime: require('../../../../../../../../assets/icons/sun.png'),
    nighttime: require('../../../../../../../../assets/icons/night.png')
};

const arrowCarrot = require('../../../../../../../../assets/icons/arrow-carrot-right.png');

const LimitCard = ({ limits, type, onPress }) => {
    const { used, limitTotal } = limits;
    const usedpercent =
        limitTotal === 0 && used > limitTotal
            ? 0
            : Number((used / limitTotal).toFixed(2));

    const progressAnimation = useRef(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(progressAnimation.current, {
            useNativeDriver: false,
            toValue: Number.isNaN(usedpercent) ? 0 : usedpercent,
            duration: 200
        }).start();
    }, []);
    return (
        <Container onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Image source={typeIcon[type]} />
                <Title>{periodLabel[type]}</Title>
                <Amount>R$ {formatCurrency(limits.limitTotal)}</Amount>
                <Image resizeMode="contain" source={arrowCarrot} />
            </View>
            <ProgressBar>
                <Progress
                    style={{
                        width: progressAnimation.current.interpolate({
                            inputRange: [
                                0,
                                Number.isNaN(usedpercent) ? 0 : usedpercent
                            ],
                            outputRange: [
                                '0%',
                                `${
                                    Number.isNaN(usedpercent) ? 0 : usedpercent
                                }%`
                            ]
                        })
                    }}
                />
            </ProgressBar>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View>
                    <Value>R$ {formatCurrency(limits.used)}</Value>
                    <Label>Utilizado hoje</Label>
                </View>
                <View>
                    <Value>R$ {formatCurrency(limits.available)}</Value>
                    <Label>Disponível</Label>
                </View>
            </View>
        </Container>
    );
};

export default LimitCard;
