import {
    SHOW_MODAL_SUCCESS,
    CLOSE_MODAL_SUCCESS,
    SHOW_MODAL_NOTNAV_SUCCESS,
    CLOSE_MODAL_NOTNAV_SUCCESS
} from './types';

type ShowSuccessModalAction = {
    type: typeof SHOW_MODAL_SUCCESS;
    message: string;
};

type CloseSuccessModalAction = {
    type: typeof CLOSE_MODAL_SUCCESS;
    test?: string;
};

type ShowSuccessModalNotNavAction = {
    type: typeof SHOW_MODAL_NOTNAV_SUCCESS;
    message: string;
};

type CloseSuccessModalNotNavAction = {
    type: typeof CLOSE_MODAL_NOTNAV_SUCCESS;
    test?: string;
};

export type SuccessModalAction =
    | ShowSuccessModalAction
    | CloseSuccessModalAction
    | ShowSuccessModalNotNavAction
    | CloseSuccessModalNotNavAction;

export const showSuccessModalAction = (
    message: string
): ShowSuccessModalAction => ({
    type: 'SHOW_MODAL_SUCCESS',
    message
});

export const closeSuccessModalAction = (
    test?: string
): CloseSuccessModalAction => ({
    type: 'CLOSE_MODAL_SUCCESS',
    test
});
export const showSuccessModalNotNavAction = (
    message: string
): ShowSuccessModalNotNavAction => ({
    type: 'SHOW_MODAL_NOTNAV_SUCCESS',
    message
});

export const closeSuccessModalNotNavAction = (
    test?: string
): CloseSuccessModalNotNavAction => ({
    type: 'CLOSE_MODAL_NOTNAV_SUCCESS',
    test
});

