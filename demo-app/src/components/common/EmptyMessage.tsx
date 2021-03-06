import * as React from 'react';
interface IEmptyMessageProps {
    readonly emptyMessageTitle: string;
    readonly emptyMessageDescription: string;
}

function EmptyMessage(props: IEmptyMessageProps) {
    return (
        <div className='alert alert-light' role='alert'>
            <p className='h2 alert-heading'>
                {props.emptyMessageTitle}
            </p>
            <p>
                {props.emptyMessageDescription}
            </p>
        </div>
    );
}

export default EmptyMessage;
