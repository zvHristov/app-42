import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import {
    IGetCompanyAddressesSuccessAction
} from '../actions/company-addresses/get';
import initialState from './initialState';
import { ICompanyAddressesStoreState } from '../store/IStoreState';
export default function companyAddressesReducer
(
    state: ICompanyAddressesStoreState = initialState.companyAddresses,
    action: ActionTypes
) {
    // @ts-ignore
    switch (action.type) {
        case ActionTypeKeys.GET_COMPANY_ADDRESSES_SUCCESS:
            return onGetCompanyAddressesSuccess(action);
        case ActionTypeKeys.GET_COMPANY_ADDRESSES_IN_PROGRESS:
            return onGetCompanyAddressesInProgress(state);
        default:
            return state;
    }
}
function onGetCompanyAddressesSuccess(action: IGetCompanyAddressesSuccessAction) {
    return {
        isFetching: false,
        items: action.payload.items,
    }
}
function onGetCompanyAddressesInProgress(currentState: ICompanyAddressesStoreState) {
    return {
        ...currentState,
        isFetching: true,
    }
}
