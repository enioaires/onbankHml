import React from 'react';
import {
    View,
    Text
} from 'react-native';

const IsEmulatorScreen: React.FC = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    paddingHorizontal: 20
                }}
            >
                Utilize um dispositivo real para utilizar o app.
            </Text>
        </View>
    )
};

export default IsEmulatorScreen;