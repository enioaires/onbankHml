import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Platform
} from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

// Store
import { IApplicationState } from '../../../../store/types';

// Style
import colors from '../../../../styles/colors';

// Utils
import { prefityNames } from '../../../../utils/prettiers';

const AccountsList: React.FC = () => {
    const accounts = useSelector(
        (state: IApplicationState) => state.promocode.invites,
        shallowEqual
    );

    const isGreaterThan100 = accounts?.total && accounts.total > 100;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.textContainer}>
                    <View style={styles.textLeft}>
                        <Text allowFontScaling={false} style={styles.leftTitle}>
                            Indicações
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={styles.leftSubtitle}
                        >
                            Quem tá On?
                        </Text>
                    </View>
                    <View style={styles.countBox}>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.count,
                                { fontSize: isGreaterThan100 ? 25 : 30 }
                            ]}
                        >
                            {accounts?.total}
                        </Text>
                    </View>
                </View>
                {accounts?.total && accounts.total > 0 ? (
                    <FlatList
                        style={styles.list}
                        data={accounts?.accounts}
                        keyExtractor={(item) => String(item)}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.itemText}
                                >
                                    {prefityNames(item)}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <View style={styles.noAccountsContainer}>
                        <Text style={styles.noAccountsText}>
                            Nenhuma conta foi aberta com seu promocode.
                            Compartilhe seu código com seus amigos!
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default AccountsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.select({
            android: 80,
            ios: 100
        }),
        paddingHorizontal: 25
    },
    safeArea: {
        flex: 1
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    textLeft: {},
    leftTitle: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Roboto-Regular',
        color: colors.gray.eigth
    },
    leftSubtitle: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'Roboto-Bold',
        color: colors.blue.primary
    },
    countBox: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.blue.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    count: {
        fontSize: 30,
        fontWeight: '700',
        fontFamily: 'Roboto-Bold',
        color: colors.white
    },
    list: {},
    itemContainer: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray.seventh,
        marginBottom: 12
    },
    itemText: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Roboto-Regular',
        color: colors.gray.eigth
    },
    noAccountsContainer: {
        flex: 1,
        marginTop: 20
    },
    noAccountsText: {
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Roboto-Regular',
        color: colors.gray.eigth,
        lineHeight: 20
    }
});
