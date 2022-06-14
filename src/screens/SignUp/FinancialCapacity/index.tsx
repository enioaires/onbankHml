import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as Sentry from '@sentry/react-native';

import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';

// Components
import ProgressBar from '../../../components/ProgressBar';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';
import { setAlertMessageAction } from '../../../store/ducks/alert/actions';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';
import api from '../../../api';

const CapacityFinancialScreen: React.FC<
    SignUpStackNavigationProps<'CapacityFinancial'>
> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'CapacityFinancial'>) => {
    const [loadingCapacities, setLoadingCapacities] = useState(true);
    const [capacityFinancialOptions, setCapacityFinancialOptions] = useState<
        { code: number; name: string }[]
    >([]);
    const dispatch = useDispatch();
    const [value] = useSelector((state: IApplicationState) => {
        return [state.signUp.payload.capacityFinancial];
    }, shallowEqual);

    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );

    const { params } = route;
    const onPress = (option: any) => {
        dispatch(
            changeSignUpPayloadAction({
                key: 'capacityFinancial',
                value: option
            })
        );
        navigation.push(params?.routeContext || 'SignUp', {
            screen: 'Password'
        });
    };

    const getFinancialCapacityOptions = () => {
        api.get('/capacityfinancial')
            .then((response) => {
                const options =
                    response?.data?.capacityFinancial ||
                    response.capacityFinancial;

                setCapacityFinancialOptions(options || []);
            })
            .catch((err) => {
                Sentry.captureException(err);
                dispatch(
                    setAlertMessageAction({
                        title: 'Oops',
                        message:
                            err.message ||
                            'Ocorreu um prolema.\nTente novamente mais tarde.',
                        type: 'error'
                    })
                );
            })
            .finally(() => setLoadingCapacities(false));
    };
    useEffect(() => {
        getFinancialCapacityOptions();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={70}
            >
                <SafeAreaView>
                    <View>
                        <View style={[styles.progressContainer]}>
                            <ProgressBar
                                totalSteps={totalSteps}
                                currentStep={totalSteps === 13 ? 11 : 10}
                            />
                        </View>
                        <Text style={styles.title}>
                            Informe sua faixa de renda
                        </Text>
                        {loadingCapacities ? (
                            <ActivityIndicator />
                        ) : (
                            capacityFinancialOptions.map((option) => (
                                <TouchableOpacity
                                    style={[
                                        styles.buttonSelect,
                                        value === String(option.code) && {
                                            borderColor: colors.blue.primary
                                        }
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => onPress(option.code)}
                                >
                                    <Text style={styles.text}>
                                        {option.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CapacityFinancialScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 25,
        paddingTop: 110
    },
    buttonSelect: {
        height: 55,
        width: '100%',
        borderWidth: 1.5,
        borderColor: colors.gray.primary,
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'center',
        paddingLeft: 20
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        height: 40,
        marginBottom: 15
    },
    text: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 22
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    }
});
