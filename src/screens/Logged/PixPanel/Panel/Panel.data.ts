import { Opeartion } from './Panel.types';

export const operations: Opeartion[] = [
    {
        name: 'Pagar',
        icon: require('../../../../../assets/icons/new_icons/pay.png'),
        screen: 'Payment',
        size: { width: 24, height: 24 }
    },
    {
        name: 'Receber',
        icon: require('../../../../../assets/icons/new_icons/receive.png'),
        screen: 'Receive',
        size: { width: 24, height: 24 }
    },

    {
        name: 'Pix Saque',
        icon: require('../../../../../assets/icons/new_icons/withdraw.png'),
        screen: 'Withdraw',
        size: { width: 24, height: 24 }
    },
    {
        name: 'Pix Troco',
        icon: require('../../../../../assets/icons/new_icons/change.png'),
        screen: 'Change',
        size: { width: 24, height: 24 }
    },
    {
        name: 'Pix Copia e Cola',
        icon: require('../../../../../assets/icons/new_icons/copy-paste.png'),
        screen: 'PaymentCopyPastePanel',
        size: { width: 24, height: 24 }
    }
];
