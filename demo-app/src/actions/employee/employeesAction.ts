import { Dispatch } from 'redux';
import {
    IGetEmployeeFailAction,
    IGetEmployeeProgressAction,
    IGetEmployeeSuccessAction,
} from './get';
import {
    IDeleteEmployeeFailAction,
    IDeleteEmployeeProgressAction,
    IDeleteEmployeeSuccessAction,
} from './delete';
import {
IAddEmployeeFailAction,
    IAddEmployeeProgressAction,
    IAddEmployeeSuccessAction,
} from './add';
import {
IUpdateEmployeeFailAction,
    IUpdateEmployeeProgressAction,
    IUpdateEmployeeSuccessAction,
} from './update';
import keys from "../ActionTypeKeys";
import IEmployee from "../../models/IEmployee";
import { axiosConfig } from '../../axiosConfig';
export function getEmployees(): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getEmployeesInProgress());
        try {
            axiosConfig.post('employees').then((response) => {
                dispatch(getEmployeesSuccess(response.data));
            });
        } catch (error) {
            dispatch(getEmployeesFail(error));
        }
    }
}
export function deletedEmployee(id: string): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(deletedEmployeeInProgress());
        try {
            axiosConfig.delete(`deleteEmployee/${id}`).then((response) => {
                dispatch(deletedEmployeeSuccess(response.statusText));
                dispatch(getEmployees());
            });
        } catch (error) {
            dispatch(deletedEmployeeFail(error));
        }
    }
}
export function addedEmployee(Employee: IEmployee): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(addedEmployeeInProgress());
        try {
            axiosConfig.post(`addEmployee`, Employee).then((response) => {
                dispatch(addedEmployeeSuccess(response.statusText));
                dispatch(getEmployees());
            });
        } catch (error) {
            dispatch(addedEmployeeFail(error));
        }
    }
}
export function updatedEmployee(employee: IEmployee): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(updatedEmployeeInProgress());
        try {
            axiosConfig.post(`updateEmployee/${employee.id}`, employee).then((response) => {
                dispatch(updatedEmployeeSuccess(response.statusText));
                dispatch(getEmployees());
            });
        } catch (error) {
            dispatch(updatedEmployeeFail(error));
        }
    }
}
export function updatedEmployees(employees: Array<IEmployee>): (dispatch: Dispatch<any>) => Promise<void> {
    return async (dispatch: Dispatch<any>) => {
        dispatch(updatedEmployeeInProgress());
        try {
            axiosConfig.post(`updateEmployees`, employees).then((response) => {
                dispatch(updatedEmployeeSuccess(response.statusText));
                dispatch(getEmployees());
            });
        } catch (error) {
            dispatch(updatedEmployeeFail(error));
        }
    }
}
function getEmployeesInProgress(): IGetEmployeeProgressAction {
    return {
        type: keys.GET_EMPLOYEES_IN_PROGRESS
    }
}
function getEmployeesFail( error: Error): IGetEmployeeFailAction {
    return {
        payload: {
            error
        },
        type: keys.GET_EMPLOYEES_FAIL
    }
}
function getEmployeesSuccess( items: IEmployee[]): IGetEmployeeSuccessAction {
    return {
        payload: {
            items
        },
        type: keys.GET_EMPLOYEES_SUCCESS
    }
}
function deletedEmployeeInProgress(): IDeleteEmployeeProgressAction {
    return {
        type: keys.DELETE_EMPLOYEE_IN_PROGRESS
    }
}
function deletedEmployeeFail( error: Error): IDeleteEmployeeFailAction {
    return {
        payload: {
            error
        },
        type: keys.DELETE_EMPLOYEE_FAIL
    }
}
function deletedEmployeeSuccess( status: string): IDeleteEmployeeSuccessAction {
    return {
        payload: {
            status
        },
        type: keys.DELETE_EMPLOYEE_SUCCESS
    }
}
function addedEmployeeInProgress(): IAddEmployeeProgressAction {
    return {
        type: keys.ADD_EMPLOYEE_IN_PROGRESS
    }
}
function addedEmployeeFail( error: Error): IAddEmployeeFailAction {
    return {
        payload: {
            error
        },
        type: keys.ADD_EMPLOYEE_FAIL
    }
}
function addedEmployeeSuccess( status: string): IAddEmployeeSuccessAction {
    return {
        payload: {
            status
        },
        type: keys.ADD_EMPLOYEE_SUCCESS
    }
}
function updatedEmployeeInProgress(): IUpdateEmployeeProgressAction {
    return {
        type: keys.UPDATE_EMPLOYEE_IN_PROGRESS
    }
}
function updatedEmployeeFail( error: Error): IUpdateEmployeeFailAction {
    return {
        payload: {
            error
        },
        type: keys.UPDATE_EMPLOYEE_FAIL
    }
}
function updatedEmployeeSuccess( status: string): IUpdateEmployeeSuccessAction {
    return {
        payload: {
            status
        },
        type: keys.UPDATE_EMPLOYEE_SUCCESS
    }
}
