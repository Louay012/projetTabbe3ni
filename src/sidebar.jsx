import React, { useState } from 'react'

import { Link   } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";

function Sidebar() {
  
  return (
    <div className='bg-zinc-800 flex flex-col items-center  font-mono text-lg text-gray-50 w-1/6 '>
                <div className='flex-1 flex flex-col items-center py-3  gap-10 '>
                    <h2>User</h2>
                    <ul className='list-none flex flex-col  ' >
                      <li className='py-2 px-2 flex gap-2 items-center ' >
                      <Link className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-3' >
                        <BiDollarCircle className='text-inherit'/>
                         <span className='text-inherit'>Income</span> 
                         </Link>
                        </li>
                        <li className='py-2 px-2 flex gap-2 items-center ' >
                      <Link className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-3' >
                        <BiCartAlt className='text-inherit'/>
                         <span className='text-inherit'>Budgets</span> 
                         </Link>
                        </li>
                        <li className='py-2 px-2 flex gap-2 items-center ' >
                      <Link className='text-gray-50 no-underline  hover:text-purple-400 flex items-center gap-3' >
                        <HiOutlineShoppingBag className='text-inherit'/>
                         <span className='text-inherit'>Transactions</span> 
                         </Link>
                        </li>                    
                        </ul>
                    
                    </div>
                  <div className='h-28'>Logout</div>
              </div>
  )
}
export default Sidebar;
