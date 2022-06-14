import React from 'react';
import { 
    View,
    Text 
} from 'react-native';

import { RechargeServicesStackNavigationProps } from '../../../../routes/Logged/types';

const OptionScreen: React.FC<RechargeServicesStackNavigationProps<'Option'>> = ({
    navigation
}: RechargeServicesStackNavigationProps<'Option'>) => {
    return (
        <View>
            <Text>
                RECHARGE OPTIONS
            </Text>
        </View>
    )
}

export default OptionScreen;