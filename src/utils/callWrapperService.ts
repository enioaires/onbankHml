import { call, delay, put, select } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';

import api from '../api';

// Store
import { IApplicationState } from '../store/types';
import { setAlertMessageAction } from '../store/ducks/alert/actions';
import { expireSessionAction } from '../store/ducks/session/actions';
import { revalidateUserAction } from '../store/ducks/auth/actions';

// Utils
// import * as NavigationService from './navigationService';

function* callWrapperService(fn: any, ...args: any[]): Generator {
    const isDemoAccount: boolean | unknown = yield select(
        (state: IApplicationState) => state.user.data.client.isDemo
    );

    try {
        const resp: any = yield call(fn, ...args);

        console.log(`wrapper ${fn}`, JSON.stringify(resp, null, 2));

        if (!resp) throw new Error('Verifique sua conexão de internet.');

        if (resp.statusCode === 500) throw new Error('');

        if (
            resp.message &&
            resp.message.match(/Esse tipo de conta não permite essa operação/g)
        )
            throw new Error('Esse tipo de conta não permite essa operação');

        if (resp.statusCode === 403 || resp.statusCode === 401) {
            const isRevalidate = resp.message.match(/Token expirado./g);

            yield delay(500);

            if (isRevalidate) yield put(revalidateUserAction());
            yield put(
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

        if (resp.message) throw new Error(resp.message);

        if (resp.jwt) {
            api.setHeader('Authorization', `Bearer ${resp.jwt}`);
            yield put(expireSessionAction());
        }

        return resp;
    } catch (error) {
        console.log('ERROR', error);
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

        yield put(
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

        return undefined;
    }
}

export default callWrapperService;
