import * as React from 'react';
import IEmployee from "../../models/IEmployee";
import EmptyMessage from '../common/EmptyMessage';
import { Accordion, AccordionContent, AccordionTitle, Icon } from 'semantic-ui-react';

interface ICompanyEmployeeProps {
    titleAccordion: string;
    indexValueAccEmployee: null | number;
    indexEmployee: number;
    companyEmployee: IEmployee;
    saveEmployee: (employee: IEmployee) => void;
    handleClickEmployeeAccordion: (inde: number) => void;
    handleClick: (companyId: string, handler: string, index: number, item: string) => void;
    handleEditChange: (event: any, project: IEmployee, index: number) => void;
    isWaitingFor: boolean;
}
export default function CompanyEmployee(props: ICompanyEmployeeProps) {
    let element: JSX.Element | null = null;
    if(props.companyEmployee) {
        element = <Accordion className='px-3 py-1'>
            <AccordionTitle
                active={props.indexValueAccEmployee === props.indexEmployee}
                index={props.indexEmployee}
                onClick={() => props.handleClickEmployeeAccordion(props.indexEmployee)}
                className='font-sans text-teal-800 w-full'>
                {props.titleAccordion} {props.companyEmployee.lastName}
                <button onClick={() => {props.handleClick(props.companyEmployee.companyId, 'removed',
                            props.indexEmployee, 'employee')}}><Icon name='trash alternate'></Icon></button>
            </AccordionTitle>
            <AccordionContent active={props.indexValueAccEmployee === props.indexEmployee}>
                <form>
                    <p>First Name <input
                        className='bg-gray-200 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                            type='text'
                            name='firstName'
                            value={props.companyEmployee.firstName}
                            onChange={(event) =>
                                props.handleEditChange(event, props.companyEmployee, props.indexEmployee)}
                        />
                        <i onClick={() =>
                            props.saveEmployee(props.companyEmployee)}>
                            <Icon name='check'
                            ></Icon></i></p>
                    <p>Last Name <input
                        className='bg-gray-200 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                            type='text'
                            name='lastName'
                            value={props.companyEmployee.lastName}
                            onChange={(event) =>
                                props.handleEditChange(event, props.companyEmployee, props.indexEmployee)}
                        />
                        <i onClick={() =>
                            props.saveEmployee(props.companyEmployee)}>
                            <Icon name='check'
                            ></Icon></i>
                        </p>
                    <p>DOB { new Date (props.companyEmployee.dateOfBirth).toLocaleDateString()}</p>
                    <p>Job Area <input
                        className='bg-gray-200 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                            type='text'
                            name='jobArea'
                            value={props.companyEmployee.jobArea}
                            onChange={(event) =>
                                props.handleEditChange(event, props.companyEmployee, props.indexEmployee)}
                        />
                        <i onClick={() =>
                            props.saveEmployee(props.companyEmployee)}>
                            <Icon name='check'
                            ></Icon></i></p>
                    <p>Job Title <input
                        className='bg-gray-200 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                            type='text'
                            name='jobTitle'
                            value={props.companyEmployee.jobTitle}
                            onChange={(event) =>
                                props.handleEditChange(event, props.companyEmployee, props.indexEmployee)}
                        />
                        <i onClick={() =>
                            props.saveEmployee(props.companyEmployee)}>
                            <Icon name='check'
                            ></Icon></i></p>
                    <p>Job Type <input
                        className='bg-gray-200 hover:bg-tea-100
                        focus:outline-none focus:bg-tea-100 '
                            type='text'
                            name='jobType'
                            value={props.companyEmployee.jobType}
                            onChange={(event) =>
                                props.handleEditChange(event, props.companyEmployee, props.indexEmployee)}
                        />
                        <i onClick={() =>
                            props.saveEmployee(props.companyEmployee)}>
                            <Icon name='check'
                            ></Icon></i></p>
                </form>
            </AccordionContent>
        </Accordion>;
    }else if(!props.isWaitingFor){
        element = (<EmptyMessage emptyMessageTitle='Company Employee' emptyMessageDescription='Waiting...'/>);
    }
    return element;
}
