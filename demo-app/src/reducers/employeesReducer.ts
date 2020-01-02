import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import {
    IGetEmployeeSuccessAction
} from '../actions/employee/get';
import initialState from './initialState';
import { IEmployeesStoreState } from '../store/IStoreState';
export default function employeesReducer(
    state: IEmployeesStoreState = initialState.employees,
    action: ActionTypes
) {
    switch (action.type) {
        case ActionTypeKeys.GET_EMPLOYEES_SUCCESS:
            return onGetEmployeesSuccess(action);
        case ActionTypeKeys.GET_EMPLOYEES_IN_PROGRESS:
            return onGetEmployeesInProgress(state);
        default:
            return state;
    }
}
function onGetEmployeesSuccess(action: IGetEmployeeSuccessAction) {
    return {
        isFetching: false,
        items: action.payload.items,
    }
}
function onGetEmployeesInProgress(currentState: IEmployeesStoreState) {
    return {
        ...currentState,
        isFetching: true,

    }
}
