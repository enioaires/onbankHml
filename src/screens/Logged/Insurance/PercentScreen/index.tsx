import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { 
    changeBeneficiaryListAction
} from '../../../../store/ducks/insurance/actions';

// Styles
import colors from '../../../../styles/colors';

// Utils
import { prefityNames } from '../../../../utils/prettiers';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';


const PercentScreen: React.FC<InsuranceStackNavigationProps<'Percent'>> = ({
    navigation,
    route
}: InsuranceStackNavigationProps<'Percent'>) => {
    const dispatch = useDispatch();
    const params = route.params
    const beneficiaryList = useSelector(
        (state: IApplicationState) => state.insurance.beneficiaryList
    );
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading
    );
    const kinshipList = useSelector(
        (state: IApplicationState) => state.insurance.kinshipList
    );
    const isIntDiv = 100 % beneficiaryList.length  === 0
    const [listPercent, setListPercent] = useState<number[][]>([])
    const [remnantPercent, setRemnantPercent] = useState(0)
    
    const handleListPercent = () => {
        let newList: any[] = []
        beneficiaryList.forEach((element, index) => {
            if (!isIntDiv && index === 0) {
                const percent = 
                    Math.floor(100 / beneficiaryList.length) + (100 % beneficiaryList.length)
                newList.push([percent, percent + 1, 101])
            } else {
                const percent = Math.floor(100 / beneficiaryList.length)
                newList.push([percent, percent + 1, 101])
            }
        })
        setListPercent(newList)
    }

    const handleValueChange = (value: number, index: number) => {
        let newRemnantValue = remnantPercent + beneficiaryList[index].percent - value 

        let newBeneficiaryList = beneficiaryList
        newBeneficiaryList[index].percent = value
        
        let newListPercent: any[] = []
        listPercent.forEach((element, indexInside) => {
            newListPercent.push([
                newBeneficiaryList[indexInside].percent,
                newBeneficiaryList[indexInside].percent + newRemnantValue + 1,
                101
            ])
        });

        setListPercent(newListPercent)
        dispatch(changeBeneficiaryListAction(newBeneficiaryList))
        setRemnantPercent(newRemnantValue)
    }

    const handleIsDisabled = () => {
        for (let element of beneficiaryList) {
            if (element.percent <= 0) {
                return true
            }
        }

        return false
    };

    const handleOnPress = () => {
        if (params?.edit) {
            navigation.push('Confirmation', {edit: true, type: 'beneficiary'})
        } else {
            navigation.push('Confirmation')
        }
    };

    const handleKinshipStateName = ( code: number) => {
        for (let element of kinshipList) {
            if ( element.code === code ) {
                return element.name
            }
        }
        return ''
    };

    useEffect(() => {
        handleListPercent()
        
        let newBeneficiaryList = beneficiaryList
        newBeneficiaryList.forEach((element, index) => {
            newBeneficiaryList[index].percent = !isIntDiv && index === 0 ? 
                Math.floor(100 / beneficiaryList.length) + (100 % beneficiaryList.length) :
                Math.floor(100 / beneficiaryList.length)
        })
        dispatch(changeBeneficiaryListAction(newBeneficiaryList))

        return () => {
            dispatch(changeBeneficiaryListAction(newBeneficiaryList))
        }
    },[])

    return (
        <View style={styles.container}> 
            <LinearGradientHeader isHeaderStackHeight />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Defina o percentual{'\n'}de cada beneficiário
                    </Text>
                    <FlatList
                        data={beneficiaryList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <View style={{alignItems: 'center'}}>
                                <View 
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}
                                >
                                    <View>
                                        <Text style={styles.name}>
                                            {prefityNames(item.name)}
                                        </Text>
                                        <Text style={styles.kinship}>
                                            {!!item.kinship.name ? 
                                                item.kinship.name : 
                                                handleKinshipStateName(item.kinship.code)
                                            }
                                        </Text>
                                    </View>
                                    {/* <Text style={styles.percent}>
                                        {`${item.percent} %`}
                                    </Text> */}
                                </View>
                                <MultiSlider
                                    sliderLength={230}
                                    min={0}
                                    max={101}
                                    snapped
                                    values={listPercent[index]}
                                    onValuesChangeFinish={(value) => handleValueChange(value[0], index)}
                                    selectedStyle={{backgroundColor: colors.blue.second}}
                                    unselectedStyle={{backgroundColor: colors.gray.primary}}
                                    markerStyle={{
                                        backgroundColor: colors.blue.second,
                                        borderColor: colors.blue.second,
                                        height: 25,
                                        width: 25
                                    }}
                                    enableLabel
                                    customLabel={({ oneMarkerValue }) => 
                                        <View style={styles.labelPercentContainer}>
                                            <Text style={styles.percent}>
                                                {`${oneMarkerValue} %`}
                                            </Text>
                                        </View>
                                    }
                                    containerStyle={{flexDirection: 'row'}}
                                />
                                <View style={styles.dataBar} />
                            </View>
                        )}
                    />
                    <Text style={styles.title}>
                        {`${100 - remnantPercent}% do seguro definido`}
                    </Text>
                    <ActionButton
                        label='Confirmar'
                        onPress={handleOnPress}
                        disabled={handleIsDisabled() || remnantPercent !== 0}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default PercentScreen;

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
        marginVertical: 20,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: colors.text.fifth,
        alignSelf: 'flex-start',
        marginLeft: 40,
        marginBottom: 5
    },
    kinship: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.text.fifth,
        alignSelf: 'flex-start',
        marginLeft: 40
    },
    percent: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: colors.text.fifth,
    },
    dataBar: {
        height: 1.5,
        backgroundColor: colors.gray.fourth,
        marginVertical: 15,
        width: '100%'
    },
    labelPercentContainer: {
        alignSelf: 'flex-end',
        transform: [
            {translateY: -20},
            {translateX: 25}
        ]
    }
})