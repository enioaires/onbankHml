import React, { useEffect, useState } from 'react';
import { Keyboard, Picker, PickerIOS, Platform, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LinearGradientButton from '../../../../../../../components/LinearGradientButton/LinearGradientButton';
import ModalBottom from '../../../../../../../components/ModalBottom/ModalBottom';
import colors from '../../../../../../../styles/colors';
import {
    Container,
    Title,
    ModalTitle,
    AccountTypeSelectedContainer,
    InputValue,
    AccountTypeSelectedValue
} from './AccountTypeInput.styles';
import { useFetch } from '../../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../.../../../../../store/types';

const editIcon = require('../../../../../../../../assets/icons/new_icons/edit.png');

const accountTyeps: { [key: string]: string } = {
    CC: 'Conta corrente',
    POUPANCA: 'Poupança',
    SALARIO: 'Salário',
    IP: 'Insituição de Pagamento'
};
interface AccountTypeInputProps {
    onSelect: (value: string) => void;
}
const AccountTypeInput = ({ onSelect }: AccountTypeInputProps) => {
    const [toggleModal, setToggleModal] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [inputValue, setInputValue] = useState('');

    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );

    const {
        doFetch: getAccountTypes,
        data: accountTypes,
        isFetching
    } = useFetch('pix/accountTypes', 'get', {
        defaultValue: { types: [] },
        onSuccess: (data) => {
            if (Platform.OS === 'android') {
                setSelectedAccount(data.types[0].value);
            }
        }
    });
    useEffect(() => {
        getAccountTypes();
    }, []);
    const handleToggleModal = () => setToggleModal(!toggleModal);
    const handleNextStep = () => {
        Keyboard.dismiss();
        setInputValue(selectedAccount);
        onSelect(selectedAccount);
        handleToggleModal();
    };

    return (
        <>
            <Container onPress={handleToggleModal}>
                <Title>Tipo de conta</Title>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {!!inputValue && (
                        <AccountTypeSelectedValue>
                            {accountTyeps[inputValue]}
                        </AccountTypeSelectedValue>
                    )}
                    <Image
                        source={editIcon}
                        style={{ width: 20, height: 20 }}
                    />
                </View>
            </Container>
            <ModalBottom
                // modalBackgroundColor="#F8F8F8D1"
                bodyHeight={240}
                isOpen={toggleModal && !hasErrorMessage}
                onClose={handleToggleModal}
            >
                <ModalTitle>Escolho o tipo de conta</ModalTitle>
                {!showPicker && Platform.OS === 'ios' && (
                    <AccountTypeSelectedContainer
                        onPress={() => {
                            setShowPicker(true);
                        }}
                    >
                        <InputValue>{accountTyeps[selectedAccount]}</InputValue>

                        <FontAwesome5
                            name="caret-up"
                            color="#707070"
                            size={23}
                        />
                    </AccountTypeSelectedContainer>
                )}

                {Platform.OS === 'ios' ? (
                    <>
                        {showPicker && (
                            <PickerIOS
                                selectedValue={selectedAccount}
                                onValueChange={(itemValue) => {
                                    if (itemValue) {
                                        setSelectedAccount(itemValue);
                                        setShowPicker(false);
                                    }
                                }}
                            >
                                <PickerIOS.Item label={''} value={''} />
                                {accountTypes.types.map((type) => (
                                    <PickerIOS.Item
                                        label={type.name}
                                        value={type.value}
                                    />
                                ))}
                                {/* <Picker.Item label="JavaScript" value="js" /> */}
                            </PickerIOS>
                        )}
                    </>
                ) : (
                    <Picker
                        enabled={!isFetching}
                        style={{ borderWidth: 1 }}
                        selectedValue={selectedAccount}
                        onValueChange={(itemValue, _) => {
                            setSelectedAccount(itemValue);
                            setShowPicker(false);
                        }}
                    >
                        {accountTypes.types.map((type) => (
                            <Picker.Item
                                key={type.value}
                                label={type.name}
                                value={type.value}
                            />
                        ))}
                    </Picker>
                )}

                {!showPicker && (
                    <View style={{ marginBottom: 30 }}>
                        <LinearGradientButton
                            disabled={!selectedAccount}
                            title="AVANÇAR"
                            onPress={handleNextStep}
                        />
                    </View>
                )}
            </ModalBottom>
        </>
    );
};

export default AccountTypeInput;
