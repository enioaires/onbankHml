import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    SafeAreaView
} from 'react-native';

// Components
import ActionButton from '../../../components/ActionButton';

// Style
import colors from '../../../styles/colors';

// Navigation
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const confImg = require('../../../../assets/confirmation-signup-img.png');

const Confirmation: React.FC<SignUpStackNavigationProps<'Confirmation'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Confirmation'>) => {
    const { params } = route;
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.textContainer}>
                    <Image source={confImg} style={styles.img} />
                    <Text allowFontScaling={false} style={styles.title}>
                        Calma, agora falta pouco!
                    </Text>
                    <Text allowFontScaling={false} style={styles.text}>
                        Em mais alguns minutos{' '}
                        {params?.routeContext ? 'a' : 'sua'} conta estará
                        disponível.
                    </Text>
                </View>
                <ActionButton
                    label={params?.routeContext ? 'Concluir' : 'Voltar'}
                    // onPress={() => navigation.navigate('OnBoarding')}
                    onPress={() =>
                        navigation.navigate(
                            params?.routeContext ? 'Home' : 'Login'
                        )
                    }
                />
            </SafeAreaView>
        </View>
    );
};

export default Confirmation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.select({
            android: 80,
            ios: 100
        }),
        paddingHorizontal: 25,
        paddingBottom: 15
    },
    safeArea: {
        flex: 1
    },
    textContainer: {
        flex: 1
    },
    img: {
        marginBottom: 30,
        height: '40%',
        width: '50%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
        fontSize: 23,
        color: colors.blue.second,
        textAlign: 'center',
        marginBottom: 12
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 26,
        color: colors.gray.eigth,
        textAlign: 'center'
    }
});
