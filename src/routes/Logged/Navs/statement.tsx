import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'

// Components
import StatementScreen from '../../../screens/Logged/Statements';
import CancelSchedule from '../../../screens/Logged/CancelScheduleScreen';
import HmlTag from '../../../components/HmlTag';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { StatementStackList as Routes } from '../types';

interface IStatementProps {
    navRef: any;
}

const StatementStack = createStackNavigator<Routes>();

const StatementNav: React.FC<IStatementProps> = ({
    navRef
}: IStatementProps) => {
    return (
        <StatementStack.Navigator
            initialRouteName="Initial"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.white,
                headerBackTitle: ' ',
                headerTitle: 'Extrato',
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
            <StatementStack.Screen name="Initial" component={StatementScreen} />
            <StatementStack.Screen name="Schedule" component={CancelSchedule} />
        </StatementStack.Navigator>
    );
};

export default StatementNav;
