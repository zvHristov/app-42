import key from '../../ActionTypeKeys';
export interface IUpdateEmployeeFailAction {
    readonly type: key.UPDATE_EMPLOYEE_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IUpdateEmployeeProgressAction {
    readonly type: key.UPDATE_EMPLOYEE_IN_PROGRESS;
}
export interface IUpdateEmployeeSuccessAction {
    readonly type: key.UPDATE_EMPLOYEE_SUCCESS;
    readonly payload: {
        readonly status: string;
    }
}
