import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// Components
import { IApplicationState } from '../../../store/types';

// Store
import LayoutScreen, { ILayoutScreenProps } from '../LayoutScreen';

const EstablishmentDateScreen: React.FC = ({ navigation }: any) => {
    const [value, validation] = useSelector((state: IApplicationState) => {
        return [
            state.signUp.payload.establishmentDate,
            state.signUp.inputsValidation.establishmentDate
        ];
    }, shallowEqual);

    const ESTABLISHMENT_DATE_PROPS: ILayoutScreenProps = {
        key: 'establishmentDate',
        inputTextProps: {
            type: 'datetime',
            options: {
                format: 'DD/MM/YYYY'
            },
            largeText: true
        },
        title: {
            cpf: 'Data de fundação'
        },
        stepNumber: {
            cpf: 4
        },
        placeHolder: '',
        isButtonDisabled: () => {
            if (
                value.replace(/\D/g, '').length < 8 ||
                (value.replace(/\D/g, '').length === 8 && validation.length > 0)
            )
                return true;
            return false;
        },
        onNext: () =>
            navigation.push('SignUp', { screen: 'RepresentativeTaxId' })
    };

    return (
        <LayoutScreen
            navigation={navigation}
            screenProps={ESTABLISHMENT_DATE_PROPS}
        />
    );
};

export default EstablishmentDateScreen;
