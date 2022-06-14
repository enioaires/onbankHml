import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';
import numeral from 'numeral';
import { useSelector, useDispatch } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';

// Store
import { IApplicationState } from '../../../../store/types';
import { IDepositBilletsData } from '../../../../store/ducks/depositBillets/types';
import { requestPixQrCodeDataAction } from '../../../../store/ducks/receive/actions'
import { IPixQrCodeReceive } from '../../../../store/ducks/receive/types'

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Navigation Type
import { DepositStackNavigationProps } from '../../../../routes/Logged/types';

// Utils
import { prefityNames, maskDocumentNumber} from '../../../../utils/prettiers'

const HistoryScreen: React.FC<DepositStackNavigationProps<'History'>> = ({
    navigation
}: DepositStackNavigationProps<'History'>) => {
    const dispatch = useDispatch()

    const isLoading = useSelector(
        (state: IApplicationState) => state.receive.isLoading
    );
    const pixQrCodeReceiveData = useSelector(
        (state: IApplicationState) => state.receive.pixQrCodeReceiveData
    );
    const billets = useSelector(
        (state: IApplicationState) => state.depositBillets.data
    );

    const [currentOption, setCurrentOption] = useState<'billet' | 'qrcode'>('qrcode')

    useEffect(() => {
        dispatch(requestPixQrCodeDataAction())
    },[])


    const onPress = (item: IDepositBilletsData) => {
        navigation.push('Deposit', {
            screen: 'HistoryBillet',
            params: {
                value: parseFloat(item.amount),
                barcode: item.typeableLine,
                url: item.billetUrl,
                dueDate: item.dueDate
            }
        });
    };

    const renderPixQrCodeItems = ({
        item,
        index
    }: {
        item: IPixQrCodeReceive;
        index: number;
    }) => {
        const [createdDate, ...rest] = item.createDateTime.split('T');
        const [year, month, day] = createdDate.split('-');

        return (
            <TouchableOpacity
                style={[
                    styles.itemQrcodeContainer,
                    item.paid ? {paddingVertical: 10}: { paddingVertical: 16 }
                    // index === 0 && { borderTopWidth: 1 }
                ]}
                disabled={true}
            >
                <View style={styles.valueContainer}>
                    {item.paid ? (
                        <AntIcon
                            style={{ marginRight: 20 }}
                            name="checkcircleo"
                            size={23}
                            color="#2E8B57"
                        />
                    ) : (
                        // <Image
                        //     source={require('../../../../../assets/icons/clock.png')}
                        //     resizeMode="contain"
                        //     style={styles.icon}
                        // />
                        <AntIcon
                            style={{ marginRight: 20 }}
                            name="clockcircleo"
                            size={23}
                            color={colors.text.invalid}
                        />
                    )}
                    <View style={{width: '65%'}}>
                        <Text
                            allowFontScaling={false}
                            style={styles.valueLabel}
                        >
                            Valor do QR code Pix
                        </Text>
                        <Text allowFontScaling={false} style={styles.value}>
                            {numeral(parseFloat(item.amount)).format(
                                '$ 0,0.00'
                            )}
                        </Text>
                        { item.paid && (
                            <>
                                <View style={{ marginTop: 4 }}>
                                    <Text style={styles.valueLabel}>Pago por:</Text>
                                    <Text 
                                        style={[
                                            styles.value, 
                                            {fontSize: 14}
                                        ]}
                                    >
                                        {item.payerName ? prefityNames(item.payerName) : ''}
                                    </Text>
                                </View>
                                <View style={{ marginTop: 4 }}>
                                    <Text style={styles.valueLabel}>CPF/CNPJ:</Text>
                                    <Text style={[styles.value, {fontSize: 14}]}>
                                        {item.payerDocumentNumber ? 
                                            item.payerDocumentNumber
                                        : item.payerCompanyDocumentNumber ? 
                                            maskDocumentNumber(item.payerCompanyDocumentNumber) : ''
                                        }
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                </View>
                <View style={styles.createdAtContainer}>
                    <Text
                        allowFontScaling={false}
                        style={styles.createdAtLabel}
                    >
                        Gerado em
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.createdAt}
                    >{`${day}/${month}/${year}`}</Text>
                    <Text
                        style={[
                            styles.paidText,
                            !item.paid && { color: colors.text.invalid }
                        ]}
                    >
                        {item.paid ? 'Pago' : 'Emitido'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderBilletsItems = ({
        item,
        index
    }: {
        item: IDepositBilletsData;
        index: number;
    }) => {
        const [createdDate, ...rest] = item.createDateTime.split('T');
        const [year, month, day] = createdDate.split('-');

        return (
            <TouchableOpacity
                style={[
                    styles.itemBilletContainer,
                    // index === 0 && { borderTopWidth: 1 }
                ]}
                disabled={!!item.paid}
                onPress={() => onPress(item)}
            >
                <View style={styles.valueContainer}>
                    {item.paid ? (
                        <AntIcon
                            style={{ marginRight: 20 }}
                            name="checkcircleo"
                            size={23}
                            color="#2E8B57"
                        />
                    ) : (
                        // <Image
                        //     source={require('../../../../../assets/icons/clock.png')}
                        //     resizeMode="contain"
                        //     style={styles.icon}
                        // />
                        <AntIcon
                            style={{ marginRight: 20 }}
                            name="clockcircleo"
                            size={23}
                            color={colors.text.invalid}
                        />
                    )}
                    <View>
                        <Text
                            allowFontScaling={false}
                            style={styles.valueLabel}
                        >
                            Valor do boleto
                        </Text>
                        <Text allowFontScaling={false} style={styles.value}>
                            {numeral(parseFloat(item.amount)).format(
                                '$ 0,0.00'
                            )}
                        </Text>
                    </View>
                </View>
                <View style={styles.createdAtContainer}>
                    <Text
                        allowFontScaling={false}
                        style={styles.createdAtLabel}
                    >
                        Data de emissão
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.createdAt}
                    >{`${day}/${month}/${year}`}</Text>
                    <Text
                        style={[
                            styles.paidText,
                            !item.paid && { color: colors.text.invalid }
                        ]}
                    >
                        {item.paid ? 'Pago' : 'Aberto'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleEnvSelected = (env: 'billet' | 'qrcode') => {
        if (isLoading) {
            return (
                <View style={styles.noRegister}>
                    <ActivityIndicator
                        size="small"
                        color={colors.blue.second}
                    />
                </View>
            )
        }
        if (env === 'qrcode') { 
            return (
                pixQrCodeReceiveData && pixQrCodeReceiveData.length > 0 ? 
                    <FlatList
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                        data={pixQrCodeReceiveData}
                        renderItem={renderPixQrCodeItems}
                        keyExtractor={(_, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>}
                    /> 
                : 
                    <View style={styles.noRegister}>
                        <Text
                            allowFontScaling={false}
                            style={styles.valueLabel}
                        >
                            Sem registros de QR code Pix
                        </Text>
                    </View> 
            )
        } else if (env === 'billet') {
            return (
                billets && billets.length > 0 ? 
                    <FlatList
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                        data={billets}
                        renderItem={renderBilletsItems}
                        keyExtractor={(_, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>}
                    />
                :  
                    <View style={styles.noRegister}>
                        <Text
                            allowFontScaling={false}
                            style={styles.valueLabel}
                        >
                            Sem registros de boletos
                        </Text>
                    </View> 
            )
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity 
                        style={[
                            styles.optionButton
                        ]}
                        onPress={() => setCurrentOption('qrcode')}
                    >
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                            <Image
                                source={require('../../../../../assets/icons/new_icons/qrcode-gray.png')}
                                style={{ width: 26, height: 26 }}
                            />
                            <Text style={styles.optionButtonText}>
                                QR code Pix
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.optionButtonBar, 
                                currentOption === 'qrcode' && {
                                    backgroundColor: colors.blue.primary
                                }
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            styles.optionButton
                        ]}
                        onPress={() => setCurrentOption('billet')}
                    >
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                            <Image
                                source={require('../../../../../assets/icons/new_icons/bar-code-gray.png')}
                                style={{ width: 26, height: 26 }}
                            />
                            <Text style={styles.optionButtonText}>
                                Boletos
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.optionButtonBar, 
                                currentOption === 'billet' && {
                                    backgroundColor: colors.blue.primary
                                }
                            ]}
                        />
                    </TouchableOpacity>
                </View>
                {handleEnvSelected(currentOption)}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container,
        paddingLeft: 0,
        paddingRight: 0
    },
    safeArea: {
        flex: 1
    },
    list: {
        flex: 1
    },
    itemBilletContainer: {
        paddingHorizontal: 25,
        height: 90,
        borderColor: colors.text.smsModel,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemQrcodeContainer: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 23,
        height: 23,
        marginRight: 20
    },
    valueLabel: {
        fontFamily: 'Roboto-Medium',
        color: colors.text.second,
        fontSize: 15,
        marginBottom: 5
    },
    value: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 15,
        marginLeft: 3
    },
    createdAtContainer: {
        alignItems: 'flex-end'
    },
    createdAtLabel: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 13,
        marginBottom: 5
    },
    createdAt: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 13
    },
    noRegister: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paidText: {
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        color: '#2E8B57',
        marginTop: 5
    },

    optionsContainer: {
        flexDirection: 'row',
    },
    optionButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionButtonText: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 15,
        marginLeft: 8
    },
    optionButtonBar: {
        height: 2,
        width: '100%',
        backgroundColor: colors.gray.third
    },
    itemSeparator: {
        height: 1,
        width: '90%',
        backgroundColor: colors.text.smsModel,
        alignSelf: 'center'
    }
});

export default HistoryScreen;
