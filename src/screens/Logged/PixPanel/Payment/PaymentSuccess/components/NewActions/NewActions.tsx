import React from 'react';
import { View, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Action, ActionName, Title } from './NewActions.styles';

const arrowCarrot = require('../../../../../../../../assets/icons/arrow-carrot-right.png');

const actions = [
    {
        name: 'Novo pagamento Pix',
        screen: 'Payment'
    },
    {
        name: 'Fazer uma cobrança PIX',
        screen: 'Receive'
    }
];
const NewActions = () => {
    const navigation = useNavigation();
    const handlePressOption = (option) => () => {
        navigation.reset({
            routes: [{ name: 'Panel' }, { name: option.screen }]
        });
    };
    return (
        <View>
            <Title>Fazer nova operação</Title>

            <FlatList
                data={actions}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <Action key={item.name} onPress={handlePressOption(item)}>
                        <ActionName>{item.name}</ActionName>

                        <Image source={arrowCarrot} />
                    </Action>
                )}
            />
        </View>
    );
};

export default NewActions;
