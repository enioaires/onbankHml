import React, { useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import PageContainer from '../../PixPanel/Payment/components/PageContainer/PageContainer';
import {
    InputMask,
    Title,
    WithoutValueButton,
    WithoutValueText
} from './Amount.styles';

const AmountScreen = () => {
    const [amount, setAmount] = useState('');
    return (
        <PageContainer hiddenBalanceInfo>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Title>Qual valor você quer receber?</Title>
                    <View
                        style={{
                            marginTop: 40,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            borderBottomWidth: 1,
                            // flex: 1,
                            borderColor: '#C3C3C3',
                            justifyContent: 'center',
                            paddingLeft: 20
                        }}
                    >
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: 'Roboto-Bold',
                                color: '#C3C3C3',
                                fontSize: 30,
                                marginBottom: 5
                                // marginLeft: 10
                            }}
                        >
                            R${' '}
                        </Text>
                        <InputMask
                            autoFocus
                            type="money"
                            checkText={(previous, next) => {
                                return next !== '0';
                            }}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={amount}
                            onChangeText={(text) => setAmount(text)}
                        />
                    </View>
                    <WithoutValueButton>
                        <WithoutValueText>
                            Não especificar um valor
                        </WithoutValueText>
                    </WithoutValueButton>
                </View>
                <View>
                    <TouchableOpacity onPress={Keyboard.dismiss}>
                        <Text>Por qual chave</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </PageContainer>
    );
};

export default AmountScreen;
