import { formatCNPJ, formatCPF } from '@brazilian-utils/brazilian-utils';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { replaceRange } from '../../../../../utils/replaceRange';
import LinearGradientButton from '../../../../../components/LinearGradientButton/LinearGradientButton';
import PageContainer from '../components/PageContainer/PageContainer';
import AccountTypeInput from './components/AccountTypeInput/AccountTypeInput';
import BankInstitutionInput from './components/BankInstitutionInput/BankInstitutionInput';
import ModalTextInput from './components/ModalTextInput/ModalTextInput';
import { Title } from './PaymentBankData.styles';

const PaymentBankData = ({ navigation }: any) => {
    const [accountType, setAccountType] = useState('');
    const [agency, setAgency] = useState('');
    const [account, setAccount] = useState('');
    const [bank, setBank] = useState({});
    const [documentNumber, setDocument] = useState('');
    const disableButton = () => {
        return !accountType || !agency || !bank || !account || !documentNumber;
    };

    const maskDocument = () => {
        if (documentNumber.replace(/\D/g, '').length <= 11) {
            const formattedDocument = formatCPF(documentNumber);
            const maskedDocument = replaceRange(formattedDocument, 0, 3, '***');
            return replaceRange(maskedDocument, 12, 14, '**');
        }
        const formattedDocument = formatCNPJ(documentNumber);
        const maskedDocument = replaceRange(formattedDocument, 0, 2, '**');
        return replaceRange(maskedDocument, 16, 19, '**');
    };

    const handleNavigateToAmount = () => {
        navigation.navigate('PaymentAmount', {
            isBankData: true,
            receiverDetails: {
                documentType:
                    documentNumber.replace(/\D/g, '').length <= 11
                        ? 'CPF'
                        : 'CNPJ',
                taxIdMasked: maskDocument(),
                taxId: documentNumber.replace(/\D/g, ''),
                accountType,
                branch: agency,
                pspId: bank?.ispb,
                instituitionName: bank.name,
                account
            }
        });
    };
    return (
        <PageContainer hiddenBalanceInfo>
            <ScrollView>
                <Title>Preencha os dados abaixo</Title>
                <View style={{ marginTop: 20 }}>
                    <AccountTypeInput onSelect={setAccountType} />
                    <ModalTextInput
                        maxLength={4}
                        title="Agência"
                        onSelect={setAgency}
                        inputLabel="Digite o número da agência"
                    />
                    <ModalTextInput
                        onSelect={setAccount}
                        title="Conta com dígito"
                        inputLabel="Digite o número da conta"
                    />

                    <BankInstitutionInput onSelect={setBank} />
                    <ModalTextInput
                        isDocument
                        onSelect={setDocument}
                        title="CNPJ ou CPF"
                        inputLabel="Digite o CNPJ ou CPF"
                    />
                </View>
            </ScrollView>
            {!disableButton() && (
                <LinearGradientButton
                    disabled={disableButton()}
                    title="AVANÇAR"
                    onPress={handleNavigateToAmount}
                />
            )}
        </PageContainer>
    );
};

export default PaymentBankData;
