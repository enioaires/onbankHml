import React, { useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../../../../../../styles/colors';
import { useSelector } from 'react-redux';

import ModalBottom from '../../../../../../components/ModalBottom/ModalBottom';
import {
    CodeCell,
    CodeCellText,
    ModalBody,
    Title
} from './PasswordModal.styles';
import LinearGradientButton from '../../../../../../components/LinearGradientButton/LinearGradientButton';
import { useFetch } from '../../../../../../utils/useFetch';
import { IApplicationState } from '../../../../../../store/types';

const { height } = Dimensions.get('screen');

const PasswordModal = ({ isOpen, onClose, onSuccess, isLoading }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue
    });
    const hasErrorMessage = useSelector(
        (state: IApplicationState) => state.alert.message
    );
    const { doFetch: validatePassword, isFetching } = useFetch(
        'key/validate',
        'post',
        {
            onSuccess,
            onError: () => {
                setValue('');
            }
        }
    );

    const handleValidatePassword = () => {
        validatePassword({ transactionPassword: value });
    };
    return (
        <ModalBottom
            disabledBackdrop={isFetching || isLoading}
            isOpen={isOpen && !hasErrorMessage}
            onClose={onClose}
            bodyHeight={height * 0.32}
        >
            <ModalBody>
                <Title>Digite sua senha para {'\n'} validar a transação</Title>

                <CodeField
                    ref={ref}
                    {...props}
                    autoFocus
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={4}
                    rootStyle={{
                        paddingHorizontal: 30,
                        marginVertical: 36,
                        justifyContent: 'center'
                    }}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <CodeCell
                            onPress={() => console.log(ref?.current?.focus())}
                        >
                            {console.log(symbol)}
                            {symbol ? (
                                <Icon
                                    name="controller-record"
                                    size={28}
                                    color={colors.blue.second}
                                />
                            ) : (
                                <Icon
                                    name="controller-record"
                                    size={28}
                                    color="#cbcbcb"
                                />
                            )}
                        </CodeCell>
                    )}
                />
                <LinearGradientButton
                    loading={isFetching || isLoading}
                    disabled={value.length < 4}
                    title="CONFIRMAR"
                    onPress={handleValidatePassword}
                />
            </ModalBody>
        </ModalBottom>
    );
};

export default PasswordModal;
