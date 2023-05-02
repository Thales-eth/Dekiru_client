import React from 'react'
import { AuthContext } from '../contexts/auth.context'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader/Loader'

const IsPrivate = () => {
    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) return <Loader />

    if (!user) return <Navigate to={"/login"}></Navigate>

    return <Outlet />
}

export default IsPrivate