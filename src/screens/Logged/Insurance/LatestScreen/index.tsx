import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Styles
import colors from '../../../../styles/colors';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

const LatestScreen: React.FC<InsuranceStackNavigationProps<'Latest'>> = ({
    navigation,
    route
}: InsuranceStackNavigationProps<'Latest'>) => {
    const params = route.params
    return (
        <View style={{flex: 1, justifyContent: 'center'}}> 
            <LinearGradientHeader isHeaderStackHeight />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    alignItems: 'center',
                    marginTop: 50
                }}>
                    <Text style={[styles.title]}>
                        {params?.edit ?
                            params?.cancel ?
                            'Seu seguro foi cancelado\ncom sucesso!'
                            :
                            'Sua alteração foi feita\ncom sucesso!' 
                            :
                            'Seu seguro foi solicitado\ncom sucesso!'
                        }
                    </Text>
                    <AntIcon
                        name='checkcircle'
                        size={60}
                        color={'#109C3B'}
                        style={{alignSelf: 'center', marginVertical: 25}}
                    />
                </View>
                <View style={{paddingHorizontal: 24}}>
                    <View style={styles.bar}/>
                </View>
                {!params?.edit &&
                    <Text style={[styles.description]}>
                        Seu contrato será enviado{'\n'}para o email cadastrado
                    </Text>
                }
            </SafeAreaView>
        </View>
    )
}

export default LatestScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    bar: {
        height: 1.5,
        backgroundColor: colors.gray.fourth,
        width: '100%'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        color: colors.blue.third,
        fontSize: 22,
        marginVertical: 15,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'Roboto-Bold',
        color: colors.text.fourth,
        fontSize: 18,
        marginVertical: 15,
        textAlign: 'center'
    }
})