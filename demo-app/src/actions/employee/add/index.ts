import key from '../../ActionTypeKeys';
export interface IAddEmployeeFailAction {
    readonly type: key.ADD_EMPLOYEE_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IAddEmployeeProgressAction {
    readonly type: key.ADD_EMPLOYEE_IN_PROGRESS;
}
export interface IAddEmployeeSuccessAction {
    readonly type: key.ADD_EMPLOYEE_SUCCESS;
    readonly payload: {
        readonly status: string;
    }
}
