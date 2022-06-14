import {
    maskDocumentNumber,
    maskPhoneNumber,
    maskSecureCpfDocumentNumber
} from '../../../../../../utils/prettiers';

import { truncate } from '../../../../../../utils/truncate';

export const formatKey = (keyValue: string, keyType: string) => {
    const formattedKeys: { [string: string]: string } = {
        PHONE: maskPhoneNumber(keyValue),
        phoneNumber: maskPhoneNumber(keyValue),
        EMAIL: keyValue,
        EVP: truncate(keyValue, 30),
        TAX_ID: maskSecureCpfDocumentNumber(keyValue),
        documentNumber: maskDocumentNumber(keyValue)
    };
    return formattedKeys[keyType] || keyValue;
};

export const keyLabel: { [key: string]: string } = {
    PHONE: 'Celular',
    EMAIL: 'Email',
    EVP: 'Chave aleatoria',
    TAX_ID: 'CPF / CNPJ'
};

export const KEYS_PENDING_STATUS: string[] = [
    'PENDING_PORTABILITY_CONFIRMATION',
    'AWAITING_RETURN_PSP_DONOR',
    'PENDING_PORTABILITY_DICT',
    'USER_CONFIRMATION_PENDING_PORTABILITY'
];
