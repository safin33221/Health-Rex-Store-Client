import React, { useContext } from 'react';
import { authContext } from '../Providers/AuthProviders';

const useAuth = () => {
    const auth = useContext(authContext)
    return auth;
};

export default useAuth;