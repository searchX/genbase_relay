import React, {createContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import privateRoutes from "../layouts/dashboard/config-navigation";
import {usePathname} from "../routes/hooks";
import {fetchCurrentUser} from "../utils/apis";

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("Genbase"));
    const [companyId, setCompanyId] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const pathname = usePathname()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Context-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await fetchCurrentUser(requestOptions)
                // const data = await response.json();
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                // setCompanyId(data.id);
                // setEmail(data.email);
                localStorage.setItem("Genbase", token);
                axios.interceptors.request.use(
                    (config) => {
                        // If the token is present, set it in the request headers
                        if (token) {
                            config.headers.Authorization = `Bearer ${token}`;
                        }
                        return config;
                    },
                    (error) =>
                        // If there's an error, reject the Promise with the error
                        Promise.reject(error)
                )
                console.log(companyId);
            } catch (error) {
                console.log(error);
                setToken(null);
                setCompanyId(null);
                navigate('/login');
            }
        };
        // To Check if the user is logged in and the token is valid Also to check if the user is trying to access a private route
        if (privateRoutes.some(route => route.path === pathname) && (companyId === '' || companyId === null)) {
            fetchUser();
        }
    }, [token, companyId]);
    const value = useMemo(() => ({
        token,
        setToken,
        companyId,
        setCompanyId,
        email,
        setEmail
    }), [token, companyId, email]);
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

