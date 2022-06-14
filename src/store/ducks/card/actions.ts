import {
    CardStackNavigationProps,
    PerfilStackNavigationProps
} from '../../../routes/Logged/types';

import {
    REGISTER_CARD_BIZ,
    GET_CARD_BIZ,
    GET_CARD_BIZ_SUCCESS,
    GET_CARD_BIZ_FAIL,
    REGISTER_CARD_BIZ_SUCCESS,
    REGISTER_CARD_BIZ_FAIL,
    SHOW_REGISTER_CARD_BIZ_MODAL,
    CLOSE_REGISTER_CARD_BIZ_MODAL,
    CLEAR_CARD_BIZ_STORE,
    ACTIVATE_CARD_BIZ,
    ACTIVATE_CARD_BIZ_SUCCESS,
    ACTIVATE_CARD_BIZ_FAIL,
    BLOCK_CARD_BIZ,
    BLOCK_CARD_BIZ_FAIL,
    BLOCK_CARD_BIZ_SUCCESS,
    UNBLOCK_CARD_BIZ,
    UNBLOCK_CARD_BIZ_FAIL,
    UNBLOCK_CARD_BIZ_SUCCESS,
    CANCEL_CARD_BIZ,
    CANCEL_CARD_BIZ_FAIL,
    CANCEL_CARD_BIZ_SUCCESS,
    ENABLE_WITHDRAW_CARD_BIZ,
    ENABLE_WITHDRAW_CARD_BIZ_FAIL,
    ENABLE_WITHDRAW_CARD_BIZ_SUCCESS,
    DISABLE_WITHDRAW_CARD_BIZ,
    DISABLE_WITHDRAW_CARD_BIZ_FAIL,
    DISABLE_WITHDRAW_CARD_BIZ_SUCCESS,
    ENABLE_ONLINE_SHOPPING_CARD_BIZ,
    ENABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL,
    ENABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS,
    DISABLE_ONLINE_SHOPPING_CARD_BIZ,
    DISABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL,
    DISABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS,
    ENABLE_PHYSICAL_SHOPPING_CARD_BIZ,
    ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL,
    ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS,
    DISABLE_PHYSICAL_SHOPPING_CARD_BIZ,
    DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL,
    DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS,
    ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ,
    ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL,
    ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS,
    DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ,
    DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL,
    DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS,
    ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ,
    ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL,
    ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS,
    DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ,
    DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL,
    DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS,
    GET_CARD_MONTH_LIMIT,
    GET_CARD_MONTH_LIMIT_FAILURE,
    GET_CARD_MONTH_LIMIT_SUCCESS,
    ICardBiz,
    ICardLimit,
    ACTIVE_INACTIVE_CARD_MONTH_LIMIT,
    ACTIVE_INACTIVE_CARD_MONTH_LIMIT_SUCCESS,
    ACTIVE_INACTIVE_CARD_MONTH_LIMIT_FAILURE,
    REGISTER_CARD_SECOND_VIA,
    REGISTER_CARD_SECOND_VIA_FAILURE,
    REGISTER_CARD_SECOND_VIA_SUCCESS
} from './types';

export type RegisterCardSecondViaAction = {
    type: typeof REGISTER_CARD_SECOND_VIA;
    navigation: PerfilStackNavigationProps<'Address'>['navigation'];
};

type RegisterCardSecondViaSuccessAction = {
    type: typeof REGISTER_CARD_SECOND_VIA_SUCCESS;
};

type RegisterCardSecondViaFailureAction = {
    type: typeof REGISTER_CARD_SECOND_VIA_FAILURE;
};

export type ActiveInactiveCardBizLimitAction = {
    type: typeof ACTIVE_INACTIVE_CARD_MONTH_LIMIT;
    active: boolean;
    value: string;
};

type ActiveInactiveCardBizLimitSuccessAction = {
    type: typeof ACTIVE_INACTIVE_CARD_MONTH_LIMIT_SUCCESS;
};

type ActiveInactiveCardBizLimitFailureAction = {
    type: typeof ACTIVE_INACTIVE_CARD_MONTH_LIMIT_FAILURE;
};

type GetCardBizLimitAction = {
    type: typeof GET_CARD_MONTH_LIMIT;
};

export type GetCardBizLimitSuccessAction = {
    type: typeof GET_CARD_MONTH_LIMIT_SUCCESS;
    cardLimit: ICardLimit;
};

type GetCardBizLimitFailureAction = {
    type: typeof GET_CARD_MONTH_LIMIT_FAILURE;
};

export type RegisterCardBizAction = {
    type: typeof REGISTER_CARD_BIZ;
    navigation: CardStackNavigationProps<'ChooseNameCard'>['navigation'];
    embossingName: string;
};

type RegisterCardBizSuccessAction = {
    type: typeof REGISTER_CARD_BIZ_SUCCESS;
};

type RegisterCardBizFailAction = {
    type: typeof REGISTER_CARD_BIZ_FAIL;
};

export type GetCardBizAction = {
    type: typeof GET_CARD_BIZ;
    refresh?: boolean;
};

type GetCardBizSuccessAction = {
    type: typeof GET_CARD_BIZ_SUCCESS;
    data: ICardBiz;
};

type GetCardBizFailAction = {
    type: typeof GET_CARD_BIZ_FAIL;
};

type ShowRegisterCardBizModalAction = {
    type: typeof SHOW_REGISTER_CARD_BIZ_MODAL;
};

type CloseRegisterCardBizModalAction = {
    type: typeof CLOSE_REGISTER_CARD_BIZ_MODAL;
};

type ClearCardBizStoreAction = {
    type: typeof CLEAR_CARD_BIZ_STORE;
};

export type ActivateCardBizAction = {
    type: typeof ACTIVATE_CARD_BIZ;
    lastNumbers: string;
    password: string;
    navigation: CardStackNavigationProps<'Activate'>['navigation'];
};

type ActivateCardBizSuccessAction = {
    type: typeof ACTIVATE_CARD_BIZ_SUCCESS;
};

type ActivateCardBizFailAction = {
    type: typeof ACTIVATE_CARD_BIZ_FAIL;
};

export type BlockCardBizAction = {
    type: typeof BLOCK_CARD_BIZ;
    fallBack: () => void;
};

type BlockCardBizSuccessAction = {
    type: typeof BLOCK_CARD_BIZ_SUCCESS;
};

type BlockCardBizFailAction = {
    type: typeof BLOCK_CARD_BIZ_FAIL;
};

export type UnblockCardBizAction = {
    type: typeof UNBLOCK_CARD_BIZ;
    fallBack: () => void;
};

type UnblockCardBizSuccessAction = {
    type: typeof UNBLOCK_CARD_BIZ_SUCCESS;
};

type UnblockCardBizFailAction = {
    type: typeof UNBLOCK_CARD_BIZ_FAIL;
};

export type CancelCardBizAction = {
    type: typeof CANCEL_CARD_BIZ;
    navigation: any;
};

type CancelCardBizSuccessAction = {
    type: typeof CANCEL_CARD_BIZ_SUCCESS;
};

type CancelCardBizFailAction = {
    type: typeof CANCEL_CARD_BIZ_FAIL;
};

export type EnableWithdrawCardBizAction = {
    type: typeof ENABLE_WITHDRAW_CARD_BIZ;
    fallBack: () => void;
};

type EnableWithdrawCardBizSuccessAction = {
    type: typeof ENABLE_WITHDRAW_CARD_BIZ_SUCCESS;
};

type EnableWithdrawCardBizFailAction = {
    type: typeof ENABLE_WITHDRAW_CARD_BIZ_FAIL;
};

export type DisableWithdrawCardBizAction = {
    type: typeof DISABLE_WITHDRAW_CARD_BIZ;
    fallBack: () => void;
};

type DisableWithdrawCardBizSuccessAction = {
    type: typeof DISABLE_WITHDRAW_CARD_BIZ_SUCCESS;
};

type DisableWithdrawCardBizFailAction = {
    type: typeof DISABLE_WITHDRAW_CARD_BIZ_FAIL;
};

export type EnableOnlineShoppingCardBizAction = {
    type: typeof ENABLE_ONLINE_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type EnableOnlineShoppingCardBizSuccessAction = {
    type: typeof ENABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS;
};

type EnableOnlineShoppingCardBizFailAction = {
    type: typeof ENABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL;
};

export type DisableOnlineShoppingCardBizAction = {
    type: typeof DISABLE_ONLINE_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type DisableOnlineShoppingCardBizSuccessAction = {
    type: typeof DISABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS;
};

type DisableOnlineShoppingCardBizFailAction = {
    type: typeof DISABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL;
};

export type EnablePhysicalShoppingCardBizAction = {
    type: typeof ENABLE_PHYSICAL_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type EnablePhysicalShoppingCardBizSuccessAction = {
    type: typeof ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS;
};

type EnablePhysicalShoppingCardBizFailAction = {
    type: typeof ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL;
};

export type DisablePhysicalShoppingCardBizAction = {
    type: typeof DISABLE_PHYSICAL_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type DisablePhysicalShoppingCardBizSuccessAction = {
    type: typeof DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS;
};

type DisablePhysicalShoppingCardBizFailAction = {
    type: typeof DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL;
};

export type EnableInternationalShoppingCardBizAction = {
    type: typeof ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type EnableInternationalShoppingCardBizSuccessAction = {
    type: typeof ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS;
};

type EnableInternationalShoppingCardBizFailAction = {
    type: typeof ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL;
};

export type DisableInternationalShoppingCardBizAction = {
    type: typeof DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type DisableInternationalShoppingCardBizSuccessAction = {
    type: typeof DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS;
};

type DisableInternationalShoppingCardBizFailAction = {
    type: typeof DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL;
};

export type EnableContactlessShoppingCardBizAction = {
    type: typeof ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type EnableContactlessShoppingCardBizSuccessAction = {
    type: typeof ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS;
};

type EnableContactlessShoppingCardBizFailAction = {
    type: typeof ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL;
};

export type DisableContactlessShoppingCardBizAction = {
    type: typeof DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ;
    fallBack: () => void;
};

type DisableContactlessShoppingCardBizSuccessAction = {
    type: typeof DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS;
};

type DisableContactlessShoppingCardBizFailAction = {
    type: typeof DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL;
};

export type CardBizAction =
    | RegisterCardBizAction
    | GetCardBizAction
    | RegisterCardBizSuccessAction
    | RegisterCardBizFailAction
    | ShowRegisterCardBizModalAction
    | CloseRegisterCardBizModalAction
    | GetCardBizFailAction
    | GetCardBizSuccessAction
    | ClearCardBizStoreAction
    | ActivateCardBizAction
    | ActivateCardBizSuccessAction
    | ActivateCardBizFailAction
    | BlockCardBizAction
    | BlockCardBizSuccessAction
    | BlockCardBizFailAction
    | UnblockCardBizAction
    | UnblockCardBizSuccessAction
    | UnblockCardBizFailAction
    | CancelCardBizAction
    | CancelCardBizSuccessAction
    | CancelCardBizFailAction
    | EnableWithdrawCardBizAction
    | EnableWithdrawCardBizSuccessAction
    | EnableWithdrawCardBizFailAction
    | DisableWithdrawCardBizAction
    | DisableWithdrawCardBizSuccessAction
    | DisableWithdrawCardBizFailAction
    | EnableOnlineShoppingCardBizAction
    | EnableOnlineShoppingCardBizSuccessAction
    | EnableOnlineShoppingCardBizFailAction
    | DisableOnlineShoppingCardBizAction
    | DisableOnlineShoppingCardBizSuccessAction
    | DisableOnlineShoppingCardBizFailAction
    | EnablePhysicalShoppingCardBizAction
    | EnablePhysicalShoppingCardBizSuccessAction
    | EnablePhysicalShoppingCardBizFailAction
    | DisablePhysicalShoppingCardBizAction
    | DisablePhysicalShoppingCardBizSuccessAction
    | DisablePhysicalShoppingCardBizFailAction
    | EnableInternationalShoppingCardBizAction
    | EnableInternationalShoppingCardBizSuccessAction
    | EnableInternationalShoppingCardBizFailAction
    | DisableInternationalShoppingCardBizAction
    | DisableInternationalShoppingCardBizSuccessAction
    | DisableInternationalShoppingCardBizFailAction
    | EnableContactlessShoppingCardBizAction
    | EnableContactlessShoppingCardBizSuccessAction
    | EnableContactlessShoppingCardBizFailAction
    | DisableContactlessShoppingCardBizAction
    | DisableContactlessShoppingCardBizSuccessAction
    | DisableContactlessShoppingCardBizFailAction
    | GetCardBizLimitAction
    | GetCardBizLimitFailureAction
    | GetCardBizLimitSuccessAction
    | ActiveInactiveCardBizLimitAction
    | ActiveInactiveCardBizLimitFailureAction
    | ActiveInactiveCardBizLimitSuccessAction
    | RegisterCardSecondViaAction
    | RegisterCardSecondViaFailureAction
    | RegisterCardSecondViaSuccessAction;

export const registerCardSecondViaAction = (
    navigation: PerfilStackNavigationProps<'Address'>['navigation']
): RegisterCardSecondViaAction => ({
    type: 'REGISTER_CARD_SECOND_VIA',
    navigation
});

export const registerCardSecondViaFailureAction =
    (): RegisterCardSecondViaFailureAction => ({
        type: 'REGISTER_CARD_SECOND_VIA_FAILURE'
    });

export const registerCardSecondViaSuccessAction =
    (): RegisterCardSecondViaSuccessAction => ({
        type: 'REGISTER_CARD_SECOND_VIA_SUCCESS'
    });

export const activeInactiveCardBizLimitAction = (
    active: boolean,
    value: string
): ActiveInactiveCardBizLimitAction => ({
    type: 'ACTIVE_INACTIVE_CARD_MONTH_LIMIT',
    active,
    value
});

export const activeInactiveCardBizLimitSuccessAction =
    (): ActiveInactiveCardBizLimitSuccessAction => ({
        type: 'ACTIVE_INACTIVE_CARD_MONTH_LIMIT_SUCCESS'
    });

export const activeInactiveCardBizLimitFailureAction =
    (): ActiveInactiveCardBizLimitFailureAction => ({
        type: 'ACTIVE_INACTIVE_CARD_MONTH_LIMIT_FAILURE'
    });

export const getCardBizLimitAction = (): GetCardBizLimitAction => ({
    type: 'GET_CARD_MONTH_LIMIT'
});

export const getCardBizLimitSuccessAction = (
    cardLimit: ICardLimit
): GetCardBizLimitSuccessAction => ({
    type: 'GET_CARD_MONTH_LIMIT_SUCCESS',
    cardLimit
});

export const getCardBizLimitFailureAction =
    (): GetCardBizLimitFailureAction => ({
        type: 'GET_CARD_MONTH_LIMIT_FAILURE'
    });

export const registerCardBizAction = (
    navigation: CardStackNavigationProps<'ChooseNameCard'>['navigation'],
    embossingName: string
): RegisterCardBizAction => ({
    type: 'REGISTER_CARD_BIZ',
    navigation,
    embossingName
});

export const registerCardBizSuccessAction =
    (): RegisterCardBizSuccessAction => ({
        type: 'REGISTER_CARD_BIZ_SUCCESS'
    });

export const registerCardBizFailAction = (): RegisterCardBizFailAction => ({
    type: 'REGISTER_CARD_BIZ_FAIL'
});

export const getCardBizAction = (refresh?: boolean): GetCardBizAction => ({
    type: 'GET_CARD_BIZ',
    refresh
});

export const getCardBizSuccessAction = (
    data: ICardBiz
): GetCardBizSuccessAction => ({
    type: 'GET_CARD_BIZ_SUCCESS',
    data
});

export const getCardBizFailAction = (): GetCardBizFailAction => ({
    type: 'GET_CARD_BIZ_FAIL'
});

export const showRegisterCardBizModalAction =
    (): ShowRegisterCardBizModalAction => ({
        type: 'SHOW_REGISTER_CARD_BIZ_MODAL'
    });

export const closeRegisterCardBizModalAction =
    (): CloseRegisterCardBizModalAction => ({
        type: 'CLOSE_REGISTER_CARD_BIZ_MODAL'
    });

export const clearCardBizStoreAction = (): ClearCardBizStoreAction => ({
    type: 'CLEAR_CARD_BIZ_STORE'
});

export const activateCardBizAction = (
    lastNumbers: string,
    password: string,
    navigation: CardStackNavigationProps<'Activate'>['navigation']
): ActivateCardBizAction => ({
    type: 'ACTIVATE_CARD_BIZ',
    lastNumbers,
    password,
    navigation
});

export const activateCardBizSuccessAction =
    (): ActivateCardBizSuccessAction => ({
        type: 'ACTIVATE_CARD_BIZ_SUCCESS'
    });

export const activateCardBizFailAction = (): ActivateCardBizFailAction => ({
    type: 'ACTIVATE_CARD_BIZ_FAIL'
});

export const blockCardBizAction = (
    fallBack: () => void
): BlockCardBizAction => ({
    type: 'BLOCK_CARD_BIZ',
    fallBack
});

export const blockCardBizSuccessAction = (): BlockCardBizSuccessAction => ({
    type: 'BLOCK_CARD_BIZ_SUCCESS'
});

export const blockCardBizFailAction = (): BlockCardBizFailAction => ({
    type: 'BLOCK_CARD_BIZ_FAIL'
});

export const unblockCardBizAction = (
    fallBack: () => void
): UnblockCardBizAction => ({
    type: 'UNBLOCK_CARD_BIZ',
    fallBack
});

export const unblockCardBizSuccessAction = (): UnblockCardBizSuccessAction => ({
    type: 'UNBLOCK_CARD_BIZ_SUCCESS'
});

export const unblockCardBizFailAction = (): UnblockCardBizFailAction => ({
    type: 'UNBLOCK_CARD_BIZ_FAIL'
});

export const cancelCardBizAction = (navigation: any): CancelCardBizAction => ({
    type: 'CANCEL_CARD_BIZ',
    navigation
});

export const cancelCardBizSuccessAction = (): CancelCardBizSuccessAction => ({
    type: 'CANCEL_CARD_BIZ_SUCCESS'
});

export const cancelCardBizFailAction = (): CancelCardBizFailAction => ({
    type: 'CANCEL_CARD_BIZ_FAIL'
});

export const enableWithdrawCardBizAction = (
    fallBack: () => void
): EnableWithdrawCardBizAction => ({
    type: 'ENABLE_WITHDRAW_CARD_BIZ',
    fallBack
});

export const enableWithdrawCardBizSuccessAction =
    (): EnableWithdrawCardBizSuccessAction => ({
        type: 'ENABLE_WITHDRAW_CARD_BIZ_SUCCESS'
    });

export const enableWithdrawCardBizFailAction =
    (): EnableWithdrawCardBizFailAction => ({
        type: 'ENABLE_WITHDRAW_CARD_BIZ_FAIL'
    });

export const disableWithdrawCardBizAction = (
    fallBack: () => void
): DisableWithdrawCardBizAction => ({
    type: 'DISABLE_WITHDRAW_CARD_BIZ',
    fallBack
});

export const disableWithdrawCardBizSuccessAction =
    (): DisableWithdrawCardBizSuccessAction => ({
        type: 'DISABLE_WITHDRAW_CARD_BIZ_SUCCESS'
    });

export const disableWithdrawCardBizFailAction =
    (): DisableWithdrawCardBizFailAction => ({
        type: 'DISABLE_WITHDRAW_CARD_BIZ_FAIL'
    });

export const enableOnlineShoppingCardBizAction = (
    fallBack: () => void
): EnableOnlineShoppingCardBizAction => ({
    type: 'ENABLE_ONLINE_SHOPPING_CARD_BIZ',
    fallBack
});

export const enableOnlineShoppingCardBizSuccessAction =
    (): EnableOnlineShoppingCardBizSuccessAction => ({
        type: 'ENABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const enableOnlineShoppingCardBizFailAction =
    (): EnableOnlineShoppingCardBizFailAction => ({
        type: 'ENABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL'
    });

export const disableOnlineShoppingCardBizAction = (
    fallBack: () => void
): DisableOnlineShoppingCardBizAction => ({
    type: 'DISABLE_ONLINE_SHOPPING_CARD_BIZ',
    fallBack
});

export const disableOnlineShoppingCardBizSuccessAction =
    (): DisableOnlineShoppingCardBizSuccessAction => ({
        type: 'DISABLE_ONLINE_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const disableOnlineShoppingCardBizFailAction =
    (): DisableOnlineShoppingCardBizFailAction => ({
        type: 'DISABLE_ONLINE_SHOPPING_CARD_BIZ_FAIL'
    });

export const enablePhysicalShoppingCardBizAction = (
    fallBack: () => void
): EnablePhysicalShoppingCardBizAction => ({
    type: 'ENABLE_PHYSICAL_SHOPPING_CARD_BIZ',
    fallBack
});

export const enablePhysicalShoppingCardBizSuccessAction =
    (): EnablePhysicalShoppingCardBizSuccessAction => ({
        type: 'ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const enablePhysicalShoppingCardBizFailAction =
    (): EnablePhysicalShoppingCardBizFailAction => ({
        type: 'ENABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL'
    });

export const disablePhysicalShoppingCardBizAction = (
    fallBack: () => void
): DisablePhysicalShoppingCardBizAction => ({
    type: 'DISABLE_PHYSICAL_SHOPPING_CARD_BIZ',
    fallBack
});

export const disablePhysicalShoppingCardBizSuccessAction =
    (): DisablePhysicalShoppingCardBizSuccessAction => ({
        type: 'DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const disablePhysicalShoppingCardBizFailAction =
    (): DisablePhysicalShoppingCardBizFailAction => ({
        type: 'DISABLE_PHYSICAL_SHOPPING_CARD_BIZ_FAIL'
    });

export const enableInternationalShoppingCardBizAction = (
    fallBack: () => void
): EnableInternationalShoppingCardBizAction => ({
    type: 'ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ',
    fallBack
});

export const enableInternationalShoppingCardBizSuccessAction =
    (): EnableInternationalShoppingCardBizSuccessAction => ({
        type: 'ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const enableInternationalShoppingCardBizFailAction =
    (): EnableInternationalShoppingCardBizFailAction => ({
        type: 'ENABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL'
    });

export const disableInternationalShoppingCardBizAction = (
    fallBack: () => void
): DisableInternationalShoppingCardBizAction => ({
    type: 'DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ',
    fallBack
});

export const disableInternationalShoppingCardBizSuccessAction =
    (): DisableInternationalShoppingCardBizSuccessAction => ({
        type: 'DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const disableInternationalShoppingCardBizFailAction =
    (): DisableInternationalShoppingCardBizFailAction => ({
        type: 'DISABLE_INTERNATIONAL_SHOPPING_CARD_BIZ_FAIL'
    });

export const enableContactlessShoppingCardBizAction = (
    fallBack: () => void
): EnableContactlessShoppingCardBizAction => ({
    type: 'ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ',
    fallBack
});

export const enableContactlessShoppingCardBizSuccessAction =
    (): EnableContactlessShoppingCardBizSuccessAction => ({
        type: 'ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const enableContactlessShoppingCardBizFailAction =
    (): EnableContactlessShoppingCardBizFailAction => ({
        type: 'ENABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL'
    });

export const disableContactlessShoppingCardBizAction = (
    fallBack: () => void
): DisableContactlessShoppingCardBizAction => ({
    type: 'DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ',
    fallBack
});

export const disableContactlessShoppingCardBizSuccessAction =
    (): DisableContactlessShoppingCardBizSuccessAction => ({
        type: 'DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_SUCCESS'
    });

export const disableContactlessShoppingCardBizFailAction =
    (): DisableContactlessShoppingCardBizFailAction => ({
        type: 'DISABLE_CONTACTLESS_SHOPPING_CARD_BIZ_FAIL'
    });
