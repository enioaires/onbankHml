import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Store
import { IApplicationState } from '../../../store/types';
import { requestSearchPhoneNumberAction } from '../../../store/ducks/searchPhoneNumber/actions';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const PhoneScreen: React.FC<SignUpStackNavigationProps<'Phone'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Phone'>) => {
    const dispatch = useDispatch();
    const [
        value,
        validation,
        searchLoading,
        phoneValidationLoading,
        accountId
    ] = useSelector((state: IApplicationState) => {
        return [
            state.signUp.payload.phone,
            state.signUp.inputsValidation.phone,
            state.searchPhoneNumber.isLoading,
            state.phoneValidation.isLoading,
            state.signUp.payload.accountId
        ];
    }, shallowEqual);

    const { params } = route;
    const formTitleCpf = params?.routeContext
        ? 'Número do telefone'
        : 'Qual o seu telefone?';
    const PHONE_PROPS: ILayoutScreenProps = {
        key: 'phone',
        title: {
            cpf: formTitleCpf,
            cnpj: 'Qual o telefone do representante?'
        },
        inputTextProps: {
            type: 'cel-phone',
            options: {},
            largeText: true
        },
        stepNumber: {
            cpf: 7,
            cnpj: accountId ? 10 : 9
        },
        placeHolder: '',
        loading: searchLoading || phoneValidationLoading,
        isButtonDisabled: () => {
            if (value.replace(/\D/g, '').length < 11 || validation.length > 0)
                return true;
            return false;
        },
        onNext: () => {
            dispatch(
                requestSearchPhoneNumberAction(
                    value,
                    navigation,
                    params?.routeContext
                )
            );
        },
        routeContext: params?.routeContext
    };

    return <LayoutScreen navigation={navigation} screenProps={PHONE_PROPS} />;
};

export default PhoneScreen;
