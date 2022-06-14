import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useFetch } from '../../../../utils/useFetch';
import Switch from '../../../../components/Switch/Switch';
import OptionCard from './components/OptionCard/OptionCard';
import PageContainer from './components/PageContainer/PageContainer';
import { LIMITS_TYPES } from './Limits.data';
import {
    InfoContainer,
    InfoText,
    SectionTitle,
    NightTransactionsContainer,
    Label
} from './Limits.styles';

const LimitsHome = ({ navigation }) => {
    const [nightTransactionStart, setNightTransactionStart] = useState(22);

    const { doFetch: updatePeriodoNigth, isFetching: loadingSubmit } = useFetch(
        'pix/limit/transfer/period-night',
        'put',
        {
            onSuccess: () => {
                setNightTransactionStart((oldState) =>
                    oldState === 22 ? 20 : 22
                );
            }
        }
    );

    const { doFetch: getNightPeriod, isFetching } = useFetch(
        'pix/limit/transfer/period-night',
        'get',
        {
            onSuccess: (data) => {
                const { initialNight } = data;
                setNightTransactionStart(initialNight);
            }
        }
    );
    useEffect(() => {
        getNightPeriod();
    }, []);
    const handleToggleSwitch = (initialNight: number) => () => {
        updatePeriodoNigth({ initialNight });
    };

    const handlePressOption = (type: string) => {
        navigation.navigate('Ownership', {
            type
        });
    };

    return (
        <PageContainer hiddenBalanceInfo>
            <View style={{ flex: 1 }}>
                <InfoContainer>
                    <InfoText>
                        Seus limites são estabelecidos para trazer ainda mais
                        segurança para suas transações financeiras
                    </InfoText>
                </InfoContainer>
                <SectionTitle>
                    Escolha um serviço para definir seus limites
                </SectionTitle>
                <FlatList
                    keyExtractor={(item) => item.type}
                    data={LIMITS_TYPES}
                    renderItem={({ item }) => (
                        <OptionCard
                            key={item.type}
                            onPress={handlePressOption}
                            {...item}
                        />
                    )}
                />
            </View>
            <NightTransactionsContainer>
                <SectionTitle>
                    Defina a hora da sua transação noturna
                </SectionTitle>
                <View
                    style={{
                        paddingBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Label>Início as 20:00</Label>
                    <Switch
                        loading={loadingSubmit || isFetching}
                        onChange={handleToggleSwitch(20)}
                        isActive={nightTransactionStart === 20}
                    />
                </View>
                <View
                    style={{
                        paddingBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Label>Início as 22:00</Label>
                    <Switch
                        loading={loadingSubmit || isFetching}
                        onChange={handleToggleSwitch(22)}
                        isActive={nightTransactionStart === 22}
                    />
                </View>
            </NightTransactionsContainer>
        </PageContainer>
    );
};

export default LimitsHome;
