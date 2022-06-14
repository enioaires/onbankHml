import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Linking,
    TouchableOpacity,
    Platform,
    ScrollView,
    StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';

// Components
import OptionButton from '../../../components/OptionButton';

// Store
import { IApplicationState } from '../../../store/types';

// Styles
import { paddings } from '../../../styles/paddings';
import colors from '../../../styles/colors';

// Navigation Type
import {
    HelpStackNavigationProps,
    HelpStackList
} from '../../../routes/Auth/types';
import {
    UserHelpStackNavigationProps,
    UserHelpStackList
} from '../../../routes/Logged/types';

const OptionsScreen: React.FC<
    | HelpStackNavigationProps<'Options'>
    | UserHelpStackNavigationProps<'Options'>
> = ({
    navigation
}:
    | HelpStackNavigationProps<'Options'>
    | UserHelpStackNavigationProps<'Options'>) => {
    const revalidated = useSelector(
        (state: IApplicationState) => state.auth.revalidated
    );

    const onPress = (screen: keyof HelpStackList | keyof UserHelpStackList) => {
        if (revalidated) {
            navigation.push('UserHelp', { screen });
        } else {
            navigation.push('Help', { screen });
        }
    };

    return (
        <View style={[styles.container]}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.title}>
                        <Text style={styles.helpTitle}>PRECISA DE AJUDA?</Text>
                        <Text style={styles.helpDescription}>
                            Escolha entre os canais de comunicação
                        </Text>
                    </View>
                    <OptionButton
                        onPress={() => onPress('FAQ')}
                        title="Dúvidas?"
                        description="Acesse nosso FAQ"
                        icon={require('../../../../assets/icons/new_icons/help.png')}
                        style={{ marginBottom: 19 }}
                    />
                    <OptionButton
                        onPress={() => onPress('Chat')}
                        title="Iniciar Chat"
                        description="Atendimento online"
                        icon={require('../../../../assets/icons/new_icons/chat.png')}
                        style={{ marginBottom: 19 }}
                    />
                    <OptionButton
                        onPress={() =>
                            Linking.openURL('mailto:contato@onbank.com.br')
                        }
                        title="Enviar E-mail"
                        description="Entre em contato conosco"
                        icon={require('../../../../assets/icons/new_icons/email.png')}
                    />
                </ScrollView>
                <View style={styles.bottom}>
                    <Text allowFontScaling={false} style={styles.contactTitle}>
                        Contatos:
                    </Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => Linking.openURL('tel:0800 010 0800')}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.contacts}
                            >
                                4007 2394
                            </Text>
                        </TouchableOpacity>
                        <Text
                            allowFontScaling={false}
                            style={{ marginHorizontal: 5 }}
                        >
                            |
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => Linking.openURL('tel:4007 2394')}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.contacts}
                            >
                                0800 010 0800
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text allowFontScaling={false} style={styles.contacts}>
                            Ouvidoria Cartão:{` `}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => Linking.openURL('tel:0800 701 0412')}
                        >
                            <Text
                                allowFontScaling={false}
                                style={styles.contacts}
                            >
                                0800 701 0412
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            Linking.openURL('mailto:contato@onbank.com.br')
                        }
                    >
                        <Text allowFontScaling={false} style={styles.contacts}>
                            contato@onbank.com.br
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            Linking.openURL('mailto:ouvidoria@onbank.com.br')
                        }
                    >
                        <Text allowFontScaling={false} style={styles.contacts}>
                            ouvidoria@onbank.com.br
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        flex: 1,
        paddingTop: Platform.select({
            ios: 100,
            android: StatusBar.currentHeight ? StatusBar.currentHeight + 50 : 80
        })
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    scroll: {
        flex: 1,
        marginBottom: 20
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    contactTitle: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.text.smsModel,
        marginBottom: 7
    },
    contacts: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.second,
        lineHeight: 24
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    helpTitle: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: colors.blue.second,
        lineHeight: 22
    },
    helpDescription: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: colors.text.fourth
    }
});

export default OptionsScreen;
