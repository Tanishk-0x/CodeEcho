import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ( {children} ) => {

    const isAdmin = localStorage.getItem('@G#r$T!w*L&A') === 'true' ; 

    if(!isAdmin){
        return <Navigate to='/login' replace/>
    }

    return children ; 

}; 


export default ProtectedRoute
