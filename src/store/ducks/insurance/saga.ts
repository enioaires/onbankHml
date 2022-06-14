import { all, takeLatest, takeEvery, select, put } from 'redux-saga/effects';
import * as dateFns from 'date-fns';

// Api
import api from '../../../api';

// Utils
import callWrapperService from '../../../utils/callWrapperService';
import { prefityNames } from '../../../utils/prettiers';

// Actions
import {
    didInsurancesFailAction,
    didInsurancesSuccesAction,
    GetOptionsInsuranceAction,
    didOptionsInsuranceSuccessAction,
    didOptionsInsuranceFailAction,
    changeInsuranceSelectedAction,
    didRequestInsuranceFailAction,
    didRequestInsuranceSuccessAction,
    RequestInsuranceAction,
    GetInsurancesAction,
    GetBeneficiarysAction,
    didBeneficiarysFailAction,
    didBeneficiarysSuccessAction,
    didPostBeneficiarysFailAction,
    didPostBeneficiarysSuccessAction,
    PostBeneficiarysAction,
    PutOptionAction,
    didRequestUserInsurancesSuccesAction,
    didPutOptionSuccessAction,
    didPutOptionFailAction,
    CancelInsuranceAction,
    didCancelInsuranceSuccessAction,
    getOptionsInsuranceAction,
    didCancelInsuranceFailAction,
    didGetValidateTokenSuccessAction,
    didGetValidateTokenFailAction,
    didGetCertifiedSuccessAction,
    didGetCertifiedFailAction,
    didGetInsuranceStatementSuccessAction,
    didGetInsuranceStatementFailAction,
    GetInsuranceStatementAction,
    getInsuranceStatementAction
} from './actions';
import {
    showSuccessModalNotNavAction,
    showSuccessModalAction
} from '../../ducks/successModal/actions';

// Types
import {
    GET_INSURANCES,
    GET_OPTIONS_INSURANCE,
    IOptionsInsurance,
    REQUEST_INSURANCE,
    IPayloadInsurance,
    IBeneficiary,
    GET_BENEFICIARYS,
    POST_BENEFICIARYS,
    PUT_OPTION,
    CANCEL_INSURANCE,
    GET_CERTIFIED,
    IUserInsurance,
    GET_INSURANCE_STATEMENT
} from './types';
import { IApplicationState } from '../../types';

const getInsurancesList = () => {
    return api.get('insurance/products/list');
};

const getUserInsurance = (payload: any) => {
    return api.get(`insurance/${payload}`);
};

const getUserValidateToken = () => {
    return api.get('insurance/validation/token');
};

const getMaritalStatesList = () => {
    return api.get('insurance/statuscivil/list');
};

const getIncomesList = () => {
    return api.get('insurance/incomerange/list');
};

const getKinshipList = () => {
    return api.get('insurance/kinship/list');
};

const requestUserInsurance = (payload: any) => {
    return api.post('insurance', payload);
};

const getUserBeneficiarysList = (payload: any) => {
    return api.get(`insurance/beneficiary/${payload}`);
};

const postBeneficiarysList = (payload: any) => {
    return api.post(`insurance/beneficiary/${payload.insuranceSelectedId}`, {
        data: payload.beneficiaryListParsed
    });
};

const putMaritalState = (payload: any) => {
    return api.put(`insurance/statuscivil/${payload.userInsuranceId}`, {
        id_estado_civil: payload.code
    });
};

const putIncome = (payload: any) => {
    return api.put(`insurance/incomerange/${payload.userInsuranceId}`, {
        id_faixa_renda: payload.code
    });
};

const requestCancelInsurance = (payload: any) => {
    return api.del(`insurance/${payload}`);
};

const getUserCertified = (payload: any) => {
    return api.get(`/insurance/certificate/${payload}`);
};

const getUserStatement = (payload: any) => {
    return api.get(`/insurance/statement/${payload}`);
};

function* getInsurances(action: GetInsurancesAction) {
    // The get insurances function will fetch Insurance Products List, fetch information
    // about the index[0] of this list through the getUserInsurance request(In future
    // if new products are added you must refactor this fuction to get userInsurance selected
    // by the user) and fetch validateToken(tablet confirmation). So if
    // insuranceListResponse.data exist will save all information, select the first insurance
    // product and request all list of options.
    //
    // If userInsuranceResponse.data exist, the user have this insurance active so will save
    // and redirect to the userInsurance screen. Else if validateTokenResponse.data exists so
    // user dont have a insurance active and have a Token, then will save and redirect to
    // validateToken screen. If userInsuranceResponse.data or validateTokenResponse.data dont
    // exists, the user will be redirect to the insurance product screen default.

    const insuranceListResponse = yield callWrapperService(getInsurancesList);
    // console.log(JSON.stringify(insuranceListResponse, null, 2))

    const userInsuranceResponse: { data: IUserInsurance } =
        yield callWrapperService(
            getUserInsurance,
            insuranceListResponse?.data[0]?.id ??
                '3ba8496f-a597-4437-9c30-cc89a8e4c3fb'
        );
    // console.log(JSON.stringify(userInsuranceResponse, null, 2))

    const validateTokenResponse = yield callWrapperService(
        getUserValidateToken
    );
    // console.log(JSON.stringify(validateTokenResponse, null, 2))

    if (insuranceListResponse?.data) {
        yield put(didInsurancesSuccesAction(insuranceListResponse.data));
        yield put(changeInsuranceSelectedAction(insuranceListResponse.data[0]));

        yield put(getOptionsInsuranceAction({ type: 'maritalStateList' }));
        yield put(getOptionsInsuranceAction({ type: 'kinshipList' }));
        yield put(getOptionsInsuranceAction({ type: 'incomeRangeList' }));
    } else {
        yield put(didInsurancesFailAction());
    }

    if (
        userInsuranceResponse?.data &&
        userInsuranceResponse?.data?.status != 'SOLICITADO' &&
        userInsuranceResponse?.data?.status != 'ERROR'
    ) {
        yield put(
            getInsuranceStatementAction({
                userInsuranceId: userInsuranceResponse.data.saleId
            })
        );
        yield put(
            didRequestUserInsurancesSuccesAction(userInsuranceResponse.data)
        );
        action.navigation.push('Insurance', { screen: 'UserInsurance' });
    } else if (validateTokenResponse?.data) {
        yield put(
            didGetValidateTokenSuccessAction(validateTokenResponse.data || '')
        );
        action.navigation.push('Insurance', { screen: 'ValidateToken' });
    } else {
        action.navigation.push('Insurance', { screen: 'Insurance' });
    }
}

function* getOptionsInsurance(action: GetOptionsInsuranceAction) {
    const listType = (listType: IOptionsInsurance) => {
        switch (listType.type) {
            case 'maritalStateList':
                return getMaritalStatesList;
            case 'incomeRangeList':
                return getIncomesList;
            case 'kinshipList':
                return getKinshipList;
            default:
                return;
        }
    };

    const resp = yield callWrapperService(listType(action.payload));
    // console.log(JSON.stringify(resp, null, 2))
    if (resp?.data) {
        yield put(
            didOptionsInsuranceSuccessAction(
                resp.data[Object.keys(resp.data)[0]],
                action.payload
            )
        );
    } else {
        yield put(didOptionsInsuranceFailAction());
    }
}

function* requestInsurance(action: RequestInsuranceAction) {
    const insuranceSelectedId: string = yield select(
        (state: IApplicationState) => state.insurance.insuranceSelected.id
    );
    const maritalStateCode: number = yield select(
        (state: IApplicationState) => state.insurance.payload.maritalState.code
    );
    const incomeRangeCode: number = yield select(
        (state: IApplicationState) => state.insurance.payload.income.code
    );
    const beneficiaryList: IBeneficiary[] = yield select(
        (state: IApplicationState) => state.insurance.beneficiaryList
    );
    const beneficiaryListParsed = beneficiaryList.map((element) => {
        return {
            nm_beneficiario: prefityNames(element.name.trim()),
            cd_parentesco: element.kinship.code,
            pe_participacao: element.percent
        };
    });

    const payload: IPayloadInsurance = {
        transactionPassword: action.password,
        idProduct: insuranceSelectedId,
        segurado: {
            id_estado_civil: maritalStateCode,
            id_faixa_renda: incomeRangeCode
        },
        beneficiarios: beneficiaryListParsed
    };
    // console.log(payload)

    const resp = yield callWrapperService(requestUserInsurance, payload);
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didRequestInsuranceSuccessAction());
        action.navigation.reset({
            index: 0,
            routes: [
                { name: 'General' },
                { name: 'Insurance', params: { screen: 'Latest' } }
            ]
        });
    } else {
        yield put(didRequestInsuranceFailAction());
    }
}

function* getBeneficiarysList() {
    const insuranceUserId: string = yield select(
        (state: IApplicationState) => state.insurance.userInsurance.saleId
    );

    const resp: {
        data: {
            id: string;
            name: string;
            participation: string;
            kinship: number;
        }[];
    } = yield callWrapperService(getUserBeneficiarysList, insuranceUserId);
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        const respParsed = resp.data.map((element) => {
            const kinshipName = '';

            return {
                name: element.name,
                kinship: { code: element.kinship, name: kinshipName },
                percent: Number(element.participation),
                id: element.id
            };
        });

        yield put(didBeneficiarysSuccessAction(respParsed));
    } else {
        yield put(didBeneficiarysFailAction());
    }
}

function* postBeneficiarys(action: PostBeneficiarysAction) {
    const insuranceSelectedId: IBeneficiary[] = yield select(
        (state: IApplicationState) => state.insurance.insuranceSelected.id
    );
    const beneficiaryList: IBeneficiary[] = yield select(
        (state: IApplicationState) => state.insurance.beneficiaryList
    );
    const beneficiaryListParsed = beneficiaryList.map((element) => {
        return {
            nm_beneficiario: prefityNames(element.name.trim()),
            cd_parentesco: element.kinship.code,
            pe_participacao: element.percent
        };
    });

    const payload = {
        beneficiaryListParsed,
        insuranceSelectedId
    };

    const resp = yield callWrapperService(postBeneficiarysList, payload);
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didPostBeneficiarysSuccessAction());
        yield put(showSuccessModalAction('Dados alterados com sucesso.'));
        /* action.navigation.reset({
            index: 0,
            routes: [
                { name: 'General' },
                { name: 'Insurance', params: { screen: 'Latest', params: { edit: true }}}
            ]
        }); */
    } else {
        yield put(didPostBeneficiarysFailAction());
    }
}

function* putOption(action: PutOptionAction) {
    const maritalStateCode: number = yield select(
        (state: IApplicationState) => state.insurance.payload.maritalState.code
    );
    const incomeRangeCode: number = yield select(
        (state: IApplicationState) => state.insurance.payload.income.code
    );
    const userInsuranceId: string = yield select(
        (state: IApplicationState) => state.insurance.userInsurance.saleId
    );

    let payload = {
        code: 0,
        userInsuranceId
    };

    const optionType = (optionType: 'maritalState' | 'income') => {
        switch (optionType) {
            case 'maritalState':
                payload.code = maritalStateCode;
                return putMaritalState;
            case 'income':
                payload.code = incomeRangeCode;
                return putIncome;
            default:
                return;
        }
    };

    const resp = yield callWrapperService(
        optionType(action.optionType),
        payload
    );
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didPutOptionSuccessAction());
        yield put(showSuccessModalAction('Dados alterados com sucesso.'));
        /* action.navigation.reset({
            index: 0,
            routes: [
                { name: 'General' },
                { name: 'Insurance', params: { screen: 'Latest', params: { edit: true }}}
            ]
        }) */
    } else {
        yield put(didPutOptionFailAction());
    }
}

function* cancelInsurance(action: CancelInsuranceAction) {
    const userInsuranceId: string = yield select(
        (state: IApplicationState) => state.insurance.userInsurance.saleId
    );

    const resp = yield callWrapperService(
        requestCancelInsurance,
        userInsuranceId
    );
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didCancelInsuranceSuccessAction());
        action.navigation.reset({
            index: 0,
            routes: [
                { name: 'General' },
                {
                    name: 'Insurance',
                    params: {
                        screen: 'Latest',
                        params: {
                            edit: true,
                            cancel: true
                        }
                    }
                }
            ]
        });
    } else {
        yield put(didCancelInsuranceFailAction());
    }
}

function* getCertified() {
    const insuranceSelectedId: string = yield select(
        (state: IApplicationState) => state.insurance.insuranceSelected.id
    );

    const resp = yield callWrapperService(
        getUserCertified,
        insuranceSelectedId
    );
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didGetCertifiedSuccessAction());
        yield put(
            showSuccessModalNotNavAction(
                'O certificado foi enviado para seu email!'
            )
        );
    } else {
        yield put(didGetCertifiedFailAction());
    }
}

function* getInsuranceStatement(action: GetInsuranceStatementAction) {
    const resp = yield callWrapperService(
        getUserStatement,
        action.payload.userInsuranceId
    );
    // console.log(JSON.stringify(resp, null, 2))

    if (resp?.data) {
        yield put(didGetInsuranceStatementSuccessAction(resp.data));
    } else {
        yield put(didGetInsuranceStatementFailAction());
    }
}

export default all([
    takeLatest(GET_INSURANCES, getInsurances),
    takeEvery(GET_OPTIONS_INSURANCE, getOptionsInsurance),
    takeLatest(REQUEST_INSURANCE, requestInsurance),
    takeLatest(GET_BENEFICIARYS, getBeneficiarysList),
    takeLatest(POST_BENEFICIARYS, postBeneficiarys),
    takeLatest(PUT_OPTION, putOption),
    takeLatest(CANCEL_INSURANCE, cancelInsurance),
    takeLatest(GET_CERTIFIED, getCertified),
    takeLatest(GET_INSURANCE_STATEMENT, getInsuranceStatement)
]);
