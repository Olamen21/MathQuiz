import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: '',
        username: '',
        email: '',
        profileImage: ''
    });

    // Add logic to fetch user data initially and whenever necessary

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
