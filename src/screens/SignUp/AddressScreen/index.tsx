import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import ActionButton from '../../../components/ActionButton';
import TextInput from '../../../components/TextInput';
import ProgressBar from '../../../components/ProgressBar';

// Store
import { IApplicationState } from '../../../store/types';
import { changeSignUpPayloadAction } from '../../../store/ducks/signUp/actions';

// Styles
import colors from '../../../styles/colors';

// Utils

// Navigation Types
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const AddressScreen: React.FC<SignUpStackNavigationProps<'Address'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Address'>) => {
    const { blockedInputs } = route.params;

    const signUpPayload = useSelector(
        (state: IApplicationState) => state.signUp.payload,
        shallowEqual
    );
    const totalSteps = useSelector(
        (state: IApplicationState) => state.signUp.steps
    );
    const { params } = route;
    const {
        street,
        city,
        state,
        neighborhood,
        complement,
        documentNumber,
        number
    } = signUpPayload;

    const findInputBlocked = (name: string) =>
        !!blockedInputs.find((e: string) => e === name);

    const dispatch = useDispatch();

    const onPress = () => {
        navigation.push(params?.routeContext || 'SignUp', {
            screen:
                documentNumber.replace(/\D/g, '').length > 11
                    ? 'RepresentativeTaxId'
                    : 'Phone'
        });
    };

    const onChangeText = (name: any, value: string) => {
        dispatch(
            changeSignUpPayloadAction({
                key: name,
                value
            })
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.progressContainer}>
                    <ProgressBar totalSteps={totalSteps} currentStep={6} />
                </View>
                <KeyboardAwareScrollView enableOnAndroid>
                    <ScrollView style={styles.scroll}>
                        <Text allowFontScaling={false} style={[styles.label]}>
                            Endereço
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={street}
                            name="street"
                            onChangeText={(name, value) =>
                                onChangeText(name, value)
                            }
                        />
                        <Text allowFontScaling={false} style={styles.label}>
                            Número
                        </Text>
                        <TextInput
                            type="only-numbers"
                            style={[styles.input, { width: '25%' }]}
                            value={number}
                            name="number"
                            onChangeText={(name, value) =>
                                onChangeText(name, value)
                            }
                        />
                        <Text allowFontScaling={false} style={styles.label}>
                            Complemento
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={complement}
                            name="complement"
                            maxLength={20}
                            onChangeText={(name, value) =>
                                onChangeText(name, value)
                            }
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'stretch'
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    marginRight: '15%'
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Cidade
                                </Text>
                                <TextInput
                                    editable={!findInputBlocked('city')}
                                    style={styles.input}
                                    value={city}
                                    name="city"
                                    onChangeText={(name, value) =>
                                        onChangeText(name, value)
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    width: '25%'
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Estado
                                </Text>
                                <TextInput
                                    type="custom"
                                    options={{
                                        mask: 'AA'
                                    }}
                                    editable={!findInputBlocked('state')}
                                    style={styles.input}
                                    value={state}
                                    name="state"
                                    onChangeText={(name, value) =>
                                        onChangeText(name, value)
                                    }
                                />
                            </View>
                        </View>
                        <View>
                            <Text allowFontScaling={false} style={styles.label}>
                                Bairro
                            </Text>
                            <TextInput
                                editable={!findInputBlocked('neighborhood')}
                                style={styles.input}
                                value={neighborhood}
                                name="neighborhood"
                                onChangeText={(name, value) =>
                                    onChangeText(name, value)
                                }
                            />
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
                <ActionButton
                    label="Próximo"
                    onPress={onPress}
                    disabled={
                        street.length <= 0 ||
                        neighborhood.length <= 0 ||
                        number.length <= 0 ||
                        city.length <= 0 ||
                        state.length < 2 ||
                        complement.length <= 0
                    }
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 15
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    progressContainer: {
        alignSelf: 'stretch',
        marginBottom: 39
    },
    scroll: {
        marginBottom: 15
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue.second,
        paddingLeft: 0,
        fontFamily: 'Roboto-Medium',
        color: colors.text.fourth,
        fontSize: 16,
        paddingBottom: 7,
        paddingTop: 0,
        height: 24,
        borderRadius: 0,
        marginBottom: 35
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 12,
        marginBottom: 5
    }
});

export default AddressScreen;
