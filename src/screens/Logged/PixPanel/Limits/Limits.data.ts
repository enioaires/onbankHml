export const LIMITS_TYPES = [
    {
        icon: require('../../../../../assets/icons/logo-pix-color.png'),
        name: 'Limites PIX',
        type: 'transfer'
    },
    {
        icon: require('../../../../../assets/icons/pix-saque.png'),
        name: 'Limites PIX Saque',
        type: 'withdraw'
    },
    {
        icon: require('../../../../../assets/icons/pix-troco.png'),
        name: 'Limites PIX Troco',
        type: 'change'
    },
    {
        icon: require('../../../../../assets/icons/pix-pagar-banco.png'),
        name: 'Limites transferência bancária',
        type: 'bank_transfer'
    }
];

export const LimitsTypeTitle: { [key: string]: string } = {
    transfer: 'Limites de transferência',
    withdraw: 'Limites de saque',
    change: 'Limites de troco',
    bank_transfer: 'Limites de transferência com dados bancários'
};

export const OnwershipTypeTitle: {
    [key: string]: string;
} = {
    same: 'Mesma titularidade',
    other: 'Outra titularidade PF',
    otherLegalEntity: 'Outra titularidade PJ'
};

export const operationTitle: {
    [key: string]: string;
} = {
    paymentQrCode: 'Pagamentos QR Code',
    transferPIX: 'Transferências',
    unity: 'Transação unitária'
};

export const periodLabel: { [key: string]: string } = {
    dailyTime: 'Diurno',
    nightTime: 'Noturno'
};

export const perioTypeLabel: { [key: string]: string } = {
    daily: 'Diário',
    monthly: 'Mensal'
};

export const operationsWithUnityLimit = ['transfer'];
