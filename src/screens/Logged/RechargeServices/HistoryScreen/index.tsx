import React, { useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    FlatList,
    ActivityIndicator,
    StatusBar,
    Image
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as dateFns from 'date-fns';
import numeral from 'numeral';
import Clipboard from '@react-native-community/clipboard';
import { showMessage } from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Types
import { RechargeServicesStackNavigationProps } from '../../../../routes/Logged/types';
import { IRechargeServiceHistory } from '../../../../store/ducks/rechargeServices/types';

// Store
import { getRechargeServicesHistoryAction } from '../../../../store/ducks/rechargeServices/actions';
import { IApplicationState } from '../../../../store/types';

// Styles
import colors from '../../../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Components 
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

const HistoryScreen: React.FC<RechargeServicesStackNavigationProps<'History'>> = ({
    navigation
}: RechargeServicesStackNavigationProps<'History'>) => {
    const dispatch = useDispatch();

    const rechargeServiceHistory = useSelector(
        (state: IApplicationState) => state.rechargeServices.rechargeServicesHistory
    );
    const isLoading = useSelector(
        (state: IApplicationState) => state.rechargeServices.isLoading
    );

    useEffect(() => {
        dispatch(getRechargeServicesHistoryAction())
    },[])

    const handleItems = (item: IRechargeServiceHistory) => {
        const handleOnPressPin = () => {
            Clipboard.setString(item?.pin || '');
            showMessage({
                message: 'Copiado!',
                description: 'código PIN copiado!',
                backgroundColor: colors.blue.second,
                icon: 'success'
            });
        };

        return (
            <View style={styles.historyContainer}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}> 
                    <View style={{ flex: 2.4, paddingRight: 10 }}>
                        <Text style={styles.productName}>
                            {item.productName}
                        </Text>
                        <Text style={styles.productType}>
                            {item.productType}
                        </Text>
                        {item.pin ? 
                            <TouchableOpacity
                                onPress={handleOnPressPin}
                            >
                                <Text style={styles.valueLabel}>
                                    PIN:
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.value}>
                                        {item.pin}
                                    </Text>
                                    <Image
                                        source={require('../../../../../assets/icons/new_icons/copy-gray.png')}
                                        style={{
                                            marginLeft: 5,
                                            width: 15,
                                            height: 15
                                        }}
                                    />
                                </View>
                            </TouchableOpacity> : 
                            null
                        }
                        {item.signedCode ? 
                            <TouchableOpacity
                                disabled={true}
                            >
                                <Text style={styles.valueLabel}>
                                    Código do assinante:
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.value}>
                                        {item.signedCode}
                                    </Text>
                                </View>
                            </TouchableOpacity> : 
                            null
                        }
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <>
                            <Text style={[styles.valueLabel, {marginTop: 0}]}>
                                Data da compra:
                            </Text>
                            <Text style={styles.value}>
                                {dateFns.format(dateFns.parseISO(item.date), 'dd/MM/yyyy')}
                            </Text>
                        </>
                        <>
                            <Text style={styles.valueLabel}>
                                Valor:
                            </Text>
                            <Text style={styles.value}>
                                {numeral(parseFloat(item.amount)).format('$ 0,0.00')}
                            </Text>
                        </>
                    </View>
                </View>
                {/* <View style={{alignItems: 'center', marginTop: 5}}>
                    <Text style={[styles.valueLabel, {color: colors.text.fourth}]}>
                        Cód. da transação:
                    </Text>
                    <Text style={[styles.value, {color: colors.text.fourth}]}>
                        {item.id}
                    </Text>
                </View> */}
            </View>
        )
    }

    return (
        <View style={[styles.container]}>
            <StatusBar
                barStyle='light-content'
            />
            <LinearGradientHeader isHeaderStackHeight/>
            <SafeAreaView style={{ flex:  1 }}>
                {/* <View style={styles.topContent}>
                    <Entypo
                        name='mobile'
                        color={colors.gray.third}
                        size={22}
                    />
                    <Text style={styles.title}>
                        Serviços de Recarga
                    </Text>
                </View> */}
                <View style={styles.content}>
                    {isLoading ?
                        <ActivityIndicator
                            size={'large'}
                            color={colors.blue.second}
                            style={{marginTop: 50}}
                        /> 
                        :
                        <FlatList
                            data={rechargeServiceHistory.reverse()}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => handleItems(item)}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <View style={styles.bar}/>
                            )}
                            ListEmptyComponent={() => (
                                <Text 
                                    style={[
                                        styles.title, 
                                        {
                                            alignSelf: 'center',
                                            marginTop: 40
                                        }
                                    ]}
                                >
                                    Sem registros de recargas
                                </Text>
                            )}
                        />
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContent: {
        paddingHorizontal: 24,
        height: 50,
        borderBottomWidth: 2,
        borderColor: colors.blue.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 16,
        marginLeft: 5
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15
    },
    historyContainer: {
        width: '100%'
    },
    valueLabel: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 14,
        marginBottom: 2,
        marginTop: 5
    },
    value: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 14,
        marginLeft: 3
    },
    productName: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 16,
        marginRight: 20,
        marginBottom: 3
    },
    productType: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fifth,
        fontSize: 16
    },
    bar: {
        backgroundColor: colors.gray.primary,
        height: 1,
        marginTop: 10,
        marginBottom: 20
    }
})

export default HistoryScreen;