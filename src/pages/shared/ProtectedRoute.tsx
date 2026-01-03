import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

type protectedRouteProps = {
    children : ReactNode,
}
const ProtectedRoute = ( { children }: protectedRouteProps) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    return (
        <>
        {
            isAuthenticated ? children : <Navigate to = '/signin' />
        }
        </>
    )
}

export default ProtectedRoute
