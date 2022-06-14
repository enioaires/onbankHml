export interface ModalAlertProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    buttonText: string;
    buttonAction: () => void;
}
