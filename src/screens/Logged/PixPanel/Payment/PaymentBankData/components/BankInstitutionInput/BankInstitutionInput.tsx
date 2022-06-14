import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFetch } from '../../../../../../../utils/useFetch';
import ModalBottom from '../../../../../../../components/ModalBottom/ModalBottom';
import DataList from '../DataList/DataList';
import colors from '../../../../../../../styles/colors';
import {
    BankSelectedValue,
    Container,
    InputValue,
    InstituitionSelectedContainer,
    ModalTitle,
    Title
} from './BankInstitutionInput.styles';
import LinearGradientButton from '../../../../../../../components/LinearGradientButton/LinearGradientButton';

const editIcon = require('../../../../../../../../assets/icons/new_icons/edit.png');

// import { Container } from './styles';

const BankInstitutionInput = ({ onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const [toggleModal, setToggleModal] = useState(false);
    const [showDataList, setShowDataList] = useState(false);
    const [selectedBank, setSelectedBank] = useState();
    const { doFetch: getBanks, data: bankList } = useFetch(
        'pix/banks/psps',
        'get',
        {
            defaultValue: { banks: [] }
        }
    );

    useEffect(() => {
        getBanks();
    }, []);
    const handleToggleModal = () => setToggleModal(!toggleModal);

    const handleNextStep = () => {
        setInputValue(`${selectedBank?.ispb} ${selectedBank?.name}`);
        handleToggleModal();
        onSelect(selectedBank);
    };
    const onSelectBank = (bank) => {
        setShowDataList(false);
        if (bank) {
            setSelectedBank(bank);
        }
    };
    return (
        <>
            <Container onPress={handleToggleModal}>
                <Title>Instituição</Title>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {!!inputValue && (
                        <BankSelectedValue>{inputValue}</BankSelectedValue>
                    )}
                    <Image
                        source={editIcon}
                        style={{ width: 20, height: 20 }}
                    />
                </View>
            </Container>
            <ModalBottom
                isOpen={toggleModal}
                bodyHeight={230}
                onClose={handleToggleModal}
            >
                <ModalTitle>Escolha a instituição</ModalTitle>
                <InstituitionSelectedContainer
                    onPress={() => setShowDataList(true)}
                >
                    <InputValue>
                        {selectedBank?.name
                            ? `${selectedBank.ispb} ${selectedBank.name}`
                            : 'Selecione a instiuição'}
                    </InputValue>

                    <FontAwesome5 name="caret-up" color="#707070" size={23} />
                </InstituitionSelectedContainer>
                {!!selectedBank && (
                    <LinearGradientButton
                        onPress={handleNextStep}
                        title="Avançar"
                    />
                )}
                {showDataList && (
                    <DataList onSelect={onSelectBank} data={bankList.banks} />
                )}
            </ModalBottom>
        </>
    );
};

export default BankInstitutionInput;
