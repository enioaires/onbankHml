export const REQUEST_STATEMENT = 'REQUEST_STATEMENT';
export const STATEMENT_REQUEST_FAILURE = 'STATEMENT_REQUEST_FAILURE';
export const STATEMENT_REQUEST_SUCCESS = 'STATEMENT_REQUEST_SUCCESS';
export const CHANGE_STATEMENT_PAYLOAD = 'CHANGE_STATEMENT_PAYLOAD';
export const SET_STATEMENT_MONTH_BUTTONS = 'SET_STATEMENT_MONTH_BUTTONS';
export const GET_STATEMENT_MONTH_BUTTONS = 'GET_STATEMENT_MONTH_BUTTONS';
export const CLEAR_STATEMENT_DATA = 'CLEAR_STATEMENT_DATA';
export const CHANGE_STATEMENT_FILTERS = 'CHANGE_STATEMENT_FILTERS';
export const DEBIT_CHARGE_CONTEST = 'DEBIT_CHARGE_CONTEST';
export const DEBIT_CHARGE_CONTEST_FAILURE = 'DEBIT_CHARGE_CONTEST_FAILURE';
export const DEBIT_CHARGE_CONTEST_SUCCESS = 'DEBIT_CHARGE_CONTEST_SUCCESS';
export const GET_LASTWEEK_STATEMENT = 'GET_LASTWEEK_STATEMENT';

export type StatementFilterType = 'all' | 'credit' | 'debit';
export type StatementFilterPeriod = 'period' | 'month';
export type StatementFilter = 'account' | 'wallet';
export interface IStatementSearchButton {
    startDate: string;
    endDate: string;
    label: string;
}

export interface IStatementFilter {
    period: StatementFilterPeriod;
    type: StatementFilterType;
    filter: StatementFilter;
}

export interface IStatementData {
    transactionId?: string;
    description: string;
    entryDate: string;
    creditDate: string;
    amount: number;
    type: string;
    counterpart?: {
        clientType: string;
        name: string;
        taxIdentifier: {
            taxId: string;
            country: string;
        };
    };
    historyCode: number;
    schedule?: boolean;
    cardLast4?: string;
    cardFlag?: string;
}

export interface IStatementState {
    data?: IStatementData[];
    lastWeekData?: IStatementData[];
    payload: IStatementSearchButton;
    filters: IStatementFilter;
    monthButtons: IStatementSearchButton[];
    isLoading: boolean;
    error: boolean;
}
