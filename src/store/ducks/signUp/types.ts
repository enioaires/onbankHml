export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const CHANGE_SIGNUP_PAYLOAD = 'CHANGE_SIGNUP_PAYLOAD';
export const VALIDATE_SIGNUP_INPUTS = 'VALIDATE_SIGNUP_INPUTS';
export const CLEAR_SIGNUP_PAYLOAD = 'CLEAR_SIGNUP_PAYLOAD';
export const CHANGE_SIGNUP_TOTAL_STEPS = 'CHANGE_SIGNUP_TOTAL_STEPS';
export const DEMO_VALIDATE_ACCOUNT = 'DEMO_VALIDATE_ACCOUNT';
export const DEMO_VALIDATE_ACCOUNT_SUCCESS = 'DEMO_VALIDATE_ACCOUNT_SUCCESS';
export const DEMO_VALIDATE_ACCOUNT_FAILURE = 'DEMO_VALIDATE_ACCOUNT_FAILURE';
export const COMPLETE_DEMO_SIGNUP = 'COMPLETE_DEMO_SIGNUP';
export const COMPLETE_DEMO_SIGNUP_SUCCESS = 'COMPLETE_DEMO_SIGNUP_SUCCESS';
export const COMPLETE_DEMO_SIGNUP_FAILURE = 'COMPLETE_DEMO_SIGNUP_FAILURE';
export const SIGNUP_BY_LEITURISTA = 'SIGNUP_BY_LEITURISTA';
export interface ICompleteDemoSignupPayload {
    documentNumber: string;
    accountId: string;
    complement: string;
    street: string;
    state: string;
    promoCode: string;
    postalCode: string;
    city: string;
    number: string;
    neighborhood: string;
    country: string;
    hwid: string;
    typedUsername: string;
    typedMotherName: string;
    typedDocumentNumber: string;
    typedBirthDate: string;
    phoneNumber: string;
    email: string;
    tokenSdk: string;
}
export interface ISignUpPayload {
    fullName: string;
    birthDate: string;
    email: string;
    emailConfirmation: string;
    phone: string;
    documentNumber: string;
    sex: 'M' | 'F' | string;
    password: string;
    passwordConfirmation: string;
    companyName: string;
    representativeName: string;
    representativeTaxId: string;
    motherName: string;
    businessLine: string | null;
    establishmentForm: string | null;
    establishmentDate: string;
    existingCpf: string;
    existingPassword: string;
    postalCode: string;
    neighborhood: string;
    number: string;
    state: string;
    street: string;
    city: string;
    country: string;
    complement: string;
    accountId: string;
    promocode: string;
    tokenSdk: string;
    capacityFinancial: string;
}

export interface ISignUpData {
    token: string;
}

export interface ISignUpState {
    payload: ISignUpPayload;
    inputsValidation: ISignUpPayload;
    steps: number;
    data: ISignUpData;
    isLoading: boolean;
    error: boolean;
}
