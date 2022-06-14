import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import TextInput from '../../../../components/TextInput';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { updateUserDataAction } from '../../../../store/ducks/updateData/actions';

// Style
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const SignUPDataScreen: React.FC<PerfilStackNavigationProps<'SignUpData'>> = ({
    navigation,
    route
}: PerfilStackNavigationProps<'SignUpData'>) => {
    const dispatch = useDispatch();
    const { isKeyboardActive } = useIsKeyboardActive();
    const [
        document,
        birthDate,
        rgInfo,
        motherName,
        loading,
        name,
        clientType,
        companyName,
        establishmentDate
    ] = useSelector((state: IApplicationState) => {
        return [
            state.user.data.client.taxIdentifier.taxId,
            state.user.data.additionalDetailsPerson?.birthDate,
            state.user.data.additionalDetailsPerson?.rg,
            state.user.data.additionalDetailsPerson?.mother,
            state.updateData.isLoading,
            state.user.data.client.name,
            state.user.data.clientType,
            state.user.data.additionalDetailsCorporate?.companyName,
            state.user.data.additionalDetailsCorporate?.establishmentDate
        ];
    }, shallowEqual);

    const isPJ = clientType === 'CORPORATE';

    const rg = rgInfo?.number || '';
    const issuer = rgInfo?.issuer || '';
    const state = rgInfo?.state || '';

    let issueDate = '';

    if (rgInfo?.issueDate) {
        const [year, month, day] = rgInfo.issueDate.split('-');
        issueDate = `${day}/${month}/${year}`;
    }

    let date = '';

    if (isPJ) {
        const [year, month, day] = establishmentDate!.split('-');
        date = `${day}/${month}/${year}`;
    } else if (birthDate) {
        const [year, month, day] = birthDate.split('-');
        date = `${day}/${month}/${year}`;
    }

    const [updated, setUpdated] = useState({
        rg,
        issueDate,
        issuer,
        state
    });

    const [issueDateValidation, setIssueDateValidation] = useState('');

    // const [ validation, setValidation ] = useState({
    //     rg: "",
    //     motherName: ""
    // })

    const onChangeText = (name: string, value: string) => {
        setUpdated((oldstate: any) => ({
            ...oldstate,
            [name]: value.toUpperCase()
        }));
    };

    const update = () => {
        if (route.params?.isCardRequest) {
            navigation.push('Perfil', {
                screen: 'ZipCode',
                params: { isCardRequest: true }
            });
            return;
        }
        let updateIssueDate = '';

        if (updated.issueDate.length > 0) {
            const [day, month, year] = updated.issueDate.split('/');
            updateIssueDate = `${year}-${month}-${day}`;
        }

        navigation.push('Perfil', {
            screen: 'ValidateAccess',
            params: {
                action: () =>
                    dispatch(
                        updateUserDataAction({
                            // mother: updated.motherName,
                            rg: {
                                number: updated.rg,
                                issueDate: updateIssueDate,
                                issuer: updated.issuer,
                                state: updated.state
                            }
                        })
                    )
            }
        });
    };

    useEffect(() => {
        let validation = '';
        const [day, month, year] = updated.issueDate.split('/');
        const dayNumber = parseInt(day);
        const monthNumber = parseInt(month);
        const yearNumber = parseInt(year);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        if (year?.length === 4) {
            if (
                yearNumber > currentYear ||
                yearNumber < 1000 ||
                dayNumber <= 0 ||
                dayNumber > 31 ||
                monthNumber <= 0 ||
                monthNumber > 12 ||
                yearNumber === 0 ||
                (monthNumber === 2 && dayNumber > 29) ||
                currentYear - yearNumber > 120
            ) {
                validation = '* Informe uma data válida.';
            } else if (yearNumber === currentYear) {
                if (monthNumber > currentMonth + 1) {
                    validation = '* Informe uma data válida.';
                } else if (monthNumber === currentMonth + 1) {
                    if (dayNumber > currentDay) {
                        validation = '* Informe uma data válida.';
                    }
                }
            }
        }
        setIssueDateValidation(validation);
    }, [updated.issueDate]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={[
                        { flex: 1 },
                        isKeyboardActive && { marginBottom: 15 }
                    ]}
                    behavior="padding"
                >
                    <ScrollView>
                        {route.params?.isCardRequest && (
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    color: colors.text.second,
                                    fontSize: 20,
                                    marginBottom: 31,
                                    lineHeight: 22
                                }}
                            >
                                Confirme seus dados{'\n'}
                                cadastrais
                            </Text>
                        )}
                        <View style={{ marginBottom: 30 }}>
                            <Text
                                allowFontScaling={false}
                                style={[styles.label]}
                            >
                                {isPJ ? 'Razão Social' : 'Nome'}
                            </Text>
                            <TextInput
                                style={[styles.input, { opacity: 0.5 }]}
                                value={isPJ ? companyName : name}
                                editable={false}
                            />
                            {/* {validation.motherName.length > 0 && (
                        <Text allowFontScaling={false} style={styles.errorMessage}>
                            {validation.motherName}
                        </Text>
                        )} */}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{ marginBottom: 30, width: '45%' }}>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.label]}
                                >
                                    {isPJ ? 'CNPJ' : 'CPF'}
                                </Text>
                                <TextInput
                                    style={[styles.input, { opacity: 0.5 }]}
                                    type="custom"
                                    options={{
                                        mask:
                                            document.replace(/\D/g, '').length >
                                            11
                                                ? '99.999.999/9999-99'
                                                : '999.999.999-999'
                                    }}
                                    value={document}
                                    editable={false}
                                />
                            </View>
                            <View style={{ marginBottom: 30, width: '45%' }}>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.label]}
                                >
                                    {isPJ
                                        ? 'Data de fundação'
                                        : 'Data de nascimento'}
                                </Text>
                                <TextInput
                                    style={[styles.input, { opacity: 0.5 }]}
                                    type="datetime"
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    value={date}
                                    editable={false}
                                />
                            </View>
                        </View>
                        {!isPJ && (
                            <>
                                <View style={{ marginBottom: 30 }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={[styles.label]}
                                    >
                                        Nome da mãe
                                    </Text>
                                    <TextInput
                                        style={[styles.input, { opacity: 0.5 }]}
                                        value={motherName}
                                        editable={false}
                                    />
                                    {/* {validation.motherName.length > 0 && (
                        <Text allowFontScaling={false} style={styles.errorMessage}>
                            {validation.motherName}
                        </Text>
                        )} */}
                                </View>
                                {!route.params?.isCardRequest && (
                                    <>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginBottom: 30,
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <View style={{ width: '45%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[styles.label]}
                                                >
                                                    RG
                                                </Text>
                                                <TextInput
                                                    editable={
                                                        !route.params
                                                            ?.isCardRequest
                                                    }
                                                    style={[
                                                        styles.input,
                                                        route.params
                                                            ?.isCardRequest && {
                                                            opacity: 0.5
                                                        }
                                                    ]}
                                                    name="rg"
                                                    value={updated.rg}
                                                    type="only-numbers"
                                                    onChangeText={(
                                                        name: any,
                                                        value
                                                    ) =>
                                                        onChangeText(
                                                            name,
                                                            value
                                                        )
                                                    }
                                                />
                                                {/* {validation.rg.length > 0 && (
                            <Text allowFontScaling={false} style={styles.errorMessage}>
                                {validation.rg}
                            </Text>
                            )} */}
                                            </View>
                                            <View style={{ width: '45%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[styles.label]}
                                                >
                                                    Data de expedição
                                                </Text>
                                                <TextInput
                                                    editable={
                                                        !route.params
                                                            ?.isCardRequest
                                                    }
                                                    style={[
                                                        styles.input,
                                                        route.params
                                                            ?.isCardRequest && {
                                                            opacity: 0.5
                                                        }
                                                    ]}
                                                    name="issueDate"
                                                    value={updated.issueDate}
                                                    type="datetime"
                                                    options={{
                                                        format: 'DD/MM/YYYY'
                                                    }}
                                                    onChangeText={(
                                                        name: any,
                                                        value
                                                    ) =>
                                                        onChangeText(
                                                            name,
                                                            value
                                                        )
                                                    }
                                                />
                                                {issueDateValidation.length >
                                                    0 && (
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={
                                                            styles.errorMessage
                                                        }
                                                    >
                                                        {issueDateValidation}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginBottom: 30,
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <View style={{ width: '45%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[styles.label]}
                                                >
                                                    Órgão expedidor
                                                </Text>
                                                <TextInput
                                                    editable={
                                                        !route.params
                                                            ?.isCardRequest
                                                    }
                                                    style={[
                                                        styles.input,
                                                        route.params
                                                            ?.isCardRequest && {
                                                            opacity: 0.5
                                                        }
                                                    ]}
                                                    name="issuer"
                                                    value={updated.issuer}
                                                    onChangeText={(
                                                        name: any,
                                                        value
                                                    ) =>
                                                        onChangeText(
                                                            name,
                                                            value
                                                        )
                                                    }
                                                />
                                                {/* {validation.rg.length > 0 && (
                            <Text allowFontScaling={false} style={styles.errorMessage}>
                                {validation.rg}
                            </Text>
                            )} */}
                                            </View>
                                            <View style={{ width: '45%' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[styles.label]}
                                                >
                                                    UF
                                                </Text>
                                                <TextInput
                                                    editable={
                                                        !route.params
                                                            ?.isCardRequest
                                                    }
                                                    style={[
                                                        styles.input,
                                                        route.params
                                                            ?.isCardRequest && {
                                                            opacity: 0.5
                                                        }
                                                    ]}
                                                    name="state"
                                                    value={updated.state}
                                                    maxLength={2}
                                                    onChangeText={(
                                                        name: any,
                                                        value
                                                    ) =>
                                                        onChangeText(
                                                            name,
                                                            value
                                                        )
                                                    }
                                                />
                                                {/* {validation.rg.length > 0 && (
                            <Text allowFontScaling={false} style={styles.errorMessage}>
                                {validation.rg}
                            </Text>
                            )} */}
                                            </View>
                                        </View>
                                    </>
                                )}
                            </>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
                {route.params?.isCardRequest && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.push('UserHelp')}
                    >
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 16,
                                color: colors.blue.second,
                                textAlign: 'center',
                                marginBottom: 20
                            }}
                        >
                            Clique aqui para nosso{'\n'}
                            canal de ajuda
                        </Text>
                    </TouchableOpacity>
                )}
                <ActionButton
                    label={
                        route.params?.isCardRequest ? 'Confirmar' : 'Continuar'
                    }
                    onPress={update}
                    isLoading={loading}
                    disabled={
                        (isPJ ||
                            updated.rg.length <= 0 ||
                            updated.issueDate.replace(/\D/g, '').length < 8 ||
                            updated.issuer.length <= 0 ||
                            updated.state.length < 2 ||
                            issueDateValidation.length > 0 ||
                            (updated.rg === rgInfo?.number &&
                                updated.issueDate === issueDate &&
                                updated.issuer === rgInfo?.issuer &&
                                updated.state ===
                                    rgInfo?.state.toUpperCase())) &&
                        !route.params?.isCardRequest
                    }
                />
            </SafeAreaView>
        </View>
    );
};

export default SignUPDataScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
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
        borderRadius: 0
    },
    label: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.third,
        fontSize: 12,
        marginBottom: 5
    },
    errorMessage: {
        marginTop: 7,
        fontSize: 12,
        color: colors.text.invalid,
        fontFamily: 'Roboto-Medium'
        // marginHorizontal: 30,
    }
});
