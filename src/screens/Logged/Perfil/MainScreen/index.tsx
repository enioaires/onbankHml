import React, { useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    Alert
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// Components
import AddTransactionPasswordModal from '../../../../containers/AddTransactionPasswordModal';

// Store
import {
    removeTokenAction,
    removeKeychainCredentialsAction
} from '../../../../store/ducks/auth/actions';
import { IApplicationState } from '../../../../store/types';

// Styles
import { paddings } from '../../../../styles/paddings';
import colors from '../../../../styles/colors';

// Utils
import { APP_VERSION } from '../../../../utils/variables';
import { getNameInitials } from '../../../../utils/helpers';
import { maskPhoneNumber } from '../../../../utils/prettiers';

// Navigation Type
import { PerfilStackNavigationProps } from '../../../../routes/Logged/types';

const forwardIcon = require('../../../../../assets/icons/forward.png');
const forwardDownIcon = require('../../../../../assets/icons/forward-down.png');

const SettingsScreen: React.FC<PerfilStackNavigationProps<'Main'>> = ({
    navigation
}: PerfilStackNavigationProps<'Main'>) => {
    const dispatch = useDispatch();
    const userData = useSelector(
        (state: IApplicationState) => state.user.data,
        shallowEqual
    );
    const {
        client,
        clientType,
        account,
        billingAddress,
        additionalDetailsCorporate
    } = userData;
    const { name, email, hasKeys, cardBiz } = client;
    const {
        branch,
        mobilePhone: { phoneNumber }
    } = account;
    const authData = useSelector(
        (state: IApplicationState) => state.auth,
        shallowEqual
    );
    const { keychainCredentials, authenticationType } = authData;

    const isPJ = clientType === 'CORPORATE';

    const passwordsDropdown = useRef(new Animated.Value(0)).current;
    // const documentsDropdown = useRef(new Animated.Value(0)).current;

    const [passwordIsOpen, setPasswordIsOpen] = useState(false);
    // const [documentsIsOpen, setDocumentsIsOpen] = useState(false);
    const [registerKeys, setRegisterKeys] = useState(false);

    const logout = () => {
        dispatch(removeTokenAction());
    };

    const onDisableTouchOrFaceIdPress = () => {
        if (keychainCredentials) {
            Alert.alert(
                `Desabilitar ${authenticationType}`,
                `Deseja desabilitar o ${authenticationType} ?`,
                [
                    {
                        text: 'Sim',
                        onPress: disableTouchOrFaceId
                    },
                    {
                        text: 'Não',
                        onPress: () => null
                    }
                ]
            );
        } else {
            Alert.alert(
                `Habilitar ${authenticationType}`,
                `Deseja habilitar o ${authenticationType}?`,
                [
                    {
                        text: 'Sim',
                        onPress: () =>
                            navigation.push('Perfil', {
                                screen: 'ValidateAccess',
                                params: {
                                    registerKey: true
                                }
                            })
                    },
                    {
                        text: 'Não',
                        onPress: () => null
                    }
                ]
            );
        }
    };

    const disableTouchOrFaceId = async () => {
        const res = await Keychain.resetGenericPassword({
            service: 'br.com.onbank.mobile-keychain'
        });
        dispatch(removeKeychainCredentialsAction());
        if (res) {
            Alert.alert(
                `Desabilitar ${authenticationType}`,
                `O ${authenticationType} foi desabilitado.`
            );
        }
    };

    const togglePasswords = () => {
        Animated.timing(passwordsDropdown, {
            toValue: passwordIsOpen ? 0 : 140,
            delay: 200,
            useNativeDriver: false
        }).start();
        setPasswordIsOpen((oldstate: boolean) => !oldstate);
    };

    // const toggleDocuments = () => {
    //     Animated.timing(documentsDropdown, {
    //         toValue: documentsIsOpen ? 0 : 140,
    //         delay: 200,
    //         useNativeDriver: false
    //     }).start();
    //     setDocumentsIsOpen((oldstate: boolean) => !oldstate);
    // };

    return (
        <>
            <AddTransactionPasswordModal
                navigation={navigation}
                showAlert={registerKeys}
                closeAlert={() => setRegisterKeys(false)}
            />
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.top}>
                        <View style={styles.initialsBox}>
                            <Text
                                allowFontScaling={false}
                                style={styles.initials}
                            >
                                {getNameInitials(
                                    isPJ
                                        ? additionalDetailsCorporate?.companyName!
                                        : name
                                )}
                            </Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.name}>
                            {isPJ
                                ? additionalDetailsCorporate?.companyName
                                : name}
                        </Text>
                        <View style={styles.accountInfo}>
                            <Text
                                allowFontScaling={false}
                                style={[styles.info, { marginRight: '10%' }]}
                            >
                                Agência: {`000${branch}`}
                            </Text>
                            <Text allowFontScaling={false} style={styles.info}>
                                Conta: {account.account}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            {/* {isDemo && (
                                <TouchableOpacity
                                    disabled={demoValidationLoading}
                                    style={[
                                        styles.itemContainer,
                                        { borderTopWidth: 0.7 },
                                        { borderBottomWidth: 0 }
                                    ]}
                                    onPress={() => {
                                        dispatch(
                                            demoValidateAction(
                                                taxId,
                                                initiateKYCFlow
                                            )
                                        );
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[styles.label]}
                                    >
                                        Completar cadastro
                                    </Text>
                                    {demoValidationLoading ? (
                                        <ActivityIndicator
                                            size="small"
                                            color={colors.blue.primary}
                                        />
                                    ) : (
                                        <Image
                                            source={forwardIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                        />
                                    )}
                                </TouchableOpacity>
                            )} */}
                            <TouchableOpacity
                                style={[
                                    styles.itemContainer,
                                    { borderTopWidth: 0.7 }
                                ]}
                                onPress={() =>
                                    navigation.push('Perfil', {
                                        screen: 'ChangePhone'
                                    })
                                }
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Telefone
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.value}
                                    >
                                        {maskPhoneNumber(phoneNumber)}
                                    </Text>
                                    <Image
                                        source={forwardIcon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.itemContainer]}
                                onPress={() =>
                                    navigation.push('Perfil', {
                                        screen: 'ChangeEmail'
                                    })
                                }
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    E-mail
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[styles.value, { width: '60%' }]}
                                        numberOfLines={1}
                                    >
                                        {email.toLowerCase()}
                                    </Text>
                                    <Image
                                        source={forwardIcon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() =>
                                    navigation.push('Perfil', {
                                        screen: 'ZipCode'
                                    })
                                }
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Endereço
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[styles.value, { width: '60%' }]}
                                        numberOfLines={1}
                                    >
                                        {billingAddress?.logradouro || ''}
                                    </Text>
                                    <Image
                                        source={forwardIcon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={togglePasswords}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Senhas
                                    </Text>
                                    <Image
                                        source={
                                            passwordIsOpen
                                                ? forwardDownIcon
                                                : forwardIcon
                                        }
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <Animated.View
                                    style={{
                                        height: passwordsDropdown,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Perfil', {
                                                screen: 'NewAccessPassword'
                                            });
                                        }}
                                        style={[
                                            styles.itemContainer,
                                            styles.secondItemContainer
                                        ]}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.label,
                                                styles.secondLabel
                                            ]}
                                        >
                                            Alterar senha de acesso
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!hasKeys) {
                                                setRegisterKeys(true);
                                            } else {
                                                navigation.push('Perfil', {
                                                    screen: 'NewTransactionPassword'
                                                });
                                            }
                                        }}
                                        style={[
                                            styles.itemContainer,
                                            styles.secondItemContainer
                                        ]}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.label,
                                                styles.secondLabel
                                            ]}
                                        >
                                            Alterar senha{' '}
                                            {cardBiz === 'ATIVADO'
                                                ? 'do cartão'
                                                : 'de transação'}
                                        </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            {/* <View>
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={toggleDocuments}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        Documentos
                                    </Text>
                                    <Image
                                        source={
                                            documentsIsOpen
                                                ? forwardDownIcon
                                                : forwardIcon
                                        }
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <Animated.View
                                    style={{
                                        height: documentsDropdown,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.itemContainer,
                                            styles.secondItemContainer
                                        ]}
                                        onPress={() => {
                                            if (hasCnh) {
                                                Alert.alert(
                                                    'Enviar RG ou CNH',
                                                    'A foto do seu documento já foi enviada. Deseja alterá-la?',
                                                    [
                                                        {
                                                            text: 'Não'
                                                        },
                                                        {
                                                            text: 'Sim',
                                                            onPress: () =>
                                                                navigation.push(
                                                                    'Perfil',
                                                                    {
                                                                        screen:
                                                                            'DocumentCamera'
                                                                    }
                                                                )
                                                        }
                                                    ]
                                                );
                                            } else {
                                                navigation.push('Perfil', {
                                                    screen: 'DocumentCamera'
                                                });
                                            }
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.label,
                                                styles.secondLabel
                                            ]}
                                        >
                                            Enviar RG ou CNH
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.value,
                                                !hasCnh && {
                                                    color: colors.text.invalid
                                                }
                                            ]}
                                        >
                                            {hasCnh ? 'Enviado' : 'Não enviado'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.itemContainer,
                                            styles.secondItemContainer
                                        ]}
                                        onPress={() => {
                                            if (hasSelfie) {
                                                Alert.alert(
                                                    'Enviar Selfie',
                                                    'A foto da sua selfie já foi enviada. Deseja alterá-la?',
                                                    [
                                                        {
                                                            text: 'Não'
                                                        },
                                                        {
                                                            text: 'Sim',
                                                            onPress: () =>
                                                                navigation.push(
                                                                    'Perfil',
                                                                    {
                                                                        screen:
                                                                            'SelfieCamera'
                                                                    }
                                                                )
                                                        }
                                                    ]
                                                );
                                            } else {
                                                navigation.push('Perfil', {
                                                    screen: 'SelfieCamera'
                                                });
                                            }
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.label,
                                                styles.secondLabel
                                            ]}
                                        >
                                            Enviar Selfie
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.value,
                                                !hasSelfie && {
                                                    color: colors.text.invalid
                                                }
                                            ]}
                                        >
                                            {hasSelfie
                                                ? 'Enviado'
                                                : 'Não enviado'}
                                        </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View> */}
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() =>
                                    navigation.push('Perfil', {
                                        screen: 'SignUpData'
                                    })
                                }
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Dados cadastrais
                                </Text>
                                <Image
                                    source={forwardIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => {
                                    navigation.push('UserHelp');
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Central de ajuda
                                </Text>
                                <Image
                                    source={forwardIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            {authenticationType && (
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={onDisableTouchOrFaceIdPress}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.label}
                                    >
                                        {authenticationType}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.value,
                                                !keychainCredentials && {
                                                    color: colors.text.invalid
                                                }
                                            ]}
                                        >
                                            {keychainCredentials
                                                ? 'Habilitado'
                                                : 'Desabilitado'}
                                        </Text>
                                        <Image
                                            source={forwardIcon}
                                            style={styles.icon}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={logout}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.label}
                                >
                                    Sair da conta
                                </Text>
                                <Image
                                    source={forwardIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.itemContainer]}
                                disabled
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.label, { opacity: 0.5 }]}
                                >
                                    Versão
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.label, { opacity: 0.5 }]}
                                >
                                    {`${APP_VERSION}12`}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
        </>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        ...paddings.container2,
        paddingRight: 0,
        paddingLeft: 0,
        flex: 1
    },
    safeArea: {
        flex: 1
    },
    top: {
        alignItems: 'center',
        marginBottom: 40
    },
    initialsBox: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue.second,
        marginBottom: 17
    },
    initials: {
        fontSize: 20,
        color: colors.white,
        fontFamily: 'Roboto-Medium'
    },
    name: {
        fontSize: 16,
        color: colors.text.second,
        fontFamily: 'Roboto-Bold',
        marginBottom: 10
    },
    accountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        fontSize: 16,
        color: colors.text.second,
        fontFamily: 'Roboto-Regular',
        opacity: 0.54
    },
    itemContainer: {
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: colors.text.third,
        borderBottomWidth: 0.7,
        paddingHorizontal: 25
    },
    label: {
        fontSize: 14,
        color: colors.text.second,
        fontFamily: 'Roboto-Bold'
    },
    value: {
        fontSize: 14,
        color: colors.blue.second,
        fontFamily: 'Roboto-Regular',
        marginRight: 35,
        textAlign: 'right'
    },
    icon: {
        width: 6,
        height: 8
    },
    secondItemContainer: {
        paddingHorizontal: 39,
        backgroundColor: colors.gray.fourth,
        opacity: 0.64
    },
    secondLabel: {
        fontFamily: 'Roboto-Regular',
        opacity: 0.64
    }
});
