import ICompanyViewModel from "../models/ICompanyViewModel";
import ICompany from "../models/ICompany";
import ICompanyAddresses from "../models/ICompanyAddresses";
import IProject from "../models/IProject";
import IEmployee from "../models/IEmployee";
export default interface IStoreState {
    companies: ICompaniesStoreState;
    companyAddresses: ICompanyAddressesStoreState;
    projects: IProjectsStoreState;
    employees: IEmployeesStoreState;
    readonly pendingActions: number;
}
export interface ICompaniesStoreState {
    isFetching: boolean;
    items: ReadonlyArray<ICompany>;
}
export interface ICompanyAddressesStoreState {
    isFetching: boolean;
    items: ReadonlyArray<ICompanyAddresses>;
}
export interface IProjectsStoreState {
    isFetching: boolean;
    items: ReadonlyArray<IProject>;
}
export interface IEmployeesStoreState {
    isFetching: boolean;
    items: ReadonlyArray<IEmployee>;
}
