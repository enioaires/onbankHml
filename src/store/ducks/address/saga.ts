import { all, takeLatest, put, select } from 'redux-saga/effects';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    ADD_ADDRESS,
    CHANGE_ADD_ADDRESS_PAYLOAD,
    GET_ADDRESS_BY_ZIPCODE,
    IAddAddressPayload
} from './types';

// Actions
import {
    didRequestAddAddressFailAction,
    didRequestAddAddressSucceedAction,
    validateAddAddressPayloadAction,
    changeAddAddressPayloadAction,
    clearAddAddressPayloadAction,
    ChangeAddAddressPayloadAction,
    AddAddressAction,
    GetAddressByZipcodeAction
} from './actions';
import { onGetUserData } from '../userData/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestAddAddress = (payload: any) => {
    return api.post('/address/billing', payload);
};

const requestAddressByZipcode = (zipcode: string) => {
    return api.get(`/cep/${zipcode}`);
};

function* validateInputs(action: ChangeAddAddressPayloadAction) {
    let message = '';

    switch (action.payload.key) {
        case 'postalCode':
            if (
                action.payload.value.replace(/\D/g, '').length === 8 &&
                !isValidCEP(action.payload.value)
            ) {
                message = '* Insira um CEP válido.';
            }
            break;
        case 'state':
            if (action.payload.value.length < 2) {
                message = '* Insira uma UF válida.';
            }
            break;
        default:
            break;
    }

    yield put(
        validateAddAddressPayloadAction({
            key: action.payload.key,
            value: message
        })
    );
}

// function* getAddressByZipcode(action: GetAddressByZipcodeAction) {
//     const zipcode: string = yield select(
//         (state: IApplicationState) => state.address.payload.postalCode
//     );
//     const blockedInputs: string[] = [];

//     try {
//         const resp = yield call(() => requestAddressByZipcode(zipcode));

//         if (resp.ok) {
//             if (resp.address) {
//                 yield put(
//                     changeAddAddressPayloadAction({
//                         key: 'street',
//                         value: resp.address
//                     })
//                 );
//             }
//             if (resp.district) {
//                 yield put(
//                     changeAddAddressPayloadAction({
//                         key: 'neighborhood',
//                         value: resp.district
//                     })
//                 );
//                 blockedInputs.push('neighborhood');
//             }
//             if (resp.city) {
//                 yield put(
//                     changeAddAddressPayloadAction({
//                         key: 'city',
//                         value: resp.city
//                     })
//                 );
//                 blockedInputs.push('city');
//             }
//             if (resp.state) {
//                 yield put(
//                     changeAddAddressPayloadAction({
//                         key: 'state',
//                         value: resp.state
//                     })
//                 );
//                 blockedInputs.push('state');
//             }
//         } else {
//             yield put(clearAddAddressPayloadAction());
//             yield put(
//                 changeAddAddressPayloadAction({
//                     key: 'postalCode',
//                     value: zipcode
//                 })
//             );
//         }

//         yield put(didRequestAddAddressSucceedAction(zipcode, blockedInputs));

//         action.navigation.push('AddAddress', { screen: 'Address' });
//     } catch (err) {
//         // err
//     }
// }

// function* saveAddress(action: AddAddressAction) {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const taxId = yield select(
//         (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
//     );
//     const phone = yield select(
//         (state: IApplicationState) =>
//             state.user.data.client.mobilePhone.phoneNumber
//     );
//     const name = yield select(
//         (state: IApplicationState) => state.user.data.client.name
//     );
//     const email = yield select(
//         (state: IApplicationState) => state.user.data.client.email
//     );
//     const addressPayload = yield select(
//         (state: IApplicationState) => state.address.payload
//     );

//     const payload = {
//         ...addressPayload,
//         postalCode: parseInt(addressPayload.postalCode.replace(/\D/g, ''), 10),
//         accountId,
//         taxId,
//         name,
//         phone,
//         email
//     };

//     try {
//         const resp = yield call(() => requestAddAddress(payload));

//         if (resp.error || resp.statusCode === 500) {
//             if (resp.statusCode === 403) {
//                 yield new Promise((resolve) => {
//                     Alert.alert('Atenção', 'Entre em sua conta novamente', [
//                         { text: 'OK', onPress: resolve }
//                     ]);
//                 });
//                 yield put(removeTokenAction());
//                 return;
//             }
//             if (resp.statusCode === 500) {
//                 throw new Error(
//                     'Ocorreu um problema. Tente novamente mais tarde.'
//                 );
//             }
//             throw new Error(resp.message);
//         }

//         yield put(didRequestAddAddressSucceedAction('', []));

//         yield put(onGetUserData());

//         action.navigation.reset({
//             index: 0,
//             routes: [{ name: 'General' }, { name: 'Deposit' }]
//         });

//         action.navigation.push('Deposit', {
//             screen: 'Value',
//             params: { method: 'billet' }
//         });
//     } catch (err) {
//         yield put(didRequestAddAddressFailAction());
//         Alert.alert('Cadastrar Endereço', err.message);
//     }
// }

function* getAddressByZipcode(action: GetAddressByZipcodeAction) {
    const zipcode: string = yield select(
        (state: IApplicationState) => state.address.payload.postalCode
    );
    const blockedInputs: string[] = [];

    const resp: any = yield callWrapperService(
        requestAddressByZipcode,
        zipcode
    );

    // console.log('getAddress', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        if (resp.data.ok) {
            if (resp.data.address) {
                yield put(
                    changeAddAddressPayloadAction({
                        key: 'street',
                        value: resp.data.address
                    })
                );
            }
            if (resp.data.district) {
                yield put(
                    changeAddAddressPayloadAction({
                        key: 'neighborhood',
                        value: resp.data.district
                    })
                );
                blockedInputs.push('neighborhood');
            }
            if (resp.data.city) {
                yield put(
                    changeAddAddressPayloadAction({
                        key: 'city',
                        value: resp.data.city
                    })
                );
                blockedInputs.push('city');
            }
            if (resp.data.state) {
                yield put(
                    changeAddAddressPayloadAction({
                        key: 'state',
                        value: resp.data.state
                    })
                );
                blockedInputs.push('state');
            }
        } else {
            yield put(clearAddAddressPayloadAction());
            yield put(
                changeAddAddressPayloadAction({
                    key: 'postalCode',
                    value: zipcode
                })
            );
        }

        yield put(didRequestAddAddressSucceedAction(zipcode, blockedInputs));
        action.navigation.push('AddAddress', { screen: 'Address' });
    }
}

function* saveAddress(action: AddAddressAction) {
    const accountId: string | null = yield select(
        (state: IApplicationState) => state.auth.accountId
    );
    const taxId: string = yield select(
        (state: IApplicationState) => state.user.data.client.taxIdentifier.taxId
    );
    const phone: string = yield select(
        (state: IApplicationState) =>
            state.user.data.client.mobilePhone.phoneNumber
    );
    const name: string = yield select(
        (state: IApplicationState) => state.user.data.client.name
    );
    const email: string = yield select(
        (state: IApplicationState) => state.user.data.client.email
    );
    const addressPayload: IAddAddressPayload = yield select(
        (state: IApplicationState) => state.address.payload
    );

    const payload = {
        ...addressPayload,
        postalCode: parseInt(addressPayload.postalCode.replace(/\D/g, ''), 10),
        accountId,
        taxId,
        name,
        phone,
        email
    };

    const resp: any = yield callWrapperService(requestAddAddress, payload);

    // console.log('saveAddress', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(didRequestAddAddressSucceedAction('', []));

        yield put(onGetUserData());

        action.navigation.reset({
            index: 0,
            routes: [{ name: 'General' }, { name: 'Deposit' }]
        });

        action.navigation.push('Deposit', {
            screen: 'Value',
            params: { method: 'billet' }
        });
    } else {
        yield put(didRequestAddAddressFailAction());
    }
}

export default all([
    takeLatest(ADD_ADDRESS, saveAddress),
    takeLatest(CHANGE_ADD_ADDRESS_PAYLOAD, validateInputs),
    takeLatest(GET_ADDRESS_BY_ZIPCODE, getAddressByZipcode)
]);
