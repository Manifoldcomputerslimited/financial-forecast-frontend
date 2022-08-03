import { useEffect } from "react";
import { useSelector } from "react-redux";
import {  Navigate } from "react-router-dom";

export const withAuth = () => (WrappedComponent) => {
    return (props) => {
        let isAuthenticated = useSelector((state) => state.auth.isAuthenticated === false)
        useEffect(() => {
           
        }, [isAuthenticated])
        return localStorage.getItem('accessToken') ? <WrappedComponent {...props} /> :   <Navigate to="/login" replace={true} />
    }
}