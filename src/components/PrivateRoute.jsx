import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentAdmin } = useSelector((state) => state.admin);

    return currentAdmin ? <Outlet/> : <Navigate to={'/'}/>
}
