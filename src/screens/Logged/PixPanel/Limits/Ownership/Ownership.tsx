import React from 'react';
import { FlatList, View } from 'react-native';
import OptionCard from '../components/OptionCard/OptionCard';
import PageContainer from '../components/PageContainer/PageContainer';
import { LimitsTypeTitle } from '../Limits.data';
import { OWNERSHIP_TYPES } from './Ownership.data';
import {
    SectionTitle,
    SubTitle,
    Title,
    TitleContainer
} from './Ownership.styles';

// import { Container } from './styles';

const Ownership = ({ route, navigation }) => {
    const { params } = route;
    const { type } = params;
    const handlePressOwnerShip = (onwershipType: string) => {
        navigation.navigate('LimitDetail', { onwershipType, type });
    };
    return (
        <PageContainer hiddenBalanceInfo>
            <TitleContainer>
                <Title>{LimitsTypeTitle[type]}</Title>
                <SubTitle>PIX - Segunda a sexta-feira</SubTitle>
            </TitleContainer>
            <SectionTitle>Escolha os limites por titularidade</SectionTitle>
            <FlatList
                keyExtractor={(item) => item.type}
                data={OWNERSHIP_TYPES}
                renderItem={({ item }) => (
                    <OptionCard
                        onPress={handlePressOwnerShip}
                        key={item.type}
                        {...item}
                    />
                )}
            />
        </PageContainer>
    );
};

export default Ownership;
