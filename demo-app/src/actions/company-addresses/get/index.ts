import key from '../../ActionTypeKeys';
import ICompanyAddresses from "../../../models/ICompanyAddresses";
export interface IGetCompanyAddressesFailAction {
    readonly type: key.GET_COMPANY_ADDRESSES_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IGetCompanyAddressesProgressAction {
    readonly type: key.GET_COMPANY_ADDRESSES_IN_PROGRESS;
}
export interface IGetCompanyAddressesSuccessAction {
    readonly type: key.GET_COMPANY_ADDRESSES_SUCCESS;
    readonly payload: {
        readonly items: ReadonlyArray<ICompanyAddresses>;
    }
}
