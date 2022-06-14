import React from 'react';
import { useSelector } from 'react-redux';

// Store
import { IApplicationState } from '../../../../store/types';

// Components
import ZipcodeSearch from '../../../../containers/ZipcodeSearch';

const ZipcodeScreen: React.FC = ({ navigation }: any) => {
    // const userZipcode = useSelector(
    //     (appState: IApplicationState) => appState.user.data.billingAddress.cep
    // );

    return (
        <ZipcodeSearch
            navigation={navigation}
            buttonLabel="Próximo"
            feature="wallet"
        />
    );
};

export default ZipcodeScreen;
