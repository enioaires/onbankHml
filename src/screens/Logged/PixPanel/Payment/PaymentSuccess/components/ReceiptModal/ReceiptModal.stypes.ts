export interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: string;
    type?: string;
}
