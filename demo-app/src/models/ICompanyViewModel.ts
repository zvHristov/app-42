import ICompany from "./ICompany";
import ICompanyAddresses from "./ICompanyAddresses";
import IProject from "./IProject";
import IEmployee from "./IEmployee";

export default interface ICompanyViewModel extends ICompany {
    companyAddresses: ReadonlyArray<ICompanyAddresses>;
    projects: ReadonlyArray<IProject>;
    employee: ReadonlyArray<IEmployee>;
}
