export interface ModalConfirmCodeProps {
    title: string;
    onClose: () => void;
    isOpen: boolean;
    onPressConfirm: (code: string) => void;
    timeToResendCode: number;
    onClickResendCode: () => void;
    disableButton?: boolean;
    loading?: boolean;
    textButton?: string;
}
