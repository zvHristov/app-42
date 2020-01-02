import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import {
IGetCompanySuccessAction
} from '../actions/company/get';
import initialState from './initialState';
import { ICompaniesStoreState } from '../store/IStoreState';
export default function companiesReducer(
state: ICompaniesStoreState = initialState.companies,
action: ActionTypes
) {
    switch (action.type) {
        case ActionTypeKeys.GET_COMPANIES_SUCCESS:
            return onGetCompaniesSuccess(action);
        case ActionTypeKeys.GET_COMPANIES_IN_PROGRESS:
            return onGetCompaniesInProgress(state);
        default:
            return state;
    }
}
function onGetCompaniesSuccess(action: IGetCompanySuccessAction) {
    return {
        isFetching: false,
        items: action.payload.items,
    }
}
function onGetCompaniesInProgress(currentState: ICompaniesStoreState) {
    return {
        ...currentState,
        isFetching: true,

    }
}
