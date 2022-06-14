import { Reducer } from 'redux';

// Types
import {
    IInsuranceState, 
    IInsurance,
    IMaritalState,
    IIncome,
    IBeneficiary,
    IKinship,
    IUserInsurance,
    IInsuranceStatement
} from './types';

// Actions
import { InsuranceActions } from './actions';

const INITIAL_STATE = {
    payload: {
        maritalState: {
            code: 0,
            name: '',
        },
        income: {
            code: 0,
            name: '',
        }
    },
    insurancesList: [] as IInsurance[],
    userInsurance: {} as IUserInsurance,
    insuranceStatement: [] as IInsuranceStatement[],
    insuranceSelected: {} as IInsurance,
    maritalStateList: [] as IMaritalState[],
    incomeRangeList: [] as IIncome[],
    kinshipList: [] as IKinship[],
    beneficiaryList: [] as IBeneficiary[],
    validateToken: '',
    isLoading: false,
    certifiedIsLoading: false,
    hasError: false
}

const reducer: Reducer<IInsuranceState, InsuranceActions> = (
    state: IInsuranceState = INITIAL_STATE,
    action
) => {
    switch(action.type) {
        case 'GET_INSURANCES':
        case 'GET_BENEFICIARYS':
        case 'POST_BENEFICIARYS':
        case 'PUT_OPTION':
        case 'REQUEST_INSURANCE':
        case 'GET_VALIDATE_TOKEN':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_VALIDATE_TOKEN_SUCCESS':
            return {
                ...state,
                isLoading: false,
                validateToken: action.payload
            }
        case 'GET_INSURANCES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                insurancesList: action.payload
            };
        case 'GET_OPTIONS_INSURANCE_SUCCESS':
            return {
                ...state,
                [action.listType.type]: action.payload
            }
        case 'GET_BENEFICIARYS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                beneficiaryList: action.payload
            }
        case 'REQUEST_USER_INSURANCE_SUCCESS':
            return {
                ...state,
                userInsurance: action.payload
            }
        case 'GET_INSURANCE_STATEMENT_SUCCESS':
            return {
                ...state,
                insuranceStatement: action.payload
            }
        case 'REQUEST_INSURANCE_SUCCESS':
        case 'POST_BENEFICIARYS_SUCCESS':
        case 'PUT_OPTION_SUCCESS':
        case 'REQUEST_INSURANCE_FAIL':
        case 'POST_BENEFICIARYS_FAIL':
        case 'PUT_OPTION_FAIL':
        case 'GET_BENEFICIARYS_FAIL':
        case 'GET_INSURANCES_FAIL':
        case 'GET_VALIDATE_TOKEN_FAIL':
            return {
                ...state,
                isLoading: false
            };
        case 'GET_CERTIFIED':
            return {
                ...state,
                certifiedIsLoading: true
            }
        case 'GET_CERTIFIED_FAIL':
        case 'GET_CERTIFIED_SUCCESS':
            return {
                ...state,
                certifiedIsLoading: false
            }
        case 'GET_OPTIONS_INSURANCE':
        case 'GET_OPTIONS_INSURANCE_FAIL':
        case 'GET_INSURANCE_STATEMENT_FAIL':
        case 'GET_INSURANCE_STATEMENT':
            return {
                ...state
            }
        case 'CHANGE_INSURANCE_SELECTED':
            return {
                ...state,
                insuranceSelected: action.payload
            }
        case 'CHANGE_INSURANCE_PAYLOAD':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    [action.key]: action.payload
                }
            }
        case 'CHANGE_BENEFICIARY_LIST':
            return {
                ...state,
                beneficiaryList: action.payload
            }
        case 'CLEAR_INSURANCE_STATE':
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state
    }
}

export default reducer;