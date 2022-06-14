import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../../../../../styles/colors';
import { ItemContainer, ItemName, TextInput } from './DataList.styles';

// import { Container } from './styles';

const searchIcon = require('../../../.././../../../../assets/icons/search.png');

const DataList = ({ data, onSelect }) => {
    const [search, setSearch] = useState('');

    const handleSelect = (item) => () => {
        onSelect(item);
    };
    return (
        <Modal visible onRequestClose={handleSelect('')} animationType="slide">
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#EFF1F2'
                }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ padding: 25 }}
                        onPress={handleSelect('')}
                    >
                        <Feather name="arrow-left" size={24} />
                    </TouchableOpacity>
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontSize: 23,
                            color: colors.text.second,
                            fontFamily: 'Roboto-Regular',
                            marginLeft: 25
                        }}
                    >
                        Qual o banco do destinatário?
                    </Text>
                    <View
                        style={{
                            paddingHorizontal: 25
                        }}
                    >
                        <TextInput
                            style={{
                                alignSelf: 'stretch',
                                borderWidth: 1.2,
                                borderRadius: 10,
                                height: 53,
                                borderColor: colors.gray.primary,
                                fontFamily: 'Roboto-Medium',
                                color: colors.text.primary,
                                fontSize: 18,
                                paddingLeft: 23,
                                minWidth: 5
                            }}
                            autoFocus
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder="Busque pelo código ou nome"
                            value={search}
                            onChangeText={(value: string) => setSearch(value)}
                        />
                        <Image
                            source={searchIcon}
                            style={{
                                position: 'absolute',
                                width: 15,
                                height: 15,
                                right: 50,
                                // top: 20,
                                bottom: 50
                            }}
                        />
                    </View>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={data.filter((item) =>
                            search.length >= 1
                                ? item.code.match(search) ||
                                  item.name.toLowerCase().match(search)
                                : true
                        )}
                        keyExtractor={(item) => item.code}
                        contentContainerStyle={{ marginBottom: 30 }}
                        renderItem={({ item }) => (
                            <ItemContainer
                                key={item.code}
                                onPress={handleSelect(item)}
                            >
                                <ItemName>
                                    {item.ispb} - {item.name}
                                </ItemName>
                            </ItemContainer>
                        )}
                    />
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default DataList;
