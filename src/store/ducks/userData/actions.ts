import {
    USER_DATA_FAILURE,
    USER_DATA_REQUEST,
    USER_DATA_SUCCESS,
    CLEAR_USER_DATA
} from './types';

type ClearUserDataAction = {
    type: typeof CLEAR_USER_DATA;
};

type OnGetUserData = {
    type: typeof USER_DATA_REQUEST;
};

type DidGetUserDataFail = {
    type: typeof USER_DATA_FAILURE;
};

type DidGetUserDataSucceed = {
    type: typeof USER_DATA_SUCCESS;
    data: any;
};

export type UserDataAction =
    | OnGetUserData
    | DidGetUserDataFail
    | DidGetUserDataSucceed
    | ClearUserDataAction;

export const clearUserDataAction = (): ClearUserDataAction => ({
    type: 'CLEAR_USER_DATA'
});

export const onGetUserData = (): OnGetUserData => ({
    type: 'USER_DATA_REQUEST'
});

export const didGetUserDataFail = (): DidGetUserDataFail => ({
    type: 'USER_DATA_FAILURE'
});

export const didGetUserDataSucceed = (data: any): DidGetUserDataSucceed => ({
    type: 'USER_DATA_SUCCESS',
    data
});
