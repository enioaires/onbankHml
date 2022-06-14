import React from 'react';
import { useSelector } from 'react-redux';

// Store
import { IApplicationState } from '../../../store/types';

// Components
import ZipcodeSearch from '../../../containers/ZipcodeSearch';

const ZipcodeScreen: React.FC = ({ navigation }: any) => {
    const [totalSteps] = useSelector((appState: IApplicationState) => {
        return [appState.signUp.steps];
    });

    return (
        <ZipcodeSearch
            navigation={navigation}
            signUpSteps={{
                total: totalSteps,
                current: 4
            }}
            buttonLabel="Próximo"
            feature="signUp"
        />
    );
};

export default ZipcodeScreen;
