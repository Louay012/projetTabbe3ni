import React,{ useEffect, useState } from "react";
import Sidebar from './sidebar';
import "./categorie.css";
import { FaRandom } from "react-icons/fa";
function DashboardSection() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  const [incomeSources, setIncomeSources] = useState([]);
  const [spendings, setSpendings] = useState([]);

  const user_id=2;
  const fetch_Categories=async () => {
try{
    
  const response= await fetch('http://localhost/TABBE3NI/API/get_categories.php' ,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        user_id:user_id ,
       }),
})

        const data = await response.json();
        console.log(data.success);
        console.log(data.message);
            if (data.success) {
                setIncomeSources(data.data1);
                setSpendings(data.data2);
            }
             else {
            setError(data.message || "Failed to fetch transactions.");

            }
        } catch (err) {
            setError("An error occurred while fetching transactions." );
            console.log(err);
        } finally {
            setLoading(false);
        }
        
    }
    useEffect(() => {fetch_Categories()
    },[ ])  ;    

return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
    <div className="dashboard-section">
      
      <div className="income-source">
        <h3>Income Source</h3>
        <div className="source-items">
          {incomeSources.map((income) => 
            <div key={income.id} className="source-item">
              <p>{income.category}</p>
              <h4>{income.total_amount}$</h4>
            </div>
          )}
        </div>
      </div>
      <table>
                        { incomeSources.map((transaction)=>
                        <tr key={transaction.id} className='odd:bg-white even:bg-gray-100 hover:bg-blue-100'> 
                                <td className='border-1 border-gray-300'>{transaction.id}</td>
                                <td className='border-1 border-gray-300'>{transaction.category}</td>
                                <td className='border-1 border-gray-300'>{transaction.total_amount}</td>
                            
                            </tr>)}
                
               </table>
      {/* Spendings */}
      <div className="spendings">
        <h3>Spendings</h3>
        <div className="spending-items">
          {spendings.map((spending) => (
            <div
              key={spending.id}
              className="spending-item"
              style={{ backgroundColor:"blue"  }}
            >
              <p>{spending.category}</p>
              <h4>${spending.total_amount}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>

}
export default DashboardSection;