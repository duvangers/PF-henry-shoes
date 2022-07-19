import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { delLogin, getLogin } from "../../redux/actions";

export const LogoutButton = () => {
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getLogin(user))
    
    }, [])

    const logoutt = () => {
        dispatch(delLogin())
        logout({returnTo: window.location.origin})
    }
    
    
    return (
        <button onClick={logoutt}>Logout</button>
    )
}