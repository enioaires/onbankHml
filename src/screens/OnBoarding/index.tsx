import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch } from 'react-redux';

// Components
import ActionButton from '../../components/ActionButton';

// Store
// import { setAlertMessageAction } from '../../store/ducks/alert/actions';

// Styles
import colors from '../../styles/colors';

// Navigation Type
import { AuthStackList, StackNavigationProps } from '../../routes/Auth/types';

const OnBoarding: React.FC<StackNavigationProps<
    AuthStackList,
    'OnBoarding'
>> = ({ navigation }: StackNavigationProps<AuthStackList, 'OnBoarding'>) => {
    const signUp = () => {
        navigation.push('SignUp', {
            screen: 'PromoCode',
            params: {
                promocode: undefined
            }
        });
        // navigation.push('SignUp', { screen: 'Email' });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                    resizeMode="contain"
                />
                <View style={styles.buttons}>
                    <ActionButton
                        style={{
                            marginBottom: 15
                        }}
                        label="Cadastre-se"
                        onPress={signUp}
                    />
                    <ActionButton
                        secondTheme
                        label="Entrar"
                        onPress={() => navigation.push('Login')}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 25,
        backgroundColor: colors.white
    },
    safeArea: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttons: {},
    logo: {
        width: 170,
        height: 70,
        marginBottom: 24,
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: [
            {
                translateY: -60 / 2
            },
            {
                translateX: -200 / 2
            }
        ]
    },
    textContainer: {},
    text: {
        fontSize: 27,
        fontFamily: 'Roboto-Regular',
        color: colors.blue.second
    }
});

export default OnBoarding;
