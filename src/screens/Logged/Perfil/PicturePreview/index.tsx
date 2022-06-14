import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import api from '../../../../api';
import ActionButton from '../../../../components/ActionButton';

// Store
import { IApplicationState } from '../../../../store/types';
import { onGetUserData } from '../../../../store/ducks/userData/actions';

// Style
import colors from '../../../../styles/colors';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const PicturePreview: React.FC<PerfilStackNavigationProps<'Preview'>> = ({
    navigation,
    route
}: PerfilStackNavigationProps<'Preview'>) => {
    const { image, upload } = route.params;
    const accountId = useSelector(
        (state: IApplicationState) => state.auth.accountId
    );
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const request = async () => {
        setLoading(true);

        const data = new FormData();

        data.append('file', {
            name: 'image.jpg',
            uri: image,
            type: 'image/jpeg'
        });

        // Saga Fora
        try {
            const resp = await api.post(
                `/documents/upload/${upload}/${accountId}`,
                data,
                false,
                {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            );

            if (resp.error || resp.statusCode === 500) {
                if (resp.statusCode === 500) {
                    throw new Error(
                        'Ocorreu um problema. Tente novamente mais tarde.'
                    );
                }
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }

            dispatch(onGetUserData());

            Alert.alert('Envio', resp.data.message, [
                {
                    text: 'Voltar',
                    style: 'default',
                    onPress: () =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'General' }, { name: 'Perfil' }]
                        })
                }
            ]);
        } catch (err) {
            Alert.alert('Envio', err.message);
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    size="large"
                    color={colors.blue.second}
                />
            ) : (
                <>
                    <Image
                        source={{ uri: image }}
                        style={{ flex: 1, marginBottom: 100 }}
                    />
                    <ActionButton
                        label="Enviar Foto"
                        secondTheme
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: colors.white
                        }}
                        textStyle={{
                            color: colors.white
                        }}
                        onPress={request}
                    />
                </>
            )}
        </View>
    );
};

export default PicturePreview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 90,
        paddingBottom: 50,
        paddingHorizontal: 25
    }
});
