import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import numeral, { options } from 'numeral'
import Entypo from 'react-native-vector-icons/Entypo'

// Components
import OptionButtonGray from '../../../../components/OptionButtonGray';

// Store
import { IApplicationState } from '../../../../store/types';

// Styles
import colors from '../../../../styles/colors';

// Navigation type
import { PixPaymentsStackNavigationProps } from 'src/routes/Logged/types';

const eyeClose = require('../../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../../assets/icons/new_icons/show-white.png');


const PixOption: React.FC<PixPaymentsStackNavigationProps<'Option'>> = ({ 
    navigation 
}: PixPaymentsStackNavigationProps<'Option'>) => {
    const userBalance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    
    const [balanceAmount, balanceCents] = numeral(userBalance).format('0,0.00').split(',');
    const [hideBalance, setHideBalance] = useState(false);

    const onPress = (value: 'pixKey') => {
        switch(value) {
            case 'pixKey':
                navigation.push('PixKeyOption')
                return
        }
    }

    /* const didMount = () => {
        if (isDemo) {
            dispatch(
                setAlertMessageAction({
                    type: 'info',
                    title: 'Conta Demonstrativa',
                    message:
                        'A conta demonstrativa não permite operações com Pix. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!',
                    action: {
                        mainLabel: 'Completar conta',
                        onPress: () => {
                            navigation.popToTop();
                        },
                        secondLabel: 'Agora não',
                        secondOnPress: () => {
                            navigation.popToTop();
                        }
                    }
                })
            );
        }
    }; */
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
            <StatusBar
                barStyle='light-content'
            />
            <LinearGradient
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.blue.fourth, colors.blue.primary]}
                    useAngle
                    angle={104}
                    angleCenter={{ x: 0.1, y: 0.3 }}
                >
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
                                    source={hideBalance ? eyeClose : eyeOpen}
                                    style={{ width: 22, height: 22 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.optionsContainer}>
                    <OptionButtonGray
                        title='Pagar com QR Code'
                        onPress={() => {}}
                    />
                    <OptionButtonGray
                        title='Pagar com Chave Pix'
                        onPress={() => onPress('pixKey')}
                    />
                    <OptionButtonGray
                        title='Pagar com Copia e Cola'
                        onPress={() => {}}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80 + 10
    },
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 24,
        overflow: 'hidden',
        elevation: 5
    },
    headerTop: {
        flexDirection: 'row',
        paddingVertical: 20,
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
    optionsContainer: {
        paddingHorizontal: 24,
        paddingTop: 20
    }
});

export default PixOption;