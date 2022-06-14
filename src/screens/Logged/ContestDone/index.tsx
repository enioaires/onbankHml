import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

// Components
import { GeneralStackNavigationProps } from 'src/routes/Logged/types';
import ActionButton from '../../../components/ActionButton';

// Styles
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

const ContestDone: React.FC<GeneralStackNavigationProps<'ContestDone'>> = ({
    navigation
}: GeneralStackNavigationProps<'ContestDone'>) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.textContainer}>
                    <FontAwesomeIcon
                        name="user-clock"
                        size={60}
                        color={colors.blue.second}
                        style={{ textAlign: 'center' }}
                    />
                    <Text style={styles.title}>
                        Seu problema foi reportado!
                    </Text>
                    <Text style={styles.description}>
                        Agora iremos analisar e entraremos{'\n'} em contato com
                        você o mais breve
                    </Text>
                </View>
                <ActionButton
                    label="Voltar"
                    onPress={() => {
                        navigation.pop();
                    }}
                />
                <ActionButton
                    secondTheme
                    label="Chat"
                    onPress={() => {
                        navigation.popToTop();
                        navigation.push('UserHelp');
                    }}
                    style={{ marginTop: 15, backgroundColor: 'transparent' }}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...paddings.container
    },
    safeArea: {
        flex: 1
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        marginTop: 50,
        marginBottom: 10,
        fontSize: 18,
        lineHeight: 22,
        color: colors.text.second,
        fontFamily: 'Roboto-Medium',
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        lineHeight: 20,
        color: colors.gray.third,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        marginBottom: 10
    }
});

export default ContestDone;
