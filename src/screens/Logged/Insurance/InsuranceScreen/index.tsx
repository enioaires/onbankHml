import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Image
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import numeral from 'numeral';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader'
import ActionButton from '../../../../components/ActionButton';
import AlertModal from '../../../../containers/AlertModal';

// Store
import { IApplicationState } from '../../../../store/types';
import { clearInsuranceStateAction } from '../../../../store/ducks/insurance/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Utils
import { INSURANCE_INFO } from '../../../../utils/variables';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

// Styles
import colors from '../../../../styles/colors';

const confImg = require('../../../../../assets/confirmation-signup-img.png');

const InsuranceScreen: React.FC<InsuranceStackNavigationProps<'Insurance'>> = ({
    navigation
}: InsuranceStackNavigationProps<'Insurance'>) => {
    const dispatch = useDispatch()
    const insuranceSelected = useSelector(
        (state: IApplicationState) => state.insurance.insuranceSelected
    );
    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading 
    );

    const [isVisible, setIsVisible] = useState(false)

    const handleOnPress = () => {
        navigation.push('MaritalState')
    };
    
    useEffect(() => {
        switch (insuranceSelected.statusUser) {
            case 'SOLICITADO':
                /* dispatch(setAlertMessageAction({
                    title: 'Aviso',
                    message: 'Seu seguro foi solicitado e está em processamento. Em alguns instantes estará ativo.',
                    type: 'info'
                })); */
                setIsVisible(true)
                break;
            case 'ERROR':
                dispatch(setAlertMessageAction({
                    title: 'Ops...',
                    message: 'Ocorreu algum erro na solicitação do seu seguro, entre em contato com o suporte Onbank.',
                    type: 'info'
                }));
                break;
            default:
                break
        };

        return () => {
            dispatch(clearInsuranceStateAction())
        }
    },[])
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <LinearGradientHeader isHeaderStackHeight />
            <AlertModal
                icon={confImg}
                message='Seu seguro foi solicitado e está em processamento. Em alguns instantes estará disponível para visualização.'
                title='Agora falta pouco!'
                showAlert={isVisible}
                buttonProps={{
                    label: 'Ok',
                    closeAlert: () => setIsVisible(false)
                }}
                largeIcon
            />
            <SafeAreaView style={{ flex: 1 }}>
                {insuranceLoading ?
                    <ActivityIndicator
                        size={'large'}
                        color={colors.blue.second}
                        style={{marginTop: 60}}
                    />
                    :
                    <>
                        <ScrollView style={styles.content}>
                            <Text style={[styles.title, { marginBottom: 25 }]}>
                                Garanta seu seguro{'\n'}em poucos cliques
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    source={require('../../../../../assets/icons/bank-onbank.png')}
                                    style={{
                                        width: 50,
                                        marginRight: 15,
                                        transform: [
                                            {translateY: -10}
                                        ]
                                    }}
                                    resizeMode='contain'
                                />
                                <Text style={styles.text}>
                                    {insuranceSelected.name}
                                </Text>
                            </View>
                            <Text style={[styles.text, {marginBottom: 5}]}>
                                Parcela mensal de
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text 
                                    style={[
                                        styles.title, 
                                        {color: colors.blue.sixth, fontFamily: 'Roboto-Regular', fontSize: 28}
                                    ]}
                                >
                                    {'R$ '}
                                </Text>
                                <Text style={[styles.title, {color: colors.blue.sixth, fontSize: 28}]}>
                                    {numeral(insuranceSelected.baseAmount).format('0,0.00')}
                                </Text>
                            </View>
                            <View style={styles.bar}/>
                            <Text style={[styles.text, { alignSelf: 'center' }]}>
                                O que é contemplado
                            </Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={['Morte\nAcidenal\nR$ 25.000,00', 'Invalidez\nTotal e Parcial\nAté R$ 25.000,00', 'Proteção\nPessoal', 'Assistência\nFuneral\nR$ 5000,00', 'Assistência Nutricional\nNutriline']}
                                keyExtractor={(item) => item.toString()}
                                renderItem={({item}) => 
                                    <View style={styles.contemplatedBox}>
                                        <Text style={styles.contemplatedText}>{item}</Text>
                                    </View>
                                }
                            /> 
                            <View style={styles.bar}/>
                            <Text style={[styles.text, {textAlign: 'center'}]}>
                                Entenda melhor sua cobertura
                            </Text>
                            <Text style={styles.textDescription}>
                                {INSURANCE_INFO}
                            </Text>
                        </ScrollView>
                        <View style={{ paddingHorizontal: 24 }}>
                            <ActionButton
                                label='Contratar'
                                onPress={handleOnPress}
                                style={{ marginTop: 15 }}
                                disabled={
                                    insuranceSelected.statusUser == 'ATIVO'||
                                    insuranceSelected.statusUser == 'SOLICITADO' ||
                                    insuranceSelected.statusUser == 'ERROR'
                                }
                            />
                        </View>
                    </>
                }
            </SafeAreaView>
        </View>
    )
}

export default InsuranceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 15
    },
    bar: {
        width: '100%',
        height: 1,
        backgroundColor: colors.gray.primary,
        marginVertical: 30
    },
    contemplatedBox: {
        height: 70,
        paddingHorizontal: 15,
        backgroundColor: colors.blue.second,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contemplatedText: {
        color: colors.white,
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        textAlign: 'center'
    },
    title: {
        alignSelf: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 22,
        color: colors.blue.primary,
        textAlign: 'center'
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: colors.text.fifth,
        marginBottom: 15
    },
    textDescription: {
        fontFamily: 'Roboto',
        fontSize: 13.5,
        color: colors.text.fifth,
        marginBottom: 30,
        textAlign: 'justify'
    }
})