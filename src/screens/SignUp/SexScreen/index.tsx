import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

// Components
import ProgressBar from '../../../components/ProgressBar';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const SexScreen: React.FC<SignUpStackNavigationProps<'Sex'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Sex'>) => {
    const dispatch = useDispatch();
    const [value] = useSelector((state: IApplicationState) => {
        return [state.signUp.payload.sex];
    }, shallowEqual);

    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );

    const { params } = route;
    const onPress = (value: 'M' | 'F') => {
        dispatch(
            changeSignUpPayloadAction({
                key: 'sex',
                value
            })
        );
        navigation.push(params?.routeContext || 'SignUp', {
            screen: 'Name'
        });
    };

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
                                currentStep={1}
                            />
                        </View>
                        <Text style={styles.title}>
                            Selecione o{!params?.routeContext ? 'seu' : ''} sexo
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.buttonSelect,
                                value === 'M' && {
                                    borderColor: colors.blue.primary
                                }
                            ]}
                            activeOpacity={0.7}
                            onPress={() => onPress('M')}
                        >
                            <Text style={styles.text}>Masculino</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.buttonSelect,
                                value === 'F' && {
                                    borderColor: colors.blue.primary
                                }
                            ]}
                            activeOpacity={0.7}
                            onPress={() => onPress('F')}
                        >
                            <Text style={styles.text}>Feminino</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default SexScreen;

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
