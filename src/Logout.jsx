import React from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear context and LocalStorage
    setUserDetails({
      userId: null,
      name: null,
    });

    localStorage.removeItem('userDetails'); // Remove data from LocalStorage

    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;