import React, { useState ,useEffect} from 'react'
import BudgetCard from './BudgetCard'
import Sidebar from './sidebar';
import { Link   } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";

//import './dashboard.css';
function Budgets() {
    const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        const fetch_budgets=async () => {
            
            try{
           
                const response=await fetch('http://localhost/TABBE3NI/API/get_budgets.php?user_id=2' ,{ method: 'GET'})


                const data = await response.json();

                if (data.success) {
                setBudgets(data.data);
                } else {
                setError(data.message || "Failed to fetch budgets.");

                }
            } catch (err) {
                setError("An error occurred while fetching budgets.");

            } finally {
                setLoading(false);
            }
            }
            fetch_budgets()
        },[])
   
       
        
        

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



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
              <div className='bg-violet-100 flex-1 m-2 rounded-lg p-4  flex justify-center items-start'>
              <div className=' flex flex-row justify-start items-center flex-wrap gap-10 '>
              
              {budgets.map((budget)=><BudgetCard key={budget.budget_id} name={budget.category_name} max={budget.allocated_amount} 
              amount={budget.amount} >
                 </BudgetCard>)}
              </div>
              </div>
    </div>
}
export default Budgets;
