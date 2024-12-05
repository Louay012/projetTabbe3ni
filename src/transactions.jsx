import React, { useState ,useEffect,useContext,useRef} from 'react'
import Sidebar from './sidebar';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from './UserContext';

function Transactions() {
  const[username,setUsername]=useState('');
  const { userDetails } = useContext(UserContext);
    const [Transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const[amount,setAmount]=useState(0);
    const[category_id,setCategory_id]=useState('');
    const[date,setDate]=useState('');
    const[description,setDescription]=useState('');
    const [selectedChoice, setSelectedChoice] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('date DESc');
    const formRef = useRef(null);
    const [showAdd, setShowAdd] = useState(false);
    const showerror=()=>{
      toast.error(error, {
        position: 'top-center',
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,});
    }
    const hideAddForm=()=>{
      setCategory_id(null);
    setDate(null);
    setDescription('');
    setAmount(null);
    formRef.current.reset();
      
    setShowAdd(false);}
        
      const showAddForm=()=>{
        setShowAdd(true);
      }
      const [cats, setcats] = useState([]);
      const fetch_cat=async () => {
         
         try{
          if(userDetails){
            
             const response=await fetch('http://localhost/TABBE3NI/API/get_expenses.php' ,{ method: 'POST',
               body: JSON.stringify({ 
                 user_id:userDetails.user_id ,
                 }),
             })
   
   
             const data = await response.json();
   
             if (data.success) {
               setcats(data.data);
             } else {
             setError(data.message || "Failed to fetch expense categories.");
   
             }
            }
         } catch (err) {
             setError("An error occurred while fetching expense categories.");
   
         } finally {
             setLoading(false);
         }
       }
     useEffect(() => {
       fetch_cat()
   },[userDetails])


    
    const fetch_Transactions=async () => {
            
        
        try{
          if(userDetails){
            setUsername(userDetails.username);
            
            const response=await fetch('http://localhost/TABBE3NI/API/transactions.php' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    choice:selectedChoice,
                    user_id:userDetails.user_id ,
                    order :selectedOrder}),
            })
           
            const data = await response.json();
            
            if (data.success) {
              setTransactions(data.data);
            
            
            } else {
            setError(data.message || "Failed to fetch expenses.");

            }}
        } catch (err) {
            setError("An error occurred while fetching expenses." );

        } finally {
            setLoading(false);
        }
        }
        
        useEffect(() => {fetch_Transactions()
        },[ selectedOrder ,selectedChoice,userDetails])  ;   
        
        const handle_submit=async (event) => {
            event.preventDefault();
            
            if (amount <= 0) {
              setError("Amount must be greater than 0.");
              return;
          }
      
          
          const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
          if (date > today) {
              setError("Date must be before today.");
              return;
          }
          
            try{
               
                  const response=await fetch('http://localhost/TABBE3NI/API/add_transaction.php',{
                    method:'POST',
                    headers:{
                      'Content-Type': 'application/json',
                  },
                    body:JSON.stringify({
                      user_id: userDetails.user_id,
                      amount: amount,
                      category_id: category_id,
                      description: description,
                      date: date,
                    })
                  })
                  
              const data=await response.json();
              
              if (data.success) {
                
                toast.success(data.message, {
                  position: 'top-center',
                  autoClose: 3000, // 3 seconds
                  hideProgressBar: true,
                  closeOnClick: true,});
                fetch_Transactions();
                
                } else {
                setError(data.message || "Failed to add expense.");
        
                      }
                } catch (err) {
                    setError("An error occurred while adding an expense.");
                    
                }
        
                hideAddForm() 
                
                }
      useEffect(() => {
      if (error) {
        showerror();
        setError(null); // Clear the error after showing it
      }
    }, [error]);

    if (loading) return <p>Loading...</p>;
    

    return <div className='flex flex-row  min-h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar name={username}></Sidebar>
              <div className='flex-1  bg-purple-50  m-3 rounded-lg  p-4 flex flex-col gap-2  items-center  shadow-md' >
              
        
              <div className='flex justify-between items-center w-full'>
                  <span className='font-bold font-mono text-2xl'>Your Expenses :</span>
                  <input className='btn btn-primary' type='submit' value='Add Expense' onClick={showAddForm}/>
                </div>  
                <Toaster/>

                <Form ref={formRef} onSubmit={handle_submit} className={showAdd ? 'w-96  p-4 flex flex-col gap-2 border-1 shadow-md z-40  bg-neutral-50 absolute top-2' : 'hidden' }>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className='font-mono font-semibold text-lg'>Categorie:</Form.Label>
                        <Form.Select
                          type="text"
                          placeholder="Enter the transaction category :"
                          name="category"
                          onChange={(e)=>{setCategory_id (e.target.value)}}
                          required>
                            <option value=""  selected>
                              Choose a category
                            </option>
                            {cats.map((cat)=><option value={cat.category_id} key={cat.category_id}>{cat.category_name}</option>)}
                        </Form.Select>
                      </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Amount:</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Enter the Amount "
                      name="amount"
                      onChange={(e)=>{setAmount(e.target.value)}}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Date:</Form.Label>
                    <Form.Control
                      type="Date"
                      name="Date"
                      onChange={(e)=>{setDate(e.target.value)}}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='font-mono font-semibold text-lg'>Description:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the Description "
                      name="description"
                      onChange={(e)=>{setDescription(e.target.value)}}
                      
                    />
                  </Form.Group>
                  <div className='flex justify-between'>
                  <Button variant="secondary" onClick={hideAddForm}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" >
                    Add
                  </Button>
                  </div>
                  </Form>
                    
              <div className='flex items-center justify-start gap-3'>
                    <label htmlFor="choice">Choose an option:</label>
                    <select className='block w-30 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-900 outline-none py-2 px-3'
                        id="choice"
                        
                        onChange={(e) => setSelectedChoice(e.target.value)}
                        required
                    >
                        <option disabled selected  >
                            Select an option
                        </option>
                        <option value="7">Last week </option>
                        <option value="30">Last 30days</option>
                        <option  value="">All the time</option>
                    </select>
                    <select className='block w-30 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-900 outline-none py-2 px-3'
                        id="order"
                        
                        onChange={(e) => setSelectedOrder(e.target.value)}
                        required
                    >
                        <option selected disabled  >
                            Trier par:
                        </option>
                        <option value="category">Category</option>
                        <option value="id">Transaction_id</option>
                        <option value="Amount">Amount</option>
                        <option value="date DESc">Date</option>
                    </select>
            </div>    
            {/*<div></div>overflow-x-auto*/}
               <table className='  border-2 text-left table shadow-sm border-gray-200  '>
                <thead className='table-dark'>
                    <tr className='bg-zinc-700 text-white '>
                        
                        <th className='border-1 border-gray-300'> Category</th>
                        <th className='border-1 border-gray-300'>Amount</th>
                        <th className='border-1 border-gray-300'>Date</th>
                        <th className='border-1 border-gray-300'>Description</th>
                        </tr>
                </thead>
                    <tbody>
                        { Transactions.map((transaction)=>
                        <tr key={transaction.id} className='odd:bg-white even:bg-gray-100 hover:bg-blue-100'> 
                           
                                <td className='border-1 border-gray-300'>{transaction.category}</td>
                                <td className='border-1 border-gray-300'>{transaction.amount}</td>
                                <td className='border-1 border-gray-300'>{transaction.date}</td>
                                <td className='border-1 border-gray-300'>{transaction.description}</td>
                            </tr>)}
                </tbody>
               </table>
              
            </div>
    </div>
    
}
export default Transactions;
