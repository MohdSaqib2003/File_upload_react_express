import React from 'react';

const Message = ({ msg }) => {
    if (msg == "File uploaded") {
        return <div className="alert alert-success alert-dismissible fade show" role="alert">
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    } else return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}
export default Message;