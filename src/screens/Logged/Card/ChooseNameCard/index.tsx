import React, { useEffect, useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components
import ActionButton from '../../../../components/ActionButton';
import CreditCard from '../../../../components/CreditCard';
import RequestCardModal from '../../../../containers/RequestCardModal';

// Store
import { IApplicationState } from '../../../../store/types';

import {
    closeRegisterCardBizModalAction,
    registerCardSecondViaAction,
    registerCardBizAction,
    showRegisterCardBizModalAction
} from '../../../../store/ducks/card/actions';

// Styles
import colors from '../../../../styles/colors';
import { paddings } from '../../../../styles/paddings';

// Utils
import useIsKeyboardActive from '../../../../utils/useIsKeyboardActive';

// Navigation Type
import { CardStackNavigationProps } from '../../../../routes/Logged/types';

const ChooseNameCardScreen: React.FC<CardStackNavigationProps<'ChooseNameCard'>> = ({
    navigation
}: CardStackNavigationProps<'ChooseNameCard'>) => {
    const dispatch = useDispatch();

    const userName = useSelector((state: IApplicationState) => state.user.data.client.name);
    const cardBiz = useSelector((state: IApplicationState) => state.user.data.client.cardBiz);
    const registerCardBizModal = useSelector((state: IApplicationState) => state.card.isRegisterModalOpen);
    const requestCardBizLoading = useSelector(
        (state: IApplicationState) => state.card.loading
    );

    const finalName = `${userName.split(' ')[0]} ${userName.split(' ')[userName.split(' ').length - 1]}`
    const [name, setName] = useState(finalName);

    const { isKeyboardActive } = useIsKeyboardActive();

    const onContinue = () => {
        dispatch(showRegisterCardBizModalAction());
    };

    return (
        <View style={styles.container}>
            <RequestCardModal
                isSecondVia={cardBiz === 'CANCELADO'}
                isVisible={registerCardBizModal}
                setIsVisible={() => dispatch(closeRegisterCardBizModalAction())}
                requestAction={
                    cardBiz === 'CANCELADO'
                        ? () => {
                              dispatch(closeRegisterCardBizModalAction());
                              dispatch(
                                  registerCardSecondViaAction(navigation, name)
                              );
                          }
                        : () => {
                              dispatch(closeRegisterCardBizModalAction());
                              dispatch(registerCardBizAction(navigation, name));
                          }
                }
                requestLoading={requestCardBizLoading}
            />
            <KeyboardAvoidingView
                behavior="padding"
                style={[{ flex: 1 }, isKeyboardActive && { marginBottom: 15 }]}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        {/* <Text allowFontScaling={false} style={styles.title}>
                            Digite o nome que aparecerá {'\n'}
                            impresso no seu cartão
                        </Text> */}
                        <CreditCard
                            noCopy
                            isOnbank
                            inputMode
                            inputModeCardData={{
                                cardNumber: '',
                                cardType: 'visa',
                                nameOnCard: name,
                                cvv: '***',
                                expirationDate: '00/00',
                                // inputModeChangeText: setName
                            }}
                        />
                        {/* <Text allowFontScaling={false} style={styles.validation}>* Insira um CPF válido</Text> */}
                        {/* <TextInput
                            style={styles.input}
                            autoFocus
                            autoCapitalize="characters"
                            keyboardType="default"
                            maxLength={19}
                            value={name}
                            onChangeText={(_,value) => setName(value)}
                        /> */}
                    </View>
                    <ActionButton
                        label="Continuar"
                        disabled={name.length <= 0}
                        isLoading={requestCardBizLoading}
                        onPress={onContinue}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChooseNameCardScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container,
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 24,
        color: colors.text.second,
        marginBottom: 27,
        textAlignVertical: 'center'
    },
    /* input: {
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 0,
        fontSize: 22,
        marginBottom: 10,
        display: 'none',
        height: 0
    }, */
    validation: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: colors.text.invalid
    }
});
