import {
    ParamListBase,
    RouteProp,
    CompositeNavigationProp
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface StackNavigationProps<
    ParamsList extends ParamListBase,
    RouteName extends keyof ParamsList
> {
    navigation: StackNavigationProp<ParamsList, RouteName>;
    route: RouteProp<ParamsList, RouteName>;
}
export interface SignUpStackNavigationProps<
    RouteName extends keyof SignUpStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<SignUpStackList, RouteName>,
        StackNavigationProp<AuthStackList, 'SignUp'>
    >;
    route: RouteProp<SignUpStackList, RouteName>;
}

export interface HelpStackNavigationProps<
    RouteName extends keyof HelpStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<HelpStackList, RouteName>,
        StackNavigationProp<AuthStackList, 'Help'>
    >;
    route: RouteProp<HelpStackList, RouteName>;
}

export interface ResetPasswordStackNavigationProps<
    RouteName extends keyof ResetPasswordStackList
> {
    navigation: CompositeNavigationProp<
        StackNavigationProp<ResetPasswordStackList, RouteName>,
        StackNavigationProp<AuthStackList, 'ResetPassword'>
    >;
    route: RouteProp<ResetPasswordStackList, RouteName>;
}

export type SignUpStackList = {
    PromoCode: {
        promocode?: string;
    };
    DocumentNumber: { routeContext?: 'CreateAccount' };
    Sex: { routeContext?: 'CreateAccount' };
    Company: { routeContext?: 'CreateAccount' };
    BusinessArea: { routeContext?: 'CreateAccount' };
    ConstitutionForm: { routeContext?: 'CreateAccount' };
    ZipCode: { routeContext?: 'CreateAccount' };
    Address: { blockedInputs: string[]; routeContext?: 'CreateAccount' };
    Name: { routeContext?: 'CreateAccount' };
    RepresentativeTaxId: { routeContext?: 'CreateAccount' };
    ExistingRepresentative: { routeContext?: 'CreateAccount' };
    MotherName: { routeContext?: 'CreateAccount' };
    BirthDate: { routeContext?: 'CreateAccount' };
    Phone: { routeContext?: 'CreateAccount' };
    Email: { routeContext?: 'CreateAccount' };
    Password: { routeContext?: 'CreateAccount' };
    PasswordConfirmation: { routeContext?: 'CreateAccount' };
    Agreement: { routeContext?: 'CreateAccount' };
    Terms: {
        webView: 'Privacidade' | 'Termos';
        routeContext?: 'CreateAccount';
    };
    Confirmation: { routeContext?: 'CreateAccount' };
    CapacityFinancial: { routeContext?: 'CreateAccount' };
};

export type HelpStackList = {
    Options: undefined;
    FAQ: undefined;
    Chat: undefined;
};

export type ResetPasswordStackList = {
    NewPassword: { token?: string };
    NewPasswordConfirmation: { token: string };
};

export type AuthStackList = {
    OnBoarding: undefined;
    Login: undefined;
    ForgotPassword: undefined;
    SignUp:
        | {
              screen: keyof SignUpStackList;
              params?: SignUpStackList[keyof SignUpStackList];
          }
        | undefined;
    ResetPassword:
        | {
              screen: keyof ResetPasswordStackList;
              params?: ResetPasswordStackList[keyof ResetPasswordStackList];
          }
        | undefined;
    Help: { screen: keyof HelpStackList } | undefined;
    IsEmulator: undefined;
};
