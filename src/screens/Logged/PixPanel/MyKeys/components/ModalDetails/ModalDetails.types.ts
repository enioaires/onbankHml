import { Alias } from '../../MyKeys.types';

export interface ModalDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteKey: () => void;
    selectedKey?: Alias;
}
