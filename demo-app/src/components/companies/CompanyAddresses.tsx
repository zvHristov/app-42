import * as React from "react";
import ICompanyAddresses from "../../models/ICompanyAddresses";
import EmptyMessage from "../common/EmptyMessage";

interface ICompanyAddressesProps {
    companyAddresses: ICompanyAddresses;
    isWaitingFor: boolean;
}
export default function CompanyAddresses(props: ICompanyAddressesProps) {
    let element: JSX.Element | null = null;
    if(props.companyAddresses) {
        element = <article className='w-1/5 px-3 py-1'>
            <p>City {props.companyAddresses.city}</p>
            <p>Country {props.companyAddresses.country}</p>
            <p>State {props.companyAddresses.state}</p>
            <p>Street {props.companyAddresses.street}</p>
        </article>;
    }else if(!props.isWaitingFor){
    element = (<EmptyMessage emptyMessageTitle='Company Addresses' emptyMessageDescription='Waiting...'/>);
    }
     return element;
}
