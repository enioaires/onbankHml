import React from 'react';
import { useSelector } from 'react-redux';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Store
import { IApplicationState } from '../../../store/types';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const NameScreen: React.FC<SignUpStackNavigationProps<'Name'>> = ({
    navigation,
    route
}: SignUpStackNavigationProps<'Name'>) => {
    const value = useSelector(
        (state: IApplicationState) => state.signUp.payload.fullName
    );
    const { params } = route;
    const formTitleCpf = params?.routeContext
        ? 'Nome completo'
        : 'Qual o seu nome completo?';
    const NAME_PROPS: ILayoutScreenProps = {
        key: 'fullName',
        title: {
            cpf: formTitleCpf,
            cnpj: 'Qual o nome completo do representante?'
        },
        nextScreen: {
            cpf: 'MotherName'
        },
        stepNumber: {
            cpf: 2,
            cnpj: 6
        },
        placeHolder: '',
        routeContext: params?.routeContext,
        isButtonDisabled: () => {
            if (value.length <= 0 || !value.split(' ')[1]) return true;
            return false;
        }
    };

    return <LayoutScreen navigation={navigation} screenProps={NAME_PROPS} />;
};

export default NameScreen;
