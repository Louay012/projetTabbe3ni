import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [userDetails, setUserDetails] = useState(null);

    
    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails)); 
        }
    }, []); 

 
    useEffect(() => {
        console.log(userDetails);
    }, [userDetails]);

    

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};                                                      