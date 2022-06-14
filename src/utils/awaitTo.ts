/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
import * as Sentry from '@sentry/react-native';

import api from '../api';
import store from '../store';
import { setAlertMessageAction } from '../store/ducks/alert/actions';
import { revalidateUserAction } from '../store/ducks/auth/actions';
import { expireSessionAction } from '../store/ducks/session/actions';

interface ServerResponse {
    data: any;
    error: any;
    message: string;
}

const isDemoAccount = store.getState().user.data.client.isDemo;

export function to<T = ServerResponse, U = Error>(
    promise: Promise<T>,
    errorExt?: object,
    hideAlertOnError?: boolean
): Promise<any> {
    return promise
        .then<[null, T]>((data: any) => {
            try {
                if (!data) {
                    throw new Error('Verifique sua conexão de internet.');
                }
                if (data.statusCode === 500) throw new Error('');

                if (
                    data.message &&
                    data.message.match(
                        /Esse tipo de conta não permite essa operação/g
                    )
                )
                    throw new Error(
                        'Esse tipo de conta não permite essa operação'
                    );

                if (data.statusCode === 403 || data.statusCode === 401) {
                    const isRevalidate = data.message.match(/Token expirado./g);

                    if (isRevalidate) store.dispatch(revalidateUserAction());
                    store.dispatch(
                        setAlertMessageAction({
                            title: 'Atenção',
                            message: isRevalidate
                                ? 'Sua sessão expirou!\nEntre em sua conta novamente.'
                                : 'Entre em sua conta novamente.',
                            type: 'error',
                            logout: !isRevalidate
                        })
                    );
                    return undefined;
                }

                if (data.message) throw new Error(data.message);

                if (data.jwt) {
                    api.setHeader('Authorization', `Bearer ${data.jwt}`);
                    store.dispatch(expireSessionAction());
                }

                return [null, data];
            } catch (error: any) {
                if (hideAlertOnError) {
                    return [{ error: true, message: error.message }, undefined];
                }
                const isDemoAccountLimitation = error.message.match(
                    /Esse tipo de conta não permite essa operação/g
                );

                if (!isDemoAccountLimitation) {
                    Sentry.captureException(error);
                }

                const demoLimitationMessage = isDemoAccount
                    ? 'A conta demonstrativa possui algumas limitações para realizar as principais operações. Complete a sua conta agora mesmo e aproveite sua conta On ilimitada!'
                    : 'A conta destino é uma conta demonstrativa e por isso possui algumas limitações de uso.';

                const message = isDemoAccountLimitation
                    ? demoLimitationMessage
                    : error.message ||
                      'Ocorreu um prolema.\nTente novamente mais tarde.';
                store.dispatch(
                    setAlertMessageAction({
                        type: 'error',
                        title:
                            isDemoAccountLimitation && isDemoAccount
                                ? 'Conta Demonstrativa'
                                : 'Oops',
                        message,
                        action:
                            isDemoAccountLimitation && isDemoAccount
                                ? {
                                      mainLabel: 'Completar conta',
                                      onPress: () => {},
                                      secondLabel: 'Agora não',
                                      secondOnPress: () => {}
                                  }
                                : undefined
                    })
                );

                return [{ error: true, message: error.message }, undefined];
            }
        })
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                Object.assign(err, errorExt);
            }
            console.log('CATCH', err);
            return [err, undefined];
        });
}

export default to;
