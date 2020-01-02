import key from '../../ActionTypeKeys';
import IProject from "../../../models/IProject";
export interface IGetProjectFailAction {
    readonly type: key.GET_PROJECTS_FAIL;
    readonly payload: {
        readonly error: Error;
    }
}
export interface IGetProjectProgressAction {
    readonly type: key.GET_PROJECTS_IN_PROGRESS;
}
export interface IGetProjectSuccessAction {
    readonly type: key.GET_PROJECTS_SUCCESS;
    readonly payload: {
        readonly items: ReadonlyArray<IProject>;
    }
}
