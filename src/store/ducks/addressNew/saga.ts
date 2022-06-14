import { all, takeLatest, call, put } from 'redux-saga/effects';

// Api
import api from '../../../api';

// Types
import { AddressTypes, IAddressPayload } from './types';

// Actions
import {
    didGetAddresByZipcodeFailAction,
    didGetAddresByZipcodeSucceedAction
} from './actions';

const requestAddressByZipcode = (zipcode: string) => {
    return api.get(`/cep/${zipcode}`);
};

function* getAddressByZipcode(action: any) {
    const blockedInputs: string[] = [];
    let address: IAddressPayload = {
        state: '',
        street: '',
        city: '',
        complement: '',
        country: 'BRA',
        postalCode: action.zipcode,
        neighborhood: '',
        number: ''
    };

    try {
        const resp = yield call(() => requestAddressByZipcode(action.zipcode));

        if (resp.ok) {
            if (resp.address) {
                address = {
                    ...address,
                    street: resp.address
                };
            }
            if (resp.district) {
                address = {
                    ...address,
                    neighborhood: resp.district
                };
                blockedInputs.push('neighborhood');
            }
            if (resp.city) {
                address = {
                    ...address,
                    city: resp.city
                };
                blockedInputs.push('city');
            }
            if (resp.state) {
                address = {
                    ...address,
                    state: resp.state
                };
                blockedInputs.push('state');
            }
        }

        yield put(
            didGetAddresByZipcodeSucceedAction(
                action.zipcode,
                blockedInputs,
                address
            )
        );

        if (action.feature === 'signUp')
            action.navigation.push('SignUp', { screen: 'Address' });
        if (action.feature === 'perfil')
            action.navigation.push('Perfil', { screen: 'Address' });
        if (action.feature === 'deposit')
            action.navigation.push('AddAddress', { screen: 'Address' });
        if (action.feature === 'wallet')
            action.navigation.push('Wallet', { screen: 'Address' });
    } catch (err) {
        yield put(didGetAddresByZipcodeFailAction());
    }
}

export default all([
    takeLatest(AddressTypes.GET_ADDRESS_BY_ZIPCODE, getAddressByZipcode)
]);
