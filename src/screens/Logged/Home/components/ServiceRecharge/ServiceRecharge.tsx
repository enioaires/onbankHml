/* eslint-disable consistent-return */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    Image,
    View,
    ScrollView,
    Linking
} from 'react-native';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { IRechargeService } from '../../../../../store/ducks/rechargeServices/types';
import { IApplicationState } from '../../../../../store/types';
import colors from '../../../../../styles/colors';
import {
    RECHARGE_SERVICES_ICONS,
    RECHARGE_SERVICES_OPTIONS
} from '../../../../../utils/variables';
import {
    Container,
    Header,
    HeaderTitle,
    HistoryButton,
    HistoryButtonTitle,
    ServiceName,
    Service,
    ServiceButton
} from './ServiceRecharge.styles';
import AddTransactionPasswordModal from '../../../../../containers/AddTransactionPasswordModal';
import { getInsurancesAction } from '../../../../../store/ducks/insurance/actions';

const localServices = [
    { name: 'Seguro Vida', slugname: 'seguro' }
    // { name: 'OdontoPrev', slugname: 'odonto' }
];

const ServiceRecharge = () => {
    const [registerKeys, setRegisterKeys] = useState(false);

    const insuranceLoading = useSelector(
        (state: IApplicationState) => state.insurance.isLoading,
        shallowEqual
    );

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const rechargeServicesList = useSelector(
        (state: IApplicationState) =>
            state.rechargeServices.rechargeServicesList,
        shallowEqual
    );
    const rechargeServicesLoading = useSelector(
        (state: IApplicationState) => state.rechargeServices.isLoading,
        shallowEqual
    );

    const hasKeys = useSelector(
        (state: IApplicationState) => state.user.data.client.hasKeys
    );

    const handlePressHistoryButton = () => {
        navigation.push('RechargeServices', {
            screen: 'History'
        });
    };

    const handlePressServiceButton = (item: IRechargeService) => () => {
        if (!hasKeys) {
            return setRegisterKeys(true);
        }
        if (item.slugname === 'seguro') {
            return dispatch(getInsurancesAction(navigation));
        }
        if (item.slugname === 'odonto') {
            return Linking.openURL(
                'https://odontoprevonline.com.br/onbank?broker=47585'
            );
        }
        navigation.push('RechargeServices', {
            screen: 'Service',
            params: { item }
        });
    };

    const renderRechageServicesList = (
        item: IRechargeService,
        index: number
    ) => {
        if (!item.name) {
            return <Service />;
        }
        return (
            <Service
                key={item.providerId}
                style={{
                    alignItems: 'center'
                }}
            >
                <ServiceButton
                    style={{
                        shadowColor: '#B1C0DC30',
                        shadowOffset: {
                            width: 0,
                            height: 4
                        },
                        shadowRadius: 8,
                        shadowOpacity: 1,
                        elevation: 2
                    }}
                    onPress={handlePressServiceButton(item)}
                >
                    <Image
                        source={
                            RECHARGE_SERVICES_ICONS[item.name] ||
                            RECHARGE_SERVICES_ICONS.default
                        }
                        style={{
                            height: 30,
                            width: 30
                        }}
                        resizeMode="contain"
                    />
                </ServiceButton>
                {item.slugname !== 'seguro' ? (
                    <ServiceName>{item.name}</ServiceName>
                ) : (
                    <>
                        {item.slugname === 'seguro' && insuranceLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={colors.blue.second}
                                style={{
                                    position: 'absolute',
                                    backgroundColor: colors.white,
                                    transform: [
                                        {
                                            translateY: -10
                                        }
                                    ],
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15
                                }}
                            />
                        ) : (
                            <ServiceName>{item.name}</ServiceName>
                        )}
                    </>
                )}
            </Service>
        );
    };
    if (!rechargeServicesLoading && rechargeServicesList.length <= 0) {
        return <Text>Serviço indisponível no momento</Text>;
    }
    return (
        <Container
            style={{
                shadowColor: '#B1C0DC3F',
                shadowOffset: {
                    width: 0,
                    height: 4
                },
                shadowRadius: 8,
                shadowOpacity: 1,
                elevation: 1
            }}
        >
            <AddTransactionPasswordModal
                navigation={navigation}
                showAlert={registerKeys}
                closeAlert={() => setRegisterKeys(false)}
            />
            <Header>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../../../../../assets/icons/new_icons/bag.png')}
                        style={{
                            width: 24,
                            height: 24,
                            marginRight: 8
                        }}
                    />
                    <HeaderTitle>Loja ON</HeaderTitle>
                </View>
                <HistoryButton onPress={handlePressHistoryButton}>
                    <HistoryButtonTitle>Minhas Compras</HistoryButtonTitle>
                    <Image
                        source={require('../../../../../../assets/icons/forward.png')}
                        resizeMode="contain"
                        style={{
                            width: 10,
                            height: 10,
                            marginLeft: 3
                        }}
                    />
                </HistoryButton>
            </Header>
            <ScrollView
                style={{ maxHeight: 250 }}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}
            >
                {[
                    ...localServices,
                    ...rechargeServicesList,
                    ...[{ name: '' }, { name: '' }, { name: '' }]
                ].map((service, index) => {
                    return renderRechageServicesList(service, index);
                })}
            </ScrollView>
            {/* <FlatList
                data={rechargeServicesList}
                // horizontal
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderRechageServicesList(item)}
                ListEmptyComponent={
                    rechargeServicesLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={colors.blue.second}
                            style={{ marginLeft: 100 }}
                        />
                    ) : (
                        <Text>Serviço indisponível no momento</Text>
                    )
                } 
            />*/}
        </Container>
    );
};

export default ServiceRecharge;
