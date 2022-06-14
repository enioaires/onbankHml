import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utils
import { prefityNames } from '../../utils/prettiers';

// Colors
import colors from '../../styles/colors';

interface AccountInfoContainerProps {
    name: string;
    branch: string;
    account: string;
}

// Component: InputBalls for password on login screen
const AccountInfoContainer: React.FC<AccountInfoContainerProps> = ({
    name,
    branch,
    account
}: AccountInfoContainerProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Text
                    style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 12,
                        color: colors.gray.third
                    }}
                >
                    Acessar como:
                </Text>
                <Text style={styles.textStrong}>{prefityNames(name)}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textStrong}>Ag.</Text>
                    <Text style={styles.textLigth}>{` 000${branch}`}</Text>
                    <Text style={styles.textStrong}>{'  '}Cc</Text>
                    <Text style={styles.textLigth}>{` ${account}`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.blue.second,
        height: 94,
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray.eleventh
    },
    textStrong: {
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        color: colors.gray.eigth
    },
    textLigth: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: colors.gray.eigth
    }
});

export default AccountInfoContainer;
