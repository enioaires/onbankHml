import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Store
import { IApplicationState } from '../../../store/types';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const BirthDateScreen: React.FC<SignUpStackNavigationProps<'BirthDate'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'BirthDate'>) => {
    const [value, validation] = useSelector((state: IApplicationState) => {
        return [
            state.signUp.payload.birthDate,
            state.signUp.inputsValidation.birthDate
        ];
    }, shallowEqual);

    const { params } = route;
    const formTitleCpf = params?.routeContext
        ? 'Data de nascimento'
        : 'Qual o dia, mês e ano do seu nascimento?';
    const BIRTH_DATE_PROPS: ILayoutScreenProps = {
        key: 'birthDate',
        inputTextProps: {
            type: 'datetime',
            options: {
                format: 'DD/MM/YYYY'
            },
            largeText: true
        },
        title: {
            cpf: formTitleCpf,
            cnpj: 'Qual o dia, mês e ano do nascimento do representante?'
        },
        nextScreen: {
            cpf: 'ZipCode',
            cnpj: 'Phone'
        },
        stepNumber: {
            cpf: 4,
            cnpj: 8
        },
        placeHolder: '',
        routeContext: params?.routeContext,
        isButtonDisabled: () => {
            if (
                value.replace(/\D/g, '').length < 8 ||
                (value.replace(/\D/g, '').length === 8 && validation.length > 0)
            )
                return true;
            return false;
        }
    };

    return (
        <LayoutScreen navigation={navigation} screenProps={BIRTH_DATE_PROPS} />
    );
};

export default BirthDateScreen;
