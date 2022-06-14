import React, { useEffect, useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// Components
import api from '../../../api';
import ActionButton from '../../../components/ActionButton';
import ProgressBar from '../../../components/ProgressBar';
import TextInput from '../../../components/TextInput';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Styles
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../utils/useIsKeyboardActive';
import { isDeviceSmallScreen } from '../../../utils/helpers';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallSreen = isDeviceSmallScreen();

const ConstitutionFormScreen: React.FC<SignUpStackNavigationProps<
    'ConstitutionForm'
>> = ({ navigation }: SignUpStackNavigationProps<'ConstitutionForm'>) => {
    const dispatch = useDispatch();
    const signUpPayload = useSelector(
        (state: IApplicationState) => state.signUp.payload,
        shallowEqual
    );
    const { establishmentDate, establishmentForm } = signUpPayload;
    const establishmentDateValidation = useSelector(
        (state: IApplicationState) =>
            state.signUp.inputsValidation.establishmentDate
    );
    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );

    const { isKeyboardActive, offset } = useIsKeyboardActive(
        isSmallSreen ? -10 : -20
    );

    const [getLoading, setGetLoading] = useState(false);
    const [searchedData, setSearchedData] = useState([]);

    const onPress = () => {
        navigation.push('SignUp', { screen: 'BusinessArea' });
    };

    const getBisinessAreas = async () => {
        setGetLoading(true);
        // Saga Fora
        try {
            const resp = await api.get('register/pj/types');

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema. Tente novamente mais tarde.'
                    );
                }
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }

            setSearchedData(resp);
        } catch (err) {
            // err
        }
        setGetLoading(false);
    };

    useEffect(() => {
        getBisinessAreas();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <SafeAreaView
                    style={[
                        styles.safeArea,
                        isKeyboardActive && { marginBottom: 20 }
                    ]}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ translateY: offset }]
                        }}
                    >
                        <View style={styles.top}>
                            <View
                                style={[
                                    styles.progressContainer,
                                    isKeyboardActive &&
                                        isSmallSreen && { marginBottom: 20 }
                                ]}
                            >
                                <ProgressBar
                                    totalSteps={totalSteps}
                                    currentStep={2}
                                />
                            </View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.text]}
                                >
                                    Forma de constituição
                                </Text>
                                <RNPickerSelect
                                    style={{
                                        inputIOS: styles.picker,
                                        inputAndroid: styles.picker,
                                        placeholder: {
                                            fontSize: 18
                                        }
                                    }}
                                    placeholder={{
                                        label: 'Selecione',
                                        value: null
                                    }}
                                    items={searchedData.map((item: any) => ({
                                        label: item.type,
                                        value: item.code
                                    }))}
                                    value={establishmentForm}
                                    onValueChange={(selected: string) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: 'establishmentForm',
                                                value: selected
                                            })
                                        )
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    marginTop:
                                        isKeyboardActive && isSmallSreen
                                            ? 15
                                            : 24
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.text]}
                                >
                                    Data de fundação
                                </Text>
                                <TextInput
                                    name="establishmentDate"
                                    type="datetime"
                                    options={{ format: 'DD/MM/YYYY' }}
                                    style={styles.input}
                                    value={establishmentDate}
                                    largeText
                                    invalid={
                                        establishmentDateValidation.length > 0
                                    }
                                    onChangeText={(name, value) =>
                                        dispatch(
                                            changeSignUpPayloadAction({
                                                key: name,
                                                value
                                            })
                                        )
                                    }
                                />
                                {establishmentDateValidation.length > 0 && (
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.errorMessage}
                                    >
                                        {establishmentDateValidation}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </Animated.View>

                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        disabled={
                            !establishmentForm ||
                            establishmentDate.replace(/\D/g, '').length < 8 ||
                            (establishmentDate.replace(/\D/g, '').length ===
                                8 &&
                                establishmentDateValidation.length > 0)
                        }
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        ...paddings.container,
        paddingTop: isSmallSreen ? 80 : 80 + 48
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    top: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 31,
        lineHeight: 22
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 14,
        lineHeight: 13,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Regular'
    },
    rules: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 17,
        marginTop: 15,
        color: colors.text.second,
        marginRight: 60
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    },
    input: {
        alignSelf: 'stretch',
        borderWidth: 1.2,
        borderRadius: 10,
        height: 53,
        borderColor: colors.gray.primary,
        fontFamily: 'Roboto-Medium',
        color: colors.text.primary,
        paddingLeft: 23,
        justifyContent: 'center'
    },
    picker: {
        alignSelf: 'stretch',
        borderWidth: 1.2,
        borderRadius: 10,
        height: 53,
        borderColor: colors.gray.primary,
        fontFamily: 'Roboto-Medium',
        color: colors.text.primary,
        paddingLeft: 23,
        justifyContent: 'center',
        fontSize: 18
    }
});

export default ConstitutionFormScreen;
