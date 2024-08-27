import React from 'react';
import { AuthContext } from "../states/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { hasPrivilege } from '../helper/Helper'; // Import the privilege helper

const Auth = ({ requiredPrivileges }) => {
    const { loggedIn, profileData } = useContext(AuthContext);

    const userHasAccess = () => {
        // If no specific privileges are required, just check if the user is logged in
        if (!requiredPrivileges || requiredPrivileges.length === 0) {
            return loggedIn;
        }

        // Check if the user has any of the required privileges
        return requiredPrivileges.some(privilege =>
            hasPrivilege(profileData?.privileges, privilege, profileData?.user_type)
        );
    };

    return userHasAccess() ? <Outlet /> : <Navigate to="/" />;
};

export default Auth;

