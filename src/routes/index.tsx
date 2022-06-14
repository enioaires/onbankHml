import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    AppStateStatus,
    DeviceEventEmitter,
    Linking,
    Platform,
    AppState,
    View,
    Text,
    SafeAreaView,
    PermissionsAndroid,
    Alert
} from 'react-native';
import {
    NavigationContainer,
    NavigationContainerRef,
    useLinking
} from '@react-navigation/native';
import PushwooshGeozones from 'pushwoosh-geozones-react-native-plugin';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import numeral from 'numeral';
import 'numeral/locales';
import { getUniqueId } from 'react-native-device-info';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import checkVersion from 'react-native-store-version';
import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';

// Components
import ActionButton from '../components/ActionButton';
import Logged from './Logged';
import Auth from './Auth';
import AutoLogin from '../screens/AutoLogin';
import InfoModal from '../containers/InfoModal';

// Store
import api from '../api';
import { IApplicationState } from '../store/types';
import {
    saveDeviceUUIDAction,
    saveAuthenticationTypeAction,
    saveKeychainCredentialsAction
} from '../store/ducks/auth/actions';
import { requestBalanceAction } from '../store/ducks/balance/actions';
import { setAlertMessageAction } from '../store/ducks/alert/actions';

// Style
import colors from '../styles/colors';

// Utils
import { APP_VERSION } from '../utils/variables';
// import { navigationRef } from '../utils/navigationService';

numeral.locale('pt-BR');

export default function MainStack() {
    const navRef = useRef<NavigationContainerRef>(null);
    const dispatch = useDispatch();

    const appState = useRef(AppState.currentState);

    // const isAuth = useSelector(
    //     (state: IApplicationState) => !!state.auth.token
    // );
    const revalidated = useSelector(
        (state: IApplicationState) => state.auth.revalidated
    );
    const didAutoLogin = useSelector(
        (state: IApplicationState) => state.auth.didAutoLogin
    );
    const connectionError = useSelector(
        (state: IApplicationState) => state.auth.connectionError
    );

    const checkVersionStore = async () => {
        const os = Platform.OS;
        const osUrl =
            os === 'android'
                ? 'https://play.google.com/store/apps/details?id=br.com.onbank.mobile&hl=pt&gl=BR'
                : 'https://apps.apple.com/br/app/onbank/id1509548331';
        try {
            const check = await checkVersion({
                version: APP_VERSION, // app local version
                iosStoreURL:
                    'https://apps.apple.com/br/app/onbank/id1509548331',
                androidStoreURL:
                    'https://play.google.com/store/apps/details?id=br.com.onbank.mobile&hl=pt&gl=BR',
                country: 'br' // default value is 'jp'
            });

            // console.log(check);

            if (check.result === 'new') {
                // if app store version is new
                dispatch(
                    setAlertMessageAction({
                        title: 'Atualização disponível!',
                        message: `Existe uma versão mais atualizada disponível na ${
                            os === 'ios' ? 'Apple Store' : 'Play Store'
                        }.`,
                        action: {
                            onPress: () => {
                                Linking.openURL(osUrl);
                            },
                            mainLabel: 'Atualizar'
                        },
                        type: 'info'
                    })
                );
            }
        } catch (e) {
            // console.log(e);
        }
    };

    const verifyTouchIDSuport = async () => {
        TouchID.isSupported()
            .then((biometryType: any) => {
                dispatch(
                    saveAuthenticationTypeAction(
                        biometryType === true ? 'TouchID' : biometryType
                    )
                );
            })
            .catch(() => {
                // Alert.alert(
                //     'Entrar',
                //     err.message || 'Algo de errado aconteceu...'
                // );
            });
    };

    const getCredentials = async () => {
        const res = await Keychain.getGenericPassword({
            service: 'br.com.onbank.mobile-keychain'
        });
        if (res && res.password?.length > 0 && res.username?.length > 0) {
            dispatch(saveKeychainCredentialsAction(res));
        }
    };

    const { getInitialState } = useLinking(navRef, {
        prefixes: ['onbank://', 'onbank://onbank/'],
        config: {
            ResetPassword: {
                screens: {
                    NewPassword: 'recuperar-senha/:token'
                }
            },
            SignUp: {
                screens: {
                    PromoCode: 'cadastro/:promocode'
                }
            }
        }
    });

    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState<any>();

    const initializeState = () => {
        Promise.race([
            getInitialState(),
            new Promise((resolve) =>
                // Timeout in 150ms if `getInitialState` doesn't resolve
                // Workaround for https://github.com/facebook/react-native/issues/25675
                setTimeout(resolve, 150)
            )
        ])
            .catch((e) => {
                console.error(e);
            })
            .then((state) => {
                // console.log('state', state);
                if (state !== undefined) {
                    setInitialState(state);
                }

                setIsReady(true);
            });
    };

    const askPermissionsForBackgroundLocation = async () => {
        if (Platform.OS === 'android') {
            try {
                const fine = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                const coarse = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                );
                const background = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
                );
                if (!fine && !coarse && !background) {
                    await new Promise((resolve, reject) => {
                        Alert.alert(
                            'Onbank gostaria de acessar sua localização em segundo plano',
                            'Para melhorarmos nosso atendimento através do envio de notificações é importante que autorize a permissão de localização solicitada a seguir.',
                            [{ text: 'Ok', onPress: resolve }]
                        );
                    });
                }
                PushwooshGeozones.startLocationTracking();
            } catch {}
        } else {
            PushwooshGeozones.startLocationTracking();
        }
    };

    const didMount = () => {
        const deviceId = getUniqueId();

        dispatch(saveDeviceUUIDAction(deviceId));
        api.setHeader('DeviceId', deviceId);

        verifyTouchIDSuport();
        getCredentials();
        initializeState();
        askPermissionsForBackgroundLocation();
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    };

    // this event is fired when the push is received in the app
    DeviceEventEmitter.addListener('pushReceived', (e: any) => {
        // Alert.alert('Push Teste', `pushReceived: ${JSON.stringify(e)}`);
        /* if (e.title || (e.aps && e.aps.alert)) {
            showMessage({
                message: 'Notificação',
                description: e.title || e.aps.alert || '',
                backgroundColor: colors.blue.second,
                icon: 'info',
                duration: 3000
            });
            if (
                (e.title && e.title.match(/Transferência|Depósito/g)) ||
                (e.aps.alert && e.aps.alert.match(/Transferência|Depósito/g))
            ) {
                dispatch(requestBalanceAction());
            }
        } */
        if (e.title) {
            showMessage({
                message: 'Notificação',
                description: e.title || e.aps.alert || '',
                backgroundColor: colors.blue.second,
                icon: 'info',
                duration: 3000
            });
            if (e.title && e.title.match(/Transferência|Depósito/g)) {
                dispatch(requestBalanceAction());
            }
        }
        // shows a push is received. Implement passive reaction to a push, such as UI update or data download.
    });

    // this event is fired when user clicks on notification
    // DeviceEventEmitter.addListener('pushOpened', (e: Event) => {
    //     console.warn(`pushOpened: ${JSON.stringify(e)}`);
    //     // shows a user tapped the notification. Implement user interaction, such as showing push details
    // });

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            checkVersionStore();
        }

        appState.current = nextAppState;
    };

    useEffect(didMount, []);

    // console.disableYellowBox = true;

    if (!isReady) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <NavigationContainer initialState={initialState} ref={navRef}>
            {connectionError && revalidated && (
                <SafeAreaView style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: '15%',
                            paddingHorizontal: 20
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                color: colors.text.second,
                                fontFamily: 'Roboto-Regular'
                            }}
                        >
                            Ocorreu um problema
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                marginTop: 20,
                                color: colors.text.smsModel,
                                fontFamily: 'Roboto-Regular'
                            }}
                        >
                            Não foi possível carregar as informações. Verifique
                            se está conectado à internet e tente novamente.
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingBottom: 40
                            }}
                        >
                            <ActionButton
                                onPress={() => codePush.restartApp()}
                                label="Atualizar"
                            />
                        </View>
                    </View>
                </SafeAreaView>
            )}
            {revalidated && !connectionError && <Logged navRef={navRef} />}
            {!revalidated && !didAutoLogin && !connectionError && <AutoLogin />}
            {!revalidated && didAutoLogin && <Auth navRef={navRef} />}
            <InfoModal navRef={navRef} />
        </NavigationContainer>
    );
}
