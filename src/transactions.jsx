import React, { useState ,useEffect} from 'react'
import Sidebar from './sidebar';
import './transaction.css';

function Transactions() {
    const [Transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('category');
    const user_id=2;


    
    const fetch_Transactions=async () => {
            
        
        try{
            
            const response=await fetch('http://localhost/TABBE3NI/API/get_transactions.php' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    choice:selectedChoice,
                    user_id:user_id ,
                    order :"date",}),
            })
            setLoading(false);
            const data = await response.json();
            console.log(data.test);
            if (data.success) {
            setTransactions(data.data);
            console.log(Transactions)
            
            } else {
            setError(data.message || "Failed to fetch transactions.");

            }
        } catch (err) {
            setError("An error occurred while fetching transactions." );

        } finally {
            setLoading(false);
        }
        }
        
        useEffect(() => {fetch_Transactions()
        },[ selectedOrder ,selectedChoice])  ;   
        
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
              <div className='flex-1 bg-purple-50  m-3 rounded-lg p-4  flex flex-col justify-start gap-3   shadow-md'>
              <div className='flex items-center justify-start gap-3'>
                    <label htmlFor="choice">Choose an option:</label>
                    <select className='block w-30 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-900 outline-none py-2 px-3'
                        id="choice"
                        value={selectedChoice}
                        onChange={(e) => setSelectedChoice(e.target.value)}
                        required
                    >
                        <option disabled  >
                            Select an option
                        </option>
                        <option value="7">Last week </option>
                        <option value="30">Last 30days</option>
                        <option set value="">All the time</option>
                    </select>
                    <select className='block w-30 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-900 outline-none py-2 px-3'
                        id="order"
                        value={selectedOrder}
                        onChange={(e) => setSelectedOrder(e.target.value)}
                        required
                    >
                        <option value=""  >
                            Trier par:
                        </option>
                        <option value="category">Category</option>
                        <option value="id">Transaction_id</option>
                        <option value="Amount">Amount</option>
                        <option value="date">Date</option>
                    </select>
            </div>    
            {/*<div></div>overflow-x-auto*/}
               <table className='  border-2 text-left table shadow-sm border-gray-200  '>
                <tr className='bg-zinc-700 text-white '>
                    <th className='border-1 border-gray-300'>Transaction_id</th>
                    <th className='border-1 border-gray-300'> Category</th>
                    <th className='border-1 border-gray-300'>Amount</th>
                    <th className='border-1 border-gray-300'>Date</th>
                    <th className='border-1 border-gray-300'>Description</th>
                    </tr>
               { Transactions.map((transaction)=>
               <tr className='odd:bg-white even:bg-gray-100 hover:bg-blue-100'> 
                    <td className='border-1 border-gray-300'>{transaction.id}</td>
                    <td className='border-1 border-gray-300'>{transaction.category}</td>
                    <td className='border-1 border-gray-300'>{transaction.amount}</td>
                    <td className='border-1 border-gray-300'>{transaction.date}</td>
                    <td className='border-1 border-gray-300'>{transaction.description}</td>
                </tr>)}
               </table>

            </div>
    </div>
    
}
export default Transactions;
