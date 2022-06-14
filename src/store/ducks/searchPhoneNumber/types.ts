export const REQUEST_SEARCH_PHONE_NUMBER = 'REQUEST_SEARCH_PHONE_NUMBER';
export const SEARCH_PHONE_NUMBER_FAILURE = 'SEARCH_PHONE_NUMBER_FAILURE';
export const SEARCH_PHONE_NUMBER_SUCCESS = 'SEARCH_PHONE_NUMBER_SUCCESS';
export const CLEAR_SEARCH_DATA = 'CLEAR_SEARCH_DATA';

export interface ISearchPhoneNumberState {
    isLoading: boolean;
    error: boolean;
}
