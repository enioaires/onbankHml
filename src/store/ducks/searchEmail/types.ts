export const REQUEST_SEARCH_EMAIL = 'REQUEST_SEARCH_EMAIL';
export const SEARCH_EMAIL_FAILURE = 'SEARCH_EMAIL_FAILURE';
export const SEARCH_EMAIL_SUCCESS = 'SEARCH_EMAIL_SUCCESS';
export const CLEAR_SEARCH_EMAIL_DATA = 'CLEAR_SEARCH_EMAIL_DATA';

export interface ISearchEmailState {
    isLoading: boolean;
    error: boolean;
}
