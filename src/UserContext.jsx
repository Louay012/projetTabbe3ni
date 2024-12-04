import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [userDetails, setUserDetails] = useState(null);

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails)); // Parse the stored JSON string back into an object
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    // Log userDetails when it updates
    useEffect(() => {
        console.log(userDetails); // This will log the updated userDetails when it changes
    }, [userDetails]); // This useEffect runs whenever userDetails changes

    // Save user data to localStorage whenever userDetails changes

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};                                                      