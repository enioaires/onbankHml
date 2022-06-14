import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';

// Store
import { getAddressByZipcodeAction } from '../../store/ducks/addressNew/actions';
import { IApplicationState } from '../../store/types';

// Components
import ActionButton from '../../components/ActionButton';
import TextInput from '../../components/TextInput';
import ProgressBar from '../../components/ProgressBar';

// Style
import { paddings } from '../../styles/paddings';
import colors from '../../styles/colors';

// Utils
import useIsKeyboardActive from '../../utils/useIsKeyboardActive';

export interface IZipcodeSearchProps {
    zipcode?: string;
    buttonLabel?: string;
    navigation: any;
    feature: 'deposit' | 'perfil' | 'wallet' | 'signUp';
    signUpSteps?: {
        total: number;
        current: number;
    };
}

const ZipcodeSearch: React.FC<IZipcodeSearchProps> = ({
    zipcode,
    buttonLabel,
    navigation,
    feature,
    signUpSteps
}: IZipcodeSearchProps) => {
    const dispatch = useDispatch();
    const getAddressLoading = useSelector(
        (state: IApplicationState) => state.addressNew.isLoading
    );
    const previousSearch = useSelector(
        (state: IApplicationState) => state.addressNew.previousSearch
    );

    const { isKeyboardActive } = useIsKeyboardActive();

    const [zipcodeValue, setZipcodeValue] = useState(zipcode || '');
    const [zipcodeValidation, setZipcodeValidation] = useState('');

    const onChangeText = (value: string) => {
        setZipcodeValue(value);
        if (
            zipcodeValue.replace(/\D/g, '').length === 8 &&
            !isValidCEP(zipcodeValue)
        ) {
            setZipcodeValidation('* CEP inválido');
        } else if (zipcodeValidation) setZipcodeValidation('');
    };

    const onPress = () => {
        if (
            zipcodeValue.replace(/\D/g, '') ===
            previousSearch.replace(/\D/g, '')
        ) {
            if (feature === 'signUp')
                navigation.push('SignUp', { screen: 'Address' });
            if (feature === 'perfil')
                navigation.push('Perfil', { screen: 'Address' });
            if (feature === 'deposit')
                navigation.push('AddAddress', { screen: 'Address' });
            if (feature === 'wallet')
                navigation.push('Wallet', { screen: 'Address' });
        } else if (
            feature === 'perfil' &&
            zipcode === zipcodeValue.replace(/\D/g, '')
        ) {
            navigation.push('Perfil', { screen: 'Address' });
        } else {
            dispatch(
                getAddressByZipcodeAction(
                    zipcodeValue.replace(/\D/g, ''),
                    feature,
                    navigation
                )
            );
        }
    };

    const renderScreenTitle = () => {
        switch (feature) {
            case 'deposit':
                return (
                    <View style={{ alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={styles.text1}>
                            Este é o seu primeiro boleto.
                        </Text>
                        <Text allowFontScaling={false} style={styles.text1}>
                            Para prosseguir, preencha os dados
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.text1,
                                {
                                    fontFamily: 'Roboto-Bold',
                                    marginBottom: 30
                                }
                            ]}
                        >
                            do seu endereço.
                        </Text>
                    </View>
                );
            case 'signUp':
                return (
                    <View style={{ alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={styles.text1}>
                            Para prosseguir, preencha os dados
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.text1,
                                {
                                    fontFamily: 'Roboto-Bold',
                                    marginBottom: 30
                                }
                            ]}
                        >
                            do endereço da empresa.
                        </Text>
                    </View>
                );
            case 'perfil':
                return (
                    <View style={{ alignItems: 'center' }}>
                        {zipcode ? (
                            <>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.text1}
                                >
                                    CEP do seu
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text1,
                                        {
                                            fontFamily: 'Roboto-Bold',
                                            marginBottom: 30
                                        }
                                    ]}
                                >
                                    endereço cadastrado.
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.text1}
                                >
                                    Você ainda não possui
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.text1}
                                >
                                    endereço cadastrado. Insira o CEP
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text1,
                                        {
                                            fontFamily: 'Roboto-Bold',
                                            marginBottom: 30
                                        }
                                    ]}
                                >
                                    e prossiga com o cadastro.
                                </Text>
                            </>
                        )}
                    </View>
                );
            case 'wallet':
                return (
                    <View style={{ alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={styles.text1}>
                            Preencha os dados
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.text1,
                                {
                                    fontFamily: 'Roboto-Bold',
                                    marginBottom: 30
                                }
                            ]}
                        >
                            do seu endereço.
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    useEffect(() => {}, []);

    return (
        <View
            style={[
                styles.container,
                feature === 'signUp' && { backgroundColor: colors.white }
            ]}
        >
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 19 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        {feature === 'signUp' && signUpSteps && (
                            <View style={[styles.progressContainer]}>
                                <ProgressBar
                                    totalSteps={signUpSteps.total}
                                    currentStep={signUpSteps.current}
                                />
                            </View>
                        )}
                        {renderScreenTitle()}
                        <Text allowFontScaling={false} style={styles.label}>
                            CEP
                        </Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            type="zip-code"
                            value={zipcodeValue}
                            onChangeText={(_, value) => onChangeText(value)}
                        />
                        {zipcodeValidation.length > 0 && (
                            <Text
                                allowFontScaling={false}
                                style={styles.validation}
                            >
                                {zipcodeValidation}
                            </Text>
                        )}
                        {feature === 'deposit' && (
                            <Text allowFontScaling={false} style={styles.text2}>
                                Essa ação não será necessária na emissão dos
                                próximos boletos
                            </Text>
                        )}
                    </View>
                    <ActionButton
                        label={buttonLabel || 'Próximo'}
                        onPress={onPress}
                        isLoading={getAddressLoading}
                        disabled={!isValidCEP(zipcodeValue)}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1,
        alignItems: 'center'
    },
    text1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.text.third,
        textAlign: 'center',
        lineHeight: 22
    },
    text2: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        color: colors.text.fourth,
        textAlign: 'center',
        lineHeight: 19,
        width: '60%'
    },
    label: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: colors.text.third,
        marginBottom: 5
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        textAlign: 'center',
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 30,
        paddingBottom: 5,
        marginBottom: 5
    },
    validation: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.red,
        marginBottom: 5
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    }
});

export default ZipcodeSearch;
