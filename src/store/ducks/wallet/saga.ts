import { all, takeLatest, put, select } from 'redux-saga/effects';
import { isValidCPF, isValidCNPJ } from '@brazilian-utils/brazilian-utils';
import valid from 'card-validator';

// Api
import api from '../../../api';

// Types
import { IApplicationState } from '../../types';
import {
    GET_CARDS,
    REMOVE_CARD,
    TURN_DEFAULT_CARD,
    CHANGE_CARD_INPUT_PAYLOAD,
    ADD_NEW_CARD,
    ICardInput
} from './types';

// Actions
import {
    didGetCardsFailAction,
    didGetCardsSucceedAction,
    didRemoveCardSucceedAction,
    didRemoveCardFailAction,
    didTurnDefaultCardSucceedAction,
    didTurnDefaultCardFailAction,
    validateCardInputPayloadAction,
    didAddNewCardSucceedAction,
    didAddNewCardFailAction,
    getCardsAction,
    ChangeCardInputPayloadAction,
    TurnDefaultCardAction,
    RemoveCardAction,
    AddNewCardAction
} from './actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestGetCards = () => {
    return api.get(`/card`);
};

const requestDeleteCard = (cardId: string) => {
    return api.del(`/card/${cardId}`);
};

const requestTurnDefaultCard = (cardId: string) => {
    return api.post(`/card/default/${cardId}`);
};

const requestAddNewCard = (payload: ICardInput) => {
    return api.post(`/card/`, payload);
};

// function* validateAddCardInput(action: ChangeCardInputPayloadAction) {
//     const type = yield select(
//         (state: IApplicationState) => state.wallet.cardInput.cardType
//     );
//     let validation = '';
//     let len = 16;

//     switch (action.name) {
//         case 'cardNumber':
//             if (type === 'american-express') {
//                 len = 15;
//             }
//             if (action.value.replace(/\D/g, '').length === len) {
//                 if (!valid.number(action.value.replace(/\D/g, '')).isValid)
//                     validation = '* Número do cartáo inválido.';
//             }
//             break;
//         case 'cpf':
//             if (
//                 action.value.replace(/\D/g, '').length === 11 &&
//                 !isValidCPF(action.value)
//             ) {
//                 validation = '* CPF inválido.';
//             }
//             break;
//         case 'cnpj':
//             if (
//                 action.value.replace(/\D/g, '').length === 14 &&
//                 !isValidCNPJ(action.value)
//             ) {
//                 validation = '* CNPJ inválido.';
//             }
//             break;
//         case 'expirationDate':
//             const [month, year] = action.value.split('/');
//             if (year?.length === 2) {
//                 if (parseInt(`20${year}`) <= new Date().getFullYear()) {
//                     if (parseInt(`20${year}`) === new Date().getFullYear()) {
//                         if (
//                             parseInt(month) > 12 ||
//                             parseInt(month) <= 0 ||
//                             parseInt(month) < new Date().getMonth() + 1
//                         ) {
//                             validation = '* Data inválida.';
//                         }
//                     } else {
//                         validation = '* Data inválida.';
//                     }
//                 }
//             }
//             break;
//         default:
//             break;
//     }

//     yield put(validateCardInputPayloadAction(action.name, validation));
// }

// function* turnDefaultCard(action: TurnDefaultCardAction) {
//     const { cardId } = action;

//     try {
//         const resp = yield call(requestTurnDefaultCard, cardId);

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

//         yield put(didTurnDefaultCardSucceedAction(cardId));
//     } catch (err) {
//         yield put(didTurnDefaultCardFailAction());
//     }
// }

// function* deleteCard(action: RemoveCardAction) {
//     const { cardId } = action;

//     try {
//         const resp = yield call(requestDeleteCard, cardId);

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

//         yield put(didRemoveCardSucceedAction(cardId));
//     } catch (err) {
//         yield put(didRemoveCardFailAction());
//     }
// }

// function* getCards() {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );

//     try {
//         const resp = yield call(() => requestGetCards(accountId));

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

//         yield put(didGetCardsSucceedAction(resp.data));
//     } catch (err) {
//         yield put(didGetCardsFailAction());
//     }
// }

// function* addNewCard(action: AddNewCardAction) {
//     const accountId = yield select(
//         (state: IApplicationState) => state.auth.accountId
//     );
//     const clientType = yield select(
//         (state: IApplicationState) => state.user.data.clientType
//     );
//     const newCardPayload: ICardInput = yield select(
//         (state: IApplicationState) => state.wallet.cardInput
//     );

//     const [month, year] = newCardPayload.expirationDate.split('/');

//     const payload: any = {
//         cardNumber: newCardPayload.cardNumber.replace(/\D/g, ''),
//         nameOnCard: newCardPayload.nameOnCard,
//         expirationMonth: month,
//         expirationYear: year,
//         cvv: parseInt(newCardPayload.cvv, 10),
//         documentNumber:
//             clientType === 'CORPORATE'
//                 ? newCardPayload.cnpj.replace(/\D/g, '')
//                 : newCardPayload.cpf.replace(/\D/g, ''),
//         cardAddress: {
//             street: newCardPayload.cardAddress.street,
//             number: newCardPayload.cardAddress.number,
//             complement: newCardPayload.cardAddress.complement,
//             neighborhood: newCardPayload.cardAddress.neighborhood,
//             city: newCardPayload.cardAddress.city,
//             state: newCardPayload.cardAddress.state,
//             postalCode: newCardPayload.cardAddress.postalCode.replace(
//                 /\D/g,
//                 ''
//             ),
//             country: newCardPayload.cardAddress.country
//         }
//     };

//     try {
//         const resp = yield call(() => requestAddNewCard(accountId, payload));

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

//         yield put(getCardsAction());
//         yield put(didAddNewCardSucceedAction());

//         if (action.feature) {
//             action.navigation.navigate('Payments', { screen: action.feature });
//         } else {
//             action.navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'General' }, { name: 'Wallet' }]
//             });
//         }
//     } catch (err) {
//         yield put(didAddNewCardFailAction());
//         Alert.alert('Cartão', err.message);
//     }
// }

function* validateAddCardInput(action: ChangeCardInputPayloadAction) {
    const type: string = yield select(
        (state: IApplicationState) => state.wallet.cardInput.cardType
    );

    let validation = '';
    let len = 16;

    switch (action.name) {
        case 'cardNumber':
            if (type === 'american-express') {
                len = 15;
            }
            if (action.value.replace(/\D/g, '').length === len) {
                if (!valid.number(action.value.replace(/\D/g, '')).isValid)
                    validation = '* Número do cartáo inválido.';
            }
            break;
        case 'cpf':
            if (
                action.value.replace(/\D/g, '').length === 11 &&
                !isValidCPF(action.value)
            ) {
                validation = '* CPF inválido.';
            }
            break;
        case 'cnpj':
            if (
                action.value.replace(/\D/g, '').length === 14 &&
                !isValidCNPJ(action.value)
            ) {
                validation = '* CNPJ inválido.';
            }
            break;
        case 'expirationDate':
            const [month, year] = action.value.split('/');
            if (year?.length === 2) {
                if (parseInt(`20${year}`) <= new Date().getFullYear()) {
                    if (parseInt(`20${year}`) === new Date().getFullYear()) {
                        if (
                            parseInt(month) > 12 ||
                            parseInt(month) <= 0 ||
                            parseInt(month) < new Date().getMonth() + 1
                        ) {
                            validation = '* Data inválida.';
                        }
                    } else {
                        validation = '* Data inválida.';
                    }
                }
            }
            break;
        default:
            break;
    }

    yield put(validateCardInputPayloadAction(action.name, validation));
}

function* turnDefaultCard(action: TurnDefaultCardAction) {
    const { cardId } = action;

    const resp = yield callWrapperService(requestTurnDefaultCard, cardId);

    if (resp) {
        yield put(didTurnDefaultCardSucceedAction(cardId));
    } else {
        yield put(didTurnDefaultCardFailAction());
    }
}

function* deleteCard(action: RemoveCardAction) {
    const { cardId } = action;

    const resp = yield callWrapperService(requestDeleteCard, cardId);

    if (resp) {
        yield put(didRemoveCardSucceedAction(cardId));
    } else {
        yield put(didRemoveCardFailAction());
    }
}

function* getCards() {
    const resp = yield callWrapperService(requestGetCards);

    if (resp) {
        yield put(didGetCardsSucceedAction(resp.data));
    } else {
        yield put(didGetCardsFailAction());
    }
}

function* addNewCard(action: AddNewCardAction) {
    const clientType: string = yield select(
        (state: IApplicationState) => state.user.data.clientType
    );
    const newCardPayload: ICardInput = yield select(
        (state: IApplicationState) => state.wallet.cardInput
    );

    const [month, year] = newCardPayload.expirationDate.split('/');

    const payload: any = {
        cardNumber: newCardPayload.cardNumber.replace(/\D/g, ''),
        nameOnCard: newCardPayload.nameOnCard,
        expirationMonth: month,
        expirationYear: year,
        cvv: parseInt(newCardPayload.cvv, 10),
        documentNumber:
            clientType === 'CORPORATE'
                ? newCardPayload.cnpj.replace(/\D/g, '')
                : newCardPayload.cpf.replace(/\D/g, ''),
        cardAddress: {
            street: newCardPayload.cardAddress.street,
            number: newCardPayload.cardAddress.number,
            complement: newCardPayload.cardAddress.complement,
            neighborhood: newCardPayload.cardAddress.neighborhood,
            city: newCardPayload.cardAddress.city,
            state: newCardPayload.cardAddress.state,
            postalCode: newCardPayload.cardAddress.postalCode.replace(
                /\D/g,
                ''
            ),
            country: newCardPayload.cardAddress.country
        }
    };

    const resp = yield callWrapperService(requestAddNewCard, payload);

    if (resp) {
        yield put(getCardsAction());
        yield put(didAddNewCardSucceedAction());

        if (action.feature) {
            action.navigation.navigate('Payments', { screen: action.feature });
        } else {
            action.navigation.reset({
                index: 0,
                routes: [{ name: 'General' }, { name: 'Wallet' }]
            });
        }
    } else {
        yield put(didAddNewCardFailAction());
    }
}

export default all([
    takeLatest(GET_CARDS, getCards),
    takeLatest(REMOVE_CARD, deleteCard),
    takeLatest(TURN_DEFAULT_CARD, turnDefaultCard),
    takeLatest(CHANGE_CARD_INPUT_PAYLOAD, validateAddCardInput),
    takeLatest(ADD_NEW_CARD, addNewCard)
]);
