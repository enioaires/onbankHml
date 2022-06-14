import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import numeral from 'numeral';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';

// Components
import TextInput from '../../../../components/TextInput';
import RechargeModal from '../../../../containers/RechargeModal';
import AddTransactionPasswordModal from '../../../../containers/AddTransactionPasswordModal';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    ILatestRechargeData,
    IContactsRechargeData
} from '../../../../store/ducks/recharge/types';
import {
    clearRechargeStateAction,
    changeRechargePhoneNumberAction,
    changeRechargeOperatorAction,
    changeRechargeValueAction,
    addRechargeContactAction,
    requestLatestRechargeAction,
    requestContactsRechargeAction,
    getRechargeContactsDetailAction
} from '../../../../store/ducks/recharge/actions';

// Style
import colors from '../../../../styles/colors';

// Utils
import { isDeviceSmallScreen } from '../../../../utils/helpers';
import { maskPhoneNumber, prefityNames } from '../../../../utils/prettiers';

// Navigation Type
import { RechargeStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const LatestScreen: React.FC<RechargeStackNavigationProps<'Latest'>> = ({
    navigation
}: RechargeStackNavigationProps<'Latest'>) => {
    const dispatch = useDispatch();
    const headerStackHeight = useHeaderHeight();
    const [latest, contacts, loading, hasKeys] = useSelector(
        (state: IApplicationState) => {
            return [
                state.recharge.latest,
                state.recharge.contacts,
                state.recharge.isLoading,
                state.user.data.client.hasKeys
            ];
        },
        shallowEqual
    );

    const [tab, setTab] = useState<'recents' | 'contacts'>('recents');
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [registerKeys, setRegisterKeys] = useState(false);
    const [clientInfo, setClientInfo] = useState({});

    const [searchLatest, setSearchLatest] = useState(latest);
    const [searchContacts, setSearchContacts] = useState(contacts);

    const filterLatest = () => {
        return latest!.filter(
            (item) =>
                item.name.toLowerCase().match(search.toLowerCase()) ||
                item.phoneNumber
                    .replace(/\D/g, '')
                    .match(search.replace(/\D/g, ''))
        );
    };

    const filterContacts = () => {
        return contacts!.filter((item) =>
            item.name.toLowerCase().match(search.toLowerCase())
        );
    };

    const onContactclick = (name: string) => {
        dispatch(
            getRechargeContactsDetailAction(
                name,
                (payload) => setClientInfo(payload),
                () => setModal(true)
            )
        );
    };

    const onLatestClick = (item: ILatestRechargeData) => {
        dispatch(changeRechargePhoneNumberAction(item.phoneNumber));
        dispatch(changeRechargeValueAction(item.amount));
        dispatch(
            changeRechargeOperatorAction({
                carrierId: item.carrierId,
                carrierName: item.carrierName
            })
        );
        if (item.name && item.name.length > 0)
            dispatch(addRechargeContactAction(item.name));

        setTimeout(() => {
            navigation.push('Recharge', {
                screen: 'Confirmation'
            });
        }, 400);
    };

    const renderRecents = ({ item }: { item: ILatestRechargeData }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onLatestClick(item)}
            >
                <View style={{ maxWidth: '70%' }}>
                    {item.name && (
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.itemName,
                                {
                                    fontSize: 13,
                                    color: colors.blue.second,
                                    marginBottom: 4
                                }
                            ]}
                        >
                            {prefityNames(item.name)}
                        </Text>
                    )}
                    <Text allowFontScaling={false} style={styles.itemName}>
                        {maskPhoneNumber(item.phoneNumber)}
                    </Text>
                </View>
                <View>
                    <Text allowFontScaling={false} style={styles.itemAmount}>
                        {numeral(item.amount.replace('.', ',')).format(
                            '$ 0,0.00'
                        )}
                    </Text>
                    <Text allowFontScaling={false} style={styles.itemDate}>
                        {item.date}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderContacts = ({ item }: { item: IContactsRechargeData }) => {
        if (!item.name) return null;

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onContactclick(item.name)}
            >
                <Text allowFontScaling={false} style={{ maxWidth: '70%' }}>
                    {prefityNames(item.name)}
                </Text>
            </TouchableOpacity>
        );
    };

    const rechargeToOther = () => {
        if (!hasKeys) {
            setRegisterKeys(true);
        } else {
            dispatch(clearRechargeStateAction());
            navigation.push('Recharge', { screen: 'Number' });
        }
    };

    useEffect(() => {
        if (tab === 'recents') {
            if (search.length > 0) {
                setSearchLatest(filterLatest());
            } else {
                setSearchLatest(latest);
            }
        } else if (search.length > 0) {
            setSearchContacts(filterContacts());
        } else {
            setSearchContacts(contacts);
        }
    }, [search]);

    useEffect(() => {
        setSearchLatest(latest);
        setSearchContacts(contacts);
    }, [latest, contacts]);

    useEffect(() => {
        dispatch(requestLatestRechargeAction());
        dispatch(requestContactsRechargeAction());

        return () => {
            dispatch(clearRechargeStateAction());
        };
    }, []);

    return (
        <>
            <RechargeModal
                visible={modal}
                setVisible={setModal}
                clientInfo={clientInfo}
                navigation={navigation}
            />
            <AddTransactionPasswordModal
                navigation={navigation}
                closeAlert={() => setRegisterKeys(false)}
                showAlert={registerKeys}
            />
            <View style={[styles.container, {paddingTop: headerStackHeight + 10}]}>
                <SafeAreaView style={styles.safeArea}>
                    <View
                        style={{
                            alignSelf: 'stretch',
                            paddingHorizontal: 25,
                            position: 'relative'
                        }}
                    >
                        <TextInput
                            style={styles.input}
                            placeholder={
                                tab === 'recents'
                                    ? 'Busque o número ou contato'
                                    : 'Busque o contato'
                            }
                            value={search}
                            onChangeText={(_, value: string) =>
                                setSearch(value)
                            }
                        />
                        <Image
                            source={require('../../../../../assets/icons/search.png')}
                            style={styles.searchIcon}
                        />
                    </View>
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={styles.tab}
                            onPress={() => {
                                setSearch('');
                                setTab('recents');
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.tabText,
                                    tab === 'recents' && styles.tabTextActive
                                ]}
                            >
                                Recargas Recentes
                            </Text>
                            {tab === 'recents' && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: -1.5,
                                        width: '85%',
                                        height: 3,
                                        borderRadius: 2.5,
                                        backgroundColor: colors.blue.second
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tab}
                            onPress={() => {
                                setSearch('');
                                setTab('contacts');
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.tabText,
                                    tab === 'contacts' && styles.tabTextActive
                                ]}
                            >
                                Contatos
                            </Text>
                            {tab === 'contacts' && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: -1.5,
                                        width: '85%',
                                        height: 3,
                                        borderRadius: 2.5,
                                        backgroundColor: colors.blue.second
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.otherContainer}
                        onPress={rechargeToOther}
                    >
                        <Image
                            source={require('../../../../../assets/icons/new_icons/recharge.png')}
                            style={styles.otherIcon}
                            resizeMode='contain'
                        />
                        <Text allowFontScaling={false} style={styles.otherText}>
                            Recarregar outro número
                        </Text>
                    </TouchableOpacity>
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
                    ) : tab === 'recents' ? (
                        latest && latest.length > 0 ? (
                            <FlatList
                                refreshing
                                style={styles.list}
                                data={searchLatest}
                                renderItem={renderRecents}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text allowFontScaling={false}>
                                    Sem recargas recentes
                                </Text>
                            </View>
                        )
                    ) : contacts && contacts.length > 0 ? (
                        <FlatList
                            refreshing
                            style={styles.list}
                            data={searchContacts}
                            renderItem={renderContacts}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text allowFontScaling={false}>
                                Sem contatos adicionados
                            </Text>
                        </View>
                    )}
                </SafeAreaView>
            </View>
        </>
    );
};

export default LatestScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: isSmallScreen ? 80 : 80 + 20,
        flex: 1
    },
    safeArea: {
        flex: 1
    },
    input: {
        fontSize: 16,
        borderColor: colors.text.smsModel,
        paddingRight: 40
    },
    searchIcon: {
        position: 'absolute',
        width: 15,
        height: 15,
        right: 50,
        top: 20
    },
    tabsContainer: {
        borderBottomColor: colors.gray.nineth,
        borderBottomWidth: 0.7,
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'row'
    },
    tab: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    tabText: {
        fontSize: 14,
        color: colors.text.second,
        fontFamily: 'Roboto-Light',
        opacity: 0.5
    },
    tabTextActive: {
        opacity: 1,
        fontFamily: 'Roboto-Regular'
    },
    otherContainer: {
        height: 55,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.gray.nineth,
        borderBottomWidth: 0.7
    },
    otherIcon: {
        width: 24,
        height: 24,
        marginRight: 15
    },
    otherText: {
        fontSize: 13,
        color: colors.blue.second,
        fontFamily: 'Roboto-Regular'
    },
    list: {
        flex: 1
    },
    itemContainer: {
        height: 80,
        alignSelf: 'stretch',
        borderBottomColor: colors.gray.third,
        borderBottomWidth: 0.7,
        flexDirection: 'row',
        paddingHorizontal: 36,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemName: {
        fontSize: 15,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    },
    itemAmount: {
        fontSize: 14,
        color: colors.text.second,
        fontFamily: 'Roboto-Medium',
        opacity: 0.7,
        marginBottom: 4,
        textAlign: 'right'
    },
    itemDate: {
        fontSize: 12,
        color: colors.text.second,
        fontFamily: 'Roboto-Light',
        opacity: 0.7,
        textAlign: 'right'
    }
});
