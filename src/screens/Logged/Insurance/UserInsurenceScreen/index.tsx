import React, { useCallback, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import numeral from 'numeral';
import { useFocusEffect } from '@react-navigation/native';

// Components
import LinearHeaderGradient from '../../../../components/LinearGradientHeader';
import SuccessModal from '../../../../containers/SuccessModal';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    clearInsuranceStateAction,
    getBeneficiarysAction,
    cancelInsuranceAction,
    getCertifiedAction
} from '../../../../store/ducks/insurance/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Styles
import colors from '../../../../styles/colors';

// Utils
import { prefityNames } from '../../../../utils/prettiers';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';
import { IInsuranceStatement } from '../../../../store/ducks/insurance/types';

const UserInsurenceScreen: React.FC<
    InsuranceStackNavigationProps<'UserInsurance'>
> = ({ navigation }: InsuranceStackNavigationProps<'UserInsurance'>) => {
    const dispatch = useDispatch();

    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading
    );
    const userInsurance = useSelector(
        (state: IApplicationState) => state.insurance.userInsurance
    );
    const beneficiaryList = useSelector(
        (state: IApplicationState) => state.insurance.beneficiaryList
    );
    const maritalStateList = useSelector(
        (state: IApplicationState) => state.insurance.maritalStateList
    );
    const incomeRangeList = useSelector(
        (state: IApplicationState) => state.insurance.incomeRangeList
    );
    const certifiedIsLoading = useSelector(
        (state: IApplicationState) => state.insurance.certifiedIsLoading
    );
    const insuranceStatement = useSelector(
        (state: IApplicationState) => state.insurance.insuranceStatement
    );
    const userName = useSelector(
        (state: IApplicationState) => state.user.data.client.name
    );

    const handleOnPressEditBeneficiarys = () => {
        navigation.push('Beneficiary', { edit: true });
    };

    const handleStateName = (
        list: { code: number; name: string }[],
        code: number
    ) => {
        for (let element of list) {
            if (element.code === code) {
                return element.name;
            }
        }
        return 'Indefinido';
    };

    const maritalStateName = useMemo(
        () => handleStateName(maritalStateList, userInsurance.statusCivil),
        [userInsurance, maritalStateList]
    );

    const incomeRangeName = useMemo(
        () => handleStateName(incomeRangeList, userInsurance.incomeRange),
        [userInsurance, incomeRangeList]
    );

    useEffect(() => {
        // dispatch(getOptionsInsuranceAction({type: 'kinshipList'}))

        return () => {
            dispatch(clearInsuranceStateAction());
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            dispatch(getBeneficiarysAction());
        }, [])
    );

    return (
        <View style={styles.container}>
            <SuccessModal />
            <LinearHeaderGradient isHeaderStackHeight />
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }}>
                {insuranceLoading ? (
                    <ActivityIndicator
                        size={'large'}
                        color={colors.blue.second}
                        style={{ marginTop: 20, flex: 1 }}
                    />
                ) : (
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingHorizontal: 24 }}>
                            <View style={styles.boxInsurance}>
                                <View style={styles.datasContainer}>
                                    <Text
                                        style={[
                                            styles.text1,
                                            { color: colors.blue.primary }
                                        ]}
                                    >
                                        {userInsurance?.product?.name || ''}
                                    </Text>

                                    <Text
                                        style={[styles.text1, { fontSize: 14 }]}
                                    >
                                        Contratado
                                    </Text>
                                    <Text
                                        style={[styles.text2, { marginTop: 3 }]}
                                        numberOfLines={1}
                                    >
                                        {prefityNames(userName || '')}
                                    </Text>
                                </View>
                                <View style={styles.datasContainer}>
                                    {beneficiaryList.length > 0 && (
                                        <>
                                            <View
                                                style={[
                                                    styles.bar,
                                                    { marginVertical: 15 }
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.text1,
                                                    {
                                                        fontSize: 15,
                                                        marginBottom: 5
                                                    }
                                                ]}
                                            >
                                                Beneficiários
                                            </Text>
                                            <FlatList
                                                style={
                                                    styles.flatlistBeneficiarys
                                                }
                                                data={beneficiaryList}
                                                keyExtractor={(item, index) =>
                                                    index.toString()
                                                }
                                                renderItem={({ item }) => (
                                                    <Text
                                                        style={[styles.text2]}
                                                        numberOfLines={1}
                                                    >
                                                        {prefityNames(
                                                            item.name
                                                        )}
                                                    </Text>
                                                )}
                                            />
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                        <FlatList
                            style={styles.content}
                            ListHeaderComponent={() => (
                                <View style={{ position: 'relative' }}>
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.dataName}>
                                            Valor
                                        </Text>
                                        <Text
                                            style={[
                                                styles.data,
                                                { color: colors.text.third }
                                            ]}
                                        >
                                            {`R$ ${numeral(
                                                userInsurance.amount || ''
                                            ).format('0,0.00')}`}
                                        </Text>
                                    </View>
                                    <View style={styles.dataBar} />
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.dataName}>
                                            Tipo do Plano
                                        </Text>
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
                                        <Text style={styles.dataName}>
                                            Estado Civil
                                        </Text>
                                        <Text
                                            style={[
                                                styles.data,
                                                { color: colors.text.third }
                                            ]}
                                        >
                                            {maritalStateName}
                                        </Text>
                                    </View>
                                    <View style={styles.dataBar} />
                                    <View style={styles.dataContainer}>
                                        <Text style={styles.dataName}>
                                            Renda Mensal
                                        </Text>
                                        <Text
                                            style={[
                                                styles.data,
                                                { color: colors.text.third }
                                            ]}
                                        >
                                            {incomeRangeName}
                                        </Text>
                                    </View>
                                    <View style={styles.dataBar} />
                                    <View style={styles.dataContainer}>
                                        <Text
                                            style={[
                                                styles.dataName,
                                                { flex: 1.5 }
                                            ]}
                                        >
                                            Próximo Pagamento
                                        </Text>
                                        <Text
                                            style={[
                                                styles.data,
                                                { color: colors.text.third }
                                            ]}
                                        >
                                            {userInsurance.dueDate || ''}
                                        </Text>
                                    </View>
                                    <View style={styles.dataBar} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(getCertifiedAction());
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.certifiedButton}
                                    >
                                        <Text
                                            style={styles.certifiedButtonText}
                                        >
                                            {certifiedIsLoading
                                                ? 'Preparando Certificado...'
                                                : 'Resgatar Certificado'}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.dataBar} />
                                    {insuranceStatement.length > 0 && (
                                        <Text
                                            style={[
                                                styles.data,
                                                {
                                                    alignSelf: 'center',
                                                    marginTop: 10
                                                }
                                            ]}
                                        >
                                            Histórico de Pagamentos
                                        </Text>
                                    )}
                                </View>
                            )}
                            data={insuranceStatement}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({
                                item
                            }: {
                                item: IInsuranceStatement;
                            }) => (
                                <View
                                    style={[
                                        styles.dataContainer,
                                        {
                                            paddingHorizontal: 24,
                                            marginBottom: 10
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.data,
                                            { textAlign: 'left' }
                                        ]}
                                    >
                                        Pago
                                    </Text>
                                    <Text
                                        style={[
                                            styles.data,
                                            { color: colors.text.third }
                                        ]}
                                    >
                                        {item.operationDate.substr(3)}
                                    </Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ paddingHorizontal: 24, width: '100%' }}>
                            <View style={styles.editBox}>
                                <Text
                                    style={[
                                        styles.text1,
                                        {
                                            marginBottom: 10,
                                            fontSize: 16,
                                            marginLeft: -24
                                        }
                                    ]}
                                >
                                    {'Alterar Seus Dados'}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            marginBottom: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                        onPress={handleOnPressEditBeneficiarys}
                                    >
                                        <Text style={styles.text3}>
                                            Beneficiários
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            marginBottom: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                        onPress={() =>
                                            navigation.push('MaritalState', {
                                                edit: true
                                            })
                                        }
                                    >
                                        <Text style={styles.text3}>
                                            Estado Civil
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 10
                                        }}
                                        onPress={() =>
                                            navigation.push('Income', {
                                                edit: true
                                            })
                                        }
                                    >
                                        <Text style={styles.text3}>
                                            Renda Mensal
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default UserInsurenceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    content: {
        paddingHorizontal: 24
    },
    boxInsurance: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: colors.white,
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 25,
        paddingVertical: 20,
        paddingHorizontal: 10,
        shadowColor: '#B1C0DC3F',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 1
    },
    text1: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.fifth,
        fontSize: 18,
        textAlign: 'center'
    },
    text2: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.third,
        fontSize: 15,
        flexWrap: 'wrap'
    },
    text3: {
        fontFamily: 'Roboto-Regular',
        color: colors.blue.primary,
        fontSize: 15,
        flexWrap: 'wrap',
        marginRight: 12
    },
    cancelText: {
        fontFamily: 'Roboto-Regular',
        color: colors.blue.primary,
        fontSize: 15,
        flexWrap: 'wrap',
        textAlign: 'center',
        width: '100%',
        marginVertical: 15
    },
    bar: {
        height: 1.5,
        width: '80%',
        backgroundColor: colors.gray.fourth
    },
    data: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.fifth,
        flexWrap: 'wrap',
        flex: 2,
        textAlign: 'right'
    },
    dataName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text.fifth,
        flex: 1
    },
    certifiedButton: {},
    certifiedButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.blue.primary,
        textAlign: 'center'
    },
    dataBar: {
        height: 1.5,
        backgroundColor: colors.gray.fourth,
        marginVertical: 15
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        maxWidth: '100%'
    },
    editBox: {
        alignItems: 'center',
        paddingVertical: 15,
        paddingRight: 12,
        paddingLeft: 24,
        backgroundColor: colors.gray.tenth,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 15,
        width: '100%'
    },
    datasContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    flatlistBeneficiarys: {
        maxHeight: 70,
        maxWidth: 220
    }
});
