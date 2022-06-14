import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';

// Components
import OptionButton from '../../../components/OptionButton';

// Style
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

// Navigation Type
import { GeneralStackNavigationProps } from '../../../routes/Logged/types';

const ContestType: React.FC<GeneralStackNavigationProps<'ContestType'>> = ({
    navigation
}: GeneralStackNavigationProps<'ContestType'>) => {
    const onPress = (option: boolean) => {
        navigation.push('General', {
            screen: 'ContestOptions',
            params: { isVirtual: option }
        });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text style={styles.title}>Qual o tipo da compra?</Text>
                    <OptionButton
                        title="Compra Virtual"
                        description="Compras realizadas em sites ou plataformas online"
                        onPress={() => onPress(true)}
                        style={{ marginBottom: 15 }}
                        containerStyle={{ paddingBottom: 15 }}
                    />
                    <OptionButton
                        title="Compra Presencial"
                        description="Compras realizadas através de máquinas de cartão"
                        onPress={() => onPress(false)}
                        containerStyle={{
                            paddingBottom: 15,
                            paddingRight: '28%'
                        }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ContestType;

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottomText: {
        fontFamily: 'Roboto-Medium',
        color: colors.blue.second,
        fontSize: 17,
        marginRight: 7
    },
    title: {
        fontFamily: 'Roboto-Regular',
        color: colors.text.second,
        fontSize: 20,
        marginBottom: 31,
        lineHeight: 22,
        marginHorizontal: 10
    }
});
