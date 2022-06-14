import React from 'react';
import { useSelector } from 'react-redux';

// Components
import AddressContainer from '../../../../containers/AddressContainer';

// Store
import { IApplicationState } from '../../../../store/types';

const AddressScreen: React.FC = ({ navigation }: any) => {
    const [state, street, complement, number, neighborhood, city] = useSelector(
        (appState: IApplicationState) => {
            return [
                appState.user.data.billingAddress.estado,
                appState.user.data.billingAddress.logradouro,
                appState.user.data.billingAddress.complemento,
                appState.user.data.billingAddress.numero,
                appState.user.data.billingAddress.bairro,
                appState.user.data.billingAddress.cidade
            ];
        }
    );
    return (
        <AddressContainer
            navigation={navigation}
            blockedInputs={[]}
            state={state}
            street={street}
            complement={complement}
            number={number}
            neighborhood={neighborhood}
            city={city}
        />
    );
};

export default AddressScreen;
