import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

// Components
import OptionScreen from '../../../screens/Logged/Transfer/LatestScreen';
import DocumentNumberScreen from '../../../screens/Logged/Transfer/DocumentNumberScreen';
import NameScreen from '../../../screens/Logged/Transfer/NameScreen';
import BranchScreen from '../../../screens/Logged/Transfer/BranchScreen';
import AccountScreen from '../../../screens/Logged/Transfer/AccountScreen';
import AmountScreen from '../../../screens/Logged/Transfer/AmountScreen';
import ConfirmationScreen from '../../../screens/Logged/Transfer/ConfirmationScreen';
import BanksScreen from '../../../screens/Logged/Transfer/BanksScreen';
import HmlTag from '../../../components/HmlTag';
import SearchAccountScreen from '../../../screens/Logged/Transfer/SearchAccountScreen';
import IntTransferOptions from '../../../screens/Logged/Transfer/IntTransferOptions';
import IntDocumentNumberScreen from '../../../screens/Logged/Transfer/IntDocumentNumberScreen';

// Store
import { clearTransferPayloadAction } from '../../../store/ducks/transfer/actions';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { TransferStackList as Routes } from '../types';

interface ITransferProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const TransferNav: React.FC<ITransferProps> = ({ navRef }: ITransferProps) => {
    const dispatch = useDispatch();
    return (
        <Stack.Navigator
            initialRouteName="Latest"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: 'Transferência',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navRef?.current.goBack()}>
                        <Image
                            source={require('../../../../assets/icons/back.png')}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 18,
                                marginLeft: Platform.OS === 'ios' ? 27 : 16
                            }}
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <HmlTag>
                        <TouchableOpacity
                            onPress={() => navRef?.current.navigate('UserHelp')}
                        >
                            <Image
                                source={require('../../../../assets/icons/new_icons/help-gray.png')}
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
            <Stack.Screen name="Latest" component={OptionScreen} />
            <Stack.Screen name="IntOptions" component={IntTransferOptions} />
            <Stack.Screen
                name="DocumentNumber"
                component={DocumentNumberScreen}
            />
            <Stack.Screen
                name="SearchAccount"
                component={SearchAccountScreen}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name="IntDocumentNumber"
                component={IntDocumentNumberScreen}
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen name="Name" component={NameScreen} />
            <Stack.Screen name="Branch" component={BranchScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen
                name="Amount"
                component={AmountScreen}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                if (
                                    navRef?.current.getRootState() &&
                                    navRef?.current.getRootState().routes
                                        .length <= 4
                                ) {
                                    dispatch(clearTransferPayloadAction());
                                }
                                navRef?.current.goBack();
                            }}
                        >
                            <Image
                                source={require('../../../../assets/icons/back.png')}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 18,
                                    marginLeft: Platform.OS === 'ios' ? 27 : 16
                                }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="Banks" component={BanksScreen} />
            <Stack.Screen
                name="Confirmation"
                component={ConfirmationScreen}
                options={{
                    headerTitle: ''
                }}
            />
        </Stack.Navigator>
    );
};

export default TransferNav;
