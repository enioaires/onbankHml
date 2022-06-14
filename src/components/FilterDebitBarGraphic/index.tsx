import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import * as dateFns from 'date-fns'

// Store
import { 
    IStatementData
} from '../../store/ducks/statement/types';

// Styles
import colors from '../../styles/colors';

interface IProps {
    lastWeekStatement: IStatementData[] | undefined
};

interface IBarProps {
    percent: number;
    weekDay: number;
};

const FilterDebitBarGraphic: React.FC<IProps> = ({
    lastWeekStatement 
}: IProps) => {
    const items: IBarProps[] = [];
     
    const handleItemsStatement = (data: IStatementData[] | undefined) => {
        const days: string[] = [];
        let n = -6;
        const today = new Date();
        today.setHours(today.getHours() - 3)
        let totalDebit = 0;
        data?.forEach(
            (element) => element.type === 'D' ? totalDebit = totalDebit + element.amount : null
        );

        while (n <= 0) {
            const day = dateFns.add(today, { days: n });
            days.push(day.toISOString().slice(0,10));
            n = n + 1;
        };

        days.forEach((day) => {
            let debit = 0
            data?.map((element) => {
                if (day === element.entryDate.slice(0, 10) && element.type === 'D') {
                    debit =  debit + element.amount
                };
            });

            if (debit !== 0) {
                items.push(
                    {
                        percent: (debit / totalDebit) * 100,
                        weekDay: dateFns.getDay(dateFns.parseISO(`${day}`))
                    }
                );
            } else {
                items.push(
                    {
                        percent: debit,
                        weekDay: dateFns.getDay(dateFns.parseISO(`${day}`))
                    }
                );
            };
        })
    };

    const handleWeekDayName = (weekDayNumber: number) => {
        switch (weekDayNumber) {
            case 0:
                return 'Dom';
            case 1: 
                return 'Seg';
            case 2:
                return 'Ter';
            case 3:
                return 'Qua';
            case 4:
                return 'Qui';
            case 5:
                return 'Sex';
            case 6:
                return 'Sab';
            default:
                return;
        }
    };
    
    handleItemsStatement(lastWeekStatement);

    const [isFilterContainerOpen, setIsFilterContainerOpen] = useState(false)

    const animatedValue = useRef(new Animated.Value(0));

    const animatedHeight = animatedValue.current.interpolate({
        inputRange: [0, 1],
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
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.texts}>
                    Gastos na última semana
                </Text>
                <TouchableOpacity
                    onPress={handleOnPressFilterButton}
                    activeOpacity={0.8}
                >
                    <Animated.View
                        style={{
                            transform: [
                                {rotateX: animatedValue.current.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })}
                            ]
                        }}
                    >
                        <Icon
                            name='chevron-down'
                            size={30}
                            color={colors.gray.eigth}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Animated.View style={[
                    styles.barsContainer,
                    {height: animatedHeight}
                ]}
            >
                {lastWeekStatement?.length === 0 ? 
                    <Text style={styles.texts}>Sem gastos na última semana!</Text>
                    :
                    items.map((element, index) => 
                        <View key={index.toString()}>
                            <View style={styles.barEmpty}>
                                <View 
                                    style={[
                                        styles.barFull,
                                        {height: `${element.percent}%`}
                                    ]}
                                />
                            </View>
                            <Text style={styles.texts}>
                                {index === 6 ? 'Hoje' : handleWeekDayName(element.weekDay)}
                            </Text>
                        </View>
                    )
                }
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray.fifth,
        paddingHorizontal: 19,
        elevation: 4,
        marginBottom: 25,
        paddingTop: 12 + 8,
        paddingBottom: 12,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginHorizontal: 3,
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 8,
        zIndex: -1,
        top: -8
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 5
    },
    texts: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.gray.eigth
    },
    barsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        overflow: 'hidden',
        alignItems: 'center'
    },
    barEmpty :{
        height: 120,
        width: 6,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: colors.white,
        justifyContent: 'flex-end'
    },
    barFull: {
        height: '50%',
        backgroundColor: colors.blue.primary
    }
})

export default FilterDebitBarGraphic