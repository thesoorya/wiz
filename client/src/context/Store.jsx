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
        } finally {
            setLoading(false);
        }
    };

    const getProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/auth/profile`, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
                console.log(user)
            } else {
                console.log(response.data.message || 'Failed to fetch profile!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while fetching the profile.');
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
        getProfile,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default Store;
