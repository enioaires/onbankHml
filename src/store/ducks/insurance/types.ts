export const GET_INSURANCES = 'GET_INSURANCES';
export const GET_INSURANCES_SUCCESS = 'GET_INSURANCES_SUCCESS';
export const GET_INSURANCES_FAIL = 'GET_INSURANCES_FAIL';
export const CHANGE_INSURANCE_SELECTED = 'CHANGE_INSURANCE_SELECTED';
export const CHANGE_INSURANCE_PAYLOAD = 'CHANGE_INSURANCE_PAYLOAD';
export const CHANGE_BENEFICIARY_LIST = 'CHANGE_BENEFICIARY_LIST';
export const GET_OPTIONS_INSURANCE = 'GET_OPTIONS_INSURANCE';
export const GET_OPTIONS_INSURANCE_SUCCESS = 'GET_OPTIONS_INSURANCE_SUCCESS';
export const GET_OPTIONS_INSURANCE_FAIL = 'GET_OPTIONS_INSURANCE_FAIL';
export const REQUEST_INSURANCE = 'REQUEST_INSURANCE';
export const REQUEST_INSURANCE_SUCCESS = 'REQUEST_INSURANCE_SUCCESS';
export const REQUEST_INSURANCE_FAIL = 'REQUEST_INSURANCE_FAIL';
export const GET_BENEFICIARYS = 'GET_BENEFICIARYS';
export const GET_BENEFICIARYS_SUCCESS = 'GET_BENEFICIARYS_SUCCESS';
export const GET_BENEFICIARYS_FAIL = 'GET_BENEFICIARYS_FAIL';
export const CLEAR_INSURANCE_STATE = 'CLEAR_INSURANCE_STATE';
export const POST_BENEFICIARYS = 'POST_BENEFICIARYS';
export const POST_BENEFICIARYS_SUCCESS = 'POST_BENEFICIARYS_SUCCESS';
export const POST_BENEFICIARYS_FAIL = 'POST_BENEFICIARYS_FAIL';
export const PUT_OPTION = 'PUT_OPTION';
export const PUT_OPTION_SUCCESS = 'PUT_OPTION_SUCCESS';
export const PUT_OPTION_FAIL = 'PUT_OPTION_FAIL';
export const REQUEST_USER_INSURANCE_SUCCESS = 'REQUEST_USER_INSURANCE_SUCCESS';
export const CANCEL_INSURANCE = 'CANCEL_INSURANCE';
export const CANCEL_INSURANCE_SUCCESS = 'CANCEL_INSURANCE_SUCCESS';
export const CANCEL_INSURANCE_FAIL = 'CANCEL_INSURANCE_FAIL';
export const GET_VALIDATE_TOKEN = 'GET_VALIDATE_TOKEN';
export const GET_VALIDATE_TOKEN_SUCCESS = 'GET_VALIDATE_TOKEN_SUCCESS';
export const GET_VALIDATE_TOKEN_FAIL = 'GET_VALIDATE_TOKEN_FAIL';
export const GET_CERTIFIED = 'GET_CERTIFIED';
export const GET_CERTIFIED_SUCCESS = 'GET_CERTIFIED_SUCCESS';
export const GET_CERTIFIED_FAIL = 'GET_CERTIFIED_FAIL';
export const GET_INSURANCE_STATEMENT = 'GET_INSURANCE_STATEMENT';
export const GET_INSURANCE_STATEMENT_SUCCESS =
    'GET_INSURANCE_STATEMENT_SUCCESS';
export const GET_INSURANCE_STATEMENT_FAIL = 'GET_INSURANCE_STATEMENT_FAIL';

export interface IInsuranceState {
    payload: {
        maritalState: {
            code: number;
            name: string;
        };
        income: {
            code: number;
            name: string;
        };
    };
    insurancesList: IInsurance[];
    userInsurance: IUserInsurance;
    insuranceStatement: IInsuranceStatement[];
    insuranceSelected: IInsurance;
    maritalStateList: IMaritalState[];
    incomeRangeList: IIncome[];
    kinshipList: IKinship[];
    beneficiaryList: IBeneficiary[];
    validateToken: string;
    isLoading: boolean;
    certifiedIsLoading: boolean;
    hasError: boolean;
}

export interface IInsurance {
    id: string;
    name: string;
    urlImage: string;
    status: string;
    statusUser:
        | 'ATIVO'
        | 'VENCIDO'
        | 'INATIVO'
        | 'CANCELADO'
        | 'SOLICITADO'
        | 'ERROR';
    type: number;
    baseAmount: number;
    numberContract: string;
    numberSub: string;
    codePlan: string;
    codeCoverage: string;
    amountInsured: string;
    amountPremium: string;
    percentCalculationPremium: string;
    createDateTime: string;
    lastChangedDateTime: string;
    deletedAt: string | null;
}

export interface IMaritalState {
    code: number;
    name: string;
}

export interface IIncome {
    code: number;
    name: string;
}

export interface IKinship {
    code: number;
    name: string;
}

export interface IBeneficiary {
    name: string;
    percent: number;
    kinship: IKinship;
    id?: string;
}

export interface IOptionsInsurance {
    type: 'maritalStateList' | 'incomeRangeList' | 'kinshipList';
}

export interface IPayloadInsurance {
    transactionPassword: string;
    idProduct: string;
    segurado: {
        id_estado_civil: number;
        id_faixa_renda: number;
    };
    beneficiarios: {
        nm_beneficiario: string;
        cd_parentesco: number;
        pe_participacao: number;
    }[];
}

export interface IUserInsurance {
    saleId: string;
    statusCivil: number;
    incomeRange: number;
    payloadRequest: string;
    payloadResponse: string;
    ExternalKeyNumber: string;
    contractNumber: string;
    policyCode: string;
    certificateNumber: string;
    proposalCode: string;
    numberCapitalization: string;
    batchIdentifier: string;
    documentClient: string;
    amount: string;
    cancel: any;
    createDateTime: string;
    lastChangedDateTime: string;
    deletedAt: any;
    agent: any;
    product: IInsurance;
    branch: any;
    channel: any;
    dueDate: string;
    status:
        | 'ATIVO'
        | 'VENCIDO'
        | 'INATIVO'
        | 'CANCELADO'
        | 'SOLICITADO'
        | 'ERROR';
}

export interface IInsuranceStatement {
    id: string;
    operationDate: string;
    accountId: string;
    historyCode: string;
    transactionId: string;
    documentNumber: string;
    amount: string;
    createDateTime: string;
    lastChangedDateTime: string;
    deletedAt: any;
}
