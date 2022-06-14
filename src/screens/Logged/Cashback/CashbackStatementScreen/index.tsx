import React, { useRef, useEffect, useState } from 'react';
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
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack'
import * as dateFns from 'date-fns';
import { ptBR } from 'date-fns/locale';
import numeral from 'numeral';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';

// Components
import FilterDebitBarGraphic from '../../../../components/FilterDebitBarGraphic';
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    IStatementSearchButton,
    IStatementData
} from '../../../../store/ducks/statement/types';
import {
    changeStatementPayloadAction,
    getStatementDataAction
} from '../../../../store/ducks/statement/actions';
import {
    storeReceiptAction,
    getCreditCardReceiptDataAction,
    getReceiptDataAction
} from '../../../../store/ducks/receipt/actions';

// Styles
import colors from '../../../../styles/colors';

// Navigation Type
import { StatementStackNavigationProps } from '../../../../routes/Logged/types';
import { IStatementCashback } from '../../../../store/ducks/cashback/types';
import {
    clearCashbackStatementDataAction,
    getCashbackAction,
    getCashbackBalanceAction
} from '../../../../store/ducks/cashback/actions';

const creditIcon = require('../../../../../assets/icons/deposit.png');
const uberIcon = require('../../../../../assets/icons/logo-uber.png');
const netflixIcon = require('../../../../../assets/icons/logo-netflix.png');
const ifoodIcon = require('../../../../../assets/icons/logo-ifood.png');
const googleplayIcon = require('../../../../../assets/icons/logo-googleplay.png');
const skyIcon = require('../../../../../assets/icons/logo-sky.png');
const spotifyIcon = require('../../../../../assets/icons/logo-spotify.png');
const ggcreditsIcon = require('../../../../../assets/icons/logo-ggcredits.png');

const eyeClose = require('../../../../../assets/icons/new_icons/hide-white.png');
const eyeOpen = require('../../../../../assets/icons/new_icons/show-white.png');

const StatementScreen: React.FC<StatementStackNavigationProps<'Initial'>> = ({
    navigation
}: StatementStackNavigationProps<'Initial'>) => {
    const dispatch = useDispatch();
    const { height } = Dimensions.get('window');
    const headerStackHeight = useHeaderHeight()

    const loading = useSelector(
        (state: IApplicationState) => state.cashback.isLoading
    );
    const userBalance = useSelector(
        (state: IApplicationState) => state.cashback.balance.balance
    );
    const statementData = useSelector(
        (state: IApplicationState) => state.cashback.statementData,
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
    const lastWeekStatement = useSelector(
        (state: IApplicationState) => state.statement.lastWeekData
    )

    const [balanceAmount, balanceCents] = numeral(userBalance).format('0,0.00').split(',');
    const [hideBalance, setHideBalance] = useState(false);

    const scrollRef = useRef<any>(null);

    // filter container animation
    const [isFilterContainerOpen, setIsFilterContainerOpen] = useState(false);
    const animatedValue = useRef(new Animated.Value(0));

    /* const animatedHeight = animatedValue.current.interpolate({
        inputRange: [0,1],
        outputRange: [0, 190]
    });

    const handleOnPressFilterButton = () => {
        if (isFilterContainerOpen) {
            Animated.timing(animatedValue.current, {
                useNativeDriver: false,
                toValue: 0,
                duration: 200
            }).start();
            setIsFilterContainerOpen(false);
        } else {
            Animated.timing(animatedValue.current, {
                useNativeDriver: false,
                toValue: 1,
                duration: 200
            }).start();
            setIsFilterContainerOpen(true);
        };
    }; */

    const handleOnScroll = () => {
        if (isFilterContainerOpen) {
            Animated.timing(animatedValue.current, {
                useNativeDriver: false,
                toValue: 0,
                duration: 200
            }).start();
            setIsFilterContainerOpen(false);
        }
    }

    /* const onMonthClick = (button: IStatementSearchButton, index: number) => {
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
            </View>
        );
    }; */

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
                <>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Regular',
                                color: colors.gray.eigth
                            }}
                        >
                            Histórico
                        </Text>
                        <View 
                            style={[
                                styles.typeFilterOptionsBar,
                                {
                                    marginTop: 10, 
                                    paddingBottom: 0, 
                                    marginBottom: 0
                                }
                            ]}
                        />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 20}}
                        onScrollBeginDrag={() => {
                            handleOnScroll()
                        }}
                    >
                        {renderItem()}
                    </ScrollView>
                </>
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

        statementData?.reverse().forEach((item: IStatementCashback) => {
            const statementDay = dateFns.format(
                dateFns.parseISO(item.cashbackDate),
                'yyyy-MM-dd'
                // new Date(item.creditDate.replace(/-/g, '/')),
                // 'dd'
            );

            const isNotFirstOfDay = days.some((day) => day === statementDay);
            if (
                true
                /* (!isNotFirstOfDay &&
                    filters.type === 'credit' &&
                    item.type === 'C') ||
                    (filters.type === 'debit' && item.type === 'D') ||
                    filters.type === 'all' */
            ) {
                days.push(
                    dateFns.format(
                        dateFns.parseISO(item.cashbackDate),
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
                            dateFns.parseISO(item.cashbackDate),
                            'yyyy-MM-dd'
                        ) === day /* &&
                        (filters.type === 'all' ||
                            (filters.type === 'credit' && item.type === 'C') ||
                            (filters.type === 'debit' && item.type === 'D')) */
                )
            };
        });

        return filterPerDays;
    };

    const getType = (operationType: string, schedule?: boolean) => {
        switch (operationType) {
            case 'RECARGA':
                return 'Serviço de Recarga'
            default:
                return 'Outros';
        }
    };

    /* const getReceiptType = (name: string) => {
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
            case 'Transferência Pix Recebida':
                return 'deposit/pix'
            case 'Transferência Pix Enviada':
                return 'transfer/pix'
            case 'Serviço de Recarga':
                return 'rechargeServices'
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
    }; */

    const renderItemIcon = (operationDescription: string, isDebit: boolean) => {
        switch (operationDescription) {
            case 'Uber':
                return uberIcon;
            case 'Netflix':
                return netflixIcon;
            case 'SKY TV':
                return skyIcon;
            case 'IFood':
                return ifoodIcon;
            case 'Spotify':
                return spotifyIcon;
            case 'Google Play':
                return googleplayIcon;
            case 'GG Credits Free Fire':
                return ggcreditsIcon;
            default:
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
            .map((item: any, index: number) => {
                // let balance = 0;
                // item[1].forEach((statement: IStatementData) => {
                //     if (statement.type === 'D') {
                //         balance -= statement.amount;
                //     } else {
                //         balance += statement.amount;
                //     }
                // });

                return (
                    <View
                        key={index.toString()}
                    >
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
                            (statement: IStatementCashback, index: number) => {
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
                                        dateFns.parseISO(statement.cashbackDate),
                                        'dd MMM',
                                        { locale: ptBR }
                                    )
                                    .split(' ');

                                const type = getType(statement.operationType);
                                const hasReceipt = false
                                const operationRefound =
                                    hasReceipt && !statement.transactionId;
                                const itemIcon = renderItemIcon(
                                    statement.operationDescription, 
                                    isDebit
                                );

                                // if (filterTypes === 'credit' && isDebit)
                                //     return null;
                                // if (filterTypes === 'debit' && !isDebit)
                                //     return null;

                                return (
                                    <View
                                        key={statement.cashbackDate}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={hasReceipt ? 0.2 : 1}
                                            onPress={
                                                /* hasReceipt
                                                    ? () =>
                                                          getReceipt(statement)
                                                    : () => null */
                                                () => {}
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
                                                                    statement.operationDescription == 'Netflix' && {
                                                                        height: 20
                                                                    },
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
                                                                {statement.operationDescription || ''}
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
                                                                  Number(statement.amount)
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
                    </View>
                );
            });

        return statements;
    };

    /* const getInitialIndexToRender = () => {
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
    }; */

    useEffect(() => {
        dispatch(getCashbackAction());

        return () => {
            dispatch(clearCashbackStatementDataAction());
        };
    }, [dispatch]);

    return (
        <View style={[styles.container]} >
            <StatusBar barStyle='light-content' />
            <LinearGradientHeader
                style={styles.header}
                isHeaderStackHeight
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.balanceLabel}>
                            Saldo de Cashback
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
                                    source={!hideBalance ? eyeOpen : eyeClose}
                                    style={{ width: 22, height: 22 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.headerBar}/>
                <View
                    style={styles.headerFilterContainer}
                >
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
                                ? item.label.toString()
                                : item.toString()
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={getInitialIndexToRender()}
                        getItemLayout={(data, index) => ({
                            length: 90,
                            offset: 90 * index,
                            index
                        })}
                        
                    />
                    <TouchableOpacity
                        style={{paddingHorizontal: 5}}
                        onPress={handleOnPressFilterButton}
                        activeOpacity={0.7}
                    >
                        <Animated.View
                            style={{
                                transform: [{
                                    rotateX: animatedValue.current.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg']
                                    })
                                }]
                            }}
                        >
                            <Icon
                                name='chevron-down'
                                size={30}
                                color={colors.white}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <Animated.View 
                    style={[
                        styles.filterOptionsContainer,
                        {height: animatedHeight},
                        isFilterContainerOpen && {paddingBottom: 25}
                    ]}
                >
                    <Text style={styles.filterLabel}>
                        Filtros 
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={{flex: 1}}
                            activeOpacity={0.8}
                            onPress={() => 
                                dispatch(
                                    changeStatementFiltersAction(
                                        'period',
                                        'period'
                                    )
                                )
                            }
                        >
                            <Text style={styles.typeFilterOptionsLabel}>Período</Text>
                            <View style={[
                                    styles.typeFilterOptionsBar,
                                    filters.period === 'period' && styles.typeFilterOptionsBarActive
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{flex: 1}}
                            activeOpacity={0.8}
                            onPress={() => 
                                dispatch(
                                    changeStatementFiltersAction(
                                        'period',
                                        'month'
                                    )
                                )
                            }
                        >
                            <Text style={styles.typeFilterOptionsLabel}>Mês</Text>
                            <View style={[
                                    styles.typeFilterOptionsBar,
                                    filters.period === 'month' && styles.typeFilterOptionsBarActive
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.filterLabel}>
                        Lançamentos
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity 
                            style={{flex: 1}}
                            activeOpacity={0.8}
                            onPress={() => 
                                dispatch(
                                    changeStatementFiltersAction(
                                        'type',
                                        'all'
                                    )
                                )
                            }
                        >
                            <Text style={styles.typeFilterOptionsLabel}>Todos</Text>
                            <View style={[
                                    styles.typeFilterOptionsBar,
                                    filters.type === 'all' && styles.typeFilterOptionsBarActive
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{flex: 1}}
                            activeOpacity={0.8}
                            onPress={() => 
                                dispatch(
                                    changeStatementFiltersAction(
                                        'type',
                                        'credit'
                                    )
                                )
                            }
                        >
                            <Text style={styles.typeFilterOptionsLabel}>Entradas</Text>
                            <View style={[
                                    styles.typeFilterOptionsBar,
                                    filters.type === 'credit' && styles.typeFilterOptionsBarActive
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{flex: 1}}
                            activeOpacity={0.8}
                            onPress={() => 
                                dispatch(
                                    changeStatementFiltersAction(
                                        'type',
                                        'debit'
                                    )
                                )
                            }
                        >
                            <Text style={styles.typeFilterOptionsLabel}>Saídas</Text>
                            <View style={[
                                    styles.typeFilterOptionsBar,
                                    filters.type === 'debit' && styles.typeFilterOptionsBarActive
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity
                            style={styles.searchButton}
                        >
                            <Text style={styles.searchButtonLabel}>
                                Buscar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View> */}
            </LinearGradientHeader>
            {/* <FilterDebitBarGraphic
                lastWeekStatement={lastWeekStatement}
            /> */}
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.historyContainer}>
                    {renderContent()}
                </View>
            </SafeAreaView>
        </View>
    );
};

export default StatementScreen;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 25,
        flex: 1,
        position: 'relative',
        backgroundColor: colors.gray.tenth
    },
    safeArea: {
        flex: 1
    },
    header: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 22,
        overflow: 'hidden',
        elevation: 5,
        paddingVertical: 0
    },
    headerTop: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    headerBar: {
        height: 1,
        backgroundColor: colors.white,
        opacity: 0.3
    },
    balanceLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
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
    headerFilterContainer: {
        paddingVertical: 20,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10
    },
    buttonActive: {
        backgroundColor: colors.white
    },
    buttonLabel: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: colors.white
    },
    buttonLabelActive: {
        color: colors.blue.fifth
    },
    filterOptionsContainer: {
        paddingBottom: 0
    },
    filterLabel: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 20
    },
    typeFilterOptionsLabel: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 8
    },
    typeFilterOptionsBar: {
        height: 2,
        backgroundColor: colors.white,
        opacity: 0.6,
        marginBottom: 20
    },
    typeFilterOptionsBarActive: {
        height: 3,
        opacity: 1,
        marginBottom: 20,
        borderRadius: 2
    },
    searchButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.white,
        paddingHorizontal: 60,
        paddingVertical: 8
    },
    searchButtonLabel: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        color: colors.white
    },
    historyContainer:{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
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
    }
});
