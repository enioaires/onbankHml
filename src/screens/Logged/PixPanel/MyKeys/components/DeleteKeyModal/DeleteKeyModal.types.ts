import { Alias } from '../../MyKeys.types';

export interface DeleteKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedKey?: Alias;
    disableButton?: boolean;
}
