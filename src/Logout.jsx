import React,{useContext} from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
 
const Logout = () => {
  const { setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear context and LocalStorage
    setUserDetails(null);

    localStorage.removeItem('userDetails'); // Remove data from LocalStorage

    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;