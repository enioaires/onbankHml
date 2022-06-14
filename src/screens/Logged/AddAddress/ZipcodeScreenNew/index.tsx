import React from 'react';
// import { useSelector } from 'react-redux';

// Store
// import { IApplicationState } from '../../../../store';

// Components
import ZipcodeSearch from '../../../../containers/ZipcodeSearch';

const ZipcodeScreen: React.FC = ({ navigation }: any) => {
    // const [totalSteps] = useSelector((appState: IApplicationState) => {
    //     return [appState.signUp.steps];
    // });

    return (
        <ZipcodeSearch
            navigation={navigation}
            buttonLabel="Próximo"
            feature="deposit"
        />
    );
};

export default ZipcodeScreen;
