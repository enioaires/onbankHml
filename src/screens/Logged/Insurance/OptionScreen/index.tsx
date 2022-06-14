import React from 'react';
import { 
    View,
    Text 
} from 'react-native';

import { InsuranceStackNavigationProps } from '../../../../routes/Logged/types';

const OptionScreen: React.FC<InsuranceStackNavigationProps<'Option'>> = ({
    navigation
}: InsuranceStackNavigationProps<'Option'>) => {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}> 
            <Text>
                INSURANCE OPTIONS
            </Text>
        </View>
    )
}

export default OptionScreen;