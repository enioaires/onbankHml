import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Modal from 'react-native-modal';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';
import TextInput from '../../../../components/TextInput';
import ActionButton from '../../../../components/ActionButton';
import OptionButtonGray from '../../../../components/OptionButtonGray';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeBeneficiaryListAction,
    getOptionsInsuranceAction
} from '../../../../store/ducks/insurance/actions';

// Styles
import colors from '../../../../styles/colors';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

const BeneficiaryScreen: React.FC<InsuranceStackNavigationProps<'Beneficiary'>> = ({
    navigation,
    route
}: InsuranceStackNavigationProps<'Beneficiary'>) => {
    const dispatch = useDispatch();
    const params = route.params
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading
    );
    const beneficiaryList = useSelector(
        (state: IApplicationState) => state.insurance.beneficiaryList
    );
    const kinshipList = useSelector(
        (state: IApplicationState) => state.insurance.kinshipList
    ); 

    const [isVisible, setVisible] = useState<{visible: boolean; index: number }>({visible: false, index: 0})

    const handleOnChangeText = (value: string, index: number) => {
        const item = { ...beneficiaryList[index], name: value };
        let newList = [...beneficiaryList];
        newList[index] = item;
        dispatch(changeBeneficiaryListAction(newList))
    };

    const handleRemoveBeneficiary = (index: number) => {
        let newList = [...beneficiaryList];
        newList.splice(index, 1);
        dispatch(changeBeneficiaryListAction(newList))
    };

    const handleAddBeneficiary = () => {
        let newList = [...beneficiaryList];
        newList.push({name: '', percent: 0, kinship: {name: '', code: 0}});
        dispatch(changeBeneficiaryListAction(newList))
    };

    const handleSelectKinship = (value: {name: string; code: number}) => {
        const item = { ...beneficiaryList[isVisible.index], kinship: value };
        let newList = [...beneficiaryList];
        newList[isVisible.index] = item;
        dispatch(changeBeneficiaryListAction(newList));
        setVisible({visible: false, index: 0});
    };

    const handleKinshipStateName = ( code: number) => {
        for (let element of kinshipList) {
            if ( element.code === code ) {
                return element.name
            }
        }
        return
    };

    const handleRenderBeneficiarys = (index: number) => (
        <View>
            <TextInput
                name='name'
                onChangeText={(_, value) => handleOnChangeText(value, index)}
                value={beneficiaryList[index].name}
                placeholder='Insira o nome completo do beneficiário'
                placeholderTextColor={colors.text.third}
                style={styles.textInput}
                autoCorrect={false}
            />
            <View style={styles.bottomBeneficiaryContainer}>
                <TouchableOpacity
                    style={styles.selectKinshipButton}
                    onPress={() => {
                        setVisible({visible: true, index: index});
                    }}
                >
                    <Text style={styles.selectKinshipButtonText}>
                        {handleKinshipStateName(beneficiaryList[index].kinship.code) || 'Selecione o parentesto'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleRemoveBeneficiary(index)}
                >
                    <Image
                        source={require('../../../../../assets/icons/close.png')}
                        resizeMode="contain"
                        style={{
                            width: 22,
                            height: 18,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleOnPress = () => {
        if (beneficiaryList.length === 0) {
            params?.edit ? 
                navigation.push('Confirmation', {edit: true, type: 'beneficiary'}) :
                navigation.push('Confirmation')
        } else {
            params?.edit ? 
                navigation.push('Percent', { edit: true }) :
                navigation.push('Percent')
        }
    };

    const handleIsDisabled = () => {
        if (beneficiaryList.length <= 0) {
            return false
        }

        for (let element of beneficiaryList) {
            if (element.kinship.code === 0 || element.name.length <= 0 || !element.name.split(' ')[1]) {
                return true
            }
        }

        return false
    };

    /* useEffect(() => {
        kinshipList.length <= 0 &&
        dispatch(getOptionsInsuranceAction({type: 'kinshipList'}))
    },[]) */

    return (
        <View style={styles.container}> 
            <Modal
                style={{ alignItems: 'center', justifyContent: 'center' }}
                isVisible={isVisible.visible}
                backdropOpacity={0.1}
                onBackdropPress={() => setVisible({visible: false, index: 0})}
            >
                <View style={styles.modalKinshipList}>
                    <Text style={[
                        styles.selectKinshipButtonText, 
                        {alignSelf: 'center', marginBottom: 15}
                    ]}>
                        Selecione o parentesco
                    </Text>
                    <FlatList
                        data={kinshipList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => 
                            <OptionButtonGray
                                title={item.name}
                                onPress={() => handleSelectKinship(item)}
                            />
                        }
                        contentContainerStyle={{ paddingHorizontal: 24 }}
                    />
                </View>
            </Modal>
            <LinearGradientHeader isHeaderStackHeight />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.content}>
                    {insuranceLoading && !isVisible ?
                        <ActivityIndicator
                            size={'large'}
                            color={colors.blue.second}
                            style={{marginTop: 20, flex: 1}}
                        />
                        :
                        <>
                            <Text style={styles.title}>
                                Beneficiários
                            </Text>
                            {beneficiaryList.length == 0 &&
                                <Text style={styles.warnText}>
                                    Você pode adicionar quais serão os beneficiários. Caso não deseje especificar, clique em continuar. Por padrão os beneficiários serão cônjuge e filhos.
                                </Text>
                            }
                            <FlatList
                                data={beneficiaryList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) => handleRenderBeneficiarys(index)}
                                contentContainerStyle={{
                                    paddingBottom: 20,
                                    paddingHorizontal: 24
                                }}
                            />
                        </>
                    }
                    <View style={{paddingHorizontal: 24}}>
                        <ActionButton
                            style={{backgroundColor: 'transparent', marginBottom: 10, marginTop: 20}}
                            label='Adicionar beneficiário'
                            onPress={handleAddBeneficiary}
                            secondTheme
                        />
                        <ActionButton
                            label={beneficiaryList.length == 0 ? 'Continuar' : 'Confirmar'}
                            onPress={handleOnPress}
                            disabled={handleIsDisabled()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default BeneficiaryScreen;

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
    modalKinshipList: {
        backgroundColor: colors.white,
        paddingVertical: 24,
        height: '50%',
        width: '85%',
        borderRadius: 10
    },
    selectKinshipButton: {
        justifyContent: 'center',
        paddingLeft: 15,
        marginVertical: 10
    },
    selectKinshipButtonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: colors.blue.primary
    },
    warnText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        color: colors.blue.fifth,
        textAlign: 'center',
        marginHorizontal: 24
    },
    textInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        paddingBottom: 0,
        paddingLeft: 10,
        borderRadius: 0,
        fontSize: 17
    },
    bottomBeneficiaryContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%', 
        justifyContent: 'space-between'
    }
})