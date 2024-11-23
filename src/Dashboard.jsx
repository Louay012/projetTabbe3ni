import React, { useState } from 'react'
import BudgetCard from './BudgetCard'
import Sidebar from './sidebar';
import { Link   } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";

//import './dashboard.css';
function Dashboard() {
  const [hovered1,setHovered1]=useState('');
  const hoveron1 = () => setHovered1(true);
  const hoveroff1 = () => setHovered1(false);
  const [hovered2,setHovered2]=useState('');
  const hoveron2 = () => setHovered2(true);
  const hoveroff2 = () => setHovered2(false);
  const [hovered3,setHovered3]=useState('');
  const hoveron3 = () => setHovered3(true);
  const hoveroff3 = () => setHovered3(false);
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <div className='bg-zinc-800 flex flex-col items-center  font-mono text-lg text-gray-50 w-1/6 '>
                <div className='flex-1 flex flex-col justify-start  gap-10 '>
                    <h2>User</h2>
                    <ul className='list-none flex flex-col  ' >
                      <li className='py-2 px-2 flex gap-2 items-center ' onMouseOver={hoveron1} onMouseLeave={hoveroff1}><BiDollarCircle color={hovered1 ? '#9b72c7' : 'white'}/><Link className='text-gray-50 no-underline hover:text-purple-400' > Income</Link></li>
                      <li className='py-2 px-2 flex  items-center ' onMouseOver={hoveron2} onMouseLeave={hoveroff2}><BiCartAlt color={hovered2 ? '#9b72c7' : 'white'} /><Link className='text-gray-50 no-underline hover:text-purple-400 px-2'>Budgets</Link></li>
                      <li className='py-2 px-2 flex  items-center ' onMouseOver={hoveron3} onMouseLeave={hoveroff3}><HiOutlineShoppingBag color={hovered3 ? '#9b72c7' : 'white'}/><Link className='text-gray-50 no-underline hover:text-purple-400 px-2'>Transactions</Link></li>
                    </ul>
                    
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
