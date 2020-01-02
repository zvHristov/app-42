import key from '../../ActionTypeKeys';
export interface IUpdateProjectFailAction {
    readonly type: key.UPDATE_PROJECT_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IUpdateProjectProgressAction {
    readonly type: key.UPDATE_PROJECT_IN_PROGRESS;
}
export interface IUpdateProjectSuccessAction {
    readonly type: key.UPDATE_PROJECT_SUCCESS;
    readonly payload: {
        readonly status: string;
    }
}
