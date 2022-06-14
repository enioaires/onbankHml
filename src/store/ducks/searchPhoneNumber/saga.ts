import { all, takeLatest, put, call, select } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import { REQUEST_SEARCH_PHONE_NUMBER } from './types';
import { ISignUpState } from '../signUp/types';

// Actions
import {
    didSearchPhoneNumberFailAction,
    didSearchPhoneNumberSucceedAction,
    RequestSearchPhoneNumberAction
} from './actions';
import { validateSignUpInputsAction } from '../signUp/actions';
import { sendSMSAction } from '../phoneValidation/actions';

const requestSearchPhoneNumber = (phoneNumber: string) => {
    const unmasked = phoneNumber.replace(/\D/g, '');
    return api.get(`/verify/client/phone/${unmasked}`);
};

function* searchPhoneNumber(action: RequestSearchPhoneNumberAction) {
    const phoneValidationState = yield select(
        (state: IApplicationState) => state.phoneValidation
    );
    const signUpState: ISignUpState = yield select(
        (state: IApplicationState) => state.signUp
    );

    const accountId = yield select(
        (state: IApplicationState) => state.signUp.payload.accountId
    );

    try {
        const resp = yield call(() =>
            requestSearchPhoneNumber(action.phoneNumber)
        );

        let isClient = false;
        if (resp.error || resp.statusCode === 500) {
            if (resp.statusCode === 500) {
                throw new Error(
                    'Ocorreu um problema. Tente novamente mais tarde.'
                );
            }
            if (
                resp.message ===
                'Conflito de dados encontrado, entre com contato com nosso suporte!'
            ) {
                isClient = true;
            } else {
                throw new Error(resp.message || 'Algo de errado aconteceu...');
            }
        }

        if (resp?.data) {
            if (resp.data.isClient) {
                isClient = true;
            }
        }
        if (isClient) {
            yield put(
                validateSignUpInputsAction({
                    key: 'phone',
                    value: '* Telefone já cadastrado.'
                })
            );
        } else if (
            phoneValidationState.registerPhone !== signUpState.payload.phone
        ) {
            if (action.routeContext) {
                action.navigation.push('CreateAccount', { screen: 'Email' });
                yield put(didSearchPhoneNumberSucceedAction());
                return;
            }
            yield put(
                sendSMSAction(
                    false,
                    action.navigation,
                    undefined,
                    undefined,
                    action.routeContext
                )
            );
        } else {
            action.navigation.push('SignUp', {
                screen: accountId ? 'Password' : 'Email'
            });
        }

        yield put(didSearchPhoneNumberSucceedAction());
    } catch (err) {
        yield put(didSearchPhoneNumberFailAction());
    }
}

export default all([
    takeLatest(REQUEST_SEARCH_PHONE_NUMBER, searchPhoneNumber)
]);
