import {
    IGetCompanySuccessAction,
    IGetCompanyProgressAction,
    IGetCompanyFailAction } from './company/get';
import {
    IGetCompanyAddressesSuccessAction,
    IGetCompanyAddressesProgressAction,
    IGetCompanyAddressesFailAction
} from './company-addresses/get';
import {
    IGetEmployeeSuccessAction, IGetEmployeeProgressAction, IGetEmployeeFailAction
} from './employee/get';
import {
 IAddEmployeeSuccessAction,
    IAddEmployeeProgressAction,
    IAddEmployeeFailAction
} from './employee/add';
import {
IDeleteEmployeeSuccessAction,
    IDeleteEmployeeProgressAction,
    IDeleteEmployeeFailAction
} from './employee/delete';
import {
IUpdateEmployeeSuccessAction,
    IUpdateEmployeeProgressAction,
    IUpdateEmployeeFailAction
} from './employee/update';
import {
    IGetProjectFailAction, IGetProjectProgressAction, IGetProjectSuccessAction
} from './project/get';
import {
  IAddProjectSuccessAction,
    IAddProjectProgressAction,
    IAddProjectFailAction
} from './project/add';
import {
   IUpdateProjectSuccessAction,
    IUpdateProjectProgressAction,
    IUpdateProjectFailAction
} from './project/update';
import {
   IDeleteProjectSuccessAction,
    IDeleteProjectProgressAction,
    IDeleteProjectFailAction
} from './project/delete';
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
    | IAddProjectSuccessAction
    | IAddProjectProgressAction
    | IAddProjectFailAction
    | IUpdateProjectSuccessAction
    | IUpdateProjectProgressAction
    | IUpdateProjectFailAction
    | IDeleteProjectSuccessAction
    | IDeleteProjectProgressAction
    | IDeleteProjectFailAction
    | IGetEmployeeSuccessAction
    | IGetEmployeeProgressAction
    | IGetEmployeeFailAction
    | IAddEmployeeSuccessAction
    | IAddEmployeeProgressAction
    | IAddEmployeeFailAction
    | IDeleteEmployeeSuccessAction
    | IDeleteEmployeeProgressAction
    | IDeleteEmployeeFailAction
    | IUpdateEmployeeSuccessAction
    | IUpdateEmployeeProgressAction
    | IUpdateEmployeeFailAction;
export default ActionTypes;
