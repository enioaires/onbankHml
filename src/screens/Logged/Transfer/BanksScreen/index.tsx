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
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

// Components
import api from '../../../../api';
import TextInput from '../../../../components/TextInput';

// Store
import { changeTransferPayloadAllAction } from '../../../../store/ducks/transfer/actions';
import { setAlertMessageAction } from '../../../../store/ducks/alert/actions';

// Style
import colors from '../../../../styles/colors';

// Navigation Type
import { TransferStackNavigationProps } from '../../../../routes/Logged/types';

const BanksScreen: React.FC<TransferStackNavigationProps<'Banks'>> = ({
    navigation
}: TransferStackNavigationProps<'Banks'>) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={[
                    styles.itemContainer,
                    index === 0 && { borderTopWidth: 0.7 }
                ]}
                onPress={() => {
                    dispatch(
                        changeTransferPayloadAllAction({
                            receiverBank: item.code,
                            receiverBankName: item.name,
                            type: 'ted'
                        })
                    );
                    navigation.push('Transfer', { screen: 'Branch' });
                }}
            >
                <Text
                    allowFontScaling={false}
                    style={styles.itemName}
                >{`${item.code} - ${item.name}`}</Text>
            </TouchableOpacity>
        );
    };

    const getBanks = async () => {
        setLoading(true);
        // Saga Fora
        try {
            const resp = await api.get('/transfer/banks');

            // console.log(resp);

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 403 || resp.statusCode === 401) {
                    setLoading(false);
                    const isRevalidate = resp.message.match(/Token expirado./g);

                    dispatch(
                        setAlertMessageAction({
                            title: 'Atenção',
                            message: isRevalidate
                                ? 'Sua sessão expirou!\nEntre em sua conta novamente.'
                                : 'Entre em sua conta novamente.',
                            type: 'error',
                            logout: !isRevalidate,
                            revalidate: isRevalidate
                        })
                    );
                    return;
                }
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema.\nTente novamente mais tarde.'
                    );
                }
                throw new Error(
                    resp.message ||
                        'Ocorreu um problema.\nTente novamente mais tarde.'
                );
            }

            setData(resp.data.banks);
            setSearchedData(resp.data.banks);
        } catch (err) {
            dispatch(
                setAlertMessageAction({
                    title: 'Oops',
                    message:
                        err.message ||
                        'Ocorreu um prolema.\nTente novamente mais tarde.',
                    type: 'error'
                })
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        getBanks();
    }, []);

    const searchContact = () => {
        return data.filter(
            (item: any) => item.code.match(search) || item.name.match(search)
        );
    };

    useEffect(() => {
        if (search.length > 0) {
            setSearchedData(searchContact());
        } else {
            setSearchedData(data);
        }
    }, [search]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text allowFontScaling={false} style={styles.title}>
                    Qual o banco do destinatário?
                </Text>
                <View
                    style={{
                        alignSelf: 'stretch',
                        paddingHorizontal: 25,
                        position: 'relative',
                        marginBottom: 50
                    }}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="Busque pelo código ou nome"
                        value={search}
                        onChangeText={(_, value: string) => setSearch(value)}
                    />
                    <Image
                        source={require('../../../../../assets/icons/search.png')}
                        style={styles.searchIcon}
                    />
                </View>
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
                        data={searchedData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

export default BanksScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 80 + 20,
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
        marginBottom: 20
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
    list: {
        flex: 1
    },
    itemContainer: {
        height: 80,
        alignSelf: 'stretch',
        borderColor: colors.gray.third,
        borderBottomWidth: 0.7,
        paddingHorizontal: 36,
        justifyContent: 'center'
    },
    itemName: {
        fontSize: 14,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular'
    }
});
