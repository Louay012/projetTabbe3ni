import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar';


function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        const fetch_income=async () => {
            
            try{
           
                const response=await fetch('http://localhost/TABBE3NI/API/income.php?user_id=2' ,{ method: 'GET'})


                const data = await response.json();

                if (data.success) {
                  setIncome(data.data);
                } else {
                setError(data.message || "Failed to fetch income.");

                }
            } catch (err) {
                setError("An error occurred while fetching budgets.");

            } finally {
                setLoading(false);
            }
            }
            fetch_income()
        },[])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(income)
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>

              <div className='bg-violet-100 flex-1 m-2 rounded-lg p-4 '>
              <div className=' flex flex-row flex-wrap gap-10'>
              <div>
                <tr>
                  <th>category</th>
                  <th>date</th>
                  <th>amount</th>
                  <th>description</th>
                </tr>
                
                {income.map((int)=><tr>
                <td>{int.category_name}</td>
                <td>{int.transaction_date}</td>
                <td>{int.amount}</td>
                <td>{int.description}</td></tr>
              )}
              
              </div>
              </div>
              </div>
    </div>
}
export default Income;
