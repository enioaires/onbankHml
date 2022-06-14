import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as dateFns from 'date-fns';

// Store
import { setAlertMessageAction } from '../../../store/ducks/alert/actions';
import { cancelTransferScheduleAction } from '../../../store/ducks/transfer/actions';
import { IApplicationState } from '../../../store/types';
import {
    storeReceiptAction,
    getCreditCardReceiptDataAction,
    getReceiptDataAction
} from '../../../store/ducks/receipt/actions';

// Components
import ActionButton from '../../../components/ActionButton';
import LinearGradientHeader from '../../../components/LinearGradientHeader';

// Style
import colors from '../../../styles/colors';

// Navigation
import { StatementStackNavigationProps } from '../../../routes/Logged/types';

const confImg = require('../../../../assets/confirmation-signup-img.png');

const CancelScheduleScreen: React.FC<StatementStackNavigationProps<
    'Schedule'
>> = ({ navigation, route }: StatementStackNavigationProps<'Schedule'>) => {
    const { item } = route.params
    const dispatch = useDispatch();
    const loading = useSelector(
        (state: IApplicationState) => state.transfer.isLoading
    );
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
            />
            <LinearGradientHeader isHeaderStackHeight/>
            <SafeAreaView style={styles.safeArea}>
                <View style={{flex: 1, paddingHorizontal: 24, paddingTop: 40}}>
                    <View style={styles.textContainer}>
                        <Image source={confImg} style={styles.img} />
                        <Text allowFontScaling={false} style={styles.title}>
                            Transferência Agendada
                        </Text>
                        <Text allowFontScaling={false} style={styles.text}>
                            Sua transferência será processada{'\n'}no dia{' '}
                            {route.params.item.schedule}
                        </Text>
                    </View>
                    <ActionButton
                        label="Ver Comprovante"
                        onPress={() =>{
                                dispatch(
                                    getReceiptDataAction(
                                        navigation,
                                        item,
                                        'transfer'
                                    )
                                );
                            }
                        }
                        isLoading={loading}
                    />
                    <ActionButton
                        secondTheme
                        isLoading={loading}
                        label="Cancelar Agendamento"
                        activeOpacity={0.7}
                        style={styles.cancelButton}
                        onPress={() =>
                            dispatch(
                                setAlertMessageAction({
                                    title: 'Atenção',
                                    message:
                                        'Deseja cancelar o agendamento da transferência?',
                                    action: {
                                        mainLabel: 'Sim',
                                        secondLabel: 'Não',
                                        onPress: () =>
                                            dispatch(
                                                cancelTransferScheduleAction(
                                                    route.params.item
                                                        .transactionId!,
                                                    navigation
                                                )
                                            )
                                    },
                                    type: 'info'
                                })
                            )
                        }
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default CancelScheduleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 15
    },
    safeArea: {
        flex: 1
    },
    textContainer: {
        flex: 1
    },
    img: {
        marginBottom: 30,
        height: '40%',
        width: '50%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 23,
        color: colors.blue.second,
        textAlign: 'center',
        marginBottom: 12
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 26,
        color: colors.gray.eigth,
        textAlign: 'center'
    },
    cancelButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.blue.second,
        alignSelf: 'stretch',
        marginTop: 10
    },
    cancelText: {
        fontSize: 14,
        color: colors.blue.second
    }
});
