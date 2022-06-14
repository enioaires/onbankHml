import React from 'react';
import { useSelector } from 'react-redux';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Store
import { IApplicationState } from '../../../store/types';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const MotherNameScreen: React.FC<SignUpStackNavigationProps<'MotherName'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'MotherName'>) => {
    const value = useSelector(
        (state: IApplicationState) => state.signUp.payload.motherName
    );

    const { params } = route;
    const formTitleCpf = params?.routeContext
        ? 'Nome completo da mãe'
        : 'Insira o nome completo da sua mãe';
    const MOTHER_NAME_PROPS: ILayoutScreenProps = {
        key: 'motherName',
        title: {
            cpf: formTitleCpf,
            cnpj: 'Insira o nome da mãe do representante'
        },
        nextScreen: {
            cpf: 'BirthDate'
        },
        stepNumber: {
            cpf: 3,
            cnpj: 7
        },
        placeHolder: '',
        routeContext: params?.routeContext,
        isButtonDisabled: () => {
            if (value.length <= 0 || !value.split(' ')[1]) return true;
            return false;
        }
    };

    return (
        <LayoutScreen navigation={navigation} screenProps={MOTHER_NAME_PROPS} />
    );
};

export default MotherNameScreen;
