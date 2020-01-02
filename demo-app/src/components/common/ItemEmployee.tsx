
import * as React from "react";
import IEmployee from "../../models/IEmployee";
import EmptyMessage from '../common/EmptyMessage';
import {Accordion, AccordionContent, AccordionTitle, Icon} from "semantic-ui-react";
interface IEmployeeProps {
    employee: IEmployee;
    index: number;
    isWaitingFor: boolean;
    indexProject: number;
    handleRemoveEmployeeToProject: (employee: IEmployee, indexProject: number) => void;
}
export default function ItemEmployee(props: IEmployeeProps) {
    let element: JSX.Element | null = null;
    if(props.employee) {
        element = <Accordion className='px-3 py-1 overflow-hidden border-t-2 border-teal-100'>
            <AccordionTitle
                active={true}
                index={props.index}
            >
                <h2 className='text-md font-semibold  text-teal-800 py-2'>{props.employee.lastName} -
                      {props.employee.jobType}
                    <i onClick={() =>
                        props.handleRemoveEmployeeToProject(props.employee, props.indexProject)}><Icon name='trash alternate'
                    ></Icon>
                    </i></h2>
            </AccordionTitle>
            <AccordionContent active={true}>
                <article className='flex items-stretch '>
                    <p>First Name {props.employee.firstName}</p>
                    <p>Last Name {props.employee.lastName}</p>
                    <p>DOB { new Date (props.employee.dateOfBirth).toLocaleDateString()}</p>
                    <p>Job Area {props.employee.jobArea}</p>
                    <p>Job Title {props.employee.jobTitle}</p>
                    <p>Job Type {props.employee.jobType}</p>
                </article>
            </AccordionContent>
        </Accordion>
    }else if(!props.isWaitingFor){
        element = (<EmptyMessage emptyMessageTitle='Employee description section' emptyMessageDescription='Waiting...'/>);
    }
    return element;
}
