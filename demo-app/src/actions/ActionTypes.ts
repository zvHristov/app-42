import { IGetCompanySuccessAction,  IGetCompanyProgressAction, IGetCompanyFailAction } from './company/get';
import {
    IGetCompanyAddressesSuccessAction, IGetCompanyAddressesProgressAction, IGetCompanyAddressesFailAction
} from './company-addresses/get';
import {
    IGetEmployeeSuccessAction, IGetEmployeeProgressAction, IGetEmployeeFailAction
} from './employee/get';
import {
    IGetProjectFailAction, IGetProjectProgressAction, IGetProjectSuccessAction
} from './project/get';
type ActionTypes =
    | IGetCompanySuccessAction
    | IGetCompanyFailAction
    | IGetCompanyProgressAction
    | IGetCompanyAddressesSuccessAction
    | IGetCompanyAddressesProgressAction
    | IGetCompanyAddressesFailAction
    | IGetProjectFailAction
    | IGetProjectProgressAction
    | IGetProjectSuccessAction
    | IGetEmployeeSuccessAction
    | IGetEmployeeProgressAction
    | IGetEmployeeFailAction;
export default ActionTypes;
