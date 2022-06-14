import React, { useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import numeral from 'numeral';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    requestInsuranceAction,
    postBeneficiarysAction,
    putOptionAction
} from '../../../../store/ducks/insurance/actions';

// Styles
import colors from '../../../../styles/colors';

// Utils
import { prefityNames } from '../../../../utils/prettiers';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

const ConfirmationScreen: React.FC<
    InsuranceStackNavigationProps<'Confirmation'>
> = ({ navigation, route }: InsuranceStackNavigationProps<'Confirmation'>) => {
    const dispatch = useDispatch();
    const params = route.params;
    const insuranceSelected = useSelector(
        (state: IApplicationState) => state.insurance.insuranceSelected
    );
    const income = useSelector(
        (state: IApplicationState) => state.insurance.payload.income
    );
    const maritalState = useSelector(
        (state: IApplicationState) => state.insurance.payload.maritalState
    );
    const beneficiaryList = useSelector(
        (state: IApplicationState) => state.insurance.beneficiaryList
    );
    const kinshipList = useSelector(
        (state: IApplicationState) => state.insurance.kinshipList
    );
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading
    );

    const handleRequestInsurance = (password: string) => {
        dispatch(requestInsuranceAction(navigation, password));
    };
    const handleOnPress = () => {
        if (params?.edit) {
            switch (params.type) {
                case 'beneficiary':
                    navigation.push('Perfil', {
                        screen: 'ValidateAccess',
                        params: {
                            action: () =>
                                dispatch(postBeneficiarysAction(navigation))
                        }
                    });
                    return;
                case 'maritalState':
                    navigation.push('Perfil', {
                        screen: 'ValidateAccess',
                        params: {
                            action: () =>
                                dispatch(
                                    putOptionAction('maritalState', navigation)
                                )
                        }
                    });
                    return;
                case 'income':
                    navigation.push('Perfil', {
                        screen: 'ValidateAccess',
                        params: {
                            action: () =>
                                dispatch(putOptionAction('income', navigation))
                        }
                    });
                    return;
                default:
                    return;
            }
        }

        navigation.push('General', {
            screen: 'TransactionPassword',
            params: {
                action: (transactionPassword) =>
                    dispatch(
                        requestInsuranceAction(navigation, transactionPassword)
                    )
            }
        });
    };

    const handleStateName = (code: number) => {
        let name = '';
        kinshipList.forEach((element) => {
            if (element.code == code) {
                name = element.name;
            }
        });
        return name;
    };

    return (
        <View style={styles.container}>
            <LinearGradientHeader isHeaderStackHeight />
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        paddingHorizontal: 24
                    }}
                >
                    <FlatList
                        style={styles.content}
                        data={beneficiaryList}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => (
                            <>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.text,
                                        { marginTop: 20, fontSize: 18 }
                                    ]}
                                >
                                    Confirme os dados do seguro
                                </Text>
                                <View style={styles.dataContainer}>
                                    <Text style={styles.data}>Valor</Text>
                                    <Text
                                        style={[
                                            styles.data,
                                            { color: colors.text.third }
                                        ]}
                                    >
                                        {`R$ ${numeral(
                                            insuranceSelected.baseAmount
                                        ).format('0,0.00')}`}
                                    </Text>
                                </View>
                                <View style={styles.dataBar} />
                                <View style={styles.dataContainer}>
                                    <Text style={styles.data}>Parcela</Text>
                                    <Text
                                        style={[
                                            styles.data,
                                            { color: colors.text.third }
                                        ]}
                                    >
                                        Mensal
                                    </Text>
                                </View>
                                <View style={styles.dataBar} />
                                <View style={styles.dataContainer}>
                                    <Text style={styles.data}>Plano</Text>
                                    <Text
                                        style={[
                                            styles.data,
                                            { color: colors.text.third }
                                        ]}
                                    >
                                        Padrão
                                    </Text>
                                </View>
                                <View style={styles.dataBar} />
                                {!!maritalState.name && (
                                    <>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.data}>
                                                Estado Civil
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.data,
                                                    { color: colors.text.third }
                                                ]}
                                            >
                                                {maritalState.name}
                                            </Text>
                                        </View>
                                        <View style={styles.dataBar} />
                                    </>
                                )}
                                {!!income.name && (
                                    <>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.data}>
                                                Renda Mensal
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.data,
                                                    { color: colors.text.third }
                                                ]}
                                            >
                                                {income.name}
                                            </Text>
                                        </View>
                                        <View style={styles.dataBar} />
                                    </>
                                )}
                            </>
                        )}
                        renderItem={({ item, index }) =>
                            !!item.kinship.name ||
                            (params?.edit && params?.type == 'beneficiary') ? (
                                <>
                                    <View
                                        style={[
                                            styles.dataContainer,
                                            { marginBottom: 4 }
                                        ]}
                                    >
                                        <Text
                                            style={styles.data}
                                        >{`Beneficiário ${index + 1}`}</Text>
                                        <Text style={styles.dataDescription}>
                                            {prefityNames(item.name)}
                                        </Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.data}>
                                            Parentesco
                                        </Text>
                                        <Text style={styles.dataDescription}>
                                            {handleStateName(
                                                item.kinship.code || 0
                                            )}
                                        </Text>
                                    </View>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.data}>
                                            Percentual
                                        </Text>
                                        <Text style={styles.dataDescription}>
                                            {`${item.percent} %`}
                                        </Text>
                                    </View>
                                    <View style={styles.dataBar} />
                                </>
                            ) : (
                                <View />
                            )
                        }
                    />
                    <ActionButton label="Confirmar" onPress={handleOnPress} />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    content: {
        flex: 1,
        marginTop: 15
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: colors.text.fifth,
        alignSelf: 'center',
        marginBottom: 20
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
    text: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth,
        fontSize: 23,
        marginBottom: 45,
        alignSelf: 'center',
        marginTop: 10
    },
    dataDescription: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.third
    }
});
