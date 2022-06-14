import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { Slider } from '@miblanchard/react-native-slider';
import React from 'react';
import { View, Image } from 'react-native';
import {
    operationTitle,
    periodLabel,
    perioTypeLabel
} from '../../../Limits.data';
import {
    Label,
    MaxAmount,
    OperationTitle,
    PeriodLabel,
    Value,
    ViewModeLabel
} from './LimitSlider.styles';

// import { Container } from './styles';

const operationIcon: any = {
    qrcodePayment: require('../../../../../../../../assets/icons/qr-code.png'),
    transfer: require('../../../../../../../../assets/icons/pix-transferir.png')
};
interface LimitSliderProps {
    typeTransaction: string;
    periodType: string;
    period: string;
    maxValue: number;
    minValue: number;
    onChange: (value: number) => void;
    value: number;
}
const LimitSlider = (props: LimitSliderProps) => {
    const {
        typeTransaction,
        periodType,
        period,
        maxValue,
        minValue,
        onChange,
        value
    } = props;

    return (
        <View style={{ marginBottom: 30 }}>
            {typeTransaction !== 'unity' && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Image source={operationIcon[typeTransaction]} />

                    <OperationTitle>
                        {operationTitle[typeTransaction]}
                    </OperationTitle>
                    <ViewModeLabel>{perioTypeLabel[periodType]}</ViewModeLabel>
                </View>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <PeriodLabel>
                    {typeTransaction === 'unity'
                        ? operationTitle[typeTransaction]
                        : 'Limite'}{' '}
                    {periodLabel[period].toLocaleLowerCase()}
                </PeriodLabel>
                <MaxAmount>R$ {formatCurrency(value)}</MaxAmount>
            </View>
            <Slider
                minimumTrackTintColor="#10779C"
                trackStyle={{ backgroundColor: '#FFFFFF' }}
                thumbTintColor="#10779C"
                value={value}
                onValueChange={(sliderValue) => {
                    // @ts-ignore
                    const parsedValue = parseInt(sliderValue, 10);
                    onChange(parsedValue);
                }}
                maximumValue={maxValue}
                minimumValue={minValue}
            />
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View>
                    <Value>R$ {formatCurrency(minValue)}</Value>
                    <Label>Mínimo</Label>
                </View>
                <View>
                    <Value>R$ {formatCurrency(maxValue)}</Value>
                    <Label alignRight>Máximo</Label>
                </View>
            </View>
        </View>
    );
};

export default LimitSlider;
