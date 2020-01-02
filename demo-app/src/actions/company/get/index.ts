import key from '../../ActionTypeKeys';
import ICompany from '../../../models/ICompany';
export interface IGetCompanyFailAction {
    readonly type: key.GET_COMPANIES_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IGetCompanyProgressAction {
    readonly type: key.GET_COMPANIES_IN_PROGRESS;
}
export interface IGetCompanySuccessAction {
    readonly type: key.GET_COMPANIES_SUCCESS;
    readonly payload: {
        readonly items: ReadonlyArray<ICompany>;
    }
}
