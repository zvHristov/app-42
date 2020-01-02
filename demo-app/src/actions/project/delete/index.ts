import key from '../../ActionTypeKeys';
import IProject from "../../../models/IProject";
export interface IDeleteProjectFailAction {
    readonly type: key.DELETE_PROJECT_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IDeleteProjectProgressAction {
    readonly type: key.DELETE_PROJECT_IN_PROGRESS;
}
export interface IDeleteProjectSuccessAction {
    readonly type: key.DELETE_PROJECT_SUCCESS;
    readonly payload: {
        readonly status: string;
    }
}
