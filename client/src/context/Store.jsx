import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const StoreContext = createContext();

const Store = ({ children }) => {
    const baseURL = 'http://localhost:5000/api';
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signupAuth = async (credentials) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/auth/signup`, credentials, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
                toast.success('Signup successful!');
            } else {
                toast.error(response.data.message || 'Signup failed!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred during signup.');
        }
    };

    const loginAuth = async (credentials) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/auth/login`, credentials, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
                toast.success('Login successful!');
            } else {
                toast.error(response.data.message || 'Login failed!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred during login.');
        }
    };

    const logoutAuth = async (credentials) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/auth/logout`, credentials, { withCredentials: true });
            if (response.data.success) {
                setUser(null);
                toast.success('Logout successful!');
            } else {
                toast.error(response.data.message || 'Logout failed!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred during logout.');
        }
    };

    const getProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/auth/profile`, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                console.log(response.data.message || 'Failed to fetch profile!');
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        baseURL,
        user,
        setUser,
        loading,
        signupAuth,
        loginAuth,
        logoutAuth,
        getProfile,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default Store;
