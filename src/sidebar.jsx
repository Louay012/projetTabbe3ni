
import Logout from './Logout';
import user_logo from './image/icons8-user-100.png';
import { Link   } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { IoStatsChartSharp } from "react-icons/io5";
import { BiDollarCircle } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiBorderAll } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import React,{useContext} from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ name }) => {
  const { setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear context and LocalStorage
    setUserDetails(null);

    localStorage.removeItem('userDetails'); // Remove data from LocalStorage

    navigate('/'); // Redirect to the home page
  };
  return (
    <div className="bg-zinc-800 flex flex-col py-4 px-2 font-mono text-lg text-gray-50 sm:w-16 md:w-48 min-h-screen">
      {/* Top Section with User Profile */}
      <div className="flex-1 flex flex-col items-center justify-start gap-10">
        <Link
          to="/profile"
          className="flex flex-col w-full items-center justify-between text-gray-50 no-underline hover:text-purple-400"
        >
          {/* User Icon (Mobile) */}
          <FaUser className="md:w-14 md:h-14 sm:block w-6 h-6 md:text-inherit" />
          {/* User Logo (Desktop) */}
         
          {/* User Name (Visible on larger screens) */}
          <span className="hidden md:block text-inherit font-bold font-mono">{name}</span>
        </Link>

        {/* Navigation Links */}
        <div className='flex justify-center items-center'>
        <div className="list-none flex flex-col items-start  w-full">
          {/* Dashboard */}
          <li className="py-2 flex gap-2 items-center md:px-3">
            <Link
              to="/dashboard"
              className="text-gray-50 no-underline hover:text-purple-400 flex items-center gap-2"
            >
              <IoStatsChartSharp className="text-inherit" />
              <span className="hidden md:block text-inherit">Dashboard</span>
            </Link>
          </li>

          {/* Income */}
          <li className="py-2 flex gap-2 items-center md:px-3">
            <Link
              to="/income"
              className="text-gray-50 no-underline hover:text-purple-400 flex items-center gap-2"
            >
              <BiDollarCircle className="text-inherit" />
              <span className="hidden md:block text-inherit">Income</span>
            </Link>
          </li>

          {/* Budgets */}
          <li className="py-2 flex gap-2 items-center md:px-3">
            <Link
              to="/budgets"
              className="text-gray-50 no-underline hover:text-purple-400 flex items-center gap-2"
            >
              <BiCartAlt className="text-inherit" />
              <span className="hidden md:block text-inherit">Budgets</span>
            </Link>
          </li>

          {/* Expenses */}
          <li className="py-2 flex gap-2 items-center md:px-3">
            <Link
              to="/transactions"
              className="text-gray-50 no-underline hover:text-purple-400 flex items-center gap-2"
            >
              <HiOutlineShoppingBag className="text-inherit" />
              <span className="hidden md:block text-inherit">Expenses</span>
            </Link>
          </li>

          {/* Categories */}
          <li className="py-2 flex gap-2 items-center md:px-3">
            <Link
              to="/categories"
              className="text-gray-50 no-underline hover:text-purple-400 flex items-center gap-2"
            >
              <BiBorderAll className="text-inherit" />
              <span className="hidden md:block text-inherit">Categories</span>
            </Link>
          </li>
        </div>
      </div>
      </div>

   
        
        <button className="h-28 flex items-center justify-center gap-2 w-full hover:text-purple-400" 
        onClick={handleLogout}>
          <i><TbLogout2 className='text-inherit'/></i> 
          <span className="hidden md:block text-inherit">Logout</span>
          </button>
      
    </div>
  );
};

export default Sidebar;