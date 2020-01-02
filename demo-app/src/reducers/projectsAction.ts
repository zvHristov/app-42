import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import {
    IGetProjectSuccessAction
} from '../actions/project/get';
import initialState from './initialState';
import { IProjectsStoreState } from '../store/IStoreState';
export default function projectsReducer(
    state: IProjectsStoreState = initialState.projects,
    action: ActionTypes
) {
    switch (action.type) {
        case ActionTypeKeys.GET_PROJECTS_SUCCESS:
            return onGetProjectsSuccess(action);
        case ActionTypeKeys.GET_PROJECTS_IN_PROGRESS:
            return onGetEProjectsInProgress(state);
        default:
            return state;
    }
}
function onGetProjectsSuccess(action: IGetProjectSuccessAction) {
    return {
        isFetching: false,
        items: action.payload.items,
    }
}
function onGetEProjectsInProgress(currentState: IProjectsStoreState) {
    return {
        ...currentState,
        isFetching: true,

    }
}
