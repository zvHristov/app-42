import key from '../../ActionTypeKeys';
import IEmployee from "../../../models/IEmployee";
export interface IGetEmployeeFailAction {
    readonly type: key.GET_EMPLOYEES_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IGetEmployeeProgressAction {
    readonly type: key.GET_EMPLOYEES_IN_PROGRESS;
}
export interface IGetEmployeeSuccessAction {
    readonly type: key.GET_EMPLOYEES_SUCCESS;
    readonly payload: {
        readonly items: ReadonlyArray<IEmployee>;
    }
}
