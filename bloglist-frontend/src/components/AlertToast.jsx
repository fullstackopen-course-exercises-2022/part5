import React from 'react';

const AlertToast = (props) => {
    if(props.message.includes('ERROR')) {
        return (
            <div className="alert alert-danger">
                {props.message === null ? null : props.message}
            </div>
        )
    } else {
        return (
            <div className="alert alert-success">
                {props.message === null ? null : props.message}
            </div>
        )
    }
}

export default AlertToast;