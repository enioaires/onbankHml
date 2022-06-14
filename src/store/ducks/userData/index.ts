import { Reducer } from 'redux';

// Types
import { IUserDataState } from './types';
import { UserDataAction } from './actions';

const INITIAL_STATE: IUserDataState = {
    data: {
        accountHolderId: '',
        account: {
            account: 0,
            branch: 0,
            mobilePhone: {
                country: '',
                phoneNumber: ''
            }
        },
        client: {
            name: '',
            taxIdentifier: {
                taxId: '',
                country: ''
            },
            mobilePhone: {
                country: '',
                phoneNumber: ''
            },
            email: '',
            createdAccount: '',
            hasKeys: false,
            hasCnh: false,
            hasSelfie: false,
            cardBiz: 'INITIAL_STATE',
            promoCode: '',
            isBeta: false,
            isDemo: false,
            termOfUse: true
        },
        billingAddress: {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            pais: ''
        },
        clientType: '',
        accountStatus: '',
        financialLimit: {
            realBalanceLimit: 0,
            monthlyFinancialInjectionLimit: 0,
            realBalance: 0,
            maxCreditLimit: 0,
            currentMonthlyFinancialInjection: 0
        },
        businessDay: false
    },
    isLoading: false,
    error: false
};
const reducer: Reducer<IUserDataState, UserDataAction> = (
    state: IUserDataState = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case 'USER_DATA_REQUEST':
            return {
                ...state,
                isLoading: true
            };
        case 'USER_DATA_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case 'USER_DATA_SUCCESS':
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case 'CLEAR_USER_DATA':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return {
                ...state
            };
    }
};

export default reducer;
