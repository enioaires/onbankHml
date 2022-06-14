import React from 'react';
import { useSelector } from 'react-redux';

// Components
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

// Store
import { IApplicationState } from '../../../store/types';

// Navigation Type
import { SignUpStackNavigationProps } from '../../../routes/Auth/types';

const CompanyScreen: React.FC<SignUpStackNavigationProps<'Company'>> = ({
    navigation
}: SignUpStackNavigationProps<'Company'>) => {
    const value = useSelector(
        (state: IApplicationState) => state.signUp.payload.companyName
    );

    const companyScreenProps: ILayoutScreenProps = {
        key: 'companyName',
        title: {
            cpf: 'Razão Social'
        },
        stepNumber: {
            cpf: 1
        },
        placeHolder: '',
        isButtonDisabled: () => {
            if (value.length <= 0 || !value.split(' ')[1]) return true;
            return false;
        },
        onNext: () => navigation.push('SignUp', { screen: 'ConstitutionForm' })
    };

    return (
        <LayoutScreen
            navigation={navigation}
            screenProps={companyScreenProps}
        />
    );
};

export default CompanyScreen;
