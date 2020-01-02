import key from '../../ActionTypeKeys';
export interface IDeleteEmployeeFailAction {
    readonly type: key.DELETE_EMPLOYEE_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IDeleteEmployeeProgressAction {
    readonly type: key.DELETE_EMPLOYEE_IN_PROGRESS;
}
export interface IDeleteEmployeeSuccessAction {
    readonly type: key.DELETE_EMPLOYEE_SUCCESS;
    readonly payload: {
        readonly status: string;
    }
}
