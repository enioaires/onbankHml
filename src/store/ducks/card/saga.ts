import { all, takeLatest, put } from 'redux-saga/effects';

// API
import api from '../../../api';

// Types
import {
    ACTIVATE_CARD_BIZ,
    GET_CARD_BIZ,
    REGISTER_CARD_BIZ,
    BLOCK_CARD_BIZ,
    UNBLOCK_CARD_BIZ,
    CANCEL_CARD_BIZ,
    ENABLE_WITHDRAW_CARD_BIZ,
    DISABLE_WITHDRAW_CARD_BIZ,
    ENABLE_PHYSICAL_SHOPPING_CARD_BIZ,
    DISABLE_PHYSICAL_SHOPPING_CARD_BIZ,
    ENABLE_ONLINE_SHOPPING_CARD_BIZ,
    DISABLE_ONLINE_SHOPPING_CARD_BIZ,
    ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ,
    DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ,
    ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ,
    DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ,
    GET_CARD_MONTH_LIMIT,
    ACTIVE_INACTIVE_CARD_MONTH_LIMIT,
    REGISTER_CARD_SECOND_VIA
} from './types';

// Actions
import {
    registerCardBizFailAction,
    registerCardBizSuccessAction,
    RegisterCardBizAction,
    closeRegisterCardBizModalAction,
    getCardBizFailAction,
    getCardBizSuccessAction,
    ActivateCardBizAction,
    activateCardBizSuccessAction,
    activateCardBizFailAction,
    blockCardBizSuccessAction,
    blockCardBizFailAction,
    unblockCardBizSuccessAction,
    unblockCardBizFailAction,
    getCardBizAction,
    cancelCardBizSuccessAction,
    cancelCardBizFailAction,
    CancelCardBizAction,
    enableWithdrawCardBizSuccessAction,
    enableWithdrawCardBizFailAction,
    disableWithdrawCardBizSuccessAction,
    disableWithdrawCardBizFailAction,
    enableOnlineShoppingCardBizSuccessAction,
    enableOnlineShoppingCardBizFailAction,
    disableOnlineShoppingCardBizSuccessAction,
    disableOnlineShoppingCardBizFailAction,
    enablePhysicalShoppingCardBizSuccessAction,
    enablePhysicalShoppingCardBizFailAction,
    disablePhysicalShoppingCardBizSuccessAction,
    disablePhysicalShoppingCardBizFailAction,
    enableInternationalShoppingCardBizSuccessAction,
    enableInternationalShoppingCardBizFailAction,
    disableInternationalShoppingCardBizSuccessAction,
    disableInternationalShoppingCardBizFailAction,
    enableContactlessShoppingCardBizSuccessAction,
    enableContactlessShoppingCardBizFailAction,
    disableContactlessShoppingCardBizSuccessAction,
    disableContactlessShoppingCardBizFailAction,
    BlockCardBizAction,
    UnblockCardBizAction,
    EnableWithdrawCardBizAction,
    DisableWithdrawCardBizAction,
    EnableOnlineShoppingCardBizAction,
    DisableOnlineShoppingCardBizAction,
    EnablePhysicalShoppingCardBizAction,
    DisablePhysicalShoppingCardBizAction,
    EnableInternationalShoppingCardBizAction,
    DisableInternationalShoppingCardBizAction,
    EnableContactlessShoppingCardBizAction,
    DisableContactlessShoppingCardBizAction,
    getCardBizLimitFailureAction,
    getCardBizLimitSuccessAction,
    ActiveInactiveCardBizLimitAction,
    activeInactiveCardBizLimitSuccessAction,
    activeInactiveCardBizLimitFailureAction,
    getCardBizLimitAction,
    registerCardSecondViaFailureAction,
    registerCardSecondViaSuccessAction,
    RegisterCardSecondViaAction,
    GetCardBizAction
} from './actions';
import { onGetUserData } from '../userData/actions';
import { setAlertMessageAction } from '../alert/actions';

// Utils
import callWrapperService from '../../../utils/callWrapperService';

const requestRegisterCardBiz = (embossingName: string) => {
    return api.post('/cardbiz/register', { embossingName });
};
// const requestRegisterCardBiz = () => api.post('/cardbiz/presignup', {});

const requestGetCardBiz = () => api.get('/cardbiz/card');

const requestActivateCardBiz = (lastNumbers: string, password: string) => {
    return api.post('/cardbiz/active', {
        cardNumber: lastNumbers,
        pin: password
    });
};

const requestBlockCardBiz = () => {
    return api.post('/cardbiz/block', {});
};

const requestUnblockCardBiz = () => {
    return api.post('/cardbiz/unblock', {});
};

const requestCancelCardBiz = () => {
    return api.post('/cardbiz/cancel', {});
};

const requestRegisterCardSecondVia = () => {
    return api.post('/cardbiz/second', { embossingName: '' });
};

const requestEnableWithdrawCardBiz = () => {
    return api.put('/cardbiz/withdraw/enable', {});
};

const requestDisableWithdrawCardBiz = () => {
    return api.put('/cardbiz/withdraw/disable', {});
};

const requestEnableOnlineShoppingCardBiz = () => {
    return api.put('/cardbiz/OnlineShopping/enable', {});
};

const requestDisableOnlineShoppingCardBiz = () => {
    return api.put('/cardbiz/OnlineShopping/disable', {});
};

const requestEnablePhysicalShoppingCardBiz = () => {
    return api.put('/cardbiz/PhysicalShopping/enable', {});
};

const requestDisablePhysicalShoppingCardBiz = () => {
    return api.put('/cardbiz/PhysicalShopping/disable', {});
};

const requestEnableInternationalShoppingCardBiz = () => {
    return api.put('/cardbiz/InternationalShopping/enable', {});
};

const requestDisableInternationalShoppingCardBiz = () => {
    return api.put('/cardbiz/InternationalShopping/disable', {});
};

const requestEnableContactlessShoppingCardBiz = () => {
    return api.put('/cardbiz/contactlessshopping/enable', {});
};

const requestDisableContactlessShoppingCardBiz = () => {
    return api.put('/cardbiz/contactlessshopping/disable', {});
};

const requestGetCardLimit = () => {
    return api.get('/cardbizmanagementlimit/MONTH');
};

const requestActiveInactiveCardLimit = (payload: any) => {
    return api.put('/cardbizmanagementlimit', payload);
};

function* registerCardSecondVia(action: RegisterCardSecondViaAction) {
    const resp: any = yield callWrapperService(requestRegisterCardSecondVia);

    // console.log('segunda via', JSON.stringify(resp, null, 2));

    yield put(closeRegisterCardBizModalAction());

    if (resp) {
        yield put(registerCardSecondViaSuccessAction());
        yield put(onGetUserData());
        yield put(closeRegisterCardBizModalAction());

        action.navigation.popToTop();
        action.navigation.push('Card', { screen: 'Traffic' });
    } else {
        yield put(registerCardSecondViaFailureAction());
    }
}

function* getCardLimit() {
    const resp = yield callWrapperService(requestGetCardLimit);

    // console.log('cardLimit', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(getCardBizLimitSuccessAction(resp));
    } else {
        yield put(getCardBizLimitFailureAction());
    }
}

function* activeInactiveCardLimit(action: ActiveInactiveCardBizLimitAction) {
    const resp = yield callWrapperService(requestActiveInactiveCardLimit, {
        active: action.active,
        type: 'MONTH',
        limitMonth: parseInt(action.value.replace(/\D/g, ''), 10) / 100
    });

    // console.log('cardLimit', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(activeInactiveCardBizLimitSuccessAction());
        yield put(getCardBizLimitAction());
    } else {
        yield put(activeInactiveCardBizLimitFailureAction());
        yield put(getCardBizLimitAction());
    }
}

function* registerCardBiz(action: RegisterCardBizAction) {
    const resp = yield callWrapperService(
        requestRegisterCardBiz,
        action.embossingName
    );

    // console.log('register card', JSON.stringify(resp, null, 2));

    yield put(closeRegisterCardBizModalAction());

    if (resp) {
        yield put(registerCardBizSuccessAction());
        yield put(onGetUserData());

        action.navigation.popToTop();
        action.navigation.push('Card', { screen: 'Traffic' });
    } else {
        yield put(registerCardBizFailAction());
    }
}

function* getCardBiz(action: GetCardBizAction) {
    const resp = yield callWrapperService(requestGetCardBiz);

    // console.log('get card', JSON.stringify(resp, null, 2));

    if (resp?.data) {
        yield put(getCardBizSuccessAction(resp?.data));
        if (action.refresh) {
            yield put(onGetUserData());
        }
    } else {
        yield put(getCardBizFailAction());
    }
}

function* activateCardBiz(action: ActivateCardBizAction) {
    const resp = yield callWrapperService(
        requestActivateCardBiz,
        action.lastNumbers,
        action.password
    );
    // console.log('activate card', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(activateCardBizSuccessAction());
        yield put(onGetUserData());
        // yield put(
        //     setAlertMessageAction({
        //         type: 'info',
        //         title: 'Lembrete',
        //         message:
        //             'Seu cartão foi ativado! Utilize seu cartão na função crédito.'
        //     })
        // );
        action.navigation.push('Card', {
            screen: 'Active'
        });
    } else {
        yield put(activateCardBizFailAction());
    }
}

function* blockCardBiz(action: BlockCardBizAction) {
    const resp = yield callWrapperService(requestBlockCardBiz);
    // console.log('block', resp);
    // console.log('block card', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(blockCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(blockCardBizFailAction());
    }
}

function* unblockCardBiz(action: UnblockCardBizAction) {
    const resp = yield callWrapperService(requestUnblockCardBiz);
    // console.log('unblock', resp);
    // console.log('unblock card', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(unblockCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(unblockCardBizFailAction());
    }
}

function* cancelCardBiz(action: CancelCardBizAction) {
    const resp = yield callWrapperService(requestCancelCardBiz);
    // console.log('cancel card', JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(cancelCardBizSuccessAction());
        yield put(onGetUserData());

        yield put(
            setAlertMessageAction({
                title: 'Cartão',
                message: 'Seu cartão Onbank foi cancelado.',
                action: {
                    mainLabel: 'Ok',
                    onPress: () =>
                        action.navigation.reset({
                            index: 0,
                            routes: [{ name: 'General' }]
                        })
                }
            })
        );
    } else {
        yield put(cancelCardBizFailAction());
    }
}

function* enableWithdrawCardBiz(action: EnableWithdrawCardBizAction) {
    const resp = yield callWrapperService(requestEnableWithdrawCardBiz);

    // console.log(JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(enableWithdrawCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(enableWithdrawCardBizFailAction());
    }
}

function* disableWithdrawCardBiz(action: DisableWithdrawCardBizAction) {
    const resp = yield callWrapperService(requestDisableWithdrawCardBiz);

    // console.log(JSON.stringify(resp, null, 2));

    if (resp) {
        yield put(disableWithdrawCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(disableWithdrawCardBizFailAction());
    }
}

function* enableOnlineShoppingCardBiz(
    action: EnableOnlineShoppingCardBizAction
) {
    const resp = yield callWrapperService(requestEnableOnlineShoppingCardBiz);
    // console.log(resp);

    if (resp) {
        yield put(enableOnlineShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(enableOnlineShoppingCardBizFailAction());
    }
}

function* disableOnlineShoppingCardBiz(
    action: DisableOnlineShoppingCardBizAction
) {
    const resp = yield callWrapperService(requestDisableOnlineShoppingCardBiz);
    // console.log(resp);

    if (resp) {
        yield put(disableOnlineShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(disableOnlineShoppingCardBizFailAction());
    }
}

function* enablePhysicalShoppingCardBiz(
    action: EnablePhysicalShoppingCardBizAction
) {
    const resp = yield callWrapperService(requestEnablePhysicalShoppingCardBiz);
    // console.log(resp);

    if (resp) {
        yield put(enablePhysicalShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(enablePhysicalShoppingCardBizFailAction());
    }
}

function* disablePhysicalShoppingCardBiz(
    action: DisablePhysicalShoppingCardBizAction
) {
    const resp = yield callWrapperService(
        requestDisablePhysicalShoppingCardBiz
    );
    // console.log(resp);

    if (resp) {
        yield put(disablePhysicalShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(disablePhysicalShoppingCardBizFailAction());
    }
}

function* enableInternationalShoppingCardBiz(
    action: EnableInternationalShoppingCardBizAction
) {
    const resp = yield callWrapperService(
        requestEnableInternationalShoppingCardBiz
    );
    // console.log(resp);

    if (resp) {
        yield put(enableInternationalShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(enableInternationalShoppingCardBizFailAction());
    }
}

function* disableInternationalShoppingCardBiz(
    action: DisableInternationalShoppingCardBizAction
) {
    const resp = yield callWrapperService(
        requestDisableInternationalShoppingCardBiz
    );
    // console.log(resp);

    if (resp) {
        yield put(disableInternationalShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(disableInternationalShoppingCardBizFailAction());
    }
}

function* enableContactlessShoppingCardBiz(
    action: EnableContactlessShoppingCardBizAction
) {
    const resp = yield callWrapperService(
        requestEnableContactlessShoppingCardBiz
    );
    // console.log(resp);

    if (resp) {
        yield put(enableContactlessShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(enableContactlessShoppingCardBizFailAction());
    }
}

function* disableContactlessShoppingCardBiz(
    action: DisableContactlessShoppingCardBizAction
) {
    const resp = yield callWrapperService(
        requestDisableContactlessShoppingCardBiz
    );
    // console.log(resp);

    if (resp) {
        yield put(disableContactlessShoppingCardBizSuccessAction());
        yield put(getCardBizAction());
    } else {
        yield put(disableContactlessShoppingCardBizFailAction());
    }
}

export default all([
    takeLatest(REGISTER_CARD_BIZ, registerCardBiz),
    takeLatest(GET_CARD_BIZ, getCardBiz),
    takeLatest(ACTIVATE_CARD_BIZ, activateCardBiz),
    takeLatest(BLOCK_CARD_BIZ, blockCardBiz),
    takeLatest(UNBLOCK_CARD_BIZ, unblockCardBiz),
    takeLatest(CANCEL_CARD_BIZ, cancelCardBiz),
    takeLatest(ENABLE_WITHDRAW_CARD_BIZ, enableWithdrawCardBiz),
    takeLatest(DISABLE_WITHDRAW_CARD_BIZ, disableWithdrawCardBiz),
    takeLatest(ENABLE_ONLINE_SHOPPING_CARD_BIZ, enableOnlineShoppingCardBiz),
    takeLatest(DISABLE_ONLINE_SHOPPING_CARD_BIZ, disableOnlineShoppingCardBiz),
    takeLatest(
        ENABLE_PHYSICAL_SHOPPING_CARD_BIZ,
        enablePhysicalShoppingCardBiz
    ),
    takeLatest(
        DISABLE_PHYSICAL_SHOPPING_CARD_BIZ,
        disablePhysicalShoppingCardBiz
    ),
    takeLatest(
        ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ,
        enableInternationalShoppingCardBiz
    ),
    takeLatest(
        DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ,
        disableInternationalShoppingCardBiz
    ),
    takeLatest(
        ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ,
        enableContactlessShoppingCardBiz
    ),
    takeLatest(
        DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ,
        disableContactlessShoppingCardBiz
    ),
    takeLatest(GET_CARD_MONTH_LIMIT, getCardLimit),
    takeLatest(ACTIVE_INACTIVE_CARD_MONTH_LIMIT, activeInactiveCardLimit),
    takeLatest(REGISTER_CARD_SECOND_VIA, registerCardSecondVia)
]);
