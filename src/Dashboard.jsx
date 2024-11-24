import React, { useState } from 'react'
import BudgetCard from './BudgetCard'
import Sidebar from './sidebar';
import { Link   } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";

//import './dashboard.css';
function Dashboard() {
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <div className='bg-zinc-800 flex flex-col items-center  font-mono text-lg text-gray-50 w-1/6 '>
                <div className='flex-1 flex flex-col items-center py-4  gap-10 '>
                    <h2>User</h2>
                    <ul className='list-none flex flex-col  ' >
                    <li className='py-2 px-1 flex  items-center ' >
                        <Link to={"/income"} className='flex  items-center gap-2 no-underline text-gray-50 hover:text-purple-400  px-2'>
                        <BiDollarCircle className='text-inherit' /> 
                        <span className='text-inherit'>Income </span>
                      </Link>
                      </li>


                      <li className='py-2 px-1 flex  items-center ' >
                        <Link to={"/budgets"} className='flex  items-center gap-2 no-underline text-gray-50 hover:text-purple-400  px-2'>
                        <BiCartAlt className='text-inherit' /> 
                        <span className='text-inherit'>Budgets </span>
                      </Link>
                      </li>


                      <li className='py-2 px-1 flex  items-center ' >
                        <Link to={"/transactions"} className='flex  items-center gap-2 no-underline text-gray-50 hover:text-purple-400  px-2'>
                        <HiOutlineShoppingBag className='text-inherit' /> 
                        <span className='text-inherit'>Transactions </span>
                      </Link>
                      </li>                    </ul>
                    
                    </div>
                  <div className='h-28'>Logout</div>
              </div>
              <div className='bg-violet-100 flex-1 m-2 rounded-lg p-4 '>
              <div className=' flex flex-row flex-wrap gap-10'>
              <BudgetCard></BudgetCard>
              <BudgetCard></BudgetCard>
              </div>
              </div>
    </div>
}
export default Dashboard;