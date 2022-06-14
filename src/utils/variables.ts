import { IUserNavOptions } from './types';

// USER_NAV_OPTIONS images
const depositIcon = require('../../assets/icons/menu-deposit.png');
const paymentIcon = require('../../assets/icons/menu-payment.png');
const transferIcon = require('../../assets/icons/menu-transfer.png');
const statementIcon = require('../../assets/icons/menu-statement.png');
const perfilIcon = require('../../assets/icons/menu-perfil.png');
const rechargeIcon = require('../../assets/icons/menu-recharge.png');
const helpIcon = require('../../assets/icons/menu-help.png');
const inviteIcon = require('../../assets/icons/invite.png');
const walletIcon = require('../../assets/icons/menu-wallet.png');
const receiveIcon = require('../../assets/icons/menu-receive.png');

// RECHARGE_SERVICES_OPTIONS images
const defaultIcon = require('../../assets/icons/recharge.png');
const uberIcon = require('../../assets/icons/logo-uber.png');
const ifoodIcon = require('../../assets/icons/logo-ifood.png');
const netflixIcon = require('../../assets/icons/logo-netflix.png');
const googleplayIcon = require('../../assets/icons/logo-googleplay.png');
const skyIcon = require('../../assets/icons/logo-sky.png');
const spotifyIcon = require('../../assets/icons/logo-spotify.png');
const ggcreditsIcon = require('../../assets/icons/logo-ggcredits.png');
const alphaSegurosIcon = require('../../assets/icons/alpha-seguros.png');

const APP_VERSION = '1.0.51';
const NO_CONEXION_MESSAGE = 'Verifique sua conexão de internet';

const USER_NAV_OPTIONS: IUserNavOptions[] = [
    {
        screenName: 'Payments',
        label: 'Pagar',
        icon: paymentIcon
    },
    {
        screenName: 'Deposit',
        label: 'Depositar',
        icon: depositIcon
    },
    {
        screenName: 'Transfer',
        label: 'Transferir',
        icon: transferIcon
    },
    {
        screenName: 'Statement',
        label: 'Extrato',
        icon: statementIcon
    },
    {
        screenName: 'Card',
        label: 'Cartão',
        iconName: 'credit-card-alt'
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
    },
    {
        screenName: 'Cashback',
        label: 'Cashback',
        icon: receiveIcon
    },
    {
        screenName: 'Invite',
        label: 'Convidar   amigo',
        icon: inviteIcon
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
    }
];

export const RECHARGE_SERVICES_OPTIONS = [
    {
        serviceName: 'default',
        serviceIcon: defaultIcon
    },
    {
        serviceName: 'UBER',
        serviceIcon: uberIcon,
        description: ''
    },
    {
        serviceName: 'IFOOD',
        serviceIcon: ifoodIcon
    },
    {
        serviceName: 'SPOTIFY',
        serviceIcon: spotifyIcon
    },
    {
        serviceName: 'GG',
        serviceIcon: ggcreditsIcon
    },
    {
        serviceName: 'SKY',
        serviceIcon: skyIcon
    },
    {
        serviceName: 'NETFLIX',
        serviceIcon: netflixIcon
    },
    {
        serviceName: 'GOOGLE',
        serviceIcon: googleplayIcon
    }
];

export const RECHARGE_SERVICES_ICONS: { [key: string]: any } = {
    default: defaultIcon,
    'Google Play': googleplayIcon,
    Netflix: netflixIcon,
    'SKY TV': skyIcon,
    'GG Credits Free Fire': ggcreditsIcon,
    Spotify: spotifyIcon,
    Ifood: ifoodIcon,
    Uber: uberIcon,
    'Seguro Vida': alphaSegurosIcon
};
export const RESTRICTED_ID_PIX = '7C352965-2C31-6C7E-945F-6A5455CFC97E';
const INSURANCE_INFO =
    'Morte Acidental\n\n Garante ao(s) beneficiário(s) o pagamento de uma indenização em caso de falecimento do segurado, decorrente, exclusivamente, de acidente pessoal coberto, quando este ocorrer dentro do período de cobertura.\n\nInvalidez Permanente Total ou Parcial por Acidente\n\n Garante ao segurado o pagamento de uma indenização em caso de perda, redução ou impotência funcional definitiva, total ou parcial de um membro ou órgão em virtude de lesão física causada, exclusivamente, por acidente pessoal coberto com o segurado, quando este ocorrer dentro do período de cobertura, atestada por profissional legalmente habilitado.\n\nAssistência Funeral (Morte Acidental)\n\n Garante ao(s) beneficiário(s) a prestação dos serviços, em caso de falecimento do segurado ou o pagamento de um valor correspondente ao reembolso com as despesas com o funeral, decorrente exclusivamente, de acidente pessoal coberto, quando este ocorrer dentro do período de cobertura.\n\nAssistência Proteção Pessoal\n\n Garante a prestação de serviço em caso de acidente pessoal, assalto, agressão,roubo e furto envolvendo o titular, seu veículo ou residência e ferimentos pessoais,devidamente declarados às autoridades competentes.\n\n - Remoção Médica Inter Hospitalar\n - Traslado de Corpo\n - Transmissão de Mensagens Urgentes\n - Informação e Envio de Documentos em Casos de Perda ou Roubo\n - Informações sobre Bloqueio de Cartão de Crédito\n - Informações sobre Bloqueio de Celular\n\nAssistência Nutricional - Nutriline\n\n Avaliação de hábitos alimentares de forma qualitativa, fornecendo orientações práticas, promovendo assim uma rotina mais equilibrada e saudável.';

export { USER_NAV_OPTIONS, APP_VERSION, NO_CONEXION_MESSAGE, INSURANCE_INFO };

export const ENABLE_CREATE_ACCOUNT_DEMO_FLUX = [
    '8231E47A-1B32-4A0A-8DE9-437AEFA518DC',
    '8db4693516affb49',
    '685b38a4-201e-4232-9575-5e4e7e5a3e9a'
];

export const ENABLE_HML_BY_DEVICE_ID = [''];
