import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Types
import { IStatementData } from '../../store/ducks/statement/types';
import { SignUpStackList } from '../Auth/types';

export interface GeneralStackNavigationProps<
    RouteName extends keyof GeneralStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<GeneralStackList, RouteName>,
        StackNavigationProp<UserStackList, 'General'>
    >;
    route: RouteProp<GeneralStackList, RouteName>;
}
export interface DepositStackNavigationProps<
    RouteName extends keyof DepositStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<DepositStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Deposit'>
    >;
    route: RouteProp<DepositStackList, RouteName>;
}
export interface WalletStackNavigationProps<
    RouteName extends keyof WalletStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<WalletStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Wallet'>
    >;
    route: RouteProp<WalletStackList, RouteName>;
}
export interface CardStackNavigationProps<
    RouteName extends keyof CardStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<CardStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Card'>
    >;
    route: RouteProp<CardStackList, RouteName>;
}
export interface StatementStackNavigationProps<
    RouteName extends keyof StatementStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<StatementStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Statement'>
    >;
    route: RouteProp<StatementStackList, RouteName>;
}
export interface ReceiveStackNavigationProps<
    RouteName extends keyof ReceiveStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<ReceiveStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Receive'>
    >;
    route: RouteProp<ReceiveStackList, RouteName>;
}
export interface TransferStackNavigationProps<
    RouteName extends keyof TransferStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<TransferStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Transfer'>
    >;
    route: RouteProp<TransferStackList, RouteName>;
}

export interface PaymentsStackNavigationProps<
    RouteName extends keyof PaymentsStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<PaymentsStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Payments'>
    >;
    route: RouteProp<PaymentsStackList, RouteName>;
}
export interface PixPaymentsStackNavigationProps<
    RouteName extends keyof PixPaymentStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<PixPaymentStackList, RouteName>,
        StackNavigationProp<UserStackList, 'PixPayment'>
    >;
    route: RouteProp<PixPaymentStackList, RouteName>;
}
export interface RechargeStackNavigationProps<
    RouteName extends keyof RechargeStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<RechargeStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Recharge'>
    >;
    route: RouteProp<RechargeStackList, RouteName>;
}

export interface RechargeServicesStackNavigationProps<
    RouteName extends keyof RechargeServicesStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<RechargeServicesStackList, RouteName>,
        StackNavigationProp<UserStackList, 'RechargeServices'>
    >;
    route: RouteProp<RechargeServicesStackList, RouteName>;
}

export interface InsuranceStackNavigationProps<
    RouteName extends keyof InsuranceStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<InsuranceStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Insurance'>
    >;
    route: RouteProp<InsuranceStackList, RouteName>;
}
export interface CashbackStackNavigationProps<
    RouteName extends keyof CashbackStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<CashbackStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Cashback'>
    >;
    route: RouteProp<CashbackStackList, RouteName>;
}

export interface PerfilStackNavigationProps<
    RouteName extends keyof PerfilStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<PerfilStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Perfil'>
    >;
    route: RouteProp<PerfilStackList, RouteName>;
}

export interface AddAddressStackNavigationProps<
    RouteName extends keyof AddAddressStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<AddAddressStackList, RouteName>,
        StackNavigationProp<UserStackList, 'AddAddress'>
    >;
    route: RouteProp<AddAddressStackList, RouteName>;
}

export interface AddTransactionPasswordStackNavigationProps<
    RouteName extends keyof AddTransactionPasswordStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<AddTransactionPasswordStackList, RouteName>,
        StackNavigationProp<UserStackList, 'AddTransactionPassword'>
    >;
    route: RouteProp<AddTransactionPasswordStackList, RouteName>;
}

export interface UserHelpStackNavigationProps<
    RouteName extends keyof UserHelpStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<UserHelpStackList, RouteName>,
        StackNavigationProp<UserStackList, 'UserHelp'>
    >;
    route: RouteProp<UserHelpStackList, RouteName>;
}

export interface InviteStackNavigationProps<
    RouteName extends keyof InviteStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<InviteStackList, RouteName>,
        StackNavigationProp<UserStackList, 'Invite'>
    >;
    route: RouteProp<InviteStackList, RouteName>;
}

export type UserStackList = {
    General: {
        screen: keyof GeneralStackList;
        params?: GeneralStackList[keyof GeneralStackList];
    };
    Deposit: {
        screen: keyof DepositStackList;
        params?: DepositStackList[keyof DepositStackList];
    };
    Wallet: {
        screen: keyof WalletStackList;
        params?: WalletStackList[keyof WalletStackList];
    };
    Card: { screen: keyof CardStackList };
    Statement: {
        screen: keyof StatementStackList;
        params?: StatementStackList[keyof StatementStackList];
    };
    Receive: { screen: keyof ReceiveStackList };
    Transfer: { screen: keyof TransferStackList };
    Payments: { screen: keyof PaymentsStackList };
    Recharge: { screen: keyof RechargeStackList };
    Perfil: {
        screen: keyof PerfilStackList;
        params?: PerfilStackList[keyof PerfilStackList];
    };
    AddAddress: { screen: keyof AddAddressStackList };
    AddTransactionPassword: { screen: keyof AddTransactionPasswordStackList };
    UserHelp: { screen: keyof UserHelpStackList };
    Invite: {
        screen: keyof InviteStackList;
        params?: InviteStackList[keyof InviteStackList];
    };
    PixPayment: {
        screen: keyof PixPaymentStackList;
        params?: PixPaymentStackList[keyof PixPaymentStackList];
    };
    RechargeServices: {
        screen: keyof RechargeServicesStackList;
        params?: any;
    };
    Insurance: { screen: keyof InsuranceStackList };
    Cashback: {
        screen: keyof CashbackStackList;
        params?: any;
    };
    CreateAccount?: {
        screen: keyof SignUpStackList;
    };
    PixPanel: {
        screen: keyof PixPanelStackList;
    };
};

export type GeneralStackList = {
    Home: undefined;
    TransactionPassword: {
        action: (password?: string) => void;
        url?: string;
        isCreditCardPayment?: boolean;
        clearStateAction?: () => void;
        onFillPassword?: (password: string) => void;
    };
    Receipt: undefined;
    Terms: undefined;
    ContestType: undefined;
    ContestOptions: { isVirtual: boolean };
    ContestDone: undefined;
};

export type DepositStackList = {
    Option: undefined;
    Value: { method: 'billet' | 'transfer' };
    Billet: undefined;
    TedOption: undefined;
    BilletTed: undefined;
    History: undefined;
    HistoryBillet: {
        url: string;
        barcode: string;
        value: number;
        dueDate: string;
    };
};

export type WalletStackList = {
    Option: undefined;
    NewCard: { feature: 'Payment' | 'QRCodeConfirmation' | null };
    NewAddressZipcode: { feature: 'Payment' | 'QRCodeConfirmation' | null };
    NewAddress: {
        blockedInputs: string[];
        feature: 'Payment' | 'QRCodeConfirmation' | null;
    };
};

export type CardStackList = {
    Active: undefined;
    Traffic: undefined;
    Activate: undefined;
    ChooseNameCard: undefined;
};

export type StatementStackList = {
    Initial: undefined;
    Schedule: {
        item: IStatementData;
    };
};

export type ReceiveStackList = {
    Option: undefined;
    Value: undefined;
    QRCode: undefined;
    PixQRCode: undefined;
};

export type TransferStackList = {
    Latest: undefined;
    IntOptions: undefined;
    DocumentNumber: undefined;
    SearchAccount: undefined;
    IntDocumentNumber: undefined;
    Name: undefined;
    Branch: undefined;
    Account: undefined;
    Amount: undefined;
    Banks: undefined;
    Confirmation: undefined;
};

export type PaymentsStackList = {
    Option: undefined;
    Camera: undefined;
    BarCode: undefined;
    Payment: { isDemoVerify: boolean };
    CreditInstallments: undefined;
    QRCodeScan: undefined;
    QRCodeConfirmation: undefined;
    Amount: undefined;
};

export type RechargeStackList = {
    Latest: undefined;
    Number: undefined;
    Operators: undefined;
    Values: undefined;
    Confirmation: undefined;
};

export type RechargeServicesStackList = {
    Option: undefined;
    Service: {
        item: {
            category: number;
            name: string;
            providerId: number;
            RegionaisnameProvider: any[];
            TipoRecarganameProvider: number;
            maxValue: number;
            minValue: number;
        };
    };
    Latest: undefined;
    History: undefined;
};

export type InsuranceStackList = {
    Option: undefined;
    Insurance: undefined;
    UserInsurance: undefined;
    Latest?: { edit: boolean; cancel?: boolean };
    Income?: { edit: boolean };
    MaritalState?: { edit: boolean };
    Confirmation?: {
        edit: boolean;
        type: 'maritalState' | 'income' | 'beneficiary';
    };
    Beneficiary?: { edit: boolean };
    Percent?: { edit: boolean };
    ValidateToken: undefined;
};

export type PerfilStackList = {
    Main: undefined;
    SignUpData: { isCardRequest?: boolean };
    ChangePhone: undefined;
    ChangeEmail: undefined;
    NewAccessPassword: undefined;
    NewAccessPasswordConfirmation: undefined;
    NewTransactionPassword: undefined;
    NewTransactionPasswordConfirmation: undefined;
    SelfieCamera: undefined;
    DocumentCamera: undefined;
    Preview: { image: string; upload: 'selfie' | 'cnhrg' };
    ValidateAccess: {
        action?: () => void;
        phone?: string;
        code?: string;
        oldPhoneNumber?: string;
        registerKey?: boolean;
    };
    ZipCode: { isCardRequest?: boolean };
    Address: {
        isCardRequest?: boolean;
        blockedInputs: string[];
        address?: {
            street?: string;
            district?: string;
            city?: string;
            state?: string;
            postalCode?: string;
        };
    };
};

export type AddAddressStackList = {
    Zipcode: undefined;
    Address: undefined;
};

export type AddTransactionPasswordStackList = {
    Password: undefined;
    PasswordConfirmation: undefined;
};

export type UserHelpStackList = {
    Options: undefined;
    FAQ: undefined;
    Chat: undefined;
};

export type InviteStackList = {
    Main: undefined;
    Email: undefined;
    Promocode: {
        type: 'generate';
    };
    AccountsList: undefined;
};

export type PixPaymentStackList = {
    Option: undefined;
    PixKeyOption: undefined;
    Value: {
        type: 'CPF-CNPJ' | 'Email' | 'Phone' | 'Evp';
    };
    Amount: undefined;
    Confirmation: undefined;
};

export type CashbackStackList = {
    CashbackStatement: undefined;
};

export type PixPanelStackList = {
    Panel: undefined;
    MyKeys: undefined;
    RegisterKey: undefined;
    RequestPortability: undefined;
    RequestPortabilitySuccess: undefined;
    Payment: undefined;
    PaymentCopyPaste: undefined;
    PaymentAmount: undefined;
    ConfirmTransfer: undefined;
    Receipt: undefined;
    Withdraw: undefined;
    Change: undefined;
    PaymentAmountPanel: undefined;
    PaymentSuccessPanel: undefined;
    ConfirmTransferPanel: undefined;
    PaymentCopyPastePanel: undefined;
    Receive: undefined;
    Limits: undefined;
};
