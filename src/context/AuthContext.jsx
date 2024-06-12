import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token') || null);
            setUserData(JSON.parse(localStorage.getItem('userData')) || null);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateAuthData = (newToken, newUserData) => {
        setToken(newToken);
        setUserData(newUserData);

        localStorage.setItem('token', newToken);
        localStorage.setItem('userData', JSON.stringify(newUserData));
    };

    const clearAuthData = () => {
        setToken(null);
        setUserData(null);

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ token, userData, updateAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};
