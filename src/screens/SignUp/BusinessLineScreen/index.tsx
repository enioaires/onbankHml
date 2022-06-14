import React, { useEffect, useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';

// Components
import api from '../../../api';
import ActionButton from '../../../components/ActionButton';
import ProgressBar from '../../../components/ProgressBar';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Styles
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../utils/helpers';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const isSmallScreen = isDeviceSmallScreen();

const BusinessLineScreen: React.FC<SignUpStackNavigationProps<
    'BusinessArea'
>> = ({ navigation }: SignUpStackNavigationProps<'BusinessArea'>) => {
    const dispatch = useDispatch();
    const value = useSelector(
        (state: IApplicationState) => state.signUp.payload.businessLine
    );
    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );

    // const [getLoading, setGetLoading] = useState(false);
    const [searchedData, setSearchedData] = useState([]);

    const onPress = () => {
        navigation.push('SignUp', { screen: 'ZipCode' });
    };

    const getBisinessAreas = async () => {
        // setGetLoading(true);
        // Saga Fora
        try {
            const resp = await api.get('register/pj/activities');

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema. Tente novamente mais tarde.'
                    );
                }
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }

            setSearchedData(resp.bussiness);
        } catch (err) {
            // err
        }
        // setGetLoading(false);
    };

    useEffect(() => {
        getBisinessAreas();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <SafeAreaView style={[styles.safeArea]}>
                    <View style={styles.top}>
                        <View style={[styles.progressContainer]}>
                            <ProgressBar
                                totalSteps={totalSteps}
                                currentStep={3}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text]}
                            >
                                Área de atuação principal
                            </Text>
                            <RNPickerSelect
                                style={{
                                    inputIOS: styles.input,
                                    inputAndroid: styles.input,
                                    placeholder: {
                                        fontSize: 18
                                    }
                                }}
                                placeholder={{
                                    label: 'Selecione',
                                    value: null
                                }}
                                items={searchedData.map((item: any) => ({
                                    label: item.activity,
                                    value: item.code
                                }))}
                                value={value}
                                onValueChange={(selected: string) =>
                                    dispatch(
                                        changeSignUpPayloadAction({
                                            key: 'businessLine',
                                            value: selected
                                        })
                                    )
                                }
                            />
                        </View>
                    </View>

                    <ActionButton
                        label="Próximo"
                        onPress={onPress}
                        disabled={!value}
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
        paddingTop: isSmallScreen ? 80 : 80 + 48
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
        fontSize: 18,
        paddingLeft: 23,
        justifyContent: 'center'
    }
});

export default BusinessLineScreen;
