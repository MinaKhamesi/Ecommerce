import React from 'react';
import {Spinner} from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner animation="border" variant="info" style={{
            width:'100px',
            height:'100px',
            display:'block',
            margin:'5rem auto'
        }} />
    )
}

export default Loader;
