import key from '../../ActionTypeKeys';
export interface IAddProjectFailAction {
    readonly type: key.ADD_PROJECT_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IAddProjectProgressAction {
    readonly type: key.ADD_PROJECT_IN_PROGRESS;
}
export interface IAddProjectSuccessAction {
    readonly type: key.ADD_PROJECT_SUCCESS;
    readonly payload: {
        readonly status: string;
    }
}
