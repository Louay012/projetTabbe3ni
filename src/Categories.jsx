import React, { useState ,useEffect} from 'react'
import Sidebar from './sidebar';
import './transaction.css';

function Categories() {
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('category');
    const user_id=2;


    
    const fetch_categories=async () => {
            
        
        try{
            
            const response=await fetch('http://localhost/TABBE3NI/API/get_categories.php' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    user_id:user_id ,
                    }),
            })
            setLoading(false);
            const data = await response.json();
            console.log(data.test);
            if (data.success) {
            setCategories(data.data);
           
            
            } else {
            setError(data.message || "Failed to fetch categories.");

            }
        } catch (err) {
            setError("An error occurred while fetching categories." );

        } finally {
            setLoading(false);
        }
        }
        
        useEffect(() => {fetch_categories()
        },[ selectedOrder ,selectedChoice])  ;   
        
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>
              <div className='flex-1 bg-purple-50  m-3 rounded-lg p-4   flex flex-col justify-start gap-3  shadow-md'>
              
                
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
                    <th className='border-1 border-gray-300'>category_id</th>
                    <th className='border-1 border-gray-300'> category_name</th>
                    <th className='border-1 border-gray-300'>type</th>
                    </tr>
               { Categories.map((category)=>
               <tr className='odd:bg-white even:bg-gray-100 hover:bg-blue-100'> 
                    <td className='border-1 border-gray-300'>{category.category_id}</td>
                    <td className='border-1 border-gray-300'>{category.category_name}</td>
                    <td className='border-1 border-gray-300'>{category.type}</td>
                    
                </tr>)}
               </table>

            </div>
    </div>
    
}
export default Categories;
