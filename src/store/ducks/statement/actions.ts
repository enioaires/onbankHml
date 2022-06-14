import { GeneralStackNavigationProps } from '../../../routes/Logged/types';
import {
    IStatementData,
    IStatementSearchButton,
    REQUEST_STATEMENT,
    STATEMENT_REQUEST_FAILURE,
    STATEMENT_REQUEST_SUCCESS,
    CHANGE_STATEMENT_PAYLOAD,
    SET_STATEMENT_MONTH_BUTTONS,
    GET_STATEMENT_MONTH_BUTTONS,
    CLEAR_STATEMENT_DATA,
    CHANGE_STATEMENT_FILTERS,
    DEBIT_CHARGE_CONTEST,
    DEBIT_CHARGE_CONTEST_FAILURE,
    DEBIT_CHARGE_CONTEST_SUCCESS,
    GET_LASTWEEK_STATEMENT,
    IStatementState,
    StatementFilterType,
    StatementFilterPeriod,
    StatementFilter
} from './types';

export type DebitChargeContestAction = {
    type: typeof DEBIT_CHARGE_CONTEST;
    reason: string;
    transactionId: string;
    navigation: GeneralStackNavigationProps<'ContestOptions'>['navigation'];
    isVirtual: boolean;
};

type DebitChargeContestFailureAction = {
    type: typeof DEBIT_CHARGE_CONTEST_FAILURE;
};

type DebitChargeContestSuccessAction = {
    type: typeof DEBIT_CHARGE_CONTEST_SUCCESS;
};

type ChangeStatementFiltersAction = {
    type: typeof CHANGE_STATEMENT_FILTERS;
    key: keyof IStatementState['filters'];
    value: StatementFilterType & StatementFilterPeriod & StatementFilter;
};

type GetStatementDataAction = {
    type: typeof REQUEST_STATEMENT;
};

type ClearStatementDataAction = {
    type: typeof CLEAR_STATEMENT_DATA;
};

type DidStatementRequestFailAction = {
    type: typeof STATEMENT_REQUEST_FAILURE;
};

type DidStatementRequestSucceedAction = {
    type: typeof STATEMENT_REQUEST_SUCCESS;
    data: IStatementData[];
};

type ChangeStatementPayloadAction = {
    type: typeof CHANGE_STATEMENT_PAYLOAD;
    payload: IStatementSearchButton;
};

type SetStatementMonthButtonsAction = {
    type: typeof SET_STATEMENT_MONTH_BUTTONS;
    payload: IStatementSearchButton[];
};

type GetStatementMonthButtonsAction = {
    type: typeof GET_STATEMENT_MONTH_BUTTONS;
};

type GetLastWeekStatementAction = {
    type: typeof GET_LASTWEEK_STATEMENT;
    data: IStatementData[];
};

export type StatementsAction =
    | GetStatementDataAction
    | ClearStatementDataAction
    | DidStatementRequestFailAction
    | DidStatementRequestSucceedAction
    | ChangeStatementPayloadAction
    | SetStatementMonthButtonsAction
    | GetStatementMonthButtonsAction
    | ChangeStatementFiltersAction
    | DebitChargeContestAction
    | DebitChargeContestFailureAction
    | DebitChargeContestSuccessAction
    | GetLastWeekStatementAction;

export const debitChargeContestAction = (
    reason: string,
    transactionId: string,
    navigation: GeneralStackNavigationProps<'ContestOptions'>['navigation'],
    isVirtual: boolean
): DebitChargeContestAction => ({
    type: 'DEBIT_CHARGE_CONTEST',
    reason,
    transactionId,
    navigation,
    isVirtual
});

export const debitChargeContestFailureAction = (): DebitChargeContestFailureAction => ({
    type: 'DEBIT_CHARGE_CONTEST_FAILURE'
});

export const debitChargeContestSuccessAction = (): DebitChargeContestSuccessAction => ({
    type: 'DEBIT_CHARGE_CONTEST_SUCCESS'
});

export const changeStatementFiltersAction = (
    key: keyof IStatementState['filters'],
    value: StatementFilterPeriod & StatementFilterPeriod & StatementFilter
): ChangeStatementFiltersAction => ({
    type: 'CHANGE_STATEMENT_FILTERS',
    key,
    value
});

export const getStatementDataAction = (): GetStatementDataAction => ({
    type: 'REQUEST_STATEMENT'
});

export const clearStatementDataAction = (): ClearStatementDataAction => ({
    type: 'CLEAR_STATEMENT_DATA'
});

export const didStatementRequestFailAction = (): DidStatementRequestFailAction => ({
    type: 'STATEMENT_REQUEST_FAILURE'
});

export const didStatementRequestSucceedAction = (
    data: IStatementData[]
): DidStatementRequestSucceedAction => ({
    type: 'STATEMENT_REQUEST_SUCCESS',
    data
});

export const changeStatementPayloadAction = (
    payload: IStatementSearchButton
): ChangeStatementPayloadAction => ({
    type: 'CHANGE_STATEMENT_PAYLOAD',
    payload
});

export const setStatementMonthButtonsAction = (
    payload: IStatementSearchButton[]
): SetStatementMonthButtonsAction => ({
    type: 'SET_STATEMENT_MONTH_BUTTONS',
    payload
});

export const getStatementMonthButtonsAction = (): GetStatementMonthButtonsAction => ({
    type: 'GET_STATEMENT_MONTH_BUTTONS'
});

export const getLastWeekStatementAction = (
    data: IStatementData[]
): GetLastWeekStatementAction => ({
    type: 'GET_LASTWEEK_STATEMENT',
    data
})
