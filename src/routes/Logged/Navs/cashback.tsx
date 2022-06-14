import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'

// Components
import CashbackStatementScreen from '../../../screens/Logged/Cashback/CashbackStatementScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { CashbackStackList as Routes } from '../types';

interface ICashbackProps {
    navRef: any;
}

const CashbackStack = createStackNavigator<Routes>();

const CashbackNav: React.FC<ICashbackProps> = ({
    navRef
}: ICashbackProps) => {
    return (
        <CashbackStack.Navigator
            initialRouteName="CashbackStatement"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.white,
                headerBackTitle: ' ',
                headerTitle: 'Cashback',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navRef?.current.goBack()}
                        style={{paddingLeft: Platform.OS === 'ios' ? 27 : 16}}
                    >
                        {/* <Image
                            source={require('../../../../assets/icons/back.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18,
                                marginLeft: Platform.OS === 'ios' ? 27 : 16
                            }}
                        /> */}
                        <Feather
                            name='arrow-left'
                            size={30}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <HmlTag>
                        <TouchableOpacity
                            onPress={() => navRef?.current.navigate('UserHelp')}
                        >
                            <Image
                                source={require('../../../../assets/icons/new_icons/help-white.png')}
                                resizeMode="contain"
                                style={{
                                    width: 23,
                                    height: 23,
                                    marginRight: 25
                                }}
                            />
                        </TouchableOpacity>
                    </HmlTag>
                )
            }}
        >
            <CashbackStack.Screen 
                name="CashbackStatement" 
                component={CashbackStatementScreen} 
                options={{
                    headerTitle: 'Extrato de Cashback'
                }}
            />
        </CashbackStack.Navigator>
    );
};

export default CashbackNav;
