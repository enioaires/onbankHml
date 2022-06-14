export const REQUEST_SEARCH_CLIENT = 'REQUEST_SEARCH_CLIENT';
export const SEARCH_CLIENT_FAILURE = 'SEARCH_CLIENT_FAILURE';
export const SEARCH_CLIENT_SUCCESS = 'SEARCH_CLIENT_SUCCESS';
export const CLEAR_SEARCH_DATA = 'CLEAR_SEARCH_DATA';

export interface ISearchClientState {
    isLoading: boolean;
    error: boolean;
    isClient: boolean;
}
