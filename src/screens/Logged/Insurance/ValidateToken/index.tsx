import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';

// Components
import LinearGradientHeader from '../../../../components/LinearGradientHeader';

// Store
import { IApplicationState } from '../../../../store/types';

// Styles
import colors from '../../../../styles/colors';

// Types
import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

const ValidateTokenScreen: React.FC<InsuranceStackNavigationProps<'ValidateToken'>> = ({
    navigation
}: InsuranceStackNavigationProps<'ValidateToken'>) => {
    const validateToken = useSelector(
        (state: IApplicationState) => state.insurance.validateToken
    );

    return (
        <View style={styles.container}> 
            <LinearGradientHeader isHeaderStackHeight />
            <StatusBar barStyle='light-content' />
            <View style={styles.content}>
                <View style={styles.box}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: 20
                        }}
                        onPress={() => navigation.replace('Insurance')}
                    >
                        <Image
                            source={require('../../../../../assets/icons/close.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18,
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Código de Segurança
                    </Text>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.field}>{validateToken[0] || '-'}</Text>
                        <Text style={styles.field}>{validateToken[1] || '-'}</Text>
                        <Text style={styles.field}>{validateToken[2] || '-'}</Text>
                        <Text style={styles.field}>{validateToken[3] || '-'}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 24
    },
    content: {
        flex: 1,
        paddingTop: '20%',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: colors.blue.sixth,
        alignSelf: 'center',
        marginBottom: 30
    },
    field: {
        width: 42,
        height: 60,
        fontSize: 35,
        backgroundColor: colors.gray.fourth,
        textAlign: 'center',
        paddingTop: Platform.OS == 'ios' ? '3.5%' : '2%',
        marginRight: 8,
        borderRadius: 5,
        color: colors.blue.sixth,
        fontFamily: 'Roboto-Bold'
    },
    fieldContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    box: {
        backgroundColor: colors.gray.tenth,
        paddingHorizontal: 32,
        paddingVertical: 60,
        borderRadius: 10
    }
})

export default ValidateTokenScreen;