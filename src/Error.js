import React from 'react';
import { Redirect } from 'react-router-dom';
 
const Error = () => {
    return(
        // set timeout!
        <Redirect to="/" />
    )
}

export default Error;