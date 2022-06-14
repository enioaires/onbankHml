import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';

import { GeneralStackNavigationProps } from '../../../routes/Logged/types';
import { debitChargeContestAction } from '../../../store/ducks/statement/actions';
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

import { IApplicationState } from '../../../store/types';

const ListItem: React.FC<{
    item: string;
    index: number;
    onPress: () => void;
}> = ({
    item,
    index,
    onPress
}: {
    item: string;
    index: number;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            style={[styles.item, index === 0 && { borderTopWidth: 0.7 }]}
            onPress={onPress}
        >
            <EntypoIcon
                name="arrow-bold-right"
                size={20}
                color={colors.blue.second}
            />
            <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
    );
};

const ContestOptions: React.FC<GeneralStackNavigationProps<
    'ContestOptions'
>> = ({ navigation, route }: GeneralStackNavigationProps<'ContestOptions'>) => {
    const dispatch = useDispatch();
    const { isVirtual } = route.params;

    const contestLoading = useSelector(
        (state: IApplicationState) => state.statement.isLoading
    );
    const transactionId = useSelector(
        (state: IApplicationState) => state.receipt.receipt?.transactionCode
    );

    const onPressItem = (reason: string) => {
        // navigation.pop();
        // navigation.pop();
        // navigation.push('General', { screen: 'ContestDone' });

        dispatch(
            debitChargeContestAction(
                reason,
                transactionId || '',
                navigation,
                isVirtual
            )
        );
    };

    return (
        <View style={styles.container}>
            {contestLoading && (
                <ActivityIndicator
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.1)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    size="large"
                    color={colors.blue.second}
                />
            )}
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>
                    Nos diga qual é o problema com{'\n'}essa transação.
                </Text>
                <FlatList
                    data={[
                        'Meu cartão foi roubado',
                        'Perdi meu cartão',
                        'Compra duplicada',
                        'Cancelei essa compra',
                        'O valor está errado',
                        'Não recebi o produto',
                        'O produto veio com defeito',
                        'Não recebi/Não possuo este cartão',
                        'Não reconheço essa compra'
                    ]}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => (
                        <ListItem
                            item={item}
                            index={index}
                            onPress={() => onPressItem(item)}
                        />
                    )}
                />
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
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 31,
        lineHeight: 22,
        marginHorizontal: 25
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderWidth: 0.7,
        borderTopWidth: 0,
        borderColor: colors.gray.second
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    }
});

export default ContestOptions;
