import * as React from 'react';
import IProject from '../../models/IProject';
import IEmployee from '../../models/IEmployee';
import EmptyMessage from '../common/EmptyMessage';
import { Icon } from 'semantic-ui-react';
import ItemEmployee from '../common/ItemEmployee';
interface ICompanyProjectProps {
    indexProject: number;
    companyProject: IProject;
    companyEmployees: Array<IEmployee>;
    saveProject: (project: IProject) => void;
    handleClick: (companyId: string, handler: string, index: number, item: string) => void;
    handleEditChange: (event: any, project: IProject, index: number) => void;
    handleRemoveEmployeeToProject: (employee: IEmployee, indexProject: number) => void;
    isWaitingFor: boolean;
}
export default function CompanyProject(props: ICompanyProjectProps) {
    let element: JSX.Element | null = null;
    // @ts-ignore
    let employeesToProject = [];
    if(props.companyProject) {
        for (let iProject = 0; iProject < props.companyProject.employeesId.length; iProject++) {
            for (let iEmployees = 0; iEmployees < props.companyEmployees.length; iEmployees++) {
                if(props.companyProject.employeesId[iProject] === props.companyEmployees[iEmployees].id) {
                    // @ts-ignore
                    employeesToProject.push(props.companyEmployees[iEmployees])
                }
            }
        }
        element = <article className='px-3 py-1 mb-2 border-collapse' key={props.companyProject.id}>
            <h2 className='text-lg text-teal-800 py-2'>Project {props.companyProject.name}
                <button
                    onClick={() => {
                        props.handleClick
                        (props.companyProject.companyId, 'removed', props.indexProject, 'project');
                    }}
                >
                    <Icon name='trash alternate'
                    ></Icon>
                </button>
            </h2>
            <form key={props.companyProject.id} className='border border-teal-100'>
                <p>Name <input
                    className='bg-gray-100 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                    type='text'
                    name='name'
                    onChange={(event) =>
                        props.handleEditChange(event, props.companyProject, props.indexProject)}
                    value={props.companyProject.name}
                />  <i onClick={() =>
                    props.saveProject(props.companyProject)}>
                    <Icon name='check'
                    ></Icon></i ></p>
                <p>Department <input
                    className='bg-gray-100 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                    type='text'
                    name='department'
                    onChange={(event) =>
                        props.handleEditChange(event, props.companyProject, props.indexProject)}
                    value={props.companyProject.department}
                /><i onClick={() =>
                    props.saveProject(props.companyProject)}>
                    <Icon name='check'
                    ></Icon></i ></p>
                {employeesToProject.map((item, key) =>(<ItemEmployee
                    handleRemoveEmployeeToProject={props.handleRemoveEmployeeToProject} key={key} indexProject={props.indexProject}
                    index={key} employee={item} isWaitingFor={props.isWaitingFor}/>))}
            </form>
        </article>;
    }else if(!props.isWaitingFor){
        element = (<EmptyMessage emptyMessageTitle='Company Project' emptyMessageDescription='Waiting...'/>);
    }
    return element;
}
