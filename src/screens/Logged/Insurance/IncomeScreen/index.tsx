import React, { useEffect } from 'react';
import { 
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';
import OptionButtonGray from '../../../../components/OptionButtonGray';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    getOptionsInsuranceAction,
    changeInsurancePayloadAction
} from '../../../../store/ducks/insurance/actions';

// Styles
import colors from '../../../../styles/colors';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

const IncomeScreen: React.FC<InsuranceStackNavigationProps<'Income'>> = ({
    navigation,
    route
}: InsuranceStackNavigationProps<'Income'>) => {
    const dispatch = useDispatch();
    const params = route.params

    const incomeRangeList = useSelector(
        (state: IApplicationState) => state.insurance.incomeRangeList
    );
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading
    );

    useEffect(() => {
        // dispatch(getOptionsInsuranceAction({type: 'incomeRangeList'}))

        return () => {
            params?.edit && dispatch(changeInsurancePayloadAction(
                'income', 
                { code: 0, name: '' }
            ))
        }
    },[])

    const handleOnPress = (payload: {code: number; name: string}) => {
        dispatch(changeInsurancePayloadAction('income', payload));
        if (params?.edit) {
            navigation.push('Confirmation', { edit: true, type: 'income' });
        } else {
            navigation.push('Beneficiary');
        }
    };

    return (
        <View style={styles.container}> 
            <LinearGradientHeader isHeaderStackHeight />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Selecione sua renda mensal
                    </Text>
                    {insuranceLoading ?
                        <ActivityIndicator
                            size={'large'}
                            color={colors.blue.second}
                            style={{marginTop: 40}}
                        />
                        :
                        <FlatList
                            data={incomeRangeList}
                            keyExtractor={(item) => item.code.toString()}
                            renderItem={({item}) => 
                                <OptionButtonGray 
                                    title={item.name}
                                    onPress={() => handleOnPress(item)}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </View>
            </SafeAreaView>
        </View>
    );
};

export default IncomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 15
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: colors.text.fifth,
        alignSelf: 'center',
        marginBottom: 20
    }
})