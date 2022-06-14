import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import LinearGradientButton from '../../../../../../components/LinearGradientButton/LinearGradientButton';
import PageContainer from '../../Components/PageContainer/PageContainer';

// import { Container } from './styles';

const AddDescription = ({ navigation, route }) => {
    const { params } = route;
    console.log(params);
    const [description, setDescription] = useState(params.description || '');
    const handleConfirm = () => {
        navigation.navigate('PaymentAmount', { description });
    };
    return (
        <PageContainer hiddenBalanceInfo>
            <KeyboardAvoidingView
                style={{ flex: 1, opacity: 1 }}
                behavior={Platform.select({
                    ios: 'height',
                    android: 'padding'
                })}
            >
                <View style={{ flex: 1 }}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 70
                            }}
                        >
                            <Text
                                style={{
                                    color: '#707070',
                                    fontSize: 16,
                                    fontFamily: 'Roboto-Bold'
                                }}
                            >
                                Adicionar descrição
                            </Text>
                            <FontAwesome5
                                name="edit"
                                color="#707070"
                                size={26}
                            />
                        </View>
                        <TextInput
                            maxLength={50}
                            autoFocus
                            value={description}
                            onChangeText={setDescription}
                            style={{
                                borderBottomWidth: 1,
                                borderColor: '#C3C3C3',
                                // flex: 1,
                                color: '#707070',
                                fontFamily: 'Roboto-Light',
                                // color: '#10779C',
                                fontSize: 20,
                                borderWidth: 0,
                                paddingBottom: 10,
                                paddingLeft: 5,
                                borderRadius: 0
                                // height: 20
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                alignItems: 'flex-end',
                                color: '#707070',
                                fontFamily: 'Roboto-Light'
                            }}
                        >
                            {50 - description.length}
                            /50
                        </Text>
                    </View>
                </View>
                <LinearGradientButton
                    title="CONFIRMAR"
                    onPress={handleConfirm}
                />
            </KeyboardAvoidingView>
        </PageContainer>
    );
};

export default AddDescription;
