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
              <Sidebar></Sidebar>
              <div className='flex-1 bg-purple-50  m-3 rounded-lg p-4     shadow-md'>
                <div className=' w-full flex flex-row justify-start flex-wrap gap-10 '>
                
                  {budgets.map((budget)=><BudgetCard key={budget.budget_id} name={budget.category_name} max={budget.allocated_amount} 
                  amount={budget.amount} >
                    </BudgetCard>)}
                </div>
              </div>
    </div>
}
export default Budgets;