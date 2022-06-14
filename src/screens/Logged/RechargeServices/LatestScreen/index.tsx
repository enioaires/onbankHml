import React, { useEffect, useState, useCallback } from 'react';
import { 
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import numeral from 'numeral';
import Clipboard from '@react-native-community/clipboard';
import { showMessage } from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';

// Types
import { RechargeServicesStackNavigationProps } from '../../../../routes/Logged/types';

// Styles
import colors from '../../../../styles/colors';

const eyeClose = require('../../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../../assets/icons/new_icons/show-white.png');

const ServiceScreen: React.FC<RechargeServicesStackNavigationProps<'Service'>> = ({
    navigation
}: RechargeServicesStackNavigationProps<'Service'>) => {
    const dispatch = useDispatch()
    const headerStackHeight = useHeaderHeight()

    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    const receipt = useSelector(
        (state: IApplicationState) => state.rechargeServices.receipt
    );
    
    const [balanceAmount, balanceCents] = numeral(userBalance).format('0,0.00').split(',');
    const [hideBalance, setHideBalance] = useState(false);
    const [pin, setPin] = useState('')


    /* const handleReceipt = (receipt: any) => {
        const receiptFormattedParsed = receipt.receipt.receiptformatted.split('\r\n')
        receiptFormattedParsed.forEach((element: string) => {
            if (element.includes('PIN: ')) {
                setPin(element.substr(5))
            }
        });
    } */
    
    const handleOnPressPin = useCallback(() => {
        Clipboard.setString(receipt.pin);
        showMessage({
            message: 'Copiado!',
            description: 'código PIN copiado!',
            backgroundColor: colors.blue.second,
            icon: 'success'
        });
    }, []);

    /* useEffect(() => {
        handleReceipt(receipt)
    }) */

    return (
        <View style={[styles.container]}>
            <StatusBar
                barStyle={'light-content'}
            />
            <LinearGradientHeader isHeaderStackHeight >
                <View style={styles.headerTop}>
                    <Text style={styles.balanceLabel}>
                        Saldo disponível
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.balanceAmount}>
                            {hideBalance ? `R$  ***,` : `R$  ${balanceAmount},`}
                        </Text>
                        <Text style={styles.balanceCents}>
                            {hideBalance ? `**` : balanceCents}
                        </Text>
                        <TouchableOpacity 
                            style={{justifyContent:'center'}}
                            onPress={() => setHideBalance(oldstate => !oldstate)}
                        >
                            <Image
                                source={ hideBalance ? eyeClose : eyeOpen}
                                style={{ width: 22, height: 22 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradientHeader>
            <SafeAreaView style={{ flex: 1 }}>
                {receipt.pin.length > 0 ?
                    <View style={styles.pinContentContainer}>
                        <Text style={styles.pinTitle}>
                            Esse é seu PIN de recarga
                        </Text>
                        <Text style={styles.pinDescription}>
                            Acesse o aplicativo e adicione o seu{'\n'}PIN para ter a recarga confirmada
                        </Text>
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row', 
                                marginVertical: 32,
                                maxWidth: '90%',
                                paddingRight: 20
                            }}
                            onPress={handleOnPressPin}
                        >
                            <FontAwesome
                                name='copy'
                                color={colors.text.fourth}
                                size={26}
                                style={{marginRight: 10, marginTop: 3}}
                            />
                            <Text style={styles.pinNumberText}>
                                {receipt.pin}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{
                        alignItems: 'center',
                        marginTop: 40
                    }}>
                        <Text style={[styles.pinTitle, {textAlign: 'center'}]}>
                            Sua recarga foi efetuada{'\n'}com sucesso!
                        </Text>
                        <AntIcon
                            name='checkcircle'
                            size={60}
                            color={'#109C3B'}
                            style={{alignSelf: 'center', marginVertical: 25}}
                        />
                    </View>
                }  
                <View style={{paddingHorizontal: 24}}>
                    <View style={styles.receiptBar}/>
                </View>
                <TouchableOpacity
                    style={styles.receiptButton}
                    onPress={() => {
                        navigation.push('General', {
                            screen: 'Receipt'
                        })
                    }}
                >
                    <Text
                        style={styles.receiptButtonText}
                    >
                        Ver comprovante
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

export default ServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 24,
        overflow: 'hidden'
    },
    headerTop: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    headerBar: {
        height: 1,
        backgroundColor: colors.white,
        opacity: 0.3
    },
    balanceLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: colors.white,
        marginBottom: 6
    },
    balanceAmount: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: colors.white
    },
    balanceCents: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.white,
        marginRight: 10
    },
    pinContentContainer: {
        paddingRight: 24,
        paddingLeft: 24,
        alignItems: 'center'
    },
    pinTitle: {
        fontFamily: 'Roboto-Bold',
        color: colors.blue.third,
        fontSize: 22,
        marginVertical: 15
    },
    pinDescription: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.fifth,
        textAlign: 'center',
        fontSize: 14
    },
    pinNumberText: {
        fontFamily: 'Roboto-Bold',
        color: colors.blue.third,
        fontSize: 30
    },
    receiptButton: {
        alignItems: 'center',
        marginTop: 20
    },
    receiptBar: {
        height: 1.5,
        backgroundColor: colors.gray.fourth,
        width: '100%'
    },
    receiptButtonText: {
        fontFamily: 'Roboto-Bold',
        color: colors.blue.third,
        fontSize: 18,
    }
})