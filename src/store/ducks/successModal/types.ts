export const SHOW_MODAL_SUCCESS = 'SHOW_MODAL_SUCCESS';
export const CLOSE_MODAL_SUCCESS = 'CLOSE_MODAL_SUCCESS';
export const SHOW_MODAL_NOTNAV_SUCCESS = 'SHOW_MODAL_NOTNAV_SUCCESS';
export const CLOSE_MODAL_NOTNAV_SUCCESS = 'CLOSE_MODAL_NOTNAV_SUCCESS';

export interface ISuccessModalData {
    visible: boolean;
    message: string;
}

export interface ISuccessModalState {
    modal: ISuccessModalData;
    modalNotNav: ISuccessModalData;
}
