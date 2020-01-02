export default interface IProject {
    id: string;
    name: string;
    department: string;
    companyId: string;
    employeesId: Array<string>;
}
