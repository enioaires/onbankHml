import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Store
import { IApplicationState } from '../../../store/types';
import {
    changeSignUpTotalSteps,
    clearSignUpPayloadAction
} from '../../../store/ducks/signUp/actions';
import { requestSearchClientAction } from '../../../store/ducks/searchClient/actions';
import { clearPhoneValidationStateAction } from '../../../store/ducks/phoneValidation/actions';
import { clearSearchClientDataAction } from '../../../store/ducks/searchClient/actions';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const DocumentNumberScreen: React.FC<
    SignUpStackNavigationProps<'DocumentNumber'>
> = ({ navigation, route }: SignUpStackNavigationProps<'DocumentNumber'>) => {
    const dispatch = useDispatch();
    const [value, validation, loading] = useSelector(
        (state: IApplicationState) => {
            return [
                state.signUp.payload.documentNumber,
                state.signUp.inputsValidation.documentNumber,
                state.searchClient.isLoading
            ];
        },
        shallowEqual
    );
    // const isCpf = value.replace(/\D/g, '').length < 12;
    const { params } = route;
    const DOCUMENT_NUMBER_PROPS: ILayoutScreenProps = {
        key: 'documentNumber',
        title: {
            cpf: 'Informe o número do CPF'
        },
        stepNumber: {
            cpf: 0
        },
        inputTextProps: {
            type: 'custom',
            options: {
                // mask: isCpf ? '999.999.999-999' : '99.999.999/9999-99'
                mask: '999.999.999-99'
            },
            largeText: true,
            keyboardType: 'numeric'
        },
        placeHolder: '',
        rules: 'Digite somente números, não use pontos, hífens e barras.',
        loading,
        isButtonDisabled: () => {
            if (
                value.replace(/\D/g, '').length <= 10 ||
                (value.replace(/\D/g, '').length > 10 &&
                    value.replace(/\D/g, '').length !== 11 &&
                    value.replace(/\D/g, '').length !== 14) ||
                (value.replace(/\D/g, '').length === 11 &&
                    validation.length > 0) ||
                (value.replace(/\D/g, '').length === 14 &&
                    validation.length > 0)
            )
                return true;
            return false;
        },
        onNext: () => {
            if (value.replace(/\D/g, '').length > 11) {
                dispatch(changeSignUpTotalSteps(13));
            } else {
                dispatch(changeSignUpTotalSteps(11));
            }

            dispatch(
                requestSearchClientAction(
                    value,
                    navigation,
                    params?.routeContext ? 'createAccount' : 'signUp'
                )
            );
        }
    };

    // If promocode screen is active on flux you need comment this useEffect clearstate action
    const clearState = useCallback(() => {
        dispatch(clearSignUpPayloadAction());
        dispatch(clearPhoneValidationStateAction());
        dispatch(clearSearchClientDataAction());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            clearState();
        };
    }, [clearState]);

    return (
        <LayoutScreen
            navigation={navigation}
            screenProps={DOCUMENT_NUMBER_PROPS}
        />
    );
};

export default DocumentNumberScreen;
