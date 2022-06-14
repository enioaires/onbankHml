import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
    ShowReceiptContainer,
    SuccessText,
    ShowReceiptText
} from './PaymentSuccess.styles';

import NewActions from './components/NewActions/NewActions';
import ReceiptModal from './components/ReceiptModal/ReceiptModal';

const checkCircle = require('../../../../../../assets/icons/check-circle.png');

const PaymentSuccess = ({ route }: any) => {
    const { params } = route;

    const [toggleReceiptModal, setToggleReceiptModal] = useState(false);

    const handleToggleModal = () => {
        setToggleReceiptModal(!toggleReceiptModal);
    };
    const handleShowReceipt = () => {
        setToggleReceiptModal(!toggleReceiptModal);
    };

    return (
        <View
            style={{
                flex: 10,
                paddingTop: 170,
                paddingHorizontal: 25
            }}
        >
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: 50 }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 30,
                            borderBottomWidth: 1,
                            borderColor: '#DBDBDB'
                        }}
                    >
                        <Image
                            style={{ width: 73, height: 73 }}
                            source={checkCircle}
                        />

                        <SuccessText>
                            Seu saque foi {'\n'} efetuado com sucesso
                        </SuccessText>
                    </View>
                    <ShowReceiptContainer onPress={handleShowReceipt}>
                        <Feather color="#10779C" name="share" size={30} />
                        <ShowReceiptText>
                            Visualizar comprovante
                        </ShowReceiptText>
                    </ShowReceiptContainer>
                </View>
            </ScrollView>
            <View style={{ marginBottom: 50 }}>
                <NewActions />
            </View>
            {toggleReceiptModal && (
                <ReceiptModal
                    transactionId={params.transactionId}
                    isOpen
                    onClose={handleToggleModal}
                />
            )}
        </View>
    );
};

export default PaymentSuccess;
