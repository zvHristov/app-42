import { Dispatch } from 'redux';
import {
    IGetCompanyAddressesFailAction,
    IGetCompanyAddressesProgressAction,
    IGetCompanyAddressesSuccessAction
} from './get';
import keys from '../ActionTypeKeys';
import ICompanyAddresses from '../../models/ICompanyAddresses';
import { axiosConfig } from '../../axiosConfig';
export function getCompanyAddresses(): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getCompanyAddressesInProgress());
        try {
            axiosConfig.post('company-addresses').then((response) => {
                dispatch(getCompanyAddressesSuccess(response.data));
            })
        } catch (error) {
            dispatch(getCompanyAddressesFail(error));
        }
    }
}
function getCompanyAddressesInProgress(): IGetCompanyAddressesProgressAction {
    return {
        type: keys.GET_COMPANY_ADDRESSES_IN_PROGRESS
    }
}
function getCompanyAddressesFail( error: Error): IGetCompanyAddressesFailAction {
    return {
        payload: {
            error
        },
        type: keys.GET_COMPANY_ADDRESSES_FAIL
    }
}
function getCompanyAddressesSuccess( items: ICompanyAddresses[]): IGetCompanyAddressesSuccessAction {
    return {
        payload: {
            items
        },
        type: keys.GET_COMPANY_ADDRESSES_SUCCESS
    }
}
