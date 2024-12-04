import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

// Protected Route to prevent unauthorized access
const ProtectedRoute = ({ children }) => {
  const { userDetails } = useContext(UserContext);

  // If no user details (i.e., user is not logged in), redirect to the login page
  if (!userDetails) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the requested child component (Dashboard)
  return children;
};

export default ProtectedRoute;