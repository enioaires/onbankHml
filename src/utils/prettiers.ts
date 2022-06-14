import { formatCNPJ, formatCPF } from '@brazilian-utils/brazilian-utils';
// export const pretifyStatementDate = (date: string) => {
//     let [year, month, day, ...rest] = date.split('-');
//     day = day.substring(0, 2);
//     return `${day}/${month}`;
// };

// export const pretifyCurrency = (money: number) => {
//     let [paper, coin] = money.toString().split('.');
//     if (coin) {
//         if (coin.length === 1) {
//             coin += '0';
//         }
//     } else {
//         coin = '00';
//     }
//     return `${paper},${coin}`;
// };

export const prefityNames = (name: string) => {
    const allNames = name.split(' ');
    let fullName = '';

    allNames.forEach((splitName: string, index: number) => {
        fullName += `${splitName.charAt(0).toUpperCase()}${splitName
            .substring(1)
            .toLowerCase()}`;
        if (index < allNames.length - 1) {
            fullName += ' ';
        }
    });

    return fullName;
};

export const pretifyMonth = (month: string) => {
    switch (month) {
        case '1':
            return 'Jan';
        case '2':
            return 'Fev';
        case '3':
            return 'Mar';
        case '4':
            return 'Abr';
        case '5':
            return 'Mai';
        case '6':
            return 'Jun';
        case '7':
            return 'Jul';
        case '8':
            return 'Ago';
        case '9':
            return 'Set';
        case '10':
            return 'Out';
        case '11':
            return 'Nov';
        case '12':
            return 'Dez';
        default:
            return '';
    }
};

export const maskPhoneNumber = (phoneNumber: string) => {
    const ddd = phoneNumber.replace(/\D/g, '').substring(0, 2);
    const prefix = phoneNumber.replace(/\D/g, '').substring(2, 3);
    const four = phoneNumber.replace(/\D/g, '').substring(3, 7);
    const eight = phoneNumber.replace(/\D/g, '').substring(7);

    return `(${ddd}) ${prefix}${four}-${eight}`;
};

export const maskDocumentNumber = (documentNumber: string) => {
    if (documentNumber.length > 11) {
        return formatCNPJ(documentNumber, { pad: true });
    }
    return formatCPF(documentNumber, { pad: true });
};

export const maskCardNumber = (cardNumber: string) => {
    return `**** **** **** ${cardNumber.substr(cardNumber.length - 4)}`;
};

export const maskSecureCpfDocumentNumber = (cpf: string) => {
    return `***.${cpf.substr(3,3)}.${cpf.substr(6,3)}-**`
}