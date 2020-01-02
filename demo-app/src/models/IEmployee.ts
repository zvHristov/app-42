export default interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    companyId: string;
    jobTitle: string;
    jobArea: string;
    jobType: string;
}
export default class ViewModelEmployee implements IEmployee {
    constructor(
        employee: {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            companyId: '',
            jobTitle: '',
            jobArea: '',
            jobType: '',
        }
    ) {
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.companyId = employee.companyId;
        this.jobTitle = employee.jobTitle;
        this.jobArea = employee.jobArea;
        this.jobType = employee.jobType;
    }
}
