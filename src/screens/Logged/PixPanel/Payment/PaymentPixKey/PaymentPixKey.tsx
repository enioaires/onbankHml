import React, { useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import PageContainer from '../components/PageContainer/PageContainer';
import PixKeyModal from './components/PixKeyModa/PixKeyModal';
import PixKeyOption from './components/PixKeyOption/PixKeyOption';
import { pixKeyOptions } from './PaymentPix.data';
import { Title } from './PaymentPixKey.styles';

const logoPixIcone = require('../../../../../../assets/icons/logo-pix-blue.png');

const PaymentPixKey = ({ navigation }: any) => {
    const [selectedOption, setOption] = useState('');
    const handlePressKeyOption = (option) => {
        setOption(option.type);
    };
    const handleToggleModal = () => setOption('');

    return (
        <PageContainer>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image source={logoPixIcone} />
                <Title>Escolha a chave PIX</Title>
            </View>
            <FlatList
                style={{ marginTop: 35 }}
                data={pixKeyOptions}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <PixKeyOption
                        key={item.name}
                        onPressOption={handlePressKeyOption}
                        option={item}
                    />
                )}
            />

            {!!selectedOption && (
                <PixKeyModal
                    isOpen
                    option={selectedOption}
                    onClose={handleToggleModal}
                />
            )}
        </PageContainer>
    );
};

export default PaymentPixKey;
