import React from 'react';

export interface ModalBottomProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    bodyHeight: number;
    modalBackgroundColor?: string;
    disabledBackdrop?: boolean;
}
