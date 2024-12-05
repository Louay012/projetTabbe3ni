import React from 'react';
import { Navigate } from 'react-router-dom';


// Protected Route to prevent unauthorized access
const ProtectedRoute = ({ children }) => {
 

  // If no user details (i.e., user is not logged in), redirect to the login page
  if (!localStorage.getItem('userDetails')) {
    return <Navigate to="/login"  />;
  }

  // If user is logged in, render the requested child component (Dashboard)
  return children;
};

export default ProtectedRoute;