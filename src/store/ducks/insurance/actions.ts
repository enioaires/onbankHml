import {
    InsuranceStackNavigationProps,
    GeneralStackNavigationProps
} from '../../../routes/Logged/types';

import {
    GET_INSURANCES,
    GET_INSURANCES_FAIL,
    GET_INSURANCES_SUCCESS,
    CHANGE_INSURANCE_SELECTED,
    IInsurance,
    IMaritalState,
    CHANGE_INSURANCE_PAYLOAD,
    IIncome,
    CHANGE_BENEFICIARY_LIST,
    IBeneficiary,
    GET_OPTIONS_INSURANCE,
    GET_OPTIONS_INSURANCE_FAIL,
    GET_OPTIONS_INSURANCE_SUCCESS,
    IOptionsInsurance,
    IKinship,
    REQUEST_INSURANCE,
    REQUEST_INSURANCE_FAIL,
    REQUEST_INSURANCE_SUCCESS,
    IPayloadInsurance,
    GET_BENEFICIARYS,
    GET_BENEFICIARYS_FAIL,
    GET_BENEFICIARYS_SUCCESS,
    CLEAR_INSURANCE_STATE,
    POST_BENEFICIARYS,
    POST_BENEFICIARYS_FAIL,
    POST_BENEFICIARYS_SUCCESS,
    PUT_OPTION,
    PUT_OPTION_FAIL,
    PUT_OPTION_SUCCESS,
    REQUEST_USER_INSURANCE_SUCCESS,
    CANCEL_INSURANCE,
    CANCEL_INSURANCE_FAIL,
    CANCEL_INSURANCE_SUCCESS,
    GET_VALIDATE_TOKEN_FAIL,
    GET_VALIDATE_TOKEN_SUCCESS,
    GET_VALIDATE_TOKEN,
    GET_CERTIFIED,
    GET_CERTIFIED_FAIL,
    GET_CERTIFIED_SUCCESS,
    GET_INSURANCE_STATEMENT,
    GET_INSURANCE_STATEMENT_FAIL,
    GET_INSURANCE_STATEMENT_SUCCESS
} from './types';

export type GetInsurancesAction = {
    type: typeof GET_INSURANCES;
    navigation: GeneralStackNavigationProps<'Home'>['navigation'];
};
export type DidInsurancesSuccessAction = {
    type: typeof GET_INSURANCES_SUCCESS;
    payload: IInsurance[];
};
export type DidInsurancesFailAction = {
    type: typeof GET_INSURANCES_FAIL;
};
export type ChangeInsuranceSelectedAction = {
    type: typeof CHANGE_INSURANCE_SELECTED;
    payload: IInsurance;
};
export type ChangeInsurancePayloadAction = {
    type: typeof CHANGE_INSURANCE_PAYLOAD;
    key: 'maritalState' | 'income';
    payload: {
        code: number;
        name: string;
    };
};
export type ChangeBeneficiaryListAction = {
    type: typeof CHANGE_BENEFICIARY_LIST;
    payload: IBeneficiary[];
};
export type GetOptionsInsuranceAction = {
    type: typeof GET_OPTIONS_INSURANCE;
    payload: IOptionsInsurance;
};
export type DidOptionsInsuranceSuccessAction = {
    type: typeof GET_OPTIONS_INSURANCE_SUCCESS;
    listType: IOptionsInsurance;
    payload: IIncome[] | IKinship[] | IMaritalState[];
};
export type DidOptionsInsuranceFailAction = {
    type: typeof GET_OPTIONS_INSURANCE_FAIL;
};
export type RequestInsuranceAction = {
    type: typeof REQUEST_INSURANCE;
    navigation: InsuranceStackNavigationProps<'Confirmation'>['navigation'];
    password?: string;
};
export type DidRequestInsuranceSuccessAction = {
    type: typeof REQUEST_INSURANCE_SUCCESS;
};
export type DidRequestInsuranceFailAction = {
    type: typeof REQUEST_INSURANCE_FAIL;
};
export type GetBeneficiarysAction = {
    type: typeof GET_BENEFICIARYS;
};
export type DidBeneficiarysSuccessAction = {
    type: typeof GET_BENEFICIARYS_SUCCESS;
    payload: IBeneficiary[];
};
export type DidBeneficiarysFailAction = {
    type: typeof GET_BENEFICIARYS_FAIL;
};
export type ClearInsuranceStateAction = {
    type: typeof CLEAR_INSURANCE_STATE;
};
export type PostBeneficiarysAction = {
    type: typeof POST_BENEFICIARYS;
    navigation: InsuranceStackNavigationProps<'Confirmation'>['navigation'];
};
export type DidPostBeneficiarysSuccessAction = {
    type: typeof POST_BENEFICIARYS_SUCCESS;
};
export type DidPostBeneficiarysFailAction = {
    type: typeof POST_BENEFICIARYS_FAIL;
};
export type PutOptionAction = {
    type: typeof PUT_OPTION;
    optionType: 'maritalState' | 'income';
    navigation: InsuranceStackNavigationProps<'Confirmation'>['navigation'];
};
export type DidPutOptionSuccessAction = {
    type: typeof PUT_OPTION_SUCCESS;
};
export type DidPutOptionFailAction = {
    type: typeof PUT_OPTION_FAIL;
};
export type DidRequestUserInsuranceSuccessAction = {
    payload: any;
    type: typeof REQUEST_USER_INSURANCE_SUCCESS;
};
export type CancelInsuranceAction = {
    type: typeof CANCEL_INSURANCE;
    navigation: InsuranceStackNavigationProps<'UserInsurance'>['navigation'];
};
export type DidCancelInsuranceSuccessAction = {
    type: typeof CANCEL_INSURANCE_SUCCESS;
};
export type DidCancelInsuranceFailAction = {
    type: typeof CANCEL_INSURANCE_FAIL;
};

export type GetValidateTokenAction = {
    type: typeof GET_VALIDATE_TOKEN;
    navigation: GeneralStackNavigationProps<'Home'>['navigation'];
};
export type DidGetValidateTokenSuccessAction = {
    type: typeof GET_VALIDATE_TOKEN_SUCCESS;
    payload: string;
};
export type DidGetValidateTokenFailAction = {
    type: typeof GET_VALIDATE_TOKEN_FAIL;
};

export type GetCertifiedAction = {
    type: typeof GET_CERTIFIED;
};
export type DidGetCertifiedSuccessAction = {
    type: typeof GET_CERTIFIED_SUCCESS;
};
export type DidGetCertifiedFailAction = {
    type: typeof GET_CERTIFIED_FAIL;
};

export type GetInsuranceStatementAction = {
    type: typeof GET_INSURANCE_STATEMENT;
    payload: { userInsuranceId: string };
};
export type DidGetInsuranceStatementSuccessAction = {
    type: typeof GET_INSURANCE_STATEMENT_SUCCESS;
    payload: any;
};
export type DidGetInsuranceStatementFailAction = {
    type: typeof GET_INSURANCE_STATEMENT_FAIL;
};

export type InsuranceActions =
    | GetInsurancesAction
    | DidInsurancesSuccessAction
    | DidInsurancesFailAction
    | ChangeInsuranceSelectedAction
    | ChangeInsurancePayloadAction
    | ChangeBeneficiaryListAction
    | GetOptionsInsuranceAction
    | DidOptionsInsuranceSuccessAction
    | DidOptionsInsuranceFailAction
    | RequestInsuranceAction
    | DidRequestInsuranceSuccessAction
    | DidRequestInsuranceFailAction
    | GetBeneficiarysAction
    | DidBeneficiarysSuccessAction
    | DidBeneficiarysFailAction
    | ClearInsuranceStateAction
    | PostBeneficiarysAction
    | DidPostBeneficiarysSuccessAction
    | DidPostBeneficiarysFailAction
    | PutOptionAction
    | DidPutOptionSuccessAction
    | DidPutOptionFailAction
    | DidRequestUserInsuranceSuccessAction
    | CancelInsuranceAction
    | DidCancelInsuranceSuccessAction
    | DidCancelInsuranceFailAction
    | GetValidateTokenAction
    | DidGetValidateTokenSuccessAction
    | DidGetValidateTokenFailAction
    | GetCertifiedAction
    | DidGetCertifiedSuccessAction
    | DidGetCertifiedFailAction
    | GetCertifiedAction
    | DidGetCertifiedSuccessAction
    | DidGetCertifiedFailAction
    | GetInsuranceStatementAction
    | DidGetInsuranceStatementSuccessAction
    | DidGetInsuranceStatementFailAction;

export const getInsurancesAction = (
    navigation: GeneralStackNavigationProps<'Home'>['navigation']
): GetInsurancesAction => ({
    type: 'GET_INSURANCES',
    navigation
});

export const didInsurancesSuccesAction = (
    payload: IInsurance[]
): DidInsurancesSuccessAction => ({
    type: 'GET_INSURANCES_SUCCESS',
    payload
});

export const didInsurancesFailAction = (): DidInsurancesFailAction => ({
    type: 'GET_INSURANCES_FAIL'
});

export const changeInsuranceSelectedAction = (
    payload: IInsurance
): ChangeInsuranceSelectedAction => ({
    type: 'CHANGE_INSURANCE_SELECTED',
    payload
});

export const changeInsurancePayloadAction = (
    key: 'maritalState' | 'income',
    payload: {
        code: number;
        name: string;
    }
): ChangeInsurancePayloadAction => ({
    type: 'CHANGE_INSURANCE_PAYLOAD',
    key,
    payload
});

export const changeBeneficiaryListAction = (
    payload: IBeneficiary[]
): ChangeBeneficiaryListAction => ({
    type: 'CHANGE_BENEFICIARY_LIST',
    payload
});

export const getOptionsInsuranceAction = (
    payload: IOptionsInsurance
): GetOptionsInsuranceAction => ({
    type: 'GET_OPTIONS_INSURANCE',
    payload
});

export const didOptionsInsuranceSuccessAction = (
    payload: IIncome[] | IKinship[] | IMaritalState[],
    listType: IOptionsInsurance
): DidOptionsInsuranceSuccessAction => ({
    type: 'GET_OPTIONS_INSURANCE_SUCCESS',
    listType,
    payload
});

export const didOptionsInsuranceFailAction =
    (): DidOptionsInsuranceFailAction => ({
        type: 'GET_OPTIONS_INSURANCE_FAIL'
    });
export const requestInsuranceAction = (
    navigation: InsuranceStackNavigationProps<'Confirmation'>['navigation'],
    password?: string
): RequestInsuranceAction => ({
    type: 'REQUEST_INSURANCE',
    navigation,
    password
});

export const didRequestInsuranceSuccessAction =
    (): DidRequestInsuranceSuccessAction => ({
        type: 'REQUEST_INSURANCE_SUCCESS'
    });

export const didRequestInsuranceFailAction =
    (): DidRequestInsuranceFailAction => ({
        type: 'REQUEST_INSURANCE_FAIL'
    });
export const didRequestUserInsurancesSuccesAction = (
    payload: any
): DidRequestUserInsuranceSuccessAction => ({
    type: 'REQUEST_USER_INSURANCE_SUCCESS',
    payload
});

export const getBeneficiarysAction = (): GetBeneficiarysAction => ({
    type: 'GET_BENEFICIARYS'
});

export const didBeneficiarysSuccessAction = (
    payload: IBeneficiary[]
): DidBeneficiarysSuccessAction => ({
    type: 'GET_BENEFICIARYS_SUCCESS',
    payload
});

export const didBeneficiarysFailAction = (): DidBeneficiarysFailAction => ({
    type: 'GET_BENEFICIARYS_FAIL'
});

export const clearInsuranceStateAction = (): ClearInsuranceStateAction => ({
    type: 'CLEAR_INSURANCE_STATE'
});
export const postBeneficiarysAction = (
    navigation: InsuranceStackNavigationProps<'Confirmation'>['navigation']
): PostBeneficiarysAction => ({
    type: 'POST_BENEFICIARYS',
    navigation
});

export const didPostBeneficiarysSuccessAction =
    (): DidPostBeneficiarysSuccessAction => ({
        type: 'POST_BENEFICIARYS_SUCCESS'
    });

export const didPostBeneficiarysFailAction =
    (): DidPostBeneficiarysFailAction => ({
        type: 'POST_BENEFICIARYS_FAIL'
    });
export const putOptionAction = (
    optionType: 'maritalState' | 'income',
    navigation: InsuranceStackNavigationProps<'Confirmation'>['navigation']
): PutOptionAction => ({
    type: 'PUT_OPTION',
    optionType,
    navigation
});

export const didPutOptionSuccessAction = (): DidPutOptionSuccessAction => ({
    type: 'PUT_OPTION_SUCCESS'
});

export const didPutOptionFailAction = (): DidPutOptionFailAction => ({
    type: 'PUT_OPTION_FAIL'
});

export const cancelInsuranceAction = (
    navigation: InsuranceStackNavigationProps<'UserInsurance'>['navigation']
): CancelInsuranceAction => ({
    type: 'CANCEL_INSURANCE',
    navigation
});
export const didCancelInsuranceSuccessAction =
    (): DidCancelInsuranceSuccessAction => ({
        type: 'CANCEL_INSURANCE_SUCCESS'
    });

export const didCancelInsuranceFailAction =
    (): DidCancelInsuranceFailAction => ({
        type: 'CANCEL_INSURANCE_FAIL'
    });

export const getValidateTokenAction = (
    navigation: GeneralStackNavigationProps<'Home'>['navigation']
): GetValidateTokenAction => ({
    type: 'GET_VALIDATE_TOKEN',
    navigation
});
export const didGetValidateTokenSuccessAction = (
    payload: string
): DidGetValidateTokenSuccessAction => ({
    type: 'GET_VALIDATE_TOKEN_SUCCESS',
    payload
});

export const didGetValidateTokenFailAction =
    (): DidGetValidateTokenFailAction => ({
        type: 'GET_VALIDATE_TOKEN_FAIL'
    });

export const getCertifiedAction = (): GetCertifiedAction => ({
    type: 'GET_CERTIFIED'
});
export const didGetCertifiedSuccessAction =
    (): DidGetCertifiedSuccessAction => ({
        type: 'GET_CERTIFIED_SUCCESS'
    });
export const didGetCertifiedFailAction = (): DidGetCertifiedFailAction => ({
    type: 'GET_CERTIFIED_FAIL'
});

export const getInsuranceStatementAction = (payload: {
    userInsuranceId: string;
}): GetInsuranceStatementAction => ({
    type: 'GET_INSURANCE_STATEMENT',
    payload
});
export const didGetInsuranceStatementSuccessAction = (
    payload: any
): DidGetInsuranceStatementSuccessAction => ({
    type: 'GET_INSURANCE_STATEMENT_SUCCESS',
    payload
});
export const didGetInsuranceStatementFailAction =
    (): DidGetInsuranceStatementFailAction => ({
        type: 'GET_INSURANCE_STATEMENT_FAIL'
    });
