import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';

// Components
import TextInput from '../../components/TextInput';

// Store
import { addRechargeContactAction } from '../../store/ducks/recharge/actions';

// Styles
import colors from '../../styles/colors';

interface IProps {
    closeAlert(value: boolean): void;
    showAlert: boolean;
    navigation: any;
}

const AddRechargeContactModal: React.FC<IProps> = ({
    showAlert,
    closeAlert,
    navigation
}: IProps) => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const onPress = (option: 'add' | 'dont') => {
        Keyboard.dismiss();
        closeAlert(false);
        dispatch(addRechargeContactAction(option === 'add' ? name : ''));
        setTimeout(() => {
            navigation.push('Recharge', { screen: 'Confirmation' });
        }, 400);
    };

    return (
        <Modal
            isVisible={showAlert}
            hasBackdrop
            backdropColor="#000"
            backdropOpacity={0.4}
            avoidKeyboard
            animationInTiming={800}
            animationOutTiming={800}
        >
            <View style={styles.container}>
                <Text allowFontScaling={false} style={[styles.text]}>
                    Gostaria de adicionar um contato para{'\n'}
                    esse número de celular?
                </Text>

                <TextInput
                    value={name}
                    onChangeText={(_, value: string) => setName(value)}
                    style={{
                        borderRadius: 0,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        marginBottom: 50,
                        marginHorizontal: '10%'
                    }}
                    placeholder="Nome"
                />

                <View style={styles.noActionContainer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => onPress('dont')}
                    >
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.noAction,
                                { color: colors.gray.second }
                            ]}
                        >
                            Não
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        disabled={name.length <= 0}
                        onPress={() => onPress('add')}
                    >
                        <Text
                            allowFontScaling={false}
                            style={[
                                styles.noAction,
                                name.length <= 0 && {
                                    color: colors.gray.second,
                                    opacity: 0.5
                                }
                            ]}
                        >
                            Adicionar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 11,
        backgroundColor: colors.white,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10
    },
    iconContainer: {
        marginBottom: 31,
        height: 115,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11
    },
    icon: {
        width: 78,
        height: 43
    },
    title: {
        fontSize: 22,
        fontFamily: 'Roboto-Bold',
        marginBottom: 30,
        textAlign: 'center',
        color: colors.text.smsModel
    },
    text: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginBottom: 30,
        textAlign: 'center',
        color: colors.text.smsModel,
        lineHeight: 20,
        marginRight: 27,
        marginLeft: 22,
        marginTop: 40
    },
    noActionContainer: {
        borderTopColor: colors.gray.seventh,
        borderTopWidth: 1,
        height: 53,
        flexDirection: 'row'
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center'
    },
    noAction: {
        fontSize: 19,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        color: colors.blue.second
    }
});

export default React.memo(AddRechargeContactModal);
