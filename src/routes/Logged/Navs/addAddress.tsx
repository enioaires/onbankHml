import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Components
import ZipcodeScreen from '../../../screens/Logged/AddAddress/ZipcodeScreen';
import AddressScreen from '../../../screens/Logged/AddAddress/AddressScreen';
import HmlTag from '../../../components/HmlTag';

// Store
import { IApplicationState } from '../../../store/types';

// Style
import colors from '../../../styles/colors';

// Navigation Type
import { AddAddressStackList as Routes } from '../types';

interface IAddAddressProps {
    navRef: any;
}

const Stack = createStackNavigator<Routes>();

const AddAddress: React.FC<IAddAddressProps> = ({
    navRef
}: IAddAddressProps) => {
    const zipcode = useSelector(
        (state: IApplicationState) => state.address.payload.postalCode
    );

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTransparent: true,
                headerTintColor: colors.gray.sixth,
                headerBackTitle: ' ',
                headerTitle: '',
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
            <Stack.Screen name="Zipcode" component={ZipcodeScreen} />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text allowFontScaling={false}>CEP {zipcode}</Text>
                    )
                }}
            />
            {/* <Stack.Screen name="Street" component={StreetScreen} />
            <Stack.Screen name="Number" component={NumberScreen} />
            <Stack.Screen name="Neighborhood" component={NeighborhoodScreen} />
            <Stack.Screen name="City" component={CityScreen} />
            <Stack.Screen name="State" component={StateScreen} />
            <Stack.Screen name="Confirm" component={ConfirmScreen} /> */}
        </Stack.Navigator>
    );
};

export default AddAddress;
