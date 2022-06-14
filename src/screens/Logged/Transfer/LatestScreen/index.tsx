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

// Components
import LinearGradient from 'react-native-linear-gradient';
import TextInput from '../../../../components/TextInput';
import TransferModal from '../../../../containers/TransferModal';
import AddTransactionPasswordModal from '../../../../containers/AddTransactionPasswordModal';
import TransferAnotherContactModal from '../../../../containers/TransferAnotherContactModal';
import { ViewContainerStackPadding } from '../../../../components/ViewContainerStackPadding';

// Store
import { IApplicationState } from '../../../../store/types';
import {
    IContactsTransferData,
    IFrequentlyTransferData,
    ILatestTransferData
} from '../../../../store/ducks/transfer/types';
import {
    clearTransferPayloadAction,
    requestLatestTransferAction,
    requestContactsTransferAction,
    requestFrequentlyTransferAction,
    changeTransferPayloadAction,
    getTransferContactsDetailAction
} from '../../../../store/ducks/transfer/actions';

// Style
import colors from '../../../../styles/colors';

// Utils
import {
    getNameInitials,
    isDeviceSmallScreen
} from '../../../../utils/helpers';
import { maskPhoneNumber, prefityNames } from '../../../../utils/prettiers';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const isSmallScreen = isDeviceSmallScreen();

const LatestScreen: React.FC<TransferStackNavigationProps<'Latest'>> = ({
    navigation
}: TransferStackNavigationProps<'Latest'>) => {
    const dispatch = useDispatch();
    const [latest, contacts, frequently, loading, hasKeys] = useSelector(
        (state: IApplicationState) => {
            return [
                state.transfer.latest,
                state.transfer.contacts,
                state.transfer.frequently,
                state.transfer.isLoading,
                state.user.data.client.hasKeys
            ];
        },
        shallowEqual
    );

    const [tab, setTab] = useState<'recents' | 'contacts' | 'frequently'>(
        'recents'
    );
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [modalAnother, setModalAnother] = useState(false);
    const [registerKeys, setRegisterKeys] = useState(false);
    const [clientInfo, setClientInfo] = useState({});

    const [searchLatest, setSearchLatest] = useState(latest);
    const [searchContacts, setSearchContacts] = useState(contacts);
    const [searchFrequently, setSearchFrequently] = useState(frequently);

    const filterLatest = () => {
        return latest!.filter((item) =>
            item.name.toLowerCase().match(search.toLowerCase())
        );
    };

    const filterContacts = () => {
        return contacts!.filter((item) =>
            item.contact.toLowerCase().match(search.toLowerCase())
        );
    };

    const filterFrequently = () => {
        return frequently!.filter((item) =>
            item.name.toLowerCase().match(search.toLowerCase())
        );
    };

    const onItemClick = async (
        taxId: string,
        username: string,
        item?: ILatestTransferData
    ) => {
        if (!hasKeys) {
            setRegisterKeys(true);
            return;
        }
        if (item) {
            const {
                amount,
                name,
                onbankAccount,
                receiverAccount,
                receiverBranch,
                taxId: receiverTaxId,
                taxIdFormatted: receiverTaxIdFormatted,
                receiverBankName,
                receiverAccountId,
                receiverBankNumber
            } = item;

            dispatch(
                changeTransferPayloadAction({
                    key: 'type',
                    value: onbankAccount ? 'int' : 'ted'
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverBankName',
                    value: onbankAccount ? 'Onbank' : receiverBankName
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverName',
                    value: name
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverTaxId',
                    value: receiverTaxId
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'amount',
                    value: amount.includes('.')
                        ? amount.replace('.', ',')
                        : amount.concat(',00')
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverAccount',
                    value: receiverAccount
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverBranch',
                    value: receiverBranch
                })
            );
            dispatch(
                changeTransferPayloadAction({
                    key: 'receiverPersonType',
                    value: receiverTaxId.length > 11 ? 'CORPORATE' : 'PERSON'
                })
            );
            if (!onbankAccount) {
                dispatch(
                    changeTransferPayloadAction({
                        key: 'receiverBank',
                        value: receiverBankNumber
                    })
                );
            };
            if (onbankAccount) {
                dispatch(
                    changeTransferPayloadAction({
                        key: 'receiverAccountId',
                        value: receiverAccountId!
                    })
                );
            };
            if (receiverTaxIdFormatted.length > 0) {
                dispatch(
                    changeTransferPayloadAction({
                        key: 'receiverTaxIdFormatted',
                        value: receiverTaxIdFormatted
                    })
                )
            }
            navigation.push('Transfer', { screen: 'Amount' });
        } else {
            dispatch(
                getTransferContactsDetailAction(
                    taxId,
                    username,
                    (payload) => setClientInfo(payload),
                    () => setModal(true)
                )
            );
        }
    };

    const renderRecents = ({ item }: { item: ILatestTransferData }) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer, { minHeight: 100 }]}
                onPress={() => onItemClick(item.taxId, item.name, item)}
            >
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        {item.onbankAccount && (
                            <LinearGradient
                                style={styles.hasOnbank}
                                colors={[
                                    colors.blue.primary,
                                    colors.blue.second
                                ]}
                            />
                        )}
                        <Text style={styles.avatarText}>
                            {getNameInitials(item.name)}
                        </Text>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text allowFontScaling={false} style={styles.itemName}>
                            {prefityNames(item.name)}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.itemPhone,
                                { fontFamily: 'Roboto-Bold' }
                            ]}
                        >
                            {item.receiverBankName}
                        </Text>
                        <View style={styles.bankInfo}>
                            <Text
                                allowFontScaling={false}
                                style={styles.itemPhone}
                            >
                                Ag:{' '}
                                {item.receiverBranch === '1'
                                    ? '0001'
                                    : item.receiverBranch}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.itemPhone,
                                    { marginHorizontal: 10 }
                                ]}
                            >
                                |
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.itemPhone}
                            >
                                Cc: {item.receiverAccount}
                            </Text>
                        </View>
                        {item.phone && (
                            <Text
                                allowFontScaling={false}
                                style={styles.itemPhone}
                            >
                                {maskPhoneNumber(item.phone)}
                            </Text>
                        )}
                    </View>
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

    const renderContacts = ({ item }: { item: IContactsTransferData }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onItemClick(item.taxId, item.contact)}
            >
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        {item.onbankAccount && (
                            <LinearGradient
                                style={styles.hasOnbank}
                                colors={[
                                    colors.blue.primary,
                                    colors.blue.second
                                ]}
                            />
                        )}
                        <Text style={styles.avatarText}>
                            {getNameInitials(item.contact)}
                        </Text>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text allowFontScaling={false} style={styles.itemName}>
                            {prefityNames(item.contact)}
                        </Text>
                        {item.phone && (
                            <Text
                                allowFontScaling={false}
                                style={styles.itemPhone}
                            >
                                {maskPhoneNumber(item.phone)}
                            </Text>
                        )}
                    </View>
                </View>
                {item.phone && (
                    <Image
                        source={require('../../../../../assets/icons/is-user-contact.png')}
                        style={styles.otherIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };

    const renderFrequently = ({ item }: { item: IFrequentlyTransferData }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onItemClick(item.taxId, item.name)}
            >
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        {item.onbankAccount && (
                            <LinearGradient
                                style={styles.hasOnbank}
                                colors={[
                                    colors.blue.primary,
                                    colors.blue.second
                                ]}
                            />
                        )}
                        <Text style={styles.avatarText}>
                            {getNameInitials(item.name)}
                        </Text>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text allowFontScaling={false} style={styles.itemName}>
                            {prefityNames(item.name)}
                        </Text>
                        {item.phone && (
                            <Text
                                allowFontScaling={false}
                                style={styles.itemPhone}
                            >
                                {maskPhoneNumber(item.phone)}
                            </Text>
                        )}
                    </View>
                </View>
                {item.phone && (
                    <Image
                        source={require('../../../../../assets/icons/is-user-contact.png')}
                        style={styles.otherIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };

    const transferToOther = () => {
        if (!hasKeys) {
            setRegisterKeys(true);
        } else {
            setModalAnother(true);
        }
    };

    useEffect(() => {
        if (tab === 'recents') {
            if (search.length > 0) {
                setSearchLatest(filterLatest());
            } else {
                setSearchLatest(latest);
            }
        } else if (tab === 'contacts') {
            if (search.length > 0) {
                setSearchContacts(filterContacts());
            } else {
                setSearchContacts(contacts);
            }
        } else if (search.length > 0) {
            setSearchFrequently(filterFrequently());
        } else {
            setSearchFrequently(frequently);
        }
    }, [search]);

    useEffect(() => {
        setSearchContacts(contacts);
        setSearchLatest(latest);
        setSearchFrequently(frequently);
    }, [tab, contacts, latest, frequently]);

    useEffect(() => {
        dispatch(requestLatestTransferAction());
        dispatch(requestContactsTransferAction());
        dispatch(requestFrequentlyTransferAction());

        return () => {
            dispatch(clearTransferPayloadAction());
        };
    }, [dispatch]);

    return (
        <>
            <TransferModal
                visible={modal}
                setVisible={setModal}
                clientInfo={clientInfo}
                navigation={navigation}
            />
            <TransferAnotherContactModal
                navigation={navigation}
                setVisible={setModalAnother}
                visible={modalAnother}
            />
            <AddTransactionPasswordModal
                navigation={navigation}
                showAlert={registerKeys}
                closeAlert={() => setRegisterKeys(false)}
            />
            <ViewContainerStackPadding style={styles.container}>
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
                            placeholder="Busque o contato"
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

                        <TouchableOpacity
                            style={styles.tab}
                            onPress={() => {
                                setSearch('');
                                setTab('frequently');
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.tabText,
                                    tab === 'frequently' && styles.tabTextActive
                                ]}
                            >
                                Top +
                            </Text>
                            {tab === 'frequently' && (
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
                                Últimas
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
                    </View>
                    <TouchableOpacity
                        style={styles.otherContainer}
                        onPress={transferToOther}
                    >
                        <Image
                            source={require('../../../../../assets/icons/new_icons/add-friend.png')}
                            style={styles.otherIcon}
                        />
                        <Text allowFontScaling={false} style={styles.otherText}>
                            Transferir para outro contato
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
                                    {' '}
                                    Sem transferências recentes
                                </Text>
                            </View>
                        )
                    ) : tab === 'contacts' ? (
                        contacts && contacts.length > 0 ? (
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
                        )
                    ) : frequently && frequently.length > 0 ? (
                        <FlatList
                            refreshing
                            style={styles.list}
                            data={searchFrequently}
                            renderItem={renderFrequently}
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
                                Sem transferências frequentes
                            </Text>
                        </View>
                    )}
                </SafeAreaView>
            </ViewContainerStackPadding>
        </>
    );
};

export default LatestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 0,
        paddingLeft: 0
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
        width: '33.3%',
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
        width: 22,
        height: 22,
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
        minHeight: 80,
        alignSelf: 'stretch',
        borderBottomColor: colors.gray.third,
        borderBottomWidth: 0.7,
        flexDirection: 'row',
        paddingHorizontal: 36,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameContainer: {
        flex: 1,
        marginRight: 5
    },
    itemName: {
        fontSize: 14,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    },
    itemPhone: {
        fontSize: 13,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular',
        opacity: 0.6,
        marginTop: 3
    },
    bankInfo: {
        flexDirection: 'row'
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
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    avatar: {
        backgroundColor: colors.gray.fourth,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 21,
        position: 'relative',
        marginRight: 23
    },
    avatarText: {
        fontSize: 14,
        color: colors.gray.sixth
    },
    hasOnbank: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        right: 0,
        top: 5
    }
});
