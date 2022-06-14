import { Alias } from '../../MyKeys.types';

export interface PortabilityRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCancelRequest: () => void;
    selectedKey?: Alias;
}
