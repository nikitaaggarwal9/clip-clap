import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Feed from './Feed';

function PrivateRoute({children}) {
    const { user } = useContext(AuthContext)
    console.log(user)
    return  user!==null ? children: <Navigate to="/login" />
}

export default PrivateRoute