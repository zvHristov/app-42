import { Dispatch } from 'redux';
import {
    IGetCompanyFailAction,
    IGetCompanyProgressAction,
    IGetCompanySuccessAction
} from './get';
import keys from "../ActionTypeKeys";
import ICompany from "../../models/ICompany";
import { axiosConfig } from '../../axiosConfig';
export function getCompany(): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getCompanyInProgress());
        try {
            axiosConfig.post('companies').then((response) => {
                dispatch(getCompanySuccess(response.data));
            })
        } catch (error) {
            dispatch(getCompanyFail(error));
        }
    }
}
function getCompanyInProgress(): IGetCompanyProgressAction {
    return {
        type: keys.GET_COMPANIES_IN_PROGRESS
    }
}
function getCompanyFail( error: Error): IGetCompanyFailAction {
    return {
        payload: {
            error
        },
        type: keys.GET_COMPANIES_FAIL
    }
}
function getCompanySuccess( items: ICompany[]): IGetCompanySuccessAction {
    return {
        payload: {
            items
        },
        type: keys.GET_COMPANIES_SUCCESS
    }
}
