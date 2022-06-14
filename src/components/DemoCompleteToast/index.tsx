import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    Platform
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import IdwallSdk from '@idwall/react-native-idwall-sdk';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import Modal from 'react-native-modal';
import api from '../../api';

// Store
import {
    completeDemoSignupAction,
    demoValidateAction
} from '../../store/ducks/signUp/actions';
import { setAlertMessageAction } from '../../store/ducks/alert/actions';

// Styles
import colors from '../../styles/colors';

// Types
import { IApplicationState } from '../../store/types';

interface IDemoCompleteToastProps extends TouchableOpacityProps { }

const DemoCompleteToast: React.FC<IDemoCompleteToastProps> = (props) => {
    const dispatch = useDispatch();
    const taxId = useSelector(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );
    const demoValidationLoading = useSelector(
        (state: IApplicationState) => state.signUp.isLoading
    );
    const [showAlert, setShowAlert] = useState(false)

    const sendIOSUserNewAccount = async () => {
        try {
            const resp = await api.get('/validate/account');
        } catch (e) {
            console.log(e);
        }
    }

    const initiateKYCFlow = () => {
        IdwallSdk.initialize('3cb30ce77c16f00436ed732539942778');

        if (IdwallSdk.ios) {
            IdwallSdk.ios.setupPublicKeys([
                'AHYMQP+2/KIo32qYcfqnmSn+N/K3IdSZWlqa2Zan9eY=',
                'tDilFQ4366PMdAmN/kyNiBQy24YHjuDs6Qsa6Oc/4c8='
            ]);
        }

        IdwallSdk.startCompleteFlow('CHOOSE')
            .then((token: any) => {
                Pushwoosh.getHwid((hwid: string) => {
                    dispatch(completeDemoSignupAction(hwid, token));
                });
            })
            .catch((error: any) => {
                if (!error.message.match(/[canceled|cancelled] by user/g)) {
                    dispatch(
                        setAlertMessageAction({
                            title: 'Oops',
                            message:
                                'Algo inesperado ocorreu...Tente novamente',
                            type: 'error'
                        })
                    );
                }
            });
    };

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                {...props}
                onPress={() => {
                    if (Platform.OS === 'ios') {
                        setShowAlert(true)
                        sendIOSUserNewAccount()
                        return;
                    }
                    dispatch(demoValidateAction(taxId, initiateKYCFlow));
                }}
                disabled={demoValidationLoading}
            >
                <View style={styles.row}>
                    <AntIcon name="warning" color={colors.white} size={22} />
                    <Text style={styles.text}>Complete sua conta!</Text>
                </View>
                <EntypoIcon name="forward" color={colors.white} size={20} />
            </TouchableOpacity>
            <Modal
                isVisible={showAlert}
                onBackdropPress={() => setShowAlert(false)}
                hasBackdrop
                backdropColor="#000"
                backdropOpacity={0.4}
                avoidKeyboard
                animationInTiming={800}
                animationOutTiming={800}

            >
                <View style={styles.containerModal}>
                    <Text style={styles.textModal}>Olá, estamos em atualização, para completar a conta, aguarde um momento  nosso suporte entrará em contato com você</Text>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue.second,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15
    },
    containerModal: {
        borderRadius: 11,
        backgroundColor: colors.white,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.16,
        elevation: 4,
        shadowRadius: 10,
        height: 150,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: colors.white,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        marginLeft: 10
    },
    textModal: {
        fontSize: 15,
        color: colors.blue.primary,
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 20
    }
});

export default DemoCompleteToast;