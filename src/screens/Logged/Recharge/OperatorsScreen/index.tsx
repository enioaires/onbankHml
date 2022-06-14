import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components

// Store
import { IApplicationState } from '../../../../store/types';
import {
    changeRechargeOperatorAction,
    requestRechargeValuesAction
} from '../../../../store/ducks/recharge/actions';
import { IRechargeOperators } from '../../../../store/ducks/recharge/types';

// Style
import colors from '../../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';

// Navigation Type
import { RechargeStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const OperatorsScreen: React.FC<RechargeStackNavigationProps<'Operators'>> = ({
    navigation
}: RechargeStackNavigationProps<'Operators'>) => {
    const dispatch = useDispatch();
    const [operators, loading] = useSelector((state: IApplicationState) => {
        return [state.recharge.operators, state.recharge.isLoading];
    }, shallowEqual);

    const renderItem = ({
        item,
        index
    }: {
        item: IRechargeOperators;
        index: number;
    }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.itemContainer,
                    index === 0 && { borderTopWidth: 0.7 }
                ]}
                onPress={() => {
                    dispatch(changeRechargeOperatorAction(item));
                    dispatch(requestRechargeValuesAction(navigation));
                }}
            >
                <Text allowFontScaling={false} style={styles.itemName}>
                    {item.carrierName}
                </Text>
                <Image
                    source={require('../../../../../assets/icons/arrow-carrot-right.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text allowFontScaling={false} style={styles.title}>
                    Qual a operadora?
                </Text>
                {loading ? (
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        size="large"
                        color={colors.blue.second}
                    />
                ) : (
                    <FlatList
                        style={styles.list}
                        data={operators}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

export default OperatorsScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: isSmallScreen ? 70 : 80,
        flex: 1
    },
    safeArea: {
        flex: 1
    },
    title: {
        fontSize: 23,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular',
        marginLeft: 25,
        marginBottom: 40
    },
    list: {
        flex: 1
    },
    itemContainer: {
        height: 80,
        alignSelf: 'stretch',
        borderColor: colors.gray.third,
        borderBottomWidth: 0.7,
        paddingHorizontal: 36,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemName: {
        fontSize: 14,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    },
    icon: {
        width: 6,
        height: 12
    }
});
