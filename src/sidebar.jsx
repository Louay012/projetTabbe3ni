
import Logout from './Logout';
import user_logo from './image/user_logo.png';
import { Link   } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiBorderAll } from "react-icons/bi";
import { IoStatsChartSharp } from "react-icons/io5";

function Sidebar({name}) {
  
  return (
    <div className='bg-zinc-800 flex flex-col items-center  font-mono text-lg text-gray-50 w-14 md:w-48 '>
                <div className='flex-1 flex flex-col items-center py-3  gap-10 '>
                    <h2>User : </h2>
                    <Link  to={"/dashboard"} ><img className='h-20 w-20 -mt-8 -mb-6' src={user_logo} alt=''></img></Link>
                    <span>{name}</span>
                    <ul className='list-none flex flex-col items-start ' >
                    <li className='py-2  flex gap-2 items-center md:px-3' >
                      <Link  to={"/dashboard"}className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-2' >
                        <IoStatsChartSharp className='text-inherit'/>
                         <span className='hidden  md:block text-inherit'>Dashboard</span> 
                         </Link>
                        </li>
                      <li className='py-2  flex gap-2 items-center md:px-3' >
                      <Link  to={"/income"}className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-2' >
                        <BiDollarCircle className='text-inherit'/>
                         <span className='hidden  md:block text-inherit'>Income</span> 
                         </Link>
                        </li>
                        <li className='py-2  flex gap-2 items-center md:px-3' >
                      <Link to={'/budgets'} className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-2' >
                        <BiCartAlt className='text-inherit'/>
                         <span className='hidden  md:block text-inherit'>Budgets</span> 
                         </Link>
                        </li>
                        <li className='py-2  flex gap-2 items-center md:px-3' >
                      <Link to={"/transactions"}className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-2' >
                        <HiOutlineShoppingBag className='text-inherit'/>
                         <span className='hidden  md:block text-inherit'>Expenses</span> 
                         </Link>
                        </li>   
                        <li className='py-2  flex gap-2 items-center md:px-3' >
                      <Link to={"/categories"}className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-2' >
                        <BiBorderAll className='text-inherit'/>
                         <span className='hidden  md:block text-inherit'>Categories</span> 
                         </Link>
                        </li>                  
                        </ul>
                    
                    </div>
                  <div className='h-28'><Logout/></div>
              </div>
  )
}
export default Sidebar;
