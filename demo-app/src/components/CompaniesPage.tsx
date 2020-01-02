import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import IStoreState from '../store/IStoreState';
import ICompany from '../models/ICompany';
import ICompanyAddresses from '../models/ICompanyAddresses';
import IEmployee from '../models/IEmployee';
import IProject from '../models/IProject';
import CompanyAddresses from './companies/CompanyAddresses';
import CompanyProject from './companies/CompanyProject';
import CompanyEmployee from './companies/CompanyEmployee';
import {
    getCompany as getCompanyAction
} from '../actions/company/companyActions';
import {
    getCompanyAddresses as getCompanyAddressesAction
} from '../actions/company-addresses/companyAddressesAction';
import {
    getEmployees as getEmployeesAction,
    deletedEmployee as deletedEmployeeAction,
    addedEmployee as addedEmployeeAction,
    updatedEmployee as updatedEmployeeAction,
    updatedEmployees as updatedEmployeesAction,
} from '../actions/employee/employeesAction';
import {
    getProjects as getProjectsAction,
    deletedProject as deletedProjectAction,
    addedProject as addedProjectAction,
    updatedProject as updatedProjectAction,
} from '../actions/project/projectsAction';
import { isPendingActions, makeId } from '../selectors';
import { Accordion, Icon, AccordionTitle, AccordionContent, Modal, Header } from 'semantic-ui-react';
interface ICompaniesPageProps {
    readonly actionInProgress: Readonly<boolean>;
    readonly companies: ReadonlyArray<ICompany>;
    readonly companyAddresses: ReadonlyArray<ICompanyAddresses>;
    employees: Array<IEmployee>;
    projects: Array<IProject>;
    getCompany: () => (dispatch: Dispatch<any>) => Promise<void>;
    getCompanyAddresses: () => (dispatch: Dispatch<any>) => Promise<void>;
    getEmployees: () => (dispatch: Dispatch<any>) => Promise<void>;
    deletedEmployee: (id: string) => (dispatch: Dispatch<any>) => Promise<void>;
    addEmployee: (employee: IEmployee) => (dispatch: Dispatch<any>) => Promise<void>;
    updatedEmployee: (employee: IEmployee) => (dispatch: Dispatch<any>) => Promise<void>;
    updatedEmployees: (employee: Array<IEmployee>) => (dispatch: Dispatch<any>) => Promise<void>;
    getProjects: () => (dispatch: Dispatch<any>) => Promise<void>;
    deletedProject: (id: string) => (dispatch: Dispatch<any>) => Promise<void>;
    addProject: (project: IProject) => (dispatch: Dispatch<any>) => Promise<void>;
    updatedProject: (project: IProject) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface ICompaniesPageState {
    indexValueAccCompany?: number;
    indexValueAccEmployee?: number;
    modalOpen: ReadonlyArray<boolean>;
    modalOpenEmployee: ReadonlyArray<boolean>;
    projects: Array<IProject>;
    employees: Array<IEmployee>;
    newProject: IProject;
    newEmployee: IEmployee;
    selectedEmployeeToProject: Array<IEmployee>;
}
class CompaniesPage extends React.Component<ICompaniesPageProps, ICompaniesPageState> {
    // @ts-ignore
    state = {
        modalOpen: [],
        modalOpenEmployee: [],
        indexValueAccCompany: null,
        indexValueAccEmployee: null,
        projects: this.props.projects,
        employees: this.props.employees,
        newEmployee: {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            companyId: '',
            jobTitle: '',
            jobArea: '',
            jobType: '',
        },
        newProject: {
            id: '',
            name: '',
            department: '',
            companyId: '',
            employeesId: [],
        },
        selectedEmployeeToProject: [],
    };

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: ICompaniesPageProps) {
        super(props);
        this.state = {
            modalOpen: [],
            modalOpenEmployee: [],
            indexValueAccCompany: null,
            indexValueAccEmployee: null,
            projects: this.props.projects,
            employees: this.props.employees,
            newEmployee: {
                id: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                companyId: '',
                jobTitle: '',
                jobArea: '',
                jobType: '',
            },
            newProject: {
                id: '',
                name: '',
                department: '',
                companyId: '',
                employeesId: [],
            },
            selectedEmployeeToProject: [],
        };
        this.handleClickAccordion = this.handleClickAccordion.bind(this);
        this.handleClickEmployeeAccordion = this.handleClickEmployeeAccordion.bind(this);
        this.editProject = this.editProject.bind(this);
        this.editEmpoyee = this.editEmpoyee.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.removeEmployeeToProject = this.removeEmployeeToProject.bind(this);
        this.removeSelectedEmployee = this.removeSelectedEmployee.bind(this);
        this.newProject = this.newProject.bind(this);
        this.editItem = this.editItem.bind(this);
        this.newEmployee = this.newEmployee.bind(this);
        this.resetStateModal = this.resetStateModal.bind(this);
    }

    componentDidMount() {
        this.props.getCompany();
        this.props.getCompanyAddresses();
        this.props.getEmployees();
        this.props.getProjects();

    }
    public render() {
        let listCompanies;
        if (this.props.actionInProgress) {
            return <span>Loading...</span>;
        }
        const isNewProjects = this.props.projects;
        const isNewEmployees = this.props.employees;
        if (this.props.companies) {
            listCompanies = this.props.companies.map((item: ICompany, keyCompany: number) => {
                const modalProject = (<Modal
                    closeOnDimmerClick
                    trigger={<button>New Project<Icon name='add'></Icon></button>}
                    open={this.state.modalOpen[keyCompany]}
                    className='bg-white shadow-md rounded'
                    closeIcon
                    size='small'>
                    <Header icon='browser' content='new Project' />
                    <Modal.Content>
                        <h3>Add new Project</h3>
                        <form className='flex-wrap flex'>
                            <p className='w-1/2 pr-1'>
                                <label className='label' >name</label>
                                <input type='text'
                                       name='name'
                                       value={this.state.newProject.name}
                                       className={`${!this.state.newProject.name
                                ? 'border-red-200 ' : null } leading-tight shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline`}
                                             onChange={(event) =>
                                                 this.newProject(event,
                                                     keyCompany)}
                                        />
                            </p>
                            <p className='w-1/2'>
                                <label className='label'>
                                    department</label> <input type='text' name='department'
                                                              value={this.state.newProject.department}
                                                   className={`${!this.state.newProject.department
                                ? 'border-red-200 ' : null}shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                                   onChange={(event) =>
                                                       this.newProject(event,
                                                           keyCompany)}
                                                               />
                            </p>
                            <p className='w-full'>
                                Select Employee:
                                <select name='employeesId' onChange={(event) =>
                                    this.newProject(event,
                                        keyCompany)}
                                        className='block appearance-none w-full
                                bg-gray-200 border border-gray-200
                                text-gray-700 py-3 px-4 pr-8 rounded
                                leading-tight focus:outline-none focus:bg-white
                                focus:border-gray-500'> {this.props.employees.map((employee, index) => (
                                    <option key={index} value={index}>{employee.lastName}</option>
                                ))}</select>
                            </p>
                            {this.state.selectedEmployeeToProject.length > 0 &&
                            this.state.selectedEmployeeToProject.map((employee:IEmployee, key: number) => (
                                <article className='  border-t-2 border-teal-100 mt-3
                                    ' key={key}>
                                    <div><div className='cursor w-full' onClick={() => this.removeSelectedEmployee(key)}><Icon name='trash' ></Icon> </div></div>
                                  <div className='flex items-stretch'>
                                      <p>First Name {employee.firstName}</p>
                                      <p>Last Name {employee.lastName}</p>
                                      <p>DOB { new Date (employee.dateOfBirth).toLocaleDateString()}</p>
                                      <p>Job Area {employee.jobArea}</p>
                                      <p>Job Title {employee.jobTitle}</p>
                                      <p>Job Type {employee.jobType}</p>
                                  </div>
                                </article>
                            ))}
                        </form>
                        <p>Company this is index Company:{keyCompany}</p>
                    </Modal.Content>
                    <Modal.Actions>

                        <button
                            disabled={!this.state.newProject.name || !this.state.newProject.department}
                            className={`${!this.state.newProject.name || !this.state.newProject.department ? 
                                'cursor-not-allowed' : null} bg-white hover:bg-gray-100 font-semibold
                                            border border-gray-400 rounded shadow text-teal-800  py-2 px-4 rounded`}
                                onClick={() => this.editItem(item.id, 'added', keyCompany, 'project')}>
                            <Icon name='checkmark' /> Add New</button>
                    </Modal.Actions>
                </Modal>);
                const modalEmployee = (<Modal
                    closeOnDimmerClick
                    trigger={<button>New Employee<Icon name='add'></Icon></button>}
                    open={this.state.modalOpenEmployee[keyCompany]}
                    className='bg-white shadow-md rounded'
                    size='small'
                    closeIcon
                >
                    <Header icon='browser' content='new Employee' />
                    <Modal.Content>
                        <h3 className='font-bold text-xl mb-2'>Add new Employee</h3>
                        <form className='flex-wrap flex'>
                            <p className='w-1/2 pr-1'>
                                First Name: <input type='text' name='firstName' value={this.state.newEmployee.firstName}
                                                   className={`${!this.state.newEmployee.firstName
                                ? 'border-red-200 ' : null } leading-tight shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline`}
                                                   onChange={(event) =>
                                                       this.newEmployee(event, keyCompany)}
                                                  />
                            </p>
                            <p className='w-1/2'>
                                Last Name: <input type='text' name='lastName'
                                                  value={this.state.newEmployee.lastName}
                                                  onChange={(event) =>
                                                      this.newEmployee(event, keyCompany)}
                                                  className={`${!this.state.newEmployee.lastName
                                ? 'border-red-200 ' : null } leading-tight shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline`}

                                                   />
                            </p>
                            <p className='w-1/2 pr-1'>
                                Date Of Birth: <input type='date' name='dateOfBirth'
                                                      className={`${!this.state.newEmployee.dateOfBirth
                                ? 'border-red-200 ' : null } leading-tight shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline`}
                                                      onChange={(event) =>
                                                          this.newEmployee(event, keyCompany)}
                                                      value={this.state.newEmployee.dateOfBirth}/>
                            </p>
                            <p className='w-1/2'>
                                Job Title: <input type='text' name='jobTitle' className='shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                  onChange={(event) =>
                                                      this.newEmployee(event, keyCompany)}
                                                  value={this.state.newEmployee.jobTitle} />
                            </p>
                            <p className='w-1/2 pr-1'>
                                Job Area: <input type='text' name='jobArea' className='shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                 onChange={(event) =>
                                                     this.newEmployee(event, keyCompany)}
                                                 value={this.state.newEmployee.jobArea}/>
                            </p>
                            <p className='w-1/2'>
                                jobType: <input type='text' name='jobType' className='shadow appearance-none border rounded
                                w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                onChange={(event) =>
                                                    this.newEmployee(event, keyCompany)}
                                                value={this.state.newEmployee.jobType}/>
                            </p>
                        </form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button disabled={!this.state.newEmployee.firstName &&
                        !this.state.newEmployee.lastName && !this.state.newEmployee.dateOfBirth}
                                className={`${!this.state.newEmployee.firstName && 
                                !this.state.newEmployee.lastName && !this.state.newEmployee.dateOfBirth ?
                                    'cursor-not-allowed' : null} bg-white hover:bg-gray-100 font-semibold
                                            border border-gray-400 rounded shadow text-teal-800  py-2 px-4 rounded`}
                                onClick={() => this.editItem(item.id, 'added', keyCompany, 'employee')}>
                            <Icon name='checkmark' /> Add New</button>
                    </Modal.Actions>
                </Modal>);
                return (
                    <Accordion className='font-sans text-teal-800 mt-1 mb-2 border-b border-gray-300
                        mt-1 mb-1
                        ' key={item.id}>
                        <AccordionTitle
                            active={this.state.indexValueAccCompany === keyCompany}
                            index={keyCompany}
                            onClick={(event) => this.handleClickAccordion(keyCompany)}
                        >{item.name}</AccordionTitle>
                        <AccordionContent active={this.state.indexValueAccCompany === keyCompany}>
                            <h2 className='font-bold text-xl mb-2'>Employee job area</h2>
                            <div className='w-full flex justify-center md:justify-end lg:justify-end '>{modalProject}</div>
                            <section className='flex flex-wrap border-l border-r border-gray-300'>
                                {this.props.companyAddresses.map((itemCA: ICompanyAddresses, key: number) =>
                                        (itemCA.companyId === item.id ? <CompanyAddresses
                                            isWaitingFor={this.props.actionInProgress}
                                            companyAddresses={itemCA} key={item.id} /> : null))}
                                <article className='w-4/5 flex flex-wrap' >
                                    {isNewProjects.map((itemProject: IProject, keyProject: number) =>
                                            (itemProject.companyId === item.id ? <CompanyProject
                                            key={keyProject} indexProject={keyProject}
                                            isWaitingFor={this.props.actionInProgress}
                                            companyEmployees={this.props.employees}
                                            companyProject={itemProject} handleClick={this.editItem}
                                            handleEditChange={this.editProject}
                                            handleRemoveEmployeeToProject={this.removeEmployeeToProject}
                                            saveProject={this.saveProject}/> : null))}
                                </article>
                            </section>
                            {modalEmployee}
                            <section className='flex justify-start bg-gray-200'>
                                {isNewEmployees.map((itemEmployee: IEmployee, keyEmployee: number) => (
                                        itemEmployee.companyId === item.id ? <CompanyEmployee key={keyEmployee}
                                            indexEmployee={keyEmployee} isWaitingFor={this.props.actionInProgress}
                                            companyEmployee={itemEmployee}
                                            indexValueAccEmployee={this.state.indexValueAccEmployee}
                                            handleClickEmployeeAccordion={this.handleClickEmployeeAccordion}
                                            saveEmployee={this.saveEmployee}
                                            handleEditChange={this.editEmpoyee}
                                            titleAccordion={'Employee'} handleClick={this.editItem}
                                        />: null))}
                            </section>
                        </AccordionContent>
                    </Accordion>
                );
            });
        }
        return (
            <div>
                <h2 className='font-bold text-2xl mb-2'>Company name</h2>
                {listCompanies}
            </div>
        );
    }
    private readonly handleClickAccordion = (titleProps: number): void => {
        // @ts-ignore
        const index = titleProps;
        const newIndex = this.state.indexValueAccCompany === index ? -1 : index;
        this.setState({indexValueAccCompany: newIndex});
    };
    private readonly handleClickEmployeeAccordion = (titleProps: number): void => {
        // @ts-ignore
        const index = titleProps;
        const newIndex = this.state.indexValueAccEmployee === index ? -1 : index;
        this.setState({indexValueAccEmployee: newIndex});
    };
    // counter: number = 0;
    private readonly newProject = (event: any, index: number): void => {
        const companies = this.props.companies;
        const id = companies[index].id;
        const isNewProject = this.state.newProject;
        isNewProject.companyId = id;
        isNewProject.id = makeId(40);
        switch (event.currentTarget.name) {
            case 'name':
                isNewProject.name = event.target.value;
                break;
            case 'department':
                isNewProject.department = event.target.value;
                break;
            case 'employeesId':
                // @ts-ignore
                const employees = [...this.props.employees];
                const newSelectedEmployees = [...this.state.selectedEmployeeToProject];
                employees[event.target.value].companyId = id;
                // @ts-ignore
                newSelectedEmployees.push(employees[event.target.value]);
                const employeeId: string = employees[event.target.value].id;
                this.setState({ selectedEmployeeToProject: newSelectedEmployees});
                // @ts-ignore
                isNewProject.employeesId.push(employeeId);
                break;
            default:
                return;
        }
        this.setState({ newProject: isNewProject });
    };
    private readonly removeSelectedEmployee = (index: number): void => {
        const newSelected = [...this.state.selectedEmployeeToProject];
        newSelected.splice(index, 1);
        this.setState({selectedEmployeeToProject: newSelected});
    };
    private readonly removeEmployeeToProject = (employee: IEmployee, indexProject: number): void => {
        const projects: Array<IProject> = [...this.props.projects];
        for (let i = 0; i < projects[indexProject].employeesId.length; i ++) {
            if (employee.id === projects[indexProject].employeesId[i]) {
                projects[indexProject].employeesId.splice(i);
            }
        }
        this.props.updatedProject(projects[indexProject]);
    };
    private readonly saveProject = (project: IProject): void => {
        this.props.updatedProject(project);
        this.resetStateModal();
    };
    private readonly editProject = (event: any, project: IProject, index: number): void => {
        // @ts-ignore
        const newProject = project;
        switch (event.currentTarget.name) {
            case 'name':
                newProject.name = event.target.value;
                break;
            case 'department':
                newProject.department = event.target.value;
                break;
            default:
                return;
        }
        const newState = [...this.state.projects];
        newState[index] = newProject;
        this.setState({projects: newState});

    };
    private readonly newEmployee = (event: any, index: number): void => {
        const company = [...this.props.companies];
        const id = company[index].id;
        const isNewEmployee = this.state.newEmployee;
        isNewEmployee.companyId = id;
        isNewEmployee.id = makeId(40);
        switch (event.currentTarget.name) {
            case 'firstName':
                 isNewEmployee.firstName = event.target.value;
                break;
            case 'lastName':
                 isNewEmployee.lastName = event.target.value;
                break;
            case 'dateOfBirth':
                isNewEmployee.dateOfBirth = event.target.value;
                break;
            case 'jobTitle':
                isNewEmployee.jobTitle = event.target.value;
                break;
            case 'jobArea':
                isNewEmployee.jobArea = event.target.value;
                break;
            case 'jobType':
                isNewEmployee.jobType = event.target.value;
                break;
            default:
                return;
        }
        this.setState({ newEmployee: isNewEmployee});
    };
    private readonly editEmpoyee = (event: any, employee: IEmployee, index: number): void => {
        // @ts-ignore
        const isNewEmployee = employee;
        switch (event.currentTarget.name) {
            case 'firstName':
                isNewEmployee.firstName = event.target.value;
                break;
            case 'lastName':
                isNewEmployee.lastName = event.target.value;
                break;
            case 'dateOfBirth':
                isNewEmployee.dateOfBirth = event.target.value;
                break;
            case 'jobTitle':
                isNewEmployee.jobTitle = event.target.value;
                break;
            case 'jobArea':
                isNewEmployee.jobArea = event.target.value;
                break;
            case 'jobType':
                isNewEmployee.jobType = event.target.value;
                break;
            default:
                return;
        }
        const newState = [...this.state.employees];
        newState[index] = isNewEmployee;
        this.setState({employees: newState});

    };
    private readonly saveEmployee = (employee: IEmployee): void => {
        this.props.updatedEmployee(employee);
        this.resetStateModal();
    };
    private readonly editItem = (companyId: string, handler: string, index: number, item: string): void => {
        if (handler === 'added') {
            if (item === 'project') {
                this.props.addProject(this.state.newProject);
                if (this.state.selectedEmployeeToProject.length){
                    this.props.updatedEmployees(this.state.selectedEmployeeToProject);
                }

            } else {
                this.props.addEmployee(this.state.newEmployee);
            }
            this.resetStateModal();
        }else {
            if (item === 'project') {
                this.props.deletedProject(this.props.projects[index].id);
            }else {
                this.props.deletedEmployee(this.props.employees[index].id);
            }
        }
    };
    private resetStateModal (): void {
        const newEmployee: IEmployee = {
            id: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                companyId: '',
                jobTitle: '',
                jobArea: '',
                jobType: '',
        };
        const newProject: IProject = {
            id: '',
                name: '',
                department: '',
                companyId: '',
                employeesId: [],
        },
        selectedEmployeeToProject = new Array();
        this.setState({
            newProject: newProject,
            newEmployee: newEmployee,
            selectedEmployeeToProject: selectedEmployeeToProject
        })
    }

}
function mapStateToProps(
    state: IStoreState
) {
    return {
        companies: state.companies.items,
        companyAddresses: state.companyAddresses.items,
        employees: state.employees.items,
        projects: state.projects.items,
        actionInProgress: isPendingActions(state),
    };
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getCompany: bindActionCreators(getCompanyAction, dispatch),
        getCompanyAddresses: bindActionCreators(getCompanyAddressesAction, dispatch),
        getEmployees: bindActionCreators(getEmployeesAction, dispatch),
        deletedEmployee: bindActionCreators(deletedEmployeeAction, dispatch),
        addEmployee: bindActionCreators(addedEmployeeAction, dispatch),
        updatedEmployee: bindActionCreators(updatedEmployeeAction, dispatch),
        updatedEmployees: bindActionCreators(updatedEmployeesAction, dispatch),
        getProjects: bindActionCreators(getProjectsAction, dispatch),
        deletedProject: bindActionCreators(deletedProjectAction, dispatch),
        addProject: bindActionCreators(addedProjectAction, dispatch),
        updatedProject: bindActionCreators(updatedProjectAction, dispatch),
    };
};
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)
(CompaniesPage);
