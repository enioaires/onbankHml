import { Platform, Dimensions } from 'react-native';
import { IStatementSearchButton } from '../store/ducks/statement/types';
import { pretifyMonth } from './prettiers';

export const validateEmailInput = (value: string) => {
    return !!value.match(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    );
};

export const getFirstName = (fullName: string) => {
    let [firstName] = fullName.split(' ');
    firstName =
        firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
    return firstName;
};

export const milisecondsToDate = (miliseconds: number) => {
    const [month, day, year] = new Date(miliseconds)
        .toLocaleDateString('pt-BR')
        .split('/');
    return `${day}/${month}`;
};

export const transformToRequestStatementDate = (miliseconds?: number) => {
    if (Platform.OS === 'ios') {
        if (miliseconds) {
            const [month, day, year] = new Date(miliseconds)
                .toLocaleDateString('pt-BR')
                .split('/');
            return `${year}-${day}-${month}`;
        }

        const [month, day, year] = new Date()
            .toLocaleDateString('pt-BR')
            .split('/');
        return `${year}-${day}-${month}`;
    }
    if (miliseconds) {
        const [month, day, year] = new Date(miliseconds)
            .toLocaleDateString('pt-BR')
            .split('/');
        return `20${year}-${month}-${day}`;
    }

    const [month, day, year] = new Date()
        .toLocaleDateString('pt-BR')
        .split('/');
    return `20${year}-${month}-${day}`;
};

export const getMonthsButtonsData = (
    createdAccountDateMiliseconds: number,
    firstButton: IStatementSearchButton
) => {
    const currentDate = transformToRequestStatementDate();
    const [
        currentDateYear,
        currentDateMonth,
        currentDateDay
    ] = currentDate.split('-');
    const initialDate = transformToRequestStatementDate(
        createdAccountDateMiliseconds
    );
    const [
        initialDateYear,
        initialDateMonth,
        initialDateDay
    ] = initialDate.split('-');

    const currentDateYearNumber = parseInt(currentDateYear);
    const currentDateMonthNumber = parseInt(currentDateMonth);

    let initialDateYearNumber = parseInt(initialDateYear);
    let initialDateMonthNumber = parseInt(initialDateMonth);

    const monthsArray: IStatementSearchButton[] = [firstButton];

    while (initialDateYearNumber <= currentDateYearNumber) {
        while (initialDateMonthNumber <= currentDateMonthNumber) {
            monthsArray.push({
                label: `${pretifyMonth(
                    initialDateMonthNumber.toString()
                )}/${initialDateYearNumber}`,
                startDate: `${initialDateYearNumber}-${
                    initialDateMonthNumber < 10 && '0'
                }${initialDateMonthNumber}-01`,
                endDate: `${initialDateYearNumber}-${
                    initialDateMonthNumber < 10 && '0'
                }${initialDateMonthNumber}-${new Date(
                    initialDateYearNumber,
                    initialDateMonthNumber,
                    0
                ).getDate()}`
            });
            initialDateMonthNumber += 1;
        }

        initialDateYearNumber += 1;
    }

    return monthsArray;
};

export const transformToCurrencyPayload = (money: string) => {
    const value = money.replace(/\D/g, '');
    const paper = value.substring(0, value.length - 2);
    const cents = value.substring(value.length - 2);
    return `${paper}.${cents}`;
};

export const getNameInitials = (name: string) => {
    const allNames = name.split(' ');
    return `${allNames[0].charAt(0).toUpperCase()}${allNames[
        allNames.length - 1
    ]
        .charAt(0)
        .toUpperCase()}`;
};

export const isDeviceSmallScreen = (height = 800) => {
    return Dimensions.get('window').height < height;
};

export const getCreditCardBrand = (cardType: string, colored?: boolean) => {
    const visaIcon = require('../../assets/icons/visa.png');
    const visaColoredIcon = require('../../assets/icons/visa-colored.png');
    const mastercardIcon = require('../../assets/icons/mastercard.png');
    const eloIcon = require('../../assets/icons/elocard.png');
    const americanIcon = require('../../assets/icons/american-express.png');

    switch (cardType) {
        case 'visa':
            if (colored) return visaColoredIcon;
            return visaIcon;
        case 'mastercard':
        case 'master':
            return mastercardIcon;
        case 'elo':
            return eloIcon;
        case 'american-express':
        case 'amex':
            return americanIcon;
        default:
            return null;
    }
};

export const currencyToCurrencyString = (value: string) => {
    let [paper, cents] = value.split('.');
    if (!cents) {
        cents = '00';
    } else if (cents.length === 1) {
        cents += '0';
    }
    return `${paper}.${cents}`;
};
