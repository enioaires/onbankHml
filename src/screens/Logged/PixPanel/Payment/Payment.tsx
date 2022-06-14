import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import PageContainer from './components/PageContainer/PageContainer';
import PaymentOption from './components/PaymentOption/PaymentOption';
import { paymentOptions } from './Payment.data';

const PaymentHome = ({ route, navigation }) => {
    useEffect(() => {
        if (route.params?.screen === 'PaymentCopyPaste') {
            return navigation.navigate('PaymentCopyPaste');
        }
    }, []);
    return (
        <PageContainer>
            <FlatList
                data={paymentOptions}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <PaymentOption key={item.name} option={item} />
                )}
            />
        </PageContainer>
    );
};

export default PaymentHome;
