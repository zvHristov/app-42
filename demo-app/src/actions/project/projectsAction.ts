import { Dispatch } from 'redux';
import {
    IGetProjectSuccessAction,
    IGetProjectProgressAction,
    IGetProjectFailAction
} from './get';
import {
IDeleteProjectFailAction,
    IDeleteProjectProgressAction,
    IDeleteProjectSuccessAction
} from './delete';
import {
IAddProjectFailAction,
    IAddProjectProgressAction,
    IAddProjectSuccessAction
} from './add';
import {
IUpdateProjectFailAction,
    IUpdateProjectProgressAction,
    IUpdateProjectSuccessAction
} from './update';
import keys from "../ActionTypeKeys";
import IProject from "../../models/IProject";
import { axiosConfig } from '../../axiosConfig';
export function getProjects(): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getProjectsInProgress());
        try {
            axiosConfig.post('projects').then((response) => {
                dispatch(getProjectsSuccess(response.data));
            });
        } catch (error) {
            dispatch(getProjectsFail(error));
        }
    }
}
export function deletedProject(id: string): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(deletedProjectInProgress());
        try {
            axiosConfig.delete(`deleteProject/${id}`).then((response) => {
                dispatch(deletedProjectSuccess(response.statusText));
                dispatch(getProjects());
            });
        } catch (error) {
            dispatch(deletedProjectFail(error));
        }
    }
}
export function addedProject(project: IProject): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(addedProjectInProgress());
        try {
            axiosConfig.post(`addProject`, project).then((response) => {
                dispatch(addedProjectSuccess(response.statusText));
                dispatch(getProjects());
            });
        } catch (error) {
            dispatch(addedProjectFail(error));
        }
    }
}
export function updatedProject(project: IProject): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(updatedProjectInProgress());
        try {
            axiosConfig.post(`updateProject/${project.id}`, project).then((response) => {
                dispatch(updatedProjectSuccess(response.statusText));
            });
        } catch (error) {
            dispatch(updatedProjectFail(error));
        }
    }
}
function getProjectsInProgress(): IGetProjectProgressAction {
    return {
        type: keys.GET_PROJECTS_IN_PROGRESS
    }
}
function getProjectsFail( error: Error): IGetProjectFailAction {
    return {
        payload: {
            error
        },
        type: keys.GET_PROJECTS_FAIL
    }
}
function getProjectsSuccess( items: IProject[]): IGetProjectSuccessAction {
    return {
        payload: {
            items
        },
        type: keys.GET_PROJECTS_SUCCESS
    }
}
function deletedProjectInProgress(): IDeleteProjectProgressAction {
    return {
        type: keys.DELETE_PROJECT_IN_PROGRESS
    }
}
function deletedProjectFail( error: Error): IDeleteProjectFailAction {
    return {
        payload: {
            error
        },
        type: keys.DELETE_PROJECT_FAIL
    }
}
function deletedProjectSuccess( status: string): IDeleteProjectSuccessAction {
    return {
        payload: {
            status
        },
        type: keys.DELETE_PROJECT_SUCCESS
    }
}
function addedProjectInProgress(): IAddProjectProgressAction {
    return {
        type: keys.ADD_PROJECT_IN_PROGRESS
    }
}
function addedProjectFail( error: Error): IAddProjectFailAction {
    return {
        payload: {
            error
        },
        type: keys.ADD_PROJECT_FAIL
    }
}
function addedProjectSuccess( status: string): IAddProjectSuccessAction {
    return {
        payload: {
            status
        },
        type: keys.ADD_PROJECT_SUCCESS
    }
}
function updatedProjectInProgress(): IUpdateProjectProgressAction {
    return {
        type: keys.UPDATE_PROJECT_IN_PROGRESS
    }
}
function updatedProjectFail( error: Error): IUpdateProjectFailAction {
    return {
        payload: {
            error
        },
        type: keys.UPDATE_PROJECT_FAIL
    }
}
function updatedProjectSuccess( status: string): IUpdateProjectSuccessAction {
    return {
        payload: {
            status
        },
        type: keys.UPDATE_PROJECT_SUCCESS
    }
}
