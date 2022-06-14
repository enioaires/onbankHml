import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';
import numeral from 'numeral';
import AntIcon from 'react-native-vector-icons/AntDesign';

// Store
import { IApplicationState } from '../../../store/types';
import {
    IStatementSearchButton,
    IStatementData
} from '../../../store/ducks/statement/types';
import {
    changeStatementPayloadAction,
    getStatementDataAction,
    clearStatementDataAction,
    changeStatementFiltersAction
} from '../../../store/ducks/statement/actions';
import {
    storeReceiptAction,
    getCreditCardReceiptDataAction,
    getReceiptDataAction
} from '../../../store/ducks/receipt/actions';

// Styles
import colors from '../../../styles/colors';

// Navigation Type
import { StatementStackNavigationProps } from '../../../routes/Logged/types';

const debitIcon = require('../../../../assets/icons/payment.png');
const creditIcon = require('../../../../assets/icons/deposit.png');
const transferIcon = require('../../../../assets/icons/transfer.png');
const taxIcon = require('../../../../assets/icons/tax.png');
const rechargeIcon = require('../../../../assets/icons/recharge.png');
const chargeBackIcon = require('../../../../assets/icons/charge-back.png');
const withDrawIcon = require('../../../../assets/icons/withdraw-icon.png');
const creditPaymentIcon = require('../../../../assets/icons/credit-payment-icon.png');
const debitPaymentIcon = require('../../../../assets/icons/debit-payment-icon.png');

const StatementScreen: React.FC<StatementStackNavigationProps<'Initial'>> = ({
    navigation
}: StatementStackNavigationProps<'Initial'>) => {
    const dispatch = useDispatch();
    const { height } = Dimensions.get('window');

    const loading = useSelector(
        (state: IApplicationState) => state.statement.isLoading
    );
    const balance = useSelector(
        (state: IApplicationState) => state.balance.data?.available
    );
    const statementData = useSelector(
        (state: IApplicationState) => state.statement.data,
        shallowEqual
    );
    const filters = useSelector(
        (state: IApplicationState) => state.statement.filters,
        shallowEqual
    );
    const monthButtons = useSelector(
        (state: IApplicationState) => state.statement.monthButtons,
        shallowEqual
    );
    const currentLabel = useSelector(
        (state: IApplicationState) => state.statement.payload.label
    );
    const isBeta = useSelector(
        (state: IApplicationState) => state.user.data.client.isBeta
    );
    const receiptLoading = useSelector(
        (state: IApplicationState) => state.receipt.isLoading
    );

    const scrollRef = useRef<any>(null);

    const translateY = useRef(new Animated.Value(250));

    const openFilter = () =>
        Animated.timing(translateY.current, {
            useNativeDriver: false,
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.linear)
        }).start();

    const closeFilter = () =>
        Animated.timing(translateY.current, {
            useNativeDriver: false,
            toValue: 250,
            duration: 300,
            easing: Easing.inOut(Easing.linear)
        }).start();

    const onMonthClick = (button: IStatementSearchButton, index: number) => {
        scrollRef?.current.scrollToIndex({
            index,
            viewPosition: 0.5
        });
        dispatch(changeStatementPayloadAction(button));
        dispatch(getStatementDataAction());
    };

    const renderButtons = ({ item, index }: any) => {
        const isCurrent = currentLabel === item.label;

        return (
            <View
                style={{ alignItems: 'center', position: 'relative' }}
                key={item.label}
            >
                <TouchableOpacity
                    style={[styles.button, isCurrent && styles.buttonActive]}
                    onPress={() => onMonthClick(item, index)}
                >
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.buttonLabel,
                            isCurrent && styles.buttonLabelActive
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
                {isCurrent && (
                    <View
                        style={{
                            width: '90%',
                            height: 6,
                            backgroundColor: colors.blue.second,
                            borderRadius: 3,
                            position: 'absolute',
                            bottom: -4
                        }}
                    />
                )}
            </View>
        );
    };

    const renderPeriods = ({ item, index }: any) => {
        const isCurrent = currentLabel === item.toString();
        return (
            <View
                style={{ alignItems: 'center', position: 'relative' }}
                key={item.label}
            >
                <TouchableOpacity
                    style={[styles.button, isCurrent && styles.buttonActive]}
                    onPress={() =>
                        onMonthClick(
                            {
                                startDate: dateFns.format(
                                    dateFns.subDays(new Date(), item),
                                    'yyyy-MM-dd'
                                ),
                                endDate: dateFns.format(
                                    new Date(),
                                    'yyyy-MM-dd'
                                ),
                                label: item.toString()
                            },
                            index
                        )
                    }
                >
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.buttonLabel,
                            isCurrent && styles.buttonLabelActive
                        ]}
                    >
                        {item} dias
                    </Text>
                </TouchableOpacity>
                {isCurrent && (
                    <View
                        style={{
                            width: '90%',
                            height: 6,
                            backgroundColor: colors.blue.second,
                            borderRadius: 3,
                            position: 'absolute',
                            bottom: -4
                        }}
                    />
                )}
            </View>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    size="large"
                    color={colors.blue.second}
                />
            );
        }
        if (statementData!.length > 0) {
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderItem()}
                </ScrollView>
            );
        }
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text allowFontScaling={false}>
                    Sem movimentações no período
                </Text>
            </View>
        );
    };

    const organizeStatements = () => {
        const days: string[] = [];

        statementData?.forEach((item: IStatementData) => {
            const statementDay = dateFns.format(
                dateFns.parseISO(item.entryDate),
                'yyyy-MM-dd'
                // new Date(item.creditDate.replace(/-/g, '/')),
                // 'dd'
            );

            const isNotFirstOfDay = days.some((day) => day === statementDay);
            if (
                (!isNotFirstOfDay &&
                    filters.type === 'credit' &&
                    item.type === 'C') ||
                (filters.type === 'debit' && item.type === 'D') ||
                filters.type === 'all'
            ) {
                days.push(
                    dateFns.format(
                        dateFns.parseISO(item.entryDate),
                        'yyyy-MM-dd'
                        // new Date(item.creditDate.replace(/-/g, '/')),
                        // 'dd'
                    )
                );
            }
        });

        let filterPerDays: any = {};

        days.sort((a, b) => {
            // const parsedA = parseInt(a, 10);
            // const parsedB = parseInt(b, 10);
            if (dateFns.isAfter(dateFns.parseISO(a), dateFns.parseISO(b)))
                return 1;
            if (dateFns.isBefore(dateFns.parseISO(a), dateFns.parseISO(b)))
                return -1;
            return 0;
        }).reverse();

        days.forEach((day) => {
            filterPerDays = {
                ...filterPerDays,
                [day]: statementData?.filter(
                    (item) =>
                        dateFns.format(
                            // new Date(item.creditDate.replace(/-/g, '/')),
                            // 'dd'
                            dateFns.parseISO(item.entryDate),
                            'yyyy-MM-dd'
                        ) === day &&
                        (filters.type === 'all' ||
                            (filters.type === 'credit' && item.type === 'C') ||
                            (filters.type === 'debit' && item.type === 'D'))
                )
            };
        });

        return filterPerDays;
    };

    const getType = (code: number, schedule?: boolean) => {
        switch (code) {
            case 2000:
            case 2002:
                if (schedule) return 'Transferência Agendada';
                return 'Transferência';
            case 1000:
                return 'Depósito Boleto';
            case 1001:
                return 'Depósito TED';
            case 1002:
            case 1301:
                return 'Transferência';
            case 1003:
                return 'Crédito Manual';
            case 2004:
                return 'Recarga Celular';
            case 3000:
            case 5009:
            case 8210:
                return 'Taxa';
            case 2003:
                return 'Pagamento';
            case 5000:
            case 5100:
            case 6110:
            case 5001:
            case 5002:
            case 6000:
            case 6002:
            case 6003:
            case 6004:
            case 8000:
                return 'Estorno';
            case 1100:
            case 2110:
                return 'QR Code';
            case 3003:
                return 'Pagamento Cartão Crédito';
            case 8200:
                return 'Saque';
            case 8100:
                return 'Compra Débito';
            default:
                if (!code) return 'Pagamento Carteira';
                return 'Outros';
        }
    };

    const getReceiptType = (name: string) => {
        switch (name) {
            case 'Transferência':
            case 'Transferência Agendada':
                return 'transfer';
            case 'Pagamento':
            case 'Pagamento Cartão Crédito':
                return 'billet';
            case 'QR Code':
                return 'qrcode';
            case 'Recarga Celular':
                return 'recharge';
            case 'Compra Débito':
                return 'cardDebit';
            default:
                return null;
        }
    };

    const getReceipt = async (item: IStatementData) => {
        const type = getReceiptType(getType(item.historyCode));

        // console.log(JSON.stringify(item, null, 2));

        if (item.historyCode === 8100) {
            dispatch(
                storeReceiptAction({
                    type: 'cardDebit',
                    value: item.amount.toString(),
                    transactionCode: item.transactionId || '',
                    date: dateFns.format(
                        // dateFns.parseISO(item.creditDate),
                        // 'dd/MM/yyyy; HH:mm'
                        dateFns.parseISO(item.entryDate),
                        'dd/MM/yyyy; HH:mm'
                    ),
                    cardDebit: {
                        local: item.description
                    }
                })
            );

            navigation.push('General', { screen: 'Receipt' });
            return;
        }

        if (item.schedule) {
            navigation.push('Statement', {
                screen: 'Schedule',
                params: {
                    item
                }
            });
            return;
        }

        if (!item.historyCode) {
            dispatch(getCreditCardReceiptDataAction(navigation, item));
            return;
        }

        dispatch(
            getReceiptDataAction(
                navigation,
                item,
                type === 'qrcode' ? 'transfer' : type
            )
        );
    };

    const renderItemIcon = (type: string, isDebit: boolean) => {
        switch (type) {
            case 'Transferência':
                return transferIcon;
            case 'Recarga Celular':
                return rechargeIcon;
            case 'Taxa':
                return taxIcon;
            case 'Estorno':
                return chargeBackIcon;
            case 'Pagamento Cartão Crédito':
                return creditPaymentIcon;
            case 'Saque':
                return withDrawIcon;
            case 'Compra Débito':
                return debitPaymentIcon;
            default:
                if (isDebit) {
                    return debitIcon;
                }
                return creditIcon;
        }
    };

    const renderItem = () => {
        let statements: any = null;
        const data = organizeStatements();

        statements = Object.entries(data)
            // .sort((a, b) => {
            //     if (a[0] > b[0]) return 1;
            //     if (a[0] < b[0]) return -1;
            //     return 0;
            // })
            // .reverse()
            .map((item: any) => {
                // let balance = 0;
                // item[1].forEach((statement: IStatementData) => {
                //     if (statement.type === 'D') {
                //         balance -= statement.amount;
                //     } else {
                //         balance += statement.amount;
                //     }
                // });

                return (
                    <>
                        <Text allowFontScaling={false} style={styles.dayTitle}>
                            {dateFns.format(
                                dateFns.parseISO(item[0]),
                                "dd 'de' MMMM",
                                {
                                    locale: ptBR
                                }
                            )}
                        </Text>
                        {/* <Text
                            allowFontScaling={false}
                            style={styles.dayBalance}
                        >
                            Movimentações do dia{' '}
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color:
                                        balance < 0
                                            ? colors.text.statementOut
                                            : colors.blue.second
                                }}
                            >
                                {numeral(balance).format('$ 0,0.00')}
                            </Text>
                        </Text> */}

                        {item[1].map(
                            (statement: IStatementData, index: number) => {
                                const isDebit = statement.type === 'D';
                                const [day, month] = dateFns
                                    .format(
                                        // new Date(
                                        //     statement.creditDate.replace(
                                        //         /-/g,
                                        //         '/'
                                        //     )
                                        // ),
                                        // 'dd MMM',
                                        dateFns.parseISO(statement.entryDate),
                                        'dd MMM',
                                        { locale: ptBR }
                                    )
                                    .split(' ');

                                const type = getType(
                                    statement.historyCode,
                                    statement.schedule
                                );
                                const hasReceipt =
                                    ((type === 'Transferência' ||
                                        type === 'Transferência Agendada') &&
                                        isDebit) ||
                                    (type === 'Pagamento' && isDebit) ||
                                    (type === 'Recarga Celular' && isDebit) ||
                                    (type === 'Pagamento Cartão Crédito' &&
                                        isDebit) ||
                                    type === 'QR Code' ||
                                    type === 'Compra Débito' ||
                                    type === 'Pagamento Carteira';
                                const operationRefound =
                                    hasReceipt && !statement.transactionId;
                                const itemIcon = renderItemIcon(type, isDebit);

                                // if (filterTypes === 'credit' && isDebit)
                                //     return null;
                                // if (filterTypes === 'debit' && !isDebit)
                                //     return null;

                                return (
                                    <View
                                        key={`${statement.transactionId}${statement.historyCode}`}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={hasReceipt ? 0.2 : 1}
                                            onPress={
                                                hasReceipt
                                                    ? () =>
                                                          getReceipt(statement)
                                                    : () => null
                                            }
                                            disabled={
                                                !!receiptLoading ||
                                                operationRefound
                                            }
                                        >
                                            {receiptLoading &&
                                            receiptLoading.transactionId ===
                                                statement.transactionId &&
                                            receiptLoading.historyCode ===
                                                statement.historyCode ? (
                                                <ActivityIndicator
                                                    size="small"
                                                    color={colors.blue.second}
                                                    style={{
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        height: 50
                                                    }}
                                                />
                                            ) : (
                                                <View style={styles.infoRow}>
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
                                                            width: '70%'
                                                        }}
                                                    >
                                                        {statement.schedule ? (
                                                            <AntIcon
                                                                name="clockcircleo"
                                                                size={21}
                                                                style={{
                                                                    marginRight: 25
                                                                }}
                                                            />
                                                        ) : (
                                                            <Image
                                                                source={
                                                                    itemIcon
                                                                }
                                                                resizeMode="contain"
                                                                style={[
                                                                    styles.icon,
                                                                    !isDebit && {
                                                                        height: 35
                                                                    }
                                                                ]}
                                                            />
                                                        )}
                                                        <View
                                                            style={{
                                                                maxWidth: '70%'
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    flexDirection:
                                                                        'row',
                                                                    alignItems:
                                                                        'center'
                                                                }}
                                                            >
                                                                {statement.cardLast4 && (
                                                                    <AntIcon
                                                                        name="creditcard"
                                                                        style={{
                                                                            marginRight: 8
                                                                        }}
                                                                        color={
                                                                            colors
                                                                                .text
                                                                                .second
                                                                        }
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                )}
                                                                <Text
                                                                    allowFontScaling={
                                                                        false
                                                                    }
                                                                    style={[
                                                                        styles.type,
                                                                        operationRefound && {
                                                                            opacity: 0.7
                                                                        }
                                                                    ]}
                                                                >
                                                                    {statement.cardLast4
                                                                        ? `${statement.cardFlag} **** ${statement.cardLast4}`
                                                                        : type}
                                                                </Text>
                                                            </View>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                numberOfLines={
                                                                    2
                                                                }
                                                                style={[
                                                                    styles.description,
                                                                    operationRefound && {
                                                                        textDecorationLine:
                                                                            'line-through'
                                                                    }
                                                                ]}
                                                            >
                                                                {statement
                                                                    .counterpart
                                                                    ?.name ||
                                                                    statement.description}
                                                            </Text>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={
                                                                    styles.day
                                                                }
                                                            >
                                                                {day}{' '}
                                                                {month
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                                {month.substring(
                                                                    1
                                                                )}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    {/* {statement.cardLast4 && (
                                                            <Text
                                                                style={[
                                                                    styles.type,
                                                                    {
                                                                        textAlign:
                                                                            'right'
                                                                    }
                                                                ]}
                                                            >
                                                                {`**** **** **** ${statement.cardLast4}`}
                                                            </Text>
                                                        )} */}
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={[
                                                            styles.value,
                                                            isDebit && {
                                                                color:
                                                                    colors.text
                                                                        .statementOut
                                                            },
                                                            operationRefound && {
                                                                textDecorationLine:
                                                                    'line-through'
                                                            }
                                                        ]}
                                                    >
                                                        {isDebit
                                                            ? `- ${numeral(
                                                                  statement.amount
                                                              ).format(
                                                                  '$ 0,0.00'
                                                              )}`
                                                            : numeral(
                                                                  statement.amount
                                                              ).format(
                                                                  '$ 0,0.00'
                                                              )}
                                                    </Text>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                        {index < item[1].length - 1 && (
                                            <View style={styles.verticalBar} />
                                        )}
                                    </View>
                                );
                            }
                        )}
                    </>
                );
            });

        return statements;
    };

    const getInitialIndexToRender = () => {
        let toIndex = 0;
        if (filters.period === 'month') {
            monthButtons.forEach(
                (item: IStatementSearchButton, index: number) => {
                    if (item.label === currentLabel) {
                        toIndex = index;
                    }
                }
            );
        } else {
            [3, 7, 15, 30, 60, 90].forEach((item: number, index: number) => {
                if (item.toString() === currentLabel) {
                    toIndex = index;
                }
            });
        }
        return toIndex;
    };

    useEffect(() => {
        dispatch(getStatementDataAction());

        return () => {
            dispatch(clearStatementDataAction());
        };
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View
                    style={[
                        styles.top,
                        {
                            justifyContent:
                                filters.filter === 'wallet'
                                    ? 'flex-end'
                                    : 'space-between'
                        }
                    ]}
                >
                    {filters.filter === 'account' && (
                        <Text
                            allowFontScaling={false}
                            style={styles.balanceLabel}
                        >
                            Saldo disponível:{' '}
                            <Text
                                allowFontScaling={false}
                                style={styles.balance}
                            >
                                {numeral(balance).format('$ 0,0.00')}
                            </Text>
                        </Text>
                    )}
                    <TouchableOpacity
                        style={styles.filters}
                        onPress={openFilter}
                    >
                        <AntIcon
                            name="filter"
                            color={colors.blue.second}
                            size={20}
                        />
                        <Text
                            allowFontScaling={false}
                            style={styles.filterLabel}
                        >
                            Filtros
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <FlatList
                        ref={scrollRef}
                        data={
                            filters.period === 'month'
                                ? monthButtons
                                : [3, 7, 15, 30, 60, 90]
                        }
                        renderItem={
                            filters.period === 'month'
                                ? renderButtons
                                : renderPeriods
                        }
                        keyExtractor={(item) =>
                            filters.period === 'month'
                                ? item.label
                                : item.toString()
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                        initialScrollIndex={getInitialIndexToRender()}
                        getItemLayout={(data, index) => ({
                            length: 90,
                            offset: 90 * index,
                            index
                        })}
                        centerContent
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 40, paddingRight: 32 }}>
                    {renderContent()}
                </View>
            </SafeAreaView>
            <Animated.View
                style={[
                    styles.bottomSheet,
                    {
                        backgroundColor: translateY.current.interpolate({
                            inputRange: [0, 10, 250],
                            outputRange: [
                                'rgba(0,0,0,.2)',
                                'transparent',
                                'transparent'
                            ],
                            extrapolate: 'clamp'
                        }),
                        transform: [
                            {
                                translateY: translateY.current.interpolate({
                                    inputRange: [0, 250],
                                    outputRange: [0, height],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }
                ]}
            >
                <Animated.View
                    style={[
                        styles.sheet,
                        { transform: [{ translateY: translateY.current }] }
                    ]}
                >
                    <Text allowFontScaling={false} style={styles.filterTitle}>
                        Filtros
                    </Text>
                    {isBeta && (
                        <>
                            <Text
                                allowFontScaling={false}
                                style={styles.filterSheetLabel}
                            >
                                Extrato
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        filters.filter === 'account' &&
                                            styles.buttonActive
                                    ]}
                                    onPress={() => {
                                        dispatch(
                                            changeStatementFiltersAction(
                                                'filter',
                                                'account'
                                            )
                                        );
                                        dispatch(getStatementDataAction());
                                        closeFilter();
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.balanceLabel,
                                            filters.filter === 'account' &&
                                                styles.buttonLabelActive
                                        ]}
                                    >
                                        C. Corrente
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        filters.filter === 'wallet' &&
                                            styles.buttonActive
                                    ]}
                                    onPress={() => {
                                        dispatch(
                                            changeStatementFiltersAction(
                                                'filter',
                                                'wallet'
                                            )
                                        );
                                        dispatch(getStatementDataAction());
                                        closeFilter();
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.balanceLabel,
                                            filters.filter === 'wallet' &&
                                                styles.buttonLabelActive
                                        ]}
                                    >
                                        Carteira
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    <Text
                        allowFontScaling={false}
                        style={styles.filterSheetLabel}
                    >
                        Período:
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                filters.period === 'month' &&
                                    styles.buttonActive
                            ]}
                            onPress={() =>
                                dispatch(
                                    changeStatementFiltersAction(
                                        'period',
                                        'month'
                                    )
                                )
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.balanceLabel,
                                    filters.period === 'month' &&
                                        styles.buttonLabelActive
                                ]}
                            >
                                Por mês
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                filters.period === 'period' &&
                                    styles.buttonActive
                            ]}
                            onPress={() =>
                                dispatch(
                                    changeStatementFiltersAction(
                                        'period',
                                        'period'
                                    )
                                )
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.balanceLabel,
                                    filters.period === 'period' &&
                                        styles.buttonLabelActive
                                ]}
                            >
                                Por período
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                        allowFontScaling={false}
                        style={styles.filterSheetLabel}
                    >
                        Lançamentos:
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                filters.type === 'all' && styles.buttonActive
                            ]}
                            onPress={() =>
                                dispatch(
                                    changeStatementFiltersAction('type', 'all')
                                )
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.balanceLabel,
                                    filters.type === 'all' &&
                                        styles.buttonLabelActive
                                ]}
                            >
                                Todos
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                filters.type === 'credit' && styles.buttonActive
                            ]}
                            onPress={() =>
                                dispatch(
                                    changeStatementFiltersAction(
                                        'type',
                                        'credit'
                                    )
                                )
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.balanceLabel,
                                    filters.type === 'credit' &&
                                        styles.buttonLabelActive
                                ]}
                            >
                                Entradas
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                filters.type === 'debit' && styles.buttonActive
                            ]}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.balanceLabel,
                                    filters.type === 'debit' &&
                                        styles.buttonLabelActive
                                ]}
                                onPress={() =>
                                    dispatch(
                                        changeStatementFiltersAction(
                                            'type',
                                            'debit'
                                        )
                                    )
                                }
                            >
                                Saídas
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={closeFilter}
                        style={styles.closeIcon}
                    >
                        <AntIcon
                            name="close"
                            size={22}
                            color={colors.gray.sixth}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default StatementScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 80 + 15,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        flex: 1,
        position: 'relative'
    },
    safeArea: {
        flex: 1
    },
    balanceLabel: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: colors.gray.sixth,
        textAlign: 'center'
    },
    balance: {
        fontSize: 19,
        color: colors.blue.second
    },
    buttonsContainer: {
        alignSelf: 'stretch'
    },
    scroll: {
        borderBottomWidth: 0.8,
        borderBottomColor: colors.gray.nineth
    },
    button: {
        width: 90,
        height: 25,
        borderRadius: 15,
        backgroundColor: colors.gray.fourth,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 15
    },
    buttonActive: {
        backgroundColor: colors.blue.second
    },
    buttonLabel: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: colors.text.second,
        opacity: 0.5
    },
    buttonLabelActive: {
        color: colors.white,
        opacity: 1
    },
    dayTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: colors.text.second,
        opacity: 0.5,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 20
    },
    dayBalance: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: colors.gray.third,
        textAlign: 'center',
        marginBottom: 30
    },
    infoRow: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: 25,
        height: 20,
        marginRight: 25
    },
    type: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        color: colors.text.second,
        marginBottom: 3
    },
    description: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: colors.text.second,
        marginBottom: 3
    },
    day: {
        fontFamily: 'Roboto-Light',
        fontSize: 11,
        color: colors.text.second
    },
    value: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: colors.blue.second
    },
    verticalBar: {
        width: 1,
        height: 25,
        marginLeft: 12.5,
        backgroundColor: colors.gray.nineth,
        marginVertical: 10
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginBottom: 25
    },
    filters: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterLabel: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: colors.gray.sixth,
        marginLeft: 5
    },
    bottomSheet: {
        backgroundColor: 'rgba(0,0,0,.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end'
    },
    sheet: {
        backgroundColor: colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        // height: 250,
        paddingTop: 25,
        paddingBottom: 30,
        paddingHorizontal: 25,
        position: 'relative'
    },
    closeIcon: {
        position: 'absolute',
        right: 25,
        top: 25
    },
    filterTitle: {
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        color: colors.gray.sixth,
        marginBottom: 25
    },
    filterSheetLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.gray.sixth,
        marginBottom: 8
    }
});
