import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Animated
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// Components
import ActionButton from '../../../../components/ActionButton';
import TextInput from '../../../../components/TextInput';
import { ViewContainerStackPadding } from '../../../../components/ViewContainerStackPadding';
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../../store/types';
import { 
    changePixPaymentPayloadAction,
    getPixPaymentDataAction,
    clearPixPaymentStateAction,
    getPrePixPaymentDataAction
} from '../../../../store/ducks/pixPayment/actions';

// Hooks
import useSlideAnimation from '../../../../utils/hooks/useSlideAnimation';

// Styles
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';
import { prefityNames, maskDocumentNumber } from '../../../../utils/prettiers'

// Navigation Type
import { PixPaymentsStackNavigationProps } from '../../../../routes/Logged/types';

const ValueScreen: React.FC<PixPaymentsStackNavigationProps<'Value'>> = ({
    navigation,
    route
}: PixPaymentsStackNavigationProps<'Value'>) => {
    const { isKeyboardActive } = useIsKeyboardActive();
    const dispatch = useDispatch();
    const [ keyValue ] = useSelector((state: IApplicationState) => {
        return [state.pixPayment.payload.valorChave];
    }, shallowEqual);

    const [ name, cpf, cnpj  ] = useSelector((state: IApplicationState) => {
        return [
            state.pixPayment.payload.recebedor.nome, 
            state.pixPayment.payload.recebedor.cpf, 
            state.pixPayment.payload.recebedor.cnpj
        ];
    }, shallowEqual);

    const [ error, messageError, status ] = useSelector((state: IApplicationState) => {
        return [state.pixPayment.error, state.pixPayment.payload.message, state.pixPayment.payload.status];
    });

    const isLoading = useSelector(
        (state: IApplicationState) => state.pixPayment.isLoading
    );

    const { type } = route.params

    const onChangeText = (type: any, value: string) => {
        dispatch(
            changePixPaymentPayloadAction({
                valorChave: value,
                message: ''
            })
        )
    }

    const onPress = () => {
        if (status === 'PRE_PIXPAYMENTDATA') {
            navigation.push('PixPayment', {screen: 'Amount'})
            return
        }

        let payload = {}
        if (type === 'CPF-CNPJ') {
            if (keyValue.replace(/\D/g, '').length > 11) {
                payload = { tipoChave: 'Cnpj' }
            } else {
                payload = { tipoChave: 'Cpf' }
            }
        } else {
            payload = { tipoChave: type }
        }
        dispatch(changePixPaymentPayloadAction(payload));
        //navigation.push('PixPayment', {screen: 'Amount'})
        dispatch(getPrePixPaymentDataAction(navigation));
    };

    const handlePlaceHolder = (type: string) => {
        switch(type) {
            case 'CPF-CNPJ': 
                return 'Digite o CPF ou CNPJ';
            case 'Email':
                return 'Digite o Email';
            case 'Phone':
                return 'Digite o número de Celular';
            case 'Evp':
                return 'Digite a chave aleatória';
            default:
                return;    
        };
    };

    const handleTypeMaskInput = (type: string) => {
        switch(type) {
            case 'Phone':
                return 'cel-phone';
            default:
                return 'custom'
        }
    }


    // Animations
    const { slideContentAnimation, slideValueParsed} = useSlideAnimation()

    useEffect(() => {
        if (status === 'PRE_PIXPAYMENTDATA') 
            slideContentAnimation()
    },[status])

    return (
        <View style={styles.container}>
            <LinearGradientHeader isHeaderStackHeight />
            <KeyboardAvoidingView
                style={[
                    styles.box,
                    isKeyboardActive && { marginBottom: 13 }
                ]}
                behavior="padding"
            >
                <SafeAreaView style={styles.safeArea}>
                    { status === 'PRE_PIXPAYMENTDATA' ? 
                        <Animated.View 
                            style={{
                                marginTop: 40,
                                transform: [{
                                    translateX: slideValueParsed
                                }]
                            }}>
                            <Text allowFontScaling={false} style={[styles.text, { marginTop: 20, fontSize: 18 }]}>
                                Confirme os dados do destinatário
                            </Text>
                            <View style={styles.dataContainer}>
                                <Text style={styles.data}>Chave Pix</Text>
                                <Text style={[styles.data, {color: colors.text.third}]}>
                                    {keyValue}
                                </Text>
                            </View>
                            <View style={styles.dataBar}/>
                            <View style={styles.dataContainer}>
                                <Text style={styles.data}>Nome</Text>
                                <Text style={[styles.data, {color: colors.text.third}]}>
                                    {name ? prefityNames(name): ''}
                                </Text>
                            </View>
                            <View style={styles.dataBar}/>
                            <View style={styles.dataContainer}>
                                <Text style={styles.data}>
                                    {cnpj ?
                                        'CNPJ' : 'CPF'
                                    }
                                </Text>
                                <Text style={[styles.data, {color: colors.text.third}]}>
                                    {cnpj ? 
                                        maskDocumentNumber(cnpj) : cpf
                                    }
                                </Text>
                            </View>
                            <View style={styles.dataBar}/>
                        </Animated.View>
                        :
                        <View>
                            <Text allowFontScaling={false} style={[styles.text, { marginTop: 20 }]}>
                                Chave Pix
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                            >
                                {type === 'CPF-CNPJ' || type === 'Phone' ?
                                    <TextInput
                                        name={ type }
                                        placeholder={handlePlaceHolder(type)}
                                        onChangeText={onChangeText}
                                        value={keyValue}
                                        keyboardType='number-pad'
                                        placeholderTextColor={
                                            colors.gray.third
                                        }
                                        invalid={
                                            false
                                        }
                                        style={{
                                            borderWidth: 0,
                                            fontSize: 20,
                                            paddingLeft: 0,
                                            color: colors.text.primary,
                                            width: '100%',
                                            paddingRight: 0
                                        }}
                                        type={handleTypeMaskInput(type)}
                                        options={
                                            { mask: keyValue.replace(/\D/g, '').length > 11 ? '99.999.999/9999-99' : '999.999.999-999'}
                                        }
                                        autoCapitalize='none'
                                        isFullWidth
                                    />
                                :
                                    <TextInput
                                        name={ type }
                                        placeholder={handlePlaceHolder(type)}
                                        onChangeText={onChangeText}
                                        value={keyValue}
                                        keyboardType='default'
                                        placeholderTextColor={
                                            colors.gray.third
                                        }
                                        invalid={
                                            false
                                        }
                                        style={{
                                            borderWidth: 0,
                                            fontSize: 20,
                                            paddingLeft: 0,
                                            color: colors.text.primary,
                                            width: '100%',
                                            paddingRight: 0,
                                        }}
                                    />
                                }
                            </View>
                            <View
                                style={styles.bar}
                            />
                            <Text style={styles.invalidText}>
                                {error && messageError && messageError}
                            </Text>
                        </View>
                    }
                    <ActionButton
                        label="Próximo"
                        disabled={
                            keyValue.length === 0 
                        }
                        isLoading={isLoading}
                        onPress={() => onPress()}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ValueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 29
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    box: {
        flex: 1,
        paddingHorizontal: 24
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth,
        fontSize: 23,
        marginBottom: 45,
        alignSelf: 'center',
        marginTop: 10
    },
    input: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 24,
        borderWidth: 0,
        paddingBottom: 0,
        paddingLeft: 5,
        borderRadius: 0,
        height: 'auto'
    },
    currency: {
        fontFamily: 'Roboto-Regular',
        color: colors.gray.second,
        fontSize: 20,
        marginLeft: 13
    },
    rules: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 16,
        marginTop: 25
    },
    bar: {
        height: 2,
        backgroundColor: colors.gray.fourth
    },
    invalidText:{
        fontFamily: 'Roboto-Regular',
        color: colors.blue.fourth,
        fontSize: 16,
        marginTop: 25
    },
    dataBar: {
        height: 1.5,
        backgroundColor: colors.gray.fourth,
        marginVertical: 15
    },
    data: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.fifth,
        maxWidth: '80%'
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
});
