/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, View } from 'react-native';
import Switch from '../../../../../components/Switch/Switch';
import { useFetch } from '../../../../../utils/useFetch';
import PageContainer from '../components/PageContainer/PageContainer';
import {
    LimitsTypeTitle,
    OnwershipTypeTitle,
    operationTitle
} from '../Limits.data';
import LimitCard from './components/LimitCard/LimitCard';
import {
    OperationTitle,
    SectionTitle,
    Title,
    TitleContainer,
    ViewModeLabel
} from './LimitDetail.styles';

const operationIcon: any = {
    paymentQrCode: require('../../../../../../assets/icons/qr-code.png'),
    transferPIX: require('../../../../../../assets/icons/pix-transferir.png')
};

const LimitDetail = ({ route, navigation }: any) => {
    const { params } = route;
    const { type, onwershipType } = params;
    const [limitsConfig, setLimitsConfig] = useState({});
    const [currentViewLimit, setCurrentViewLimit] = useState<{
        [key: string]: string;
    }>({});

    const {
        data: limits,
        doFetch: getPixLimits,
        isFetching
    } = useFetch('', 'get', {
        onSuccess: (data) => {
            const operationLimits: any = {};
            const operationLimitView: {
                [key: string]: string;
            } = {};
            Object.keys(data).map((operation) => {
                operationLimits[operation] = {
                    ...data[operation]
                };
                operationLimitView[operation] = 'daily';
            });
            setCurrentViewLimit(operationLimitView);
            setLimitsConfig(limitsConfig);
        }
    });

    useEffect(() => {
        getPixLimits({}, `pix/limit/${type}?ownership=${onwershipType}`);
    }, []);

    const handleChangeLimitView = (operation: string) => () => {
        setCurrentViewLimit((oldState) => {
            return {
                ...oldState,
                [operation]:
                    oldState[operation] === 'daily' ? 'monthly' : 'daily'
            };
        });
    };

    const handlePressLimitCard = (operation: string, period: string) => () => {
        const limitConfig =
            limits[operation][currentViewLimit[operation]][period];
        let unityLimit;

        if (type === 'transfer') {
            unityLimit = limits[operation].unity[period];
        }
        navigation.navigate('LimitConfig', {
            onwershipType,
            limitType: type,
            period,
            limits: limitConfig,
            periodType: currentViewLimit[operation],
            typeTransaction: operation,
            unityLimit
        });
    };

    if (isFetching || !limits || !limitsConfig || !currentViewLimit) {
        return (
            <PageContainer hiddenBalanceInfo>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <ActivityIndicator />
                </View>
            </PageContainer>
        );
    }

    return (
        <PageContainer hiddenBalanceInfo>
            <TitleContainer>
                <Title>{LimitsTypeTitle[type]}</Title>
            </TitleContainer>
            <SectionTitle>{OnwershipTypeTitle[onwershipType]}</SectionTitle>
            <ScrollView>
                {Object.keys(limits).map((operation) => (
                    <>
                        <View
                            key={operation}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Image source={operationIcon[operation]} />
                            <OperationTitle>
                                {operationTitle[operation]}
                            </OperationTitle>
                            <ViewModeLabel
                                isActive={
                                    currentViewLimit[operation] === 'monthly'
                                }
                            >
                                Mensal
                            </ViewModeLabel>
                            <View style={{ marginHorizontal: 6 }}>
                                <Switch
                                    switchBackground="#FFFFFF"
                                    isActive={
                                        currentViewLimit[operation] === 'daily'
                                    }
                                    width={25}
                                    circleSize={9}
                                    height={20}
                                    circleColor="#3199B3"
                                    onChange={handleChangeLimitView(operation)}
                                />
                            </View>

                            <ViewModeLabel
                                isActive={
                                    currentViewLimit[operation] === 'daily'
                                }
                            >
                                Diário
                            </ViewModeLabel>
                        </View>

                        <LimitCard
                            onPress={handlePressLimitCard(
                                operation,
                                'dailyTime'
                            )}
                            type="dailyTime"
                            limits={
                                limits[operation][currentViewLimit[operation]]
                                    .dailyTime
                            }
                        />
                        <LimitCard
                            onPress={handlePressLimitCard(
                                operation,
                                'nightTime'
                            )}
                            type="nightTime"
                            limits={
                                limits[operation][currentViewLimit[operation]]
                                    .nightTime
                            }
                        />
                    </>
                ))}
            </ScrollView>
        </PageContainer>
    );
};

export default LimitDetail;
