export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export interface IUserData {
    accountHolderId: string;
    account: {
        accountId: string;
        account: number;
        branch: number;
        mobilePhone: {
            country: string;
            phoneNumber: string;
        };
    };
    client: {
        name: string;
        taxIdentifier: {
            taxId: string;
            country: string;
        };
        mobilePhone: {
            country: string;
            phoneNumber: string;
        };
        email: string;
        hasKeys: boolean;
        hasSelfie: boolean;
        hasCnh: boolean;
        createdAccount: string;
        cardBiz: string;
        promoCode: string;
        isBeta: boolean;
        isDemo: boolean;
        termOfUse: boolean;
        isLeiturista?: boolean;
        isBlockRegisterKeyPix?: boolean;
    };
    billingAddress: {
        logradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
        pais: string;
    };
    clientType: string;
    additionalDetailsPerson?: {
        rg?: {
            number: string;
            issueDate: string;
            issuer: string;
            state: string;
        };
        birthDate: string;
        mother?: string;
    };
    additionalDetailsCorporate?: {
        companyName: string;
        businessLine: string;
        establishmentForm: string;
        establishmentDate: string;
        representatives: {
            name: string;
            taxIdentifier: {
                taxId: string;
                country: string;
            };
            mobilePhone: {
                country: string;
                phoneNumber: string;
            };
            email: string;
        }[];
        financialStatistic: number;
    };
    accountStatus: string;
    businessDay: boolean;
    financialLimit: {
        realBalanceLimit: number;
        monthlyFinancialInjectionLimit: number;
        realBalance: number;
        maxCreditLimit: number;
        currentMonthlyFinancialInjection: number;
    };
}

export interface IUserDataState {
    data: IUserData;
    isLoading: boolean;
    error: boolean;
}
