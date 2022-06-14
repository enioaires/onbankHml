export interface PaymentOption {
    name: string;
    icon: any;
    screen: string;
    size?: any;
}
export const paymentOptions: PaymentOption[] = [
    {
        name: 'Pagar com Chave Pix',
        icon: require('../../../../../assets/icons/new_icons/key.png'),
        screen: 'PaymentPixKey',
        size: { width: 24, height: 24 }
    },
    {
        name: 'Pagar com QR Code',
        icon: require('../../../../../assets/icons/new_icons/qrcode.png'),
        screen: 'PaymentPixQRCode',
        size: { width: 24, height: 24 }
    },
    {
        name: 'Pagar com Pix Copia e Cola',
        icon: require('../../../../../assets/icons/new_icons/copy-paste.png'),
        screen: 'PaymentCopyPaste',
        size: { width: 24, height: 24 }
    },
    {
        name: 'Pagar com Dados Bancários',
        icon: require('../../../../../assets/icons/new_icons/bank.png'),
         screen: 'PaymentBankData',
        size: { width: 24, height: 24 }
    }
];
