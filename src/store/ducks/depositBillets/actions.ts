import {
    IDepositBilletsData,
    GET_DEPOSIT_BILLETS,
    GET_DEPOSIT_BILLETS_FAILURE,
    GET_DEPOSIT_BILLETS_SUCCESS,
    CLEAR_DEPOSIT_BILLETS,
    GET_CONDITION_BILLETS,
    GET_CONDITION_BILLETS_FAILURE,
    GET_CONDITION_BILLETS_SUCCESS,
    IConditionBillet
} from './types';
import { DepositStackNavigationProps } from '../../../routes/Logged/types'

type GetDepositBilletsAction = {
    type: typeof GET_DEPOSIT_BILLETS;
};

type DidGetDepositBilletsSucceedAction = {
    type: typeof GET_DEPOSIT_BILLETS_SUCCESS;
    data: IDepositBilletsData[];
};

type DidGetDepositBilletsFailAction = {
    type: typeof GET_DEPOSIT_BILLETS_FAILURE;
};

export type GetConditionBilletsAction = {
    type: typeof GET_CONDITION_BILLETS;
    navigation: DepositStackNavigationProps<
        'Option'
    >['navigation'];
};

type DidConditionBilletsSucceedAction = {
    type: typeof GET_CONDITION_BILLETS_SUCCESS;
    payload: IConditionBillet;
};

type DidConditionBilletsFailAction = {
    type: typeof GET_CONDITION_BILLETS_FAILURE;
};

type ClearDepositBilletsAction = {
    type: typeof CLEAR_DEPOSIT_BILLETS;
    payload: string;
};

export type DepositBilletsActions =
    | GetDepositBilletsAction
    | DidGetDepositBilletsSucceedAction
    | DidGetDepositBilletsFailAction
    | ClearDepositBilletsAction
    | GetConditionBilletsAction
    | DidConditionBilletsSucceedAction
    | DidConditionBilletsFailAction;

export const getDepositBilletsAction = (): GetDepositBilletsAction => ({
    type: 'GET_DEPOSIT_BILLETS'
});

export const didGetDepositBilletsSucceedAction = (
    data: IDepositBilletsData[]
): DidGetDepositBilletsSucceedAction => ({
    type: 'GET_DEPOSIT_BILLETS_SUCCESS',
    data
});

export const didGetDepositBilletsFailAction = (): DidGetDepositBilletsFailAction => ({
    type: 'GET_DEPOSIT_BILLETS_FAILURE'
});

export const getConditionBilletsAction = (
    navigation: DepositStackNavigationProps<
        'Option'
    >['navigation']
): GetConditionBilletsAction => ({
    type: 'GET_CONDITION_BILLETS',
    navigation
});

export const didConditionBilletsSucceedAction = (
    payload: IConditionBillet
): DidConditionBilletsSucceedAction => ({
    type: 'GET_CONDITION_BILLETS_SUCCESS',
    payload
});

export const didConditionBilletsFailAction = (): DidConditionBilletsFailAction => ({
    type: 'GET_CONDITION_BILLETS_FAILURE'
});

export const clearDepositBilletsAction = (
    payload: string
): ClearDepositBilletsAction => ({
    type: 'CLEAR_DEPOSIT_BILLETS',
    payload
});
