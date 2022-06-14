import { IUserNavOptions } from '../../../../../utils/types';

const depositIcon = require('../../../../../../assets/icons/new_icons/receive.png');
const paymentIcon = require('../../../../../../assets/icons/new_icons/pix.png');
const transferIcon = require('../../../../../../assets/icons/new_icons/pay.png');
const statementIcon = require('../../../../../../assets/icons/new_icons/statement.png');
const perfilIcon = require('../../../../../../assets/icons/new_icons/profile.png');
const rechargeIcon = require('../../../../../../assets/icons/new_icons/recharge.png');
const helpIcon = require('../../../../../../assets/icons/new_icons/help.png');
const inviteIcon = require('../../../../../../assets/icons/new_icons/add-friend.png');
const walletIcon = require('../../../../../../assets/icons/new_icons/wallet.png');
const cashbackIcon = require('../../../../../../assets/icons/new_icons/cashback.png');
const cardIcon = require('../../../../../../assets/icons/new_icons/card.png');

export const USER_NAV_OPTIONS: IUserNavOptions[] = [
    {
        screenName: 'PixPanel',
        label: 'Pix',
        icon: paymentIcon
    },
    {
        screenName: 'Statement',
        label: 'Extrato',
        icon: statementIcon
    },
    {
        screenName: 'Transfer',
        label: 'Transferir',
        icon: transferIcon
    },
    {
        screenName: 'Deposit',
        label: 'Depositar',
        icon: depositIcon
    },
    {
        screenName: 'Invite',
        label: 'Convidar   amigo',
        icon: inviteIcon
    },
    // {
    //     screenName: 'Payments',
    //     label: 'Pagar',
    //     icon: paymentIcon
    // },

    {
        screenName: 'Card',
        label: 'Cartão',
        icon: cardIcon
    },
    {
        screenName: 'Cashback',
        label: 'Cashback',
        icon: cashbackIcon
    },
    {
        screenName: 'UserHelp',
        label: 'Ajuda!',
        icon: helpIcon
    },
    {
        screenName: 'Perfil',
        label: 'Perfil',
        icon: perfilIcon
    },
    {
        screenName: 'Recharge',
        label: 'Recarga de Celular',
        icon: rechargeIcon
    },

    // {
    //     screenName: 'Receive',
    //     label: 'Receber',
    //     icon: receiveIcon
    // },
    {
        screenName: 'Wallet',
        label: 'Carteira',
        icon: walletIcon
    }
];
